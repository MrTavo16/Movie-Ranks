import { csrfFetch } from "./csrf"

const LOAD_REVIEWS_BY_MOVIE_ID = 'reviews/LOAD_REVIEWS_BY_MOVIE_ID'
const RECIEVE_REVIEW = 'reviews/RECIEVE_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

export const loadReviewsByMovieId = (reviews) => ({
    type: LOAD_REVIEWS_BY_MOVIE_ID,
    reviews
})

export const recieveReview = (review) => ({
    type: RECIEVE_REVIEW,
    review
})

export const removeReview = (review) => ({
    type: REMOVE_REVIEW,
    review
})

export const getReviewsByMovieId = (movieId) => async (dispatch) => {
    // console.log(Number(movieId.movieId), '-=-=-=-=-=-')
    const res = await fetch(`/api/movies/${Number(movieId.movieId)}/reviews`)

    if (res.ok) {
        const data = await res.json()
        // console.log(data,'--------------')
        dispatch(loadReviewsByMovieId(data))
        return data
    }
    return res
}

export const createReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/movies/${review.movie_id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    console.log(res, 'res')
    if (res.ok) {
        const data = await res.json()
        dispatch(recieveReview(data))
        return data
    }
    return res
}

export const updateReview = (review) => async (dispatch) => {
    // console.log(review, '---------')
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(recieveReview(data))
    }
    return res
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {

        const data = await res.json()
        // console.log(data, '===========')
        dispatch(removeReview(data))
        return data
    }
    return res
}

const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS_BY_MOVIE_ID:
            const newState = {}
            action.reviews.reviews.forEach((review) => {
                newState[review.id] = review
            })
            return newState
        case RECIEVE_REVIEW:
            return { ...state, [action.review.id]: action.review }
        case REMOVE_REVIEW:
            const newState1 = { ...state }
            delete newState1[action.review.id]
            return newState1
        default: return state
    }
}
export default reviewReducer