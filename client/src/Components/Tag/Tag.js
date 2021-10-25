import './Tag.css'
import React from 'react'
const defIMG = 'https://i.pinimg.com/originals/31/9a/2d/319a2d108b51035bcdd43edc37866094.gif'
function Tag({ recipe }) {
    
    //el text de la api viene en formato HTML asi que... https://www.codegrepper.com/code-examples/html/reactjs+to+convert+text+to+html
    return (
        <div className='tag'>
            {/*  /<?\/?b?>/g => expresion regular para encontrar los saltos de linea y borrarlos e*/}
            {/* {`${recipe.summary.replaceAll(/<?\/?b>/g, '\n')}`} */}
            <img className='recipeIMG'src={recipe?.image || defIMG} alt='recipe IMG' />
            <h2>{recipe.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} /> 
            <div className='DietsList'>{recipe.diets.map(e => <>{e}<br/></>)}</div>

        </div>
    )
}



export default Tag
