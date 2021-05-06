import React, { useState } from "react";
import styled from "styled-components";

import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { nicknameRegCheck } from "../shared/common";
import axios from "axios";
import { config } from "../shared/config";

import { Grid } from "../elements/index";
import { InfoUl, InfoLi } from "../Css/loginSignupCss";
import { HiCamera } from "react-icons/hi";
import { GiCheckMark } from "react-icons/gi";
// import { set } from "immer/dist/internal";

const StoryEditProfile = (props) => {
  const dispatch = useDispatch();
  // 스토리페이지에서 user_info를 props로 받아온다.
  const { user_info, nickname } = props;
  console.log("user_info:", user_info);
  console.log("nickname:", nickname);


  // 닉네임 정보가 있으면 수정할 수 있구요.
  const is_edit = nickname ? true : false;
  const is_uploading = useSelector((state) => state.profile.is_uploading);
  const preview = useSelector((state) => state.profile.preview);
  // const dupCheck = useSelector((state) => state.profile.dupCheck);
  // console.log(dupCheck);

  React.useEffect(() => {
    if (!user_info) {
      return false;
    }
    if (is_edit) {
      // 기존 프로필 이미지를 프리뷰로 불러오기
      dispatch(profileActions.setPreview(user_info.profileImgUrl));
    } else {
      // 없으면 기본이미지 띄워주기
      dispatch(
        profileActions.setPreview(
          "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
        )
      );
    }
  }, []);

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
    window.alert("잘못된 이미지 주소 입니다. :(");
    dispatch(
      profileActions.setPreview(
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
      )
    );
  };

  // 닉네임 변경하기
  const [newNickname, setNewNickname] = React.useState("");
  const [originalNickMode, setOriginalNickMode] = React.useState(true);
  const [nicknameDup, setNicknameDup] = React.useState(false);

  // 닉네임 입력
  const changeNickname = (e) => {
    setNewNickname(e.target.value);
    const nicknameInfo = document.querySelector(
      "ul.checkNickname li:nth-child(1)"
    );
    const nicknameInfo_dupCheck = document.querySelector(
      "ul.checkNickname li:nth-child(2)"
    );
    // 닉네임 정규식 검사
    if (!nicknameRegCheck(e.target.value)) {
      nicknameInfo.classList.add("error");
      nicknameInfo.classList.remove("ok");
    } else {
      nicknameInfo.classList.add("ok");
      nicknameInfo.classList.remove("error");
    }
    // 닉네임 중복 확인
    if (nicknameDup === false) {
      nicknameInfo_dupCheck.classList.add("error");
      nicknameInfo_dupCheck.classList.remove("ok");
    } else {
      nicknameInfo_dupCheck.classList.add("ok");
      nicknameInfo_dupCheck.classList.remove("error");
    }
  };

  const nicknameDupCheckAPI = (newNickname) => {
        console.log(newNickname);
        const API = `${config.api}/user/signup/nickchk`;
        axios
          .post(
            API,
            {
              nickname: newNickname,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("넥네임중복확인!", res.data);
            if (res.data === false) {
              alert("이미 등록된 닉네임 입니다!");
            } else {
              alert("사용 가능한 닉네임 입니다 :)");
              setNicknameDup(true);
              const nicknameInfo_dupCheck = document.querySelector(
                "ul.checkNickname li:nth-child(2)"
              );
              nicknameInfo_dupCheck.classList.add("ok");
              nicknameInfo_dupCheck.classList.remove("error");
            }
          });
    };

    const onEditNickname = () => {
      if (nicknameDup === false) {
        alert("닉네임 중복확인을 해주세요!");
        return false;
      }
      console.log(newNickname);
      dispatch(profileActions.editNicknameAPI(newNickname));
    }

  // 자기소개 입력하기(기존에 입력한 자기소개가 있으면 띄워준다 input 창에 vaule 설정해줘야 이전에 썼던 글이 남아있음. 없으면 null;)
  const [introduction, setIntroduction] = React.useState(
    user_info.introuduction ? user_info.introuduction : ""
  );
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
          {originalNickMode && (
            <div><EditImgBtn for="edit_profile_img">
            <HiCamera size="25px" color="4670fd" />
          </EditImgBtn>
          <input
            type="file"
            id="edit_profile_img"
            ref={fileInput}
            onChange={selectFile}
            disabled={is_uploading}
            // '사진선택' 버튼 안 보이도록
            style={{ display: "none" }}
          />
          </div>
          )}
          
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

        {/* originalNickMode가 true 일 때는 기존 닉네임을 보여주고 
            닉네임변경 벼튼을 누르면 originalNickname(false)로 닉네임 변경 모드로 전환
            변경 후에는 다시 변경된 닉네임으로 originalNickMode(true) */}
        {originalNickMode ? (
          <Grid>
          <NicknameContainer height="60px">
            <Nickname>{nickname}</Nickname>
            <EditNicknameBtn
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOriginalNickMode(false);
              }}
            >
              닉네임 변경
            </EditNicknameBtn>
          </NicknameContainer>
          <Grid flex>
          <TextField
            value={introduction}
            placeholder="자기소개를 입력해주세요."
            onChange={changeIntroduction}
            disabled={is_uploading}
          />
        </Grid>
        
          <SolidBtn onClick={onEditProfile}>저장하기</SolidBtn>
        </Grid>
        ) : (
          <div>
            <Grid height="20px" />
          <NicknameContainer height="50px">
            <InputStyle
              placeholder="새 닉네임 입력"
              type="type"
              width="100%"
              onClick={() => {
                document.querySelector(".checkNickname").style.display =
                  "block";
              }}
              onChange={(e) => {
                changeNickname(e);
              }}
            />
            <SolidBtn
            //  disabled={is_uploading}
            width="100px"
              onClick={() => {
                if (!nicknameRegCheck(newNickname)) {
                  alert(
                    "아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다."
                  );
                  return false;
                }
                console.log(newNickname);
                nicknameDupCheckAPI(newNickname);
              }}
            >
              중복확인
            </SolidBtn>
            </NicknameContainer>
            <InfoUl className="checkNickname">
              <InfoLi>
                <GiCheckMark style={{ margin: "5px 5px 0px -30px" }} />
                6자 이상의 영문 혹은 영문과 숫자를 조합
              </InfoLi>
              <InfoLi>
                <GiCheckMark style={{ margin: "5px 5px 0px -30px" }} />
                아이디 중복확인
              </InfoLi>
            </InfoUl>
            <SolidBtn 
            width="140px" 
            onClick = {onEditNickname}
            >닉네임 변경하기</SolidBtn>
            </div>
        )}
      </ProfileContainer>
    </React.Fragment>
  );
};

