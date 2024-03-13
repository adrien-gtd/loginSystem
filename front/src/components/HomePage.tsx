import React from 'react'
import LoginForm from './LoginForm'
import './css/HomePage.css'

const HomePage = () => {

  return (
    <>
    <div className="container">
        <div className="title">Welcom on the home page</div>
        <div className="loginForm">
            <LoginForm/>
        </div>
    </div>
    </>
  )
}

export default HomePage