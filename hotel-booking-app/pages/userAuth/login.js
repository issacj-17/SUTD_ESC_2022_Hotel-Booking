
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../../modules/UserAuth/components/loginForm'


export default function login() {
  console.log("reached")
    return (
    <div className="container">
        <div className='col'>
            <LoginForm>

            </LoginForm>
        </div>
    </div>
    
  )
}
