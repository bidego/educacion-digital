import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'ADD_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shop-app-80b0f.firebaseio.com/u1.json', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseData = await response.json();

            console.log(responseData);
            const orders = [];
            Object.keys(responseData).forEach( key => {
                orders.push(new Order(
                    key,
                    responseData[key].cartItems,
                    responseData[key].totalAmount,
                    new Date(responseData[key].date)
                ));
            })
            console.log(orders)
    
            dispatch({
                type:SET_ORDERS,
                orders: orders
            });

        } catch (error) {
            throw error;
        }
    };
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        let { userId } = getState().auth;
        try {
            const now = new Date().toISOString();
            const response = await fetch(`https://rn-shop-app-80b0f.firebaseio.com/orders/${userId}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cartItems, totalAmount, date: now})
            })
            const responseData = await response.json();
            
            console.log("POST order: ");
            console.log(responseData);

            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: responseData.name,
                    items: cartItems,
                    amount: totalAmount,
                    date: now
                }
            });
        } catch (error) {
            throw new Error("Algo anduvo mal");
        }
    };
}
