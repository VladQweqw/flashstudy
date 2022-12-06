import React,{ useRef, useState } from 'react'

import axios from 'axios';
import { ENDPOINT } from '../../functions/API';
import { formValidation } from './signUp';
import { AnimatePresence, motion } from 'framer-motion';

type response = {
    message: string,
    isSucces: boolean,
    errors: string[],
    expireDate: string | null
 }

export default function SignIn() {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null); 

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<response | undefined>(undefined);
    const [seePassword, setSeePassword] = useState(false);

    const URL = 'api/Auth/Login';
    
    function formUseFetch() {        
        const options = {
            email: (email.current as HTMLInputElement).value,
            password: (password.current as HTMLInputElement).value,
        }

        axios.post<response>(ENDPOINT + URL, options, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {            
            setData(response.data)
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => setLoading(false));

    }

    if(!loading && !error) console.log(data);
    if(error !== '' && error != null) console.log(error);   

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
            formUseFetch();
            
        }} className='submit-btn primary-btn' id='signin-btn' >Submit</button>

        
    </form>
   )
}