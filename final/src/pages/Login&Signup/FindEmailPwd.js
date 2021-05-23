import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import {
  Container,
  Title,
  InputStyle,
  SolidBtn,
  // BorderBtn,
  CheckBtn,
  TextBtn,
} from "../../Css/loginSignupCss";
import { Grid } from "../../elements/index";
// import { actionCreators as userActions } from "../../redux/modules/user";

import { history } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as emailActions } from "../../redux/modules/email";

import axios from "axios";
import { config } from "../../shared/config";

const FindEmailPwd = () => {
  const dispatch = useDispatch();

  const [FindEmailMode, setFindEmailMode] = useState(true);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [activeAuthInput, setActiveAuthInput] = React.useState(false);

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const onFindEmailAPI = (nickname) => {
    axios
      .post(
        `${config.api}/user/findemail`,
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
          Swal.fire({
            text: "등록된 이메일은 " + is_email + " 입니다",
            confirmButtonColor: "#ffb719",
          });
        } else {
          Swal.fire({
            text: "회원정보가 옳바르지 않습니다 :(",
            confirmButtonColor: "#ffb719",
          });
        }
      });
  };

  // 이메일 입력하고 인증번호 전송하기
  const onEmailSubmit = (email) => {
    // console.log(email);
    axios
      .post(
        `${config.api}/user/findpwd`,
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
        // console.log("인증번호 전송", res.data);
        if (res.data === true) {
          Swal.fire({
            text: "입력하신 이메일로 인증번호가 전송되었습니다.",
            confirmButtonColor: "#ffb719",
          });
          setActiveAuthInput(true);
        } else {
          Swal.fire({
            text: "회원정보가 옳바르지 않습니다 :(",
            confirmButtonColor: "#ffb719",
          });
        }
      });
  };

  const onFindPwd = (email, authCode) => {
    //  인증번호가 일치하면 비밀번호 변경 페이지로
    // console.log(email, authCode);
    axios
      .post(
        `${config.api}/user/findpwd/authcode`,
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
        // console.log("비밀번호 찾기", res.data);
        dispatch(emailActions.getEmail(email));
        if (res.data === true) {
          history.push("editpwd");
        } else {
          Swal.fire({
            text: "인증번호가 일치하지 않습니다 :(",
            confirmButtonColor: "#ffb719",
          });
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
            <CheckBtn
              onClick={() => {
                let timerInterval;
                Swal.fire({
                  // title: "Please wait..",
                  html: "잠시만 기다려주세요",
                  timer: 4000,
                  timerProgressBar: true,
                  didOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                      const content = Swal.getHtmlContainer();
                      if (content) {
                        const b = content.querySelector("b");
                        if (b) {
                          b.textContent = Swal.getTimerLeft();
                        }
                      }
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  },
                });
                onEmailSubmit(email);
              }}
            >
              인증번호전송
            </CheckBtn>
          </Grid>

          <Auth active={activeAuthInput}>
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

          <Grid padding="10px">
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => (props.active ? "" : "display:none")}
`;

export default FindEmailPwd;
