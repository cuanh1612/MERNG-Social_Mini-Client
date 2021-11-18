import { useMutation, gql } from '@apollo/client'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm } from '../util/hooks'
import { AuthContext } from '../contexts/AuthContext'

export default function Login() {
    const context = useContext(AuthContext)

    const history = useNavigate()

    const [errors, setErrors] = useState({})


    const REGISTER_USER = gql`
        mutation register(
            $username: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ) {
            register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
            ) {
            id
            email
            username
            createdAt
            token
            }
        }
    `

    const { onChange, onSubmit, values } = useForm(RegisterAddUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(
          _,
          {
            data: { register: userData }
          }
        ) {
          context.login(userData);
          history('/');
        },
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
      });


    function RegisterAddUser() {
        addUser()
    }









    return (
        <form className={loading ? "ui form form-container loading" : "ui form form-container"} onSubmit={onSubmit}>
            <div className={errors && errors.username ? "field ui error" : "field"} >
                <label>User Name</label>
                <input type="text" name="username" placeholder="Your Name" defaultValue={values.username} onChange={onChange} />
            </div>
            <div className={errors && errors.email ? "field ui error" : "field"}>
                <label>Email</label>
                <input type="email" name="email" placeholder="Your Email" defaultValue={values.email} onChange={onChange} />
            </div>
            <div className={errors && errors.password ? "field ui error" : "field"}>
                <label>Password</label>
                <input type="password" name="password" placeholder="Your Password" defaultValue={values.password} onChange={onChange} />
            </div>
            <div className={errors && errors.confirmPassword ? "field ui error" : "field"}>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Comfirm Password Your Password" defaultValue={values.confirmPassword} onChange={onChange} />
            </div>
            <button className="ui button blue" type="submit">Register</button>

            {
                errors && Object.keys(errors).length > 0 && (
                    <div className="ui info message red">
                        <div className="header">
                            Errors:
                        </div>
                        <ul className="list">
                            {
                                errors && Object.values(errors).map((value) => (
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
