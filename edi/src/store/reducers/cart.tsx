import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import Cart from '../../models/cart';
import { DELETE_PROJECT } from '../actions/projects';

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state:any = initialState, action:any) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProject = action.project;
            const projTitle = addedProject.title;
            const projPrice = addedProject.price;
            let toCartItem;
            if (state.items[addedProject.id]) {
                toCartItem = new Cart(
                    state.items[addedProject.id].quantity +1,
                    projTitle,
                    projPrice,
                    state.items[addedProject.id].sum + projPrice
                )
            } else {
                toCartItem = new Cart(1, projTitle, projPrice, projPrice);
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProject.id]: toCartItem
                },
                totalAmount: state.totalAmount + projPrice
            }
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.pid];
            const currentQt = selectedItem.quantity
            const updatedCartItems = { ...state.items };
            if (currentQt > 1) {
                updatedCartItems[action.pid].quantity -= 1;
                updatedCartItems[action.pid].sum -= selectedItem.price;
            } else  {
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedItem.price
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PROJECT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = { ...state.items };
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state;
};