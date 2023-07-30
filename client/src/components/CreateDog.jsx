import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDog } from '../redux/actions';

const CreateDog = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    weight_min: '',
    weight_max: '',
    height_min: '',
    height_max: '',
    life_span: '',
    temperament: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar para evitar que se ingresen valores negativos en opciones numéricas
    if (name === 'weight_min' || name === 'weight_max' || name === 'height_min' || name === 'height_max') {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue) || numericValue < 0) {
        return;
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del nuevo perro:', formData);

    try {
      const response = await dispatch(postDog(formData));
      console.log('Respuesta de la acción postDog:', response);

      setFormData({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        life_span: '',
        temperament: '',
        image: ''
      });
    } catch (error) {
      console.error('Error al crear el perro:', error);
    }
  };

  


  return (
    <div>
      <h1>Crear Nuevo Perro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="weight_min">Peso Mínimo:</label>
          <input
            type="number"
            id="weight_min"
            name="weight_min"
            min="0" // Establecer el valor mínimo como 0
            value={formData.weight_min}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="weight_max">Peso Máximo:</label>
          <input
            type="number"
            id="weight_max"
            name="weight_max"
            min="0" // Establecer el valor mínimo como 0
            value={formData.weight_max}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="height_min">Altura Mínima:</label>
          <input
            type="number"
            id="height_min"
            name="height_min"
            min="0" // Establecer el valor mínimo como 0
            value={formData.height_min}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="height_max">Altura Máxima:</label>
          <input
            type="number"
            id="height_max"
            name="height_max"
            min="0" // Establecer el valor mínimo como 0
            value={formData.height_max}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="life_span">Esperanza de Vida:</label>
          <input
            type="text"
            id="life_span"
            name="life_span"
            value={formData.life_span}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="temperament">Temperamento:</label>
          <input
            type="text"
            id="temperament"
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Perro</button>
      </form>
    </div>
  );
};

export default CreateDog;
