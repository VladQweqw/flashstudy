import {useRef, useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { formValidation, togglePopup } from '../../functions/functions';
import Loader from '../../components/loader';
import { API } from '../../functions/API';
import { useQuery } from 'react-query';

export default function SignUp({setFormState}: {setFormState: (state: boolean) => void}) {
   document.title = 'Register now'

   const name = useRef<HTMLInputElement>(null);
   const email = useRef<HTMLInputElement>(null);
   const password = useRef<HTMLInputElement>(null);

   const [formErrors, setFormErrors] = useState< string[]>([]);
   const [seePassword, setSeePassword] = useState(true);

   const {
      status,
      refetch,
   } = useQuery({
      enabled: false,
      onError: () => togglePopup('Something went wrong', 'ERROR'),
      onSuccess: () => {
         setFormState(true)
         togglePopup('Account created!', 'SUCCESS');
      },
      queryFn: () => API({
         method: 'POST',
         url: 'register',
         data: {
            username:   name.current!.value,
            password:   password.current!.value,
            email:      email.current!.value,
         },
         headers: {
            authorization: ''
         }
      }),   
      queryKey: ['register']
   })
   
   if(status === 'loading') return <Loader />
   return(
    <form action="submit" id="signup-form" className='login-form'>

      <div className="input">
         <input type="text"     ref={name} id='signup-name' className='name ' placeholder='Display name' />
      </div>
      <div className="input">
         <input type="email"    ref={email} id='signup-email' className='email' placeholder='Email' />
      </div>
      <div className="input">
         <input autoComplete="on" type={seePassword ? 'password': 'text'} ref={password} id='signup-pwd' className='pwd' placeholder='Password' />
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
            refetch()
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