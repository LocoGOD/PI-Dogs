import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../redux/actions"; // Importa la acción desde el archivo actions.js

// Barra de busqueda
const SearchBar = () => {
   
   // Estado local del nombre recibido en la barra, comienza con un string vacio
   let [name,setName] = useState("");

   // Obtenemos la función para despachar a Redux
   const dispatch = useDispatch();

   // En caso se reciba un valor mediante el input (barra), se actualizara el valor del estado local a ese input
   const handleChange = (event) => {setName(event.target.value)}

   // Función para manejar la búsqueda al hacer clic en el botón
   // Llamamos a la acción importada para obtener el perro por nombre, con argumento usando al estado local
   // Limpiamos el valor del estado local para futuras búsquedas
   const handleSearch = () => {
   dispatch(getDogsByName(name))
   setName("")}


   // Renderizado
   return (
      <div>
         {/*EL input mencionado anteriormente, el cual le dara el valor al estado local*/}
         <input type='search' onChange={handleChange} value={name}/>

         {/*Boton Search!, hacemos un llamado a la funcion handleSearch (despachadora) el estado local definido alli como parametro*/}  
         <button type="submit" onClick = {handleSearch} > Search a dog! </button>
      </div>
   );
}

export default SearchBar;