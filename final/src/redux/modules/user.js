import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configStore";
import axios from "axios";
import { config } from "../../shared/config";
import { setCookie, deleteCookie } from "../../shared/Cookie";

// actions
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

// actionCreators: createAction
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// initial State
const initialState = {
  user: "", //null
  is_login: false,
  profileImg: "",
};

//API요청(middleware actions)

// 회원가입
const signupAPI = (nickname, email, pwd, rePwd) => {
  return function (dispatch, getState, { history }) {
    // console.log(nickname, email, pwd, rePwd);

    axios
      .post("http://seungwook.shop/user/signup", {
        nickname: nickname,
        email: email,
        password: pwd,
        pwdchk: rePwd,
      })
      .then((res) => {
        console.log("signupAPI(res)", res);
        // dispatch(
        //   setUser({
        //     email: email,
        //     nickname: nickname,
        //   })
        // );
        window.alert("회원가입이 되었습니다!");
        history.push("/login");
      })
      .catch((err) => {
        window.alert("회원가입 실패");
        console.log("회원가입 실패:", err);
      });
  };
};

// 로그인
const loginAPI = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    console.log("로그인 값", email, pwd);
    axios
      .post("http://seungwook.shop/user/login", {
        email: email,
        password: pwd,
      })
      .then((res) => {
        // console.log("loginAPI(res)", res);
        localStorage.setItem("nickname", res.data.nickname);
        setCookie("token", res.data.token);
        dispatch(setUser(res.config.data));
        // axios.defaults.headers.common["token"] = `Bearer ${token}`;
        history.push("/");
        dispatch(getUser(res.data));
      })
      .then(() => {
        // window.location.reload(); // 새로고침 해서 유저 App.js의 useEffect실행 유저정보 가져오기
      })
      .catch((err) => {
        window.alert("로그인 실패", err);
        console.log("로그인 실패", err);
      });
  };
};

// 로그인 상태 확인 (페이지가 바뀔 때마다)
const loginCheckAPI = (token) => {
  return function (dispatch, getstate, { history }) {
    if (token) {
      // console.log(token);
      const option = {
        url: "",
        method: "GET",
        headers: {
          "Content-Type": "application/json;",
          "X-AUTH-TOKEN": `${token}`,
        },
      };
      axios(option)
        .then((res) => {
          console.log("loginCheck(res)", res);
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          if (error.response) {
            window.alert(error.response.data.errorMessage);
          }
        });
    } else {
      dispatch(logOutAPI());
      history.goBack();
    }
  };
};

// 로그아웃
const logOutAPI = () => {
  return function (dispatch) {
    dispatch(logOut());
    history.push("/");
  };
};

//해당유저의 정보 가져오기 : Story의 유저정보
const getUserInfoAPI = (nickname) => {
  return function (dispatch, getState, { history }) {
    const API = `http://13.125.167.83/story/${nickname}`;
    axios
      .get(API)
      .then((res) => {
        console.log(res.data);
        let doc = res.data.account;
        console.log(doc);

        // let user_info = [];
        let user = {
          nickname: doc.nickname,
          bio: doc.bio,
          profileImgUrl: doc.profileImgUrl,
          githubUrl: doc.githubUrl,
        };
        console.log(user);
        dispatch(setUser(user));
      })
      .catch((err) => {
        console.error("게시물을 가져오는데 문제가 있습니다", err);
      });
  };
};

// reducer: handleActions(immer를 통한 불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        localStorage.getItem("nickname");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("token");
        localStorage.removeItem("nickname");
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

// actionCreators export
const actionCreators = {
  setUser,
  getUser,
  logOut,
  signupAPI,
  loginAPI,
  loginCheckAPI,
  logOutAPI,
  getUserInfoAPI,
};

export { actionCreators };
