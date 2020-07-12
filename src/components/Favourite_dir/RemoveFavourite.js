import React from 'react'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import './Favourite.css'

// Remove product from favourite (db and Redux store)
const AddFavourite = props => {
    const dispatch = useDispatch()
    const add = () => {
        Axios.patch(`http://localhost:3000/grocery/${props.id}`,{favorite: 0})
            .then((res) =>{
                const setRemoveFavourite = () => (
                    { type: "REMOVEFAVOURITE", obj: res.data }
                );
                dispatch(setRemoveFavourite()) 
            })
    }
    return(
        <div className="btn_style" onClick={()=>{add()}}>
            <span className="noselect">Remove</span>
        <div className="circle"></div></div>
    )
}

export default AddFavourite;