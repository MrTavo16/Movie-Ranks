import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getAllPosts, likePost, createPost } from "../../redux/post";
import './PostHome.css'

const PostHome = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [addedPost, setAddedPost] = useState(false)
    const [postText, setPostText] = useState('')
    const [errors, setErrors] = useState({})
    const posts = useSelector(state => state.posts)
    const user = Object.values(useSelector(state => state.session))[0]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPosts()).then(() => setIsLoaded(true))
    }, [isLoaded])
    
    const handlePostSubmit = (e) =>{
        e.preventDefault()
        const postErrors = {}
        if(postText.length < 8){
            postErrors.postErrors = 'Body needs to be atleast 8 characters long'
            setErrors(postErrors)
        }else{
            setErrors({})
            setAddedPost(false)
            dispatch(createPost({
                "user_id":user.id,
                "post_text":postText
            })).then((res)=>{
                setAddedPost(false)
                setPostText(false)
                navigate(`/posts/${res.id}`)
            })
        }
    }
    const handleCancel = (e)=>{
        e.preventDefault()
        setErrors({})
        setAddedPost(false)
    }
    return (<>
        {isLoaded && <div>
            {errors ? <p>{errors.postErrors}</p>:<></>}
            <div id="add_post" onClick={()=> setAddedPost(true)}>add a post</div>
            {addedPost ? <textarea id="post_creation_text" onChange={(e)=> setPostText(e.target.value)} placeholder="Body Text"></textarea>:<></>}
            {addedPost?<div id="post_and_cancel">
                <div id="cancel_press" onClick={handleCancel}>Cancel</div>
                <div id="post_press" onClick={handlePostSubmit}>Post</div>
            </div>:<></>}
            {/* {addedPost ? <div onClick={handleCancel}>Cancel</div>:<></>}
            {addedPost ? <div onClick={handlePostSubmit}>Post</div>:<></>} */}
            <div id="post_home">
            {Object.values(posts).map(ele => {
                let usersLiked
                if(ele.users_liked){
                    usersLiked = ele.users_liked.split(',') 
                    usersLiked.pop()
                }
                return <div className="posts" onClick={(e) => {
                    e.preventDefault()
                    navigate(`/posts/${ele.id}`)}
                } key={ele.id}>
                    {user.id === ele.user_id ? <h4>{ele.username} 'You'</h4>:<h4>{ele.username}</h4>}
                    <div>
                    <h2>{ele.post_text}</h2>
                    </div>
                    <div className="likes_comments">
                        <div>
                        {usersLiked && usersLiked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={(e)=>{
                            e.stopPropagation()
                            dispatch(likePost({
                            id:ele.id,
                            user_id_like:user.id
                        }))}}></i>:<i className="fa-regular fa-thumbs-up" onClick={(e)=>{
                            e.stopPropagation()
                            dispatch(likePost({
                            id:ele.id,
                            user_id_like:user.id
                        }))}}></i>}
                        <p>{ele.likes}</p>
                        </div>
                        <i className="fa-regular fa-comment" onClick={() => navigate(`/posts/${ele.id}`)}></i>
                    </div>
                </div>
            })}

            </div>
        </div>}
    </>)
}
export default PostHome 