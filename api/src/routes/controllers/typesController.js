
const { Diet } = require('../../db.js');

module.exports = async function getTypes (req,res,next){
try  { 
    Diet.findAll()
        .then(r => 
            {r = r.map(e=> e.name);
                res.status(200).json(r)}
            )
    
}
catch (err){
    next(err);
}

}

