import styled from 'styled-components';

export const NavContainer = styled.nav
`
background-image: url("/bgNav.jpg"); /* Ajusta la ruta de la imagen */
background-size: cover; /* Ajusta el tamaño de la imagen al contenedor */
border-color: white;
color: #85C1E9;
padding: 10px;
font-size: 16px;
font-family: 'Delius Unicase', cursive;
border-bottom: 2px solid #FFF;
margin-bottom:0%;
`

export const NavButton = styled.button
`
cursor: pointer;
margin-right: 30px;   /*Margen derecho*/
background-color: #007bff;
padding: 8px 12px;       /*espaciado entre texto y boton por dentro*/
border-radius: 100px;  /*redondeado de los bordes*/
font-size: 15px;      /*tamaño de la fuente*/
font-family: 'Delius Unicase', cursive;
border-color: white;
/*al hacer hover, cambiara de color y de radio de borde*/
&:hover { background-color: #8EE3EF; border-radius: 5px;  /*redondeado de los bordes*/}  
transition: .8s;
`
