import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../redux/movie";
import reviewReducer, { getReviewsByMovieId, createReview, updateReview, deleteReview } from "../../redux/reviews";
import './MovieDetails'


const MovieDetails = () => {
    const movieId = useParams()
    const [can, setCan] = useState(true)
    const [edit, setEdit] = useState(false)
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
    let reviews
    
    useEffect(() => {
        dispatch(getMovieById(movieId))
        .then(() => {
            dispatch(getReviewsByMovieId(movieId))
        })
        .then(() => {
            setIsLoaded(true)
            setCan(true)
        })
    }, [isLoaded, reviews])
    
    const user = Object.values(useSelector(state => state.session))[0]
    const movie = Object.values(useSelector(state => state.movies))[0]
    reviews = Object.values(useSelector(state => state.reviews))
    useEffect(() => {
        // console.log(spotId)
        // const currErrors = {}
        // console.log(reviews[0], '---------')
        
        if(user){
            setCan(true)
            for(let i = 0; i <reviews.length;i++){
                
                if(reviews[i].user_id === user.id){
                    setCan(false)
                    setUserReview(reviews[i])
                    // console.log(userReview.id)
                }
            }  
        }
        
        if (stars === 0) {
            setSelected('#000000')
            setSelected1('#000000')
            setSelected2('#000000')
            setSelected3('#000000')
            setSelected4('#000000')
        }
        if (stars === 1) {
            setSelected('#ff0000')
            setSelected1('#000000')
            setSelected2('#000000')
            setSelected3('#000000')
            setSelected4('#000000')
        }
        if (stars === 2) {
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#000000')
            setSelected3('#000000')
            setSelected4('#000000')
        }
        if (stars === 3) {
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#ff0000')
            setSelected3('#000000')
            setSelected4('#000000')
        }
        if (stars === 4) {
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#ff0000')
            setSelected3('#ff0000')
            setSelected4('#000000')
        }
        if (stars === 5) {
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#ff0000')
            setSelected3('#ff0000')
            setSelected4('#ff0000')
        }
        // if (reviewText.length < 10) {
        //     currErrors.reviewText = 'less than 10'
        // }
        // if ((1 > stars || stars > 5 || stars === undefined)) {
        //     currErrors.stars = 'its 0'
        // }
        // setErrors(currErrors)
    }, [stars, edit,reviews])

    const handleEditReview = (e)=>{
        e.preventDefault()
        setEdit(true)
        setReviewText(userReview.review)
        setStars(userReview.stars)
        // console.log('it does run')
    }
    
    const handleCancel =(e) =>{
        e.preventDefault()
        setStars(0)
        setEdit(false)
        setReviewText('')
    }

    const handleEditReviewSubmit = (e)=>{
        e.preventDefault()
        const revErrors = {}
        if (stars <= 0 || stars > 5 || reviewText.length < 10) {
            revErrors.reviewText = 'Review needs more than 10 characters and 1-5 star value'
            setErrors(revErrors)
        } else {
            setErrors({})
            dispatch(updateReview({
                "id":userReview.id,
                "user_id": user.id,
                "movie_id": movie.movie_id,
                "review": reviewText,
                "stars": stars
            })).then(() => {
                setEdit(false)
                setReviewText('')
                setStars(0)
            })
        }

    }

    const handleDelete = (e)=>{
        e.preventDefault()
        setCan(true)
        dispatch(deleteReview(userReview.id))
        setUserReview({})
        setReviewText('')
        setEdit(false)
        setStars(0)
        console.log('delete happened')
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        const revErrors = {}
        if (stars <= 0 || stars > 5 || reviewText.length < 10) {
            revErrors.reviewText = 'Review needs more than 10 characters and 1-5 star value'
            setErrors(revErrors)
        } else {
            setErrors({})
            dispatch(createReview({
                "id":userReview.id,
                "user_id": user.id,
                "movie_id": movie.movie_id,
                "review": reviewText,
                "stars": stars
            })).then(() => {
                setReviewText('')
                setStars(0)
            })
        }

    }
    // useEffect(() => 
    // }, [])ƒƒƒƒƒ
    // console.log(can, '//////////')
    // console.log(movie)
    return (<>
        {isLoaded && <div className="movie-container">
            <div>
                {movie && <h1>{movie.title}</h1>}
                {movie && <div className='img-container'><img src={imgUrl + movie.poster_path} /></div>}
            </div>
            {movie && <div>{movie.description}</div>}
            {user && <div>
                {errors && <p>{errors.reviewText}</p>}
                <div>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write a Review"></textarea>
                </div>
                <div className='star-container'>
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
                </div>

                {can ? <div onClick={handleReviewSubmit}>Post Review</div>:<div>Only one review per person!</div>}

                {edit ? <div onClick={handleEditReviewSubmit}>Edit review</div>:<></>}

                {edit ? <div onClick={handleCancel}>Cancel</div>:<></>}

                <div>Add To your Ranked List!</div>
            </div>}
            {!reviews.length && user ? <div>be first to add a review!!</div> : <></>}
            {reviews && reviews.map((review) => {
                if (user) {
                    if (user.id === review.user_id) {
                        return <div key={review.id}>
                            <h4>{user.username}</h4>
                            <p>{review.review}</p>
                            <div>{review.stars}</div>
                            <div>
                                {!edit ? <div onClick={handleEditReview}>edit</div>:<></>}
                                <div onClick={handleDelete}>delete</div>
                            </div>
                        </div>
                    }
                    return <div key={review.id}>
                        <h4>username here</h4>
                        <p>{review.review}</p>
                    </div>
                }
            })}
            <div>

            </div>
        </div>}
    </>)
}
export default MovieDetails