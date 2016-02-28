import React from 'react';
import ReactDOM from 'react-dom';
import {Layout, Content} from 'react-mdl/lib/Layout';
import ProgressBar from 'react-mdl/lib/ProgressBar';
import {Card, CardView} from './card';
import {TopMenu, SideMenu} from './menu';
import SpacedRepetitionAlgorithm from './spacedRepetitionAlgorithm';
import classnames from 'classnames';

function get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4) {
            callback(JSON.parse(xmlhttp.responseText));
        }
    }
    xmlhttp.send(null)
}

var GameMode = {
    Playing: 0,
    Won: 1,
};
class Application extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.onSettingChanged = this.onSettingChanged.bind(this);

        this.algorithm = new SpacedRepetitionAlgorithm();
        this.state = {
            gameMode: GameMode.Playing,
            score: 0,
            progress: 0
        };
    }
    componentDidMount() {
        get("data/cards.json", (json => {
            var cards = json.map(data => new Card(data.question, data.answer));
            var {state} = this.algorithm.getInitialState(cards);
            var {card, state} = this.algorithm.currentCard(state);
            this.setState({
                card: card,
                algorithmState: state,
            });
        }).bind(this));
    }
    handleAnswer(wasCorrect) {
        var {state} = this.algorithm.cardAnswered(this.state.algorithmState, this.state.card, wasCorrect);
        var {card, state} = this.algorithm.nextCard(state);
        var {progress, state} = this.algorithm.currentProgress(state);
        if(progress >= 100) {
            this.setState({
                gameMode: GameMode.Won,
                algorithmState: state,
            });
        } else {
            this.setState({
                card: card,
                algorithmState: state,
                progress: progress
            });
        }
    }
    onSettingChanged(settings) {
        if('font' in settings) {
            this.setState({
                font: settings.font
            });
        } else if ('reverseMode' in settings) {
            this.setState({
                reverseMode: settings.reverseMode
            });
        }
    }
    render() {
        switch(this.state.gameMode) {
            case GameMode.Playing:
                if(!this.state.card) {
                    return <div />;
                }
                return (
                    <Layout className={classnames(this.state.font, this.state.reverseMode)}>
                        <ProgressBar progress={this.state.progress} />
                        <TopMenu card={this.state.card} />
                        <SideMenu onSettingChanged={this.onSettingChanged} />
                        <Content>
                            <CardView card={this.state.card} onAnswer={this.handleAnswer} />
                        </Content>
                    </Layout>);
            case GameMode.Won:
                return <h1 className="win-message">Congratulations!</h1>;
            default:
                throw "Invalid GameMode";
        }
    }
};

ReactDOM.render(<Application />, document.getElementById("app"));
