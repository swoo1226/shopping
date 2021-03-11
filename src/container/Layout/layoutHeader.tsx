import React from 'react'
import styled from 'styled-components'

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
    justify-content: space-around;
    position:fixed;
  `;

// function layout({ children, isLoading, subShow }) {
export function LayoutHeaderContainer({children}:any): JSX.Element {
        return (
            <LayoutHeader
            height="100px"
            fontSize= "20px"
            backgroundColor="peach"
            className="LayoutHeader"
          >
              {children}
          </LayoutHeader>
        );
    }
