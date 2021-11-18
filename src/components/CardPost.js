import React, { useContext } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

export default function CardPost({ post: { body, createdAt, id, username, likesCount, commentsCount, likes } }) {
    const { user } = useContext(AuthContext)

    return (
        <div class="ui cards" style={{ marginBottom: "10px", marginTop: "10px" }}>
            <div className="card" style={{ margin: "auto" }}>
                <div className="content">
                    <img className="right floated mini ui image" src="https://images.everyeye.it/img-notizie/facebook-l-invasione-avatar-italia-come-crearne-uno-v3-447599.jpg" alt="avatar" />
                    <div className="header">
                        {username}
                    </div>
                    <Link to={`/post/${id}`} className="meta">
                        From {moment(createdAt).fromNow()}
                    </Link>
                    <div className="description">
                        {body}
                    </div>
                </div>
                <div className="extra content" style={{ display: "flex", justifyContent: "space-between" }}>
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
                            <DeleteButton postId = {id}/>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

