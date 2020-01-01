import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const MealDetailScreen = props => {

    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(item => item.id === mealId);

    return (
        <View style={styles.screen}>
            <Text>{selectedMeal.title}</Text>
            <Button title='Go back!' onPress={()=>{
                props.navigation.goBack();
            }}/>
            <Button title='Go Back to Categories!' onPress={()=>{
                //con popToTop, se quitan todos los componentes del stack menos el ultimo (que es el primero que
                //se agregó al empezar a navegar), por tanto se causa el efecto de saltar directo a la 
                //pantalla de inicio
                props.navigation.popToTop();
            }} />
        </View>
    );
}

MealDetailScreen.navigationOptions = itemData => {
    const mealId = itemData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal=> meal.id === mealId);

    return {
        headerTitle: selectedMeal.title,
        //aca puedo agregar algun elemento en la toolbar , a la derecha o izquierda
        //el problema es que darle estilos es tranca!!!
        //mejor usaremos un package: react-navigation-header-buttons
       // headerRight: <Text>FAV!</Text>
       headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
           {/* Se puede agregar varios Items!!! */}
           <Item title="Favorite" iconName='ios-star' onPress={() => {
               console.log('Marked as favorite!!');
           }}/>
       </HeaderButtons>
    };
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MealDetailScreen;