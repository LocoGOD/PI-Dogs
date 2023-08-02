import { GET_ALL_DOGS, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, SORT_BY_NAME, SORT_BY_WEIGHT, FILTER_BY_TEMPERAMENT, FILTER_BY_ORIGIN, POST_DOG} from "./actionTypes";
import axios from "axios";

// Accion para llamada al servidor obteniendo todos los perros:
export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios('http://localhost:3001/dogs');
      // Evaluamos si el objeto recibido (que son las razas) tiene al menos 1 objeto (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_ALL_DOGS, con payload igual a data de response (las razas)
       if(data.length > 0) return dispatch({ type: GET_ALL_DOGS, payload: data });
    } catch (error) {
      alert(error.response.data); console.log(error)}};
};


// Accion para llamada al servidor obteniendo todos los temperamentos:
export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios('http://localhost:3001/temperaments');
      // Evaluamos si el objeto recibido (que son los temperamentos) tiene al menos 1 objeto... (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_ALL_DOGS, con payload igual a data de response, (los temperamentos)
       if(data.length > 0) return dispatch({ type: GET_TEMPERAMENTS, payload: data });} 
    catch (error) {alert(error.response.data); console.log(error)}};
};


// Accion de busqueda por nombre:
export const getDogsByName = (name) =>{
  return async function (dispatch) {
    try {
      const {data} = await axios(`http://localhost:3001/dogs?name=${name}`)
      // Evaluamos si el objeto recibido (que es un arreglo de dogs) tiene al menos 1 objeto... (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_DOG_BY_NAME, con payload igual a data de response (los dogs coincidentes)
      if(data.length > 0) return dispatch({ type: GET_DOGS_BY_NAME, payload: data });} 
    catch(error) {console.log(error)}};
};


// Accion para ordenar los perros por nombre
export const sortDogsByName = (order) => {
  return async function (dispatch, getState) {
    try {
      // Obtenemos la lista de todos los perros del estado global
      const {allDogs} = getState();

      // Realizamos copia de la lista para no modificar el estado directamente
      let sortedDogs = [...allDogs];

      // Ordenamos perros de forma ascendente con el metodo sort, si la opcion es "asc" o "base" (default)
      sortedDogs.sort((a, b) => a.name.localeCompare(b.name));

      // Invertimos el arreglo si la opcion es "desc"!
      if (order === "desc") { sortedDogs.reverse();}

      // Despachamos la acción, con payload igual a la lista de perros ordenada
      return dispatch({ type: SORT_BY_NAME, payload: sortedDogs });} 
     catch (error) {alert(error.response.data); console.log(error)}};
};


// Accion para ordenar los perros por peso
export const sortDogsByWeight = (order) => {
  return async function (dispatch, getState) {
    try {
      // Nos traemos las propiedades del estado global, allDogs y BackupDogs
      const { allDogs } = getState();

      // Variable de perros ordenados que obtendra un valor dependiendo la opcion seleccionada  (parametro)
      let sortedDogs = null;

      // Si la opcion es "asc", la variable sera una copia superficial de allDogs, ordenada tomando los pesos minimos, siendo
      // parseados y ordenados de menor a mayor.
      if (order === "asc") {sortedDogs = [...allDogs].sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))} 
      
      // Si la opcion es "desc", la variable sera una copia superficial de allDogs, ordenada tomando los pesos minimos, siendo
      // parseados y ordenados de mayor a menor.
      else if (order === "desc") {sortedDogs = [...allDogs].sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight))} 
      
      // Si es la opcion base, la variable toma el valor del array copia, es decir, lo retorna como nuevo sin modificaciones
      //else if (order === "base") {sortedDogs = [...backupDogs]}
      else if (order === "base") {return dispatch(sortDogsByName("asc"));}

      // Despachamos la accion con payload igual al valor de la variable antes modificada
      return dispatch({ type: SORT_BY_WEIGHT, payload: sortedDogs });} 
     catch (error) {alert(error.response.data); console.log(error)}};
};


