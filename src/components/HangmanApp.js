import React from 'react';
import GameInfo from './GameInfo';
import GuessFieldList from './GuessFieldList';
import LifeList from './LifeList';
import LetterList from './LetterList';
import Modal from './Modal';

class HangmanApp extends React.Component {
    state = {
        movesCounter: 0,
        failCounter: 0,
        livesCounter: 9,
        lettersUsed: [], // passes selectet in keybord letters as letters to show in guessed fields
        word: this.props.word, // The whole word from API
        toFind: this.props.toFind, // Word without first and last letter
        lettersGuessed: [], // Array that will be holding letters found by user
        success: false,
        fail: false
    };

    compare = (toFind, guessed) => {
        //  I need to have array of unique values. For example "free" have two "e".
        const toFindLength = toFind.filter((value, index, self) => {
            return self.indexOf(value) === index;
        }).length;

        // Length of guessed letters are array of unique values, because
        // when you find on keybord "e" on word "eye", you only return this "e" once
        const guessedLength = guessed.length;

        if(toFindLength === guessedLength) {
            return true;
        } else {
            return false;
        }
    }

    checkForSuccess = (charCode) => {
        // We need to concat letters lettersGuessed with charCode, that 
        // we won't have to wait for new state. That's why why concat letter,
        // that was returned from keybord button
        if(!this.state.toFind.includes(charCode)) {
            return;
        }
        if(this.compare(this.state.toFind, this.state.lettersGuessed.concat(charCode))) {
                this.setState({success: true})
            }
    }

    checkForfailure = () => {
        // It have to be equal 1, becouse of state lifecycle
        if(this.state.livesCounter === 1) {
            this.setState({fail: true});
        }
    }

    handleClickLetter = (charCode) => {
        // charCode is a letter that user clicked

        // When array toFind have the same value of one the position 
        // then includes method return true, charCode will go to the array
        // lettersGuessed
        if(this.state.toFind.includes(charCode)) {
            M.toast({html: 'Zgadza się!', classes: 'green darken-4 toast toast__success'});
            this.setState((prevState) => ({
                lettersGuessed: this.state.lettersGuessed.concat(charCode)
            }))
        } else {
            M.toast({html: 'Zły strzał!', classes: 'red darken-4 toast toast__fail'});
            this.setState((prevState) => ({
                livesCounter: prevState.livesCounter - 1,
                failCounter: prevState.failCounter + 1
            }))
        }

        this.setState((prevState) => ({
            lettersUsed: this.state.lettersUsed.concat(charCode),
            movesCounter: this.state.movesCounter + 1
        }));

        // Checking if it is the end of the game
        this.checkForSuccess(charCode);
        this.checkForfailure();
    }

    triggerNewGame = (e) => {
        this.props.newGame(true);
    }

    // On update component, when new word (from props update) are
    // different from the previous
    newGame = (prevProps) => {
        if(prevProps.word !== this.props.word) {
            this.setState((prevState) => ({
                failCounter: 0,
                word: this.props.word,
                movesCounter: 0,
                livesCounter: 9,
                lettersUsed: [],
                lettersGuessed: [],
                success: false,
                fail: false,
                toFind: this.props.toFind, 
            }))
        }
    }

    componentDidUpdate(prevProps) {
        this.newGame(prevProps);
    }

    render() {
        return (
            <div className="container">
                <div className="game-container__wrapper">
                    <div className="game-container__word">
                        <GuessFieldList word={this.state.word} letter={this.state.lettersUsed} />
                        <LetterList moves={this.state.movesCounter} handleClickLetter={this.handleClickLetter}/>
                        <button className="newgame__button waves-effect waves-light btn-large" onClick={this.triggerNewGame}>LOSUJ NOWE SŁOWO</button>
                    </div>
                    <LifeList lifeAmount={this.state.livesCounter} />
                </div>
                <GameInfo moves={this.state.movesCounter} lifeAmount={this.state.livesCounter}/>
                {
                    this.state.success || this.state.fail
                        ?
                    <Modal
                        word={this.state.word}
                        fails={this.state.failCounter}
                        moves={this.state.movesCounter}
                        success={this.state.success}
                        fail={this.state.fail}
                        newGame={this.triggerNewGame}
                    />
                        :
                    undefined
                }
            </div>
        );
    }
};

export default HangmanApp;