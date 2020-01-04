import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

//componente helper
const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{true: Colors.primaryColor}}
                //revisar por qué se pierde el botoncito del switcher cuando definimos el thumbcolor
                //thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'}
                value={props.state} 
                onValueChange={props.onChange}/>
        </View>
    );
}


const FiltersScreen = props => {

    const [ isGlutenFree, setIsGlutenfree ] = useState(false);
    const [ isLactoseFree, setIsLactosefree ] = useState(false);
    const [ isVegan, setIsVegan ] = useState(false);
    const [ isVegetarian, setIsVegetarian] = useState(false);


    //uso useCallback para que solo se regenere la funcion si cambiara algunos de los estados y evitar
    //posibles rerenders innecesarios
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }
        console.log(appliedFilters);
    }, [isGlutenFree,isLactoseFree,isVegan,isVegetarian]);

    useEffect(() => {
        //console.log('FilterScreen rerendered!!');
        //con setParams, si ya existieran parametros en el navigation, react hace un merge con
        //los nuevos params que estoy mandando
        //mando la funcion saveFilters para que sea ejecutada en el navigationOptions
        //OJO que setParams ocasiona un rerender , y es eso lo que queremos para que se ejecute el navigationOptions
        props.navigation.setParams({ save: saveFilters});
    }, [saveFilters]);


    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>

            <FilterSwitch label="Gluten-free" 
            state={isGlutenFree}
            onChange={newValue => setIsGlutenfree(newValue)}/>

            <FilterSwitch label="Lactose-free" 
            state={isLactoseFree}
            onChange={newValue => setIsLactosefree(newValue)}/>

            <FilterSwitch label="Vegan" 
            state={isVegan}
            onChange={newValue => setIsVegan(newValue)}/>

            <FilterSwitch label="Vegetarian" 
            state={isVegetarian}
            onChange={newValue => setIsVegetarian(newValue)}/>
            
        </View>
    );
}

FiltersScreen.navigationOptions = navData => {
   return {
    headerTitle: "Filter Meals",
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
        ,
        //para que mi componente le pase parametros a este navigationOptions, lo haré a traves de 
        //el objeto navigation que trae navData
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')}/>
    </HeaderButtons>
   }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontFamily: "open-sans-bold",
        textAlign: "center",
        fontSize: 20,
        margin: 20
    },  
    filterContainer: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15
    }
});

export default FiltersScreen;