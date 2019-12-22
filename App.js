import React from 'react';
import { View, StatusBar, } from 'react-native';
import Stack from "./components/Stack";
import reducer from "./reducers";
import Constants from "expo-constants";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware'
import { purple } from "./utils/colors";

function MstatusBar({ backgroundColor, ...props }) {
  return(
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <MstatusBar backgroundColor={purple} barStyle="light-content" />
        <View style={{flex: 1}}>
          <Stack />
        </View>  
      </Provider>
      
    );  
  }
}
