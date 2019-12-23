import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MealItem = props => {

    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <Text>{props.title}</Text>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        width: '100%',
        backgroundColor: "#ccc",
        height: 200
    },
    mealRow: {
        flexDirection: 'row'
    }
});

export default MealItem;