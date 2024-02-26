import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRankedListByUserId, editRankedList, deleteRankedList } from "../../redux/rankedList";
import { getUserProfile } from "../../redux/profile";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";
import './ProfilePage.css'

const ProfilePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [editName, setEditName] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [currMovieArr, setCurrMovieArr] = useState([])
    const [currListName, setCurrListName] = useState('')
    const [errors, setErrors] = useState({})
    const userId = Number(useParams().profileId)
    const [isLoaded, setIsLoaded] = useState(false)




    const user = useSelector(state => state.session).user
    const ranked_list_id = Object.keys(useSelector(state => state.ranked_lists))[0]
    const rankedListObj = useSelector(state => state.ranked_lists[`${ranked_list_id}`])
    let rankedList
    if (rankedListObj) {
        if (rankedListObj.length) {
            rankedList = rankedListObj ? [...Object.values(rankedListObj)] : null
        }
    }
    // console.log(rankedList)
    const listName = rankedList ? rankedList.pop() : null
    const movieArr = rankedList ? rankedList : []
    const userProfile = useSelector(state => state.profile)[0]
    const imgUrl = 'https://image.tmdb.org/t/p/original/'

    useEffect(() => {
        if (userId) {
            dispatch(getRankedListByUserId(userId))
                .then(() => dispatch(getUserProfile(userId)))
                .then(() => setIsLoaded(true))
        }

    }, [edit, currMovieArr, editName, currListName, deleted])

    // console.log(rankedList, '++++++')
    // console.log(currMovieArr, 'curr movie arr')
    // console.log(movieArr, 'movie arr')
    // console.log(edit)

    const handleSetName = () => {
        setEditName(false)
        const currErrors = {}
        if(!currListName.length){
            currErrors.listName = 'List Name can not be empty'
            setErrors(currErrors)
        }else{
            setErrors({})
            dispatch(editRankedList({
            "ranked_list_id": ranked_list_id,
            "name": currListName,
            "movies": currMovieArr
            }))
            .then(() => setEditName(false))
            .then(() => setCurrListName(currListName))
        }
        
    }


    const handleDelete = () => {
        dispatch(deleteRankedList(ranked_list_id)).then(() => {
            setDeleted(true)
            setCurrListName('')
            setCurrMovieArr([])
            setEditName(false)
            setEdit(false)
        
        })
    }

    const handleRemove = (movie) => {
        // e.preventDefault()
        setEditName(false)

        const isSure = window.confirm('are you sure you want to remove?')
        if (isSure) {
            const temp_arr = currMovieArr
        for (let i = 0; i < temp_arr.length; i++) {
            if (temp_arr[i] === movie.movie_id) {
                temp_arr.splice(i, 1)
            }
        }
            setEdit(false)
            dispatch(editRankedList({
                "ranked_list_id": ranked_list_id,
                "name": currListName,
                "movies": temp_arr
            })).then(() => {
                setEdit(false)
                setCurrMovieArr(temp_arr)
            })
        }
    }
    // console.log(currListName)
    useEffect(() => {
        if (listName && !(listName === currListName)) setCurrListName(listName)
        if (movieArr.length) {
            setCurrListName(listName)
            if (!(currMovieArr.length === movieArr.length)) {
                // if(!currMovieArr.length && !movieArr.length)
                const arr = []
                movieArr.forEach(mov => {
                    arr.push(mov.movie_id)
                })
                setCurrMovieArr(arr)
            }

        }else{
            setCurrMovieArr([])
        }
    }, [isLoaded, edit, editName, deleted])
    if(user){
        if (isLoaded && user.id === userId) {
            return (<>
                {isLoaded && <div >
                    <h1 id="username_pro">{user.username}</h1>
                    {/* <h2>Bio</h2>
                    {user.bio ? <div>{user.bio}</div> : <div>Edit your Bio</div>} */}

                    {/* <div>
                    {listName ? <div onClick={handleDelete}>Delete Entire List</div> : <></>}
                    {(!movieArr.length && !edit) ? <></> : <div onClick={() => setEdit(true)}>Edit List</div>  /*Fix this tomorrow baby }
                    </div> */}
                        {errors && <p id="errors_pro">{errors.listName}</p>}
                        {listName && !editName ? <div id="list_name"><h1>{listName}</h1></div> : <></>}
                        {editName ? <div id="list_name"><input type="text" value={currListName} onChange={(e) => setCurrListName(e.target.value)} /></div> : <></>}
                        {editName ? <div id="set_name"onClick={() => handleSetName()}>Set Name</div> : <></>}
                        {movieArr.length ? <></> : <h3 id="no_movies">No Movies in your list</h3>}
                    <div id="movies_list">
                    {movieArr.length ? movieArr.map(movie => {
                        return <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            <div className="profile_pre_img" onClick={(e)=>{
                                e.preventDefault()
                                navigate(`/movies/${movie.movie_id}`)
                            }}><img src={imgUrl + movie.poster_path}/></div>
                            {edit && !editName ? <div className="delete_buttons_pro" onClick={() => handleRemove(movie)}>remove</div> : <></>}
                        </div>
                    }) : <></>}
                    </div>
                    <div id="movie_edit_del_buttons">
                    {currListName && !editName ? <div className="edit_buttons_pro" onClick={() => setEditName(true)}>Edit list Name</div> : <></>}
                    {(!movieArr.length && !edit) ? <></> : <div className="edit_buttons_pro" onClick={() => setEdit(true)}>Edit List</div>  /*Fix this tomorrow baby */}
                    {listName ? <div className='delete_buttons_pro' onClick={handleDelete}>Delete List</div> : <></>}
                    </div>
                </div>}
            </>)
        } 
    }
    return (<>
        {isLoaded && <div>
            <h1 id="username_pro">{userProfile.username}</h1>
            { listName ? <div id="list_name"><h1>{listName}</h1></div>:<></>}
            {movieArr.length ? <></> : <div id="no_movies">No Movies in {userProfile.username}'s list</div>}
            <div id="movies_list">
            {movieArr.length ? movieArr.map(movie => {
                    return <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <div className="profile_pre_img" onClick={(e)=>{
                            e.preventDefault()
                            navigate(`/movies/${movie.movie_id}`)
                            }}><img src={imgUrl + movie.poster_path}/></div>
                    </div>
                }) : <></>}
            </div>
        </div>}
    </>)
}
export default ProfilePage