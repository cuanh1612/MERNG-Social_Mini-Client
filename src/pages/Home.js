import React, { useContext } from 'react'
import { useQuery, gql } from "@apollo/client"
import CardPost from "../components/CardPost"
import { AuthContext } from '../contexts/AuthContext'
import PostForm from '../components/PostForm'


export default function Home() {
    const { user } = useContext(AuthContext)

    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    const GetPosts = data ? data.getPosts : []
    if (GetPosts) console.log(GetPosts)

    return (
        <div className="grid ui">
            {
                loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    <div className="three column row">
                        {

                            user && (
                                <div class="column" style={{ marginBottom: "20px" }}>
                                    <PostForm />
                                </div>
                            )
                        }
                        {GetPosts.map((post) => (
                            <div key={post.id} class="column" style={{ marginBottom: "20px" }}>
                                <CardPost post={post} />
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

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