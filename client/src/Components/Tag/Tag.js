import './Tag.css'
import React from 'react'
import {Link} from 'react-router-dom'
import Details from '../Details/Details'


const defIMG = 'https://i.pinimg.com/originals/31/9a/2d/319a2d108b51035bcdd43edc37866094.gif'
function Tag({ recipe }) {
    
    //el text de la api viene en formato HTML asi que... https://www.codegrepper.com/code-examples/html/reactjs+to+convert+text+to+html
    return (
        <div className='tag'>
            {/*  /<?\/?b?>/g => expresion regular para encontrar los saltos de linea y borrarlos e*/}
            {/* {`${recipe.summary.replaceAll(/<?\/?b>/g, '\n')}`} */}
            <Link to={`/food/recipe/${recipe.id}`}>
            <img className='recipeIMG'src={recipe?.image || defIMG} alt='recipe IMG' />
            </Link>
            <div className='recipeInfo'>
                <h3>{recipe.title}</h3> 
                <div className='DietsList'>Diets: {recipe.diets.map(e => <>{e+" / "}</>)}</div>
            </div>
        </div>
    )
}



export default Tag
