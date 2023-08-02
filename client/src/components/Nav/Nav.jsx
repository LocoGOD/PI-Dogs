import SearchBar from "../Searchbar/Searchbar";
import {Link, useLocation }  from "react-router-dom"
import { NavContainer, NavButton } from './NavStyles';
import FilterOrder from "../Filters/Filters";

// Componente Nav que nos muestra la barra superior recibe de prop la funcion de onPageChange, para darsela al componente de filtros
const Nav = ({handlePageChange}) => {
   
// Podemos acceder a la ubicacion actual usando la variable creada location.pathname!
const location = useLocation()   

// Funcion para manejar la alerta en caso de QUIT
const handleQuitClick = () => {
    const confirmed = window.confirm("Are you sure you want to QUIT? All your dogs will be lost");
    if(confirmed) {window.location = "/"}};


// Renderizado
return(
  <div>  
    {/*Botones hacia otros componentes!*/}
    <NavContainer>
        <NavButton onClick={handleQuitClick}> Quit </NavButton>
        <NavButton><Link to="/about"> Disclaimer </Link></NavButton>
        <NavButton><Link to="/home"> Home </Link></NavButton>
        <NavButton><Link to="/create"> Create your dog! </Link></NavButton>
        {/*SearchBar y filtros (que le damos la prop de onPageChange recibida) solo renderizados en componente Home!*/}
        {location.pathname==="/home" ? <SearchBar/> : null}   
        {location.pathname==="/home" ? <FilterOrder handlePageChange={handlePageChange}/> : null}
    </NavContainer>
 </div>)
}

export default Nav;