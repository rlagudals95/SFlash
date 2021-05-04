import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

const MobileNav = () => {
  return <React.Fragment></React.Fragment>;
};

export default MobileNav;

const NavBox = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
  }
`;

const LogoBox = styled.div``;
