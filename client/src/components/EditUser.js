import React, { useState, useEffect } from 'react';
import styles from "./Edit.module.css";
import axios from 'axios';


function EditUser() {
  const [values, setValues] = useState({
    pwd: '',
    username: '',
    error: ''
  })
  // const [newUserName, setNewUserName] = useState('')
  // const [newPwd, setNewPwd] = useState('')
  const [newValues, setNewValues] = useState({
    newPwd: '',
    newUserName: '',
    oldUserName: '',
    error: ''
  });
  const [userList, setUserList] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    axios.get(`/allUser`)
      .then((response) => setUserList(response.data.response))
  }, [refresh]);

  const addToList = () => {
    axios.post("/newUser", {
      username: values.username,
      password: values.pwd
    }).then(() => {
      setValues(rest => {
        return ({
          pwd: '',
          username: '',
          error: ''
        })
      })
      setRefresh((ref) => !ref)
    },
      error => {
        setValues(rest => {
          return ({
            ...rest,
            error: 'Username or password entered do not meet the minimum requirement.'
          })
        })
      }
    )

  }

  const updateUserName = (old) => {
    axios.post("/updateUser",
      {
        username: newValues.newUserName,
        password: newValues.newPwd,
        olduser: old
      }).then(() => {
        setRefresh((ref) => !ref)
      },
        error => {
          setNewValues(rest => {
            return ({
              ...rest,
              oldUserName: old,
              error: 'Username or password entered do not meet the minimum requirement.'
            })
          })
        }
      )
  }



  function handleChange(event) {
    const { name, value } = event.target;

    setNewValues(rest => {
      return ({
        ...rest,
        [name]: value
      })
    });
  }

  const deleteUser = (username) => {
    axios.delete("/deleteUser", {
      data: {
        username: username
      }
    }).then(() => setRefresh((ref) => !ref))
  }

  return (
    <div className={styles.App}>
      <h1> CRUD FOR USER </h1>
      <label> User Name</label>
      <input className={styles.put} type="text" value={values.username} name="username"
        onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
      <label> Password</label>
      <input className={styles.put} type="text" value={values.pwd} name="pwd"
        onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
      {values.error && <p className={styles.error}>{values.error}</p>}
      <button className={styles.btn}  onClick={addToList}>Create User</button>
      <h1> UserList</h1>
      {userList.map((val, key) => {
        return (
          <div key={key} className={styles.user}>
            <h1>{val.userName}</h1>
            <input className={styles.put} type="text" placeholder="New User Name" name="newUserName"
              onChange={handleChange}></input>
            <input className={styles.put} type="text" placeholder="New Password"  name="newPwd"
              onChange={handleChange}></input>
            {newValues.oldUserName === val.userName && newValues.error && <p className={styles.error}>{newValues.error}</p>}
            <button className={styles.btn} onClick={() => updateUserName(val.userName)}> Update </button>
            <button className={styles.btn}  onClick={() => deleteUser(val.userName)}> Delete User</button>
          </div>);
      })}
    </div>
  );
}

export default EditUser;