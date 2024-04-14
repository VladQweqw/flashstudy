import { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { formValidation, togglePopup, asyncLocalStorage } from '../../functions/functions';
import { useMutation } from 'react-query';
import { API } from '../../functions/API';
import Loader from '../../components/loader';

export default function SignIn() {
   document.title = 'Sign in'

   const email = useRef<HTMLInputElement>(null);
   const password = useRef<HTMLInputElement>(null); 
   const navigate = useNavigate()

   const [seePassword, setSeePassword] = useState(true);
   const [formErrors, setFormErrors] = useState< string[]>([]);

   const { 
      status,
      mutate,
      data
    } = useMutation({
      mutationFn: API,
      onSuccess: resp => {
         asyncLocalStorage('token', resp.token).then((res) => {
            navigate('/account')
            window.location.reload()
         }).catch((err) => togglePopup('DEFAULT', 'ERROR'))
      
      },
      onError: err => {
         togglePopup('Something went wrong', 'ERROR');
      },
      mutationKey: ['login']
    })

   const child = {
      animate: {
         opacity: 1,
         scale: 1,
      },
      initial: {
         opacity: 0,
         scale: 0,
      }
   }

   if(status === 'loading') return <Loader />
   return(
   <motion.form
   variants={{
      animate: {
         transition: {
            staggerChildren: .05,
            duration: .1,
         }
      }
   }}
   animate={'animate'}
   initial={'initial'}
   action="submit" id="login-form" className='login-form'>

      <motion.div
      variants={child}
      className="input">
         <input type="text" ref={email} id='signin-email' className='email m' placeholder='Email or name' />
      </motion.div>
      <motion.div
      variants={child}
      className="input">
         <input autoComplete="on" type={seePassword ? 'password': 'text'} ref={password} id='signin-pwd' className='pwd' placeholder='Password' />
         <span className="see-password" onClick={() => setSeePassword(!seePassword)}>
         {seePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
      </span>
      </motion.div>

      <motion.button variants={child} type='submit' onClick={(e) => {
         e.preventDefault();

         let resp = formValidation(
               'DummyName',
               password.current!.value,
               email.current!.value,
            );
            
            if(resp.length) {
               setFormErrors(resp)
            }else {
      
               mutate({
                  url: 'login',
                  params: {},
                  data: {
                     'email': email.current!.value,
                     'password': password.current!.value
                  },
                  headers: {
                    
                  },
                  method: 'POST'
               })
            }
         
      }} className='submit-btn primary-btn' id='signin-btn' >Submit</motion.button>
      <p id="forgot-pwd" className='secondary-text' onClick={() => navigate('forgot')}>Forgot details?</p>
   

   <div className="errors">
      <AnimatePresence>
         {formErrors && formErrors.map((error, index) => {
            return <motion.p 
            exit={{
               opacity: 0,
               scale: 0,
            }}
            initial={{
               opacity: 0,
               scale: 0,
            }}
            animate={{
               opacity: 1,
               scale: 1,
            }}
            className='error-message' key={index}>{error}</motion.p>
         })}
      </AnimatePresence>
   </div>
      
   </motion.form>
   )
}