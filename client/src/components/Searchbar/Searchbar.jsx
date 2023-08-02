import { useState , useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions"; // Importa la acción desde el archivo actions.js
import { SearchBarStyle } from "./SearchbarStyles";

// Componente de barra de busqueda
const SearchBar = () => {
   
   // Estado local del nombre recibido en la barra, comienza con un string vacio
   let [name,setName] = useState("");

   // Obtenemos la función para despachar a Redux
   const dispatch = useDispatch();


  // useEffect para aplicar el input guardado, se lanzara siempre que el componente sea MONTADO
  useEffect(() => {
   // Variable para el input, nos quedamos con su valor, buscandolo por propiedad "value", que es "name", y lo almacenamos en memoria 
   // con el metodo localStorage
   const storedName = localStorage.getItem("name");
   // En caso la variable tenga valor, es decir el input no este vacio, seteamos ese valor sacado de la memoria al estado local, es
   // decir, la devolvemos a como estaba antes de abandonar el componente (desmontarlo)
   if(storedName) setName(storedName)}, []);

   
  // useEffect que se ejecuta cada vez que el estado local name cambia, es decir, cuando el usuario ingresa un nuevo valor en el input.
  // Este guarda el nuevo valor del input en la memoria local utilizando la clave "name". 
  useEffect(() => {localStorage.setItem("name", name)}, [name]);


  // En caso se reciba un valor mediante el input, se actualizara el valor del estado local a ese input
  const handleChange = (event) => {
   const newName = event.target.value; // Obtenemos el valor del input actualizádonse desde el evento
   setName(newName); // Pisamos el estado local con el nuevo valor, continuamente
   dispatch(getDogsByName(newName))} // Despachar la acción cada vez que el valor sea actualizado
    

// Renderizado
   return (
      <div>
         {/*EL input mencionado anteriormente, el cual linkea el estado local con el input para poder enviar el nombre a buscar*/}
         Search by name: <SearchBarStyle type='search' placeholder="Try me!" onChange = {handleChange} value={name}></SearchBarStyle>
      </div>
   );
}

export default SearchBar;