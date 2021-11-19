import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useForm } from '../util/hooks'


export default function CardPost() {
    const [errors, setErrors] = useState()

    const CREATE_POST_MUTATION = gql`
        mutation createPost(
            $body: String!
        ) {
            createPost(body: $body) {
                id
                body
                createdAt
                username
                likes{
                    id
                    username
                    createdAt
                }
                likesCount
                comments{
                    id
                    body
                    username
                    createdAt
                }
                commentsCount
            }
        }
    `

    const FETCH_POSTS_QUERY = gql`
        query($offset: Int!, $limit: Int!){
            getPosts(offset: $offset, limit: $limit){
                id 
                body 
                createdAt 
                username 
                likesCount
                commentsCount
                likes{
                    username
                }
                comments{
                    id 
                    username 
                    createdAt 
                    body
                }
            }
        }
    `

    const { onChange, onSubmit, values } = useForm(createPostCallBack, {
        body: "",
    })

    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update: (_, result) => {
            console.log(result);
        },
        refetchQueries: [FETCH_POSTS_QUERY, "getPosts", {
            
        }],
        onError(err) {
            setErrors(err.graphQLErrors[0].message)
        }
    })

    function createPostCallBack() {
        createPost()
    }

    return (
        <form className={loading ? "ui form form-container loading" : "ui form form-container"} onSubmit={onSubmit}>
            <h1>
                Create Post
            </h1>
            {/* className={errors.username ? "field ui error" : "field"}  */}
            <div className="field ui">
                <input type="text" name="body" placeholder="Post Body" defaultValue={values.body} onChange={onChange} />
            </div>

            <button className="ui button blue" type="submit">Create</button>

            {
                errors && (
                    <div className="ui info message red">
                        <div className="header">
                            Errors:
                        </div>
                        <p>{errors}</p>
                    </div>
                )
            }
        </form>
    )
}
