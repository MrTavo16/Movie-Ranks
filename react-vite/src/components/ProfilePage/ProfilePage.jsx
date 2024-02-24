import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRankedListByUserId, editRankedList } from "../../redux/rankedList";
import { getUserProfile } from "../../redux/profile";

const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [currMovieArr, setCurrMovieArr] = useState([])
    const [currListName, setCurrListName] = useState('')
    const userId = Number(useParams().profileId)
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        dispatch(getRankedListByUserId(userId))
            .then(() => dispatch(getUserProfile(userId)))
            .then(() => setIsLoaded(true))
    }, [edit, currMovieArr])


    const user = useSelector(state => state.session).user
    const ranked_list_id = Object.keys(useSelector(state => state.ranked_lists))[0]
    const rankedListObj = useSelector(state => state.ranked_lists)[`${ranked_list_id}`]
    const rankedList = rankedListObj ? [...rankedListObj] : null
    const listName = rankedList ? rankedList.pop() : null
    const movieArr = rankedList ? rankedList : []
    const userProfile = useSelector(state => state.profile)[0]
    const imgUrl = 'https://image.tmdb.org/t/p/original/'

    // console.log(rankedList, '++++++')
    // console.log(currMovieArr, '++++++')
    console.log(edit)

    const handleRemove = (movie) => {
        // e.preventDefault()
        const temp_arr = currMovieArr
        for (let i = 0; i < temp_arr.length; i++) {
            if (temp_arr[i] === movie.movie_id) {
                temp_arr.splice(i, 1)
            }
        }
        setCurrMovieArr(temp_arr)
        const isSure = window.confirm('are you sure you want to remove?')
        if (isSure){
            dispatch(editRankedList({
                "ranked_list_id":ranked_list_id,
                "name":currListName,
                "movies":currMovieArr
            })).then(()=>setEdit(false))
        } 
    }

    useEffect(() => {
        if (movieArr.length) {
            setCurrListName(listName)
            if (!(currMovieArr.length === movieArr.length)) {
                const arr = []
                movieArr.forEach(mov => {
                    arr.push(mov.movie_id)
                })
                setCurrMovieArr(arr)
            }

        }
    }, [isLoaded, edit])
    if (isLoaded && user.id === userId) {
        return (<>
            {isLoaded && <div>
                <h1>{user.username}</h1>
                <h2>Bio</h2>
                {user.bio ? <div>{user.bio}</div> : <div>Edit your Bio</div>}
                <div>
                    {movieArr.length ? <div>{listName}</div> : <div>No Movies in your list</div>}
                    {movieArr.length ? <div>Delete Entire List</div> : <></>}
                </div>
                {(!movieArr.length && !edit)? <></> : <div onClick={() => setEdit(true)}>Edit List</div>  /*Fix this tomorrow baby */}
                {movieArr.length ? movieArr.map(movie => {
                    return <div key={movie.id}>
                        <h5>{movie.title}</h5>
                        {/* <div onClick={(e)=>{
                            e.preventDefault()
                            navigate(`/movies/${movie.movie_id}`)
                            }}><img src={imgUrl + movie.poster_path}/></div> */}
                        {edit ? <div onClick={() => handleRemove(movie)}>remove</div> : <></>}
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