import React, { Component } from 'react'
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import { HashLoader } from "react-spinners";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1111; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  ${(props) =>
        props.disappear &&
        css`
      display: block; /* show */
    `}
`;

export default class Loader extends Component {
    render() {
        return (
            <div className="overlay-loader">
                <DarkBackground disappear={this.props.active}>
                    <LoadingOverlay
                        active={true}
                        spinner={<HashLoader color={"white"} />}
                    />
                </DarkBackground>
            </div>
        )
    }
}

