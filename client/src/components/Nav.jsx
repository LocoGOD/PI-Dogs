import SearchBar from "./Searchbar";
import {Link, useLocation} from "react-router-dom"

// Componente que nos muestra la barra superior:
export default function Nav(){
   
    //Podemos acceder a la ubicacion actual usando la variable creada location.pathname!
    const location = useLocation()   
    
   return(
        <>  
            {/*Botones hacia otros componentes!*/}
            <button><Link to="/about">Disclaimer!</Link></button>
            <button><Link to="/home">Home</Link></button>
            <button><Link to="/create">Crea tu perro!</Link></button>
            {/*SearchBar solo disponible en componente Home (Cards)!*/}
            {location.pathname==="/home" ? <SearchBar/> : null}
        </>)
}