import React,{} from 'react'


export default function SignIn() {

   return(
    <form action="submit" id="login-form" className='login-form'>

        <input type="text" id='signin-email' className='email' placeholder='Email or name' />

        <input type="password" id='signin-pwd' className='pwd' placeholder='Password' />

    </form>
   )
}