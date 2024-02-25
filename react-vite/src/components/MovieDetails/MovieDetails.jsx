import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../redux/movie";
import reviewReducer, { getReviewsByMovieId, createReview, updateReview, deleteReview } from "../../redux/reviews";
import { getRankedListByUserId, createRankedList } from "../../redux/rankedList";
import './MovieDetails'


const MovieDetails = () => {
    const movieId = useParams()
    const [can, setCan] = useState(true)
    const [listFull, setListFull] = useState(false)
    const [edit, setEdit] = useState(false)
    const [rankedListAdd, setRankedListAdd] = useState(true)
    const [userReview, setUserReview] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    let [stars, setStars] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [errors, setErrors] = useState({})
    const [selected, setSelected] = useState('')
    const [selected1, setSelected1] = useState('')
    const [selected2, setSelected2] = useState('')
    const [selected3, setSelected3] = useState('')
    const [selected4, setSelected4] = useState('')
    const imgUrl = 'https://image.tmdb.org/t/p/original/'

    const user = Object.values(useSelector(state => state.session))[0]
    const movie = Object.values(useSelector(state => state.movies))[0]
    const ranked_list_id = Object.keys(useSelector(state => state.ranked_lists))[0]
    const rankedListObj = useSelector(state => state.ranked_lists[`${ranked_list_id}`])
    // console.log(rankedListObj, '-=-=-=-=-')
    const rankedList = rankedListObj ? [...Object.values(rankedListObj)] : null
    const listName = rankedList ? rankedList.pop() : null
    const movieArr = rankedList ? rankedList : []
    let reviews
    useEffect(() => {
        if (movieId) {
            if (user) {
                if (user.id) {
                    dispatch(getRankedListByUserId(user.id))
                    dispatch(getMovieById(movieId))
                        .then(() => {
                            if(movie){
                                if(movie.id){
                                    dispatch(getReviewsByMovieId(movie.id))
                                }
                            }
                        })
                        .then(() => {
                            setIsLoaded(true)
                            setCan(true)
                        })
                }
            }else{
                dispatch(getMovieById(movieId))
                .then(() => {
                    if(movie){
                        if(movie.id){
                            dispatch(getReviewsByMovieId(movie.id))
                        }
                    }
                })
                .then(() => {
                    setIsLoaded(true)
                    setCan(true)
                })  
            }

            
        }

    }, [isLoaded, reviews, movieId,user, rankedListAdd])
    reviews = Object.values(useSelector(state => state.reviews))
    useEffect(() => {
        // console.log(spotId)
        // const currErrors = {}
        // console.log(movie)
        if (movieArr.length) {
            if (movieArr.length >= 5) {
                setListFull(true)
            }
            movieArr.forEach(mov => {
                // console.log(mov.movie_id, '----------')
                // console.log(Number(movieId.movieId), '====-=-=-=-=-=-=')
                if (movieArr.length > 5) setRankedListAdd(false)
                if (mov.movie_id === Number(movieId.movieId)) setRankedListAdd(false)
            })
        }

        if (user) {
            setCan(true)
            for (let i = 0; i < reviews.length; i++) {

                if (reviews[i].user_id === user.id) {
                    setCan(false)
                    setUserReview(reviews[i])
                    // console.log(userReview.id)
                }
            }
        }

    }, [stars, edit, reviews, rankedListObj])

    const handleAddMovieToList = (e) => {
        e.preventDefault()
        setRankedListAdd(false)
        dispatch(createRankedList({
            "user_id": user.id,
            "movie_id": Number(movieId.movieId)
        })).then(() => setRankedListAdd(false))
    }

    const handleEditReview = (e) => {
        e.preventDefault()
        setEdit(true)
        setReviewText(userReview.review)
        setStars(userReview.stars)
        // console.log('it does run')
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setStars(0)
        setEdit(false)
        setReviewText('')
    }

    const handleEditReviewSubmit = (e) => {
        e.preventDefault()
        const revErrors = {}
        if (reviewText.length < 10) {
            revErrors.reviewText = 'Review needs more than 10 characters'
            setErrors(revErrors)
        } else {
            setErrors({})
            setEdit(false)
            dispatch(updateReview({
                "id": userReview.id,
                "user_id": user.id,
                "movie_id": movie.id,
                "review": reviewText,
                "stars": stars
            })).then(() => {
                setEdit(false)
                setReviewText('')
                setStars(0)
            })
        }

    }

    const handleDelete = (e) => {
        e.preventDefault()
        setCan(true)
        dispatch(deleteReview(userReview.id))
        setUserReview({})
        setReviewText('')
        setEdit(false)
        setStars(0)
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        const revErrors = {}
        if (reviewText.length < 10) {
            revErrors.reviewText = 'Review needs more than 10 characters'
            setErrors(revErrors)
        } else {
            setErrors({})
            setReviewText('')
            dispatch(createReview({
                // "id":userReview.id,
                "user_id": user.id,
                "movie_id": movie.id,
                "review": reviewText,
                "stars": 1
            })).then(() => {
                setReviewText('')
                setStars(0)
            })
        }
    }
    // console.log()
    return (<>
        {isLoaded && <div >
            <div>
                {movie && <h1>{movie.title}</h1>}
                {movie && <div><img src={imgUrl + movie.poster_path} /></div>}
            </div>
            {movie && <div>{movie.description}</div>}
            {user && <div>
                {errors && <p>{errors.reviewText}</p>}
                <div>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write a Review"></textarea>
                </div>
                {/* <div className='star-container'>
                    Stars
                    <div id='star-five' onClick={() => setStars(5)}>
                        <span style={{ color: selected4 }} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-four' onClick={() => setStars(4)}>
                        <span style={{ color: selected3 }} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-three' onClick={() => setStars(3)}>
                        <span style={{ color: selected2 }} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-two' onClick={() => setStars(2)}>
                        <span style={{ color: selected1 }} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-one' onClick={() => setStars(1)}>
                        <span className="fa-solid fa-star" style={{ color: selected }}></span>
                    </div>
                </div> */}

                {can ? <div onClick={handleReviewSubmit}>Post Review</div> : <div>Only one review per person!</div>}

                {edit ? <div onClick={handleEditReviewSubmit}>Edit review</div> : <></>}

                {edit ? <div onClick={handleCancel}>Cancel</div> : <></>}

                {rankedListAdd ? <div onClick={handleAddMovieToList}>Add To your Ranked List!</div> : <div></div>}
            </div>}
            {!reviews.length && user ? <div>be first to add a review!!</div> : <></>}
            {reviews.length ? reviews.map((review) => {
                if (user) {
                    if (user.id === review.user_id) {
                        return <div key={review.id}>
                            <h4>{user.username}</h4>
                            <p>{review.review}</p>
                            {/* <div>{review.stars}</div> */}
                            <div>
                                {!edit ? <div onClick={handleEditReview}>edit</div> : <></>}
                                <div onClick={handleDelete}>delete</div>
                            </div>
                        </div>
                    }
                }
                return <div key={review.id}>
                    <h4 onClick={(e) => {
                        e.preventDefault()
                        navigate(`/profile/${review.user_id}`)
                    }}>{review.username}</h4>
                    <p>{review.review}</p>
                </div>
            }) : <></>}
            <div>

            </div>
        </div>}
    </>)
}
export default MovieDetails