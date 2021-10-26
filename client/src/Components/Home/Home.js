import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/actions';
import Tag from '../Tag/Tag';
import './Home.css'
import Header from '../Header/Header';
import Navbar from '../NavBar/NavBar';
import { Route } from 'react-router-dom';

function Home() {
    const [searchOptions, setSearchOptions] = useState({
        search: '',
        searchType: 'all',
        diets: 'all',
        order: 'def',
    });

    const RECIPES = useSelector(state => state.RECIPES);
    const PAGE = useSelector(state => state.PAGE);
    const dispatch = useDispatch();
    const { searchType, diets, order } = searchOptions;

    useEffect(() => {
        dispatch(getData('RECIPES'));
        //setSearchOptions({...searchOptions, diets: 'all'});

    }, [dispatch])

    /// filtrar por lo que hay en search ////
    let orderedList = RECIPES //search ?
    //     RECIPES.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())) :
    //     RECIPES;

    const filterByType = {
        all: (list) => list,//TRAER TODAS LAS RECETAS AKA NOP
        db: (list) => list.filter((e) => isNaN(e.id)),//UUID EN DB ES NAN
        api: (list) => list.filter((e) => !isNaN(e.id)),//ID DE LA API NO ES NAN
    }
    const filterByOrder = {
        def: (list) => list,
        asc: (list) => list.slice().sort((a, b) => a.title.localeCompare(b.title)),
        desc: (list) => list.slice().sort((a, b) => b.title.localeCompare(a.title)),
        score: (list) => list.slice().sort((a, b) => b.spoonacularScore - a.spoonacularScore),
    }
    const inicial = (PAGE - 1) * 9;
    const final = inicial + 9
    //////FILTRAR POR TYPE //////
    orderedList = filterByType[searchType](orderedList);
    //FILTRAR POR DIETAS //////
    diets !== 'all' && (orderedList = orderedList.filter((e) => e.diets.includes(diets)))
     let orderedListAux = filterByOrder[order](orderedList);
    /////PAGINADO //////
    let pagedList = orderedListAux.slice(inicial, final);
    return (
        <div className='home'>
            <Route path="/">
          </Route>
            <Header searchOptions={searchOptions} setSearchOptions={setSearchOptions} totalElements={orderedList.length}/>
            <h2 id='introTitle'>Recipes: click on the image to view details</h2>
            <div className='tagsContainer'>
            {pagedList.length && pagedList.map(e => <Tag recipe={e} key={e.id}/>)}
            </div>
        </div>
    )
}

export default Home
