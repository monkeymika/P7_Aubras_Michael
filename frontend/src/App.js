import "./styles/index.scss";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Accueil from './pages/Accueil';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/ProfilePage';
import {AuthContext} from './helpers/AuthContext';
import {useState, useEffect}  from "react";
import axios from "axios";
import logo from "../src/styles/pages/logo/icon-left-font-monochrome-white.png";
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';


function App() {
  const [authState, setAuthState] = useState({
    username: "", 
    id: 0, 
    role: "",
    status: false
  });

  useEffect(() => {  
    axios
    .get("http://localhost:4000/auth/auth", {
      headers: {
      accessToken: localStorage.getItem('accessToken'),
    }
    })
    .then((res) => {
      if (res.data.error) { setAuthState({...authState, status: false });
      }else {
          setAuthState({ 
          username: res.data.username, 
          id: res.data.id, 
          role: res.data.role,
          status: true
        });
      }
    });
  }, [authState]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id: 0, role: "", status: false, });
  }

  const refreshPage = ()=>{
    window.location.href="http://localhost:3000/login";
  }

  
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState }}>
    
        <Router>
          <div className="navbar">
           
            <div className="links">
              {/* Si "accessToken n'est pas dans le session storage,
              "signup" et "login" n'apparaissent pas sur la page d'accueil*/}
              {!authState.status ? (
                <>
                  <Link to="/login"> Login </Link>
                  <Link to="/registration"> Signup </Link>
                </>
              ) : (
                <>
                  <Link to="/"> <HomeIcon fontSize=""></HomeIcon> </Link>
                  <Link to="/createpost"> <CreateIcon fontSize=""></CreateIcon> </Link>
                </>
              )}

            </div>
              <div className="logo">
                <img src={logo} alt="" />
              </div>
            <div className="loggedInContainer">
              <h1>{authState.username}</h1>
              {authState.status && <button onClick={() => {logout(); refreshPage();}}> <ExitToAppTwoToneIcon fontSize=""></ExitToAppTwoToneIcon> </button> }
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Accueil/>} />
            <Route path="/createpost" element={<CreatePost/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>  
    </div>
  );
};

export default App;
