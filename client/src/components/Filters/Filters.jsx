import { useDispatch , useSelector } from "react-redux";
// Importamos las acciones de filtros a despachar
import { sortDogsByName, sortDogsByWeight, filterDogsByTemperament, filterDogsByOrigin } from "../../redux/actions";
import { useState, useEffect } from "react";
import { OptionStyle } from "./FiltersStyles";

// Componente de barra de filtros,recibe por prop la funcion para setear paginado:
const FilterOrder = ({ handlePageChange }) =>{
   
  // Nos traemos los temperamentos para las opciones de su filtro, desde el estado global que fueron pedidos en el montaje de Landing
  const temperaments = useSelector((state) => state.temperaments);

  // Funcion para despachar acciones
  const dispatch = useDispatch();

  // Estados locales para todas las opciones, todas comenzarán en "base" (---)
  const [nameSort, setNameSort] = useState("base");
  const [weightSort, setWeightSort] = useState("base");
  const [originFilter, setOriginFilter] = useState("base");
  const [temperamentFilter, setTemperamentFilter] = useState("base")



  // // useEffect para aplicar las opciones guardadas, se lanzara siempre que el componente sea MONTADO
  useEffect(() => {
        // Nos guardamos variables para cada opcion, nos quedamos con cada valor, buscandolo por su propiedad "value", que es sera 
        // diferente para cada opcion, DESDE LA MEMORIA LOCAL, SI QUEDO ALGUNA SELECCIONADA  
        const storedNameSort = localStorage.getItem("nameSort");
        const storedWeightSort = localStorage.getItem("weightSort");
        const storedOriginFilter = localStorage.getItem("originFilter");
        const storedTemperamentFilter = localStorage.getItem("temperamentFilter");
        // En caso las variables tengan valor alguno, es decir el input no este vacio, seteamos esos valor sacado de la memoria 
        // al estado local, es decir, las devolvemos a como estaban antes de abandonar el componente (desmontarlo)
        if (storedNameSort) setNameSort(storedNameSort);
        if (storedWeightSort) setWeightSort(storedWeightSort)
        if (storedOriginFilter) setOriginFilter(storedOriginFilter);
        if (storedTemperamentFilter) setTemperamentFilter(storedTemperamentFilter)}, []);



  // useEffect que que se ejecuta cada vez que los estados locales de las opciones cambian, es decir, cuando el usuario cambia de opcion,
  // se guarda el nuevo valor de la misma en la memoria local utilizando la clave que le corresponda. 
  useEffect(() => {
    localStorage.setItem("nameSort", nameSort);
    localStorage.setItem("weightSort", weightSort);
    localStorage.setItem("originFilter", originFilter);
    localStorage.setItem("temperamentFilter", temperamentFilter);
  }, [nameSort, weightSort, originFilter, temperamentFilter]);




  // FUNCIONES DESPACHADORAS:

    // Llamamos a la acción para ordenar los perros por nombre
    const handleNameSortChange = (event) => {
      // Order representa la opcion de nombre marcada, ya sea "Asc" o "Desc", despachamos la accion con el tipo de orden como parametro
      const order = event.target.value;
      dispatch(sortDogsByName(order))
      // Actualizamos el estado local para que se modifique la option correspondiente
      setNameSort(order);
      // Y restablecemos la option "Weight" a base, en caso tenga otro valor diferente a (---)
      setWeightSort("base");
      // Usando la funcion para setear paginas, la volvemos a la primera, esto se repetira en cualquier filtro!
      handlePageChange(1);};
    

    // Llamamos a la acción para ordenar los perros por peso
    const handleWeightSortChange = (event) => {
      // Order representa la opcion de peso marcada, ya sea "Asc" o "Desc", despachamos la accion con el tipo de orden como parametro
      const order = event.target.value;
      dispatch(sortDogsByWeight(order))
      // Actualizamos el estado local para reflejar la opción seleccionada
      setWeightSort(order);
      // Y restablecemos la option "Name" a base, en caso tenga otro valor diferente a (---)
      setNameSort("base");
      handlePageChange(1);};


    // Llamamos a la acción para filtrar los perros por temperamento
    const handleTemperamentFilterChange = (event) => {
      // Temperament representa la opcion de temp marcada, despachamos la accion con el temperamento seleccionado como parametro
      const temperament = event.target.value;
      dispatch(filterDogsByTemperament(temperament));
       // Restablecemos las opciones "By name" , "By weight" y "By Origin" si elegimos una opción de temperaments
       setNameSort("base");   setWeightSort("base");    //setOriginFilter("base");
       // Y el estado local obtiene el temperamento seleccionado en la opcion
       setTemperamentFilter(temperament);
       handlePageChange(1);};


    // Llamamos a la acción para filtrar los perros por origen
    const handleOriginFilterChange = (event) => {
      // Origin representa la opcion de origen marcada, despachamos la accion con el origen seleccionado como parametro
      const origin = event.target.value;
      dispatch(filterDogsByOrigin(origin));
        // Restablecemos las opciones "By name" , "By weight" y "By Temperament" si elegimos una opción de origin
        setNameSort("base");    setWeightSort("base");    setTemperamentFilter("base");
        // Y el estado local obtiene el origen seleccionado en la opcion
        setOriginFilter(origin);
        handlePageChange(1);};




// Renderizado:    
    return(

            <div>
            Order by name:  
            {/* Opción desplegable para ordenar alfabéticamente*/}
            <OptionStyle onChange={handleNameSortChange} value={nameSort}>
                <option value="base">---</option>
                <option value="asc">Ascendent</option>
                <option value="desc">Descendent</option>
            </OptionStyle>
                  
            
            Order by weight:  
            {/* Opción desplegable para ordenar por peso*/}
            <OptionStyle onChange={handleWeightSortChange} value={weightSort}>
                <option value="base">---</option>
                <option value="asc">From lightest</option>
                <option value="desc">From the heaviest</option>
            </OptionStyle>


            Filter by temperaments:  
            {/* Opción desplegable para ordenar por temperamentos*/}
            <OptionStyle onChange={handleTemperamentFilterChange}  value={temperamentFilter}>
                <option value="base">---</option>
                {temperaments.map((temperament) => (
                    <option key={temperament.id} value={temperament.name}>
                        {temperament.name}
                    </option>
                ))}
            </OptionStyle>


            Filter by origin:  
            {/* Opción desplegable para ordenar por origen(API/DB)*/}
            <OptionStyle onChange={handleOriginFilterChange} value={originFilter}>
                <option value="base">---</option>
                <option value="api">Default dogs</option>
                <option value="db">My dogs</option>
            </OptionStyle>
            </div>

    )
}

export default FilterOrder;

