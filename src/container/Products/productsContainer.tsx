import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {productsSlice} from '../../reducers/products'
import {RootState} from '../../reducers/index'
import InfiniteScroll from 'react-infinite-scroll-component'

const mapStateToProps = (state: RootState) => ({
    list: state.productsReducer.list
})
const dispatchProps = {
    ...productsSlice.actions
}

type ProductsType = ReturnType<typeof mapStateToProps> & typeof dispatchProps

const fetchData = () => {
    console.log('fetch data')
}


export function Products({ list, addProductsToList }: ProductsType) {
    useEffect(() => {
        console.log('list initiation')
    }, []);
    if(list){

        return (
          <div>
            <InfiniteScroll
              dataLength={list!.length} //This is important field to render the next data
              next={fetchData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              // refreshFunction={this.refresh}
              // pullDownToRefresh
              // pullDownToRefreshThreshold={50}
              // pullDownToRefreshContent={
              //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
              // }
              // releaseToRefreshContent={
              //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
              // }
            >
              {list}
            </InfiniteScroll>
          </div>
        );
    } else {
        return <div>No Products Now</div>
    }
}

export default connect(mapStateToProps, dispatchProps)(Products)