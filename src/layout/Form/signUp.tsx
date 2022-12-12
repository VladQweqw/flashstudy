import {useRef, useState, useEffect} from 'react'
import axios from 'axios';
import { ENDPOINT } from '../../functions/API';
import { AnimatePresence, motion } from 'framer-motion';
import { json } from 'stream/consumers';

type response = {
   message: string,
   isSucces: boolean,
   errors: string[],
   expireDate: string | null
}

type formErrors = {
   pass: boolean,
   errors: string[]
}

export function formValidation(username: string, password: string, repeatPassword: string, email: string, callback: any): formErrors {
   let errors = [];
   let pass = true;   
   
   if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      errors.push("Password too weak")
      pass = false;
   }

   if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.push("Email not valid");
      pass = false;
   }

   if(password !== repeatPassword) {       
      errors.push("Passwords don't match");
      pass = false;
   }

   if(username.length < 3) {
      errors.push('Username too short')
      pass = false;
   }
   
   if(pass) {
      callback();
   }

   return {pass, errors};
}

export default function SignUp() {

   const name = useRef<HTMLInputElement>(null);
   const email = useRef<HTMLInputElement>(null);
   const password = useRef<HTMLInputElement>(null);
   const repeatPassword = useRef<HTMLInputElement>(null);
   const [formErrors, setFormErrors] = useState< formErrors | null>(null);

   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null)
   const [data, setData] = useState<response | undefined>(undefined);

   const [seePassword, setSeePassword] = useState(true);
   
   const URL = 'api/Auth/register';

    async function formUseFetch() {
      
      const options = {
         userName: 'Jugule',
         email: 'dawdada@gmail.com',
         password: 'dWf8fu3sprb',
         confirmPassword: 'dWf8fu3sprb',
         
      }
      

      await axios({
         method: 'POST',
         url: ENDPOINT + URL,
         data: options,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         }
      })
      .then((response) => {
         setData(response.data)
         
      })
      .catch((err) => console.log(err.response))

   }


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
      <div className="input">
         <input type={seePassword ? 'password': 'text'} ref={repeatPassword} id='repeat-signup-pwd' className='pwd' placeholder='Repeat password' />
      </div>

      <button type='submit' onClick={((e) => {
         e.preventDefault();
         // setFormErrors(
         //    formValidation(
         //       (name.current as HTMLInputElement).value,
         //       (password.current as HTMLInputElement).value,
         //       (repeatPassword.current as HTMLInputElement).value,
         //       (email.current as HTMLInputElement).value,
         //       formUseFetch
         //    )
         // )


         formUseFetch();
         
         
      })} className='submit-btn primary-btn' id='signup-btn'>Submit</button>

<div className="errors">
         <AnimatePresence>
            {formErrors?.errors && formErrors.errors.map((error, index) => {
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