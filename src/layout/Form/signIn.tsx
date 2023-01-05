import { useRef, useState } from 'react'
import { ENDPOINT } from '../../functions/API';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { formValidation, callFormApi, encodeAndSave, decodeAndRetrieve } from '../../functions/functions';

export default function SignIn() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null); 
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    const [seePassword, setSeePassword] = useState(false);
    const [formErrors, setFormErrors] = useState< string[]>([]);
    
    function callApi() {
        setLoading(true)
        
        const userData = {
           email:    email.current!.value,
           password: password.current!.value,
        }
        
        callFormApi({
           method: 'post',
           url: ENDPOINT + 'login',
           data: userData
        }).then((response) => {
            encodeAndSave('token', response.data.token)
            navigate('/account/cards')
        }
        )
           .catch((err) => {
              console.log(err.response.data);
            setFormErrors([err.response.data.toString()])
            //   if(err?.response?.data?.error) {
            //      setFormErrors([err?.response?.data?.error])
            //   }
              
           }
        )
        .finally(() => setLoading(false))
        
     }

    // if(loading) return <h1>loading</h1>

    return(
    <form action="submit" id="login-form" className='login-form'>

        <div className="input">
            <input type="text" ref={email} id='signin-email' className='email' placeholder='Email or name' />
        </div>
        <div className="input">
            <input type={seePassword ? 'password': 'text'} ref={password} id='signin-pwd' className='pwd' placeholder='Password' />
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
                callApi()
             }
            
        }} className='submit-btn primary-btn' id='signin-btn' >Submit</button>

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