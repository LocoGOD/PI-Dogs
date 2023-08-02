const express = require("express")  //Para trabajar en archivos separados con Rutas, traemos express nuevamente
const routes = express.Router()      // Creamos constante para las rutas ejecutando la propiedad Router de express
// A partir de ahora haremos las rutas con el nombre dado al ejecutar router, routes en este caso!

// Importamos controladores
const {getAllRaces,getRaceById,getRaceByQuery,postRace,getTemperaments} = require("../controllers/controllersIndex")



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
      return res.status(400).send("An error has occured gathering temperaments")}
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
    const {name,weight,height,life_span,temperaments,image} = req.body  // temperaments es un arreglo de ids
    
    // verificamos si hubiese ausencia de alguno y retornamos error
    if( !name || !weight || !height || !life_span ){
    throw Error("There is missing data, please fill all the gaps!")}

    // Ejecutamos el controlador y creamos una raza:
    const newDog = await postRace(name,weight,height,life_span,temperaments,image)

    //La devolvemos:
    return res.status(200).json(newDog)

     } catch (error) {
    return res.status(404).send(error.message)
  }
})



module.exports = routes;
