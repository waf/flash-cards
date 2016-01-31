import _ from 'lodash';

const MAX_STAGE = 3;
export default class SpacedRepetitionAlgorithm {
    getInitialState(cards) {
        var cardHash = cards.reduce((lookup, card) => {
            lookup[card] = card;
            return lookup;
        }, {});
        var stages = cards.reduce((stageLookup, card) => { // all cards in stage 0
            stageLookup[card] = 0;
            return stageLookup;
        }, {});
        var round = this.createDeckForStage(stages, 0);

        return {
            state: {
                cardCount: cards.length,
                cards: cardHash,
                round: round,
                roundIndex: 0,
                stages: stages,
                stageIndex: 0,
                score: 0,
                progress: 0
            }
        };
    }
    cardAnswered(state, card, wasCorrect) {

        //update stage
        var oldStage = state.stages[card];
        var delta = wasCorrect ? 1 : -MAX_STAGE;
        var nextStage = Math.max(0, Math.min(oldStage + delta, MAX_STAGE));
        state.stages[card] = nextStage;

        //update progress
        state.score += wasCorrect ? 1 : -1;
        state.progress = 100 *
            state.score /
            Math.floor(state.cardCount * .9 * MAX_STAGE);

        return {
            state: state
        };
    }
    nextCard(state) {
        var newIndex = state.roundIndex + 1;
        var newCard = state.round[newIndex];
        if(!newCard) {
            state.stageIndex = state.stageIndex + 1;
            state.round = this.createDeckForStage(state.stages, state.stageIndex);
            newIndex = 0;
            newCard = state.round[0];
        }

        state.roundIndex = newIndex;
        return {
            state: state,
            card: state.cards[newCard]
        };
    }
    previousCard(state) {
        var newIndex = state.roundIndex - 1;
        state.roundIndex = newIndex;
        return {
            state: state,
            card: state.cards[state.round[newIndex]]
        };
    }
    currentCard(state) {
        return {
            state: state,
            card: state.cards[state.round[state.roundIndex]]
        };
    }
    currentProgress(state) {
        return {
            state: state,
            progress: state.progress
        }
    }
    createDeckForStage(stages, desiredStage) {
        var deck = _.chain(stages)
                    .pick(stage => stage <= desiredStage)
                    .keys()
                    .shuffle()
                    .value();
        return deck;
    }
}
