import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MealsNavigator from './navigation/MealsNavigator';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import mealsReducer from './store/reducers/meals';
import { useScreens, enableScreens } from 'react-native-screens';

//este metodo sirve para que RN use ciertos features de cada plataforma para optimizar
//el manejo de las pantallas. por ejemplo el  Android usará Fragments!!
// useScreens();//lo malo es que useScreens está deprecado, usaremos enableScreens!
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans" : require('./assets/fonts/OpenSans-Regular.ttf'),
    "open-sans-bold" : require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

const rootReducer = combineReducers({
  meals: mealsReducer
})

const store = createStore(rootReducer);

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=> setFontLoaded(true)} />
  }


  return (
    <Provider store={store}>
      <MealsNavigator  />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
