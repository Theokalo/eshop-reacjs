import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Product_list.css'
import ReadMoreAndLess from 'react-read-more-less';
import AddFavourite from '../Favourite_dir/AddFavourite'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product_list = () => {
    const ReadMore = useRef();
    const dispatch = useDispatch()
    const productList = useSelector(state => state.products_Red.products)
    const cart = useSelector(state => state.cart_Red.cart)
    const [numberOfItems, setNumberOfItems] = useState(12)
    const [hideLoadMore, setHideLoadMore] = useState(false)
    // check if there is more products in order to show the load more button
    useEffect(() => {        
        if (productList.length <= numberOfItems) {
            setHideLoadMore(true)
        } else {
            setHideLoadMore(false)
        }
    }, [productList])
    // load more function
    const loadMore = () => {
        setNumberOfItems(numberOfItems+6)
    }
    // Check if product is out of stock. If not add it to Redux store
    const add = (item) => {
        const cartItem = cart.find(ci=> ci.id === item.id)
        if(cartItem) {
            if(cartItem.cart_quantity === cartItem.cart_stock) {
                toast.dark("Out of stock");
            } else {
                const setItemToCart = () => (
                    { type: "ADDTOCART", obj: item }
                );
                dispatch(setItemToCart()) 
                toast.success("Product added to cart");
            }
        } else {
            const setItemToCart = () => (
                { type: "ADDTOCART", obj: item }
            );
            dispatch(setItemToCart()) 
            toast.success("Product added to cart");
        }
    }
    return (
        <div className="products_container" align="center">
            {/* load products */}
            {productList.slice(0, numberOfItems).map((element,i) => {
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
                        <AddFavourite id={element.id} isFav={element.favorite}/>
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

export default Product_list;