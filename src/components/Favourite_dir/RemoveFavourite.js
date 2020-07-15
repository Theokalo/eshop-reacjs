import React from 'react'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import './Favourite.css'
import { removeFavourite } from '../../store/actions/eshopActions'

// Remove product from favourite (db and Redux store)
const RemoveFavourite = props => {
    const dispatch = useDispatch()
    const remove = () => {
        Axios.patch(`http://localhost:3000/grocery/${props.id}`,{favorite: 0})
            .then((res) =>{
                dispatch(removeFavourite(res.data)) 
            })
    }
    return(
        <div className="btn_style" onClick={()=>{remove()}}>
            <span className="noselect">Remove</span>
        <div className="circle"></div></div>
    )
}

export default RemoveFavourite;