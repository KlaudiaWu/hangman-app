import React from 'react';
import GuessFieldItem from './GuessFieldItem'

const GuessFieldList = (props) => (
    <div className="game-container__inner">
        {
            props.word.length >= 1
                ?
            props.word.map((field, index) => {
                    return (
                        <GuessFieldItem key={Math.random()} wordLength={props.word.length} index={index} letterToFind={field} letterRecived={props.letter} />
                    );
            })
                :
            undefined
        }
    </div>
);

export default GuessFieldList;