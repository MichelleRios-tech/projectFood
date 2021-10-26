import './Details.css'
import { useDispatch, useSelector } from 'react-redux'
import { cleanRecipe, getRecipeById } from '../../Redux/actions'
import { useEffect } from 'react';
import { useParams } from 'react-router';



function Details() {
    const RECIPE_BY_ID = useSelector(state => state.RECIPE_BY_ID);
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
      !RECIPE_BY_ID.length &&  dispatch(getRecipeById(id));
     
    }, [RECIPE_BY_ID.length, dispatch, id])

    const { title, image, analyzedInstructions, diets, spoonacularScore, summary, healthScore } = RECIPE_BY_ID;
    console.log(RECIPE_BY_ID)


    const steps = () => {
        if (typeof analyzedInstructions === 'string')
        { return <div className="details-steps">{analyzedInstructions}</div> }
        else {
            return (
            <>
            <ol>{analyzedInstructions && analyzedInstructions[0]?.steps.map(({ step }) => (
                <li key={step}>{step}</li>   
            ))} </ol>
            </>)
        }
    }
    return (
        <div className='details'>
            <h1>{title}</h1>
            <img src={image} alt="" />
            <div className='summary' >
                <p dangerouslySetInnerHTML={{ __html:summary }}></p>
            </div>
            <div className='steps'>
               {steps()}
            </div>
            <div className='score'>
                <p>Spoonacular Score: {spoonacularScore}</p>
                <p>Health Score: {healthScore}</p>
                <p>Diets: {diets?.map(diet => diet).join(', ')}</p>
            </div>
        </div>
    )
}

export default Details
