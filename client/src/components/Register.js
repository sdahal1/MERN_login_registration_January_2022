import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Register = props => {

  const [firstName, setFirstname] = useState(""); 
  const [lastName, setLastname] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const register = e => {
    e.preventDefault();
    const newUser = {firstName, lastName, email, password, confirm};
    axios.post("http://localhost:8000/api/register", newUser, {
      withCredentials: true
    })
      .then(res => {
        console.log(res)
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          // history.push("/dashboard")
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ register }>
      <p className="form-group">
        <label>First Name:</label>
        <input 
          className="form-control"
          type="text" 
          name="firstName" 
          onChange={ e => setFirstname(e.target.value) } 
          value={ firstName }
        />
        {errors.firstName ? <span className='text-danger'>{errors.firstName.message}</span> : ""}
      </p>
      <p className="form-group">
        <label>Last Name:</label>
        <input 
          className="form-control"
          type="text" 
          name="lastName" 
          onChange={ e => setLastname(e.target.value) } 
          value={ lastName }
        />
        {errors.lastName ? <span className='text-danger'>{errors.lastName.message}</span> : ""}
      </p>
      <p className="form-group">
        <label>Email:</label>
        <input 
          className="form-control"
          type="text" 
          name="email" 
          onChange={ e => setEmail(e.target.value) } 
          value={ email }
        />
        {errors.email ? <span className='text-danger'>{errors.email.message}</span> : ""}
        {errors.emailTaken ? <span className='text-danger'>{errors.emailTaken}</span> : ""}

      </p>
      <p className="form-group">
        <label>Password:</label>
        <input 
          className="form-control"
          type="password" 
          name="email" 
          onChange={ e => setPassword(e.target.value) } 
          value={ password }
        />
        {errors.password ? <span className='text-danger'>{errors.password.message}</span> : ""}
      </p>
      <p className="form-group">
        <label>Confirm:</label>
        <input 
          className="form-control"
          type="password" 
          name="confirmpw" 
          onChange={ e => setConfirm(e.target.value) } 
          value={ confirm }
        />
        {errors.confirm ? <span className='text-danger'>{errors.confirm.message}</span> : ""}
      </p>
      <input type="submit" value="Sign Up" className="btn btn-primary" />
    </form>
  );
}

export default Register;