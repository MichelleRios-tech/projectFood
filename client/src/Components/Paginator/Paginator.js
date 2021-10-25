import './Paginator.css'
import { useDispatch, useSelector } from 'react-redux'
import { updatePage } from '../../Redux/actions'



function Paginator({ totalElements }) {
    const PAGE = useSelector(state => state.PAGE)
    const dispatch = useDispatch()
    const pages = []

    const pageLimit = Math.ceil(totalElements / 9)
    for (let i = 1; i <= pageLimit; i++) {
        pages.push(i)
    }

    const handleClick = (e) => {
        dispatch(updatePage(parseInt(PAGE) + parseInt(e.target.value)));
    }
    /////SE USAN <li> YA QUE BUTTON NO CAMBIA SU CLASSNAME AL CLICKEARSE///////////
    const renderPaginator = pages.map(page =>
        <li
            className={page === PAGE ? 'active' : ''}
            onClick={handleClick}
            value={page}
            key={`${page}` + page}
        >{page}</li>
    )

    return (
        <div className="paginator">

            <ul className='numbers'>
                <li>
                    <button className="previousButton" value={-1} onClick={handleClick} disabled={PAGE === 1}>⏮</button>
                </li>
                {renderPaginator}
                <li>
                    <button className="nextButton" value={1} onClick={handleClick} disabled={PAGE === pageLimit}>⏭</button>
                </li>
            </ul>

        </div>
    )
}





export default Paginator
