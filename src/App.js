import React, { useState, useEffect } from 'react'
import AuthorList from './author/AuthorList'

import Signup from './user/Signup'
import Signin from './user/Signin'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

import Axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Alert } from 'react-bootstrap'

export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token != null){
      let user = jwt_decode(token);

      if(user) {
        setIsAuth(true);
        setUser(user);
      }
      else if(!user){
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  }, [])
  

  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    })
  }

  const loginHandler = (cred) => {
    Axios.post("auth/signin", cred)
    .then(res => {
      console.log(res.data.token);

      let token = res.data.token;
      if(token != null)
      {
        localStorage.setItem("token", token);
        let user = jwt_decode(token);
        setIsAuth(true);
        setUser(user);
        setMessage("User logged In successfully!")
      }

    })
    .catch(err => {
      console.log(err);
    })
  }

  const onLogoutHandler = (e) =>{
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setMessage("User logged out successfully")
  }

  const msg = message ? (
    <Alert variant="success">{message}</Alert>
  ) : null;

  return (
    <Router>
      <div>
      {msg}
      <nav>
          {isAuth ? (
          <div>
            {user ? "welcome " + user.user.name : null} &nbsp;
          <Link to="/">Home</Link> &nbsp;
          <Link to="/logout" onClick={onLogoutHandler}>Logout</Link>
        </div>

           ) : (
            <div>
          <Link to="/">Home</Link> &nbsp;
          <Link to="/signup">Signup</Link> &nbsp;
          <Link to="/signin">Signin</Link> &nbsp;
            </div>
           )}

        </nav>

        <div>
          <Routes>
            <Route path="/" element= { isAuth ? <AuthorList /> : <Signin login={loginHandler}></Signin>}></Route>
            <Route path="/signup" element= {<Signup register={registerHandler} />}></Route>
            <Route path="/signin" element= { isAuth ? <AuthorList /> : <Signin login={loginHandler}></Signin>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
