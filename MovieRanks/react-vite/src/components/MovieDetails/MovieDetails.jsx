import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../redux/movie";


const MovieDetails = ()=>{
    const movieId = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [stars, setStars] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [errors, setErrors] = useState({})
    const [selected, setSelected] = useState('')
    const [selected1, setSelected1] = useState('')
    const [selected2, setSelected2] = useState('')
    const [selected3, setSelected3] = useState('')
    const [selected4, setSelected4] = useState('')
    useEffect(()=>{
        // console.log(spotId)
        const currErrors = {}
        if(stars === 1){
            setSelected('#ff0000')
            setSelected1('#000000')
            setSelected2('#000000')
            setSelected3('#000000')
            setSelected4('#000000')
        }
        if(stars === 2){
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#000000')
            setSelected3('#000000')
            setSelected4('#000000')
        }
        if(stars === 3){
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#ff0000')
            setSelected3('#000000')
            setSelected4('#000000')
        }
        if(stars === 4){
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#ff0000')
            setSelected3('#ff0000')
            setSelected4('#000000')
        }
        if(stars === 5){
            setSelected('#ff0000')
            setSelected1('#ff0000')
            setSelected2('#ff0000')
            setSelected3('#ff0000')
            setSelected4('#ff0000')
        }
        if(reviewText.length < 10){
            currErrors.reviewText = 'less than 10'
        }
        if((1 > stars|| stars > 5||stars === undefined)){
            currErrors.stars = 'its 0'
        }
        setErrors(currErrors)
    },[stars, reviewText])
        
    useEffect(()=>{
        dispatch(getMovieById(movieId)).then(()=>{
            setIsLoaded(true)
        })
    },[isLoaded])
    const movie = Object.values(useSelector(state => state.movies))[0]
        // console.log(movie, '//////////')
        
    return(<>
    {isLoaded && <div>
        <div>
            <h1>{movie.title}</h1>
            <div>img goes here</div>
        </div>
            <div>{movie.overview}</div>
        <div>
            <div>
                <textarea placeholder="Write a Review"></textarea>
            </div>
            <div className='star-container'>
                Stars
                    <div id='star-five' onClick={()=> setStars(5)}>
                        <span style={{color:selected4}} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-four'  onClick={()=> setStars(4)}>
                        <span style={{color:selected3}} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-three'  onClick={()=> setStars(3)}>
                        <span style={{color:selected2}} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-two'  onClick={()=> setStars(2)}>
                        <span style={{color:selected1}} className="fa-solid fa-star"></span>
                    </div>
                    <div id='star-one' onClick={()=> setStars(1)}>
                        <span className="fa-solid fa-star" style={{color:selected}}></span>
                    </div>
                </div>
            <div>Add To your Ranked List!</div>
        </div>
        </div>}
    </>)
}
export default MovieDetails