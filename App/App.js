/**
 * Transe
 */

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from "./Screens/Home";
import TranseSetUpScreen from "./Screens/transeSetUp";
import inTranseScreen from "./Screens/inTranse";





//pages are referenced here so they can be navigated to
const RootStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        TranseSetUp: {
            screen: TranseSetUpScreen,
        },
        inTranse: {
            screen: inTranseScreen,
        },
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}


