import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {productType} from './products'
import {coupons} from'./productItems'
import {RootState} from './index'
type cartSliceType = {
    cart: productType[]
    coupons: couponType[]
    itemNumbers: number[]
    checkedItems: {[key:string]: boolean}
}
type couponType = {
    type: string
    title: string
    discountRate?: number
    discountAmount?: number
    using: boolean
}

export const cartInitialState: cartSliceType = {
    cart: [],
    coupons: coupons.map((coupon) => {return {...coupon, using: false}}),
    itemNumbers: [],
    checkedItems: {}
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
        },
        setItemNumbers(state, action: PayloadAction<number[]>){
            console.log(action.payload)
            state.itemNumbers = action.payload
        },
        setCheckedItems(state, action: PayloadAction<{id:string, checked: boolean}>){
            state.checkedItems[action.payload.id] = action.payload.checked
        }

    }
})

function* addProductsToListWorker({type, payload}: {type: string, payload: productType}){
    try{
            const { itemNumbers } = yield select((state:RootState) => state.cartReducer)
            const newItemNumbers = [...itemNumbers, 1]
            yield put({
                type: 'cart/setItemNumbers',
                payload: newItemNumbers
            })
            yield put({
                type: 'cart/setCheckedItems',
                payload: {
                    id: payload.id,
                    checked: true
                }
            })
        
    }
    catch(e) {
        console.error(e)
    }
}

export const { addProductToCart, removeProductFromCart,  toggleCouponUse, setItemNumbers, setCheckedItems} = cartSlice.actions;

export function* cartSliceSaga() {
    yield takeEvery(addProductToCart, addProductsToListWorker)
}
export default cartSlice.reducer