import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import * as GrIcons from "react-icons/gr";
import { actionCreators as userActions } from "../../redux/modules/user";

const MobileNav = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(userActions.logOut());
      history.push("/");
    }
  };
  return (
    <React.Fragment>
      <NavBox>
        <Logo>SFlash</Logo>
        {is_login ? (
          <React.Fragment>
            <HeaderLog>
              <GrIcons.GrLogout size="1.2rem" onClick={onLogout} />
            </HeaderLog>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <HeaderLog>
              <GrIcons.GrLogin
                size="1.2rem"
                onClick={() => {
                  history.push("/login");
                }}
              />
            </HeaderLog>
          </React.Fragment>
        )}
      </NavBox>
    </React.Fragment>
  );
};

export default MobileNav;

const Logo = styled.div`
  margin: 0px auto;
`;

const NavBox = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 8vh;
    text-align: center;
    align-items: center;
    box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
    z-index: 500;
    background-color: white;
  }
`;

const HeaderLog = styled.span`
  position: fixed;
  right: 3.3vw;
  top: 2.3vh;
  opacity: 0.5;
`;

const LogoBox = styled.div``;
