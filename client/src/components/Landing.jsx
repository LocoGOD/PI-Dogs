import {Link} from "react-router-dom";

const Landing = () =>{
    return(
        <div>
            <h1>Bienvenido a mi página!</h1>
            <h2>Hace click para ingresar a ver perritos!</h2>
            <button>
                <Link to="/home"> CLICK ON ME! </Link>
            </button>
        </div>
    )
} 

export default Landing;