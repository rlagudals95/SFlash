import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as CgIcons from "react-icons/cg";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";
import * as MdIcons from "react-icons/md";
import { GrCircleQuestion } from "react-icons/gr";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../Css/Navbar.css";
import { IconContext } from "react-icons";
import Category from "./Category";
import { history } from "../redux/configStore";
import styled from "styled-components";
import user from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { actionCreators as storypostActions } from "../redux/modules/storypost";
import { config } from "../shared/config";

import SFlash_logo from "../static/SFlash_logo.svg";

function Navbar() {
  const dispatch = useDispatch();
  //GrMap
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const is_login = useSelector((state) => state.user.is_login);
  const userId = localStorage.getItem("userId"); // 로컬스토리지에 저장된 닉네임 가져오는 방법
  const is_loading = useSelector((state) => state.user.is_loading);

  // React.useEffect(() => {
  //   dispatch(userActions.loading(true));
  // }, [is_loading]);

  React.useEffect(() => {
    console.log(is_login);
  }, [is_login]);

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(userActions.logOut());
      history.push("/");
    }
  };

  return (
    <>
      {/* 안에 있는 요소들 색통일 */}
      <IconContext.Provider value={{ color: "#000" }}>
        {/* <div className="navbarBtn">
          {/* 햄버거 버튼 클릭시 sidebar 값을 !sidebar로 바꿔줌*/}
        {/* <Link className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
        {/* </div> */}
        <SideMini>
          <SideIcon>
            <LOGO>
              {/* 로고 들어갈자리 */}
              <Link to="/">
              <SflashLogo src = {SFlash_logo}/>
              </Link>
            </LOGO>

            {/* 홈 지도보기 */}

            <IconOutter>
              <Link to="/">
                <Home></Home>
              </Link>
              <IconInfo>홈</IconInfo>
            </IconOutter>

            <IconOutter>
              <Link to="/postlist">
                <Community></Community>
              </Link>

              <IconInfo>커뮤니티</IconInfo>
            </IconOutter>
            {/* 마이페이지 */}

            <IconOutter>
              {is_login ? (
                <React.Fragment>
                  <Link>
                    <Story
                      onClick={() => {
                        history.push(`/story/${userId}`);
                        dispatch(profileActions.getUserInfoAPI(userId));
                        dispatch(storypostActions.getUserPostAPI(userId));
                        dispatch(storypostActions.getUserLikeAPI(userId));
                      }}
                    ></Story>
                  </Link>

                  <IconInfo>내스토리</IconInfo>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {/* <GrIcons.GrLogin
                  size="1.5rem"
                  onClick={() => {
                    history.push("/login");
                  }}
                /> */}
                  <Log
                    onClick={() => {
                      history.replace("/login");
                    }}
                  ></Log>
                  {/* 로그인 아이콘 */}
                  <IconInfo>로그인</IconInfo>
                </React.Fragment>
              )}
            </IconOutter>

            {/* About */}
            <IconOutter>
              <Link to="/about">
                <About></About>
              </Link>
              <IconInfo>About</IconInfo>
            </IconOutter>

            <IconOutter>
              <Link to="/faq">
                <FaQ></FaQ>
              </Link>
              <IconInfo>FAQ</IconInfo>
            </IconOutter>
            <IconOutter>
              <Link to="/qna">
                <QnA></QnA>
              </Link>

              <IconInfo>1:1</IconInfo>
            </IconOutter>
          </SideIcon>
          {/* <GrLogout size="1.5rem" /> */}
        </SideMini>
        {/* sidebar값에 따라 클래스 네임을 바꿔준다 */}
        {/* nav-menu.active는 사이드바가 들어간 상태를 의미 */}
        <nav className={sidebar ? "nav-menu" : "nav-menu "}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <CategoryInfo>
              <CategoryIcon>
                {" "}
                <BiIcons.BiBookBookmark size="23px" />
              </CategoryIcon>
              카테고리
            </CategoryInfo>
            {/* <Category></Category> <Category /> */}
            <Bubble
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {SidebarData.map((item, index) => {
                //사이드바의 데이터 들을 map으로 돌려준다
                return (
                  <li
                    key={index}
                    className={item.cName}
                    onClick={(e) => {
                      history.push("item.path");
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </Bubble>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

const LogoBack = styled.div`
  background-color: darkgray;
  width: 100%;
  height: 200px;
`;

const IconOutter = styled.div`
  @media (max-width: 1450px) {
    /* 1450밑으로 넓이가 내려가면 */
    display: flex;
    flex-direction: column;
  }
`;

const IconInfo = styled.div`
  font-size: 9px;
  margin: 0px auto;
  text-align: center;
  @media (max-width: 1450px) {
    /* 1450밑으로 넓이가 내려가면 */
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    /* 1450밑으로 넓이가 내려가면 */
    display: none;
  }
`;
const LOGO = styled.div`
  margin-bottom: 7vh;

  @media (max-width: 1450px) {
    /* 1450밑으로 넓이가 내려가면 */
    display: none;
  }
`;

const SideMini = styled.div`
  align-items: center;
  width: 120px;
  height: 100vh;
  position: fixed;
  background-color: ${(props) => props.theme.main_grey};
  left: 0;
  top: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  @media (max-width: 1400px) {
    all: unset;
    align-items: center;
    width: 100%;
    height: 8vh;
    position: fixed;
    background-color: white;
    left: 0;
    top: 0;
    z-index: 500;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
    box-shadow: 2px 2px 3px 2px rgba(0, 0.1, 0.1, 0.03);
  }
  @media (max-width: 600px) {
    all: unset;
    margin: 0px;
    z-index: 10000;
    position: fixed;
    width: 100%;
    height: 51px;
    justify-content: space-around;
    /* flex-direction: row; */
    bottom: 0px;
    left: 0;
    background-color: white;
    padding-bottom: 2vh;
    margin: auto;
  }
`;

const SideIcon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 560px;
  margin-top: 30px;
  @media (max-width: 1400px) {
    width: 100%;
    height: 7vh;
    justify-content: space-between;
    flex-direction: row;
    margin: 0px 9vw;
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 20px;
  @media (max-width: 960px) {
    // 1450밑으로 넓이가 내려가면
    display: none;
  }
`;

const CategoryIcon = styled.div`
  margin-right: 12px;
`;

const Bubble = styled.div`
  z-index: 400;
`;

const RoundInner = styled.div`
  margin: auto;
  margin-bottom: 3.2px;
  color: white;
`;

const RoundColor = styled.div`
  /* background-color: ${(props) => props.theme.main_color}; */
  width: 40px;
  height: 40px;
  border-radius: 30px;
  align-items: center;
  display: flex;
  padding: 3px;
  color: white;
`;

const SflashLogo = styled.img`
  /* background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=92594323-944a-40d7-8085-b323c23246fe"); */
  width: 60px;
  height: 60px;
  background-size: cover;
  z-index:100;
`;

const QnA = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/1%EB%8C%801%20%EB%AC%B8%EC%9D%98%402x.png?alt=media&token=0435735d-279c-4973-a882-244c9e634fc3");
  width: 35px;
  height: 35px;
  background-size: cover;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const FaQ = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/FAQ%402x.png?alt=media&token=20277e6f-072e-4d02-bc45-71cd33ba5f87");
  width: 35px;
  height: 35px;
  background-size: cover;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const About = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/about%402x.png?alt=media&token=474a87ed-c405-472f-b4dc-e532a1ea2c43");
  width: 35px;
  height: 35px;
  background-size: cover;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const Log = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%82%AC%EC%9D%B4%EB%93%9C%EB%B0%94_%EB%A1%9C%EA%B7%B8%EC%9D%B8%402x.png?alt=media&token=0cd29526-bfe0-41bb-a07c-b5146ac5a7c9");
  width: 35px;
  height: 35px;
  background-size: cover;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const Story = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EB%82%B4%20%EC%8A%A4%ED%86%A0%EB%A6%AC%402x.png?alt=media&token=c4f3ab36-e824-4123-805f-b6ae9b114d08");
  width: 35px;
  height: 35px;
  background-size: cover;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

const Community = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0%402x.png?alt=media&token=f44ee0b7-e503-442a-b1d0-6f2a34edc202");
  width: 35px;
  height: 35px;
  background-size: cover;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;
const Home = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%ED%99%88%402x.png?alt=media&token=e3d76895-0f7a-4b4b-9048-87e81a043cc5");
  width: 35px;
  height: 35px;
  background-size: cover;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;

export default Navbar;
