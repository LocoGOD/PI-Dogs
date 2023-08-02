// Importamos funciones de react para acceder al estado global
import { useSelector } from "react-redux";

// Importamos el componente card para crear las necesarias en este componente Home
import Card from "../Card/Card";

import { CardRow, HomeContainer, PagButton } from "./HomeStyles";

// Componente Home, que recibe como props el estado local de paginas y la funcion para setearlas desde app.js
const Home = ({ currentPage, handlePageChange }) => {
  
    // useSelector() de redux para guardar una parte del estado global. Su argumento es una función que toma el estado global(state) 
    // como argumento y devuelve la porción deseada. En este caso, el valor del estado allDogs y lo guardamos en la constante "dogs".
    const dogs = useSelector((state) => state.allDogs);

    // Cantidad de perros a mostrar por página
    const itemsPerPage = 8;


    // Calculamos índice inicial y final de los perros a mostrar en la página actual
    // Multiplicando el número de página (currentPage) por la cantidad de perros por página (itemsPerPage). 
    // El índice inicial es indexOfFirstDog, y el índice final es indexOfLastDog.
    const indexOfLastDog = currentPage * itemsPerPage;
    const indexOfFirstDog = indexOfLastDog - itemsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

    
    
// Renderizado - Mapeamos "dogs" que tiene datos del estado global y renderizamos una card por cada dog, tambien definimos el paginado!
  return (
    <HomeContainer>
      {/* Paginación */}
      <div className="pagination">
        {Array.from({length: Math.ceil(dogs.length/itemsPerPage)}).map((_, index) => (
        <PagButton key={index} onClick={() => handlePageChange(index + 1)}>{index + 1}</PagButton>))}
      </div>


    {/* Mapeado de data para card's */}    
    <CardRow> 
    {currentDogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            weight={dog.weight}
            temperament={dog.temperament}
            image={dog.image}
          />);
      })}
    </CardRow> 
    </HomeContainer>
  );
}

export default Home;
