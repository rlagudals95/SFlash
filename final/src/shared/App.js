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
import Cafe from "../pages/Category/Cafe";
import Faq from "../pages/Faq";
import HelpList from "../pages/HelpList";
import HelpDetail from "../pages/HelpDetail";
import HelpWrite from "../pages/HelpWrite";
import Search from "@material-ui/icons/Search";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")? true : false; // 로컬스토리지에 저장되어있는 jwt 토큰 유무판단

  // 소셜로그인을 하면 token이 url에 담겨서 오는데,
  // url에서 token을을 추출하는 함수()
  const getUrlParameter =(name)=> {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
  const _jwt = getUrlParameter('token');   // _jwt: 소셜로그인으로 받아온 토큰
  const _nickname = getUrlParameter('nickname');   // _nickname: 소셜로그인으로 받아온 닉네임
  const error = getUrlParameter('error');    // 에러
  // console.log(_jwt);
  // console.log(_nickname);
  // console.log(error);

  React.useEffect(() => {
  //  소셜로그인 시 실행
  if( _jwt && _nickname ){
  localStorage.setItem("jwt", _jwt);
  localStorage.setItem("nickname", _nickname);
  dispatch(userActions.loginCheck(_jwt));
  }else if(jwt) {
    dispatch(userActions.loginCheck(jwt));
  }//렌더링 마다 로그인체크
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
            <Route path="/faq" exact component={Faq} />
            <Route path="/help" exact component={HelpList} />
            {/* detail과 write는 이후에 /:id로 업데이트 */}
            <Route path="/helpdetail" exact component={HelpDetail} />
            <Route path="/helpwrite" exact component={HelpWrite} />
            <Route component={NotFound} />
            {/* 밑에서 부턴 카테고리별 페이지 */}
            <Route path="/cafe" exact component={Cafe} />
          </Switch>
        </ScrollToTop>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
