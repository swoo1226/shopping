import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {productsSlice} from '../../reducers/products'
import {cartSlice} from '../../reducers/cart'
import {RootState} from '../../reducers/index'
import InfiniteScroll from 'react-infinite-scroll-component'
import './style.scss'

const mapStateToProps = (state: RootState) => ({
  productItems: state.productsReducer.productItems,
  itemsRow: state.productsReducer.itemsRow,
  cart: state.cartReducer.cart
})
const dispatchProps = {
    ...productsSlice.actions,
    ...cartSlice.actions
}

type ProductsType = ReturnType<typeof mapStateToProps> & typeof dispatchProps

const fetchData = () => {
    console.log('fetch data')
}

export function Products({ productItems, addProductsToList, itemsRow, cart, addProductToCart, removeProductFromCart }: ProductsType) {
    useEffect(() => {
        console.log('list initiation')
        console.log(itemsRow)
    }, []);
    if(productItems){
        return (
          <div className="productsContainer">
            {/* <InfiniteScroll
              style={{width: '100%', height: '100%'}}
              dataLength={productItems!.length} 
              next={fetchData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              } */}
              <div className='productsRow'>
              {productItems.map(productItem => 
              <div key={productItem.id} className="productItem">
                <div className='title'>
                  {productItem.title}
                </div>
                <div className='coverImageDiv'>
                  <img src={productItem.coverImage} alt={productItem.title}></img>
                </div>
                <div className='price'>{productItem.price.toLocaleString()}원</div>
                <div className='addOrRemove'>{cart.map(product => product.id).includes(productItem.id) ? <button onClick={()=>{removeProductFromCart(productItem.id)}}>빼기</button> : <button onClick={() => addProductToCart(productItem)}>담기</button>}</div>
              </div>)}
              </div>
            {/* </InfiniteScroll> */}
            
          </div>
        );
    } else {
        return <div>No Products Now</div>
    }
}

export default connect(mapStateToProps, dispatchProps)(Products)