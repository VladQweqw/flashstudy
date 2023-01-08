import {useRef, useState} from 'react'
import { ENDPOINT } from '../../functions/API';
import { AnimatePresence, motion } from 'framer-motion';
import { callFormApi, formValidation } from '../../functions/functions';
import SignIn from './signIn';
import Loader from '../../components/loader';

export default function SignUp({setFormState}: any) {

   const name = useRef<HTMLInputElement>(null);
   const email = useRef<HTMLInputElement>(null);
   const password = useRef<HTMLInputElement>(null);

   const [formErrors, setFormErrors] = useState< string[]>([]);
   const [seePassword, setSeePassword] = useState(true);
   const [loading, setLoading] = useState<boolean>(false);

   function callApi() {
      setLoading(true)
      
      const userData = {
         username:    name.current!.value,
         password: password.current!.value,
         email:  email.current!.value,
      }
      
      callFormApi({
         method: 'post',
         url: ENDPOINT + 'register',
         data: userData
      }).then(() => setFormState(<SignIn />)
      )
         .catch((err) => {
            console.log(err.response.data);
            setFormErrors([err.response.data])
            
            // if(err?.response?.data?.error) {
            //    setFormErrors([ err?.response?.data?.error])
            // }
            
         }
      )
      .finally(() => setLoading(false))
      
   }

   if(loading) return <Loader />

   return(
    <form action="submit" id="signup-form" className='login-form'>

      <div className="input">
         <input type="text"     ref={name} id='signup-name' className='name' placeholder='Display name' />
      </div>
      <div className="input">
         <input type="email"    ref={email} id='signup-email' className='email' placeholder='Email' />
      </div>
      <div className="input">
         <input type={seePassword ? 'password': 'text'} ref={password} id='signup-pwd' className='pwd' placeholder='Password' />
         <span className="see-password" onClick={() => setSeePassword(!seePassword)}>
            {seePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
         </span>
      </div>

      <button type='submit' onClick={((e) => {
         e.preventDefault();
         
         let resp = formValidation(
            name.current!.value,
            password.current!.value,
            email.current!.value,
         );
         
         if(resp.length) {
            setFormErrors(resp)
         }else {
            callApi()
         }
             

      })} className='submit-btn primary-btn' id='signup-btn'>Submit</button>

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