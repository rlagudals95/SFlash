import "../App.css";
import React from "react";
import { Route, Switch} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import Signup from "../pages/Login&Signup/Signup";
import Login from "../pages/Login&Signup/Login";
import FindEmailPwd from "../pages/Login&Signup/FindEmailPwd";
import EditPwd from "../pages/Login&Signup/EditPwd";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";
import PostList from "../pages/PostList";
import Main from "../pages/Main";
import Story from "../pages/Story";
import NotFound from "../pages/NotFound";
import SideNav from "../components/SideNav";
import ScrollToTop from "./ScrollToTop"; //페이지 넘길때 스크롤 맨위로 초기화(무한 스크롤 때문에 필요함)

import About from "../pages/About/About";
import Faq from "../pages/Faq";
import QnaList from "../pages/QnaList";
import QnaDetail from "../pages/QnaDetail";
import QnaWrite from "../pages/QnaWrite";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt") ? true : false; // 로컬스토리지에 저장되어있는 jwt 토큰 유무판단


  React.useEffect(() => {
    if (jwt) {
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
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
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
