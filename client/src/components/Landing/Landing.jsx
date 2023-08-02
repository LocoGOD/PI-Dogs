// Importamos useEffect para trabajar con el tiempo de vida de nuestros componentes
import { useEffect } from "react";

// Importamos funciones de react para despachar acciones 
import { useDispatch } from "react-redux";

// Importamos las acciones para obtener todos los perros y temperamentos
import { getAllDogs , getTemperaments } from "../../redux/actions"

// Hook link para movernos entre paginas
import {Link} from "react-router-dom";

// Styled components importados:
import { Container, Title, Subtitle, StyledButton, VideoBackground} from "./LandingStyles";


const Landing = () =>{

    // Guardamos la funcion despachadora, para enviar las acciones al reducer
    const dispatch = useDispatch();

    // useEffect() de React. Se utiliza para efectos secundarios en componentes funcionales, como hacer llamadas a una API, En este caso, 
    // lo usamos para despachar la acción importada getAllDogs() apenas se monte el componente (sea renderizado por primera vez). 
    // getAllDogs() enviará la solicitud para obtener todos los perros desde la API y actualizará el estado global allDogs.
    useEffect( () => {dispatch(getAllDogs())}, [dispatch] );

    // Hacemos lo mismo para almacenar los temperamentos traidos de la DB a nuestro estado global, apenas se monte el componente
    useEffect( () => {dispatch(getTemperaments())}, [dispatch] );


// Renderizado
return (
        <Container>
            {/* Video de fondo muteado y en loop! Source arranca en la carpeta public!*/}
            <VideoBackground autoPlay loop muted><source src="/landingIntro.mp4" type="video/mp4" /></VideoBackground>
            <Title>Welcome to my dogs page!</Title>
            <Subtitle>Let's begin our adventure!</Subtitle>
            <StyledButton><Link to="/home"> Enter! </Link> </StyledButton>
        </Container>);
};

export default Landing;