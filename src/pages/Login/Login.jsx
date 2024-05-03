import React, { useEffect, useState } from "react";
import "./Login.scss";


const Login = () =>{
    const {email, setEmail} = useState('')
    const {password, setPassword} = useState('')
 
    return(
        <div className = "login">
           <form>
                <h1>Log In</h1>
                <input  value = {email}  name = "email" type = "text" placeholder = "Enter your email..."></input>
                <input value = {password} name = "password" type = "text" placeholder = "Enter your password..."></input>
           </form>
           <button type = "loginButton">Log In</button>
        </div>
    )
}

export default Login