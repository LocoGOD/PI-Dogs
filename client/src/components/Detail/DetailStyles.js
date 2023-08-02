import styled from 'styled-components';

export const DetailContainer = styled.div
`
background-image: url("/bgHome.jpg");
background-size: cover;
background-attachment: fixed; /* Fija la imagen de fondo */
min-height: 100vh; /* Establece una altura mínima de la ventana visible (100% del viewport height) */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`


export const PseudoCardContainer = styled.div
`
max-width: 470px; /* Ajusta el ancho máximo del contenedor */
margin: 0 auto; /* Centra el contenedor en la pantalla */
border-color: white;
color: white;
font-size: 15px;
font-family: 'Delius Unicase', cursive;
background-color: rgba(142, 227, 239, 0.4); /* Utiliza un valor alfa de 0.8 para hacerlo ligeramente transparente */
border: 2px solid #FFF; /* Bordes de 2px de ancho y color blanco (#FFF) */
border-radius: 30px;  /*redondeado de los bordes*/
img {
    width: 270px; 
    height: 270px; 
    border-radius: 30px; 
    border: 2px solid #FFF; /* Bordes de 2px de ancho y color blanco (#FFF) */
}
`
