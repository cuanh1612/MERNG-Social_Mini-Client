import { gql, useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useForm } from '../util/hooks'

export default function Login() {
    const context  = useContext(AuthContext)
    
    const history = useNavigate()

    const [errors, setErrors] = useState({})


    const LOGIN_USER = gql`
        mutation login(
            $username: String!
            $password: String!
        ) {
            login (
                username: $username
                password: $password
            ) {
                id
                email
                username
                createdAt
                token
            }
        }
    `

    const { onChange, onSubmit, values } = useForm(LoginUserCallback, {
        username: "",
        password: "",
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        variables: values,
        update: (_, {data:{login: userData}}) => {
            context.login(userData)
            history('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
    })

    function LoginUserCallback() {
        loginUser()
    }

    return (
        <form className={loading ? "ui form form-container loading" : "ui form form-container"} onSubmit={onSubmit}>
            <div className={errors.username ? "field ui error" : "field"} >
                <label>User Name</label>
                <input type="text" name="username" placeholder="Your Name" defaultValue={values.username} onChange={onChange} />
            </div>

            <div className={errors.password ? "field ui error" : "field"}>
                <label>Password</label>
                <input type="password" name="password" placeholder="Your Password" defaultValue={values.password} onChange={onChange} />
            </div>

            <button className="ui button blue" type="submit">Login</button>

            {
                Object.keys(errors).length > 0 && (
                    <div className="ui info message red">
                        <div className="header">
                            Errors:
                        </div>
                        <ul className="list">
                            {
                                Object.values(errors).map((value) => (
                                    <li key={value}>{value}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </form>
    )
}
