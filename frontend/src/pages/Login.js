import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';
import img from '../styles/pages/logo/login.svg';


function Login() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext)

    let navigate = useNavigate();

    const login = () => {
        const data = {username: username, password: password };
        axios.post("http://localhost:4000/auth/login", data ).then((res) => {
            if (res.data.error) { 
                alert(res.data.error);
            } else {
                localStorage.setItem("accessToken", res.data.token );
                setAuthState({username: res.data.username, id: res.data.id, status: true, role: res.data.role});
                navigate("/");
            }
        });
    };
  
    return (  
        <div className="logContainerAll">
            <div className="loginContainer">

                Pseudo
                <input 
                    type="text" 
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />

                mot de passe
                <input 
                    type="password" 
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                        
                <button onClick={login}> Login</button>
            </div>

            <div className="imgLogin">
                <img src={img} alt="" />
            </div>

        </div>
    )
};

export default Login;