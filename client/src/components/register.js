import React, { useState } from 'react';
import "../css/signup.css";
import axios from 'axios';

function Register({ storeToken }) {

  /**
   * Checks if the form has errors
   * If any key in the object has an error message, valid is set to false
   * otherwise valid is set to true
   * @param {Object} errors - contains the errors messages if any
   * @returns {boolean} true if form is valid, false otherwise
   */


  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  // initial state of User input and errors
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    errors: {
      username: '',
      password: '',
      confirmPassword: '',
      DuplicateUser: ''
    }
  });

  /**
   * Changes the value of the field that the user edits
   * Checks if any of the cases is false and updates the erros messages accordingly
   * @param {object} event 
   */

  function handleChange(event) {
    const { name, value } = event.target
    setValues(rest => {
      return {
        ...rest,
        [name]: value
      }
    })

    // error validation to determine what kind of error messsage to display if some input is invalid
    switch (name) {
      case 'username':
        values.errors.DuplicateUser = '';
        values.errors.username =
          value.length < 4 ?
            'username must be at least 4 characters long!' : '';
        break;
      case 'password':
        values.errors.password =
          value.length < 4 ?
            'Password must be at least 4 characters long!' : '';
        break;
      case 'confirmPassword':
        values.errors.confirmPassword =
          value !== values.password ?
            'Passwords do not match' : '';
        break;
      default:
        break;
    }

  }

  /**
   * Calls @function validateForm
   * If the function call returns true, a post request is made to the server
   * If the server response is success, calls a callback function to create a cookie
   * Otherwise an error message will be shown 
   * @param {object} event 
   */
  function handleSubmit(event) {
    event.preventDefault();

    const valid = validateForm(values.errors);
    if (valid) {
      axios.post('http://localhost:3000/register-user', {
        name: values.username,
        password: values.password
      }).then(
        response => {
          storeToken(response);
        },
        error => {
          setValues(rest => {
            return ({
              ...rest,
              errors: {
                DuplicateUser: 'Username already exists, Please enter a new username'
              }
            })
          })
        }
      )
    }
  }

  return (
    <div className="form-container">
    <div className="title-box"><h1>Weathering with Me</h1></div>

        <div class="register-box">
          <h1>REGISTER</h1>
        </div>

      <form method="post" onSubmit={handleSubmit}>

        <div className="mb-4" >
          <input className="form-control form-control-lg"
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            required />
          {values.errors.username && <p> {values.errors.username}</p>}
          {values.errors.DuplicateUser && <p> {values.errors.DuplicateUser}</p>}
        </div>

        <div className="mb-4" >
          <input
            className="form-control form-control-lg"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required />
          {values.errors.password && <p> {values.errors.password}</p>}
        </div>

        <div className="mb-4" >
          <input
            className="form-control form-control-lg"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            required />
          {values.errors.confirmPassword && <p> {values.errors.confirmPassword}</p>}
        </div>
        
        <button type="submit" className="btn btn-primary btn-lg" >Register</button>

      </form>
      <p>Existing user? </p>
      <a href="/login" > <button type="button" className="btn btn-primary btn-lg">Login</button></a>


    </div>
  )
}

export default Register;
