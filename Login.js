import React, { useContext, useEffect, useState } from "react";
import {ThemeContext} from "./App";
import{useResource} from "react-request-hook";
export default function Login({dispatch}){
    
    const [username,setUsername]=useState("")
    const theme = useContext(ThemeContext)
    function handleUsername(e) {setUsername(e.target.value)}
    const [loginFailed, setLoginFailed] = useState(false)
    const [password, setPassword] = useState('')
    function handlePass(e){setPassword(evt.target.value)}

    const [user, login] = useResource((username, password)=> ({
        url: `/login/${encodeURI(username)}/${encodeURI(password)}`,method: 'get'}))
        useEffect (() => {if (user && user.data) {if (user.data.length > 0) {setLoginFailed(false)
            dispatch({ type: 'LOGIN', username: user.data[0].username })} 
        else {
            setLoginFailed(true)
            }}}, [user])
    return(
        <>
        <form onSubmit={(e)=>{e.preventDefault(); dispatch({type: 'LOGIN' ,username})}}>
            <label htmlFor="uname"><b>Username</b></label>
            <input type="text" value={username} onChange={handleUsername} name="uname" required id ="user-login"></input>
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required id = "user-pass"></input>
			<input type="submit" value="Login" disabled={username.length ===0}/>
        </form>
        {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
        </>
    );
}