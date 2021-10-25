import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe } from '../../Redux/actions'


function Form() {
   const DIETS= useSelector(state => state.DIETS)
    const [formData, setformData] = useState({
        title: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        analyzedInstructions: '',
        diets: []

    })
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(formData.diets);
    }, [formData.diets])
    const handleChange = (e) => {

        const { name, value } = e.target
        setformData({...formData, [name]: value}) 
        console.log(formData);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRecipe(formData));
        alert('Recipe created with ');
        
    }
    const handleCheckbox = (e) => {
        const { name, checked } = e.target 
        if (checked) {
            ////SI ESTA CHECKEADO SE AGREGA AL ARREGLO////
            setformData({...formData, diets: [...formData.diets, name]})
        } else { 
            ////SI NO ESTA CHECKEADO SE QUITA DEL ARREGLO////
            const diets = formData.diets.filter(diet => diet !== name)
            setformData({...formData, [name]: diets})
        }
    }
const createDietsInputs = () => {   ////CREA LOS CHECKBOX DE DIETAS////           
    return DIETS.map(diet => {
        return (
            <div key={diet}>
                <input type='checkbox' name={diet} value={formData.diets} onChange={handleCheckbox} /> 
                <label>{diet}</label>
            </div>
        )
    })
}
const createForm = () => {
        return (
            <form className='createRecipe' onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type='text' name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    Summary:
                    <input
                        type='text' name='summary'
                        value={formData.summary}
                        onChange={handleChange} 
                        required/>
                </label>
                <label>
                    Score:
                    <input
                        type='number' name='spoonacularScore'
                        value={formData.spoonacularScore}
                        onChange={handleChange} />
                </label>
                <label>
                    Health Score:
                    <input
                        type='number' name='healthScore'
                        value={formData.healthScore}
                        onChange={handleChange} />
                </label>
                <label>
                    Instructions:
                    <textarea
                        type='text' name='analyzedInstructions'
                        value={formData.analyzedInstructions}
                        onChange={handleChange} />
                </label>
                {createDietsInputs()}
                <button type='submit' disabled={!formData.title || !formData.summary}>Submit</button>
            </form>
        )
    }
   
    return (
        <div>
             {createForm()}
        </div>
    )
}

export default Form
