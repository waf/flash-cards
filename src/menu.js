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

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        var settingEvent = {};
        settingEvent[this.props.setting] = e.target.checked ?
            this.props.onState :
            this.props.offState;

        this.props.onChange(settingEvent);
    }
    render() {
        return <a className="mdl-navigation__link">
                    <Switch onChange={this.handleChange}>{this.props.label}</Switch>
               </a>;
    }
}

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Drawer title="Options">
            <Navigation>
                <a href="">Restart Session</a>
                <Setting onChange={this.props.onSettingChanged} label="Modern Font" setting="font"
                         onState="modern" offState="traditional" />
                <Setting onChange={this.props.onSettingChanged} label="Flip Cards" setting="reverseMode"
                         onState="reversed" offState="" />
                <Setting onChange={this.props.onSettingChanged} label="Dark Mode" setting="darkMode"
                         onState="dark-mode" offState="" />
            </Navigation>
        </Drawer>
    }
}

export {TopMenu, SideMenu};
