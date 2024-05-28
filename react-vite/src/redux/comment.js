import { csrfFetch } from "./csrf"

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'
const RECIEVE_COMMENTS = 'comments/RECIEVE_COMMENTS'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

export const loadComments = (comments)=>({
    type:LOAD_COMMENTS,
    comments
})

export const recieveComments = (comments) =>({
    type:RECIEVE_COMMENTS,
    comments
})

export const removeComment = (comment)=>({
    type:REMOVE_COMMENT,
    comment
})

export const getAllComments = (postId) =>async (dispatch)=>{
    const res = await fetch(`/api/comments/${postId}`)
    // console.log(res)
    if (res.ok) {
        const data = await res.json()
        dispatch(loadComments(data))
        return data
    }
    return res
}

export const likeComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}/likes`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(recieveComments(data))
        return data
    }
    return res
}

export const createComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(recieveComments(data))
        return data
    }
    return res
}

export const editComment = (comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(recieveComments(data))
        return data
    }
    return res
}

export const deleteComment = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {

        const data = await res.json()
        dispatch(removeComment(data))
        return data
    }
    return res
}

const commentReducer = (state = {}, action)=>{
    let newState = null
    switch(action.type){
        case LOAD_COMMENTS:
            newState = {}
            let count = 0
            
            Object.values(action.comments.comments).forEach(ele=>{
                newState[ele.id] = ele
                count++
            })
            return newState
        case RECIEVE_COMMENTS:
            // console.log(action, 'action')
            return {...state,[action.comments.id]:action.comments }

        case REMOVE_COMMENT:
            const newState1 = {...state}
            delete newState1[action.comment.id]
            return newState1
    default:return state
    }
}
export default commentReducer