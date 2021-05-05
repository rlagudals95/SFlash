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
import Search from "@material-ui/icons/Search";

function App() {
  const dispatch = useDispatch();
  const jwt = getCookie("jwt"); // is_login 이라는 키값을 가진 토큰 가져와라
  const is_cookie = jwt ? true : false; // 그리고 is_cookie로 토큰 유무판단
  const is_login = useSelector((state) => state.user.is_login);

  const getUrlParameter =(name)=> {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
  const token = getUrlParameter('token');
  const error = getUrlParameter('error');
  console.log(token);
  console.log(error);

  // if(token) {
  //   setCookie("jwt", token)}
//     return <Redirect to={{
//         pathname: "/profile",
//         state: { from: this.props.location }
//     }}/>; 
// } else {
//     return <Redirect to={{
//         pathname: "/login",
//         state: { 
//             from: this.props.location,
//             error: error 
//         }
//     }}/>; 
// }
// }

  React.useEffect(() => {
      if(token) {
    setCookie("jwt", token)}
    if (is_cookie) {
      console.log("로그인 체크", is_login);
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
            <Route path="/faq" exact component={Faq} />
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
