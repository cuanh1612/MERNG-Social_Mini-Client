import React, { useContext} from 'react'
import { useQuery, gql } from "@apollo/client"
import CardPost from "../components/CardPost"
import { AuthContext } from '../contexts/AuthContext'
import PostForm from '../components/PostForm'


export default function Home() {
    const { user } = useContext(AuthContext)

    const { loading, data, fetchMore } = useQuery(FETCH_POSTS_QUERY, {
        variables: {
            offset: 0,
            limit: 5
        }
    })

    const GetPosts = data ? data.getPosts : []



    const LoadMore = () => {
        return fetchMore({
            variables: {
                offset: data.getPosts.length
            },
        })
    }

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
            <button class="ui primary button" style={{ margin: "auto" }} onClick={LoadMore}>
                Load more
            </button>
        </div>
    )
}

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