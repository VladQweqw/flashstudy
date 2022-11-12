import React,{} from 'react'


export default function SignUp() {

   return(
    <form action="submit" id="signup-form" className='login-form'>
    <input type="text" id='signup-name' className='name' placeholder='Display name' />

    <input type="email" id='signup-email' className='email' placeholder='Email' />

    <input type="password" id='signup-pwd' className='pwd' placeholder='Password' />
    <input type="password" id='signup-pwd' className='pwd' placeholder='Repeat password' />
    </form>
   )
}