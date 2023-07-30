import { GET_ALL_DOGS, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, SORT_BY_NAME, SORT_BY_WEIGHT, FILTER_BY_TEMPERAMENT, POST_DOG} from "./actionTypes";

// Estado global con todas sus propiedades:
const initialState = {
        allDogs: [],        // Perros que se veran modificados con los filtros
        backupDogs: [],     // En caso de aplicar un filtro exclusivo, el caso default los devolvera sin filtros
        dbDogs: [],         // Perros nuestros, almacenados en la base de datos
        temperaments: [],   // Temperamentos adquiridos de la base de datos
    }

// Reducer 
const reducer = (state = initialState, action) => {
    // Segun el tipo de accion despachada
    switch (action.type){
        // Si es getAllDogs, ejecuta su payload que es la llamada al servidor para todos los perros y los guarda en el estado global
        // y sus copias correspondientes en caso de querer borrar filtrados
        case GET_ALL_DOGS:
            return {...state,allDogs:action.payload, backupDogs:action.payload};
          
        case GET_TEMPERAMENTS:
        // Guarda el estado global entero y pisa la propiedad temperaments
        return{...state, temperaments: action.payload}
        
        // Si es getDogsByName, ejecuta su payload que es la llamada al servidor para buscar por query
        case GET_DOGS_BY_NAME:
            return{...state, allDogs: action.payload };

        // Si es sortDogsByName, ejecuta su payload que es la llamada al servidor para ordenar dependiendo de la option
        case SORT_BY_NAME:
            return { ...state, allDogs: action.payload };

        // Caso para manejar la acción de ordenar los perros por peso
        case SORT_BY_WEIGHT:
            return { ...state, allDogs: action.payload };

        // Caso para manejar la acción de filtrar los perros por temperamento
        case FILTER_BY_TEMPERAMENT:
              return { ...state, allDogs: action.payload};

        // Caso para manejar el posteo de un perro:
        case POST_DOG:
            return{...state, dbDogs: action.payload}
    
        // Caso default devuelve una copia del estado global
        default:
            return {...state};
    }
}

export default reducer;