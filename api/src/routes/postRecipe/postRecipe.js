const { Router } = require('express');
const postRecipe = require('../controllers/postRecypeController');


const router = Router();

router.post("/", postRecipe);
module.exports = router;