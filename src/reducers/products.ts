import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import { RootState } from './index'
import {productItems} from './productItems'

const sortedProductItems = productItems.sort((a,b) => b.score - a.score)
export type productType = {
    id: string
    title: string
    coverImage: string
    price: number
    score: number
    availableCoupon?: boolean
}

type productsSliceType = {
    productItems: productType[]
    itemsRow: number
    hasMore: boolean
}

export const productsInitialState: productsSliceType = {
    productItems: [],
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
            console.log(action.payload)
           state.productItems =  state.productItems.concat(action.payload)
        },
        increaseItemsRow(state){
            console.log(`curr itemsRow is ${state.itemsRow}`)
            state.itemsRow += 1
        },
        setHasMore(state, action: PayloadAction<boolean>){
            state.hasMore = action.payload
        }
    }
})

function* addProductsToListWorker(){
    try{
        const {itemsRow} = yield select((state:RootState) => state.productsReducer)
        const nextItems = sortedProductItems.slice(itemsRow * 5, (itemsRow+1) * 5 )
        yield put({type: 'products/addProductToListSuccess', payload: nextItems})
        yield put({type: 'products/increaseItemsRow'})
        if((itemsRow+1)*5 >= sortedProductItems.length){
            yield put({type: 'products/setHasMore', payload: false})
        }
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