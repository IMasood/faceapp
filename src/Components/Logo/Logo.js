import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () =>{

    return (
        <div className = 'ma4 mt0'>

        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> <img style = {{paddingTop:'5px'}} alt = 'logo' src = {brain} /></div>
            </Tilt>

        </div>
    );
}

export default Logo;

// https://www.npmjs.com/package/react-parallax-tilt
// https://www.npmjs.com/package/react-tilt
// for icons : https://icons8.com/icons/set/brain
// css 3 patterns gallery: https://projects.verou.me/css3patterns/
// https://www.clarifai.com/
// particle.js https://vincentgarreau.com/particles.js/
// particle react : https://www.npmjs.com/package/react-particles-js