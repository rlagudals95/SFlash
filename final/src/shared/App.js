import "../App.css";
import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
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
import MobileNot from "../pages/MobileNot";
import SideNav from "../components/SideNav";
import ScrollToTop from "./ScrollToTop"; //페이지 넘길때 스크롤 맨위로 초기화(무한 스크롤 때문에 필요함)

import About from "../pages/About/About";
import Faq from "../pages/Faq";
import QnaList from "../pages/QnaList";
import QnaDetail from "../pages/QnaDetail";
import QnaWrite from "../pages/QnaWrite";
import Swal from "sweetalert2";

console.log(
  // 소개 고양이 등장!
  "   ------------------------------------------------------\n\
  < Welcome to SFlash!! Come and Experience our service! >\n\
   ------------------------------------------------------\n\
                  /\\__/\\           \n\
                 /'    '\\          \n\
              ===  0  0  ===       \n\
                \\   --   /        \n\
                /        \\        \n\
               /          \\       \n\
              |            |      \n\
               \\  ||  ||  /       \n\
                \\_oo__oo_/#######o"
);

function App() {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const jwt = localStorage.getItem("jwt") ? true : false; // 로컬스토리지에 저장되어있는 jwt 토큰 유무판단
  const tokenExpires = localStorage.getItem("tokenExpires");

  React.useEffect(() => {
    if (Date.now() >  tokenExpires ) {
      return false;}
      else{
        Swal.fire({
          text: "로그인 기간이 만료되어 재로그인이 필요합니다 :)",
          confirmButtonText: "로그인 하러가기",
          confirmButtonColor: "#ffb719",
          showCancelButton: true,
          cancelButtonText: "취소",
          cancelButtonColor: "#eee",
        }).then((result) => {
          dispatch(userActions.logOut());
          if (result.isConfirmed) {
            history.push("/login");
          }
        });
      }

    if (jwt) {
      dispatch(userActions.loginCheck(jwt));
    } //렌더링 마다 로그인체크
  }, []);

  //모바일로 접속시 페이지 이동

  //Mobile여부를 구분하기 위함
  var uAgent = navigator.userAgent.toLowerCase();
  // 아래는 모바일 장치들의 모바일 페이지 접속을위한 스크립트
  var mobilePhones = new Array(
    "iphone",
    // "ipod",
    // "ipad",
    "android",
    "blackberry",
    "windows ce",
    "nokia",
    "webos",
    "opera mini",
    "sonyericsson",
    "opera mobi",
    "iemobile",
    "samsung",
    "lg"
  );
  for (var i = 0; i < mobilePhones.length; i++) {
    if (uAgent.indexOf(mobilePhones[i]) != -1) {
      // location.href = "/mobile/home/main.do";
      history.replace("/MobileNot");
    }
  }

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <SideNav></SideNav>
        {/* <SurveyButton
          className="blinking"
          onClick={() => window.open("https://forms.gle/SuRWZC7xw5qsBZtf6")}
        >
          기프티콘 이벤트 참여하기
        </SurveyButton> */}
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
            <Route path="/mobilenot" exact component={MobileNot} />
            <Route component={NotFound} />
            {/* 밑에서 부턴 카테고리별 페이지 */}
          </Switch>
        </ScrollToTop>
      </ConnectedRouter>
    </React.Fragment>
  );
}

// const SurveyButton = styled.div`
//   position: fixed;
//   right: 60px;
//   top: 49px;
//   border: none;
//   border-radius: 10px;
//   box-sizing: border-box;
//   margin: 10px auto;
//   padding: 15px 20px;
//   font-size: 1.3rem;
//   color: #ffffff;
//   font-weight: 400;
//   background-color: ${(props) => props.theme.main_color};
//   border: 2pt solid ${(props) => props.theme.main_color};
//   z-index: 500;
//   :focus {
//     outline: none;
//   }
//   &:hover {
//     font-weight: 400;
//     background-color: #ffffff;
//     color: ${(props) => props.theme.main_color};
//     border: 2pt solid ${(props) => props.theme.main_color};
//     cursor: pointer;
//     transition: ease-in-out, width 0.35s ease-in-out;
//     transform: translateY(-8px);
//     transition: all 200ms ease;
//     box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
//     animation: none;
//   }

//   -webkit-animation: blink 1s ease-in-out infinite alternate;
//   /* -moz-animation: blink 1s ease-in-out infinite alternate; */
//   animation: blink 1s ease-in-out infinite alternate;

//   @-webkit-keyframes blink {
//     0% {
//       opacity: 0.6;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
//   @-moz-keyframes blink {
//     0% {
//       opacity: 0.6;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
//   @keyframes blink {
//     0% {
//       opacity: 0.6;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
// `;

export default App;
