import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

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
import { ClosedCaption } from "@material-ui/icons";
import profileDefault from "../static/profileDefault.svg";
// import { set } from "immer/dist/internal";

const StoryEditProfile = (props) => {
  const dispatch = useDispatch();

  const { user_info } = props; // Story.js 에서 user_info를 props로 받아오기
  const userId = localStorage.getItem("userId");

  const is_uploading = useSelector((state) => state.profile.is_uploading);
  const preview = useSelector((state) => state.profile.preview);

  React.useEffect(() => {
    if (!user_info) {
      return false;
    }
    dispatch(profileActions.setPreview(user_info.profileImgUrl));
  }, []);

  // 닉네임 변경하기-----------------------------------------------------------------------------
  // originalNickMode : true 일 때, '닉네임 변경 전' 화면을 띄워주고, false 일 때 '변경하는'화면으로 전환
  const [originalNickMode, setOriginalNickMode] = React.useState(true);
  // 새 닉네임과 중복확인
  const [newNickname, setNewNickname] = React.useState(user_info.nickname);
  const [nicknameDup, setNicknameDup] = React.useState(false);

  // 새 닉네임 입력
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

  // 닉네임 중복확인
  const nicknameDupCheckAPI = (newNickname) => {
    axios
      .post(
        `${config.api}/user/signup/nickchk`,
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
          Swal.fire({
            text: "이미 등록된 닉네임 입니다!",
            // icon: 'error',
            confirmButtonColor: "#ffb719",
          });
        } else {
          Swal.fire({
            text: "사용 가능한 닉네임 입니다!",
            confirmButtonColor: "#ffb719",
          });
          setNicknameDup(true);
          const nicknameInfo_dupCheck = document.querySelector(
            "ul.checkNickname li:nth-child(2)"
          );
          nicknameInfo_dupCheck.classList.add("ok");
          nicknameInfo_dupCheck.classList.remove("error");
        }
      });
  };

  // 저장하기 버튼을 누르면, 닉네임이 변경되고 다시 프로필 편집 창으로 돌아간다.
  const onEditNickname = () => {
    if (nicknameDup === false) {
      alert("닉네임 중복확인을 해주세요!");
      return false;
    }
    console.log(newNickname);
    dispatch(profileActions.editNicknameAPI(newNickname, userId));
    setOriginalNickMode(true);
  };

  // 프로필 사진과 자기소개 수정하기-------------------------------------------------------------------
  // 자기소개 (value를 사용해 기존에 입력한 내용을 띄워준다.)
  const [introduction, setIntroduction] = React.useState(
    user_info.introduction
  );
  const changeIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

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
      dispatch();
      // profileActions.setPreview(
      //   "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
      // )
    }
    reader.readAsDataURL(img); // readAsDataURL(읽고 싶은 파일) 메서드를 이용한다.
    reader.onloadend = () => {
      // onloadend: reader가 끝나자마자 다음 것을 수행한다.
      // console.log(reader.result);
      dispatch(profileActions.setPreview(reader.result));
    };
  };

  // 이미지 에러
  const ImageError = () => {
    window.alert("잘못된 이미지 주소 입니다. :(");
    dispatch(
      profileActions.setPreview(
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
      )
    );
  };

  // ref={fiileInput}으로 받아온 자료에서 이미지 정보를 추출해 보내줍니다.
  const onEditProfile = () => {
    const profileImg = fileInput.current.files[0];
    let profile = {
      profileImg: profileImg,
      introduction: introduction,
    };
    dispatch(profileActions.editProfileAPI(profile, userId));
  };

  return (
    <React.Fragment>
      <ProfileContainer>
        <ImgContainer>
          {/* label 태그를 이용해 (input창의 id 값을 for로 받아서) 원하는 버튼으로 바꾸어줄 수 있다. */}
          {originalNickMode && (
            <div>
              <EditImgBtn for="edit_profile_img">
                <HiCamera size="25px" color="white" />
              </EditImgBtn>
              <input
                type="file"
                id="edit_profile_img"
                // ref로 사진 파일 받아오기
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
          // 닉네임은 그대로두고 프로필 사진과 자기소개만 수정할 수 있는 모드
          <Grid>
            <NicknameContainer height="60px">
              <div>
                <Nickname>{user_info.nickname}</Nickname>
                <EditNicknameBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOriginalNickMode(false);
                  }}
                >
                  닉네임 변경
                </EditNicknameBtn>
              </div>
            </NicknameContainer>
            <Grid flex>
              <TextField
                value={introduction}
                placeholder="자기소개를 입력해주세요."
                onChange={changeIntroduction}
                disabled={is_uploading}
                rows="6"
              />
            </Grid>

            <SolidBtn
              width="96%"
              onClick={() => {
                Swal.fire({
                  text: "변경된 내용을 저장 하시겠습니까?",
                  icon: "question",
                  confirmButtonText: "예",
                  confirmButtonColor: "#ffb719",
                  showCancelButton: true,
                  cancelButtonText: "아니오",
                  cancelButtonColor: "#d33",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      text: "프로필이 수정되었습니다.",
                      icon: "success",
                    });
                    onEditProfile();
                    props.closeModal();
                  }
                });
              }}
            >
              저장하기
            </SolidBtn>
          </Grid>
        ) : (
          // 닉네임 변경모드
          <div style={{ maxWidth: "300px", margin: "auto" }}>
            <Grid height="20px" />
            <NicknameContainer height="50px">
              <InputStyle
                value={newNickname}
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
              <CheckBtn
                //  disabled={is_uploading}
                width="100px"
                onClick={() => {
                  if (!nicknameRegCheck(newNickname)) {
                    Swal.fire({
                      text: "아이디는 형식을 확인해 주세요.",
                      icon: "warning",
                      confirmButtonText: "확인",
                      confirmButtonColor: "#ffb719",
                    });
                    return false;
                  }
                  console.log(newNickname);
                  nicknameDupCheckAPI(newNickname);
                }}
              >
                중복확인
              </CheckBtn>
            </NicknameContainer>
            <InfoUl className="checkNickname" style={{ marginLeft: "90px" }}>
              <InfoLi>
                <GiCheckMark style={{ margin: "5px 5px 0px -120px" }} />
                6자 이상의 영문 혹은 영문과 숫자를 조합
              </InfoLi>
              <InfoLi>
                <GiCheckMark style={{ margin: "5px 5px 0px -120px" }} />
                아이디 중복확인
              </InfoLi>
            </InfoUl>
            <SolidBtn
              width="100%"
              onClick={() => {
                Swal.fire({
                  text: "닉네임을 변경 하시겠습니까?",
                  icon: "question",
                  confirmButtonText: "예",
                  confirmButtonColor: "#ffb719",
                  showCancelButton: true,
                  cancelButtonText: "아니오",
                  cancelButtonColor: "#d33",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      text: "닉네임이 변경되었습니다.",
                      icon: "success",
                    });
                    onEditNickname();
                  }
                });
              }}
            >
              닉네임 변경하기
            </SolidBtn>
          </div>
        )}
      </ProfileContainer>
    </React.Fragment>
  );
};

