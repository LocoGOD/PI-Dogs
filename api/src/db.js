// requerimos a dotenv para datos sensibles
require('dotenv').config();
// a sequelize para usar sus metodos
const { Sequelize } = require('sequelize');

// traemos metodos para modificar el archivo actual y su ruta
const fs = require('fs');
const path = require('path');

// Nos traemos las variables del archivo .env
const {DB_USER, DB_PASSWORD, DB_HOST,DB_NAME} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // Aplicamos un logging false para evitar que se despliguen bloques de texto en la consola
  native: false, // declaramos modo nativo para mas velocidad unicamente
});


const basename = path.basename(__filename);   // obtenemos el nombre del archivo actual
const modelDefiners = []; //array que usaremos más adelante para guardar referencias de modelos definidos en carpeta "models"


// Leemos todos los archivos de la carpeta Models...
fs.readdirSync(path.join(__dirname, '/models'))
  
  // Filtramos aquellos que comienzen con punto, no sean el mismo archivo que contiene el codigo actual y sean de extension JS 
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  
  // Itera sobre los archivos filtrados y los va requiriendo (importando), para luego agregarlos al array modelDefiners
  .forEach((file) => {modelDefiners.push(require(path.join(__dirname, '/models', file)));}) 
  //Después de este proceso, modelDefiners tendrá referencias a las funciones que definen los modelos en archivos de carpeta "models".


// Se itera sobre el array modelDefiners, que contiene las funciones que definen los modelos. Cada una de estas es invocada 
// con la conexión sequelize, lo que construye y define cada modelo utilizando la instancia de Sequelize.
modelDefiners.forEach(model => model(sequelize));


// Capitalizamos(Mayusculas) los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dogs, Temperaments } = sequelize.models;

Dogs.belongsToMany(Temperaments, { 
  through: "dog_temperament", 
  timestamps: false, 
  as: "dog_temperaments" });
Temperaments.belongsToMany(Dogs, {
  through: "dog_temperament",
  timestamps: false,
});






module.exports = {...sequelize.models, conn: sequelize};
// para poder importar los modelos así: const { Product, User } = require('./db.js');
// para importar la conexión {conn} = require('./db.js');

