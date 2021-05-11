import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as profileActions } from "../redux/modules/profile";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";

import StoryEditProfile from "../components/StoryEditProfile";
import StoryEditPwd from "../components/StoryEditPwd";

const StoryUserProfile = (props) => {
  const dispatch = useDispatch();
  const {user_info, userId} = props;

// is_me: 현재 닉네임과 내 로컬 스토리지의 닉네임이 일치하면 '나의 페이지'로 판단하여
// 메뉴버튼(프로필 편집, 로그아웃 등)을 보여줍니다.
  const local_userId = localStorage.getItem("userId");
  const is_me = (userId === local_userId) ? true : false;
  console.log("내 스토리 인가요?", is_me);

  React.useEffect(() => {
}, []);

  // 이미지 에러
  const ImageError = () => {
    window.alert("잘못된 이미지 주소 입니다. :(");
    dispatch(
      profileActions.setPreview(
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
      )
    );
  };

  // 프로필 메뉴 버튼 제어
  const [anchorEl, setAnchorEl] = React.useState(null);
  const settingHandleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // 프로필 편집 모달창 제어
  const [profileModal, setProfileModal] = React.useState(false);
  const openProfileModal = () => {
    setProfileModal(true);
  };
  const closeProfileModal = () => {
    setProfileModal(false);
  };
   // 비밀번호 변경 모달창 제어
  const [editPwdModal, setEditPwdModal] = React.useState(false);
  const openEditPwdModal = () => {
    setEditPwdModal(true);
  };
  const closeEditPwdModal = () => {
    setEditPwdModal(false);
  };


  return (
    <React.Fragment>
        <ProfileContainer>
        <ProfileImg
            src={
              user_info.profileImgUrl
                ? user_info.profileImgUrl
                : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            }
            onError={ImageError}
          />

          <Grid>
            <Grid height="150px" />
            <Nickname>{user_info.nickname}</Nickname>
            <Introduction>{user_info.introduction}</Introduction>
          </Grid>

        {/* 나의 페이지에서만 보이는 메뉴(프로필 편집, 로그아웃 등) 버튼*/}
          {is_me &&       
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
              <StoryEditProfile user_info={user_info} closeModal={closeProfileModal}/>
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
           }

        </ProfileContainer>
    </React.Fragment>
  );
};

StoryUserProfile.defaultProps = {
  question: {
    profileImgUrl:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    nickname: "nickname",
    introduction: "자기소개를 입력해주세요",
  },
};

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

export default StoryUserProfile;
