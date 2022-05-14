import React, { useState } from 'react';
import "../css/login.css";
import axios from 'axios';


function LogIn({ storeToken }) {

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: ''
    });

    function handleSubmit(event) {

        event.preventDefault();
        axios.post('http://localhost:3000/signin-user',
            {
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
                            error: 'Sorry, the username and password combination is incorrect. Please try again.'
                        })
                    })
                }
            )
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setValues(rest => {
            return ({
                ...rest,
                [name]: value
            })
        });
    }

    return (
      <div className="form-container">
        <div className="title-box"><h1>Weathering with Me</h1></div>
          <div class="login-box">
            <h1>USER LOGIN</h1>
          </div>

            <form method="post" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        name="username"
                        value={values.username}
                        placeholder="Username"
                        required
                        onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        required
                        onChange={handleChange} />
                    {values.error && <p>{values.error}</p>}
                </div>

                <button type="submit" className="btn btn-primary btn-lg">Login</button>

            </form>
            <p>New user?</p>
            <a href="/register"><button type="button" className="btn btn-primary btn-lg">Register</button></a>

        <br></br>
        <br></br>
        <footer><p>If you are an administrator, please login <a href="/login-admin">here</a>.</p></footer>
      </div>

    )
}

export default LogIn;
