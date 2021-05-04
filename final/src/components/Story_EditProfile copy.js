import React, { useState } from "react";
import styled from "styled-components";

import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { nicknameRegCheck } from "../shared/common";
import axios from "axios";

import { Grid } from "../elements/index";
import { InputStyle, InfoUl, InfoLi } from "../Css/loginSignupCss";
import { HiCamera } from "react-icons/hi";
import { GiCheckMark } from "react-icons/gi";

const Story_EditProfile = (props) => {
  const dispatch = useDispatch();
  // 스토리페이지에서 user_info를 props로 받아온다.
  const { user_info } = props;
  console.log(user_info);
  const nickname = user_info.nickname;
  // 닉네임 정보가 있으면 수정할 수 있구요.
  const is_edit = nickname? true : false;
  const is_uploading = useSelector((state) => state.profile.is_uploading);
  const preview = useSelector((state) => state.profile.preview);

//   React.useEffect(() => {
//     if(!user_info){
//         return false;
//     }
//     if(is_edit){
//       // 기존 프로필 이미지를 프리뷰로 불러오기
//       dispatch(profileActions.setPreview(user_info.profileImgUrl));
//     }else{
//       // 없으면 기본이미지 띄워주기
//       dispatch(profileActions.setPreview("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"));
//     }
// },[])

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
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
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

  const ImageError = () => {
    window.alert('잘못된 이미지 주소 입니다. :(')
    dispatch(profileActions.setPreview("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"))
  }

  // 닉네임 변경하기
  const [newNickname, setNewNickname] = React.useState("");
  const [originalNickname, setOriginalNickname] =React.useState(true);
  const [editNickname, setEditNickname] =React.useState(false);
  const [nicknameDup, setNicknameDup] = React.useState(false);

  // 닉네임 입력
  const changeNickname = (e) => {
    setNewNickname(e.target.value);
    // const nicknameInfo = document.querySelector(
    //   "ul.checkNickname li:nth-child(1)"
    // );
    // const nicknameInfo_dupCheck = document.querySelector(
    //   "ul.checkNickname li:nth-child(2)"
    // );
    // // 닉네임 정규식 검사
    // if (!nicknameRegCheck(e.target.value)) {
    //   nicknameInfo.classList.add("error");
    //   nicknameInfo.classList.remove("ok");
    // } else {
    //   nicknameInfo.classList.add("ok");
    //   nicknameInfo.classList.remove("error");
    // }
    // // 닉네임 중복 확인
    // if (nicknameDup === false) {
    //   nicknameInfo_dupCheck.classList.add("error");
    //   nicknameInfo_dupCheck.classList.remove("ok");
    // } else {
    //   nicknameInfo_dupCheck.classList.add("ok");
    //   nicknameInfo_dupCheck.classList.remove("error");
    // }
  };

  // 닉네임 중복확인
  // const nicknameDupCheckAPI = (newNickname) => {
  //   console.log(newNickname);
  //   const API = "http://seungwook.shop/user/signup/nickchk";
  //   axios
  //     .post(
  //       API,
  //       {
  //         nickname: newNickname,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("넥네임중복확인!", res.data);
  //       if (res.data === false) {
  //         alert("이미 등록된 닉네임 입니다!");
  //       } else {
  //         alert("사용 가능한 닉네임 입니다 :)");
  //         setNicknameDup(true);
  //         setEditNickname(true);
  //         setOriginalNickname(true);
  //         const nicknameInfo_dupCheck = document.querySelector(
  //           "ul.checkNickname li:nth-child(2)"
  //         );
  //         nicknameInfo_dupCheck.classList.add("ok");
  //         nicknameInfo_dupCheck.classList.remove("error");
  //       }
  //     });
  // };

  

  // 자기소개 입력하기(기존에 입력한 자기소개가 있으면 띄워준다 input 창에 vaule 설정해줘야 이전에 썼던 글이 남아있음. 없으면 null;)
  const [introduction, setIntroduction] = React.useState(user_info.introuduction ? user_info.introuduction : "");
  const changeIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  const onEditProfile = () => {
    // 경우의 수를 두가지로 나누어 생각
    // 1. 자기소개 내용만 수정하였을 때
    // 2. 사진과 자기소개 내용 둘다 수정하였을 때 (사진만 수정하고 글은 수정하지 않아도 수정한 걸로 인식된다.)
    const profileImg = fileInput.current.files[0];
    dispatch(profileActions.editProfileAPI(nickname, profileImg, introduction));
    // window.location.reload();
  };

  return (
    <React.Fragment>
      <ProfileContainer>
        <ImgContainer>
        {/* label 태그를 이용해 (input창의 id 값을 for로 받아서) 원하는 버튼으로 바꾸어줄 수 있다. */}
        <EditImgBtn for="edit_profile_img"><HiCamera size="25px" color="4670fd"/></EditImgBtn>
         <input
        type="file"
        id="edit_profile_img"
        ref={fileInput}
        onChange={selectFile}
        disabled={is_uploading}
        // '사진선택' 버튼 안 보이도록
        style={{display:"none"}}
      />
      {/* 프로필 이미지 : 프리뷰가 있으면 보여주고 없으면 기본 이미지 보여주기 */}
        <ProfileImg
          src={
            preview
              ? preview
              : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          } 
          onError={ImageError}
        />
        </ImgContainer>
        
        <NicknameContainer active={originalNickname}>
          <Nickname>{user_info.nickname}</Nickname>
          <EditNicknameBtn 
          onClick={
            setEditNickname(true)
            // setOriginalNickname(false)
            }
            > 닉네임 변경</EditNicknameBtn>
        </NicknameContainer>

        <NicknameContainer active={editNickname}>
          <InputStyle
            placeholder="새 닉네임 입력"
            type="type"
            width="100%"
            onClick={() => {
              document.querySelector(".checkNickname").style.display = "block";
            }}
            onChange={(e) => {
              changeNickname(e);
            }}
          />
          <EditNicknameBtn
            onClick={() => {
              if (!nicknameRegCheck(newNickname)) {
                alert(
                  "아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다."
                );
                return false;
              }
              // nicknameDupCheckAPI(newNickname);
            }}
          >
            중복확인
          </EditNicknameBtn>
          <InfoUl className="checkNickname">
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/>6자 이상의 영문 혹은 영문과 숫자를 조합</InfoLi>
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/>아이디 중복확인</InfoLi>
        </InfoUl>
        
        </NicknameContainer>

        <Grid flex margin="10px">        
          <TextField
            value={introduction}
            placeholder="자기소개를 입력해주세요."
            rows={5}
            onChange={changeIntroduction}
            disabled={is_uploading}
          />
        </Grid>
        <Grid> 
          <SaveBtn onClick={onEditProfile}>저장하기</SaveBtn>
          </Grid>
       
      </ProfileContainer>
    </React.Fragment>
  );
};

const ProfileContainer = styled.div`
  align-items: center;
  padding:35px;
`;
const ImgContainer = styled.div`
  width: 140px;
  margin: 15px;
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
  }
`;

const Nickname = styled.text`
  font-size: 1.4rem;
  font-weight: 400;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  ${(props) => (props.active ? "" : "display:none")}
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
  }
`;

const TextField = styled.textarea`
  display: block;
  border: 1px solid grey;
  border-radius: 8px;
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
  border-radius: 8px;
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
