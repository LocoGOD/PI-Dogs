// hook useState para usar estados
import { useState } from 'react';
// useDispatch para despachar acciones
import { useDispatch, useSelector } from 'react-redux';
// traemos la accion postDog!
import { postDog } from '../../redux/actions';

import { ContainerStyles , InputStyles , SubmitButton, TemperamentsContainer , CheckBoxStyled, SummaryButton} from './CreateDogStyles';

// Componente de formulario para creacion de perros:
const CreateDog = () => {

  // Funcion despachadora
  const dispatch = useDispatch();

  // estado para controlar el estado de las checkboxes
  const [selectedTemperaments, setSelectedTemperaments] = useState({});

  // Estado local con los datos que obtendremos de los distintos inputs
  const [formData, setFormData] = useState({
    name: '', weight_min: '', weight_max: '', height_min: '', height_max: '', life_span: '',  temperaments: '',  image: '' });
  
  // Establecemos una URL de imagen por defecto, en caso la URL este vacia!
  const defaultImageUrl = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  // Nos traemos los temperamentos para las opciones de su filtro, desde el estado global que fueron pedidos en el montaje de Landing
  const APItemperaments = useSelector((state) => state.temperaments);


  // Funcion para controlar los cambios en cualquier campo del formulario
  const handleChange = (event) => { 
    // Extraemos las propiedades name y value del campo en el que se ingresó el dato. 
    // Representando "name" el NOMBRE del input y "value" siendo el VALOR ingresado en ESE input (event.target)
    const { name, value } = event.target;

  // Validaciones para que los valores de peso y altura mínimos no sean mayores a sus opuestos, y viceversa
    if(
    // Verificamos si existe la propiedad, si es un campo de numero (integer), y la comparamos con su opuesto
    (name === 'weight_min' && Number(value) > Number(formData.weight_max)) ||
    (name === 'weight_max' && Number(value) < Number(formData.weight_min)) ||
    (name === 'height_min' && Number(value) > Number(formData.height_max)) ||
    (name === 'height_max' && Number(value) < Number(formData.height_min))) {return}

    // Actualizamos ESTADO LOCAL. Pasamos objeto "prevData" a setFormData con las propiedades anteriores del estado local, junto con sus 
    // valores actuales. Al hacer { ...prevData, [name]: value }, copiamos las propiedades actuales del estado en un objeto y reemplazamos 
    // la propiedad con el nombre "name" con el nuevo valor "value". Actualizando asi constantemente el estado local con los valores
    // ingresados por el usuario en el respectivo campo.
    setFormData((prevData) => ({ ...prevData, [name]: value }))};



  
  // Funcion para despachar los datos del form como action cuando se hace click en el submit:
  // El evento que se genera en este caso, sucede cuando el usuario envía el formulario (onSubmit)
  const handleSubmit = async (event) => {

    // Prevenimos recargar la página cuando se submitea.
    event.preventDefault();
    try {
      // Convertimos los valores de peso y altura (min y max) a strings con el formato "min-max" para poder trabajar con filtros
      const weightRange = `${formData.weight_min}-${formData.weight_max}`;
      const heightRange = `${formData.height_min}-${formData.height_max}`;

      // Obtenemos los IDs de los temperamentos seleccionados como enteros
      const selectedTemperamentIdsAsNumbers = getSelectedTemperamentIds();


      // Si el campo imagen está vacío, reemplazamos el valor del estado local con la URL por defecto, de otro modo, sera la que enviemos
      const imageUrl = formData.image.trim() === "" ? defaultImageUrl : formData.image;

      // Creamos objeto con los datos del formulario ya existentes y agregandole los valores de peso-altura recien hechos string y su
      // imagen, que sera el link que proporcionemos, o si estaba vacio, tomara el valor por defecto!
      const dataToSend = {...formData, weight: weightRange, height: heightRange, image: imageUrl, temperaments:selectedTemperamentIdsAsNumbers};

      console.log("Data to send", dataToSend);

      // Enviamos objeto con los datos y guardamos el valor de retorno del despacho de la accion
      const response = await dispatch(postDog(dataToSend));

      // Lo mostramos en consola para chequear si fue enviado correctamente
      console.log('Respuesta de la acción postDog:', response);
  
      // Colocamos todos los campos en blancos una vez se haya completado el submit!
      setFormData({ name: '', weight_min: '', weight_max: '', height_min: '', height_max: '', life_span: '', temperaments: '', image: ''});
    
      // Restablecemos el estado local para deseleccionar las checkboxes
      setSelectedTemperaments({});

    } catch (error) {console.error('Error al crear el perro:', error)}
  };




  // Función para manejar los cambios en un checkbox de temperamentos individual
  const handleSingleTemperamentSelect = (event) => {
    const temperamentId = event.target.value;
    setSelectedTemperaments((prevChecked) => ({
      ...prevChecked,
      [temperamentId]: !prevChecked[temperamentId], // Invertimos el valor actual del temperamento seleccionado
    }));
  };


  // Función para obtener los IDs de los temperamentos seleccionados como enteros
  const getSelectedTemperamentIds = () => {
    return Object.keys(selectedTemperaments).filter(
      (temperamentId) => selectedTemperaments[temperamentId]
    ).map(Number);
  };



// Renderizado del formulario:
  return (
    <div>
    
      {/*Formulario que al submittear ejecuta la funcion handleSubmit*/}
      
      <ContainerStyles onSubmit={handleSubmit}>
      <h1>Create new dog!</h1>
        {/*Etiquetas para ingresar los datos, con sus respectivas propiedades, type para seleccionar el tipo de dato, id y name 
        para identicarlas, y el value linkeado al estado local, junto a la funcion que lo actualiza correspondientemente*/}
        <div>
          <label htmlFor="name">Name:</label>
          <InputStyles type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>

        {/*En las etiquetas de numeros, tambien le aplicamos un minimo de 0 para no ingresar numeros negativos*/}
        <div>
          <label htmlFor="weight_max">Max. Weight:</label>
          <InputStyles type="number" id="weight_max" name="weight_max" min="0" value={formData.weight_max} onChange={handleChange}/>
        </div>
        
        <div>
          <label htmlFor="weight_min">Min. Weight:</label>
          <InputStyles type="number" id="weight_min" name="weight_min" min="0" value={formData.weight_min} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="height_max">Max. Height:</label>
          <InputStyles type="number" id="height_max" name="height_max" min="0" value={formData.height_max} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="height_min">Min. Height:</label>
          <InputStyles type="number" id="height_min" name="height_min" min="0" value={formData.height_min} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="life_span">Life Span:</label>
          <InputStyles type="text" id="life_span" name="life_span" value={formData.life_span} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="image">Image URL:</label>
          <InputStyles type="text" id="image" name="image" value={formData.image} onChange={handleChange}/>
        </div>




        <details>
          <SummaryButton>Select temperaments:</SummaryButton>
          <TemperamentsContainer>
            {APItemperaments.map((temperament) => (
              <div key={temperament.id}>
                <CheckBoxStyled   
                  type="checkbox"
                  id={temperament.id}
                  name={temperament.name}
                  value={temperament.id}
                  onChange={handleSingleTemperamentSelect}
                  checked={selectedTemperaments[temperament.id] || false}
                />
                <label htmlFor={temperament.id}>{temperament.name}</label>
              </div>
            ))}
         </TemperamentsContainer> 
        </details>




 
        <SubmitButton type="submit">Create!</SubmitButton>
     
    </ContainerStyles>
    </div>
  );
};

export default CreateDog;
