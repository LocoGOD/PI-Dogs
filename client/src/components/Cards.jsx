// Importamos useEffect para trabajar con el tiempo de vida de nuestros componentes
import { useEffect, useState } from "react";

// Importamos funciones de react para despachar acciones y acceder al estado global respectivamente
import { useDispatch, useSelector } from "react-redux";

// Importamos la accion para obtener todos los perros
import { getAllDogs } from "../redux/actions";

// Importamos el componente card para crear las necesarias en este componente Cards
import Card from "./Card";



const Cards = () => {
  
    // FUNCIONES PARA OBTENER LOS DATOS DEL ESTADO GLOBAL

    // Guardamos la funcion despachadora, para enviar las acciones al reducer
    const dispatch = useDispatch();

    // useEffect() de React. Se utiliza para efectos secundarios en componentes funcionales, como hacer llamadas a una API, En este caso, 
    // lo usamos para despachar la acción importada getAllDogs() apenas se monte el componente (sea renderizado por primera vez). 
    // getAllDogs() enviará la solicitud para obtener todos los perros desde la API y actualizará el estado global allDogs.
    useEffect( () => {dispatch(getAllDogs())}, [dispatch] );

    // useSelector() de redux para guardar una parte del estado global. Su argumento es una función que toma el estado global(state) 
    // como argumento y devuelve la porción deseada. En este caso, el valor del estado allDogs y lo guardamos en la constante "dogs".
    const dogs = useSelector((state) => state.allDogs);




    // FUNCIONES PARA HACER EL PAGINADO:
      
    // Estado local para saber el número de página actual, arranca en pagina 1!
    const [currentPage, setCurrentPage] = useState(1);
  
    // Cantidad de perros a mostrar por página
    const itemsPerPage = 8;

    // Calcular el índice inicial y final de los perros a mostrar en la página actual
    const indexOfLastDog = currentPage * itemsPerPage;
    const indexOfFirstDog = indexOfLastDog - itemsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

    //Función para cambiar de página
    const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);};

    

    
// Renderizado - Mapeamos la constante de dogs con datos del e. global y renderizamos una card por cada una, tambien definimos el paginado!
  return (
    <div>
      {/* Paginación */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(dogs.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>


    {/* Mapeado de data para card's */}    
    {currentDogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            weight={dog.weight}
            temperament={dog.temperament}
            image={dog.image.url}
          />
        );
      })}
    </div>
  );
}

export default Cards;
