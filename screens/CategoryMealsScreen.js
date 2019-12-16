import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CategoryMealsScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The CategoryMeals Screen!!.</Text>
            <Button title='Go to Details!' onPress={()=>{
                //push solo recibe un argumento como string a diferencia de navigate que
                //tambien puede recibir un objeto
                //push agrega un componente al stack de navegacion
                //La diferencia de push vs navigate es que push permite recargar la
                //misma pagina en la que estoy!!
                props.navigation.push('MealDetail');
            }} />
            <Button title="Go back"  onPress={()=> {
                //pop quita el primer componente del stack (osea el actual) y por consiguiente
                //nos mostrará por defecto el anterior del stack, creando el efecto back
                props.navigation.pop();
            }}/>
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

export default CategoryMealsScreen;