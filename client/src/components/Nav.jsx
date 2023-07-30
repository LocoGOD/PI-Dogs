import SearchBar from "./Searchbar";
import {Link, useLocation} from "react-router-dom"
import FilterOrder from "./Filters";

// Componente que nos muestra la barra superior:
export default function Nav(){
   
//Podemos acceder a la ubicacion actual usando la variable creada location.pathname!
const location = useLocation()   
    
   return(
        <>  
            {/*Botones hacia otros componentes!*/}
            <button><Link to="/about">Disclaimer!</Link></button>
            <button><Link to="/home">Home</Link></button>
            <button><Link to="/create">Create your dog!</Link></button>
            {/*SearchBar y filtros solo disponibles en componente Home!*/}
            {location.pathname==="/home" ? <SearchBar/> : null}
            {location.pathname==="/home" ? <FilterOrder/> : null}
        </>)
}