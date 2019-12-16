import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MealDetailScreen = props => {

    return (
        <View style={styles.screen}>
            <Text>The MealDetailScreen Screen!!.</Text>
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MealDetailScreen;