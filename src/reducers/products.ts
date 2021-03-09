import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import { RootState } from './index'
import {productItems, coupons} from './productItems'

const sortedProductItems = productItems.sort((a,b) => b.score - a.score)
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
    hasMore: boolean
}

export const productsInitialState: productsSliceType = {
    productItems: [],
    coupons: coupons,
    itemsRow: 0,
    hasMore: true
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: productsInitialState,
    reducers: {
        addProductsToList(){
        },
        addProductToListSuccess(state, action: PayloadAction<productType[]>){
           state.productItems =  state.productItems.concat(action.payload)
        },
        increaseItemsRow(state){
            console.log(`curr itemsRow is ${state.itemsRow}`)
            state.itemsRow += 1
        }
    }
})

function* addProductsToListWorker(){
    try{
        const {itemsRow} = yield select((state:RootState) => state.productsReducer)
        console.log(itemsRow)
        console.log(sortedProductItems)
        const nextItems = sortedProductItems.slice(itemsRow, (itemsRow+1) * 5 )
        console.log(nextItems)
        yield put({type: 'products/addProductToListSuccess', payload: nextItems})
        yield put({type: 'products/increaseItemsRow'})
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