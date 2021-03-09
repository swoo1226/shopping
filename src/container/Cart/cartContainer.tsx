import React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../../reducers/index'
import {cartSlice} from '../../reducers/cart'

const mapStateToProps = (state: RootState) => ({
    cart: state.cartReducer.cart,
    productItems: state.productsReducer.productItems
  })
  const dispatchProps = {
    ...cartSlice.actions
}

type CartType = ReturnType<typeof mapStateToProps> & typeof dispatchProps

function Cart({cart}: CartType) {
    return(
        <div>
           {cart.map(product => <div><input type='checkbox' name='cartProduct'></input> {product.title} : {product.price}</div>)}
        </div>
    )
}

export default connect(mapStateToProps, dispatchProps)(Cart)