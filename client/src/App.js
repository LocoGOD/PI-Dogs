import './App.css';

// Componentes importados:
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Error from './components/Error/Error';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreateDog from './components/CreateDog/CreateDog';

// Hooks para aplicar ruteo, obtener informacion de la ruta actual
import {Routes, Route, useLocation} from "react-router-dom"
import { useState } from 'react';

function App() {

// Podemos acceder a la ubicacion actual usando la variable creada location + .pathname!
const location = useLocation()

// Creamos un estado local que pasaremos por props, representando el paginado que arranca en 1, lo pasamos a home para el paginado propio
// hasta llegar a los filtros, para que cada vez que eligamos uno, se vuelva a la pagina 1
const [currentPage, setCurrentPage] = useState(1);

// Funcion para setear las paginas al numero ingresado por parametro, la usamos para volver a la pagina 1, generalmente
const handlePageChange = (pageNumber) => {setCurrentPage(pageNumber);};


// Renderizado
  return (
    <div className="App">
      {/*Barra nav con los botones para ir a otros componentes, aparecera SIEMPRE excepto en la landing page*/}
      {location.pathname!=="/" ? <Nav handlePageChange={handlePageChange}/> : null}
      
      <Routes>
             <Route path='/' element={<Landing/>}/>
             {/*El componente home lleva tambien no solo la funcion sino el estado para manejarlo en ese componente*/}
             <Route path='/home' element={<Home currentPage={currentPage} handlePageChange={handlePageChange}/>}/>
             <Route path='/about' element={<About/>}/>
             <Route path='/detail/:id' element={<Detail/>}/>
             <Route path='/create' element={<CreateDog/>}/>
             <Route path='/:error' element={<Error/>}/>
      </Routes>
    </div>);
}
export default App;
