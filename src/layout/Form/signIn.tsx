import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { formValidation, encodeAndSave, togglePopup } from '../../functions/functions';
import { API } from '../../functions/API';
import Loader from '../../components/loader';
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
export default function SignIn() {
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
         if(encodeAndSave('token', data.token)) {
            navigate('/account')
         }
      },
      onError: err => {
         togglePopup('Something went wrong', 'ERROR');
      },
      mutationKey: ['login']
    })

   if(status === 'loading') return <Loader />
   return(
   <form action="submit" id="login-form" className='login-form'>

      <div className="input">
         <input type="text" ref={email} id='signin-email' className='email m' placeholder='Email or name' />
      </div>
      <div className="input">
         <input autoComplete="on" type={seePassword ? 'password': 'text'} ref={password} id='signin-pwd' className='pwd' placeholder='Password' />
         <span className="see-password" onClick={() => setSeePassword(!seePassword)}>
         {seePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
      </span>
      </div>

      <button type='submit' onClick={(e) => {
         e.preventDefault();

         let resp = formValidation(
               'DummyName',
               password.current!.value,
               email.current!.value,
            );
            
            if(resp.length) {
               setFormErrors(resp)
            }else {
               const fd = new FormData();
               fd.append('email', email.current!.value);
               fd.append('password', password.current!.value);

               mutate({
                  url: 'login',
                  data: fd,
                  headers: {
                     'Content-Type': 'multipart/form-data;'
                  },
                  method: 'POST'
               })
            }
         
      }} className='submit-btn primary-btn' id='signin-btn' >Submit</button>
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
      
   </form>
   )
}