// Importamos useEffect para trabajar con el tiempo de vida de nuestros componentes
import { useEffect } from "react";

// Importamos funciones de react para despachar acciones 
import { useDispatch } from "react-redux";

// Importamos las acciones para obtener todos los perros y temperamentos
import { getAllDogs , getTemperaments } from "../redux/actions"

import {Link} from "react-router-dom";


const Landing = () =>{

    // Guardamos la funcion despachadora, para enviar las acciones al reducer
    const dispatch = useDispatch();

    // useEffect() de React. Se utiliza para efectos secundarios en componentes funcionales, como hacer llamadas a una API, En este caso, 
    // lo usamos para despachar la acción importada getAllDogs() apenas se monte el componente (sea renderizado por primera vez). 
    // getAllDogs() enviará la solicitud para obtener todos los perros desde la API y actualizará el estado global allDogs.
    useEffect( () => {dispatch(getAllDogs())}, [dispatch] );

    // Hacemos lo mismo para almacenar los temperamentos traidos de la DB a nuestro estado global, apenas se monte el componente
    useEffect( () => {dispatch(getTemperaments())}, [dispatch] );



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