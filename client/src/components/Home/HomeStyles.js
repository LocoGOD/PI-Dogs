import styled from 'styled-components';

export const HomeContainer = styled.div
`
background-image: url("/bgHome.jpg");
background-size: cover;
background-attachment: fixed; /* Fija la imagen de fondo */
min-height: 100vh; /* Establece una altura mínima de la ventana visible (100% del viewport height) */
border-color: white;
color: #85C1E9;
font-size: 16px;
font-family: 'Delius Unicase', cursive;

`

export const CardRow = styled.div
`
/* Utilizamos CSS Grid para organizar las tarjetas en 2 columnas con 4 perros cada una */
display: grid;
grid-template-columns: repeat(4, minmax(0, 1fr)); /* Crea 2 columnas con el mismo ancho */
gap: 15px; /* Espacio entre las tarjetas */

`


export const PagButton = styled.button
`
cursor: pointer;
margin-top: 10px;
margin-bottom: 10px; 
margin-right: 10px;   /*Margen derecho*/
background-color: #007bff;
padding: 8px 12px;       /*espaciado entre texto y boton por dentro*/
border-radius: 100px;  /*redondeado de los bordes*/
font-size: 15px;      /*tamaño de la fuente*/
font-family: 'Delius Unicase', cursive;
border-color: white;
/*al hacer hover, cambiara de color y de radio de borde*/
&:hover { background-color: #8EE3EF;   /*redondeado de los bordes*/
transition: .8s;}


`