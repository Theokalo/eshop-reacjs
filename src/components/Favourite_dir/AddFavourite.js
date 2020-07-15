import React from 'react'
import { useDispatch } from 'react-redux'
import Axios from 'axios'
import './Favourite.css'
import { setFavourite } from '../../store/actions/eshopActions'

// Add product from favourite (db and Redux store)
const AddFavourite = props => {
    const dispatch = useDispatch()
    const add = () => {
        Axios.patch(`http://localhost:3000/grocery/${props.id}`,{favorite: "1"})
            .then((res) =>{
                dispatch(setFavourite(res.data)) 
            })
    }
    return(
        <div className={props.isFav === "1"? "btn_style_disabled" : "btn_style"} onClick={()=>{add()}}>
            <span className="noselect">Add to Favourite</span>
        <div className="circle"></div></div>
    )
}

export default AddFavourite;