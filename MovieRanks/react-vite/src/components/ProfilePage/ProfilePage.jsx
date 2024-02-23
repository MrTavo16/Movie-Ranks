import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRankedListByUserId } from "../../redux/rankedList";
import { getUserProfile } from "../../redux/profile";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const userId = Number(useParams().profileId)
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session).user
    const rankedList = Object.values(useSelector(state => state.ranked_lists))
    const listName = rankedList[1]
    const movieArr = [rankedList[0]]
    const userProfile = useSelector(state => state.profile)[0]
    const imgUrl = 'https://image.tmdb.org/t/p/original/'
    console.log(rankedList, '++++++')
    useEffect(() => {
        dispatch(getRankedListByUserId(userId))
            .then(() => dispatch(getUserProfile(userId)))
            .then(() => setIsLoaded(true))
    }, [])
    // console.log(user)
    if (isLoaded && user.id === userId) {
        return (<>
            {isLoaded && <div>
                <h1>{user.username}</h1>
                <h2>Bio</h2>
                {user.bio ? <div>{user.bio}</div> : <div>Edit your Bio</div>}
                {movieArr.length ? <div>list name</div> : <div>No Movies in the list</div>}
                {movieArr.length ? <div>Delete Entire List</div> : <></>}
                {movieArr.length === 1 ? <div>{user.username}'s favorite</div> : <></>}
                {movieArr.length > 1 ? <div>{user.username}'s Top {movieArr.length}</div> : <></>}
                {movieArr && movieArr.map(movie => {
                    return <div key={movie.id}>
                        <h5>{movie.title}</h5>
                        <div>image</div>
                        <div>remove</div>
                    </div>
                })}
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