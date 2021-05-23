import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import { Grid } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as sideAction } from "../redux/modules/side";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";
import StoryEditProfile from "../components/StoryEditProfile";
import StoryEditPwd from "../components/StoryEditPwd";

const StoryUserProfile = (props) => {
  const dispatch = useDispatch();
  const { user_info, userId } = props;

  // is_me: 현재 닉네임과 내 로컬 스토리지의 닉네임이 일치하면 '나의 페이지'로 판단하여
  // 메뉴버튼(프로필 편집, 로그아웃 등)을 보여줍니다.
  const local_userId = localStorage.getItem("userId");
  const is_me = userId === local_userId ? true : false;

  // 이미지 에러
  const ImageError = () => {
    Swal.fire({
      text: "잘못된 이미지 주소입니다 :(",
      confirmButtonColor: "#ffb719",
    });
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
              : // profileDefault
                "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          }
          onError={ImageError}
        />

        <Grid>
          <Nickname>{user_info.nickname}</Nickname>
          {user_info.introduction === null ? (
            ""
          ) : (
            <Introduction>{user_info.introduction}</Introduction>
          )}
        </Grid>

        {/* 나의 페이지에서만 보이는 메뉴(프로필 편집, 로그아웃 등) 버튼*/}
        {is_me && (
          <>
            {/* 설정 버튼 */}
            <Setting onClick={settingHandleClick}>
              <BiDotsHorizontalRounded size="32" color="grey" />
            </Setting>
            <Menu
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
              {/* <MenuItem
                onClick={() => {
                  openEditPwdModal();
                  handleClose();
                }}
              >
                비밀번호 변경
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  Swal.fire({
                    imageUrl: "https://i.postimg.cc/SxmfpG6L/2x.png",
                    text: "로그아웃 하시겠습니까?",
                    confirmButtonText: "예",
                    confirmButtonColor: "#ffb719",
                    showCancelButton: true,
                    cancelButtonText: "아니오",
                    cancelButtonColor: "#eee",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(userActions.logOut());
                      dispatch(sideAction.getPage("home"));
                      history.replace("/");
                    }
                  });
                  handleClose();
                }}
              >
                로그아웃
              </MenuItem>
            </Menu>

           {/* 설정 메뉴 클릭시 모달창 */}
            <Modal
              isOpen={profileModal}
              close={closeProfileModal}
              style={modalStyle}
            >
              <StoryEditProfile
                user_info={user_info}
                closeModal={closeProfileModal}
              />
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
          </>
        )}
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
  margin-top: 130px;
  padding-bottom: 70px;
  /* background-color:#eee; */
  @media (max-width: 1280px) {
    padding-bottom: 30px;
  }
  @media (max-width: 520px) {
    padding-bottom: 10px;
  }
  @media (max-width: 400px) {
    margin-top: 0px;
    padding-bottom: 0px;
  }
`;

const Setting = styled.div`
  position: static;
  float: right;
  width: 40px;
  height: 30px;
  border-radius: 100px;
  align-items: center;
  vertical-align: center;
  padding: 10px;
  margin: 70px 30px 0px 0px;
  &:hover {
    cursor: pointer;
    color: grey;
    background-color: #eee;
    transition-duration: 2s;
  }

  @media (max-width: 520px) {
    width: 30px;
    margin: 40px 10px 0px 0px;
  }
  @media (max-width: 400px) {
    width: 20px;
    margin: 40px 10px 0px 0px;
  }
`;

const ProfileImg = styled.img`
  border-radius: 160px;
  padding: 10px;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
  @media (min-width: 1280px) {
    width: 170px;
    height: 170px;
  }
  @media (max-width: 1280px) {
    width: 160px;
    height: 160px;
  }
  @media (max-width: 960px) {
    width: 120px;
    height: 120px;
  }
  @media (max-width: 400px) {
    width: 90px;
    height: 90px;
  }
`;

const Nickname = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 120px 20px 20px 20px;
  color: ${(props) => props.theme.main_grey};
  @media (max-width: 1280px) {
    margin-top: 100px;
    font-size: 1.6rem;
  }
  @media (max-width: 960px) {
    margin-top: 100px;
    font-size: 1.2rem;
  }
  @media (max-width: 400px) {
    margin-top: 80px;
    font-size: 1.2rem;
  }
`;

const Introduction = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  color: grey;
  margin-left: 20px;
  line-height: 2rem;
  white-space: pre-line;
  @media (max-width: 1280px) {
    font-size: 1.1rem;
  }
  @media (max-width: 960px) {
    font-size: 0.9rem;
  }
  @media (max-width: 400px) {
    font-size: 0.9rem;
  }
`;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    alignItems: "center",
    textAlign: "cetner",
    backgroundColor: "rgba(48, 48, 48, 0.6)",
    transition: "opacity 2000ms ease-in-out",
    zIndex: "1000",
  },
  content: {
    maxWidth: "620px",
    width: "80%",
    maxHeight: "600px",
    margin: "auto",
    padding: "30px",
    border: "none",
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
  },
};

const CloseButton = styled.img`
  width: 15px;
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 10px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    color: grey;
    background-color: #eee;
  }
`;

export default StoryUserProfile;
