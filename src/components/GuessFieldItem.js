import React from 'react';


class GuessFieldItem extends React.Component {

    handleSuccess = () => {
        return (
            <p>{this.props.letterToFind}</p>
        )
    }

    handleFailure = (letterRecived) => {
        if (letterRecived) {
            return (
                <p></p>
            )
        };
    }


    render() {
        return (
            <div>
                {
                    // Check if letter must be visible
                    (this.props.letterRecived.includes(this.props.letterToFind) || this.props.index === 0 || this.props.index === this.props.wordLength - 1)
                        ?
                        <div className="keybord__button-wrapper keybord__button-wrapper--fill">
                            {this.handleSuccess()}
                        </div>
                        :
                        <div className="keybord__button-wrapper keybord__button-wrapper--empty">
                            {this.handleFailure(this.props.letterRecived)}
                        </div>
                }
            </div>
        );
    }
};

export default GuessFieldItem;