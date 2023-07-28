const validations = (userData) => {
    const errors = {};  //este objeto obtendra propiedades en caso de que haya errores en la sintaxis de email o password

//Email Validations
if(!/\S+@\S+\.\S+/.test(userData.email)){
    errors.email = "Por favor, revisa tu correo"}

if(userData.email.length>35){
    errors.email="Este correo es demasiado largo"}

if(userData.email.length===0){
    errors.email = "Este correo es demasiado corto"}
 
    
//Password Validations
if(!/^(?=.*\d).+$/.test(userData.password)){ 
    errors.password = "La contraseña debe contener al menos un número"}

if(userData.password.length>10){
    errors.password = "La contraseña debe tener menos de 10 caracteres"}

if(userData.password.length<6){
    errors.password = "La contraseña debe tener mas de 6 caracteres"}

return errors;
}

export default validations;