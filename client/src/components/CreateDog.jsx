// hook useState para usar estados
import { useState } from 'react';
// useDispatch para despachar acciones
import { useDispatch } from 'react-redux';
// traemos la accion postDog
import { postDog } from '../redux/actions';


// Componente de formulario
const CreateDog = () => {

  // Funcion despachadora
  const dispatch = useDispatch();

  // Estado local con los datos que obtenemos de los distintos inputs
  const [formData, setFormData] = useState({
    name: '', weight_min: '', weight_max: '', height_min: '', height_max: '', life_span: '',  temperament: '',  image: '' });



  // Funcion para controlar los cambios en cualquier campo del formulario
  const handleChange = (event) => { 
    // Extraemos las propiedades name y value del campo en el que se ingresó el dato. 
    // Representando "name" el nombre del input y value siendo el valor ingresado en ese input.
    const { name, value } = event.target;
    // setFormData para actualizar estado local. Pasamos un objeto al setFormData con las propiedades anteriores (prevData) junto con sus 
    // valores actuales. Al hacer { ...prevData, [name]: value }, copiamos las propiedades actuales del estado en un objeto y reemplazamos 
    // la propiedad con el nombre "name" con el nuevo valor "value". Actualizando asi el ingresado por el usuario en el campo respectivo.
  setFormData((prevData) => ({ ...prevData, [name]: value }));};



  // Funcion para despachar los datos del form como action cuando se hace click en el submit:
  // El evento que se genera en este caso, sucede cuando el usuario envía el formulario (onSubmit)
  const handleSubmit = async (event) => {
    // Prevenimos recargar la página cuando se submitea.
    event.preventDefault();
    try {
      // Nos guardamos el valor de retorno del despacho de la accion, es decir el objeto creado para mostrarlo en consola
    const response = await dispatch(postDog(formData));
    console.log('Respuesta de la acción postDog:', response);
    // Colocamos todos los campos en blancos una vez se haya completado el submit!
    setFormData({name: '', weight_min: '', weight_max: '', height_min: '', height_max: '', life_span: '', temperament: '', image: ''});
    
    } catch (error) {console.log(error);}
  };

  


  // Renderizado del formulario:
  return (
    <div>
      {/*Formulario que al submittear ejecuta la funcion handleSubmit*/}
      <h1>Create new dog!</h1>
      <form onSubmit={handleSubmit}>

        {/*Etiquetas para ingresar los datos, con sus respectivas propiedades*/}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>

        {/*En las etiquetas de numeros, tambien le aplicamos un minimo de 0 para no ingresar negativos*/}
        <div>
          <label htmlFor="weight_min">Min. Weight:</label>
          <input type="number" id="weight_min" name="weight_min" min="0" value={formData.weight_min} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="weight_max">Max. Weight:</label>
          <input type="number" id="weight_max" name="weight_max" min="0" value={formData.weight_max} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="height_min">Min. Height:</label>
          <input type="number" id="height_min" name="height_min" min="0" value={formData.height_min} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="height_max">Max. Height:</label>
          <input type="number" id="height_max" name="height_max" min="0" value={formData.height_max} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="life_span">Life Span:</label>
          <input type="text" id="life_span" name="life_span" value={formData.life_span} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="temperament">Temperaments:</label>
          <input type="text" id="temperament" name="temperament" value={formData.temperament} onChange={handleChange}/>
        </div>

        <div>
          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" name="image" value={formData.image} onChange={handleChange}/>
        </div>

        <button type="submit">Create!</button>
      </form>
    </div>
  );
};

export default CreateDog;
