require('dotenv').config();
const axios = require('axios');
const { Diet, Recipe, Op } = require('../../db.js');
const {
    API_KEY
} = process.env;

const recipesAxios = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;


/////////////////////////funcion para obtener las primeras 100 recetas o bien recetas por query name /////////////////////////
async function getRecipes(req, res, next) {
    const { name } = req.query;

   
        //iLike para busquedas con terminos parciales https://sequelize.org/v5/manual/models-usage.html
        let recipesDB = name ? //inicializa base de datos
            await Recipe.findAll({ where: { title: { [Op.iLike]: `%${name}%` } }, include: { model: Diet } }) : ////cuando tenemos un name busca solo los elementos con ese name
            await Recipe.findAll({ include: { model: Diet } }); //traemos todo

        /////////trae los datos de la API
        let recipes =[];
        try {

             recipes = (await axios(recipesAxios)).data.results;
            
        } catch (error) {
            recipes = [{
                id: 1,
                title: 'No response from API',
                summary: error,
                diets: ["vegan"]
                
            }];
            console.log(error);
        }

        ////////si name existe lo filtramos por name
        if (name) recipes = recipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));

        
        /// concatenamos resultados de la db y damos formato
        const results = format([...recipesDB, ...recipes]); 

        //si tenemos un name y no encontro nada ni en la API ni en la DB regresamos un error
        (name && !results.length) ? 
            res.status(404).json("recipe not found") :
            res.status(200).json(results);
    

  

}



//////////////funsion para recetas por ID////////////////////////////////////////////////
async function getRecipesId(req, res, next) {

    try {

        const { id } = req.params
        const recipesAxiosByID = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

        const recipe = isNaN(id) ? //si no es un numero es un uuid por lo tanto lo buscamos en la db
            await Recipe.findAll({ where: { id: id }, include: { model: Diet } }) :
            (await axios(recipesAxiosByID)).data; //si es un numero lo traemos de la api

        res.status(200).json(recipe)
    }
    catch (err) {
        next(err);
    }
}



////////////////// funcion para darle formato a los resultados///////////////////////////////////
function format(elementos) {
    return elementos.map(e => {
        const { id, title, summary } = e;
        const diets = e.diets?.map(a =>  a?.name || a)
        const aux = {
            id,
            title,
            summary,
            diets
        }
        e?.image && (aux['image'] = e.image)
        return aux //return para cada elemento de map
    })

}

module.exports = { getRecipes, getRecipesId, recipesAxios }