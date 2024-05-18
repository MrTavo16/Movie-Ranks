import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getAllPosts, likePost, createPost } from "../../redux/post";

const PostHome = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [addedPost, setAddedPost] = useState(false)
    const [postText, setPostText] = useState('')
    const [errors, setErrors] = useState({})
    const posts = useSelector(state => state.posts)
    const user = Object.values(useSelector(state => state.session))[0]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // console.log(user)
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
            })).then(()=>{
                setAddedPost(false)
                setPostText(false)
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
            <div onClick={()=> setAddedPost(true)}>add a post</div>
            {errors ? <p>{errors.postErrors}</p>:<></>}
            {addedPost ? <textarea onChange={(e)=> setPostText(e.target.value)} placeholder="Body Text"></textarea>:<></>}
            {addedPost ? <div onClick={handleCancel}>Cancel</div>:<></>}
            {addedPost ? <div onClick={handlePostSubmit}>Post</div>:<></>}
            {Object.values(posts).map(ele => {
                let usersLiked
                if(ele.users_liked){
                    usersLiked = ele.users_liked.split(',') 
                    usersLiked.pop()
                }
                return <div key={ele.id}>
                    <h4>{ele.username}</h4>
                    <h2 onClick={() => navigate(`/posts/${ele.id}`)}>{ele.post_text}</h2>
                    <div>
                        <div>
                        {usersLiked && usersLiked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={()=>dispatch(likePost({
                            id:ele.id,
                            user_id_like:user.id
                        }))}></i>:<i className="fa-regular fa-thumbs-up" onClick={()=>dispatch(likePost({
                            id:ele.id,
                            user_id_like:user.id
                        }))}></i>}
                        <p>{ele.likes}</p>
                        </div>
                        <i className="fa-regular fa-comment" onClick={() => navigate(`/posts/${ele.id}`)}></i>
                    </div>
                </div>
            })}

        </div>}
    </>)
}
export default PostHome 