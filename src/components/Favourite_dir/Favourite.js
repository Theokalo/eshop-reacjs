import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Favourite.css'
import ReadMoreAndLess from 'react-read-more-less';
import RemoveFavourite from '../Favourite_dir/RemoveFavourite'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../../store/actions/eshopActions'

const Favourite = () => {
    const ReadMore = useRef();
    const productList = useSelector(state => state.products_Red.products)
    const cart = useSelector(state => state.cart_Red.cart)
    const [numberOfItems, setNumberOfItems] = useState(12)
    const [hideLoadMore, setHideLoadMore] = useState(false)
    const dispatch = useDispatch()
    let favourite = []
    // insert favourite products to favourite array
    productList.map(item => {
        if (item.favorite === "1") {
            favourite.push(item)
        } 
    })
    // check if there is more products in order to show the load more button
    useEffect(() => {
        if (favourite.length <= numberOfItems) {
            setHideLoadMore(true)
        } else {
            setHideLoadMore(false)
        }
    },[numberOfItems])
    // load more button function
    const loadMore = () => {
        setNumberOfItems(numberOfItems+6)
        if (favourite.length <= numberOfItems+6) {
            setHideLoadMore(true)
        }
    }
    // add product to cart and check if it is out of stock
    const add = (item) => {
        const cartItem = cart.find(ci=> ci.id === item.id)
        if(cartItem) {
            if(cartItem.cart_quantity === cartItem.cart_stock) {
                toast.dark("Out of stock");
            } else {
                dispatch(addToCart(item)) 
                toast.success("Product added to cart");
            }
        } else {
            dispatch(addToCart(item)) 
            toast.success("Product added to cart");
        }
    }
    return (
        <div className="products_container" align="center">
            {favourite.slice(0, numberOfItems).map((element,i) => {
                return (
                    <div className="card" key={i}>
                        <img src={element.image_url} alt="Denim Jeans" style={{width:"100%"}}/>
                        <h1>{element.productName}</h1>
                        <p className="price">Price: {element.price}€</p>
                        <ReadMoreAndLess
                            ref={ReadMore}
                            className="read-more-content"
                            charLimit={50}
                            readMoreText="Read more"
                            readLessText="Read less"
                        >
                            {element.productDescription}
                        </ReadMoreAndLess>
                        <p>{element.stock} left</p>
                        <RemoveFavourite id={element.id} isFav={element.favorite}/>
                        {element.stock > 0 ? 
                            <button onClick={()=>{add(element,element.price)}} className="btn">Add to Cart</button>
                            :
                            <button disabled={true} onClick={()=>{add(element,element.price)}} className="btn_disabled">Add to Cart</button>
                        }
                    </div>
                )              
            })}
            {hideLoadMore === false?
            <button className="load-more-btn" onClick={()=>{loadMore()}}>Load more</button>
            :
            ""
            }
            
        </div>
    )
}

export default Favourite;