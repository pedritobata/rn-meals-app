import React from 'react';
// import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
import { View, StyleSheet} from 'react-native';

const CategoryMealsScreen = props => {

   const availableMeals = useSelector(state=> state.meals.filteredMeals);

    //recuperamos parametros pasados por la vista anterior
    const catId = props.navigation.getParam('categoryId');
    //const selectedCategory = CATEGORIES.find(cat=> cat.id === catId);

    const displayedMeals = availableMeals.filter(meal=> meal.categoryIds.indexOf(catId) >= 0);

    if(displayedMeals.length === 0){
       return <View style={styles.content}>
          <DefaultText>No meals found, maybe check your filters?</DefaultText>
       </View>
    }

    return (
       <MealList listData={displayedMeals} navigation={props.navigation} />
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
   content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});

export default CategoryMealsScreen;