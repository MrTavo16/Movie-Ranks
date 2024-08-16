import { csrfFetch } from "./csrf"

const LOAD_POSTS = 'posts/LOAD_POSTS'
const RECIEVE_POST = 'posts/RECIEVE_POST'
const RECIEVE_ONE_POST = 'posts/RECIEVE_ONE_POST'
const REMOVE_POST = 'posts/REMOVE_POST'

export const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

export const recievePost = (post) => ({
    type: RECIEVE_POST,
    post
})

export const recieveOnePost = (post) =>({
    type: RECIEVE_ONE_POST,
    post
})

export const removePost = (post)=>({
    type:REMOVE_POST,
    post
})

export const getAllPosts = () => async (dispatch) => {
    const res = await fetch(`api/posts/`)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadPosts(data))
        return data
    }
    return res
}

export const getOnePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(recieveOnePost(data))
        return data
    }
    return res
}

export const likePost = (post) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${post.id}/likes`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(recievePost(data))
        return data
    }
    return res
}
export const createPost = (post) => async (dispatch) => {
    const res = await csrfFetch(`api/posts/`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(recievePost(data))
        return data
    }
    return res
}

export const editPost = (post) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${post.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(recievePost(data))
        return data
    }
    return res
}

export const deletePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {

        const data = await res.json()
        dispatch(removePost(data))
        return data
    }
    return res
}

const postReducer = (state = {}, action) => {
    let newState = null
    switch (action.type) {
        case LOAD_POSTS:
            newState = {}
            action.posts.posts.forEach(post=>{
                newState[post.id] = post
            })
            return newState
        case RECIEVE_POST:
            return {...state, [action.post.id]:action.post}

        case RECIEVE_ONE_POST:
            return {[action.post.id]:action.post}
        case REMOVE_POST:
            const newState1= {...state }
            delete newState1[action.post.id]
            return newState1
        
        default: return state
    }
}
export default postReducer