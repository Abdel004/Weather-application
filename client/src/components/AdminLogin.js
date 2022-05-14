import React, { useState } from 'react';
import "../css/login.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminLogIn({ createCookie }) {

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: ''
    });

    function handleSubmit(event) {

        event.preventDefault();
        axios.post('/signin-user/admin',
            {
                userName: values.username,
                password: values.password
            }).then(
                response => {
                    createCookie(response.data.message)
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
          <div className="login-box">
            <h1>ADMIN LOGIN</h1>
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
            <div className="admin-box">
              <p>This page is for authorised access only.<br></br> If you are a user, please login <Link to="/">here</Link>.</p>
            </div>

      </div>

    )
}

export default AdminLogIn;
