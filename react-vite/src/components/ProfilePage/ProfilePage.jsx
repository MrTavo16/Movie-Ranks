import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRankedListByUserId, editRankedList, deleteRankedList } from "../../redux/rankedList";
import { getUserProfile } from "../../redux/profile";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";

const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [editName, setEditName] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [currMovieArr, setCurrMovieArr] = useState([])
    const [currListName, setCurrListName] = useState('')
    const userId = Number(useParams().profileId)
    const [isLoaded, setIsLoaded] = useState(false)


    
    
    const user = useSelector(state => state.session).user
    const ranked_list_id = Object.keys(useSelector(state => state.ranked_lists))[0]
    const rankedListObj = useSelector(state => state.ranked_lists[`${ranked_list_id}`])
    let rankedList
    if(rankedListObj){
        if(rankedListObj.length){
            rankedList = rankedListObj ? [...Object.values(rankedListObj)] : null
        }
    }
    console.log(rankedList)
    const listName = rankedList ? rankedList.pop() : null
    const movieArr = rankedList ? rankedList : []
    const userProfile = useSelector(state => state.profile)[0]
    const imgUrl = 'https://image.tmdb.org/t/p/original/'

    useEffect(() => {
        if(userId){
           dispatch(getRankedListByUserId(userId))
            .then(() => dispatch(getUserProfile(userId)))
            .then(() => setIsLoaded(true)) 
        }
        
    }, [edit, currMovieArr, editName, currListName, deleted])

    // console.log(rankedList, '++++++')
    // console.log(currMovieArr, '++++++')
    // console.log(edit)

    const handleSetName = ()=>{
        dispatch(editRankedList({
            "ranked_list_id":ranked_list_id,
            "name":currListName,
            "movies":currMovieArr
        })).then(()=>setEditName(false))
    }


    const handleDelete = ()=>{
        dispatch(deleteRankedList(ranked_list_id)).then(()=>setDeleted(true))
    }

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
    // console.log(currListName)
    useEffect(() => {
        if(listName && !(listName === currListName))setCurrListName(listName)
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
    }, [isLoaded, edit, editName, deleted])
    if (isLoaded && user.id === userId) {
        return (<>
            {isLoaded && <div>
                <h1>{user.username}</h1>
                <h2>Bio</h2>
                {user.bio ? <div>{user.bio}</div> : <div>Edit your Bio</div>}
                <div>
                    {listName&&!editName ? <div>{listName}</div> : <></>}
                    {editName ? <input type="text" value={currListName} onChange={(e)=>setCurrListName(e.target.value)}/>:<></>}
                    {movieArr.length? <></>: <div>No Movies in your list</div>}
                    {listName &&!editName ? <div onClick={()=>setEditName(true)}>Edit list Name</div>:<></>}
                    {editName ? <div onClick={()=>handleSetName()}>Set Name</div>:<></>}
                    {listName ? <div onClick={handleDelete}>Delete Entire List</div> : <></>}
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