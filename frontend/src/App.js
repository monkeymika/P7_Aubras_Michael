import "./styles/index.css";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Accueil from './pages/Accueil';
import CreatePost from './pages/CreatePost';


function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost"> Create a post </Link>
        <Link to="/"> Accueil </Link>
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/createpost" element={<CreatePost/>} />
        </Routes>
      </Router>  
    </div>
  )
}

export default App;
