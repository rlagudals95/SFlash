import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as imageActions } from "../redux/modules/image";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";

import Story_EditProfile from "../components/Story_EditProfile";
import Story_EditPwd from "../components/Story_EditPwd";
import Story_Content from "../components/Story_Content";

const Story = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  // const me = localStorage.getItem('nickname');
  // const is_me = user_info.nickname === me ;
  // dispatch(userActions.getUserInfoAPI(nickname));

  React.useEffect(() => {
    if (!user_info) {
      return false;
    }
    // dispatch(imageActions.setPreview(user_info.profileImg));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const settingHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 설정 모달창
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const openModal = (e) => {
    setModalIsOpen(true);
    // const id = e.target.id;
    // if (id !== active) {
    //   setActive(id);
    // }
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // // 탭 구현하기
  // // 처음에는 0번째 인덱스 활성화
  const [active, setActive] = useState("myPost");
  // 클릭한 인덱스 활성화
  const handleClick = (e) => {
    const id = e.target.id;
    if (id !== active) {
      setActive(id);
    }
  };

  return (
    <React.Fragment>
      <Wrapper>
        <ProfileContainer>
          <ProfileImg src={props.user_info.profileImgUrl} />

          <Grid>
            <Grid height="150px" />
            <Nickname>{props.user_info.nickname}</Nickname>
            <Introduction>{props.user_info.introduction}</Introduction>
          </Grid>

          {/* 프로필 및 비밀번호 설정(모달창) */}
          <div>
            <Setting onClick={settingHandleClick}>
              {/* <IconButton > */}
              <BiDotsHorizontalRounded size="35" color="grey" />
            </Setting>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={openModal}>프로필 편집</MenuItem>
              <MenuItem onClick={openModal}>비밀번호 변경</MenuItem>
            </Menu>

            <Modal isOpen={modalIsOpen} close={closeModal} style={modalStyle}>
              <Story_EditProfile user_info={props.user_info} />
              <CloseButton
                src="https://image.flaticon.com/icons/png/512/458/458595.png"
                onClick={closeModal}
              />
            </Modal>
          </div>
        </ProfileContainer>

{/* tap 클릭에 따라서 '내 게시물'과 '좋아요한 게시물'을 나눠주는 탭 active 값을 이용해 제어해 준다. 
    active 의 값에 따라 content 부분의 내용이 바뀐다. (content 내 Story_Content 컴퍼넌트에서는 리스트와 지도로 볼수 있도록 다시 나눠지는데
    active 를 활용해 같은 방법으로 제어해준다.*/}
        <Tabs>
          <Tab onClick={handleClick} active={active === "myPost"} id={"myPost"}>
            <b>{props.user_info.nickname}</b> 님의 게시물
            {/* <TabUnderBar active={active === "myPost"} /> */}
          </Tab>
          <text fontSize="4rem" fontWeight="700" style={{ color: "grey" }}>
            |
          </text>
          <Tab onClick={handleClick} active={active === "myLike"} id={"myLike"}>
            <b>{props.user_info.nickname}</b> 님의 좋아요
            {/* <TabUnderBar active={active === "myLike"} /> */}
          </Tab>
        </Tabs>

        <Content active={active === "myPost"}>
          <Story_Content />
        </Content>
        <Content active={active === "myLike"}>
          <Story_Content />
        </Content>
      </Wrapper>
    </React.Fragment>
  );
};

Story.defaultProps = {
  user_info: {
    profileImgUrl:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    nickname: "nickname",
    introduction: "자기소개를 입력해주세요",
  },
};

const Wrapper = styled.div`
  ${(props) => props.theme.responsiveContainer};
`;

const ProfileContainer = styled.div`
  display: flex;
  min-height: 200px;
  margin: 3% auto;
`;
const Setting = styled.div`
  position: static;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  align-items: center;
  vertical-align: center;
  padding: 10px;
  margin: 80px 30px 0px 0px;
  &:hover {
    cursor: pointer;
    color: grey;
    background-color: #eee;
    transition-duration: 2s;
  }
`;

const ProfileImg = styled.img`
  width: 160px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  padding: 30px;
  margin: 20px;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;

const Nickname = styled.text`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${(props) => props.theme.main_color};
`;
const Introduction = styled.text`
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  color: grey;
  margin-top: 10px;
  width: 100%;
`;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(247, 247, 247, 0.8)",
    transition: "opacity 2000ms ease-in-out",
    zIndex: 500,
  },
  content: {
    width: "650px",
    height: "630px",
    margin: "auto",
    padding: "20px",
    border: "none",
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    zIndex: 600,
  },
};

const CloseButton = styled.img`
  width: 11px;
  position: absolute;
  top: 30px;
  right: 30px;
  &:hover {
    cursor: pointer;
    color: grey;
  }
`;

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  margin: 0 auto;
  width: 100%;
`;

const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  width: 49%;
  padding: 25px;
  font-size: 1.3rem;
  color: ${(props) => (props.active ? props.theme.main_color : "grey")};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  background-color: ${(props) => (props.active ? "white" : "white")};
  transition: background-color 0.5s ease-in-out;
  :hover {
    background-color: ${(props) => (props.active ? "white" : "#eee")};
  }
`;
const TabUnderBar = styled.div`
  width: 55%;
  height: 3pt;
  margin: 20px auto -20px auto;
  background-color: ${(props) => (props.active ? props.theme.main_color : "")};
`;

const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

export default Story;
