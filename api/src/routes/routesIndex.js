const express = require("express")  //Para trabajar en archivos separados con Rutas, traemos express nuevamente
const routes = express.Router()      // Creamos constante para las rutas ejecutando la propiedad Router de express
// A partir de ahora haremos las rutas con el nombre dado al ejecutar router, routes en este caso!
const axios = require("axios")

// Importamos controladores
const {getApiData,getAllRaces,getRaceById,getRaceByQuery,postRace,getTemperaments} = require("../controllers/controllersIndex")

// Acceso a los modelos (tablas)
const {Dogs,Temperaments} = require("../db")



// Ruta para obtener todas las razas o por query si se envia una 
routes.get("/dogs", async(req, res) => {
    try {

      // Nos quedamos con el nombre en caso haya query
      const {name} = req.query;

      // En caso no haya, ejecutamos controlador que traiga todas las razas y la retornamos
      if(!name) {const data = await getAllRaces()
      return res.status(200).json(data)}

      // En caso si haya, ejecutamos tambien su respectivo controlador:
      const data = await getRaceByQuery(name)
      return res.status(200).json(data)  
    
    } catch (error) {
      return res.status(404).send(error.message);}
  });

  




// Ruta para traer los temperamentos:
routes.get("/temperaments", async (req,res) =>{
    try {
        // Ejecutamos el controlador para traer los temperamentos
        const temperaments = await getTemperaments()
      
        // Los retornamos!
        res.status(200).json(temperaments);

    } catch (error) {
      return res.status(400).send("Ha ocurrido un error adquiriendo los temperamentos")}
})






//  Ruta para obtener raza por :id
routes.get("/dogs/:id", async (req,res) =>{
  try {
    //Nos quedamos con la id de params
    const {id} = req.params

    // Ejecutamos la funcion para buscar raza por id
    const dog = await getRaceById(id)
    
    // Si existe, lo retornamos
    if(dog) return res.status(200).json(dog)

  } catch (error) {
    return res.status(404).send(error.message)
  }
})





// Ruta para crear razas en nuestra base de datos
routes.post("/dogs", async(req,res) =>{
  try {
    // nos quedamos con las propiedades del body
    const {name,height,weight,life_span,temperament,image} = req.body   // temperaments es un arreglo de ids
    
    // verificamos si hubiese ausencia de alguno y retornamos error
    if(!name || !height || !weight || !life_span || !image || !temperament) throw Error("Faltan datos de la raza a crear!")

    // Ejecutamos el controlador y creamos una raza:
    const newDog = await postRace(name,height,weight,life_span,temperament,image)

    //La devolvemos:
    return res.status(200).json(newDog)

     } catch (error) {
    return res.status(404).send(error.message)
  }
})











module.exports = routes;
