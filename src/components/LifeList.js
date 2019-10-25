import React from 'react';
import { random } from 'node-forge';

const LifeList = (props) => (
    <div className="game-container__lifes">
        {
            props.lifeAmount >= 1
                ?
            // I generate elements, that are in the same amount as lifes. I need some iterator, and
            // for that reason, I need array with number of elements
            Array(props.lifeAmount).fill('-').map((elem) => <i key={Math.random()} className="large material-icons icon-life">favorite</i>) 
                :
            undefined
        }
    </div>
);

export default LifeList;