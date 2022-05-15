import React, { useState } from 'react';
import styles from "./login.module.css";
import axios from 'axios';

function AdminLogin({ createCookie, changeView }) {

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: ''
    });

    const changeLoc = async (response) => {
        await createCookie(response.data.message)
        await fetch("/refreshData", { method: "GET" })
            .then(() => window.location.href = '/admin/home')
    }

    function handleSubmit(event) {

        event.preventDefault();
        axios.post('/signin-user/admin',
            {
                userName: values.username,
                password: values.password
            }).then(
                response => {
                    changeLoc(response)
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
        <div className={styles.formcontainer}>
            <div className={styles.titlebox}><h1>Weathering with Me</h1></div>
            <div className={styles.loginbox}>
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

                <button type="submit" className={`btn btn-primary btn-lg ${styles.btn}`}>Login</button>

            </form>
            <div className={styles.adminbox}>
                <p>This page is for authorised access only.<br></br> If you are a user, please login <button href="#" onClick={() => changeView('user')}>here</button>.</p>
            </div>

        </div>

    )
}


function UserLogin({ createCookie, changeView }) {

    const [values, setValues] = useState({
        username: '',
        password: '',
        error: ''
    });

    const changeLoc = async (response) => {
        await createCookie(response.data.message)
        await fetch("/refreshData", { method: "GET" })
        .then(() => window.location.href = '/user/home')
    }

    function handleSubmit(event) {

        //User Sign-in
        event.preventDefault();
        axios.post('/signin-user/user',
            {
                userName: values.username,
                password: values.password
            }).then(
                response => {
                    changeLoc(response)
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
        <div className={styles.formcontainer}>
            <div className={styles.titlebox}><h1>Weathering with Me</h1></div>
            <div className={styles.loginbox}>
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

                <button type="submit" className={`btn btn-primary btn-lg ${styles.btn}`}>Login</button>

            </form>

            <br></br>
            <br></br>
            <footer><p className={styles.adminbox}>If you are an administrator, please login <button onClick={() => changeView('admin')}>here</button>.</p></footer>
        </div>

    )
}


const Login = ({createCookie}) => {
    const [role, setRole] = useState('user')

    return (
        <>
            {role === 'user' ? <UserLogin changeView={setRole} createCookie={createCookie}/> : <AdminLogin changeView={setRole} createCookie={createCookie}/>}
        </>

    )
}

export default Login;
