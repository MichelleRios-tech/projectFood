import './SearchBar.css';
import React, { useState, useEffect } from 'react';
import { getData } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';



function SearchBar(props) {
    const DIETS = useSelector(state => state.DIETS)
    /////////VALUES PARA EL/LOS INPUT DEL SEARCH/////////
    const [values, setValues] = useState({
        search: '',
        diets: 'all',// PUSHEAMOS ALL PARA REINICIAR EL SELECT 
    })
    const dispatch = useDispatch()
    const setSearchOptions = props.setSearchOptions;
    const searchOptions = props.searchOptions;
    ////TREMOS LA RECETAS DE LA DB/////
    useEffect(() => {
        !DIETS.length && dispatch(getData('ALL_DIETS'));
    }, [DIETS.length, dispatch])

    ////CONTROLAR EN BUSQUEDA TRAEMOS SUBMIT Y EVITAMOS QUE SE ACTUALIZE LA PAGINA////
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getData('RECIPES', values.search));
        setSearchOptions({ ...searchOptions, ...values });

    }
    //UPDATE DEL ESTADO DEL INPUT /////
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });


    }
    //CAMBIO DE LAS OPCIONES DE BUSQUEDA /////
    const handleClick = (e) => {
        setSearchOptions({ ...searchOptions, [e.target.name]: e.target.value });

    }
    const createSearch = () =>
        <input type='search'
            name='search'
            value={values.search}
            placeholder='Press enter to search...'
            onChange={handleChange}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch(e)} //ejecuta la busqueda al presionar enter y pasamos event por callback
        />

    const createSelect = () => <div className='select'>
        <label htmlFor='diets'>Choose a diet:</label>
        <select name='diets' onChange={handleClick} id='diets'>
            {DIETS.map((diet, index) => <option key={index + diet} value={diet} >{diet}</option>)}
        </select>
    </div>

    const createRadio = () => <div className='radioBtns'>
        <input type='radio' name='searchType' value='all' onClick={handleClick} defaultChecked={true} /><label htmlFor='databases' key='b1'>All</label>
        <input type='radio' name='searchType' value='db' onClick={handleClick} /><label htmlFor='databases' key='b2'>only database</label>
        <input type='radio' name='searchType' value='api' onClick={handleClick} /><label htmlFor='databases' key='b3'>only api</label>
    </div>

    return (

        <div className='searchContainer'>
            {/* <form className='SearchOptions' onSubmit={handleSearch} key='form'> */}
            {createSearch()}
            {/* </form> */}
            {createSelect()}
            {createRadio()}


        </div>
    )
}

export default SearchBar
