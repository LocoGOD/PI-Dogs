// React hooks - link para enviar al detalle
import {Link} from "react-router-dom"

function Card({id,name,weight,temperament,image}){ //props recibidas de Cards!
   
   // Establecemos una resolucion general para las imágenes
   const imageWidth = "300px";
   const imageHeight = "300px";
   
   //Renderizado
   return ( 
      <div> 
         {/*Desplegamos el nombre que recibimos por parametro en el componente, con un link al hacer click hacia su detail*/}
         <Link to={"/detail/"+id}><h2>{name}</h2></Link>

         <p> Weight between {weight} kg's</p>
         <p> Temperaments: {temperament} </p>

         {/*Y la imagen con resolucion definida arriba*/}
         <img src={image} alt='raza' style={{ width: imageWidth, height: imageHeight }}/>
      </div>);
}

export default Card; 