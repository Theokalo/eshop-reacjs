// calculate the total price
const calculateTotal = (cart, type) => {
    if (type === "incr") {
        const totalPrice = cart.reduce(
            //reduce go through the array and cartItem is the each item in the array
            (accumulatedTotal, cartItem) =>
              accumulatedTotal + cartItem.cart_price,
            0 //0 is the start point of accumulatedTotal
        );
        return totalPrice
    } else {
        const totalPrice = cart.reduce(
            //reduce go through the array and cartItem is the each item in the array
            (accumulatedTotal, cartItem) =>
              accumulatedTotal - cartItem.cart_price,
            0 //0 is the start point of accumulatedTotal
        );
        return Math.abs(totalPrice)
    }
    
}

export default function(state = {
    cart: [],
    singlePrice: [],
    total: 0
}, action) {
    switch (action.type) {
        // check if item exist in cart array. If not add quantity element and then push it to cart array
        // else increase the quantity
        // also calculate the total
        case 'ADDTOCART':    
        const quantity = 1 
        const exist = state.cart.find(item => item.id === action.obj.id)
        if (!exist){
            const singlePriceExist = state.singlePrice.find(item => item.id === action.obj.id)
            action.obj['quantity'] = quantity
            if (singlePriceExist) {
                action.obj.price = singlePriceExist.pr
                return {
                    ...state,
                    cart: [...state.cart,{
                        id:action.obj.id,
                        photo_url:action.obj.image_url,
                        cart_stock: action.obj.stock,
                        cart_productName: action.obj.productName,
                        cart_price: action.obj.price,
                        cart_productDescription: action.obj.productDescription,
                        cart_favorite: action.obj.favorite,
                        cart_quantity: action.obj.quantity
                    }],
                    total: state.total + action.obj.price
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart,{
                        id:action.obj.id,
                        photo_url:action.obj.image_url,
                        cart_stock: action.obj.stock,
                        cart_productName: action.obj.productName,
                        cart_price: action.obj.price,
                        cart_productDescription: action.obj.productDescription,
                        cart_favorite: action.obj.favorite,
                        cart_quantity: action.obj.quantity
                    }],
                    singlePrice: [...state.singlePrice, {id: action.obj.id, pr: action.obj.price}],
                    total: state.total + action.obj.price
                }
            }
        } else {
            const updateCart = state.cart.map(item => {       
                if(item.id === action.obj.id) {
                    const findPrice = state.singlePrice.find(pr => pr.id === action.obj.id)
                    item.cart_quantity++
                    item.cart_price = item.cart_price + findPrice.pr
                }
                return item
            })
            const totalPrice = calculateTotal(state.cart)
            return {
                ...state,
                cart: updateCart,
                total: totalPrice
            }
        }       
        // action from plus button in order to increase the quantity
        case 'INCREASE':  
            const updateCartInc = state.cart.map(item => {       
                if(item.id === action.obj.id) {
                    const findPrice = state.singlePrice.find(pr => pr.id === action.obj.id)
                    item.cart_quantity++
                    item.cart_price = item.cart_price + findPrice.pr
                }
                return item
            })
            const totalPriceIncr = calculateTotal(state.cart, "incr")
            return {
                ...state,
                cart: updateCartInc,
                total: totalPriceIncr
            }   
        // action from minus button in order to decrease the quantity   
        case 'DECREASE':  
            const updateCartDec = state.cart.map(item => {       
                if(item.id === action.obj.id) {
                    const findPrice = state.singlePrice.find(pr => pr.id === action.obj.id)
                    item.cart_quantity--
                    item.cart_price = item.cart_price - findPrice.pr
                }
                return item
            })
            const checkQty = updateCartDec.filter(item => item.cart_quantity > 0)            
            const totalPriceDecr = calculateTotal(state.cart, "decr")
            return {
                ...state,
                cart: checkQty,
                total: totalPriceDecr
            }      
        default:
            return state
    }
}