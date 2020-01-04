import React, { useEffect, useCallback } from 'react';
import { ScrollView,View, Text, StyleSheet, Button, Image, Platform } from 'react-native';
//import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';


//creamos un componente helper dentro de este componente en el que estamos
const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    );
}


const MealDetailScreen = props => {

    const availableMeals = useSelector(state => state.meals.meals);

    const dispatch = useDispatch();

    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeals.find(item => item.id === mealId);

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    },[dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler});
    }, [toggleFavoriteHandler]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(meal => (
                <ListItem key={meal}>{meal}</ListItem>
            ))}

            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
       /*  <View style={styles.screen}>
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
        </View> */
    );
}

MealDetailScreen.navigationOptions = itemData => {
    //const mealId = itemData.navigation.getParam('mealId');
    //const selectedMeal = MEALS.find(meal=> meal.id === mealId);

    //este dato lo estamos obteniendo desde el componente que invoca a este componente, el cual es MealList
    //NO estamos usando el store de redux para este dato
    const mealTitle = itemData.navigation.getParam('mealTitle');

    const toggleFavorite = itemData.navigation.getParam('toggleFav');

    return {
        headerTitle: mealTitle,
        //aca puedo agregar algun elemento en la toolbar , a la derecha o izquierda
        //el problema es que darle estilos es tranca!!!
        //mejor usaremos un package: react-navigation-header-buttons
       // headerRight: <Text>FAV!</Text>
       headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
           {/* Se puede agregar varios Items!!! */}
           <Item title="Favorite" iconName='ios-star' onPress={toggleFavorite}/>
       </HeaderButtons>
    };
}

const styles = StyleSheet.create({
   image: {
       width: "100%",
       height: 200
   },
   details: {
       flexDirection: "row",
       padding: 15,
       justifyContent: "space-around"
   },
   title: {
       fontFamily: "open-sans-bold",
       textAlign: "center",
       fontSize: 20
   },
   listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10
   }
});

export default MealDetailScreen;