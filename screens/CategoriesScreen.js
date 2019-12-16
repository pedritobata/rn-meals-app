import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CategoriesScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The Categories Screen!!.</Text>
            <Button title="Go to Meals!" onPress={()=> {
                //cada componente que yo haya agregado al stack de MealsNavigator
                //recibirá varias props de navigation que nos serán muy utiles
                //la mas importante en navigation con su funcion navigate()!!!
                //el nombre de la ruta es el mismo nombre que mapeamos en MealsNavigator
                //esta funcion solita genera un boton 'back' en la otra vista para regresar a esta!!
                props.navigation.navigate({routeName: 'CategoryMeals'});

                //otra forma de navegar es con un atajo. defrente pasar la ruta como un primer argumento
                //  props.navigation.navigate('CategoryMeals');
            }}/>
            <Button title="Replace" onPress={()=>{

                //replace hace que se borre todo el stack y se reemplace con el componente que le 
                //especifico, por lo tanto, el boton back que se agregaba a la vista de destino ya NO 
                //se agregue!!
                props.navigation.replace('Categories');
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CategoriesScreen;