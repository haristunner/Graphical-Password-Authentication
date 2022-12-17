import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
export default function Dashboard() {
  return (
    <>
    <div className='db'>
    <div>Dashboard</div>
    <Link to="/"><button id='db__btn'>Sign out</button></Link>
    </div>
    </>
  )
}
