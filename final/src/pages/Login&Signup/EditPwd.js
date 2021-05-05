import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  Container,
  Title,
  InputStyle,
  SolidBtn,
  BorderBtn,
  CheckBtn,
  TextBtn,
  InfoUl,
  InfoLi,
} from "../../Css/loginSignupCss";
import { GiCheckMark } from "react-icons/gi";
import RegCheck from "../../Css/RegCheck.css";
import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

import { pwdRegCheck, pwdRegContinuousCheck } from "../../shared/common";
import axios from "axios";

const EditPwd = () => {
  // console.log(email);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email.email);

  const [pwd, setPwd] = React.useState("");
  const [rePwd, setRePwd] = React.useState("");

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

  const onEditPwd = (pwd, rePwd) => {
    //  인증번호가 일치하면 비밀번호 변경 페이지로
    console.log(email, pwd, rePwd);
    const API = "http://seungwook.shop/user/findpwd/editpwd";
    axios
      .post(
        API,
        {
          email: email,
          password: pwd,
          pwdchk: rePwd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("비밀번호 변경하기", res.data);
        if (res.status === 200) {
          alert("비밀번호가 변경되었습니다. :)");
          history.push("/login");
        }
      })
      .catch((err) => {
        window.alert("비밀번호 형식을 다시 확인해주세요. :(");
        console.log("비밀번호 변경 실패", err);
      });
  };

  return (
    <React.Fragment>
      <Container>
        <Title>비밀번호 변경하기</Title>
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
          <InfoLi>
            <GiCheckMark style={{ margin: "5px 5px 0px -30px" }} />
            동일한 비밀번호를 입력해주세요.
          </InfoLi>
        </InfoUl>

        <SolidBtn
          background-color="grey"
          style={{ display: "block" }}
          onClick={() => {
            onEditPwd(pwd, rePwd);
          }}
        >
          비밀번호 변경
        </SolidBtn>
      </Container>
    </React.Fragment>
  );
};

export default EditPwd;
