
const axios  = require('axios');
const { Diet } = require('../../db.js');
const {
    API_KEY
} = process.env;
const {recipesAxios} = require ('./recipesController')

module.exports = async function getTypes (req,res,next){
try  { 
    const types = (await axios(recipesAxios)).data.results;
    types.forEach(e=> e.diets.forEach (e=> 
        Diet.findOrCreate({where: {name: e}})
        ))

    Diet.findAll().then(diets => {
        diets = diets.map(diet => diet.name)
        res.status(200).json(diets)})
        
    
}
catch (err){
    next(err);
}

}

