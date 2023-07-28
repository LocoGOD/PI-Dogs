import { GET_ALL_DOGS, GET_DOGS_BY_NAME } from "./actionTypes";
import axios from "axios";

// Accion para llamada al servidor obteniendo todos los perros:
export const getAllDogs = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios('http://localhost:3001/dogs');
      // Evaluamos si el objeto recibido (que son las razas) tiene al menos 1 objeto... (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_ALL_DOGS, con payload igual a data de response, (las razas)
       if(data.length > 0) dispatch({ type: GET_ALL_DOGS, payload: data });
    } catch (error) {
       console.log(error);}};
};



// Accion de busqueda por nombre:
export const getDogsByName = (name) =>{
  return async function (dispatch) {
    try {
      const {data} = await axios(`http://localhost:3001/dogs?name=${name}`)
      console.log("Data from API:", data);
      // Evaluamos si el objeto recibido (que es un dog) tiene una propiedad name... (para no agregar objetos vacios)
      // Si es asi, despachamos accion al reducer de tipo GET_DOG_BY_NAME, con payload igual a data de response, (el dog)
      if(data.name) dispatch({ type: GET_DOGS_BY_NAME, payload: data });
    } catch (error) {
       console.log(error);}};
};