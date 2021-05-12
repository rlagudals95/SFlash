import React from "react";
import styled from "styled-components";

import {
  Container,
  Title,
  InputStyle,
  SolidBtn,
  SocialBtn,
  BorderBtn,
  TextBtn,
} from "../../Css/loginSignupCss";
import "../../Css/SocialLogin.css";
import { Grid } from "../../elements/index";
import { actionCreators as userActions } from "../../redux/modules/user";

import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { setCookie } from "../../shared/Cookie";
import { GolfCourse } from "@material-ui/icons";
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
      window.alert("아이디 혹은 비밀번호를 입력하지 않으셨습니다.");
      return false;
    }
    dispatch(userActions.loginAPI(email, pwd));
  };

  const onSocialLogin = () => {
    // 소셜로그인을 하면 token이 url에 담겨서 오는데,
    // url에서 token을을 추출하는 함수()
    const getUrlParameter = (name) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    const _jwt = getUrlParameter("token"); // _jwt: 소셜로그인으로 받아온 토큰
    const _nickname = getUrlParameter("nickname"); // _nickname: 소셜로그인으로 받아온 닉네임
    const error = getUrlParameter("error"); // 에러
    console.log(_jwt);
    console.log(_nickname);
    console.log(error);

    //  소셜로그인 시 실행
    //  소셜로그인 시 실행
    if (_jwt && _nickname) {
      localStorage.setItem("nickname", _nickname);
      localStorage.setItem("jwt", _jwt);
      dispatch(userActions.setUser());
    }
  };

//   $(document).ready( function() {

//      $('.login-naver').click(function() {
//         naverLogin();
//     });

//     $('.login-kakao').click(function() {
//         kakaoLogin();
//     });

//     $('.login-google').click(function() {
//         googleLogin();
//     });
// });

  return (
    <React.Fragment>
      <Container>
        <Title>Login</Title>
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

        <div>
          <SocialBtn
            bg="#1ec800"
            color="#ffffff"
            onClick={() => {
              window.location.href =
                "http://13.125.97.117/oauth2/authorize/naver?redirect_uri=http://localhost:3000/";
              // onSocialLogin();
            }}
          >
              <SocialIcon width="45%" src={naver}/>
          </SocialBtn>
          <SocialBtn
            bg="#fee500"
            onClick={() => {
              window.location.href =
              "http://13.125.97.117/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/";
              // onSocialLogin();
            }}
          >
             <SocialIcon width="52%" src={kakao}/>
          </SocialBtn>
          <SocialBtn
            bg="#f45a5c"
            color="#ffffff"
            onClick={() => {
              window.location.href =
              "http://13.125.97.117/oauth2/authorize/google?redirect_uri=http://localhost:3000/";
              // onSocialLogin();
            }}
          >
            <SocialIcon width="50%" src={google}/>
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

const SocialIcon = styled.img`
  ${(props) => (props.width ? `color:${props.width};` : "")}
  
`;

export default Login;
