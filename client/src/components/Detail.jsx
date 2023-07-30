import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Componente de detalle
const Detail = () => {
  // Obtenemos el ID desde la URL a la que accedemos
  const { id } = useParams(); 

  // Utilizar useSelector para obtener los perros desde el estado global
  const dogs = useSelector((state) => state.allDogs);

  // Tambien para obtener los perros creados
  // const dbDogs = useSelector((state) => state.dbDogs);

  // Creamos una variable dog que obtendra valor dependiendo del tipo de ID ingresado
  let dog = null;

  // Si el id es mayor a 3 digitos (es decir, meyor a las 3 cifras que llegan todos los perros)
  // Buscamos un id coincidente al ingresado en la base de datos, y dog tendra el valor de ese perro
  if(id.length>3){dog = dogs.find((dog) => dog.id === id)}

  // De otro modo, buscamos la raza específica en el estado global (dogs) con ese ID de params y lo guardamos en la variable
  else{dog = dogs.find((dog) => dog.id === parseInt(id));}


  // Establecemos un tamaño fijo para las imágenes
  const imageWidth = "300px";
  const imageHeight = "300px";



  // Renderizado de todos los detalles de la raza
  return (
    <div>
      <h1> Breed Details: </h1>
      <h2>{dog.name}</h2>
      <p> Id: {dog.id}</p>
      <p> Height: between {dog.height} inches</p>
      <p> Weight: between {dog.weight} kg's</p>
      <p> Life Span: {dog.life_span}</p>
      <p> Temperaments: {dog.temperament}</p>
      <img src={dog.image} alt={dog.name} style={{ width: imageWidth, height: imageHeight }}/>
    </div>
  );
}

export default Detail;