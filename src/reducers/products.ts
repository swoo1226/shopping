import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {call, put, takeLatest} from 'redux-saga/effects'


export type productType = {
    id: string
    title: string
    coverImage: string
    price: number
    score: number
    availableCoupon?: boolean
}

type productsSliceType = {
    list: productType[] | null
}

export const productsInitialState: productsSliceType = {
    list: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: productsInitialState,
    reducers: {
        addProductsToList(state, action){
            if(!state.list){
                state.list = []
            }
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