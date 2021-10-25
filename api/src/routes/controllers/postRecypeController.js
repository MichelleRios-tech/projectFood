const { Diet, Recipe, Op } = require('../../db.js');



module.exports = async function postRecipe(req, res, next) {
    try {

        ///desestructurar el body
        console.log(req.body)
        const { title,
            summary,
            spoonacularScore,
            healthScore,
            analyzedInstructions,
            diets } = req.body
        ////crear nueva receta
        Recipe.findOrCreate({
            where: {
                title,
                summary,
                spoonacularScore,
                healthScore,
                analyzedInstructions,
            }
        }).then(newRecipe => {
            ///si se paso diets como un array agregamos cada diet que se recivio por body a la receta
            Array.isArray(diets) && diets.forEach(diet =>
                Diet.findOrCreate({where:{ name: diet.toLowerCase()}})// { where: { name: { [Op.iLike]: name } } iLike rompe create
                    .then(newDiet => newRecipe[0].addDiet(newDiet[0]))
                );
            res.status(200).json(newRecipe);
        }) ////termina el then the Recipe.Create

    }
    catch (err) {
        next(err);
    }
}