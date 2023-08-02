import styled from 'styled-components';

export const CardStyles = styled.div`

  background-color: rgba(142, 227, 239, 0.4); /* Utiliza un valor alfa de 0.8 para hacerlo ligeramente transparente */
  border: 2px solid #FFF; /* Bordes de 2px de ancho y color blanco (#FFF) */
  

  border-radius: 30px;  /*redondeado de los bordes*/
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  img {
    width: 200px; /* Ancho del 100% del contenedor de la imagen */
    height: 200px; /* Altura predeterminada para las imágenes (ajusta según tus necesidades) */
    border-radius: 30px; 
    border: 2px solid #FFF; /* Bordes de 2px de ancho y color blanco (#FFF) */

}

`

export const ImageStyles = styled.image`
width: 300px; 
height: 300px;

`