// Accion para filtrar por temperamentos
export const filterDogsByTemperament = (temperament) => {
  return async function (dispatch, getState) {
    try {
      // Nos traemos el array backup para volver al estado original, y el de filtros para poder acumularlos
      const { backupDogs } = getState();
      
      // Si el parametro es diferente a la opcion base, filtramos los perros por el temperamento seleccionado
      if(temperament !== "base"){

      // Creamos una variable que tome el valor del array copia "backupDogs" para filtrarlos sin miedo a perder la informacion.
      // Ademas, en caso se vuelva a entrar a este condicional, el valor volvera a ser este, evitando acumular filtros!
      let filteredDogs = backupDogs

      // A este array lo filtramos, primero chequeando si tiene temperamentos, y si es asi, si incluye aquel recibido por parametro
      filteredDogs = filteredDogs.filter((dog) => dog.temperament && dog.temperament.includes(temperament));

      // Despachamos accion con payload igual a ese array filtrado, en caso se vuelva a ejecutar, se repite el proceso ya mencionado
      return dispatch({ type: FILTER_BY_TEMPERAMENT, payload: filteredDogs });}

      // De otro modo, es decir, caso base, retornamos el array copia backupDogs!
      else dispatch({ type: FILTER_BY_TEMPERAMENT, payload: backupDogs});} 
      
    catch (error) {alert(error.response.data); console.log(error)}};
};


// Accion para filtrar perros de la base de datos, asi como los de la API
export const filterDogsByOrigin = (origin) => {
  return async function (dispatch, getState) {
    try {
      // Nos traemos el array copia para filtrar sin perder datos
      const { backupDogs } = getState();
      
      // Si el parametro "api"... 
      if(origin === "api"){

      // Creamos una variable que tome el valor del array copia "backupDogs" para filtrarlos sin miedo a perder la informacion.
      // Ademas, en caso se vuelva a entrar a este condicional, el valor volvera a ser este, evitando acumular filtros!
      let originfilteredDogs = backupDogs

      // A este array lo filtramos por su propiedad "created", si es un dog de la API, no deberia tenerla, asi que guardara 
      // aquellos que no la posean
      originfilteredDogs = originfilteredDogs.filter(dog => !dog.created);

      // Despachamos accion con payload igual a ese array filtrado, en caso se vuelva a ejecutar, se repite el proceso ya mencionado
      return dispatch({ type: FILTER_BY_ORIGIN, payload: originfilteredDogs });}


      // Si el parametro es "db"...
      else if(origin === "db"){

      // Creamos una variable que tome el valor del array copia "backupDogs" para filtrarlos sin miedo a perder la informacion.
      // Ademas, en caso se vuelva a entrar a este condicional, el valor volvera a ser este, evitando acumular filtros!
      let originfilteredDogs = backupDogs
  
      // A este array lo filtramos por su propiedad "created", si es un dog de la DB, deberia tenerla, asi que guardara 
      // aquellos que la posean
      originfilteredDogs = originfilteredDogs.filter(dog => dog.created);
  
      // Despachamos accion con payload igual a ese array filtrado, en caso se vuelva a ejecutar, se repite el proceso ya mencionado
      return dispatch({ type: FILTER_BY_ORIGIN, payload: originfilteredDogs });}


      // De otro modo, es decir, caso base, retornamos unicamente el array copia backupDogs!
      else dispatch({ type: FILTER_BY_ORIGIN, payload: backupDogs});}
    catch (error) {alert(error.response.data); console.log(error)}};
};


// Accion para enviar los datos del formulario a la base de datos:
export const postDog = (formData) => {
  return async function (dispatch) {
    // Una vez recibidos los datos del form en formData, los posteamos, nos quedamos con el dog creado y lo enviamos como payload 
    // hacia el estado global en caso de que lo necesitemos para trabajar
    try {
      const {data} = await axios.post('http://localhost:3001/dogs', formData);
      alert("Creation succesful!")
      return dispatch({ type: POST_DOG, payload: data })}
    catch (error) {
      // Evaluamos el tipo de error, si es uno de sequelize sobre un nombre repetido, desplegamos un error personalizado
      if(error.response.data === "llave duplicada viola restricción de unicidad «dogs_name_key»"){
      alert("This dog's name already exists!"); console.log(error)}
      // De otro modo, el que definimos en el back, generalmente, que faltan datos.
      else{ alert(error.response.data); console.log(error)}}};
};