import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRankedListByUserId } from "../../redux/rankedList";
import { getUserProfile } from "../../redux/profile";

const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [currMovieArr, setCurrMovieArr] = useState([])
    const userId = Number(useParams().profileId)
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        dispatch(getRankedListByUserId(userId))
            .then(() => dispatch(getUserProfile(userId)))
            .then(() => setIsLoaded(true))
    }, [])
    const user = useSelector(state => state.session).user
    const ranked_list_id = Object.keys(useSelector(state => state.ranked_lists))[0]
    const rankedListObj = useSelector(state => state.ranked_lists)[`${ranked_list_id}`]
    const rankedList = rankedListObj ? [...rankedListObj]: null
    const listName = rankedList ? rankedList.pop() :null
    const movieArr = rankedList ? rankedList : []
    const userProfile = useSelector(state => state.profile)[0]
    const imgUrl = 'https://image.tmdb.org/t/p/original/'
    
    // console.log(rankedList, '++++++')
    // console.log(rankedList, '++++++')
    // console.log(user)


    useEffect(()=>{
        if(movieArr.length){
            if(!(currMovieArr.length ===movieArr.length)){
                const arr = []
                movieArr.forEach(mov=>{
                    arr.push(mov.movie_id)
                })
                setCurrMovieArr(arr)
            }
            
        }
    },[isLoaded, edit])
    if (isLoaded && user.id === userId) {
        return (<>
            {isLoaded && <div>
                <h1>{user.username}</h1>
                <h2>Bio</h2>
                {user.bio ? <div>{user.bio}</div> : <div>Edit your Bio</div>}
                {movieArr.length ? <div>{listName}</div> : <div>No Movies in the list</div>}
                {movieArr.length ? <div>Delete Entire List</div> : <></>}
                {movieArr.length === 0 ? <></> : <></>}
                {movieArr.length ? movieArr.map(movie => {
                    return <div key={movie.id}>
                        <h5>{movie.title}</h5>
                        {/* <div onClick={(e)=>{
                            e.preventDefault()
                            navigate(`/movies/${movie.movie_id}`)
                            }}><img src={imgUrl + movie.poster_path}/></div> */}
                        <div>remove</div>
                    </div>
                }) : <></>}
            </div>}
        </>)
    }
    return (<>
        {isLoaded && <div>
            <h1>{userProfile.username}</h1>
            {movieArr.length ? <div>list name</div> : <div>No Movies in the list</div>}
        </div>}
    </>)
}
export default ProfilePage