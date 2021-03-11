import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../reducers/index'
import {cartSlice} from '../../reducers/cart'
import './style.scss'
const mapStateToProps = (state: RootState) => ({
    ...state.cartReducer
  })
  const dispatchProps = {
    ...cartSlice.actions
}

type CartType = ReturnType<typeof mapStateToProps> & typeof dispatchProps

function Cart({cart, coupons, toggleCouponUse, itemNumbers, setItemNumbers, checkedItems, setCheckedItems}: CartType) {
    useEffect(()=>{
        // let checkedItemsObj : {[key:string]: boolean}= {}
        // cart.map(product => checkedItemsObj[product.id] = true)
        // setCheckedItems(checkedItemsObj)
    },[])
    if(cart.length > 0){
        return(
            <div id="cartContainer">
               {cart.map((product, productIndex) => 
               <div className='cartItem'>
                   <input type='checkbox' name='cartProduct' checked={checkedItems[product.id]} onChange={(e)=>{
                        setCheckedItems({id: product.id, checked: e.target.checked})
                       }}/>
                       <div>
                        {product.title}
                       </div>
                   <input type='number' min={1} value={itemNumbers[productIndex]} onChange={(e)=>{
                       let newItemNumbers = [...itemNumbers]
                        newItemNumbers[productIndex] = parseInt(e.target.value)
                       setItemNumbers(newItemNumbers)
                   }}></input>
                   <div>
                   {checkedItems![product.id] && itemNumbers[productIndex] ? <div>{(itemNumbers[productIndex] * product.price).toLocaleString()}</div> : null}
                   </div>
                </div>)}
                {coupons.map(coupon => <div key={coupon.title} className={`coupon ${coupon.type}`} onClick={()=>{toggleCouponUse(coupon.type)}}>{coupon.title}{coupon.using ? <div>적용중</div> : null}</div>)}
                <div>TOTAL : 원</div>
            </div>
        )
    } else {
        return <div id="cartContainer">장바구니가 비었습니다.</div>
    }
}

export default connect(mapStateToProps, dispatchProps)(Cart)