import React, { useState } from 'react';
import "../css/login.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LogIn({ createCookie }) {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: ''
    });

    const changeLoc = () => {
        navigate("/map", { replace: true }) // add user view
    }

    function handleSubmit(event) {

        event.preventDefault();
        axios.post('/signin-user/user',
            {
                userName: values.username,
                password: values.password
            }).then(
                response => {
                    createCookie(response.data.message)
                    fetch("/refreshData", { method: "GET" })
                    changeLoc()
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

            <br></br>
            <br></br>
            <footer><p>If you are an administrator, please login <Link to="/login-admin">here</Link>.</p></footer>
        </div>

    )
}

export default LogIn;
