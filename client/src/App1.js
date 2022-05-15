import React,{useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios';
import { response } from 'express';

function App() {
  const [userName,setUserName] = useState('')
  const [pwd, setPwd] = useState('')
  const[newUserName, setNewUserName] = useState('')
  const[newPwd, setNewPwd] = useState('')
  const[userList, setUserList] = useState([])

  useEffect(()=>{
  Axios.get("/allUser").then((response)=>{
    setUserList(response.data);
  })
  },[])

  const addToList = () =>{
    Axios.post("/newUser",{
      userName: userName,
      pwd: pwd
    }); 
  }

  const updateUserName = () => {
    Axios.post("/updateUser",{
      newUserName: newUserName,
      newPwd: newPwd
    }) 
  }

  const deleteUser = () => {
    Axios.post("/deleteUser",userName)
  }

  return (
    <div className="App">
      <h1> CRUD FOR USER </h1>
      <label> User Name</label>
      <input type = "text" onChange={(event) => {setUserName(event.target.value)}}/>
      <label> Password</label>
      <input type = "text" onChange={(event) => {setPwd(event.target.value)}}/>
      <button onClick={addToList}>Create User</button>
      <h1> UserList</h1>
      {userList.map((val,key)=>{
        return (
        <div key = {key} className = "user"> 
        <h1>{val.username}</h1> <h1>{val.password} </h1>
        <input type = "text" placeholder = "New User Name" 
        onChange={(event) => {setNewUserName(event.target.value)}}></input>
        <input type = "text" placeholder = "New Password" 
        onChange={(event) => {setNewPwd(event.target.value)}}></input>
        <button onClick={updateUserName}> Update </button>
        <button onClick={()=>deleteUser(val.username)}> Delete User</button>
        </div>);
      })}
    </div>
  );
}

export default App;
