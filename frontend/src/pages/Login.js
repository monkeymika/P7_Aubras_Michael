import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const login = () => {
        const data = {email: email, password: password };
        axios.post("http://localhost:4000/auth/login", data ).then((res) => {
            if (res.data.error) { 
                alert(res.data.error);
            } else {
                sessionStorage.setItem("accessToken", res.data );
                navigate("/");
            }
        });
    };
  
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