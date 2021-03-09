import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeLatest} from 'redux-saga/effects'
import {productItems, coupons} from './productItems'

export type productType = {
    id: string
    title: string
    coverImage: string
    price: number
    score: number
    availableCoupon?: boolean
}

type couponType = {
    type: string
    title: string
    discountRate?: number
    discountAmount?: number
}

type productsSliceType = {
    productItems: productType[]
    coupons: couponType[]
    itemsRow: number
}

export const productsInitialState: productsSliceType = {
    productItems: productItems.sort((a,b) => b.score - a.score),
    coupons: coupons,
    itemsRow: 1
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: productsInitialState,
    reducers: {
        addProductsToList(state, action){
            if(!state.productItems){
                state.productItems = []
            }
        } ,
        increaseItemsRow(state, action){
            console.log(`curr itemsRow is ${state.itemsRow}`)
            state.itemsRow += 1
        }
    }
})

function* addProductsToListWorker(){
    try{
        console.log('addproductstolistworker saga')
    }
    catch(e) {
        console.error(e)
    }
}

export const { addProductsToList } = productsSlice.actions;

export function* productsSliceSaga() {
    yield takeLatest(addProductsToList, addProductsToListWorker)
}
export default productsSlice.reducer