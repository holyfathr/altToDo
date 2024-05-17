import React, { useEffect, useState } from "react";
import "./Login.scss";


const Login = () =>{
    const {email, setEmail} = useState('')
    const {password, setPassword} = useState('')
 
    return(
        <div className = "login">
           <form>
                <h1>Вход</h1>
                <input  value = {email}  name = "email" type = "text" placeholder = "Введите почту"></input>
                <input value = {password} name = "password" type = "text" placeholder = "Введите пароль"></input>
           </form>
           <button type = "loginButton">Вход</button>
        </div>
    )
}

export default Login