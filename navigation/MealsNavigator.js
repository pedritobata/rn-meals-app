//Para usar navigation hemos instalado
//npm install --save react-navigation
//Y CON EXPO: para que expo baje las versiones compatibles a mi proyecto!!
//expo install react-native-gesture-handler react-native-reanimated

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';


//createStackNavigator ya nos devuelve un Componente de React!! con toda la
//logica y funcionalidades para la navegacion
//le pasamos los componentes que queremos involucrar en la navegacion
//por convencion, nombramos a cada propiedad del objeto empezando con Mayuscula
//createStackNavigator agrega los componentes a una pila o stack y te muestra
//siempre la vista que corresponde al primer componente en el stack, en el top del stack
//createStackNavigator NO va creando las vistas nuevas cada vez que navegamos!!
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,//atajo para agregar un componente a la navegacion
    CategoryMeals: {//esta es otra forma de asignar el componente , 
        //porque permite agregar mas configuracion si fuera necesaria
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
});

//al final tenemos que exportar el componente pero pasandolo primero por
//un hoc que es necesario para que funque bien
export default createAppContainer(MealsNavigator);

