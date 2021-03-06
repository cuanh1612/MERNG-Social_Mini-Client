import {createContext, useReducer as UseReducer} from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    }else{
        initialState.user = decodedToken
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})


function AuthProvider ({children}){

    const authReducer = (state, action) => {
        switch(action.type) {
            case 'LOGIN':
                return{
                    ...state,
                    user: action.payload
                }
            case 'LOGOUT':
                return{
                    ...state,
                    user: null
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = UseReducer(authReducer, initialState)

    function login(userData){
        localStorage.setItem("jwtToken", userData.token)
        dispatch({
            type: "LOGIN",
            payload: userData
        })
    }

    function logout(){
        localStorage.removeItem("jwtToken")
        dispatch({
            type: "LOGOUT"
        })
    }

    return (
        <AuthContext.Provider value={{user: state.user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}