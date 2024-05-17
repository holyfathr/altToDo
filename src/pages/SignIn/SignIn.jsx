import React, { useState } from "react";
import "./SignIn.scss";

const SignIn = () =>{
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    const {nickname, setNickname} = useState('');
    
    return(
        <div className = "signin">
           <form>
                <h1>Регистрация</h1>
                <input  value = {email}  name = "email" type = "text" placeholder = "Введите почту"></input>
                <input value = {password} name = "password" type = "text" placeholder = "Придумайте пароль"></input>
                <input value = {nickname} name = "nickname" type = "text" placeholder = "Придумайте ник"></input>
           </form>
           <button type = "signinButton">Регистрация</button>
        </div>
    )
}

export default SignIn