// Importamos el metodo styled para crear nuestros componentes!
import styled from "styled-components"

// Contenedor de toda la landing, por lo que todo lo que este adentro tendra estas propiedades:
export const Container = styled.div 
`
text-align: center;     /*todo centrado*/
`

// Video de fondo, con sus respectivos ajustes
export const VideoBackground = styled.video
`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Colocamos el video al fondo */
  filter: brightness(50%); /* Le bajamos el brillo */
`

// Titulo principal
export const Title = styled.h1
`
  font-size: 42px;  /*tamaño de la fuente*/
  color: white;     /*color de la fuente*/
  margin-bottom: 30px;  /*margen inferior*/
  font-family: 'Delius Unicase', cursive;   /*tipo de fuente*/
`

// Subtitulo
export const Subtitle = styled.h2
`
  font-size: 25px;
  color: white;
  margin-bottom: 30px;
  font-family: 'Delius Unicase', cursive;
`

// Boton enter
export const StyledButton = styled.button
` 
  border-color: white;
  cursor: pointer;
  background-color: #007bff;
  padding: 5px 10px;       /*ancho y alto*/
  border-radius: 100px;  /*redondeado de los bordes*/
  font-size: 20px;      /*tamaño de la fuente*/
  font-family: 'Delius Unicase', cursive;
  ', sans-serif;     /*tipo de fuente*/
  &:hover { background-color: #0056b3; }    /*al hacer hover, es decir, pasar con el mouse por arriba, cambiara de color*/
`


