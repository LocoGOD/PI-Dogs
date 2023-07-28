import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../redux/actions"; // Importa la acción desde el archivo actions.js

// Barra de busqueda
const SearchBar = () => {
   
   // Estado local del ID recibido, comienza con un string vacio
   let [name,setName] = useState("");

   // Obtenemos la función despachadora del store de Redux
   const dispatch = useDispatch();

   // En caso se reciba un valor mediante el input (barra), se actualizara el valor del estado local a ese input (id 1 por ej)
   const handleChange = (event) => {setName(event.target.value)}

   // Función para manejar la búsqueda al hacer clic en el botón
   const handleSearch = () => {
   // Llamamos a la acción para obtener el perro por nombre
   dispatch(getDogsByName(name));
   // Limpiamos el valor del estado local para futuras búsquedas
   setName("");}



   // Renderizado
   return (
    
      <div>
         {/*EL input mencionado anteriormente, el cual le dara el valor al estado local de dicho input,
         //EN IMPUTS USAMOS ONCHANGE PARA VERIFICAR CAMBIOS, Y EN BOTONES, ONCLICK//*/}
         <input type='search' onChange={handleChange} value={name}/>

         {/*Boton para buscar, hacemos un llamado a la funcion onSearch recibida como parametro con el id que sera nuestro estado local,
         y el valor de este, el mismo del imput! Todo esto irá dentro de un callback para evitar que se ejecute solo, seguido de 
         reiniciar el id a un string vacio ("") para mayor comodidad del usuario*/}  
         <button type="submit" onClick = {handleSearch} > Buscá! </button>
      </div>
   );
}

export default SearchBar;