const ProfileContainer = styled.div`
  align-items: center;
  margin: auto;
  padding: 35px;
  @media (max-width: 960px) {
    padding: 25px;
  }
  @media (max-width: 400px) {
    padding: 15 px;
  }
`;
const ImgContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-top: 10px;
`;

const ProfileImg = styled.img`
  width: 160px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;

const EditImgBtn = styled.label`
  position: absolute;
  margin-left: 35px;
  margin-top: 120px;
  padding: 5px 5px 1px 5px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.main_color};
  &:hover {
    background-color: grey;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

const Nickname = styled.text`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 1.5rem;
  font-weight: 400;
  @media (max-width: 960px) {
    font-size: 1.4rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.height ? `height:${props.height};` : "")}
  margin: 10px 0px 0px 12px;
  /* background-color:#eee; */
`;

const EditNicknameBtn = styled.button`
  padding: 8px;
  margin-left: 16px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: #ffffff;
  color: ${(props) => props.theme.main_color};
  outline: none;
  border: 1pt solid ${(props) => props.theme.main_color};
  &:hover {
    color: #ffffff;
    background-color: ${(props) => props.theme.main_color};
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }

  @media (max-width: 960px) {
    font-size: 0.7rem;
    border: 1pt solid ${(props) => props.theme.main_color};
  }
  @media (max-width: 400px) {
    font-size: 0.6rem;
    border: 1pt solid ${(props) => props.theme.main_color};
  }
`;

const InputStyle = styled.input`
  border: 1px solid grey;
  width: 100%;
  height: 38px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 1rem;
  font-weight: 500;
  margin-left: -10px;
  color: grey;
  :focus {
    outline: none;
  }
  cursor: pointer;
`;

const TextField = styled.textarea`
  display: block;
  border: 1px solid grey;
  border-radius: 8px;
  width: 95%;
  padding: 16px 16px;
  box-sizing: border-box;
  margin: 10px;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const CheckBtn = styled.button`
  display: block;
  border: none;
  margin-left: 10px;
  ${(props) => (props.width ? `width:${props.width};` : "")}
  height: 48px;
  min-width: 80px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 00;
  background-color: #ffffff;
  color: ${(props) => props.theme.main_color};
  border: 1pt solid ${(props) => props.theme.main_color};
  &:hover {
    background-color: ${(props) => props.theme.main_color};
    color: #ffffff;
    border: 1pt solid ${(props) => props.theme.main_color};
    outline: none;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

const SolidBtn = styled.button`
  display: block;
  border: none;
  margin: 12px auto;
  ${(props) => (props.width ? `width:${props.width};` : "")}
  height: 48px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${(props) => props.theme.main_color};
  color: #ffffff;
  border: 1pt solid ${(props) => props.theme.main_color};
  outline: none;
  &:hover {
    background-color: #ffffff;
    color: ${(props) => props.theme.main_color};
    border: 1pt solid ${(props) => props.theme.main_color};
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

export default StoryEditProfile;
