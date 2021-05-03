import React from "react";
import styled from "styled-components";

import { Grid, Text, Button, Input } from "../../elements/index";
import { actionCreators as userActions } from "../../redux/modules/user";

import { history } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  // 일반 로그인
  const onLogin = () => {
    if (email === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호를 입력하지 않으셨습니다.");
      return;
    }
    dispatch(userActions.loginAPI(email, pwd));
  };

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

        <BorderBtn bg="grey" onClick={onLogin}>
          로그인하기
        </BorderBtn>
        <Grid padding="10px">
          <TextBtn onClick={() => history.push("/findemailpwd")}>
            이메일/비밀번호 찾기
          </TextBtn>
        </Grid>
        <Grid padding="10px">
          <TextBtn onClick={() => history.push("/signup")}>
            회원가입 하러가기
          </TextBtn>
        </Grid>
        <SolidBtn bg="#1ec800" color="#ffffff">
          네이버 아이디로 로그인
        </SolidBtn>
        <SolidBtn bg="#fee500">카카오 로그인</SolidBtn>
        <SolidBtn bg="#f45a5c" color="#ffffff">
          Google 로그인
        </SolidBtn>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 30%;
  height: 70%;
  margin: auto;
  padding: 80px 50px;
  border: none;
  text-align: center;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-size: 1.5vw;
  font-weight: 600;
  text-align: center;
  color: #343a40;
`;

const InputStyle = styled.input`
  border: none;
  width: 100%;
  height: 30px;
  border-bottom: 1px grey solid;
  margin: 10px auto;
  padding: 4px;
  font-size: 1vw;
  font-weight: 500;
  color: grey;
  :focus {
    outline: none;
  }
  cursor: pointer;
`;

const SolidBtn = styled.button`
  border: none;
  width: 102%;
  min-height: 50px;
  max-height: 70px;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 6px auto;
  font-size: 1vw;
  font-weight: 500;
  ${(props) => (props.color ? `color:${props.color};` : "")}
  ${(props) => (props.bg ? `background-color:${props.bg};` : "")}
  :focus {
    outline: none;
  }
  &:hover {
    color: grey;
    background-color: lightgrey;
    cursor: pointer;
  }
`;

const BorderBtn = styled.button`
  width: 100%;
  min-height: 50px;
  max-height: 70px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 8px auto;
  font-size: 1vw;
  font-weight: 500;
  color: grey;
  background-color: #ffffff;
  :focus {
    outline: none;
  }
  &:hover {
    color: grey;
    background-color: lightgrey;
    border: none;
    cursor: pointer;
  }
`;

const TextBtn = styled.text`
  font-size: 0.8vw;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Login;
