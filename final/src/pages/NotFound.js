import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import SFlash_logo from "../static/SFlash_logo.svg";

const NotFound = () => {
  return (
    <React.Fragment>
      
          <SflashLogo src={SFlash_logo} />
          <Grid height="20px"></Grid>
          <Title>올바른 주소가 아닙니다.</Title>

      
    </React.Fragment>
  );
};
const SflashLogo = styled.img`
  width: 110px;
  margin: auto;
  text-align: center;
`;
const Title = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 200px;
`;
export default NotFound;
