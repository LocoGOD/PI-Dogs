// React hooks - link para enviar al detalle
import {Link} from "react-router-dom"
import { CardStyles } from "./CardStyles";

// Componente de tarjeta individual, con props recibidas de Home!
const Card = ({id,name,weight,temperament,image}) => { 

   
//Renderizado
return ( 
      <CardStyles> 
         {/*Desplegamos el nombre que recibimos por parametro en el componente, con un link que al hacer click lleva hacia su detail*/}
         <Link to={"/detail/"+id}><h2>{name}</h2></Link>

         {/*Propiedades de peso y temperamentos*/}
         <p> Weight between {weight} kg's</p>
         <p> Temperaments: {temperament} </p>

         {/*Y la imagen con resolucion definida arriba*/}
         <img src={image} alt='raza' />
      </CardStyles>);
}

export default Card; 