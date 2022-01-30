import React from 'react';
import Login from './Login';
import Register from './Register';


const SignIn = props => {

  return (
    <div className="row">
      <div className="col">
        <h3>Sign Up</h3>
        <Register />
      </div>
      <div className="col">
        <h3>Sign In</h3>
        <Login />
      </div>
    </div>
  )

}

export default SignIn;