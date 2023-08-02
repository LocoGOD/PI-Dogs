const {Dog, Temperament} = require("../db")
const axios = require("axios")
const {Op} = require("sequelize")

let data = null;     // La variable contenedora de datos estará en null al inicio

// Funcion para obtener los datos de la API solo una vez, la ejecutamos cuando necesitemos esta información!
const getApiData = async () => {
    try {
      const response = await axios('https://api.thedogapi.com/v1/breeds');  // Nos quedamos con los datos de la API
      if(!response) throw Error("An error has occurred gathering the api data") // En caso no recibamos los datos
     // Pasamos esos datos a la variable contenedora y los filtramos, quedándonos con las propiedades de nuestro modelo:
      data = response.data.map(dog => ({
            name: dog.name,
            id: dog.id,
            height: dog.height.imperial,
            weight: dog.weight.imperial,
            life_span: dog.life_span,
            temperament: dog.temperament,
            image: dog.image.url,}
        ));
    } catch (error) {
      res.status(404).send(error.message)}
}





// Controlador para traer todas las razas
const getAllRaces = async() =>{
    // Solicitamos las razas
    await getApiData()
    // Las retornamos
    return data;
}



// Controlador para traer razas desde una ID
const getRaceById = async(id) =>{
    
    // Pedimos los datos
    await getApiData()
    
    // Identificamos tipo de peticion en la id, si es un ENTERO sera de la API, si es un UUID sera de la DB
    if (!isNaN(id)) {
    
    // Si es un número entero, es de la API, buscamos ahi...
    const apiDog = await data.find(dog => dog.id === +id)

    // Si existe lo retornamos
    if(apiDog) return apiDog}


    // Si no es un número entero, asumimos que es un UUID y buscamos en la base de datos
    else{
        const dbDog = await Dog.findByPk(id)

    // Si existe en la db, lo retornamos
        if(dbDog) return dbDog;

    //Caso contrario lanzamos error:
        throw Error("There's no dogs with the required ID!")}
    }




// Controlador para traer raza por query:
const getRaceByQuery = async(name) =>{
    
    //Convertimos el name a minúsculas para generalizar
    const searchName = name.toLowerCase();
    
    // Pedimos los datos
    await getApiData()

    // Filtramos el array para encontrar las coincidencias de razas en los datos de la api
    const apiDogs = data.filter(
        (dog) => dog.name.toLowerCase().includes(searchName));

    // Tambien hacemos lo mismo en la base de datos, con sus metodos op!
    const DBdogs = await Dog.findAll({where: {name: {[Op.iLike]: `%${searchName}%`}}})
    
    // Combinamos ambos arrays para poder desplegar todas las razas encontradas:
    const allDogs = [...apiDogs, ...DBdogs] 

    // Si no se encuentran coincidencias en ningun lado, lanzamos error:
    if(allDogs.length === 0) throw Error("No matches with that name, try another.")

    // Caso contrario, retornamos el o las razas encontradas
    return allDogs;
}



// // Controlador para postear una raza:
//  const postRace = async (name,weight,height,life_span,temperament,image) =>{
    
//    //creamos el perro en la base de datos con lo recibido en parametros:
//    const newDog = await Dog.create({name,weight,height,life_span,image})

//    // Verificamos si temperaments existe y si es un arreglo, estos son ids con las cuales podremos ubicar temps en la tabla
//    // Tambien chequeamos que su longitud sea mayor a 0, es decir, minimo uno.
//   if (temperament &&  Array.isArray(temperament)  &&  temperament.length > 0){

//   // Buscamos en la tabla de temperamentos, alguno/s con ID similar/es a los que enviamos en el array!
//   const tempAssociate = await Temperament.findAll({where: {id: temperament}});

//   // Por ultimo, con la funcion setTemperaments creada gracias a sequelize, le asociamos los temperamentos que coincidan a nuestra raza  
//   await newDog.setTemperaments(tempAssociate);}

//   // Retornamos la raza creada
//   return newDog;
// }

// Controlador para postear una raza:
const postRace = async (name, weight, height, life_span, temperaments, image) => {
  // Creamos el perro en la base de datos con los datos recibidos en los parámetros:
  const newDog = await Dog.create({ name, weight, height, life_span, image });

  // Creamos un objeto temporal para modificar y devolver
  const dogData = { ...newDog.get() };

  // Verificamos si temperaments existe y si es un arreglo, estos son ids con los cuales podremos ubicar temperamentos en la tabla.
  // También chequeamos que su longitud sea mayor a 0, es decir, mínimo uno.
  if (temperaments && Array.isArray(temperaments) && temperaments.length > 0) {
    // Buscamos en la tabla de temperamentos, alguno/s con ID similar/es a los que enviamos en el array.
    const tempAssociate = await Temperament.findAll({ where: { id: temperaments } });

    // Creamos un array para almacenar los nombres de los temperamentos asociados a la raza.
    const temperamentNames = tempAssociate.map(temp => temp.name);

    // Asignamos los nombres de temperamentos como una cadena separada por comas al objeto temporal
    dogData.temperament = temperamentNames.join(', ');
  }

  // Retornamos el objeto temporal modificado con los temperamentos actualizados como cadena de texto separada por comas.
  return dogData;
}





// Controlador para traer los temperamentos:
const getTemperaments = async () => {

      // Solicitamos los datos y creamos un set para guardar los temperamentos no repetidos DE LA API
      await getApiData(); 
      const temperaments = new Set();

       // Por cada raza de "Data"...
      data.forEach((dog) => {
      // Verificamos si tiene temperamento alguno, de ser asi... 
        if (dog.temperament){
        // Nos los guardamos en una variable "editada", spliteandolos, y quitando los espacios en blanco con trim
        const editTemp = dog.temperament.split(",").map((temp) => temp.trim());
        // Pusheamos cada uno de los temperamentos editados al SET de temperamentos
        editTemp.forEach((temp) => {temperaments.add(temp);})}    
      });
        
        
      // Creamos otro array, esta vez para retornar todos los temperamentos
      const allTemperaments = [];
      // Iteramos sobre los temperamentos ya guardados y...
      for (const temp of temperaments){
      // Busca en la base de datos si ya existe ese nombre de temp en la tabla. Si no existe, lo crea y lo guarda
        const dbTemp = await Temperament.findOrCreate({where:{ name: temp }})
      // Pusheamos el objeto creado o encontrado al array allTemperaments
        allTemperaments.push(dbTemp[0]);
      }

      // Lo retornamos
      return allTemperaments;
  };



module.exports = {getApiData,getAllRaces,getRaceById,getRaceByQuery,postRace,getTemperaments}