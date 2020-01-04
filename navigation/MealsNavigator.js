//Para usar navigation hemos instalado
//npm install --save react-navigation
//Y CON EXPO: para que expo baje las versiones compatibles a mi proyecto!!
//expo install react-native-gesture-handler react-native-reanimated

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

//este paquete necesita que tambien hayamos instalado react-native-paper
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform , Text} from 'react-native';


    const defaultStackNavOptions = {
        headerTitle: 'A screen',
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTitleStyle: {
            fontFamily: "open-sans-bold"
        },
        headerBackTitleStyle: {
            fontFamily: "open-sans"
        },
        headerTintColor: 'white'
    }


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
    defaultNavigationOptions: defaultStackNavOptions,
    //podemos usar otro estilo para la pantallas
    mode:'modal',
    //puedo indicar cual quiero que sea mi primera pantalla y esto primará sobre
    //el orden en el que los especificqué en el primer argumento de createStackNavigator
    //initialRouteName: 'MealDetail'
});

//OJO que los navigators son independientes entre si. cada stack , cada tab es independiente
//es como que cada uno lleva su historial propio!!!
const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},
{
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    //recordar que MealsNavigator es un componente de react valido
    Meals: {screen: MealsNavigator, navigationOptions: {
        tabBarIcon: tabInfo => {
            return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor}/>
        },
        //esta propiedad SOLO FUNCINONA cuando shifting es true en la configuracion de createMaterialBottomTabNavigator
        tabBarColor: Colors.primaryColor,
        //para android solo puedo modificar el label del tab desde acá. en ios lo puedo hacer desde
        //la configuracion del segundo argumento (la default)
        //cuando es ios, solo pongo el label del tab y esto hará merge con el resto de configuraciones que
        //haya puesto en el segundo argumento
        tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: "open-sans"}}>Meals</Text> : "Meals!!"
    } },
    Favorites: {screen: FavNavigator, navigationOptions: {
        //tabBarLabel: "Favorites!",  puedo poner el label que quiera al tab
        //si no lo hago, react toma el nombre del atributo que define mi elemento actual "Favorites"
        tabBarIcon: tabInfo => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: "open-sans"}}>Favorites</Text> : "Favorites!!"
    }}
}

//creamos otro navigator en forma de tabs
//este navigator incluirá al anterior stack en uno de sus tabs!!
const MealsFavTabNavigator = Platform.OS === 'android' ? 
    createMaterialBottomTabNavigator(tabScreenConfig,
     {
         //para material de andriod la propiedad del tint se pone directamente asi:
        activeColor: 'white',//Colors.primaryColor,
        shifting: true //esto es para un efecto de movimiento al tocar los iconos
        //si se quiere cambiar el color del tapBar cuando shifting es false, se debe usar:
        //notar que shifting tiene prioridad sobre barStyle de modo que si shifting es true entonces
        //react ignora a barStyle
        , barStyle: {
            backgroundColor: Colors.primaryColor
        }
}) :
  createBottomTabNavigator(tabScreenConfig,
{
    tabBarOptions: {
        //para android No hay esta propiedad. se tiene que ajustar el esilo del label en el tabScreenConfig
        labelStyle: {
            fontFamily: "open-sans"
        },
        activeTintColor: Colors.accentColor
    }
});

//estamos creando este navigator de un solo componente solo porque necesitamos que
//el header tenga el titulo que queremos
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},
{
   /*  navigationOptions: {
        drawerLabel: "Filters!!"
    }, */
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: "Meals",
    }},
    Filters: FiltersNavigator
},
{
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: "open-sans"
        }
    }
});

//al final tenemos que exportar el componente pero pasandolo primero por
//un hoc que es necesario para que funque bien
export default createAppContainer(MainNavigator);

