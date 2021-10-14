const { Router } = require('express');
require('dotenv').config();
const axios = require('axios');
const {getRecipes, getRecipesId} = require('../controllers/recipesController')
const { Diet, Recipe} = require('../../db.js');
const {
    API_KEY
} = process.env;

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipesId);



module.exports = router;