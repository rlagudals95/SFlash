import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { 
  Container,
  Title, 
  InputStyle, 
  SolidBtn, 
  BorderBtn,
  CheckBtn, 
  TextBtn, } from "../../Css/loginSignupCss"
import { Grid } from "../../elements/index";
import { actionCreators as userActions } from "../../redux/modules/user";

import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as emailActions } from "../../redux/modules/email";

import axios from "axios";

const FindEmailPwd = () => {
  const dispatch = useDispatch();

  const [FindEmailMode, setFindEmailMode] = useState(true);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [activeAuthInput, setActiveAuthInput] =React.useState(false);

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const onFindEmailAPI = (nickname) => {
    const API = "http://seungwook.shop/user/findemail";
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
        // console.log('이메일 찾기', res.data)
        const is_email = res.data.email;

        if (is_email) {
          alert("등록된 이메일은 " + is_email + " 입니다");
        } else {
          alert("회원정보가 옳바르지 않습니다 :(");
        }
      });
  };

  // 이메일 입력하고 인증번호 전송하기
  const onEmailSubmit = (email) => {
    console.log(email);
    const API = "http://seungwook.shop/user/findpwd";
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
        if(res.data === true){
            alert("입력하신 이메일로 인증번호가 전송되었습니다.");
            setActiveAuthInput(true);
        }else{
            alert("회원정보가 옳바르지 않습니다. :(");
        }
      });
  };

  const onFindPwd = (email, authCode) => {
    //  인증번호가 일치하면 비밀번호 변경 페이지로
    console.log(email, authCode);
    const API = "http://seungwook.shop/user/findpwd/authcode";
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
        console.log("비밀번호 찾기", res.data);
        dispatch(emailActions.getEmail(email));
        if(res.data === true){
            history.push('editpwd')
        }else{
            alert('인증번호가 일치하지 않습니다! :(');
        }
      });
  };

  if (FindEmailMode) {
    return (
      <React.Fragment>
        <Container>
          <Title>이메일/비밀번호 찾기</Title>
          <Tab>
            <ClickedTab>이메일 찾기 </ClickedTab>
            <text>|</text>
            <UnclickedTab
              onClick={() => {
                setFindEmailMode(false);
              }}
            >
              비밀번호 찾기
            </UnclickedTab>
          </Tab>

          <InputStyle
            placeholder="닉네임을 입력"
            type="type"
            width="97%"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <SolidBtn
            background-color="grey"
            style={{ display: "block" }}
            onClick={() => onFindEmailAPI(nickname)}
          >
            이메일 찾기
          </SolidBtn>
          <TextBtn onClick={() => history.push("/login")}>
            로그인으로 돌아가기
          </TextBtn>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
          <Title>이메일/비밀번호 찾기</Title>
          <Tab>
            <UnclickedTab
              onClick={() => {
                setFindEmailMode(true);
              }}
            >
              이메일 찾기
            </UnclickedTab>
            <text style={{ color: "grey" }}>|</text>
            <ClickedTab>비밀번호 찾기</ClickedTab>
          </Tab>

          <Grid is_flex>
            <InputStyle
              placeholder="이메일 입력"
              type="type"
              width="70%"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <CheckBtn onClick={() => onEmailSubmit(email)}>
              인증번호전송
            </CheckBtn>
          </Grid>

          <Auth active = {activeAuthInput}>
          <InputStyle
            placeholder="인증번호 입력"
            type="type"
            width="100%"
            onChange={(e) => {
              setAuthCode(e.target.value);
            }}
          />
        </Auth>


          <SolidBtn
            background-color="grey"
            style={{ display: "block" }}
            onClick={() => onFindPwd(email, authCode)}
          >
            비밀번호 찾기
          </SolidBtn>
          <Grid >
            <TextBtn onClick={() => history.push("/login")}>
              로그인으로 돌아가기
            </TextBtn>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
};


const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0px 5px 0px;
`;

const UnclickedTab = styled.button`
  width: 50%;
  aspect-ratio: 5/1;
  font-size: 0.9rem;
  background-color: #ffffff;
  border: none;
  :focus {
    outline: none;
  }
  color: lightgrey;

  &:hover {
    background-color: #eee;
    color: grey;
    cursor: pointer;
  }
`;

const ClickedTab = styled.button`
  width: 50%;
  aspect-ratio: 5/1;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #ffffff;
  color: #343a40;
  border: none;
`;

const Auth = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => (props.active ? "" : "display:none")}
`;

export default FindEmailPwd;
