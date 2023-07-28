import { GET_ALL_DOGS, GET_DOGS_BY_NAME} from "./actionTypes";

// Estado global con todas sus variables, perros, temperamentos, etc
const initialState = {
        allDogs: [],
        temperaments: [],
    }

// Reducer 
const reducer = (state = initialState, action) => {
    // Segun el tipo de accion despachada
    switch (action.type){
        // Si es getAllRaces, ejecuta su payload que es la llamada al servidor
        case GET_ALL_DOGS:
            // Guarda el estado global entero y pisa la propiedad allDogs
            return{...state, allDogs: action.payload}
        
        case GET_DOGS_BY_NAME:
            return{...state, allDogs: action.payload  }

        // Caso default devuelve una copia del estado global
        default:
            return {...state};
    }
}

export default reducer;