import React from 'react';
import ReactDOM from 'react-dom';
import {Header, Navigation, Drawer} from 'react-mdl/lib/Layout';
import Switch from 'react-mdl/lib/Switch';

var TopMenu = ({card}) => {
    var googleTranslateLink = "https://translate.google.com/m/translate#th/en/" + card.question;
    return <Header transparent>
        <Navigation>
            <a target="_blank" href={googleTranslateLink}>Google Lookup</a>
        </Navigation>
    </Header>
};

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleFontChanged = this.handleFontChanged.bind(this);
        this.handleReverseModeChanged = this.handleReverseModeChanged.bind(this);
    }
    handleFontChanged(e) {
        this.props.onSettingChanged({
            font: e.target.checked ? 'modern' : 'traditional'
        });
    }
    handleReverseModeChanged(e) {
        this.props.onSettingChanged({
            reverseMode: e.target.checked ? 'reversed' : ''
        });
    }
    render() {
        return <Drawer title="Options">
            <Navigation>
                <a href="">Restart Session</a>
                <a><Switch onChange={this.handleFontChanged}>Modern Font</Switch></a>
                <a><Switch onChange={this.handleReverseModeChanged}>Reverse Mode</Switch></a>
            </Navigation>
        </Drawer>
    }
}

export {TopMenu, SideMenu};
