import React, { useState } from "react";
import "./SignIn.scss";

const SignIn = () =>{
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    const {nickname, setNickname} = useState('');
    
    return(
        <div className = "signin">
           <form>
                <h1>Sign In</h1>
                <input  value = {email}  name = "email" type = "text" placeholder = "Enter your email..."></input>
                <input value = {password} name = "password" type = "text" placeholder = "Enter your password..."></input>
                <input value = {nickname} name = "nickname" type = "text" placeholder = "Enter your nickname..."></input>
           </form>
           <button type = "signinButton">Sign In</button>
        </div>
    )
}

export default SignIn