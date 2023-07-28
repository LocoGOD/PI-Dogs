import React, { useState } from 'react';

const CreateDog = () => {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');
  const [temperaments, setTemperaments] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleLifeSpanChange = (e) => {
    setLifeSpan(e.target.value);
  };

  const handleTemperamentsChange = (e) => {
    setTemperaments(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al backend usando axios u otra librería para hacer solicitudes HTTP.
    // Por ejemplo:
    // axios.post('/api/dogs', { name, height, weight, lifeSpan, temperaments });
    // Luego puedes manejar la respuesta del backend, mostrar un mensaje de éxito o error, etc.
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <hr/>
      <h1>Formulario para crear tu raza de perro!</h1>


      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      
      <hr/>

      <label>
        Height:
        <input type="text" value={height} onChange={handleHeightChange} />
      </label>
      
      <hr/>
      
      <label>
        Weight:
        <input type="text" value={weight} onChange={handleWeightChange} />
      </label>
      
      <hr/>
      
      <label>
        Life Span:
        <input type="text" value={lifeSpan} onChange={handleLifeSpanChange} />
      </label>
      
      <hr/>
      
      <label>
        Temperaments:
        <input type="text" value={temperaments} onChange={handleTemperamentsChange} />
      </label>
      
      <hr/>
      
      <label>
        URL de imagen (opcional):
        <input type="text" value={temperaments} onChange={handleTemperamentsChange} />
      </label>

      <hr/>

      <button type="submit">Crear perro!</button>
    </form>
  );
};

export default CreateDog;