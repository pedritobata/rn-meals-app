import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import MealList from '../components/MealList';
//import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = props => {

    //some dummy data logic for testing purpose!!
    //const favMeals = MEALS.filter(meal=> meal.id === 'm2' || meal.id === 'm3');

    let availableMeals = useSelector(state=> state.meals.favoriteMeals);

    if(!availableMeals || availableMeals.length === 0){
        return <View style={styles.container}>
            <DefaultText>No favorite meals found!!</DefaultText>
        </View>;
    }

    return (
       <MealList listData={availableMeals} navigation={props.navigation}/>
    );
}

FavoritesScreen.navigationOptions = navData => {

    return {
        headerTitle: "Your Favorites",
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default FavoritesScreen;