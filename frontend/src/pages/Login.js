import React, {useState} from 'react';
import axios from 'axios';

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const data = {email: email, password: password };
        axios.post("http://localhost:4000/auth/login", data ).then((res) => {
            console.log(res.data);
        })
    }
  
    return (
        <div className="loginContainer">
                <input 
                    type="text" 
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <input 
                    type="password" 
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                

                <button onClick={login}> Login</button>
        </div>
    )
}

export default Login