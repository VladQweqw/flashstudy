import React,{useRef, useState} from 'react'
import Modal from './modal'
import { slideAnimate, slideInitial } from '../functions/functions'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'

export default function ForgotPassword() {
    const [isEmailSent, setIsEmailSent] = useState(true)
    const [code, setCode] = useState(0);

   return(
    <Modal>
        <motion.div 
        initial={slideInitial}
        animate={slideAnimate}
        className="forgot-modal">
            {isEmailSent ? <SendEmail setIsEmailSent={setIsEmailSent} /> : <CheckCode /> }
        </motion.div>
    </Modal>
   )
}

function SendEmail({setIsEmailSent}: any) {
    const inp = useRef<any>()

    function sendEmailJS() {
        // emailjs.sendForm(
        //     'gmail',
        //     'template_2kz8vul',
        //      inp.current,
        //     'ZGb2MXwnqujFyh0r2'
        // ).then((resp) => {
        //     console.log(resp.text);
        //     setIsEmailSent(false)
            
        // }).catch((err) => console.log(err)
        // )
        setIsEmailSent(false)
    }

    return(
        <>
             <label htmlFor="forgot-password-email">We'll send you a code to the email address.</label>
            <input type="email" ref={inp} className='forgot-pwd-email input' name="forgot-password-email" placeholder='Email' id="forgot-pwd-email" />

            <button className="primary-btn" onClick={() => {
                sendEmailJS()
            }}>Send</button>
        
        </>
    )

}

function CheckCode() {

    return(
        <>
             <label htmlFor="forgot-password-email">Enter the code:</label>
            <input type="text" className='forgot-code' name="forgot-code" placeholder='Code' id="forgot-code" />

            <button className="primary-btn" id='check-code'>Check</button>
        
        </>
    )

}