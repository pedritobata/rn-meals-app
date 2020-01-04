import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}

//el reducer se ejecuta por defecto al iniciar la App
//en este caso el default del Switch se dispara al iniciar la App y el state es el inicial
const mealsReducer = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if(existingIndex >= 0 ){
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return {...state, favoriteMeals: updatedFavMeals}
            }else{
                const meal = state.meals.find(meal => meal.id === action.mealId);
                //usamos concat en vez de push porque concat devuelve un arreglo nuevo
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)}
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if(appliedFilters.glutenFree && !meal.isGlutenFree){
                    return false;
                }
                if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                    return false;
                }
                if(appliedFilters.vegan && !meal.isVegan){
                    return false;
                }
                if(appliedFilters.vegetarian && !meal.isVegetarian){
                    return false;
                }
                return true;
            });
            return {...state, filteredMeals: updatedFilteredMeals}
        default:
            return state;
    }
    return state;
}

export default mealsReducer;