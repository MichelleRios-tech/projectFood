
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
        
    
    return (
        <ul className='linksList'>
            <Link to='/' className='link'>Landing</Link>
            <Link to='/food' className='link'>Home</Link>
            <Link to='/food/create' className='link'>Create</Link>
        </ul>
    )
}

export default NavBar
