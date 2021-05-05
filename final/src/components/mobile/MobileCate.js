import React from "react";
import styled from "styled-components";
import MobileSelect from "./MobileSelect";

const MobileCate = () => {
  return (
    <React.Fragment>
      <MobileBox>
        <MobileSelect></MobileSelect>
      </MobileBox>
    </React.Fragment>
  );
};

const MobileBox = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    margin: 0px auto;
    width: 90vw;
    height: 24vh;
    position: fixed;
    z-index: 990;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default MobileCate;
