import { GET_ALL_DOGS, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, SORT_BY_NAME, SORT_BY_WEIGHT, FILTER_BY_TEMPERAMENT, POST_DOG} from "./actionTypes";
import axios from "axios";

// Accion para llamada al servidor obteniendo todos los perros:
export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios('http://localhost:3001/dogs');
      // Evaluamos si el objeto recibido (que son las razas) tiene al menos 1 objeto... (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_ALL_DOGS, con payload igual a data de response, (las razas)
       if(data.length > 0) return dispatch({ type: GET_ALL_DOGS, payload: data });
    } catch (error) {
       console.log(error);}};
};


// Accion para llamada al servidor obteniendo todos los temperamentos:
export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios('http://localhost:3001/temperaments');
      // Evaluamos si el objeto recibido (que son los temperamentos) tiene al menos 1 objeto... (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_ALL_DOGS, con payload igual a data de response, (las razas)
       if(data.length > 0) return dispatch({ type: GET_TEMPERAMENTS, payload: data });} 
       
    catch (error) {console.log(error);}};
};




// Accion de busqueda por nombre:
export const getDogsByName = (name) =>{
  return async function (dispatch) {
    try {
      const {data} = await axios(`http://localhost:3001/dogs?name=${name}`)
      // Evaluamos si el objeto recibido (que es un dog) tiene una propiedad name... (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_DOG_BY_NAME, con payload igual a data de response, (el dog)
      if(data.length > 0) return dispatch({ type: GET_DOGS_BY_NAME, payload: data });} 
      
    catch (error) {console.log(error);}};
};


// Accion para ordenar los perros por nombre
export const sortDogsByName = (order) => {
  return async function (dispatch, getState) {
    try {
      // Obtenemos la lista de perros del estado global
      const {allDogs} = getState();

      // Realizamos copia de la lista para no modificar el estado directamente
      let sortedDogs = [...allDogs];

      // Ordenamos perros de forma ascendente
      sortedDogs.sort((a, b) => a.name.localeCompare(b.name));

      // Invertimos el arreglo si la opcion es "desc"
      if (order === "desc") { sortedDogs.reverse();}

      // Despachamos la acción con la lista de perros ordenada
     return dispatch({ type: SORT_BY_NAME, payload: sortedDogs });} 
     
     catch (error) {console.log(error);}};
};


export const sortDogsByWeight = (order) => {
  return async function (dispatch, getState) {
    try {
      // Nos traemos las propiedades del estado global, allDogs y BackupDogs
      const { allDogs, backupDogs } = getState();

      // Variable de perros ordenados que obtendra un valor dependiendo la opcion seleccionada  (parametro)
      let sortedDogs = null;

      // Si la opcion es ascendente, hacemos una copia superficial, tomamos los pesos minimos, los parseamos y ordenamos de menor a mayor.
      if (order === "asc") {sortedDogs = [...allDogs].sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))} 
      
      // Si la opcion es descendente, hacemos una copia superficial, tomamos los pesos minimos, los parseamos y ordenamos de mayor a menor.
      else if (order === "desc") {sortedDogs = [...allDogs].sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))} 
      
      // Si es la opcion base, la variable toma el valor del array copia, es decir, lo retorna como nuevo sin modificaciones
      else if (order === "base") {sortedDogs = [...backupDogs]}

      // Despachamos la accion con el valor igual a la variable antes modificada
     return dispatch({ type: SORT_BY_WEIGHT, payload: sortedDogs });} 
     
     catch (error) {console.log(error);}};
};


// Accion para filtrar por temperamentos
export const filterDogsByTemperament = (temperament) => {
  return async function (dispatch, getState) {
    try {
      const {backupDogs} = getState();
      
      // Si el parametro es diferente a la opcion base, filtramos los perros por el temperamento seleccionado
      if(temperament !== "base"){
      // Creamos una variable que tome el valor del array de todos los perros, es decir, del estado copia tempDogs
      let filteredDogs = backupDogs
      // A este array lo filtramos por el temperamento recibido por parametro, y en caso seleccionemos otra opcion, volveremos a
      // darle el valor del estado copia, evitando una acumulacion del filtrado
      filteredDogs = filteredDogs.filter((dog) => dog.temperament && dog.temperament.includes(temperament));
      // Despachamos accion con payload igual a ese array filtrado, en caso se vuelva a ejecutar, se repite el proceso ya mencionado
     return dispatch({ type: FILTER_BY_TEMPERAMENT, payload: filteredDogs });}


      // De otro modo, es decir, caso base, retornamos unicamente el array copia tempDogs!
      else dispatch({ type: FILTER_BY_TEMPERAMENT, payload: backupDogs});

    } catch (error) { console.log(error);}};
};


// Accion para enviar los datos del formulario a la base de datos mediante axios y los metodos ya definidos en el Back
export const postDog = (formData) => {
  return async function (dispatch) {
    // Una vez recibidos los datos del form en formData, los posteamos y nos quedamos con el objeto creado para trabajar
    // tambien lo almacenamos en el estado global en caso lo necesitemos
    try {
      const {data} = await axios.post('http://localhost:3001/dogs', formData);
      return dispatch({ type: POST_DOG, payload: data })} 
      
    catch (error) {console.log(error)}};
};