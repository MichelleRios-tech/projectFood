const { Router } = require('express');
const getTypes = require('../controllers/typesController')

const router = Router();

router.get("/", getTypes);




module.exports = router;