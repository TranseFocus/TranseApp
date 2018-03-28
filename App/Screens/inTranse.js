
import React, { Component } from 'react';
import {
    Image,
    Text,
    StyleSheet,
    Dimensions,
    View,
    TouchableHighlight,
} from 'react-native';
import images from "../../assets/images";
import {TimerCountdown} from "../Subassemblies/Timer";

var sWidth = Dimensions.get('window').width;
var sLength = Dimensions.get('window').height;


class inTranseScreen extends React.Component {
    static navigationOptions = { header: null };
    _handlePress() {
        console.log('Pressed!');
    }

    /*
        added constructor to take care of checker for
        if timer is finished and focus point incrementer
     */
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            focusPoints: 0,
        }
    }

    /*
      conditional rendering function: I am using this because it appears to be a clean way to switch views.
      Let me know if it's a serious problem, but from what I can see it works just fine.
    */
     static renderIf(condition, content) {
        if (condition) {
            return content;
        } else {
            return null;
        }
    }

    /*
        toggles boolean value for whether or not timer is finished;
        this will control a conditional display depending on whether or not
        all time has elapsed.
     */
    toggleFinished() {
        this.setState({
            finished: true,
        });
    }

    /*
        set focus points; they should earn 10 focus points every minute.
    */
    setPoints(timeTo) {
        this.setState({
            focusPoints: (timeTo) * (10/60),
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        const timeTo = params ? params.timeTo : null;
        return (
            <View style={styles.protoView}>
                {/*spacer*/}
                {/* <View style={{flex: 0.2,width:sWidth,}}/>*/}
                <View style={{ flex: 2, width: sWidth, alignItems: 'center', justifyContent: 'center',}}>
                    {inTranseScreen.renderIf(!this.state.finished && timeTo > 0,
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <TimerCountdown
                                initialSecondsRemaining={timeTo * 1000}
                                onTick={() => console.log('tick')}
                                onTimeElapsed={() => {this.toggleFinished(); this.setPoints(timeTo)}}
                                allowFontScaling={true}
                                style={{ fontSize: 45 }}
                            />
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Remaining</Text>
                        </View>
                    )}
                    {inTranseScreen.renderIf(timeTo === 0,
                        <View>
                            <Text style ={{textAlign: 'center', fontWeight: 'bold', fontSize: (sLength * (2/45)), color: '#3CB371'}}>
                                Oops! You selected 0 hours and 0 minutes.
                            </Text>
                            <Text style = {{textAlign: 'center', fontWeight: 'bold', fontSize: (sLength * (1/45))}}>
                                Click the buttons below to get back to the homepage.
                            </Text>
                        </View>
                    )}
                    {inTranseScreen.renderIf(this.state.finished,
                        <View>
                            <Text style = {{textAlign: 'center', fontWeight: 'bold', fontSize: (sLength * (2/25)), color: '#3CB371'}}>
                                You did it!
                            </Text>
                            <Text style = {{textAlign: 'center', fontWeight: 'bold', fontSize: (sLength * (1/25))}}>
                                + {this.state.focusPoints} Focus Points!</Text>
                        </View>
                    )}
                </View>
                <View
                    style={{
                        flex: 2,
                        width: sWidth,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                    <View style={{ flex: 1, aspectRatio: 1 }}>
                        <Image
                            style={styles.bigIcon}
                            source={images.focusIcon}
                        />
                    </View>


                </View>

                <View
                    style={{
                        flex: 2,
                        width: sWidth,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={{ flex: 0.25 }} />
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

                        {/*Placeholder button
                               container
                                    spacer
                                    button icon
                                    button label
                        */}
                        {/*TODO correctly format the highlight color of the buttons*/}
                        {/*TODO implement break functionality*/}
                        <TouchableHighlight
                            onPress={() => this._handlePress()}
                            style={styles.minorButtons}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 0.25 }} />
                                <Image
                                    style={styles.bigIcon}
                                    source={images.coffeeIcons}
                                />
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        flex: 0.25,
                                    }}>
                                    Break
                                </Text>
                            </View>
                        </TouchableHighlight>

                        {/*settings button
                               container
                                    spacer
                                    button icon
                                    button label
                        */}
                        {/*TODO add so resistance to ending the transe early*/}

                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('Home')}
                            style={styles.minorButtons}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 0.25 }} />
                                <Image
                                    style={styles.bigIcon}
                                    source={images.exitIcon}
                                />
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        fontWeight: 'bold',
                                        flex: 0.25,
                                    }}>
                                    End Early
                                </Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                    <View style={{ flex: 0.25 }} />
                </View>
            </View>
        );
    }
}

export default inTranseScreen;

const styles = StyleSheet.create({
    circle: {
        flex: 0,
        flexDirection: 'row',
        aspectRatio: 1,
        borderWidth: 4,
        borderColor: '#137547',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: sWidth * 0.7,
        width: sWidth * 0.7,

        padding: sWidth * 0.15,
    },
    protoView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: sLength * 0.1,
    },
    bigIcon: {
        flex: 1,
        width: 256,
        height: 256,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    minorButtons: {
        flex: 1,
    },
    mainWindow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aaffd9',
    },
    pickerStyle: {},
});