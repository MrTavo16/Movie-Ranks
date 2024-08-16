import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, parsePath, useNavigate, useParams } from "react-router-dom";
import { getOnePost, likePost, deletePost, editPost } from "../../redux/post";
import { getAllComments, likeComment, createComment, editComment, deleteComment } from "../../redux/comment";
import './PostDetails.css'

const PostDetails = () => {
    const postId = Number(useParams().postId)
    const [isLoaded, setIsLoaded] = useState(false)
    const [nestedComs, setNestedComs] = useState([])
    const [sortedComs, setSortedComs] = useState({})
    const [errors, setErrors] = useState({})
    const [postText, setPostText] = useState('')
    const [commentText, setCommentText] = useState('') // this is when editing
    const [commentTextCreate, setCommentTextCreate] = useState('')
    const [currCommentEditId, setCurrCommentEditId] = useState(0)
    const [currCommentReplyId, setCurrCommentReplyId] = useState(0)//this is when replying
    const [mainReply, setMainReply] = useState(false)
    const [editCom, setEditCom] = useState(false)
    const [editingPost, setEditingPost] = useState(false)


    const posts = useSelector(state => state.posts)
    const post = Object.values(posts)[0]
    const user = Object.values(useSelector(state => state.session))[0]
    const comments = useSelector(state => state.comments)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleReplyToMainPost = () => {
        const postErrors = {}
        if (commentTextCreate.length < 8) {
            postErrors.commentErrors = 'Body needs to be atleast 8 characters long'
            setErrors(postErrors)
        } else {
            setErrors({})
            setMainReply(false)
            setCommentTextCreate('')
            dispatch(createComment({
                "user_id": user.id,
                "comment_text": commentTextCreate,
                "post_id": post.id,
                "comment_id": null
            }))
        }
    }

    const handleCommentReplies = () => {
        const postErrors = {}
        if (commentTextCreate.length < 8) {
            postErrors.commentErrors = 'Body needs to be atleast 8 characters long'
            setErrors(postErrors)
        } else {
            setErrors({})
            setMainReply(false)
            dispatch(createComment({
                "user_id": user.id,
                "comment_text": commentTextCreate,
                "post_id": post.id,
                "comment_id": currCommentReplyId
            })).then(() => {
                setCurrCommentReplyId(0)
                setCommentTextCreate('')
            })
        }
    }

    const handleEditComment = () => {
        dispatch(editComment({
            "id": currCommentEditId,
            "comment_text": commentText
        })).then(() => {
            setCurrCommentEditId(0)
            setCommentText('')
        })
    }

    const handleEditPost = () => {
        dispatch(editPost({
            "id": post.id,
            "post_text": postText
        })).then(() => {
            setEditingPost(false)
            setPostText('')
        })
    }

    const handleDeletePost = () => {
        const isSure = window.confirm('are you sure you want to delete this post?')
        if (isSure) {
            navigate('/posts')
            dispatch(deletePost(post.id))
        }
    }

    const handleDeleteComment = (id) => {
        const isSure = window.confirm('are you sure you want to delete this comment?')
        if (isSure) {
            dispatch(deleteComment(id)).then(() => {
                setCurrCommentEditId(0)
                setCommentText('')
            })
        }
    }

    useEffect(() => {
        dispatch(getOnePost(postId))
            .then(() => dispatch(getAllComments(postId)))
            .then(() => setIsLoaded(true))
    }, [editingPost])

    useEffect(() => {
        if (comments) {
            const commentMap = {}

            const commentData = Object.values(comments)
            commentData.forEach(com => {
                com.children = []
                commentMap[com.id] = com
            })
            const topLevelComments = []
            commentData.forEach(com => {
                if (!com.comment_id) {
                    topLevelComments.push(com)
                } else {
                    const parentCom = commentMap[com.comment_id]
                    if (parentCom) {
                        parentCom.children.push(com)
                    }
                }
            })
            setNestedComs(topLevelComments)
        }
    }, [isLoaded, comments])

    return (<>
        {isLoaded && <div>
            {/* {editingPost ? <div onClick={handleEditPost}>Edit</div> : <></>}
            {editingPost ? <div onClick={() => {
                setEditingPost(false)
                setPostText('')
            }}>Cancel</div> : <></>} */}
            <div id="main_post">
                <h2 onClick={()=>navigate(`/profile/${post.user_id}`)}>{post.username}</h2>
                {editingPost ? <textarea id="main_post_text" onChange={(e) => setPostText(e.target.value)} value={postText}></textarea> : <h1>{post.post_text}</h1>}
                {editingPost ? <div id="edit_and_cancel">
                    <div id="cancel_for_editing_post" onClick={() => {
                        setEditingPost(false)
                        setPostText('')
                    }}>Cancel</div>
                    <div id="edit_for_editing_post" onClick={handleEditPost}>Edit</div>
                </div> : <></>}
                <div id="main_likes_comments" onClick={(e) => e.preventDefault()}>
                    <div>
                        {post.users_liked && post.users_liked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={(e) => {
                            e.preventDefault()
                            dispatch(likePost({
                                id: post.id,
                                user_id_like: user.id
                            }))
                        }}></i> : <i className="fa-regular fa-thumbs-up" onClick={(e) => {
                            e.preventDefault()
                            dispatch(likePost({
                                id: post.id,
                                user_id_like: user.id
                            }))
                        }}></i>}
                        <p>{post.likes}</p>
                    </div>

                    <i className="fa-regular fa-comment comment_icon" onClick={() => {
                        setMainReply(true)
                    }}></i>
                    {user.id === post.user_id && !editingPost ? <div className="outer_edit" onClick={() => {
                        setEditingPost(true)
                        setPostText(post.post_text)
                    }}>Edit</div> : <></>}

                    {user.id === post.user_id ? <div className="outer_delete" onClick={handleDeletePost}>Delete</div> : <></>}
                </div>
            </div>
            <div>
                {nestedComs && nestedComs.map(ele => {
                    let usersLiked
                    if (ele.users_liked) {
                        usersLiked = ele.users_liked.split(',')
                        usersLiked.pop()
                    }
                    return <div className="first_row_of_comments" key={ele.id}>
                        <h4 onClick={()=>navigate(`/profile/${ele.user_id}`)} className="username">{ele.username}</h4>
                        {currCommentReplyId === ele.id && !currCommentEditId ? <h2 className="comment_text_selected">{ele.comment_text}</h2> : <h2 className="comment_text">{ele.comment_text}</h2>}
                        {currCommentEditId === ele.id ? <div className="comment_edit_cancel">
                            <textarea className="comment_text_area" onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                            <div className="cancel_for_comment_editing" onClick={() => {
                                setCurrCommentEditId(0)
                                setCommentText('')
                            }}>Cancel</div>
                            <div className="edit_for_comment_editing" onClick={handleEditComment}>Edit</div>
                        </div> : <></>}
                        <div className="comment_likes_comments">
                            <div onClick={(e) => e.preventDefault()}>
                                {usersLiked && usersLiked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(likeComment({
                                        id: ele.id,
                                        user_id_like: user.id
                                    }))
                                }}></i> : <i className="fa-regular fa-thumbs-up" onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(likeComment({
                                        id: ele.id,
                                        user_id_like: user.id
                                    }))
                                }}></i>}
                                <p>{ele.likes}</p>
                            </div>
                            <div className="reply" onClick={(e) => {
                                e.preventDefault()
                                setCurrCommentReplyId(ele.id)
                            }}>Reply</div>
                            {ele.user_id === user.id && !currCommentEditId ? <div className="outer_edit" onClick={() => {
                                setCurrCommentEditId(ele.id)
                                setCommentText(ele.comment_text)
                            }}>Edit</div> : <></>}
                            {(ele.user_id === user.id || user.id === post.user_id) && !currCommentEditId ? <div className="outer_delete" onClick={() => {
                                handleDeleteComment(ele.id)
                            }}>Delete</div> : <></>}
                        </div>



                        <div>
                            {ele.children && ele.children.map(ele2 => {
                                let usersLiked
                                if (ele2.users_liked) {
                                    usersLiked = ele2.users_liked.split(',')
                                    usersLiked.pop()
                                }
                                return <div className='second_row_of_comments' key={ele2.id}>
                                    <h4 onClick={()=>navigate(`/profile/${ele2.user_id}`)} className="username">{ele2.username}</h4>
                                    {currCommentReplyId === ele2.id && !currCommentEditId ? <h2 className="comment_text_selected">{ele2.comment_text}</h2> : <h2 className="comment_text">{ele2.comment_text}</h2>}
                                    {currCommentEditId === ele2.id ? <div className="comment_edit_cancel">
                                        <textarea className="comment_text_area" onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                                        <div className="cancel_for_comment_editing" onClick={() => {
                                            setCurrCommentEditId(0)
                                            setCommentText('')
                                        }}>Cancel</div>
                                        <div className="edit_for_comment_editing" onClick={handleEditComment}>Edit</div>
                                    </div> : <></>}
                                    <div className="comment_likes_comments">
                                        <div onClick={(e) => e.preventDefault()}>
                                            {usersLiked && usersLiked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={(e) => {
                                                e.preventDefault()
                                                dispatch(likeComment({
                                                    id: ele2.id,
                                                    user_id_like: user.id
                                                }))
                                            }}></i> : <i className="fa-regular fa-thumbs-up" onClick={(e) => {
                                                e.preventDefault()
                                                dispatch(likeComment({
                                                    id: ele2.id,
                                                    user_id_like: user.id
                                                }))
                                            }}></i>}
                                            <p>{ele2.likes}</p>
                                        </div>
                                        <div className="reply" onClick={() => {
                                            setCurrCommentReplyId(ele2.id)
                                        }}>Reply</div>
                                        {ele2.user_id === user.id && !currCommentEditId ? <div className="outer_edit" onClick={() => {
                                            setCurrCommentEditId(ele2.id)
                                            setCommentText(ele2.comment_text)
                                        }}>Edit</div> : <></>}
                                        {(ele2.user_id === user.id || user.id === post.user_id) && !currCommentEditId ? <div className="outer_delete" onClick={() => {
                                            handleDeleteComment(ele2.id)
                                        }}>Delete</div> : <></>}
                                    </div>

                                    <div>
                                        {ele2.children && ele2.children.map(ele3 => {
                                            let usersLiked
                                            if (ele3.users_liked) {
                                                usersLiked = ele3.users_liked.split(',')
                                                usersLiked.pop()
                                            }
                                            return <div className='third_row_of_comments' key={ele3.id}>
                                                <h4 onClick={()=>navigate(`/profile/${ele3.user_id}`)} className="username">{ele3.username}</h4>
                                                {currCommentReplyId === ele3.id && !currCommentEditId ? <h2 className="comment_text_selected">{ele3.comment_text}</h2> : <h2 className="comment_text">{ele3.comment_text}</h2>}
                                                {currCommentEditId === ele3.id ? <div className="comment_edit_cancel">
                                                    <textarea className="comment_text_area" onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                                                    <div className="cancel_for_comment_editing" onClick={() => {
                                                        setCurrCommentEditId(0)
                                                        setCommentText('')
                                                    }}>Cancel</div>
                                                    <div className="edit_for_comment_editing" onClick={handleEditComment}>Edit</div>
                                                </div> : <></>}
                                                <div className="comment_likes_comments">
                                                    <div onClick={(e) => e.preventDefault()}>
                                                        {usersLiked && usersLiked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={(e) => {
                                                            e.preventDefault()
                                                            dispatch(likeComment({
                                                                id: ele3.id,
                                                                user_id_like: user.id
                                                            }))
                                                        }}></i> : <i className="fa-regular fa-thumbs-up" onClick={(e) => {
                                                            e.preventDefault()
                                                            dispatch(likeComment({
                                                                id: ele3.id,
                                                                user_id_like: user.id
                                                            }))
                                                        }}></i>}
                                                        <p>{ele3.likes}</p>
                                                    </div>
                                                    <div className="reply" onClick={() => {
                                                        setCurrCommentReplyId(ele3.id)
                                                    }}>Reply</div>
                                                    {ele3.user_id === user.id && !currCommentEditId ? <div className="outer_edit" onClick={() => {
                                                        setCurrCommentEditId(ele3.id)
                                                        setCommentText(ele3.comment_text)
                                                    }}>Edit</div> : <></>}
                                                    {(ele3.user_id === user.id || user.id === post.user_id) && !currCommentEditId ? <div className="outer_delete" onClick={() => {
                                                        handleDeleteComment(ele3.id)
                                                    }}>Delete</div> : <></>}
                                                </div>
                                                <div>
                                                    {ele3.children && ele3.children.map(ele4 => {
                                                        let usersLiked
                                                        if (ele4.users_liked) {
                                                            usersLiked = ele4.users_liked.split(',')
                                                            usersLiked.pop()
                                                        }
                                                        return <div className="fourth_row_of_comments" key={ele4.id}>
                                                            <h4 onClick={()=>navigate(`/profile/${ele4.user_id}`)} className="username">{ele4.username}</h4>
                                                            {currCommentReplyId === ele4.id && !currCommentEditId ? <h2 className="comment_text_selected">{ele.comment_text}</h2> : <h2 className="comment_text">{ele4.comment_text}</h2>}
                                                            {currCommentEditId === ele4.id ? <div className="comment_edit_cancel">
                                                                <textarea className="comment_text_area" onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                                                                <div className="cancel_for_comment_editing" onClick={() => {
                                                                    setCurrCommentEditId(0)
                                                                    setCommentText('')
                                                                }}>Cancel</div>
                                                                <div className="edit_for_comment_editing" onClick={handleEditComment}>Edit</div>
                                                            </div> : <></>}
                                                            <div className="comment_likes_comments">
                                                                <div>
                                                                    {usersLiked && usersLiked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={(e) => {
                                                                        e.preventDefault()
                                                                        dispatch(likeComment({
                                                                            id: ele4.id,
                                                                            user_id_like: user.id
                                                                        }))
                                                                    }}></i> : <i className="fa-regular fa-thumbs-up" onClick={(e) => {
                                                                        e.preventDefault()
                                                                        dispatch(likeComment({
                                                                            id: ele4.id,
                                                                            user_id_like: user.id
                                                                        }))
                                                                    }}></i>}
                                                                    <p>{ele4.likes}</p>
                                                                </div>
                                                                <div className="reply" onClick={() => {
                                                                    setCurrCommentReplyId(ele4.id)
                                                                }}>Reply</div>
                                                                {ele4.user_id === user.id && !currCommentEditId ? <div className="outer_edit" onClick={() => {
                                                                    setCurrCommentEditId(ele4.id)
                                                                    setCommentText(ele4.comment_text)
                                                                }}>Edit</div> : <></>}
                                                                {(ele4.user_id === user.id || user.id === post.user_id) && !currCommentEditId ? <div className="outer_delete" onClick={() => {
                                                                    handleDeleteComment(ele4.id)
                                                                }}>Delete</div> : <></>}
                                                            </div>
                                                            <div>
                                                                {ele4.children && ele4.children.map(ele5 => {
                                                                    let usersLiked
                                                                    if (ele5.users_liked) {
                                                                        usersLiked = ele5.users_liked.split(',')
                                                                        usersLiked.pop()
                                                                    }
                                                                    return <div className="fifth_row_of_comments" key={ele5.id}>
                                                                        <h4 onClick={()=>navigate(`/profile/${ele5.user_id}`)} className="username">{ele5.username}</h4>
                                                                        {currCommentReplyId === ele5.id && !currCommentEditId ? <h2 className="comment_text_selected">{ele5.comment_text}</h2> : <h2 className="comment_text">{ele5.comment_text}</h2>}
                                                                        {currCommentEditId === ele5.id ? <div className="comment_edit_cancel">
                                                                            <textarea className="comment_text_area" onChange={(e) => setCommentText(e.target.value)} value={commentText}></textarea>
                                                                            <div className="cancel_for_comment_editing" onClick={() => {
                                                                                setCurrCommentEditId(0)
                                                                                setCommentText('')
                                                                            }}>Cancel</div>
                                                                            <div className="edit_for_comment_editing" onClick={handleEditComment}>Edit</div>
                                                                        </div> : <></>}
                                                                        <div className="comment_likes_comments">
                                                                            <div>
                                                                                {usersLiked && usersLiked.includes(String(user.id)) ? <i className="fa-solid fa-thumbs-up" onClick={(e) => {
                                                                                    e.preventDefault()
                                                                                    dispatch(likeComment({
                                                                                        id: ele5.id,
                                                                                        user_id_like: user.id
                                                                                    }))
                                                                                }}></i> : <i className="fa-regular fa-thumbs-up" onClick={(e) => {
                                                                                    e.preventDefault()
                                                                                    dispatch(likeComment({
                                                                                        id: ele5.id,
                                                                                        user_id_like: user.id
                                                                                    }))
                                                                                }}></i>}
                                                                                <p>{ele5.likes}</p>
                                                                            </div>
                                                                            {ele5.user_id === user.id && !currCommentEditId ? <div className="outer_edit" onClick={() => {
                                                                                setCurrCommentEditId(ele5.id)
                                                                                setCommentText(ele5.comment_text)
                                                                            }}>Edit</div> : <></>}
                                                                            {(ele5.user_id === user.id || user.id === post.user_id) && !currCommentEditId ? <div className="outer_delete" onClick={() => {
                                                                                handleDeleteComment(ele5.id)
                                                                            }}>Delete</div> : <></>}
                                                                        </div>
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
            <div id="comment_text_bottom">
                {errors ? <p>{errors.commentErrors}</p> : <></>}
                {currCommentReplyId ? <p id="reply_text">Replying to "{`${comments[currCommentReplyId].comment_text}`}"</p> : <></>}
                {/* {editCom? <textarea onChange={(e) => setCommentText(e.target.value)} value={commentText} placeholder="Comment Body"></textarea>: <></>} */}
                {mainReply ? <textarea className="reply_textarea" onChange={(e) => setCommentTextCreate(e.target.value)} value={commentTextCreate} placeholder="Comment Body"></textarea> : <></>}
                {currCommentReplyId ? <textarea className="reply_textarea" onChange={(e) => setCommentTextCreate(e.target.value)} value={commentTextCreate} placeholder="Comment Body"></textarea> : <></>}
                <div className="reply_post_and_cancel">
                {mainReply || editCom || currCommentReplyId ? <div className="reply_cancel" onClick={() => {
                    setCommentTextCreate('')
                    setCurrCommentEditId(0)
                    setCurrCommentReplyId(0)
                    setMainReply(false)
                    setEditCom(false)
                }}>Cancel</div> : <></>}
                {mainReply ? <div className="reply_post" onClick={handleReplyToMainPost}>Post</div> : <></>}
                {currCommentReplyId ? <div className="reply_post" onClick={handleCommentReplies}>Post</div> : <></>}
                </div>
                {/* {editCom? <div>Edit</div>:<></>} */}
            </div>
        </div>}
    </>)

}
export default PostDetails