const ProfileContainer = styled.div`
  align-items: center;
  padding: 35px;
`;
const ImgContainer = styled.div`
  margin: 10px 20px 0px 20px;
`;

const ProfileImg = styled.img`
  width: 175px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  padding: 0px;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;

const EditImgBtn = styled.label`
  position: absolute;
  margin-left: 130px;
  margin-top: 130px;
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
  margin-left: 10px;
  font-size: 1.5rem;
  font-weight: 400;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  ${(props) => (props.height ? `height:${props.height};` : "")}
  margin: 10px 0px 10px 12px;
`;

const EditNicknameBtn = styled.button`
  padding: 8px;
  margin-left: 16px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: 400;
  background-color: #ffffff;
  color: ${(props) => props.theme.main_color};
  outline: none;
  border: 1pt solid ${(props) => props.theme.main_color};
  &:hover {
    color: #ffffff;
    background-color: grey;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    border: 1pt solid grey;
  }
`;

const InputStyle = styled.input`
  border: 1px solid grey;
  width: 45%;
  height: 38px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 1rem;
  font-weight: 500;
  margin:0px;
  color: grey;
  input:focus {
    outline: none !important;
    border: 1px solid red;
  }
  cursor: pointer;
`;

const TextField = styled.textarea`
  display: block;
  border: 1px solid grey;
  border-radius: 8px;
  width: 95%;
  aspect-ratio: 1/0.4;
  padding: 16px 16px;
  box-sizing: border-box;
  margin: 10px;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const SolidBtn = styled.button`
  display: block;
  border: none;
  margin: 20px 10px;
  ${(props) => (props.width ? `width:${props.width};` : "")}
  height: 48px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.main_color};
  color: #ffffff;
  outline: none;
  &:hover {
    color: grey;
    background-color: lightgrey;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

export default StoryEditProfile;
