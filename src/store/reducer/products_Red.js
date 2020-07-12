export default function(state = {
    products: []
}, action) {
    switch (action.type) {
        // action in order to store all products from the API to store
        case 'PRODUCTS':     
            return {
                ...state,
                products: action.obj
            }
        // action to add on product to Favourite  
        case 'SETFAVOURITE': 
            const updatedList = state.products.map(item => {
                if(item.id === action.obj.id) {
                    item.favorite = "1"
                }
                return item
            })
            return {
                ...state,
                products: updatedList
            } 
        // action in order to remove a product from favourites
        case 'REMOVEFAVOURITE': 
            const removeFavourite = state.products.map(item => {
                if(item.id === action.obj.id) {
                    item.favorite = 0
                }
                return item
            })
            return {
                ...state,
                products: removeFavourite
            }        
        default:
            return state
    }
}