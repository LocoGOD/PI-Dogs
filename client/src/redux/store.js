// Creacion de la store!
// Importamos los metodos createStore, el método para aplicar middlewares y otro para usar extensiones web
import { createStore, applyMiddleware, compose } from "redux";
// Middleware que nos permitira hacer peticiones a apis.
import thunkMiddleware  from "redux-thunk";
// Muy importante traer el reducer;
import reducer from "./reducer";

// Linea para conectarnos con la extension del navegador (Redux DevTools)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Definimos la store con su respectivo middleware para la extension de navegador, y thunk para peticionar apis
const store = createStore(
    reducer, composeEnhancer(applyMiddleware(thunkMiddleware))
)

// La exportamos
export default store;