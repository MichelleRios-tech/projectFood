
const initialState = {
    RECIPES: [],
    DIETS: [],
    PAGE: 1
}
/////REDUCER SIN BOILERPLATE https://redux.js.org/usage/structuring-reducers/refactoring-reducer-example//////////
export const foodRedux = (state = initialState, { type, payload })=> {
    //FUNCION PARA CAMBIAR EL ESTAD
    function changeState(prop, value) {
        return { ...state, [prop]: value }
    }
    //OBJETO INDICE DE LAS PROPIEADADES A CAMBIAR DE ACUERDO AL TYPE
    const foodReducer = {
            ALL_DIETS: 'DIETS',
            RECIPES: 'RECIPES',
            UPDATE_PAGE: 'PAGE'
            
    }

    return foodReducer.hasOwnProperty(type) ? //EL TIPO ESTA EN EL INDICE?
        changeState(foodReducer[type], payload): // TRUE: CAMBIAMOS LA PROPIEDAD QUE CORRESPONDA
        state; //FALSE: REGRESAMOS EL ESTADO
}
