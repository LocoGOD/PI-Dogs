import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Componente de detalle
const Detail = () => {
  // Obtenemos el ID desde la URL a la que accedemos
  const { id } = useParams(); 

  // Utilizar useSelector para obtener los perros desde el estado global
  const dogs = useSelector((state) => state.allDogs);

  // Buscamos la raza específica en el estado global (dogs) con ese ID de params y lo guardamos en una variable
  const dog = dogs.find((dog) => dog.id === parseInt(id));

  // Establecemos un tamaño fijo para las imágenes
  const imageWidth = "300px";
  const imageHeight = "300px";

  // Verificar si dog es undefined antes de renderizar los detalles, es decir, recargamos pagina sin entrar al home, podria generar bugs
  if (!dog) {
    return <div>Cargando...</div>;
  }

  // Renderizado de todos los detalles de la raza
  return (
    <div>
      <h1> Detalles de la raza: </h1>
      <h2>{dog.name}</h2>
      <p> Id: {dog.id}</p>
      <p> Altura: {dog.height.imperial} pulgadas.</p>
      <p> Peso: entre {dog.weight.imperial} kilos.</p>
      <p> Esperanza de vida: {dog.life_span}</p>
      <p> Temperamentos: {dog.temperament}</p>
      <img src={dog.image.url} alt={dog.name} style={{ width: imageWidth, height: imageHeight }}/>
    </div>
  );
}

export default Detail;