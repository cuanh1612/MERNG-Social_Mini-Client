import React, { useState as UseState, useContext as UseContext, useEffect as UseEffect} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function menubar() {
    const { user, logout } = UseContext(AuthContext)


    const [activeItem, setActiveItem] = UseState('/')

    UseEffect(() => {
        setActiveItem(window.location.pathname)
    }, [user, window.location.pathname])

    const handleItemClick = (pathActive) => {
        setActiveItem(pathActive)
    }

    const setActiveClass = (linkSetActive) => {
        if (linkSetActive === activeItem) {
            return "item active"
        } else return "item"
    }

    return (
        <div className="container ui secondary pointing menu">
            {user ? (
                <>
                    <Link to="/" className={setActiveClass("/")} onClick={() => handleItemClick('/')}>
                        {user.username}
                    </Link>
                    <div className="right menu">
                        <Link to="/" className="item" onClick={() => {
                            handleItemClick('/')
                            logout() 
                        }}>
                            Logout
                        </Link>
                    </div>
                </>


            ) : (
                <>
                    <Link to="/" className={setActiveClass("/")} onClick={() => handleItemClick('/')}>
                        Home
                    </Link>
                    <div className="right menu">
                        <Link to="/login" className={setActiveClass("/login")} onClick={() => handleItemClick('/login')}>
                            Login
                        </Link>
                        <Link to="/register" className={setActiveClass("/register")} onClick={() => handleItemClick('/register')}>
                            register
                        </Link>
                    </div>
                </>
            )}


        </div>

    )
}
