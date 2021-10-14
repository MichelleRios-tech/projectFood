//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Recipe, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    initializeDBForTest();
    createDiets();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
///////////////////// crear un elemento con relacion para probar conexion con base de datos y peticiones
async function initializeDBForTest (){
   Recipe.create({
      title: 'test',
      summary: 'resumen prueba'
    }).then(testRecipe =>
      Diet.create(
          {
            name: "diet test"
          }
        ).then(testDiet => testRecipe.addDiet(testDiet) ) )
      
}

async function createDiets() {
  const diets = ['gluten free',
                  'ketogenic',
                  'vegetarian',
                  'lacto-vegetarian',
                  'ovo-vegetarian', 
                  'vegan',
                  'pescetarian',
                  'paleo',
                  'primal',
                  'low FODMAP',
                  'whole30'
                 ]

    diets.forEach(e => Diet.create({name: e}))

}