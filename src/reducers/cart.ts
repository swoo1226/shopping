import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeLatest} from 'redux-saga/effects'
import {productType} from './products'

type productsSliceType = {
    cart: productType[]
    total: number
}

export const cartInitialState: productsSliceType = {
    cart: [],
    total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        addProductToCart(state, action: PayloadAction<productType>){
            if(state.cart.length < 3){
                state.cart.push(action.payload)
            }
        },
        removeProductFromCart(state, action: PayloadAction<string>){
            state.cart = state.cart.filter(product => product.id !== action.payload)
        } 
    }
})

// function* addProductsToListWorker(){
//     try{
//         console.log('addproductstolistworker saga')
//     }
//     catch(e) {
//         console.error(e)
//     }
// }

export const { addProductToCart } = cartSlice.actions;

// export function* productsSliceSaga() {
//     yield takeLatest(addProductsToList, addProductsToListWorker)
// }
export default cartSlice.reducer