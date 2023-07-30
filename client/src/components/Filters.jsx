import { useDispatch , useSelector } from "react-redux";
import { sortDogsByName, sortDogsByWeight, filterDogsByTemperament, filterDogsByOrigin } from "../redux/actions";
import { useState } from "react";


const FilterOrder = () =>{
    
    // Nos traemos los temperamentos para las opciones de su filtro, desde el estado global que fueron pedidos en el montaje de landing
    const temperaments = useSelector((state) => state.temperaments);

    // Funcion para despachar acciones
    const dispatch = useDispatch();

    // Estado local para las opciones de ordenamiento (name y weight) comienzan en "base" (---)
    const [nameSort, setNameSort] = useState("base");
    const [weightSort, setWeightSort] = useState("base");



    // Llamamos a la acción para ordenar los perros por nombre
    const handleNameSortChange = (event) => {
      const order = event.target.value;
      dispatch(sortDogsByName(order))
      // Actualizamos el estado local para que se modifique la option correspondiente
      setNameSort(order);
      // Y restablecemos la otra option a base, en caso tenga otro valor diferente a "base"(---)
      setWeightSort("base");};
    


    // Llamamos a la acción para ordenar los perros por peso
    const handleWeightSortChange = (event) => {
      const order = event.target.value;
      dispatch(sortDogsByWeight(order))
      // Actualizamos el estado local para reflejar la opción seleccionada
      setWeightSort(order);
      // Y restablecemos la otra option a base, en caso tenga otro valor diferente a "base"(---)
      setNameSort("base");};



    // Llamamos a la acción para filtrar los perros por temperamento
    const handleTemperamentFilterChange = (event) => {
      const temperament = event.target.value;
      dispatch(filterDogsByTemperament(temperament));
       // Restablecemos las opciones "By name" y "By weight" si elegimos una opción de temperaments
       setNameSort("base");
       setWeightSort("base");};


    // Llamamos a la acción para filtrar los perros por temperamento
    const handleOriginFilterChange = (event) => {
      const origin = event.target.value;
      dispatch(filterDogsByOrigin(origin));
        // Restablecemos las opciones "By name" y "By weight" si elegimos una opción de origen
        setNameSort("base");
        setWeightSort("base");};


        

    // Renderizado:    
    return(
        <div>
            By name:
            {/* Opción desplegable para ordenar alfabéticamente*/}
            <select onChange={handleNameSortChange} value={nameSort}>
                <option value="base">---</option>
                <option value="asc">Ascendent</option>
                <option value="desc">Descendent</option>
            </select>
                  
            
            By weight:
            {/* Opción desplegable para ordenar por peso*/}
            <select onChange={handleWeightSortChange} value={weightSort}>
                <option value="base">---</option>
                <option value="asc">From lightest</option>
                <option value="desc">From the heaviest</option>
            </select>


            By temperaments:
            {/* Opción desplegable para ordenar por temperamentos*/}
            <select onChange={handleTemperamentFilterChange}>
                <option value="base">---</option>
                {temperaments.map((temperament) => (
                    <option key={temperament.id} value={temperament.name}>
                        {temperament.name}
                    </option>
                ))}
            </select>


            By origin:
            {/* Opción desplegable para ordenar por origen(API/DB)*/}
            <select onChange={handleOriginFilterChange}>
                <option value="base">---</option>
                <option value="api">Default dogs</option>
                <option value="db">My dogs</option>
            </select>

        </div>
    )
}

export default FilterOrder;

