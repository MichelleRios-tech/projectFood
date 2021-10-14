const { Diet, Recipe, Op } = require('../../db.js');



module.exports = async function postRecipe(req, res, next) {
    try {
        console.log(req.body)
        const { title,
            summary,
            spoonacularScore,
            healthScore,
            analyzedInstructions,
            diets } = req.body

        Recipe.findOrCreate({
            where: {
                title,
                summary,
                spoonacularScore,
                healthScore,
                analyzedInstructions,
            }
        }).then(newRecipe => {

            Array.isArray(diets) && diets.forEach(diet =>
                
                Diet.findOrCreate({
                    where:
                    {
                        name: diet.toLowerCase()
                    }
                })// { where: { name: { [Op.iLike]: `%${name}%` } } iLike rompe create
                    .then(newDiet => 
                        newRecipe[0].addDiet(newDiet[0]) )

            );
            res.status(200).json(newRecipe);
        }

        )

    }
    catch (err) {
        next(err);
    }
}