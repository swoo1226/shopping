import React from 'react'
import styled from 'styled-components'
// import { Loading } from "../../components";
// import { DashBoardNavigation, IsAuth } from "../index";
// import { connect } from "react-redux";

// const mapStateToProps = (state) => ({
//   isLoading: state.userReducer.isLoading,
//   subShow: state.stickyNavReducer.subShow,
// });

// const dispatchProps = {};
const LayoutContainer = styled.div<{
  fontSize: string;
  backgroundColor: string;
}>`
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.fontSize};
  background-color: ${(props) => props.backgroundColor};
`;

// function layout({ children, isLoading, subShow }) {
    function Layout({children, containerStyle}:any): JSX.Element {
        return (
          <LayoutContainer
            fontSize={containerStyle.fontSize}
            backgroundColor={containerStyle.backgroundColor}
          >
            
            {/* <IsAuth />
            <DashBoardNavigation /> */}
            {/* <Loading isLoading={isLoading} /> */}
            <div>{children}</div>
          </LayoutContainer>
        );
    }

export default Layout;
