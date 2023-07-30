import './App.css';
// Componentes importados:
import Landing from './components/Landing';
import Nav from './components/Nav';
import About from './components/About';
import Error from './components/Error';
import Home from './components/Home';
import Detail from './components/Detail';
import CreateDog from './components/CreateDog';
// Y hooks para aplicar ruteo, obtener informacion de la ruta actual y manejar direccion hacia otra
import {Routes, Route, useLocation} from "react-router-dom"

function App() {
//Podemos acceder a la ubicacion actual usando la variable creada location + .pathname!
const location = useLocation()
  
// Renderizado
  return (
    <div className="App">
      {/*Barra nav con los botones para ir a otros componentes, aparecera SIEMPRE excepto en la landing page*/}
      {location.pathname!=="/" ? <Nav/> : null}
         <Routes>
             <Route path='/' element={<Landing/>}/>
             <Route path='/home' element={<Home/>}/>
             <Route path='/about' element={<About/>}/>
             <Route path='/detail/:id' element={<Detail/>}/>
             <Route path='/create' element={<CreateDog/>}/>
             <Route path='/:error' element={<Error/>}/>
        </Routes>
    </div>);
}
export default App;
