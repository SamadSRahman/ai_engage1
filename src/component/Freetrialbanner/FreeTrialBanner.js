import React, { useState, useEffect } from 'react';
import "./freetrialbanner.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FreeTrialBanner = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [isTrialActive, setIsTrialActive] = useState(false); // Assuming true initially
  const accessToken = localStorage.getItem("accessToken");
  const [isSubscribed, setIsSubscribed] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user subscription information only if accessToken is available
    if (accessToken) {
      axios.get('https://stream.xircular.io/api/v1/subscription/getCustomerSubscription', 
       {withCredentials:true}
      )
      .then(response => {
        const user = response.data[0]; // Adjust based on the actual response structure
          console.log(user);
          setIsSubscribed(user.isSubscribed);
          setIsTrialActive(user.isTrialActive);
      })
      .catch(error => {
        console.error("Error fetching user subscription data", error);
      });
    }
  }, [accessToken]);

  const createfreetrail = async () => {
    // if (!accessToken) {
    //   try {
    //     const createfreetrailurl =
    //       "https://stream.xircular.io/api/v1/customer/startTrial";
    //     const response = await axios.get(createfreetrailurl, {
    //    withCredentials:true
    //     });

    //     console.log("Free Trial Response", response);
    //     navigate("/listing")
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // } else {
    //   navigate("/SignUp");
    // }
  };

 if(isTrialActive || isSubscribed){
  return
 }
 else{
  return (
    <div className="freetrialcnt container section">
      <div className="freetrialwrapper">
        <div className="freetrailiconwrapper">
          <svg
            id="freetrialicon"
            xmlns="http://www.w3.org/2000/svg"
            width="160"
            height="161"
            viewBox="0 0 160 161"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M160 27.6976C160 41.0399 150.291 52.1142 137.552 54.2414C150.291 56.3686 160 67.4432 160 80.7852C160 94.1271 150.291 105.202 137.552 107.329C150.291 109.456 160 120.531 160 133.873C160 148.736 147.951 160.785 133.088 160.785C119.746 160.785 108.671 151.076 106.544 138.337C104.417 151.076 93.3419 160.785 80 160.785C66.6581 160.785 55.5834 151.076 53.4562 138.337C51.329 151.076 40.2547 160.785 26.9124 160.785C12.0491 160.785 0 148.736 0 133.873C0 120.531 9.7092 109.456 22.4476 107.329C9.7092 105.202 0 94.1271 0 80.7852C0 67.4432 9.7092 56.3686 22.4476 54.2414C9.7092 52.1142 0 41.0399 0 27.6976C0 12.8343 12.0491 0.785156 26.9124 0.785156C40.2547 0.785156 51.329 10.4944 53.4562 23.2327C55.5834 10.4944 66.6581 0.785156 80 0.785156C93.3419 0.785156 104.417 10.4944 106.544 23.2327C108.671 10.4944 119.746 0.785156 133.088 0.785156C147.951 0.785156 160 12.8343 160 27.6976ZM53.4562 32.1625C51.5716 43.4487 42.6635 52.3568 31.3773 54.2414C42.6635 56.126 51.5716 65.0344 53.4562 76.3206C55.3408 65.0344 64.2492 56.126 75.5355 54.2414C64.2492 52.3568 55.3408 43.4487 53.4562 32.1625ZM84.4645 54.2414C95.7508 52.3568 104.659 43.4487 106.544 32.1625C108.428 43.4487 117.337 52.3568 128.623 54.2414C117.337 56.126 108.428 65.0344 106.544 76.3206C104.659 65.0344 95.7508 56.126 84.4645 54.2414ZM106.544 129.408C108.428 118.122 117.337 109.214 128.623 107.329C117.337 105.444 108.428 96.5359 106.544 85.2497C104.659 96.5359 95.7508 105.444 84.4645 107.329C95.7508 109.214 104.659 118.122 106.544 129.408ZM53.4562 85.2497C55.3408 96.5359 64.2492 105.444 75.5355 107.329C64.2492 109.214 55.3408 118.122 53.4562 129.408C51.5716 118.122 42.6635 109.214 31.3773 107.329C42.6635 105.444 51.5716 96.5359 53.4562 85.2497Z"
              fill="#FFD9F2"
            />
          </svg>
        </div>

        <div className="freetrialcontent">
          <h2>Ready to take your surveys to the next level ? </h2>
          <p>
            Sign up for a free trial today and experience the power of
            interactive video and AI.{" "}
          </p>

          <button   id="freetrialbtn"
            onClick={createfreetrail}
            disabled={isTrialActive} >
            {/* <svg width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.078 19.0768L12.4809 20.0149C13.5671 20.741 14.692 20.622 15.5261 20.0651C15.8451 19.8517 16.1183 19.576 16.3296 19.2545C16.6344 18.7943 16.8034 18.2485 16.8006 17.6944C17.0906 17.7294 17.3842 17.7181 17.6707 17.6609C19.1725 17.3607 20.1238 15.916 19.7433 14.407C19.7057 14.2579 19.6563 14.1121 19.5955 13.971C20.0804 14.077 20.5736 14.0649 21.0308 13.9459C21.7651 13.7534 22.4088 13.2868 22.7921 12.5811C23.5818 11.129 22.9334 9.35603 21.5249 8.58157C20.036 7.76065 19.8356 7.67509 19.6343 7.58865C19.4856 7.52449 19.3378 7.46038 18.4521 6.97879L26.9299 6.96947C27.1627 6.96947 27.3197 6.97601 27.5598 6.94905C28.2415 6.87187 28.8566 6.57253 29.3202 6.13276C30.5209 4.99387 30.52 3.14474 29.3165 2.0077C28.8353 1.55215 28.1943 1.25002 27.4841 1.18679C27.3068 1.17099 27.1876 1.17469 27.0195 1.17469L17.1673 1.18493C15.6692 1.18493 15.9832 0.52856 14.3226 0.247785C13.0785 0.036785 11.6035 -0.0199129 10.1635 0.109278C8.83726 0.228288 7.53683 0.505302 6.46637 0.963636C4.57571 1.77437 3.12751 3.04899 2.16413 4.56805C1.38652 5.79529 0.927446 7.17585 0.810136 8.59459C0.692825 10.0133 0.917274 11.4729 1.50285 12.86C2.2519 14.6292 3.5921 16.272 5.57139 17.5438C7.39182 18.7124 8.40319 18.9114 10.3778 19.2981L10.4194 19.3065C10.6725 19.3558 10.92 19.26 11.078 19.0768Z" fill="black"/>
            <path d="M10.6884 12.9717C10.8655 12.9689 11.0424 12.9843 11.2163 13.0176C11.3537 13.0422 11.48 12.9353 11.4746 12.793C11.4366 11.8709 11.9269 11.0342 12.7232 10.5929C12.74 10.5834 12.7558 10.5718 12.7702 10.5576C12.8117 10.517 12.8354 10.4614 12.8362 10.4032C12.837 10.3449 12.8148 10.2887 12.7744 10.2469C12.4725 9.93411 12.2117 9.48301 12.0476 9.083C12.0304 9.04123 12.0008 9.0058 11.9629 8.98152C11.9142 8.95026 11.8551 8.93977 11.7987 8.95236C11.7422 8.96494 11.6931 8.99957 11.662 9.04863C11.0923 9.94956 10.4198 9.96906 9.14877 10.0049L8.91489 10.0125C8.78833 10.0162 8.66548 9.96924 8.57325 9.88193C8.26712 9.59248 8.45398 9.06703 8.87983 9.04875L9.1179 9.04198C11.0228 8.98777 11.3578 7.68688 11.62 6.66798C11.7746 6.06726 11.8968 5.59325 12.3939 5.74321C12.514 5.77918 12.6153 5.86102 12.6762 5.97122C12.7371 6.08134 12.7528 6.21113 12.7199 6.33276C12.5267 7.36821 12.6724 8.51717 13.2999 9.38582H13.3008C13.9025 10.2171 14.7511 10.4639 15.7176 10.3548C16.2139 10.2986 16.454 10.0827 16.5638 9.75314C16.6597 9.46467 16.635 9.11436 16.6062 8.71041C16.5534 7.95574 16.5661 7.1579 16.5789 6.3555C16.5959 5.2843 16.6132 4.20448 16.4798 3.20583C16.4454 2.94635 16.373 2.71197 16.2679 2.50352C15.5953 1.16826 13.5137 1.10133 12.2353 1.05874C9.56577 0.969356 6.73972 1.38123 4.66817 3.20786C3.98534 3.81013 3.41879 4.5029 2.97455 5.20342C1.0106 8.30524 1.53962 12.0426 3.93373 14.772C5.34997 16.3867 6.9579 17.3717 8.99818 17.9239C9.21217 17.9805 9.36713 17.7142 9.20855 17.5555C8.34581 16.6931 8.08854 15.3365 8.65314 14.2278C9.06686 13.4153 9.81384 12.9859 10.6884 12.9717Z" fill="#FCC9B6"/>
            <path d="M10.2549 11.6513C10.4293 11.6486 11.0438 12.9843 11.2202 13.018C11.2362 13.0209 11.2525 13.0221 11.2688 13.0214C11.3267 13.0191 11.3812 12.9938 11.4205 12.9511C11.4598 12.9083 11.4806 12.8516 11.4784 12.7934C11.4404 11.8713 11.9307 11.0347 12.727 10.5933C12.7438 10.5838 12.7596 10.5722 12.7741 10.558C12.8155 10.5174 12.8392 10.4618 12.84 10.4036C12.8408 10.3453 12.8186 10.2891 12.7782 10.2474C12.4763 9.93453 12.2155 9.48343 12.0514 9.08342C12.0342 9.04164 12.0046 9.00622 11.9667 8.98194C11.918 8.95068 11.8589 8.94019 11.8025 8.95278C11.746 8.96536 11.6969 8.99999 11.6658 9.04905C11.0961 9.94998 10.4236 9.96948 9.15257 10.0053L8.9187 10.0129C8.79214 10.0166 8.66928 9.96966 8.57705 9.88235C8.27093 9.59289 8.45779 9.06745 8.88364 9.04917L9.12171 9.0424C11.0266 8.98818 11.3616 7.6873 11.6238 6.6684C11.7784 6.06768 11.9006 5.59367 12.3977 5.74363C12.5178 5.7796 12.6191 5.86144 12.68 5.97164C12.7409 6.08176 12.7567 6.21155 12.7237 6.33318C12.5305 7.36863 12.6762 7.63708 13.3037 8.50573H13.3046C13.9063 9.33706 14.5363 9.58381 15.5027 9.47475C15.999 9.41852 16.2391 9.20266 16.3489 8.87305C16.4449 8.58464 16.4202 8.23432 16.3913 7.83032C16.3385 7.0757 16.3512 7.15832 16.364 6.35592C16.381 5.28472 16.3983 4.2049 16.2649 3.20625C16.2305 2.94677 16.1582 2.71239 16.053 2.50394C15.3805 1.16868 13.5175 1.10174 12.2391 1.05916C9.56957 0.969776 7.61827 1.38165 5.54667 3.20827C4.8639 3.81055 4.29729 4.50332 3.8531 5.20384C1.12936 9.50571 4.04111 15.616 7.68989 16.6036C7.90388 16.6602 8.05884 16.3938 7.90026 16.2352C7.03746 15.3728 7.65494 14.0161 8.2196 12.9075C8.63332 12.095 9.3803 11.6656 10.2549 11.6513Z" fill="#FEDECF"/>
            <path d="M11.6 14.1173C10.8439 13.6584 9.80325 13.8603 9.32636 14.6302C8.80768 15.4675 9.22928 16.4848 9.98579 16.9935C10.8857 17.6236 12.2685 18.6549 13.1823 19.1609C13.8628 19.6159 14.6782 19.5783 15.2619 18.9908C15.3439 18.9078 15.4177 18.817 15.482 18.7195C15.8075 18.0941 15.9081 17.5789 15.4931 16.9466C15.3961 16.8068 13.0566 15.193 12.7145 14.9492C12.6358 14.8881 12.557 14.8343 12.4798 14.7691C12.1647 14.48 11.9735 14.3674 11.6 14.1173Z" fill="#FCC9B6"/>
            <path d="M11.602 14.1209C10.8459 13.662 9.80522 13.8639 9.32833 14.6338C8.80966 15.4711 9.6686 16.0481 10.4252 16.5568C11.325 17.1869 12.7079 18.2182 13.6217 18.7242C14.3559 19.2152 14.7593 18.9948 15.2066 18.6483C15.5321 18.0229 15.6327 17.5077 15.2177 16.8754C15.1207 16.7355 13.0586 15.1966 12.7165 14.9528C12.6378 14.8917 12.559 14.8379 12.4818 14.7727C12.1667 14.4836 11.9755 14.371 11.602 14.1209Z" fill="#FEDECF"/>
            <path d="M12.8569 13.8707L15.2593 15.4763C15.4127 15.5791 15.5701 15.7056 15.7133 15.8362C15.7998 15.9152 16.2492 16.4197 16.3387 16.4197C17.0486 16.8761 18.0406 16.7045 18.5298 16.0115C19.0883 15.2248 18.695 14.185 17.9717 13.6683C17.1062 13.0104 15.7932 12.0279 14.8881 11.4747C14.869 11.4611 14.8488 11.4466 14.8242 11.4323C13.331 10.4862 11.5309 12.2511 12.7995 13.815C12.8151 13.8369 12.8345 13.8558 12.8569 13.8707Z" fill="#FCC9B6"/>
            <path d="M13.2996 13.433L15.702 15.0386C15.8555 15.1413 16.0129 15.2679 16.1561 15.3985C16.2426 15.4775 16.692 15.982 16.7815 15.982C17.4914 16.4384 17.8453 16.5904 18.3344 15.8974C18.893 15.1107 18.4997 14.0708 17.7764 13.5541C16.9108 12.8962 15.7986 12.0304 14.8935 11.4773C14.8744 11.4636 14.8542 11.4492 14.8296 11.4349C13.3364 10.4887 11.9737 11.8135 13.2423 13.3773C13.2578 13.3993 13.2773 13.4182 13.2996 13.433Z" fill="#FEDECF"/>
            <path d="M21.0511 9.70624C20.6266 9.47275 20.203 9.23782 19.7801 9.00144C19.3201 8.74421 18.8631 8.53691 18.3996 8.2905C18.367 8.27323 18.3305 8.26456 18.2937 8.26529C18.2568 8.26602 18.2207 8.27614 18.1888 8.2947C18.1569 8.31326 18.1301 8.33966 18.1111 8.37143C18.092 8.4032 18.0813 8.43931 18.0799 8.47639C18.039 9.46671 17.7094 10.3873 16.9092 10.9897C16.8781 11.0109 16.8529 11.0399 16.8362 11.0737C16.8194 11.1076 16.8116 11.1452 16.8135 11.183C16.8154 11.2207 16.827 11.2574 16.8471 11.2893C16.8671 11.3213 16.895 11.3475 16.9281 11.3655L19.4069 12.7097C20.2399 13.1478 21.3568 12.9813 21.8394 12.1129L21.8467 12.1005C22.3213 11.2291 21.8836 10.1656 21.0511 9.70624Z" fill="#FCC9B6"/>
            <path d="M21.0511 9.71165C20.6266 9.47817 20.203 9.24323 19.7801 9.00685C19.3201 8.74962 18.8631 8.54233 18.3996 8.29592C18.367 8.27864 18.3305 8.26997 18.2937 8.2707C18.2568 8.27144 18.2207 8.28156 18.1888 8.30012C18.1569 8.31868 18.1301 8.34507 18.1111 8.37685C18.092 8.40862 18.0813 8.44473 18.0798 8.48181C18.039 9.47213 18.1468 9.9525 17.3465 10.5549C17.3154 10.5761 17.2902 10.6051 17.2735 10.6389C17.2567 10.6728 17.2489 10.7104 17.2509 10.7482C17.2528 10.786 17.2643 10.8226 17.2844 10.8546C17.3045 10.8865 17.3324 10.9127 17.3655 10.9307L19.8443 12.2748C20.6773 12.7129 21.3568 12.9868 21.8394 12.1183L21.8467 12.1059C22.3213 11.2345 21.8836 10.171 21.0511 9.71165Z" fill="#FEDECF"/>
            <path d="M29.216 4.06869C29.2142 2.97956 28.4662 2.17935 27.3742 2.1812L17.6837 2.19052C17.6259 2.19054 17.5704 2.21366 17.5295 2.25481C17.4887 2.29596 17.4657 2.35177 17.4657 2.40997L17.4684 5.75126C17.4684 5.80945 17.4914 5.86525 17.5323 5.90639C17.5731 5.94754 17.6286 5.97067 17.6864 5.9707L27.3789 5.96139C28.4649 5.95954 29.2178 5.16142 29.216 4.06869Z" fill="#FCC9B6"/>
            <path d="M28.5598 4.06695C28.5579 2.97781 27.8099 2.17761 26.7179 2.17946L17.6835 2.18878C17.6257 2.18879 17.5702 2.21192 17.5293 2.25307C17.4885 2.29422 17.4655 2.35003 17.4655 2.40822L17.4682 5.08915C17.4682 5.14734 17.4912 5.20314 17.5321 5.24429C17.5729 5.28543 17.6284 5.30856 17.6862 5.30859L26.7226 5.29928C27.8086 5.29743 28.5615 5.15967 28.5598 4.06695Z" fill="#FEDECF"/>
            </svg> */}
            Start Your Free Trial 
          </button>
        </div>
      </div>
    </div>
  );
 }
};

export default FreeTrialBanner;
