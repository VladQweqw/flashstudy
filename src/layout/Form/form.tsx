import React,{useState} from 'react'

import SignIn from './signIn';
import SignUp from './signUp';

export default function Form() {
    const [formState, setFormState] = useState<boolean>(false)


   return(
    <div className="form">
        <div className="form-wrapper">
            
            <div className="form-left">
                <h1 className="m3">{formState ? 'Sign in' : 'Sign up'}</h1>
            
                <form action="submit" id="login-form" className='login-form'>

                    {formState ? <SignIn /> : <SignUp />}

                </form>

                <button type='submit' className='submit-btn primary-btn' >Submit</button>
            </div>

            <div className="form-right">
                <svg className='form-svg' viewBox="0 0 600 115" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M191.477 110.409C25.5682 141.214 15.9091 7.12479 4.97939e-06 1.08475L600 1.08478C592.803 25.2449 551.364 73.9276 443.182 75.3772C307.955 77.1892 357.386 79.6052 191.477 110.409Z" fill="#915643" fill-opacity="0.58"/>
<path d="M231.818 78.9268C79.0627 119.575 15.9091 5.17717 6.48662e-05 -9.40338e-06L564.205 1.52588e-05C557.008 20.7087 567.273 50.8329 459.091 52.0754C323.864 53.6285 380.114 39.4653 231.818 78.9268Z" fill="#915643" fill-opacity="0.58"/>
                </svg>

                <div className="other-form-method">
                    <h1 className='m2'>
                        {formState ? 'Dont have an account?' : 'Already have an account?'}
                    </h1>

                    <button 
                    onClick={() => setFormState(!formState)} 
                    className='other-form-method-btn primary-btn'>{!formState ? 'Sign in' : 'Sign up'}</button>
                </div>

                <svg className='form-svg' viewBox="0 0 600 194" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M408.523 7.7441C574.432 -44.2212 584.091 181.981 600 192.17L-8.40002e-06 192.17C7.19696 151.413 48.6364 69.2873 156.818 66.8419C292.045 63.7851 242.614 59.7094 408.523 7.7441Z" fill="#915643" fill-opacity="0.58"/>
<path d="M368.182 60.8539C520.937 -7.71814 584.091 185.266 600 194L35.7954 194C42.9924 159.065 32.7272 108.247 140.909 106.151C276.136 103.531 219.886 127.424 368.182 60.8539Z" fill="#915643" fill-opacity="0.58"/>
                </svg>

            </div>

        </div>
    </div>
   )
}
