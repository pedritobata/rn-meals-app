import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';

const CategoryMealsScreen = props => {

    //recuperamos parametros pasados por la vista anterior
    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat=> cat.id === catId);

    return (
        <View style={styles.screen}>
            <Text>The CategoryMeals Screen!!.</Text>

            <Text>{selectedCategory.title}</Text>

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


//react navigation es BACAN!!
//nos permite que navigationOptions se comporte tambien como un callback
//con eso podemos configurar nuestro componente dinamicamente  en cada rerendery No solo al cargar la primera vez!!
CategoryMealsScreen.navigationOptions = navigationData => {
    //react navigation invocará nuestro callback pasandole un objeto similar al props que
    //le pasa a todos los componentes del StackNavigator
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat=> cat.id === catId);
     //debemos retornar un objeto con las configuraciones:
     return {
        headerTitle: selectedCategory.title,
       /*  headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white' */
     }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CategoryMealsScreen;