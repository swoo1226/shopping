import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../reducers/index'
import {cartSlice} from '../../reducers/cart'
import './style.scss'
const mapStateToProps = (state: RootState) => ({
    cart: state.cartReducer.cart,
    productItems: state.productsReducer.productItems
  })
  const dispatchProps = {
    ...cartSlice.actions
}

type CartType = ReturnType<typeof mapStateToProps> & typeof dispatchProps

function Cart({cart}: CartType) {
    const [itemNumbers, setItemNumbers] = useState(cart.map(() => 1))
    const [checkedItems, setCheckedItems] = useState<{[key:string]: boolean}>({})
    useEffect(()=>{
        let checkedItemsObj : {[key:string]: boolean}= {}
        cart.map(product => checkedItemsObj[product.id] = true)
        console.log(checkedItemsObj)
        setCheckedItems(checkedItemsObj)
    },[])
    if(itemNumbers.length > 0 && Object.keys(checkedItems).length > 0){
        return(
            <div id="cartContainer">
               {cart.map((product, productIndex) => 
               <div>
                   <input type='checkbox' name='cartProduct' checked={checkedItems[product.id]} onChange={(e)=>{
                       let newCheckedItems = {...checkedItems}
                       newCheckedItems[product.id] = e.target.checked
                       setCheckedItems(newCheckedItems)
                       }}></input> 
                   {product.title} : {product.price.toLocaleString()}원
                   <input type='number' min={0} value={itemNumbers[productIndex]} onChange={(e)=>{
                       let newItemNumbers = [...itemNumbers]
                        newItemNumbers[productIndex] = parseInt(e.target.value)
                       setItemNumbers(newItemNumbers)
                   }}></input>
                   {checkedItems![product.id] && itemNumbers[productIndex] ? <div>{(itemNumbers[productIndex] * product.price).toLocaleString()}</div> : null}
                </div>)}
                <div>TOTAL : {(cart.reduce((prev,curr, index):any => {
                    if(checkedItems[curr.id]){
                        return prev + itemNumbers[index] * curr.price
                    } else {
                        return prev
                    }
                    },0).toLocaleString())}
                    원</div>
            </div>
        )
    } else {
        return <div>장바구니가 비었습니다.</div>
    }
}

export default connect(mapStateToProps, dispatchProps)(Cart)