import React from 'react'
import { useHistory,Link } from 'react-router-dom';
import "./home.css"

export default function home() {
  const history = useHistory();
    return (
        
        <div className='home'>
            <h1>GRAPHICAL PASSWORD AUTHENTICATION SYSTEM</h1>
            <div className='home__btns'>
                <Link to="/register"><button id='home__btn' onclick>REGISTER</button></Link>
                <Link to="/login"><button id='home__btn' onclick>LOGIN</button></Link>
            </div>
        </div>
        
    )
}