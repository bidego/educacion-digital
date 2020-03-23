import Order from '../../models/order';
import { ADD_ORDER, SET_ORDERS } from '../actions/orders';

const initialState = {
    orders: []
}

export default (state = initialState, action:any) => {
    switch(action.type) {
        case SET_ORDERS: 
            return {
                orders: action.orders
            }
        case ADD_ORDER:
            let { id, items, amount, date } = action.orderData;
            const newOrder = new Order(
                id,
                items,
                amount,
                date
            );
            return {
                ...state,
                orders: [ ...state.orders, newOrder ]
            };
    }
    return state;

}