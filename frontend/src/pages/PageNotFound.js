import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound() {
  return (
    <div>
        <h1>Page Not Found :</h1>
        <h2>Essayez par ici : <Link to="/"> Accueil </Link></h2>
    </div>
  )
}

export default PageNotFound;