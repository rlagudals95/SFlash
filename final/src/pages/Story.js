import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as profileActions } from "../redux/modules/profile";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";

import StoryEditProfile from "../components/StoryEditProfile";
import StoryEditPwd from "../components/StoryEditPwd";
import StoryContent from "../components/StoryContent";

import { actionCreators as storypostActions } from "../redux/modules/storypost";

const Story = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.profile.user);
  const nickname = localStorage.getItem("nickname");
  console.log(user_info);
  const { id } = useParams();
  console.log("id:", id);

  // const me = localStorage.getItem('nickname');
  // const is_me = user_info.nickname === me ;

  React.useEffect(() => {
    dispatch(profileActions.getUserInfoAPI(nickname));
    // dispatch(storypostActions.getUserPostAPI());

    // dispatch(imageActions.setPreview(user_info.profileImg));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingHandleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 프로필 편집 모달창
  const [profileModal, setProfileModal] = React.useState(false);
  const openProfileModal = () => {
    setProfileModal(true);
  };
  const closeProfileModal = () => {
    setProfileModal(false);
  };
  const [editPwdModal, setEditPwdModal] = React.useState(false);
  const openEditPwdModal = () => {
    setEditPwdModal(true);
  };
  const closeEditPwdModal = () => {
    setEditPwdModal(false);
  };

  // '나의 게시물/ 나의 좋아요' 탭 제어하기 : 처음에는 0번째 인덱스 활성화
  const [active, setActive] = useState("myPost");
  // 클릭한 인덱스 활성화
  const handleClick = (e) => {
    const id = e.target.id;
    if (id !== active) {
      setActive(id);
    }
  };
  // 'setting' 메뉴 모달 제어하기 : 처음에는 0번째 인덱스 활성화

  return (
    <React.Fragment>
      <Wrapper>
        <ProfileContainer>
          {/* {user_info.profileImgUrl ? ( */}
          <ProfileImg src={user_info.profileImgUrl} />
          {/* ) : (
            <ProfileImg src={props.user_info.profileImgUrl} />
          )} */}

          <Grid>
            <Grid height="150px" />
            <Nickname>{nickname}</Nickname>
            <Introduction>{user_info.introduction}</Introduction>
          </Grid>

          {/* 프로필 및 비밀번호 설정(모달창) */}
          <div>
            <Setting onClick={settingHandleClick}>
              {/* <IconButton > */}
              <BiDotsHorizontalRounded size="35" color="grey" />
            </Setting>
            <Menu
              // id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  openProfileModal();
                  handleClose();
                }}
              >
                프로필 편집
              </MenuItem>
              <MenuItem
                onClick={() => {
                  openEditPwdModal();
                  handleClose();
                }}
              >
                비밀번호 변경
              </MenuItem>
              <MenuItem
                onClick={() => {
                  const result = window.confirm("로그아웃 하시겠습니까?");
                  if (result) {
                    dispatch(userActions.logOut());
                    history.replace("/");
                  }
                  handleClose();
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>

            {/*  현재 닉네임은 로컬스토리지에서 받아온 닉네임으로 설정되어 있지만 api 연결후에는 api에서 받아온 정보로 사용하기 */}
            <Modal
              isOpen={profileModal}
              close={closeProfileModal}
              style={modalStyle}
            >
              <StoryEditProfile user_info={user_info} />
              <CloseButton
                src="https://image.flaticon.com/icons/png/512/458/458595.png"
                onClick={closeProfileModal}
              />
            </Modal>
            <Modal
              isOpen={editPwdModal}
              close={closeEditPwdModal}
              style={modalStyle}
            >
              <StoryEditPwd />
              <CloseButton
                src="https://image.flaticon.com/icons/png/512/458/458595.png"
                onClick={closeEditPwdModal}
              />
            </Modal>
          </div>
        </ProfileContainer>

        {/* tap 클릭에 따라서 '내 게시물'과 '좋아요한 게시물'을 나눠주는 탭 active 값을 이용해 제어해 준다. 
    active 의 값에 따라 content 부분의 내용이 바뀐다. (content 내 Story_Content 컴퍼넌트에서는 리스트와 지도로 볼수 있도록 다시 나눠지는데
    active 를 활용해 같은 방법으로 제어해준다.*/}
        <Tabs>
          <Tab onClick={handleClick} active={active === "myPost"} id={"myPost"}>
            <b>{nickname}</b> 님의 게시물
            {/* <TabUnderBar active={active === "myPost"} /> */}
          </Tab>
          <text fontSize="4rem" fontWeight="700" style={{ color: "grey" }}>
            |
          </text>
          <Tab onClick={handleClick} active={active === "myLike"} id={"myLike"}>
            <b>{nickname}</b> 님의 좋아요
            {/* <TabUnderBar active={active === "myLike"} /> */}
          </Tab>
        </Tabs>

        {/* <Content active={active === "myPost"}>
          <StoryContent />
        </Content>
        <Content active={active === "myLike"}>
          <StoryContent />
        </Content> */}
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
  width: 170px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  padding: 20px;
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
    backgroundColor: "rgba(48, 48, 48, 0.6)",
    transition: "opacity 2000ms ease-in-out",
    zIndex: 800,
  },
  content: {
    width: "650px",
    height: "630px",
    margin: "auto",
    padding: "20px",
    border: "none",
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    zIndex: 900,
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
