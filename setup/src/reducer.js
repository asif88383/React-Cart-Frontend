const reducer = (state, action) => {

    switch (action.type) {               // switch on action.type
        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            }
            break;
        case 'REMOVE':                  // remove single cart item
            return {
                ...state,
                cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
            }
            break;
        case 'TOGGLE_AMOUNT':                // increase/decrease amount
            let tempCart = state.cart.map((cartItem) => {   // map cart items
                if(cartItem.id === action.payload.id){
                    if(action.payload.type === 'inc'){
                        return {...cartItem, amount: cartItem.amount + 1}
                    } 
                    if(action.payload.type === 'dec'){
                        return {...cartItem, amount: cartItem.amount - 1}
                    }
                }
                return cartItem
            }).filter((cartItem) => cartItem.amount > 0)    // filter out cart items with 0 amount
            return {...state, cart: tempCart}
            break;
        case 'GET_TOTAL':               // get totals
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
            break;
        case 'LOADING':                 // loading screen
            return (
                {...state, loading: true}
            ) 
            break;
        case 'DISPLAY_ITEMS':           // display items
            return (
                {...state, loading: false, cart: action.payload}
            )
            break;
        default:
            break;
    }   // end switch



    throw new Error('no matching cart item')
} // end reducer



export default reducer