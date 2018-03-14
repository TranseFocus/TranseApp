import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions, Button, TouchableHighlight,
    ViewPropTypes as RNViewPropTypes
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

//TODO add 24-hour time
const hours = ["1","2","3","4","5","6","7","8","9","10","11","12"];

const minutes = [ "00","01","02","03","04","05","06","07","08","09",
    "10","11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29",
    "30","31","32","33","34","35","36","37","38","39",
    "40","41","42","43","44","45","46","47","48","49",
    "50","51","52","53","54","55","56","57","58","59",
];

console.disableYellowBox = true;
//TODO find a suitable cross platform "wheel picker"

/*TODO complete this component so:
*   The user can select a time when the transe will end
*   It implements a wheel picker
*   returned value should be in seconds
* */
export class TimePicker extends React.Component {


    render() {
        return (
            <View>

            </View>
        )
    }
}

/*TODO complete this component so:
*   The user can select how long atranse will last
*   It implements a wheel picker
*   returned value should be in seconds
* */
export class DurationPicker extends React.Component {
    render(){
        return(
            <View style={styles.mainWindow}>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainWindow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aaffd9',
    },
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    pickerStyle: {
        width: 100,
    },
});

/*
react-native-timer-countdown
DON'T TOUCH!!!!!!!!!!!!!!!!!!!!!
by avid21
 */
export class TimerCountdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsRemaining: this.props.initialSecondsRemaining,
            timeoutId: null,
            previousSeconds: null
        };

        this.mounted = false;

        this.tick = this.tick.bind(this);
        this.getFormattedTime = this.getFormattedTime.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.tick();
    }

    componentWillReceiveProps(newProps) {
        if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
        this.setState({ previousSeconds: null, secondsRemaining: newProps.initialSecondsRemaining });
    }

    componentDidUpdate(nextProps, nextState) {
        if ((!this.state.previousSeconds) && this.state.secondsRemaining > 0 && this.mounted) {
            this.tick();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.state.timeoutId);
    }

    tick() {
        const currentSeconds = Date.now();
        const dt = this.state.previousSeconds ? (currentSeconds - this.state.previousSeconds) : 0;
        const interval = this.props.interval;

        // correct for small variations in actual timeout time
        const intervalSecondsRemaing = (interval - (dt % interval));
        let timeout = intervalSecondsRemaing;

        if (intervalSecondsRemaing < (interval / 2.0)) {
            timeout += interval;
        }

        const secondsRemaining = Math.max(this.state.secondsRemaining - dt, 0);
        const isComplete = (this.state.previousSeconds && secondsRemaining <= 0);

        if (this.mounted) {
            if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
            this.setState({
                timeoutId: isComplete ? null : setTimeout(this.tick, timeout),
                previousSeconds: currentSeconds,
                secondsRemaining: secondsRemaining
            });
        }

        if (isComplete) {
            if (this.props.onTimeElapsed) { this.props.onTimeElapsed(); }
            return;
        }

        if (this.props.onTick) {
            this.props.onTick(secondsRemaining);
        }
    }

    getFormattedTime(milliseconds) {
        if (this.props.formatSecondsRemaining) {
            return this.props.formatSecondsRemaining(milliseconds);
        }

        const totalSeconds = Math.round(milliseconds / 1000);

        let seconds = parseInt(totalSeconds % 60, 10);
        let minutes = parseInt(totalSeconds / 60, 10) % 60;
        let hours = parseInt(totalSeconds / 3600, 10);

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;

        hours = hours === '00' ? '' : hours + ':';

        return hours + minutes + ':' + seconds;
    }

    render() {
        const secondsRemaining = this.state.secondsRemaining;
        return (
            <Text
                allowFontScaling={this.props.allowFontScaling}
                style={this.props.style}
            >
                {this.getFormattedTime(secondsRemaining)}
            </Text>
        );
    }
}

TimerCountdown.defaultProps = {
    interval: 1000,
    formatSecondsRemaining: null,
    onTick: null,
    onTimeElapsed: null,
    allowFontScaling: false,
    style: {}
};

TimerCountdown.propTypes = {
    initialSecondsRemaining: PropTypes.number.isRequired,
    interval: PropTypes.number,
    formatSecondsRemaining: PropTypes.func,
    onTick: PropTypes.func,
    onTimeElapsed: PropTypes.func,
    allowFontScaling: PropTypes.bool,
    style: Text.propTypes.style,
};