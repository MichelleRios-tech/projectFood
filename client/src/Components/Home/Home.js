import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getData } from '../../Redux/actions';
import Paginator from '../Paginator/Paginator';
import SearchBar from '../SearchBar/SearchBar';
import Tag from '../Tag/Tag';
import './Home.css'
function Home() {
    const [searchOptions, setSearchOptions] = useState({
        search: '',
        searchType: 'all',
        diets: 'all',
    });

    const RECIPES = useSelector(state => state.RECIPES);
    const PAGE = useSelector(state => state.PAGE);
    const dispatch = useDispatch();
    const { searchType, diets } = searchOptions;

    useEffect(() => {
        !RECIPES.length && dispatch(getData('RECIPES'));
        //setSearchOptions({...searchOptions, diets: 'all'});

    }, [dispatch, searchOptions, RECIPES, PAGE])

    /// filtrar por lo que hay en search ////
    let orderedList = RECIPES //search ?
    //     RECIPES.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())) :
    //     RECIPES;

    const filterByType = {
        all: (list) => list,//TRAER TODAS LAS RECETAS AKA NOP
        db: (list) => list.filter((e) => isNaN(e.id)),//UUID EN DB ES NAN
        api: (list) => list.filter((e) => !isNaN(e.id)),//ID DE LA API NO ES NAN
    }
    const inicial = (PAGE - 1) * 9;
    const final = inicial + 9
    //////FILTRAR POR TYPE //////
    orderedList = filterByType[searchType](orderedList);
    //FILTRAR POR DIETAS //////
    diets !== 'all' && (orderedList = orderedList.filter((e) => e.diets.includes(diets)))
    /////PAGINADO //////
    let pagedList = orderedList.slice(inicial, final);
    return (
        <div className='home'>
            <SearchBar searchOptions={searchOptions} setSearchOptions={setSearchOptions} key='searchbar' />
            <Paginator totalElements={orderedList.length} />
            {pagedList.length && pagedList.map(e => <Tag recipe={e} key={e.id} />)}
        </div>
    )
}

export default Home
