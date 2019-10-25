import React from 'react';
import LetterItem from './LetterItem';

class LetterList extends React.Component {
    state = {
        elements: []
    };

    // Setting the keyboard with chars A - Z (upper case)
    // from ASCII
    setLetters = () => {
        const letters = [];
        for(let i=65; i<=90; i++) {
            const letter = String.fromCharCode(i);
            letters.push(letter);
        }
        this.setState({
            elements: letters
        })
    }

    componentDidMount() {
        this.setLetters()
    }

    render() {
        return (
            <div className="game-container__inner keyboard center-align">
                {
                    this.state.elements.length > 0
                        ?
                    this.state.elements.map(element => (<LetterItem key={element} charCode={element} moves={this.props.moves} handleClickLetter={this.props.handleClickLetter} />)) 
                        :
                    undefined }
            </div>
        );
    }
}

export default LetterList;