import React from "react";
import { View, Text, StyleSheet, Button, FlatList , TouchableOpacity} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Colors from '../constants/Colors';

const CategoriesScreen = props => {

  const renderGridItem = itemData => {
    return (
        //params es otro atributo que podemos configurar en navigate
        //sirve para pasar parametros a la otra vista. se puede pasar LO QUE SEA y CUANTOS QUIERA
      <TouchableOpacity style={styles.gridItem} onPress={()=> {
          props.navigation.navigate({routeName: 'CategoryMeals', params: {
            categoryId: itemData.item.id
          }});
      }}>
          <View>
            <Text>{itemData.item.title}</Text>
          </View>
      </TouchableOpacity>
    );
  };

  return (
    // <View style={styles.screen}>
    //     <Text>The Categories Screen!!.</Text>
    //     <Button title="Go to Meals!" onPress={()=> {
    //         //cada componente que yo haya agregado al stack de MealsNavigator
    //         //recibirá varias props de navigation que nos serán muy utiles
    //         //la mas importante en navigation con su funcion navigate()!!!
    //         //el nombre de la ruta es el mismo nombre que mapeamos en MealsNavigator
    //         //esta funcion solita genera un boton 'back' en la otra vista para regresar a esta!!
    //         props.navigation.navigate({routeName: 'CategoryMeals'});

    //         //otra forma de navegar es con un atajo. defrente pasar la ruta como un primer argumento
    //         //  props.navigation.navigate('CategoryMeals');
    //     }}/>
    //     <Button title="Replace" onPress={()=>{

    //         //replace hace que se borre todo el stack y se reemplace con el componente que le
    //         //especifico, por lo tanto, el boton back que se agregaba a la vista de destino ya NO
    //         //se agregue!!
    //         props.navigation.replace('Categories');
    //     }} />
    // </View>

    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      numColumns={2}
      renderItem={renderGridItem}
    />
  );
};

//react navigation nos permite configurar nuestro componente agregandole atributos
//Esto es posible ya que a fin de cuentas mi componente es una funcion de js , la cual
//termina siendo un objeto de JS!! 
//los atributos que podemos agregar para que react navigation los entienda estan la documentacion
CategoriesScreen.navigationOptions = {
    headerTitle: "Meal Categories!!!",
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 100
  }
});

export default CategoriesScreen;
