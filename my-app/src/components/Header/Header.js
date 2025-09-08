import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

function Header() {
    return (
        <nav>
            <ul className='logoPadre'>
                <li><img className='logoHijo' src={'/' + 'logo.jpg'} alt='img user' /></li>
            </ul>

            <ul className='padreHeader'>
                <li><Link to='/' className='hijoHeader' >Home</Link></li>
                <li><Link to='/movies' className='hijoHeader'>Movies</Link></li>
                <li><Link to='/series' className='hijoHeader'>Series</Link></li>
                <li><Link to='/favorites' className='hijoHeader'>Favorites</Link></li>
            </ul>

            <form action="" method="GET" className="">
                <input type="text" name="q" placeholder="Buscar…" className="search" />
                <button type="submit" className="boton"><i className="boton2"></i></button>
            </form>

        </nav>
    )
}

export default Header;