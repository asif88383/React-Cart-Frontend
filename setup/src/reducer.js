const reducer = (state, action) => {

    switch (action.type) {      // switch on action.type
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            }
        case 'REMOVE':      // remove single cart item
            return {
                ...state,
                cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
            }
        case 'INCREASE':       // increase amount
            let tempCart = state.cart.map((cartItem) => {
                if(cartItem.id === action.payload){
                    return {...cartItem, amount: cartItem.amount + 1}
                }
                return cartItem
            })
            return {...state, cart: tempCart}
        case 'DECREASE':        // decrease amount
            let tempCart2 = state.cart.map((cartItem) => {
                if(cartItem.id === action.payload){
                    return {...cartItem, amount: cartItem.amount - 1}
                }
                return cartItem
            }).filter((cartItem) => cartItem.amount > 0)    // filter out cart items with 0 amount
            return {...state, cart: tempCart2}
        case 'GET_TOTAL':                                      // get totals
            let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
                const {price, amount} = cartItem
                const itemTotal = price * amount

                cartTotal.total += itemTotal
                cartTotal.amount += amount
                return cartTotal
            },
            {
                total: 0,
                amount: 0,
            }
            )
            total = parseFloat(total.toFixed(2))
            return {...state, total, amount}
    }   // end switch

    return state
}

export default reducer