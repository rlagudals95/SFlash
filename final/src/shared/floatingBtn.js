import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";

const gridFloatingBtn = () => {
  return (
    <React.Fragment>
      <GridBtn>3줄씩 보기</GridBtn>
    </React.Fragment>
  );
};

export default gridFloatingBtn;

const GridBtn = styled.div`
  all: unset;
  font-size: 2px;
  border: none;
  /* margin-left: 2vw; */
  z-index: 7001;
  width: 100000px;
  height: 3000000px;
  position: fixed;
  right: 100px;
  bottom: 100px;
  cursor: pointer;
  border-radius: 7px;
  background-color: red;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  /* @media (max-width: 1440px) {
    right: 5px;
    top: 285px;
  }
  @media (max-width: 1155px) {
    right: 10px;
    top: 320px;
  }
  @media (max-width: 600px) {
    top: 250px;
    right: 20px;
  } */
`;
