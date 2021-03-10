import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeLatest} from 'redux-saga/effects'
import {productType} from './products'
import {coupons} from'./productItems'
type productsSliceType = {
    cart: productType[]
    total: number
    coupons: couponType[]
}
type couponType = {
    type: string
    title: string
    discountRate?: number
    discountAmount?: number
    using: boolean
}

export const cartInitialState: productsSliceType = {
    cart: [],
    total: 0,
    coupons: coupons.map((coupon) => {return {...coupon, using: false}})
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
        },
        toggleCouponUse(state, action: PayloadAction<string>){
           state.coupons = state.coupons.map(coupon => coupon.type === action.payload ? {...coupon, using: !coupon.using} : coupon) 
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