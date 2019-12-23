import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback, Platform } from "react-native";
import { hide } from "expo/build/launch/SplashScreen";

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

  return (
    //params es otro atributo que podemos configurar en navigate
    //sirve para pasar parametros a la otra vista. se puede pasar LO QUE SEA y CUANTOS QUIERA
    <TouchableCmp style={styles.gridItem} onPress={props.onSelect}>
      <View style={{ ...styles.container, backgroundColor: props.color }}>
        <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden'//para que los elementos hijos no se vayan a desbordar del padre
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    padding: 13,
    elevation: 3,//esto es para android
    shadowRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
      fontFamily: 'open-sans-bold',
      fontSize: 16
  }
});

export default CategoryGridTile;
