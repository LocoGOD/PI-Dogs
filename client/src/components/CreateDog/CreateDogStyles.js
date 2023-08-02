import styled from 'styled-components';

export const ContainerStyles = styled.form
`
background-image: url("/bgForm.jpg"); /* Ajusta la ruta de la imagen */
background-size: cover;
background-attachment: fixed; /* Fija la imagen de fondo */
min-height: 100vh; /* Establece una altura mínima de la ventana visible (100% del viewport height) */

border: 1px solid #FFF;
font-size: 16px;
font-family: 'Delius Unicase', cursive;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
color: white;
`

export const InputStyles = styled.input
`
  color: white;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 15px;
  border-color: white;
  background-color: #007bff;
  padding: 2px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-family: 'Delius Unicase', cursive;
`




export const SummaryButton = styled.summary
`
color: white;
margin-top:15px;
cursor: pointer;
background-color: #007bff;
padding: 8px 12px;       /*espaciado entre texto y boton por dentro*/
border-radius: 100px;  /*redondeado de los bordes*/
font-size: 15px;      /*tamaño de la fuente*/
font-family: 'Delius Unicase', cursive;
/*al hacer hover, cambiara de color*/
&:hover { background-color: #8EE3EF; }  
transition: .8s;
`

// Estilos CSS para el contenedor de los temperamentos
export const TemperamentsContainer = styled.div`
  margin-top:10px;
  margin-bottom;10px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 15px;
  background-color: #8EE3EF;
`;


export const CheckBoxStyled = styled.input`
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 15px;
  padding: 2px 10px;
`;


export const SubmitButton = styled.button
`
color: white;
margin-top:20px;
color: white;
cursor: pointer;
margin-right: 30px;   /*Margen derecho*/
background-color: #007bff;
padding: 8px 12px;       /*espaciado entre texto y boton por dentro*/
border-radius: 100px;  /*redondeado de los bordes*/
font-size: 15px;      /*tamaño de la fuente*/
font-family: 'Delius Unicase', cursive;
border-color: white;
/*al hacer hover, cambiara de color y de radio de borde*/
&:hover { background-color: #8EE3EF; }  
transition: .8s;
`