import React from 'react'
import Paginator from '../Paginator/Paginator'
import SearchBar from '../SearchBar/SearchBar'
import './Header.css'

function Header({searchOptions, setSearchOptions, totalElements }) {

    return (
        <div className='options'>
            <SearchBar searchOptions={searchOptions} setSearchOptions={setSearchOptions}/> 
            <Paginator totalElements={totalElements}/>
        </div>
    )
}

export default Header
