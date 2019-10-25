import React from 'react';

const GameInfo = (props) => (
    <div>
        {props.moves === 0 ? <div className="card-panel center-align"><span><b>Podpowiedź:</b> aby rozpocząć, kliknij jedną z liter.</span></div> : <div></div>}
        {props.lifeAmount === 1 ? <div className="card-panel center-align"><span><b>Uważaj!</b> Zostało Ci tylko jedno życie.</span></div> : <div></div>}
    </div>
);

export default GameInfo;