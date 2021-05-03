import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as profileActions } from "../redux/modules/profile";

import { HiCamera } from "react-icons/hi";

const Story_EditProfile = (props) => {
  const dispatch = useDispatch();
  const { user_info } = props;
  const nickname = user_info.nickname;

  const is_edit = nickname? true : false;
  const is_uploading = useSelector((state) => state.profile.is_uploading);
  const profile_preview = useSelector((state) => state.profile.profile_preview);

  React.useEffect(() => {
    if(!user_info){
        return false;
    }
    //이미지경로받기
    dispatch(profileActions.setProfilePreview(user_info.profileImg));
},[])


  // 이미지 업로드하기
  const fileInput = React.useRef();
  const selectFile = (e) => {
    // changed 된 event (e.target은 input)
    // console.log(e.target.files); // input 이 가진 files 객체
    // console.log(e.target.files[0]); //선택한 파일이 어떻게 저장되어 있나 확인
    // console.log(fileInput.current.files[0]); //ref로도 확인;

    // 이미지 미리보기
    const reader = new FileReader();
    var img = fileInput.current.files[0];
    if (img === undefined) {
      dispatch(
        profileActions.setPreview(
          "http://desk87.com/assets/images/preview-not-available.jpg"
        )
      );
    }
    reader.readAsDataURL(img); // readAsDataURL(읽고 싶은 파일) 메서드를 이용한다.
    reader.onloadend = () => {
      // onloadend: reader가 끝나자마자 다음 것을 수행한다.
      // console.log(reader.result);
      dispatch(profileActions.setPreview(reader.result));
    };
  };

  const onEditNickname = () => {
    const img = fileInput.current.files[0];
    dispatch(profileActions.editProfileAPI(nickname, img, introduction));
    // window.location.reload();
  };

  const [introduction, setIntroduction] = React.useState("");
  const changeIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  const onEditProfile = () => {
    const img = fileInput.current.files[0];
    dispatch(profileActions.editProfileAPI(nickname, img, introduction));
    // window.location.reload();
  };

  return (
    <React.Fragment>
      <ProfileContainer>
        <ImgContainer>
        <EditImgBtn for="edit_profile_img"><HiCamera size="25px" color="4670fd"/></EditImgBtn>
         <input
        type="file"
        id="edit_profile_img"
        ref={fileInput}
        onChange={selectFile}
        disabled={is_uploading}
        style={{display:"none"}}
      />
        <ProfileImg
          src={
            profile_preview
              ? profile_preview
              : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          }
        />
        </ImgContainer>
        
       
       
        <Grid flex margin="30px">
          <Nickname>{user_info.nickname}</Nickname>
          <EditNicknameBtn onClick={onEditNickname}> 닉네임 변경</EditNicknameBtn>
        </Grid>

        <Grid flex margin="10px">        
          <IntroductionInput
            value={introduction}
            placeholder="자기소개를 입력해주세요."
            onChange={changeIntroduction}
            disabled={is_uploading}
          />
        </Grid>
        <Grid> <SaveBtn onClick={onEditProfile}>저장하기</SaveBtn></Grid>
       
      </ProfileContainer>
    </React.Fragment>
  );
};
const ProfileContainer = styled.div`
  align-items: center;
  padding:45px;
`;
const ImgContainer = styled.div`
  width: 140px;
  margin: 20px;
`;

const ProfileImg = styled.img`
  width: 150px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  padding: 0px;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;

const EditImgBtn = styled.label`
position:absolute;
margin-left: 110px;
margin-top: 110px;
padding: 5px;
border-radius: 50px;
background-color: #ffffff;
  &:hover {
    background-color: #eee;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
`;

const Nickname = styled.text`
  font-size: 1.4rem;
  font-weight: 400;
`;

const EditNicknameBtn = styled.button`
  padding: 8px;
  margin-left: 16px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: 400;
  background-color: #ffffff;
  color: ${(props) =>props.theme.main_color};
  outline: none;
  border: 1.5pt solid ${(props) =>props.theme.main_color};
  &:hover{
    color: #ffffff;
    background-color: grey;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    border:1.5pt solid grey;
`;

const IntroductionInput = styled.textarea`
  display: block;
  border: 1px solid grey;
  border-radius: 10px;
  width: 95%;
  aspect-ratio: 1/0.4;
  padding: 16px 16px;
  box-sizing: border-box;
  margin: 0px;
  font-size: 1rem;
`;

const SaveBtn = styled.button`
display:block;
border: none;
  margin: 20px 10px;
  width: 120px;
  height: 48px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${(props) =>props.theme.main_color};
  color: #ffffff;
  outline: none;
  &:hover{
    color: grey;
    background-color: lightgrey;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

export default Story_EditProfile;
