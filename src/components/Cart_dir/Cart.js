import React from 'react'
import './Cart.css'
import CartLogo from '../../assets/shopping-cart.png'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { increase, decrease } from '../../store/actions/eshopActions'

const Cart = () => {
    const cartItems = useSelector(state => state.cart_Red.cart)
    const total = useSelector(state => state.cart_Red.total)
    const dispatch = useDispatch()
    // show cart function
    const openCart = () => {
        document.getElementById("mySideCart").style.width = "250px";
    }
    // hide cart function  
    const closeCart = () => {
        document.getElementById("mySideCart").style.width = "0";
    }
    // check if product is out of stock. If not increase quantity by clicking on plus button
    const onIncrease = (item) => {
        if(item.cart_quantity === item.cart_stock) {
            toast.dark("Out of stock");
        } else {
            dispatch(increase(item)) 
        }
    }
    // decrease quantity by clicking on minus button
    const onDecrease = (item) => {
        dispatch(decrease(item)) 
        toast.error("Product removed");
    }
    return (
        <>
            <div id="mySideCart" className="sideCart">
                <a  className="closebtn" onClick={closeCart}>x</a>
                {total === 0 ? 
                <div align="center">
                    <p style={{color:"#fff"}}>Your cart is empty!</p>
                    <p style={{color:"#fff", fontSize:"80%"}}>Add something to make me happy</p>
                </div>
                :
                <>
                <div className="wrap">
                    {/* load cart Items */}
                    {cartItems.map((item,i)=> {
                        return(
                            <div align="center" className="cardSmall" key={i}>
                                <img src={item.photo_url} alt="Avatar" style={{width:"50%", display:'block', marginLeft:'auto', marginRight:'auto'}}/>
                                <div className="containerSmall">
                                    <h4><b>{item.cart_productName}</b></h4> 
                                    <p>Price: {item.cart_price}€</p> 
                                    <div className="quantity_div">
                                        <input type="button" value="-" className="minus" onClick={()=>{onDecrease(item)}}/>
                                        <p className="qty">{item.cart_quantity}</p>
                                        <input type="button" value="+" className="plus" onClick={()=>{onIncrease(item)}}/>
                                    </div> 
                                </div>
                            </div>
                        )
                    })}                
                </div>
                <div className="total_stl">
                    <p className="total_text">Total: {total}€</p>
                </div>
                </>
                }
            </div>
            <span style={{cursor:'pointer'}} onClick={openCart}><img src={CartLogo} width="10%"/></span>
            <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </>
    )
}

export default Cart;