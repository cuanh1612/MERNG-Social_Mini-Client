import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'

export default function PrivateRoute({children}) {
    const {user} = useContext(AuthContext)
    
    return (
        <>
            {user ? <Navigate to="/"/> : children }
        </>
    )
}
