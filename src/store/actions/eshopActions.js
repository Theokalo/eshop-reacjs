import { PRODUCTS, SETFAVOURITE, REMOVEFAVOURITE, ADDTOCART, INCREASE, DECREASE } from "./action-types/eshop-actions"

// all products action
export const allProducts = (obj) => {
    return {
      type: PRODUCTS,
      obj
    }
}

// set favorite action
export const setFavourite = (obj) => {
    return {
      type: SETFAVOURITE,
      obj
    }
}

// remove favorite action
export const removeFavourite = (obj) => {
    return {
      type: REMOVEFAVOURITE,
      obj
    }
}

// add to cart action
export const addToCart = (obj) => {
    return {
      type: ADDTOCART,
      obj
    }
}

// increase quantity action
export const increase = (obj) => {
  return {
    type: INCREASE,
    obj
  }
}

// decrease quantity action
export const decrease = (obj) => {
  return {
    type: DECREASE,
    obj
  }
}