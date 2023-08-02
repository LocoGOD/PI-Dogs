import React from 'react';
import { AboutContainer, AboutImage, AboutLink, Title} from './AboutStyles';

const About = () => {
  return (
    <AboutContainer>
      <Title>DOG PI - Created by Dario Perez</Title>
      <p>Im a Full Stack Developer who likes to make things simpler. That's my work methodology!</p>
      <p>
        I started coding in 2021, with some courses from UBA, followed by others from the city government.
        Then, I went to "Argentina Programa", where I learnt JavaScript for the first time, together with another languages.
        Until I discovered Henry! And although at first I found myself unable to adapt to program times, I managed to reach the instance of the individual project!
      </p>
      <p>My skills: HTML, CSS, JavaScript, React-Redux, Express, PostgreSQL and Sequelize.</p>
      <AboutImage src="/me.jpeg" alt="me!" />
      {/* Links que se abren en nueva pestaña con el atributo noreferrer para navegadores viejos */}
      <p>
        <AboutLink href="https://github.com/LocoGOD" target="_blank" rel="noreferrer">
          My GitHub
        </AboutLink>
        <AboutLink href="https://www.linkedin.com/in/dario-p%C3%A9rez-5a5b89219/" target="_blank" rel="noreferrer">
          My LinkedIn
        </AboutLink>
      </p>
    </AboutContainer>
  );
};

export default About;
