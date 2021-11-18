import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

export default function DeleteButton({ postId }) {
    const history = useNavigate()

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: {
            postId
        },
        refetchQueries: [FETCH_POSTS_QUERY, "getPosts"]
    })


    const handleDelete = () => {
        deletePost()
        history('/')
       
    }
    return (
        <button class="ui icon button red " onClick={handleDelete}>
            <i class="trash icon"></i>
        </button>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
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

