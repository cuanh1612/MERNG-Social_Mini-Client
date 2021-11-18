import React from 'react'
import { gql, useMutation } from '@apollo/client'

export default function DeleteCommentButton({ postId, commentId }) {

    const [deleteComment] = useMutation(DELETE_COMMENT_MUATATION, {
        variables: {
            postId,
            commentId
        }
    })

    const handleDelete = () => {
        deleteComment()
    }
    return (
        <button class="ui icon button red " onClick={handleDelete}>
            <i class="trash icon"></i>
        </button>
    )
}

const DELETE_COMMENT_MUATATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                username
                createdAt
                body
            }
            commentsCount
        }
    }
`