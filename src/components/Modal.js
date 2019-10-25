import React from 'react';

class Modal extends React.Component {

    handleNewGame = (e) => {
        this.props.newGame(true);
    }

    componentDidMount() {
        // Options for Materialize modal
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false
        };
        M.Modal.init(this.Modal, options).open();
    }

    render() {
        return (
            <section ref={Modal => { this.Modal = Modal; }} id="modal1" className="modal">
                <div className="modal-content">
                    {
                        this.props.success
                            ?
                        <div>
                            <h2 className="center-align"><b>Sukces!</b></h2>
                            <p className="center-align">Udało Ci się - to hasło nie było dla Ciebie żadnym problemem! Poniżej możesz sprawdzić statystyki swojej gry:</p>
                        </div>
                            :
                        <div>
                            <h2 className="center-align"><b>Przegrana!</b></h2>
                            <p className="center-align">No niestety - nie tym razem... </p>
                        </div>
                    }
                    <ul className="collection with-header">
                        <li className="collection-header"><h4 className="center-align">Szukane słowo: <b>{this.props.word}</b></h4></li>
                        <li className="collection-item"><div>Ilość ruchów:<span className="secondary-content"><b>{this.props.moves}</b></span></div></li>
                        <li className="collection-item"><div>Ilość pomysłek:<span className="secondary-content"><b>{this.props.fails}</b></span></div></li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button onClick={this.handleNewGame} className="modal-close waves-effect waves-green btn">Rozpocznij nową grę</button>
                </div>
            </section>
        );
    }
}

export default Modal;