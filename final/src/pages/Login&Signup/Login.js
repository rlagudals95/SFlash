import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

import {
  Container,
  InputStyle,
  SolidBtn,
  SocialBtn,
  TextBtn,
} from "../../Css/loginSignupCss";
import "../../Css/SocialLogin.css";
import { Grid } from "../../elements/index";
import { NAVER_AUTH_URL, KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../../shared/social";
import { actionCreators as userActions } from "../../redux/modules/user";

import { history } from "../../redux/configStore";
import { actionCreators as sideAction } from "../../redux/modules/side";

import { useDispatch, useSelector } from "react-redux";
import google from "../../static/google.svg";
import naver from "../../static/naver.svg";
import kakao from "../../static/kakao.svg";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  // 일반 로그인
  const onLogin = () => {
    if (email === "" || pwd === "") {
      Swal.fire({
        text: "아이디 혹은 비밀번호를 입력하지 않으셨습니다.",
        confirmButtonColor: "#ffb719",
      });
      return false;
    }
    dispatch(userActions.loginAPI(email, pwd));
    dispatch(sideAction.getPage("home"));
  };

  return (
    <React.Fragment>
      <Container>
        <Grid height="60px" />
        <SflashLogo />
        <Title>로그인하기</Title>
        <InputStyle
          placeholder="이메일 입력"
          type="type"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputStyle
          placeholder="비밀번호 입력"
          type="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />

        <SolidBtn onClick={onLogin}>로그인하기</SolidBtn>
        <Grid padding="10px">
          <TextBtn onClick={() => history.push("/findemailpwd")}>
            이메일/비밀번호 찾기
          </TextBtn>
        </Grid>

        <Grid padding="5px"></Grid>

        {/* 소셜 로그인 */}
        <div>
          <SocialBtn
            bg="#1ec800"
            color="#ffffff"
            onClick={() => {
              window.location.href = NAVER_AUTH_URL
            }}
          >
            <SocialIcon width="45%" src={naver} />
          </SocialBtn>
          <SocialBtn
            bg="#fee500"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL
            }}
          >
            <SocialIcon width="52%" src={kakao} />
          </SocialBtn>
          <SocialBtn
            bg="#f45a5c"
            color="#ffffff"
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL
                
            }}
          >
            <SocialIcon width="50%" src={google} />
          </SocialBtn>
        </div>

        <Grid padding="5px"></Grid>

        <TextBtn onClick={() => history.push("/signup")}>
          아직 회원이 아니신가요?
        </TextBtn>
      </Container>
    </React.Fragment>
  );
};
const Title = styled.div`
  margin-top: 35px;
  margin-bottom: 30px;
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;
  color: #343a40;
`;

const SocialIcon = styled.img`
  ${(props) => (props.width ? `color:${props.width};` : "")}
`;
const SflashLogo = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=92594323-944a-40d7-8085-b323c23246fe");
  width: 150px;
  height: 150px;
  margin: auto;
  background-size: cover;
`;

export default Login;
