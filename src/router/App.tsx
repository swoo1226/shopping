import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Cart, Products, Layout} from '../container/index'
import styled from "styled-components";
const LayoutHeader = styled.header<{
  height: string;
  fontSize: string;
  backgroundColor: string;
}>`
  width: 100%;
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
function App() {
  return (
    <Layout
      containerStyle={{ fontSize: "14px", backgroundColor: "#fac609" }}
    >
      <LayoutHeader
        height="70px"
        fontSize= "20px"
        backgroundColor="skyblue"
      ></LayoutHeader>
      <Router>
        <Route exact path="/products" component={Products}></Route>
        <Route exact path="/cart" component={Cart}></Route>
      </Router>
    </Layout>
  );
}

export default App;
