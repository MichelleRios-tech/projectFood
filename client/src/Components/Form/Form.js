import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe } from '../../Redux/actions'
import './Form.css'
import { useHistory } from "react-router-dom";

function Form() {
    const DIETS = useSelector(state => state.DIETS)
    const [formData, setformData] = useState({
        title: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        analyzedInstructions: '',
        diets: []

    })
    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(() => {
        console.log(formData.diets);
    }, [formData.diets])


    const handleChange = (e) => {

        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
        console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRecipe(formData));
        setformData({
            title: '',
            summary: '',
            spoonacularScore: 0,
            healthScore: 0,
            analyzedInstructions: '',
            diets: []
        })
        alert('Recipe created ');
        history.push('/food');

    }
    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        if (checked) {
            ////SI ESTA CHECKEADO SE AGREGA AL ARREGLO////
            setformData({ ...formData, diets: [...formData.diets, name] })
        } else {
            ////SI NO ESTA CHECKEADO SE QUITA DEL ARREGLO////
            const filteredDiets = formData.diets.filter(diet => diet !== name)
            setformData({ ...formData, diets: filteredDiets })
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

const disabled = !formData.title || !formData.summary; ////DESABILITA EL BOTON SI NO HAY TITULO O SUMMARY////
    return (
        <div className='form'>

            <form className='createRecipe' onSubmit={handleSubmit}>
                <h1>Create a Recipe</h1>
                <label>
                    Title:
                    <input className="formInput"
                        type='text' name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    Summary:
                    <textarea className="formTextarea"
                        type='text' name='summary'
                        value={formData.summary}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    Score:
                    <input className="formInput"
                        type='number' name='spoonacularScore'
                        value={formData.spoonacularScore}
                        onChange={handleChange} />
                </label>
                <label>
                    Health Score:
                    <input className="formInput"
                        type='number' name='healthScore'
                        value={formData.healthScore}
                        onChange={handleChange} />
                </label>
                <label>
                    Instructions:
                    <textarea className="formTextarea"
                        type='text' name='analyzedInstructions'
                        value={formData.analyzedInstructions}
                        onChange={handleChange} />
                </label>
                {createDietsInputs()}
                <button type='submit' className={disabled ? "disabled":"btn"} disabled={disabled}>Submit</button>
            </form>
        </div>
    )
}

export default Form
