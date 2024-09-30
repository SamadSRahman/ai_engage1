import React from 'react'
import './footer.css';
import aiengagelogo from '../navbar/aiengagelogo.png';
import { ReactComponent as Facebookicon } from './Facebookicon.svg'
import { ReactComponent as Instagramicon } from './Instagramicon.svg'
import { ReactComponent as LinkedIn } from './LinkedIn.svg'

const Footer = () => {
  return (
    <div className='footer container'>

     <div className='footerwrapper'>

       <div className='footerlogowrapper'>

           <img src={aiengagelogo} alt="Ai Engage footer logo" />

           <h5 id="footertext"> Revolutionize your Surveys with Interactive Video Campaigns and AI. </h5>
       </div>

          <div className='footerlinkswrapper'>
                <p className='footerlinks'> Contact Us </p>
                <p className='footerlinks'> Terms & Conditions </p>
                <p className='footerlinks'> Refund Policy </p>
          </div>

        <div className='footersocilamediawrapper'>  
            <Facebookicon />
            <Instagramicon />
            <LinkedIn />
        </div>
    
     </div>

    </div>
  )
}

export default Footer
