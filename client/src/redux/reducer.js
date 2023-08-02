import { GET_ALL_DOGS, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, SORT_BY_NAME, SORT_BY_WEIGHT, FILTER_BY_TEMPERAMENT,  FILTER_BY_ORIGIN, POST_DOG} from "./actionTypes";

// Estado global con todas sus propiedades:
const initialState = {
        allDogs: [],        // Todos los perros, que se veran modificados con el orden y los filtros
        backupDogs: [],     // En caso de aplicar un filtro o varios, el caso default los devolvera a la forma original
        temperaments: []    // Temperamentos adquiridos de la base de datos
    }   


// Reducer 
const reducer = (state = initialState, action) => {
    // Segun el tipo de accion despachada...
    switch (action.type){

        // Caso getAllDogs, obtiene su payload que es la llamada al servidor para todos los perros y los guarda en el estado global
        // "allDogs" y tambien en su propiedad "backupDogs", en caso de querer reestablecer filtros
        case GET_ALL_DOGS:
            return {...state,allDogs:action.payload, backupDogs:action.payload, allFilteredDogs:action.payload};
          
        // Caso getTemperaments, su payload sale de la llamada a la base de datos, obteniendo los temperamentos, guardandolos en la 
        // propiedad "temperaments" del estado local
        case GET_TEMPERAMENTS:
        return{...state, temperaments: action.payload}
        
        // Caso getDogsByName, su payload sale de la llamada al servidor para buscar por query, obteniendo un array con las coincidencias,
        // y pisando el array allDogs
        case GET_DOGS_BY_NAME:
            return{...state, allDogs: action.payload };

        // Caso sortDogsByName, su payload sale de la accion correspondiente, obteniendo un array ordenado segun la especificacion, y
        // pisando con ese valor a la propiedad allDogs
        case SORT_BY_NAME:
            return { ...state, allDogs: action.payload };

        // Caso sortByWeight, su payload sale de la accion correspondiente, obteniendo un array ordenado segun la especificacion, y
        // pisando con ese valor a la propiedad allDogs
        case SORT_BY_WEIGHT:
            return { ...state, allDogs: action.payload };

        // Caso filterByTemperament, su payload sale de la accion correspondiente, obteniendo un array filtrado segun la especificacion, y
        // pisando con ese valor a la propiedad allDogs
        case FILTER_BY_TEMPERAMENT:
              return { ...state, allDogs: action.payload};

        // Caso filterByOrigin, su payload sale de la accion correspondiente, obteniendo un array filtrado segun la especificacion, y
        // pisando con ese valor a la propiedad allDogs
        case FILTER_BY_ORIGIN:
              return { ...state, allDogs: action.payload};

        // Caso postDog, su payload sale del objeto creado en el form, y enviado con el metodo post en su action correspondiente, y a este
        // nos lo guardamos tanto en allDogs como en backupDogs para poder aplicarle los filtros creados.
        case POST_DOG:
             return {...state, allDogs: [...state.allDogs, action.payload], backupDogs: [...state.backupDogs, action.payload]};
    
        // Caso default, devuelve una copia del estado global.
        default:
            return {...state};
    }
}

export default reducer;