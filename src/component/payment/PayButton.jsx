import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { cashfree } from './utils';
// import { useParams } from 'react-router-dom';

const PayButton = ({ planPrice, features, frequency, planName, description, isPlanAlreadyPurchased }) => {
  // const params = useParams();
  // const isSessionId = params.sessionid;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found in localStorage');
    }
    try {
      const response = await axios.get(`https://stream.xircular.io/api/v1/customer/getUser/${userId}`, {
        headers: {
          Cookie: 'lng=en'
        }
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error getting user details:', error);
      throw error;
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post('https://stream.xircular.io/api/v1/order/createOrder', {
        userId: localStorage.getItem('userId'),
        subscription: {
          planName,
          frequency,
          features,
          userId: localStorage.getItem('userId')
        }
      });
      return response.data.data.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const cashfreeOrder = async (orderId, phone) => {
    try {
      const response = await axios.post('https://stream.xircular.io/api/v1/cashfree/create-checkout-session', {
        orderId,
        userName: localStorage.getItem('userName'),
        phone,
        userId: localStorage.getItem('userId'),
        planPrice
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating Cashfree session:', error);
      throw error;
    }
  };

  const handlePurchase = async () => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken || !userId) {
      navigate("/SignIn");
      return;
    }

    setLoading(true);
    try {
      // Get user details including phone number
      const userDetails = await getUserDetails();
      const phone = userDetails.phone;

      const orderId = await createOrder();
      const sessionId = await cashfreeOrder(orderId, phone);
      
      let checkoutOptions={
        paymentSessionId:sessionId,
        returnUrl:"https://stream.xircular.io/api/v1/cashfree/getStatus/{order_id}",
      }
      cashfree.checkout(checkoutOptions).then(function(result) {
        if (result.error) {
          alert(result.error);
        }
        if (result.redirect) {
          console.log("Redirection URL:", result.redirect);
          
          // Open the redirect URL in a new window
          const paymentWindow = window.open(result.redirect, "_self");
          
          // Set up a message listener on the current window
          window.addEventListener('message', function(event) {
            if (event.data === 'payment_completed') {
              // Payment is completed, now open the dashboard and send the access token
              const dashboardWindow = window.open('http://localhost:3000/listings', "_self");
              if (dashboardWindow) {
                dashboardWindow.onload = () => {
                  setTimeout(() => {
                    dashboardWindow.postMessage({ type: 'ACCESS_TOKEN', accessToken }, 'http://localhost:3000');
                    console.log("Access token sent to dashboard");
                  }, 1000);
                };
              }
            }
          }, false);
        }
      });
    } catch (error) {
      console.error('Error during purchase process:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='subcrpbtnwrapper'>
      <button 
        className="subscribebtn" 
        onClick={handlePurchase}
        disabled={isPlanAlreadyPurchased || loading}
      >
        {loading ? 'Processing...' : 'Subscribe'}
      </button>
    </div>
  );
};

export default PayButton;