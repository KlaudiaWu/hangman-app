import React from 'react';

class LetterItem extends React.Component {
    state = {
        disabled: false // For buttons to be disabled when clicked once
    }

    handleClick = (e) => {
        this.props.handleClickLetter(this.props.charCode);
        this.setState({disabled: true})
    }

    componentDidUpdate(prevProps) {
        if(prevProps.moves !== this.props.moves && this.props.moves === 0) {
            this.setState({disabled: false})
        }
    }

    render() {
        return (
            <button className="keyboard__button waves-effect waves-light btn-large" disabled={this.state.disabled} onClick={this.handleClick} >
                {this.props.charCode}
            </button>
        );
    }
};

export default LetterItem;