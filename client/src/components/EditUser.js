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

  //Get all Users.
  useEffect(() => {
    axios.get(`/allUser`)
      .then((response) => setUserList(response.data.response))
  }, [refresh]);

  //Add new Users.
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

  //Update existing User.
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

  //Delete existing User.
  const deleteUser = (username) => {
    axios.delete("/deleteUser", {
      data: {
        username: username
      }
    }).then(() => setRefresh((ref) => !ref))
  }

  return (
    <div className={styles.App}>
      <div className="h1 text-white mt-5 font-weight-bold"> CRUD FOR USER </div>
      <div className="form-group w-25 mt-5">
        <div className="h3 text-white" for="example2">Username</div>
        <input type="text" class="form-control"  value={values.username} name="username" onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }}></input>
      </div>
      <div className="form-group w-25">
        <div className="h3 text-white " for="example2">Password</div>
        <input type="text" class="form-control" value={values.pwd} name="pwd" onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} ></input>
      </div>
     {/* <label> User Name</label>
      <input className={styles.put} type="text" value={values.username} name="username" onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} />
      <label> Password</label>
  <input className={styles.put} type="text" value={values.pwd} name="pwd" onChange={(event) => { setValues(rest => { return ({ ...rest, [event.target.name]: event.target.value }) }) }} /> */}
      {values.error && <p className="text-danger">{values.error}</p>}
      <button className="btn btn-primary btn-lg mt-3 mb-5"  onClick={addToList}>Create User</button>
      <h1> UserList</h1>
      {userList.map((val, key) => {
        return (
          
          <div className="container d-flex justify-content-center border border-white rounded-top">
             
             
            
            <div key={key}>
            <div className="form-group ">
            <div className="h3 text-white d-block">{val.userName}</div>
              <div className="input-group mb-5 col-xs-2">
                  <input type="text" className="form-control-lg " placeholder="New username" name="newUserName" onChange={handleChange} aria-label="" aria-describedby="basic-addon1"></input>
                  <input type="text" className="form-control-lg" placeholder="New password" name="newPwd" onChange={handleChange} aria-label="" aria-describedby="basic-addon1"></input>
                  <div className="input-group-prepend">
                      <div className="d-inline">
                        <button className="btn btn-primary btn-lg" onClick={() => updateUserName(val.userName)}>Update User</button>
                      </div >
                      <div className="d-inline m-3">
                        <button className="btn btn-light btn-lg"  onClick={() => deleteUser(val.userName)}> Delete User</button>  
                      </div>
                  </div>
              </div>
          </div>
           
            {/*
            <div><input className={styles.put} type="text" placeholder="New username" name="newUserName" onChange={handleChange}></input>
            <input className={styles.put} type="text" placeholder="New password"  name="newPwd" onChange={handleChange}></input>
            <button className="btn btn-primary btn-md" onClick={() => updateUserName(val.userName)}> Update </button></div>
          */}
         
            {newValues.oldUserName === val.userName && newValues.error && <p className={styles.error}>{newValues.error}</p>}
            
           
          </div> </div>);
      })}
    </div>
  );
}

export default EditUser;

