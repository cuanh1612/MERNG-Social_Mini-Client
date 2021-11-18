import { useMutation, gql } from '@apollo/client'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import React, { useContext, useEffect, useState } from 'react'

export default function LikeButton({ id, likesCount, likes }) {
    const history = useNavigate()
    
    const { user } = useContext(AuthContext)

    const [liked, setLiked] = useState(false)

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    })

    useEffect(() => {
        if (user && likes && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])

    const handleClickLike = () => {
        if(user) {
            likePost()
        } else history('/login')
    }

    return (
        <div className="ui labeled button mini" tabIndex={0} onClick={handleClickLike}>
            <div className={liked ? "ui red button mini" :"ui blue button mini"}>
                <i className="heart icon" />
            </div>
            <p className={liked ? "ui basic red left pointing label" :"ui basic blue left pointing label"}>
                {likesCount}
            </p>
        </div>

    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id 
            likes{
                id
                username
            }
            likesCount
        }
    }
`