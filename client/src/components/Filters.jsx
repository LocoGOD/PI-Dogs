import { useDispatch , useSelector } from "react-redux";
import { sortDogsByName, sortDogsByWeight, filterDogsByTemperament } from "../redux/actions";


const FilterOrder = () =>{
    
    // Nos traemos los temperamentos para las opciones de su filtro, desde el estado global que fueron pedidos en el montaje de home
    const temperaments = useSelector((state) => state.temperaments);

    // Funcion para despachar acciones
    const dispatch = useDispatch();

    // Llamamos a la acción para ordenar los perros por nombre
    const handleNameSortChange = (event) => {
      const order = event.target.value;
      dispatch(sortDogsByName(order))};
    
    // Llamamos a la acción para ordenar los perros por peso
    const handleWeightSortChange = (event) => {
      const order = event.target.value;
      dispatch(sortDogsByWeight(order));};

    // Llamamos a la acción para filtrar los perros por temperamento
    const handleTemperamentFilterChange = (event) => {
      const temperament = event.target.value;
      dispatch(filterDogsByTemperament(temperament));};


    return(
        <div>
            By name:
            {/* Opción desplegable para ordenar alfabéticamente*/}
            <select onChange={handleNameSortChange}>
                <option value="asc">Ascendent</option>
                <option value="desc">Descendent</option>
            </select>
                  
            
            By weight:
            {/* Opción desplegable para ordenar por peso*/}
            <select onChange={handleWeightSortChange}>
                <option value="base">Default</option>
                <option value="asc">From lightest</option>
                <option value="desc">From the heaviest</option>
            </select>


            By temperaments:
            {/* Opción desplegable para ordenar por temperamentos*/}
            <select onChange={handleTemperamentFilterChange}>
                <option value="base">All temperaments</option>
                {temperaments.map((temperament) => (
                    <option key={temperament.id} value={temperament.name}>
                        {temperament.name}
                    </option>
                ))}
            </select>


            By origin:
            {/* Opción desplegable para ordenar por origen(API/DB)*/}
            <select>
                <option value="base">All dogs</option>
                <option value="api">Default dogs</option>
                <option value="db">My dogs</option>
            </select>

  
       

        </div>
    )
}

export default FilterOrder;

