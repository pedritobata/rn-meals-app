//Para usar navigation hemos instalado
//npm install --save react-navigation
//Y CON EXPO: para que expo baje las versiones compatibles a mi proyecto!!
//expo install react-native-gesture-handler react-native-reanimated

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';


//createStackNavigator ya nos devuelve un Componente de React!! con toda la
//logica y funcionalidades para la navegacion
//le pasamos los componentes que queremos involucrar en la navegacion
//por convencion, nombramos a cada propiedad del objeto empezando con Mayuscula
//createStackNavigator agrega los componentes a una pila o stack y te muestra
//siempre la vista que corresponde al primer componente en el stack, en el top del stack
//createStackNavigator NO va creando las vistas nuevas cada vez que navegamos!!
//como segundo argumento de createStackNavigator puedo pasarle un objeto con configuracion extra para
//las pantallas
const MealsNavigator = createStackNavigator({
    Categories: {screen: CategoriesScreen, 
     //puedo pasar configuraciones del navigationOptions desde acá y no solo desde el mismo componente
        //este options tiene la mayor prioridad respecto al que se define en el mismo componente y respecto
        //al default options que se pasa como segundo argumento a createStackNavigator
        navigationOptions: {
            headerTitle: 'Meal Categories'
        }},//atajo para agregar un componente a la navegacion
    CategoryMeals: {//esta es otra forma de asignar el componente , 
        //porque permite agregar mas configuracion si fuera necesaria
        screen: CategoryMealsScreen,
       
    },
    MealDetail: MealDetailScreen
},
{ 
    defaultNavigationOptions: {
        headerTitle: 'A screen',
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: 'white'
    },
    //podemos usar otro estilo para la pantallas
    mode:'modal',
    //puedo indicar cual quiero que sea mi primera pantalla y esto primará sobre
    //el orden en el que los especificqué en el primer argumento de createStackNavigator
    //initialRouteName: 'MealDetail'
});

//creamos otro navigator en forma de tabs
//este navigator incluirá al anterior stack en uno de sus tabs!!
const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: MealsNavigator,//recordar que MealsNavigator es un componente de react valido
    favorites: FavoritesScreen
});

//al final tenemos que exportar el componente pero pasandolo primero por
//un hoc que es necesario para que funque bien
export default createAppContainer(MealsFavTabNavigator);

