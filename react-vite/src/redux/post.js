import { csrfFetch } from "./csrf"

const LOAD_POSTS = 'posts/LOAD_POSTS'
const RECIEVE_POST = 'posts/RECIEVE_POST'
const REMOVE_POST = 'posts/REMOVE_POST'

export const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
})

export const recievePost = (post) => ({
    type: RECIEVE_POST,
    post
})

export const removePost = (post)=>({
    type:REMOVE_POST,
    post
})

export const getAllPosts = () => async (dispatch) => {
    const res = await fetch('api/posts/')
    if (res.ok) {
        const data = await res.json()
        dispatch(loadPosts(data))
        return data
    }
    return res
}

export const likePost = (post) => async (dispatch) => {
    const res = await fetch(`api/posts/${post.id}/likes`,{
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
    const res = await fetch(`api/posts/`,{
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

const postReducer = (state = {}, action) => {
    let newState = null
    switch (action.type) {
        case LOAD_POSTS:
            newState = {}
            // let count = 0
            // console.log(action.posts.posts, '===-=-=-=-=-')
            action.posts.posts.forEach(post=>{
                newState[post.id] = post
                // count++
            })
            return newState
        case RECIEVE_POST:
            return {...state, [action.post.id]:action.post}
        default: return state
    }
}
export default postReducer