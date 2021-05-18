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
import { actionCreators as sideActions } from "../redux/modules/side";

import SFlash_logo_darkgrey from "../static/SFlash_logo_darkgrey.svg";
import SFlashLogoDark from "../static/SFlashLogoDark.png";

function Navbar() {
  const dispatch = useDispatch();
  //GrMap
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const is_login = useSelector((state) => state.user.is_login);
  const userId = localStorage.getItem("userId"); // 로컬스토리지에 저장된 닉네임 가져오는 방법
  const is_loading = useSelector((state) => state.user.is_loading);

  // page 리덕스 상태값에 의한 사이드바 아이콘 active 효과 구현
  const page = useSelector((state) => state.side.page);

  console.log("현재 페이지는", page);

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
        <SideMini>
          <SideIcon>
            <LOGO>
              {/* 로고 들어갈자리 */}
              <Link to="/">
                <SflashLogo
                  onClick={() => {
                    dispatch(sideActions.getPage("home"));
                  }}
                />
              </Link>
            </LOGO>

            <TabletLogo
              onClick={() => {
                history.replace("/");
                dispatch(sideActions.getPage("home"));
                history.replace("/");
              }}
            ></TabletLogo>
            {/* 홈 지도보기 */}

            <IconOutter>
              {page == "home" ? (
                <SelectedIcon
                  onClick={() => {
                    history.replace("/");
                  }}
                >
                  HOME
                </SelectedIcon>
              ) : (
                <IconInfo
                  onClick={() => {
                    history.replace("/");
                    dispatch(sideActions.getPage("home"));
                  }}
                >
                  HOME
                </IconInfo>
              )}
            </IconOutter>
            {/* 커뮤니티 페이지 */}
            <IconOutter>
              {page == "community" ? (
                <SelectedIcon
                  onClick={() => {
                    history.replace("/postlist");
                  }}
                >
                  COMMUNITY
                </SelectedIcon>
              ) : (
                <IconInfo
                  onClick={() => {
                    history.replace("/postlist");
                    dispatch(sideActions.getPage("community"));
                  }}
                >
                  COMMUNITY
                </IconInfo>
              )}
            </IconOutter>
            {/* 마이페이지 & 로그인 */}
            {/* && page == "story" ? */}

            {page == "story" ? (
              <IconOutter>
                {is_login ? (
                  <SelectedIcon
                    onClick={() => {
                      history.push(`/story/${userId}`);
                      dispatch(profileActions.getUserInfoAPI(userId));
                      dispatch(storypostActions.getUserPostAPI(userId));
                      dispatch(storypostActions.getUserLikeAPI(userId));
                    }}
                  >
                    MY STORY
                  </SelectedIcon>
                ) : (
                  <SelectedIcon
                    onClick={() => {
                      history.replace("/login");
                    }}
                  >
                    LOGIN
                  </SelectedIcon>
                )}
              </IconOutter>
            ) : (
              <IconOutter>
                {is_login ? (
                  <IconInfo
                    onClick={() => {
                      history.push(`/story/${userId}`);
                      dispatch(profileActions.getUserInfoAPI(userId));
                      dispatch(storypostActions.getUserPostAPI(userId));
                      dispatch(storypostActions.getUserLikeAPI(userId));
                      dispatch(sideActions.getPage("story"));
                    }}
                  >
                    MY STORY
                  </IconInfo>
                ) : (
                  <IconInfo
                    onClick={() => {
                      history.replace("/login");
                      dispatch(sideActions.getPage("story"));
                    }}
                  >
                    LOGIN
                  </IconInfo>
                )}
              </IconOutter>
            )}

            {/* About */}
            <IconOutter>
              {page == "about" ? (
                <SelectedIcon
                  onClick={() => {
                    history.replace("/about");
                  }}
                >
                  ABOUT
                </SelectedIcon>
              ) : (
                <IconInfo
                  onClick={() => {
                    history.replace("/about");
                    dispatch(sideActions.getPage("about"));
                  }}
                >
                  ABOUT
                </IconInfo>
              )}
            </IconOutter>
            {/* Faq */}
            <IconOutter>
              {page == "faq" ? (
                <SelectedIcon
                  onClick={() => {
                    history.replace("/faq");
                  }}
                >
                  FAQ
                </SelectedIcon>
              ) : (
                <IconInfo
                  onClick={() => {
                    history.replace("/faq");
                    dispatch(sideActions.getPage("faq"));
                  }}
                >
                  FAQ
                </IconInfo>
              )}
            </IconOutter>
            {/* Qna */}
            <IconOutter>
              {page == "qna" ? (
                <SelectedIcon
                  onClick={() => {
                    history.replace("/qna");
                  }}
                >
                  QnA
                </SelectedIcon>
              ) : (
                <IconInfo
                  onClick={() => {
                    history.replace("/qna");
                    dispatch(sideActions.getPage("qna"));
                  }}
                >
                  QnA
                </IconInfo>
              )}
            </IconOutter>
          </SideIcon>
          {/* <GrLogout size="1.5rem" /> */}
        </SideMini>
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
  font-size: 13px;
  margin: 0px auto;
  text-align: center;
  color: white;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.main_color};
  }
  @media (max-width: 1450px) {
    /* 1450밑으로 넓이가 내려가면 */
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    /* 1450밑으로 넓이가 내려가면 */
  }
`;

const SelectedIcon = styled.div`
  font-size: 13px;
  margin: 0px auto;
  text-align: center;
  color: ${(props) => props.theme.main_color};
  cursor: pointer;
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
  margin-bottom: 6vh;
  background-color: transparent;
  @media (max-width: 1400px) {
    /* 1450밑으로 넓이가 내려가면 */
    display: none;
  }
`;

const SideMini = styled.div`
  align-items: center;
  width: 120px;
  height: 100vh;
  position: fixed;
  background-color: #343a40;
  left: 0;
  top: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  /* background-color: red; */
  @media (max-width: 1400px) {
    all: unset;
    align-items: center;
    width: 100%;
    height: 8vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #343a40;
    z-index: 500;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
    box-shadow: 2px 2px 3px 2px rgba(0, 0.1, 0.1, 0.03);
  }
`;

//  @media (max-width: 600px) {
//     all: unset;
//     margin: 0px;
//     z-index: 10000;
//     position: fixed;
//     width: 100%;
//     height: 51px;
//     justify-content: space-around;
//     /* flex-direction: row; */
//     bottom: 0px;
//     left: 0;
//     background-color: white;
//     padding-bottom: 2vh;
//     margin: auto;
//   }

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
    /* display: none; */
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

const TabletLogo = styled.div`
  display: none;
  @media (max-width: 1400px) {
    display: flex;
    width: 95px;
    height: 32px;
    background-size: cover;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0%20%EA%B0%80%EB%A1%9C.png?alt=media&token=026904ff-0cbb-447d-8309-86256408d179");
  }
`;

const SflashLogo2 = styled.div`
  width: 90px;
  height: 90px;
  background-size: cover;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0%20%EA%B0%80%EB%A1%9C.png?alt=media&token=026904ff-0cbb-447d-8309-86256408d179s");
`;
const SflashLogo = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/SFlashLogoDark.png?alt=media&token=f1f6e54f-4058-41ff-9c58-d5c0c62b9711");
  width: 120px;
  height: 100px;
  background-size: cover;
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
