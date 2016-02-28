import classnames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from 'react-mdl/lib/IconButton';


export class Card {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.id = `${question}=${answer}`;
    }
    toString() {
        return this.id;
    }
}
export class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFlipped: false };
        this.flipCard = this.flipCard.bind(this);
        this.onIncorrectAnswer = this.onIncorrectAnswer.bind(this);
        this.onCorrectAnswer = this.onCorrectAnswer.bind(this);
    }
    onIncorrectAnswer() {
        this.props.onAnswer(false);
    }
    onCorrectAnswer() {
        this.props.onAnswer(true);
    }
    componentWillReceiveProps(nextProps) {
        // if we progress to a new question, the card shouldn't be flipped over
        if(this.props.card.question !== nextProps.card.question) {
            this.setState({ isFlipped: false });
        }
    }
    flipCard() {
        this.setState({ isFlipped: !this.state.isFlipped });
    }
    render() {
        return <div onClick={this.flipCard}
                    className={classnames("card", {'flipped': this.state.isFlipped})}>
                    <div className="card-front content">
                        {this.props.card.question}
                    </div>
                    <div className="card-back content">
                        {this.props.card.answer}
                    </div>
                    <div className="feedback">
                        <label>Oops <IconButton name="mood_bad" onClick={this.onIncorrectAnswer} /></label>
                        <label><IconButton name="mood" onClick={this.onCorrectAnswer} /> Got it!</label>
                    </div>
                </div>
    }
}
