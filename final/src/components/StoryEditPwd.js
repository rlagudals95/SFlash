import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2'

import { Container, Title, InfoUl, InfoLi } from "../Css/loginSignupCss";
import { GiCheckMark } from "react-icons/gi";
import RegCheck from "../Css/RegCheck.css";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

import { pwdRegCheck, pwdRegContinuousCheck } from "../shared/common";
import axios from "axios";
import { config } from "../shared/config";
import { getCookie } from "../shared/Cookie";

const StoryEditPwd = () => {
  // console.log(email);
  const email = useSelector((state) => state.email.email);

  const [originalPwd, setOriginalPwd] = React.useState("");
  const [newPwd, setNewPwd] = React.useState("");
  const [rePwd, setRePwd] = React.useState("");

  const changeOriginalPwd = (e) => {
    setOriginalPwd(e.target.value);
  };

  // 비밀번호 정규식 검사(info 컬러 바꿔주기)
  const changeNewPwdReg = (e) => {
    setNewPwd(e.target.value);
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

    if (newPwd === e.target.value) {
      rePwdInfo.classList.add("ok");
      rePwdInfo.classList.remove("error");
    } else {
      rePwdInfo.classList.add("error");
      rePwdInfo.classList.remove("ok");
    }
  };

  const editPwdAPI = (originalPwd, newPwd, rePwd) => {

    if (originalPwd === newPwd){
      Swal.fire({
        text: '기존의 비밀번호와 동일한 비밀번호를 사용할 수 없습니다.',
        confirmButtonColor: "#ffb719",
      })
    }else{
    console.log(originalPwd, newPwd, rePwd);
    axios
      .put(
        `${config.api}/editpwd`,
        {
          pwd: originalPwd,
          newPwd: newPwd,
          pwdChk: rePwd,
        },
        {
          headers: {
            "X-AUTH-TOKEN": `${config.jwt}`,
          },
        }
      )
      .then((res) => {
        console.log("비밀번호 변경하기", res.data);
        if (res.status === 200) {
          Swal.fire({
            text: '비밀번호가 변경되었습니다 :)',
            confirmButtonColor: "#ffb719",
          })
        }
        window.location.reload();
      })
      .catch((err) => {
        Swal.fire({
          text: '비밀번호 형식을 다시 확인해주세요 :(',
          confirmButtonColor: "#ffb719",
        })
        console.log("비밀번호 변경 실패", err);
      });
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Title>비밀번호 변경하기</Title>
        <Text>* 소셜로그인 이용자는 비밀번호 변경이 불가능합니다.</Text>

        <InputStyle
          placeholder="이전 비밀번호 입력"
          type="password"
          onChange={(e) => {
            changeOriginalPwd(e);
          }}
        />

        <InputStyle
          placeholder="새 비밀번호 입력"
          type="password"
          onClick={() => {
            document.querySelector(".checkPwd").style.display = "block";
          }}
          onChange={(e) => {
            changeNewPwdReg(e);
          }}
        />
        <InfoUl className="checkPwd">
          <InfoLi>
            <GiCheckMark style={{ margin: "5px 5px 0px -30px" }} />
            10글자 이상 입력
          </InfoLi>
          <InfoLi>
            <GiCheckMark style={{ margin: "5px 5px 0px -30px" }} />
            영문/숫자/특수문자(공백 제외)만 허용,2개 이상의 조합
          </InfoLi>
          <InfoLi>
            <GiCheckMark style={{ margin: "5px 5px 0px -30px" }} />
            동일한 숫자 3개 이상 연속 사용 불가
          </InfoLi>
        </InfoUl>

        <InputStyle
          placeholder="새 비밀번호 재입력"
          type="password"
          onClick={() => {
            document.querySelector(".reCheckPwd").style.display = "block";
          }}
          onChange={(e) => {
            changeRePwd(e);
          }}
        />
        <InfoUl className="reCheckPwd">
          <InfoLi>
            <GiCheckMark style={{ margin: "5px 5px 0px -30px" }} />
            동일한 비밀번호를 입력해주세요.
          </InfoLi>
        </InfoUl>

        <SolidBtn
          background-color="grey"
          style={{ display: "block" }}
          onClick={() => {
            editPwdAPI(originalPwd, newPwd, rePwd);
          }}
        >
          비밀번호 변경
        </SolidBtn>
      </Container>
    </React.Fragment>
  );
};

const Text = styled.text`
  font-size: 0.8rem;
  text-align: start;
  color: grey;
  margin-left:-80px;
  padding-bottom: 10px;
`;

const InputStyle = styled.input`
  border: 1px solid grey;
  width: 92%;
  height: 38px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 1rem;
  font-weight: 500;
  margin: 8px auto;
  color: grey;
  input:focus {
    outline: none !important;
    border: 1px solid red;
  }
  cursor: pointer;
`;

const SolidBtn = styled.button`
  display: block;
  border: none;
  margin: 15px 0px;
  width: 150px;
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

export default StoryEditPwd;
