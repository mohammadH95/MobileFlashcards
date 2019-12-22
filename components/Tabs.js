import React from 'react';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation-tabs";
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import { Platform } from 'react-native';
import { purple, white } from '../utils/colors';

const tabs = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
        },
    },
    
};

const navigationOptions = {
    tabBarOptions: {
        showIcon: true,
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            padding: 10,
            height: Platform.OS === 'ios' ? 60 : 'auto',
            fontSize: 18,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        },
    },
};

const TabNav =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(tabs, navigationOptions)
    : createMaterialTopTabNavigator(tabs, navigationOptions);

export default createAppContainer(TabNav);