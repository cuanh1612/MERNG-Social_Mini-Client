import { gql, useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import DeleteButton from './DeleteButton'
import DeleteCommentButton from './DeleteCommentButton'
import LikeButton from './LikeButton'

export default function SinglePost() {
    const [comment, setComment] = useState('')

    const { user } = useContext(AuthContext)


    const { postId } = useParams()

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const GetPost = data ? data.getPost : {}

    const { id, body, createdAt, username, comments, likes, likesCount, commentsCount } = GetPost

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('')
        },
        variables: {
            postId: id,
            body: comment
        }
    })

    const changePostComment = (e) => {
        setComment(e.target.value)
    }

    const handlerPostComment = (e) => {
        e.preventDefault()
        submitComment()
    }

    return (
        <div class="ui grid">
            <div class="three wide column">
                <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" alt="avatar" style={{ width: "100%" }} />
            </div>
            <div class="thirteen wide column">
                <div class="ui cards" style={{ marginTop: "1px", width: "100%" }}>
                    <div className="card" style={{ margin: "auto", width: "100%" }}>
                        <div className="content">
                            <div className="header">
                                {username}
                            </div>
                            <p className="meta">
                                From {moment(createdAt).fromNow()}
                            </p>
                            <div className="description">
                                {body}
                            </div>
                        </div>
                        <div className="extra content" style={{ display: "flex" }}>
                            <LikeButton id={id} likesCount={likesCount} likes={likes} />

                            <div className="ui labeled button mini" tabIndex={0}>
                                <div className="ui blue button mini">
                                    <i className="comments icon " />
                                </div>
                                <p className="ui basic blue left pointing label">
                                    {commentsCount}
                                </p>
                            </div>

                            {
                                user && user.username === username && (
                                    <DeleteButton postId={id} />
                                )
                            }
                        </div>
                    </div>
                </div>

                {
                    user && (
                        <form className="ui form" style={{ marginRight: "10px", marginTop: "20px" }} onSubmit={handlerPostComment}>
                            <div class="field">
                                <label>Post your comment</label>
                                <input type="text" placeholder="First Name" onChange={changePostComment} />
                            </div>

                            <button className="ui button blue" type="submit">Post</button>
                        </form>
                    )
                }

                {
                    comments && comments.map((comment) => (
                        <div class="ui cards" key={comment.id} style={{ marginTop: "20px", width: "100%" }}>
                            <div className="card" style={{ margin: "auto", width: "100%" }}>
                                <div className="content">
                                    <div className="header">
                                        {comment.username}
                                    </div>
                                    <p className="meta">
                                        From {moment(comment.createdAt).fromNow()}
                                    </p>
                                    <div className="description">
                                        {comment.body}
                                    </div>
                                </div>

                                <div className="extra content" style={{ display: "flex" }}>
                                    {
                                        user && user.username === comment.username && (
                                            <DeleteCommentButton postId={id} commentId={comment.id} />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likesCount
            likes{
                username
            }
            commentsCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`
const SUBMIT_COMMENT_MUTATION = gql`
    mutation CreateComment($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                username
                body
                createdAt
                username
            }
            commentsCount
        }
    }
`