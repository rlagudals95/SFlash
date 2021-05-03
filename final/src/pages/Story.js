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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "react-modal";

import Story_EditProfile from "../components/Story_EditProfile";
import Story_Content from "../components/Story_Content";

const Story = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  // const me = localStorage.getItem('nickname');
  // const is_me = user_info.nickname === me ;
  // dispatch(userActions.getUserInfoAPI(nickname));
  
  React.useEffect(() => {
    if(!user_info){
      return false
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

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // // 탭 구현하기
  // // 처음에는 0번째 인덱스 활성화
  const [active, setActive] = useState(3);
  // 클릭한 인덱스 활성화
  const handleClick = (e) => {
    const index = parseInt(e.target.id);
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <React.Fragment>
      <Wrapper>
        <ProfileContainer>
          <ProfileImg src={props.user_info.profileImg} />
          <Grid>
            <Grid height="150px"/>
            <Nickname>{props.user_info.nickname}</Nickname>
            <Introduction>{props.user_info.introduction}</Introduction>
          </Grid>
          <Grid width="200px" >
            <SettingBtn>프로필 편집</SettingBtn>
          </Grid>

          {/* 프로필 및 비밀번호 설정(모달창) */}
          <div>
            {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={settingHandleClick}>
        setting
      </Button > */}
            <IconButton width="50px" onClick={settingHandleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => setModalIsOpen(true)}>
                프로필 편집
              </MenuItem>
              <MenuItem onClick={() => setModalIsOpen(true)}>
                비밀번호 변경
              </MenuItem>
            </Menu>

            <Modal isOpen={modalIsOpen} close={closeModal} style={modalStyle}>
              <Story_EditProfile user_info={props.user_info}/>
              <CloseButton
                src="https://image.flaticon.com/icons/png/512/458/458595.png"
                onClick={closeModal}
              />
            </Modal>
          </div>
        </ProfileContainer>

        <Tabs>
          <Tab onClick={handleClick} active={active === 3} id={3}>
            {props.user_info.nickname}님의 게시물
            <TabUnderBar active={active === 3} />
          </Tab>

          <Tab onClick={handleClick} active={active === 4} id={4}>
            {props.user_info.nickname}님의 좋아요
            <TabUnderBar active={active === 4} />
          </Tab>
        </Tabs>

        <Content active={active === 3}>
          <Story_Content />
        </Content>
        <Content active={active === 4}>
          <Story_Content />
        </Content>
      </Wrapper>
    </React.Fragment>
  );
};

Story.defaultProps = {
  user_info: {
    profileImg:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    nickname: "nickname",
    introduction: "자기소개를 입력해주세요 :)",
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

const ProfileImg = styled.img`
  width: 150px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  padding: 30px;
  margin: 20px;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;

const Nickname = styled.text`
  font-size: 1.5rem;
  font-weight: 600;
`;
const Introduction = styled.text`
  display: block;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 10px;
  width: 100%;
`;

const SettingBtn = styled.button`
  padding: 12px 20px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 0.9rem;
  color: grey;
  background-color: #ffffff;
  :focus {
    outline: none;
  }
  &:hover {
    color: grey;
    background-color: #eee;
    border: none;
    cursor: pointer;
  }
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
    width: "50%",
    // height: "50%",
    minHeight: "500px",
    margin: "auto",
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
  width: 50%;
  padding: 20px;
  font-size: 1.2rem;
  color: ${(props) => (props.active ? props.theme.main_color : "grey")};
  font-weight: ${(props) => (props.active ? 600 : 200)};
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
