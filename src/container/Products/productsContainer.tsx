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
  cart: state.cartReducer.cart,
  hasMore: state.productsReducer.hasMore
})
const dispatchProps = {
    ...productsSlice.actions,
    ...cartSlice.actions
}

type ProductsType = ReturnType<typeof mapStateToProps> & typeof dispatchProps


export function Products({ productItems, addProductsToList, itemsRow, cart, addProductToCart, removeProductFromCart, hasMore }: ProductsType) {
    useEffect(() => {
      addProductsToList()
    }, []);
        return (
          <div className='productsContainer'>
            <main>
            <InfiniteScroll
              dataLength={productItems.length} 
              next={() => setTimeout(() => {addProductsToList()},1000)}
              hasMore={hasMore}
              loader={<div className='loader'>Loading...</div>}
              endMessage={
                <p className='endMessage'>
                  <b>모든 상품을 불러왔습니다.</b>
                </p>
              }>
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
                <div className='addOrRemove'>{cart.map(product => product.id).includes(productItem.id) ? <button className='remove'onClick={()=>{removeProductFromCart(productItem.id)}}>빼기</button> : <button className='add' onClick={() => addProductToCart(productItem)}>담기</button>}</div>
              </div>)}
              </div>
            </InfiniteScroll>
            </main>
            <aside>
              <div className='cart'>
                {cart.map((item, index) => <div>{index+1}. {item.title}</div>)}
                {cart.length === 3 ? <div className='full'>카트가 가득 찼습니다.</div> : null}
              </div>
            </aside>
          </div>
        );
}

export default connect(mapStateToProps, dispatchProps)(Products)