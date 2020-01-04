import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback, Platform } from "react-native";
import { hide } from "expo/build/launch/SplashScreen";

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        //TouchableCmp = TouchableNativeFeedback;
    }

  return (
  
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
    //overflow: 'hidden',//para que los elementos hijos no se vayan a desbordar del padre
    //a parte , guarda!! , este overflow esta haciendo que desaparezca el shadow de nuestros elementos del grid
    //en IOS.  Para Android bastará con definir el elevation en este estilo gridItem y ya no en container. PERO ojo,
    elevation: 5,
  //android necesita el overflow hidden para que se vea el ripl effect, es decir el parapadeo al tocar un elemento
    //para recobrar el shadow en ios, sin deshacernos del overflow, haremos un condicional
    overflow: Platform.OS === 'android' && Platform.Version >=21 ? 'hidden' : 'visible'
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    padding: 13,
    //elevation: 3,//esto es para android
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
