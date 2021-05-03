import React, { useState } from "react";
import styled from "styled-components";

import axios from "axios";

import { Grid } from "../../elements/index";
import { 
  Container,
  Title, 
  InputStyle, 
  SolidBtn, 
  BorderBtn,
  CheckBtn, 
  TextBtn,
  InfoUl,
  InfoLi } from "../../Css/loginSignupCss";
import RegCheck from "../../Css/RegCheck.css";
import { GiCheckMark } from "react-icons/gi";

import { actionCreators as userActions } from "../../redux/modules/user";

import {
  nicknameRegCheck,
  emailRegCheck,
  pwdRegCheck,
  pwdRegContinuousCheck,
} from "../../shared/common";

import { history } from "../../redux/configStore";
import { useDispatch } from "react-redux";

const Signup = (props) => {
  const dispatch = useDispatch();

  // input 입력 값
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [authCode, setAuthCode] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [rePwd, setRePwd] = React.useState("");

  // 닉네임, 이메일 중복체크
  const [nicknameDup, setNicknameDup] = React.useState(false);
  const [emailAuth, setEmailAuth] = React.useState(false);
  const [activeAuthInput, setActiveAuthInput] =React.useState(false);

  // 조건 충족 여부에 따라  info를 다르게
  // querySelector를 이용하면 ''안에 해당되는 태그가 여러개 일 경우 그 첫번째 것만 선택한다.
  // 따라서 선택하고자 하는 것이 명확하다면 ''안에 몇번째 child 인지까지 정확하게 입력하거나 className 사용하기

  // 닉네임 입력
  const changeNickname = (e) => {
    setNickname(e.target.value);
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

  // 이메일 입력
  const changeEmail = (e) => {
    setEmail(e.target.value);
    const emailInfo = document.querySelector("ul.checkEmail li:nth-child(1)");
    const emailInfo_auth = document.querySelector(
      "ul.checkEmail li:nth-child(2)"
    );
    //  이메일 형식 체크
    if (!emailRegCheck(e.target.value)) {
      emailInfo.classList.add("error");
      emailInfo.classList.remove("ok");
    } else {
      emailInfo.classList.add("ok");
      emailInfo.classList.remove("error");
    }
    // 이메일 인증 체크
    if (emailAuth === false) {
      emailInfo_auth.classList.add("error");
      emailInfo_auth.classList.remove("ok");
    } else {
      emailInfo_auth.classList.add("ok");
      emailInfo_auth.classList.remove("error");
    }
  };

  // 비밀번호 정규식 검사(info 컬러 바꿔주기)
  const changePwdReg = (e) => {
    setPwd(e.target.value);
    const pwdInfo_len = document.querySelector("ul.checkPwd li:nth-child(1)");
    const pwdInfo_match = document.querySelector("ul.checkPwd li:nth-child(2)");
    const pwdInfo_continuous = document.querySelector(
      "ul.checkPwd li:nth-child(3)"
    );

    // 비밀번호 길이
    if (e.target.value.length < 10) {
      pwdInfo_len.classList.add("error");
      pwdInfo_len.classList.remove("ok");
    } else {
      pwdInfo_len.classList.remove("error");
      pwdInfo_len.classList.add("ok");
    }

    // 비밀번호 정규식 검사 : /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{10,}$/
    if (!pwdRegCheck(e.target.value)) {
      pwdInfo_match.classList.add("error");
      pwdInfo_match.classList.remove("ok");
    } else {
      pwdInfo_match.classList.add("ok");
      pwdInfo_match.classList.remove("error");
    }

    // 비밀번호 연속 체크
    if (pwdRegContinuousCheck(e.target.value)) {
      pwdInfo_continuous.classList.add("error");
      pwdInfo_continuous.classList.remove("ok");
    } else {
      pwdInfo_continuous.classList.add("ok");
      pwdInfo_continuous.classList.remove("error");
    }
  };

  // 비밀번호 확인 정규식 검사(info 컬러 바꿔주기)
  const changeRePwd = (e) => {
    setRePwd(e.target.value);
    const rePwdInfo = document.querySelector("ul.reCheckPwd li:nth-child(1)");

    if (pwd === e.target.value) {
      rePwdInfo.classList.add("ok");
      rePwdInfo.classList.remove("error");
    } else {
      rePwdInfo.classList.add("error");
      rePwdInfo.classList.remove("ok");
    }
  };

  // 닉네임 중복확인
  const nicknameDupCheckAPI = (nickname) => {
    console.log(nickname);
    const API = "http://seungwook.shop/user/signup/nickchk";
    axios
      .post(
        API,
        {
          nickname: nickname,
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
          setNicknameDup(false);
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

  // 이메일 인증번호 전송 (입력한 이메일은 서버로 보내주고, 인증번호를 입력하는 모달 창을 띄운다.)
  const onEmailAuth = (email) => {
    console.log(email);
    const API = "http://seungwook.shop/user/signup/emailchk";
    axios
      .post(
        API,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("인증번호 전송", res.data);
        if (res.data === false) {
          alert("이미 등록된 이메일 입니다!");
          setNicknameDup(false);
        }else{
          alert("입력한 이메일로 인증번호가 발송되었습니다.");
          setActiveAuthInput(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이메일 인증번호 확인
  const onAuthCodeSubmit = (email, authCode) => {
    console.log(email, authCode);
    const API = "http://seungwook.shop/user/signup/authcode";
    axios
      .post(
        API,
        {
          email: email,
          authCode: authCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("인증번호 확인", res.data);

        if (res.data === true) {
          alert("인증이 완료되었습니다.");
          setEmailAuth(true);
          const emailInfo_auth = document.querySelector(
            "ul.checkEmail li:nth-child(2)"
          );
          emailInfo_auth.classList.add("ok");
          emailInfo_auth.classList.remove("error");
        } else {
          alert("인증번호가 틀렸습니다.");
        }
      });
  };

  // 회원가입 버튼
  const onSignup = () => {
    if (
      !nicknameRegCheck(nickname) ||
      !pwdRegCheck(pwd) ||
      pwdRegContinuousCheck(pwd) ||
      pwd !== rePwd
    ) {
      alert("아이디,비밀번호 확인을 해주세요.");
      return false;
    }

    if (nickname === "") {
      alert("닉네임을 입력해주세요.");
      return false;
    }

    if (email === "") {
      alert("이메일을 입력해주세요.");
      return false;
    }

    if (nicknameDup === false) {
      alert("닉네임 중복확인을 해주세요.");
      return false;
    }

    if (emailAuth === false) {
      alert("이메일 인증을 해주세요.");
      return false;
    }

    if (!emailRegCheck(email)) {
      alert("이메일 형식을 지켜주세요!");
      return false;
    }
    console.log(nickname, email, pwd, rePwd);
    dispatch(userActions.signupAPI(nickname, email, pwd, rePwd));
  };

  return (
    <React.Fragment>
      <Container>
        <Title>Signup</Title>

        <Grid is_flex>
          <InputStyle
            placeholder="닉네임 입력"
            type="type"
            width="100%"
            onClick={() => {
              document.querySelector(".checkNickname").style.display = "block";
            }}
            onChange={(e) => {
              changeNickname(e);
            }}
          />
          <CheckBtn
            onClick={() => {
              if (!nicknameRegCheck(nickname)) {
                alert(
                  "아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다."
                );
                return false;
              }
              nicknameDupCheckAPI(nickname);
            }}
          >
            중복확인
          </CheckBtn>
        </Grid>
        <InfoUl className="checkNickname">
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/>6자 이상의 영문 혹은 영문과 숫자를 조합</InfoLi>
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/>아이디 중복확인</InfoLi>
        </InfoUl>

        <Grid is_flex>
          <InputStyle
            placeholder="이메일 입력"
            type="type"
            width="100%"
            onClick={() => {
              document.querySelector(".checkEmail").style.display = "block";
            }}
            onChange={(e) => {
              changeEmail(e);
            }}
          />
          <CheckBtn
            onClick={(e) => {
              if (!emailRegCheck(email)) {
                alert("이메일 형식을 지켜주세요!");
                return false;
              }else{onEmailAuth(email)}
            }}
          >
            인증번호전송
          </CheckBtn>
        </Grid>
        <InfoUl className="checkEmail">
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/>이메일 형식을 지켜주세요.(예시: hh99@sflash.com)</InfoLi>
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/>이메일 인증 확인</InfoLi>
        </InfoUl>
        <Auth active = {activeAuthInput}>
          <InputStyle
            placeholder="인증번호 입력"
            type="type"
            width="100%"
            onChange={(e) => {
              setAuthCode(e.target.value);
            }}
          />
          <CheckBtn
            onClick={() => {
              onAuthCodeSubmit(email, authCode);
            }}
          >
            인증확인
          </CheckBtn>
        </Auth>
        <InputStyle
          placeholder="비밀번호 입력"
          type="password"
          width="98%"
          onClick={() => {
            document.querySelector(".checkPwd").style.display = "block";
          }}
          onChange={(e) => {
            changePwdReg(e);
          }}
        />
        <InfoUl className="checkPwd">
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/> 10글자 이상 입력</InfoLi>
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/> 영문/숫자/특수문자(공백 제외)만 허용,2개 이상의 조합</InfoLi>
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/> 동일한 숫자 3개 이상 연속 사용 불가</InfoLi>
        </InfoUl>

        <InputStyle
          placeholder="비밀번호 재입력"
          type="password"
          width="98%"
          onClick={() => {
            document.querySelector(".reCheckPwd").style.display = "block";
          }}
          onChange={(e) => {
            changeRePwd(e);
          }}
        />
        <InfoUl className="reCheckPwd">
          <InfoLi><GiCheckMark style={{margin:"5px 5px 0px -30px"}}/>동일한 비밀번호를 입력해주세요.</InfoLi>
        </InfoUl>

        <SolidBtn
          background-color="grey"
          style={{ display: "block" }}
          onClick={onSignup}
        >
          회원가입하기
        </SolidBtn>
        <Grid padding="10px">
          <TextBtn onClick={() => history.push("/login")}>
            이미 회원이에요! 로그인 하러가기
          </TextBtn>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const Auth = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => (props.active ? "" : "display:none")}
`;

export default Signup;
