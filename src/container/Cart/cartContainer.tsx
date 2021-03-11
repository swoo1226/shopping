import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../reducers/index'
import {cartSlice} from '../../reducers/cart'
import {productType} from '../../reducers/products'
import './style.scss'
const mapStateToProps = (state: RootState) => ({
    ...state.cartReducer
  })
  const dispatchProps = {
    ...cartSlice.actions
}

type CartType = ReturnType<typeof mapStateToProps> & typeof dispatchProps

function Cart({cart, coupons, toggleCouponUse, itemNumbers, setItemNumbers, checkedItems, setCheckedItems}: CartType) {
    const [total, setTotal] = useState<number>(0)
    const sumPrices = (cart:productType[]) => cart.reduce((prev, curr, index):any => {
        if(checkedItems[curr.id]){
            return prev + itemNumbers[Object.keys(checkedItems).indexOf(curr.id)] * curr.price
        } else {
            return prev
        }
    },0)
    useEffect(()=>{
        const usingCoupon = coupons.filter(coupon => coupon.using)[0]
        let totalPrice : number = total
        if(usingCoupon){
            if(usingCoupon.type === 'amount'){
                totalPrice = sumPrices(cart) - usingCoupon.discountAmount!
            } else if(usingCoupon.type === 'rate'){
                //퍼센트 할인 불가 제외하기
                let couponAvailables = cart.filter(item => item.availableCoupon === undefined)
                let couponNotAvailableItems = cart.filter(item => item.availableCoupon === false)
                totalPrice = sumPrices(couponAvailables) * (100 - usingCoupon.discountRate!) / 100 + sumPrices(couponNotAvailableItems)  
                console.log(couponAvailables, couponNotAvailableItems)
            }
        } else {
            totalPrice = sumPrices(cart)
        }
        setTotal(totalPrice)
    },[coupons, itemNumbers, checkedItems, total, sumPrices, cart])
    if(cart.length > 0){
        return(
            <div id="cartContainer">
               {cart.map((product, productIndex) => 
               <div className='cartItem' key={`product-${product.id}`}>
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
                <div>*쿠폰은 한 번에 하나만 적용 가능합니다*</div>
                {coupons.map((coupon, couponIndex) => <div key={coupon.title} className={`coupon ${coupon.type}`} onClick={()=>{toggleCouponUse(couponIndex)}}>{coupon.title}{coupon.using ? <div>적용중</div> : null}</div>)}
                <div>TOTAL : {total.toLocaleString()}원</div>
            </div>
        )
    } else {
        return <div id="cartContainer">장바구니가 비었습니다.</div>
    }
}

export default connect(mapStateToProps, dispatchProps)(Cart)