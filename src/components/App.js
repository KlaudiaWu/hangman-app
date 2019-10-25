import React from 'react';
import Header from './Header';
import HangmanApp from './HangmanApp';
import Footer from './Footer';
import LoadSpinner from './LoadSpinner'

class App extends React.Component {
    state = {
        newGame: false,
        isLoaded: false,
        word: [], // word from the API
        toFind: [] // toFind is an array without first and last letter
    }

    toFind = (word) => {
        return word.filter((letter, index, arr) => {
            return (index !== 0 && index !== arr.length - 1);
        })
    }

    fetchData = () => {
        fetch('http://hangman.career.wecode.stage.wecode.agency/api/v1/word/random')
            .then(res => res.json())
            .then((data) => {
                const word = data.word.toUpperCase().split('');
                const restToFind = this.toFind(word);
                this.setState({
                    word: word,
                    toFind: restToFind,
                    isLoaded: true
                })
            })
            .catch(console.log);
    }

    handleNewGame = (isNewGame) => {
        this.setState((prevState) => ({
            newGame: !this.state.newGame
        }))
    }

    newWord = (prevState) => {
        if (prevState.newGame !== this.state.newGame) {
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProp, prevState) {
        this.newWord(prevState)
    }

    render() {
        return (
            <div className="body__inner">
                <div className="content">
                    <header>
                        <Header />
                    </header>
                    <main>
                        {this.state.isLoaded ? <HangmanApp word={this.state.word} toFind={this.state.toFind} newGame={this.handleNewGame} /> : <LoadSpinner />}
                    </main>
                </div>
                <footer className="page-footer">
                    <Footer />
                </footer>
            </div>
        );
    }
};

export default App;