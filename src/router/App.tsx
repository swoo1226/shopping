import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Cart, Products, Layout} from '../container/index'

function App() {
  return (
    <Router>
      <Layout
        containerStyle={{ fontSize: "14px", backgroundColor: "#ffffff" }}
      >
        {/* <Route exact path="/home" component={}></Route> */}
        <Route exact path="/products" component={Products}></Route>
        <Route exact path="/cart" component={Cart}></Route>
      </Layout>
    </Router>
  );
}

export default App;
