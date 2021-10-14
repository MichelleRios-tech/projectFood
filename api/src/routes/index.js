const { Router } = require('express');
const types  = require('./getTypes/types');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require ('./getRecipes/recipes.js') 
const postRecipe = require ('./postRecipe/postRecipe.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/recipes', recipes);
router.use('/types', types);
router.use('/recipe', postRecipe);
module.exports = router;
