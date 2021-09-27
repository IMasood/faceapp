import React from 'react';
import './Test.css';

const Test = ({imageUrl,box}) =>{

    return (
        <div className = "center ma">

            <div className = "absolute ma2">
                     <img id = 'inputImage' alt = '' src = {imageUrl} width = '500px' height = 'auto'/>
                     <div className = "bounding-Box" style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
            </div>

        </div>
    );
}

export default Test;