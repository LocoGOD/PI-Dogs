// Importamos el metodo styled para crear nuestros componentes!
import styled from "styled-components"

// Contenedor de toda la landing, por lo que todo lo que este adentro tendra estas propiedades:
export const Container = styled.div 
`
text-align: center;     /*todo centrado*/

`


// Titulo principal
export const Title = styled.h1
` text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
  margin-bottom: 30px;  /*margen inferior*/
  margin.top:10px;
  font-family: 'Open Sans', sans-serif;   /*tipo de fuente*/
  font-family: 'Genos', sans-serif;
`


export const AboutContainer = styled.div`
font-family: 'Genos', sans-serif;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 20px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-image: url("/bgAbout.jpg"); /* Ajusta la ruta de la imagen */
  background-size: cover;
  background-attachment: fixed; /* Fija la imagen de fondo */
  min-height: 100vh; /* Establece una altura mínima de la ventana visible (100% del viewport height) */
`;

export const AboutImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 1000px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 2px solid #FFF; /* Bordes de 2px de ancho y color blanco (#FFF) */
`;

export const AboutLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin: 5px;
  color: #FFFFFF;
  text-decoration: underline;
`;