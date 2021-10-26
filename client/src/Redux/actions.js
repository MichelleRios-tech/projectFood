import axios from 'axios'

export const ALL_DIETS = 'ALL_DIETS'
export const UPDATE_SEARCH = 'UPDATE_SEARCH'

export const UPDATE_PAGE = 'UPDATE_PAGE';

const urls = {
    RECIPES: 'http://localhost:3001/recipes', //RUTA PARA OBTENER LAS RECETAS
    ALL_DIETS: 'http://localhost:3001/types',//RUTA DE LOS TYPOS DE DIETA
    CREATE_RECIPE: 'http://localhost:3001/recipe'
    
}


export const getData = (data, name)=>{
    return (dispatch)=>{
        const byname=  name?.length ? `?name=${name}`: '';
        axios.get( urls[data]+byname)
        .then(response => dispatch({type: data, payload: response.data}))
    }
}

export const updatePage = (page)=>{
    return (dispatch)=>{
        dispatch({type: 'UPDATE_PAGE', payload: parseInt(page)})
    }
}

export const createRecipe = (recipe)=>{
    return ()=>
        axios.post(urls.CREATE_RECIPE, recipe)
        .catch(e=> console.log(e))
}
    
export const getRecipeById = (id)=>{
    return (dispatch)=>{
        axios.get(urls.RECIPES+'/'+id)
        .then(response => dispatch({type: 'RECIPE_ID', payload: response.data}))
    }
}

export const cleanRecipe = ()=>{
    return (dispatch)=>{
        dispatch({type: 'RECIPE_ID', payload: null})
    }
}