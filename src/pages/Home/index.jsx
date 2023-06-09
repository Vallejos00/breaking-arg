import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const handleForm = () =>{    
    axios.post('http://localhost:3030/api/users/login', {userName: user, password: password })
    .then( res => {
        if(res.status==200){
            const user = res.data.user 
            navigate('/inicio')
            localStorage.setItem('user', JSON.stringify(user))
        }
    })
    .catch(res => {
        if(res.status !==200){
        setErr(res.response.data.message);
    }})   
}

    
 return(
 <div>

 <form onSubmit={(e)=>{
    e.preventDefault()
    handleForm(e)
   }}>
    <label htmlFor=""> Nombre de usuario
        <input type="text" name='userName' value={user} onChange={(e)=> setUser(e.target.value)}/>
    </label>
    <label htmlFor=""> Contraseña
        <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
    </label>
        <button type='submit'>Ingresar</button>
        <button onClick={()=>navigate('/register')}>Registrarse</button>
    {err ? <p>{err}</p> : null}
 </form> 
 
 </div>
 )
}

export { Home }