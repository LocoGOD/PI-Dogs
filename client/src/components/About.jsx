import { useSelector } from "react-redux";

const About = () =>{
    
    const dbDogs = useSelector((state) => state.dbDogs);
    console.log(dbDogs);

    return(
        <div>
            <h1>Created by Dario Perez the boss!!!1!</h1>
        </div>
    )
}

export default About;