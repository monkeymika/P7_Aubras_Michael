import "./styles/index.css";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Accueil from './pages/Accueil';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/"> Accueil </Link>
          <Link to="/createpost"> Create a post </Link>
        </div>
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/post/:id" element={<Post/>} />
        </Routes>
      </Router>  
    </div>
  );
};

export default App;
