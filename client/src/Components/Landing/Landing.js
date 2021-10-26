import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './landing.css';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/actions';


function Landing() {
    const dispatch = useDispatch();
    const DIETS = useSelector(state => state.DIETS)

    //NOS TREAMOS TODAS LAS DIETAS PARA USARLAS EN EL FORMULARIO
    useEffect(() => {
      !DIETS.length && dispatch(getData('ALL_DIETS'));
      
    }, [DIETS,dispatch])

    //SE RENDERIZA EL LANDING
    return (
        
        <div className='Landing'>
            <h1>Project foods</h1>
            <h2>By: Irving Rios</h2>
            <h3>Find the best recipes</h3>
            <Link to='/food'><button className='LandingButton'>Home</button></Link>
        </div>
    )
}

export default Landing