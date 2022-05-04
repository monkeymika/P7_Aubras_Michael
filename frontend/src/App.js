import "./styles/index.css";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Accueil from './pages/Accueil';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import {AuthContext} from './helpers/AuthContext';
import {useState, useEffect}  from "react";
import axios from "axios";


function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    
      axios.get("http://localhost:4000/auth/auth", {headers: {
        accessToken: localStorage.getItem('accessToken')
      }}).then((res) => {
        if (res.data.err) { setAuthState(false)
        }else {
          setAuthState(true);
        }
      })
    
  }, []);


  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/"> Accueil </Link>
            <Link to="/createpost"> Create a post </Link>
            {/* Si "accessToken n'est pas dans le session storage,
            "signup" et "login" n'apparaissent pas sur la page d'accueil*/}
            {!authState && (
              <>
                <Link to="/login"> Login </Link>
                <Link to="/registration"> Signup </Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Accueil/>} />
            <Route path="/createpost" element={<CreatePost/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Router>
      </AuthContext.Provider>  
    </div>
  );
};

export default App;
