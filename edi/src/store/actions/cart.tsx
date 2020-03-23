export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = (proj:any) => {
    return { type: ADD_TO_CART, project: proj };
};

export const removeFromCart = (projectId:any) => {
    return { type: REMOVE_FROM_CART, pid: projectId };
};