import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  
  // clear all cart items
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // remove single cart item
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }


  // fetch cart items from server
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }

  // toggle amount
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: {id, type} })
  }

  useEffect(() => {
    fetchData()
  }, [])

  // get totals
  useEffect(() => {
    dispatch({type: 'GET_TOTAL'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
