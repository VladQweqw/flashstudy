import {useRef, useState} from 'react'
import Modal from './modal'
import { slowSlideInitial, slowSlideAniamte, slowSlideVariant } from '../functions/functions'
import { motion } from 'framer-motion'

export default function ForgotPassword() {
    const [isEmailSent, setIsEmailSent] = useState(true)
    const [code, setCode] = useState(0);

   return(
    <Modal>
        <motion.div 
        initial={'initial'}
        animate={'animate'}
        variants={slowSlideVariant}
        className="forgot-modal">
            {isEmailSent ? <SendEmail /> : <CheckCode /> }
        </motion.div>
    </Modal>
   )
}

function SendEmail() {
    const inp = useRef<any>()

    return(
        <>
            <label htmlFor="forgot-password-email" className='m3'>We'll send you a code to the email address.</label>
            <input type="email" ref={inp} className='forgot-pwd-email input' name="forgot-password-email" placeholder='Email' id="forgot-pwd-email" />

            <button className="primary-btn">Send</button>
        
        </>
    )

}

function CheckCode() {

    return(
        <>
             <label htmlFor="forgot-password-email m3">Enter the code:</label>
            <input type="text" className='forgot-code' name="forgot-code" placeholder='Code' id="forgot-code" />

            <button className="primary-btn" id='check-code'>Check</button>
        
        </>
    )

}