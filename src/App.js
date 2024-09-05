import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pricing from './component/pricing/Pricing';
import SignUp from './component/SignUp/SignUp';
import SignIn from './component/SignIn/SignIn';
import {loadStripe} from '@stripe/stripe-js'; 
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from '';
import CheckoutSuccess from './component/CheckoutSuccess';
import CheckoutFail from './component/CheckoutFail';
import NotFound from './component/NotFound';
import Home from './Home';
import Logout from './component/Logout';
import RefundPolicy from './component/refundPolicy/RefundPolicy';
import TermsAndConditions from './component/termsAndCondition/TermsAndCondition';
import ContactUs from './component/ContactUs/ContactUs';


function App() {
  const [ stripePromise, setStripePromise ] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); 
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    // Checking  authentication status over here, checking by looking at a token in local storage
    const userToken = localStorage.getItem('accessToken');
    if (userToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  
  const handleLogout = () => {
    //  accessToken is stored in localStorage
    const accessToken = localStorage.getItem('accessToken');
    
    // Display an alert
    // window.alert("Logout successful");
    
    // Remove the accessToken from localStorage
    localStorage.removeItem('accessToken');
    
    // Set isAuthenticated to false 
    setIsAuthenticated(false); 
    setEmailVerified(false);
     
  };
  

  // useEffect(() => {
  //   let cancelled = false;
  
  //   const loadStripePromise = async () => {
  //     try {
  //       const { loadStripe } = await import('@stripe/stripe-js');
  //       const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
  //       if (!cancelled) {
  //         setStripePromise(stripe);
  //       }
  //     } catch (error) {
  //       console.error('Failed to load Stripe:', error);
  //     }
  //   };
  
  //   // loadStripePromise();
  
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);



  return (
    <Router>
      {/* {clientSecret && ( */}
        {/* // <Elements stripe={stripePromise}> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logoutRequest" element={<Logout />} />

            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn/:popup?/:token?" element={<SignIn setIsAuthenticated={ setIsAuthenticated }/>} />
            {/* <Route path="/checkout" element={<CheckoutForm/>} /> */}
            <Route path="/checkoutSuccess" element={<CheckoutSuccess/>} />
            <Route path="/checkoutFail" element={<CheckoutFail/>} />
            <Route path="/refundPolicy" element={<RefundPolicy/>} />
            <Route path="/termsAndConditions" element={<TermsAndConditions/>} />
            <Route path="/contactUs" element={<ContactUs/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
          {/* // </Elements> */}
           {/* )} */}
    </Router>
  );
}

export default App;
