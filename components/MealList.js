import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from './MealItem';

const MealList = props => {

    const renderMealItem = itemData => {
        return (<MealItem title={itemData.item.title} 
            duration={itemData.item.duration} 
            image={itemData.item.imageUrl}
            complexity={itemData.item.complexity.toUpperCase()}
            affordability={itemData.item.affordability.toUpperCase()}
            onSelectMeal={()=>{
                //el navigation no puede ser obtenido de un componente que no esté
                //suscrito en el navigator directamente, por eso,
                //lo estamos pasando como props desde el componente que invoca e este MealList
                props.navigation.navigate({routeName: 'MealDetail', params: {
                    mealId: itemData.item.id
                }})
            }} />);
    }

    return (
        <View style={styles.list}>
        {/*  <Text>The CategoryMeals Screen!!.</Text>

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
         }}/> */}
         
         <FlatList data={props.listData} keyExtractor={(item,index)=> item.id}
           renderItem={renderMealItem} style={{width: '100%'}}/>
     </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8
    }
});

export default MealList;