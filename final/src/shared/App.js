import "../App.css";
import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { setCookie, getCookie } from "./Cookie";

import Signup from "../pages/Login&Signup/Signup";
import Login from "../pages/Login&Signup/Login";
import FindEmailPwd from "../pages/Login&Signup/FindEmailPwd";
import EditPwd from "../pages/Login&Signup/EditPwd";
import PostList from "../pages/PostList";
import Main from "../pages/Main";
import Story from "../pages/Story";
import NotFound from "../pages/NotFound";
import SideNav from "../components/SideNav";
import ScrollToTop from "./ScrollToTop"; //페이지 넘길때 스크롤 맨위로 초기화(무한 스크롤 때문에 필요함)

import About from "../pages/About";
import Faq from "../pages/Faq";
import QnaList from "../pages/QnaList";
import QnaDetail from "../pages/QnaDetail";
import QnaWrite from "../pages/QnaWrite";
import Search from "@material-ui/icons/Search";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt") ? true : false; // 로컬스토리지에 저장되어있는 jwt 토큰 유무판단
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
  const social_jwt = getUrlParameter("accessToken"); // social_jwt: 소셜로그인으로 받아온 토큰
  const social_refreshjwt = getUrlParameter("refreshToken"); // social_jwt: 소셜로그인으로 받아온 토큰
  const social_nickname = getUrlParameter("nickname"); // _nickname: 소셜로그인으로 받아온 닉네임
  const social_userId = getUrlParameter("userId"); // _nickname: 소셜로그인으로 받아온 닉네임
  const error = getUrlParameter("error"); // 에러
  console.log(social_refreshjwt);
  console.log(social_jwt);
  console.log(social_userId);
  console.log(social_nickname);
  // console.log(error);

  React.useEffect(() => {
    //  소셜로그인 시 실행
    if (social_jwt) {
      localStorage.setItem("jwt", social_jwt);
      localStorage.setItem("refreshjwt", social_refreshjwt);
      localStorage.setItem("nickname", social_nickname);
      localStorage.setItem("userId", social_userId);
      dispatch(userActions.loginCheck(social_jwt));
    } else if (jwt || social_jwt) {
      dispatch(userActions.loginCheck(jwt));
    } //렌더링 마다 로그인체크
   
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <SideNav></SideNav>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/findemailpwd" exact component={FindEmailPwd} />
            <Route path="/editpwd" exact component={EditPwd} />
            <Route path="/postlist" exact component={PostList} />
            <Route path="/story/:id" exact component={Story} />
            <Route path="/about" exact component={About} />
            <Route path="/faq" exact component={Faq} />
            <Route path="/qna" exact component={QnaList} />
            <Route path="/qnadetail/:id" exact component={QnaDetail} />
            <Route path="/qnawrite" exact component={QnaWrite} />
            <Route path="/qnawrite/:id" exact component={QnaWrite} />
            <Route component={NotFound} />
            {/* 밑에서 부턴 카테고리별 페이지 */}
          </Switch>
        </ScrollToTop>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
