const { Router } = require('express');
require('dotenv').config();
const {getRecipes, getRecipesId} = require('../controllers/recipesController')

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipesId);



module.exports = router;