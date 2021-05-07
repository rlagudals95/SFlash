// 이미지 데이터를 관리하는 모듈 파일
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";

// Action
const GET_USER_INFO = "GET_USER_INFO";
const UPLOADING = "UPLOADING"; //업로드 여부
const SET_PREVIEW = "SET_PREVIEW"; // 사용자 프로필 이미지를 보여주는 액션
const EDIT_PROFILE = "EDIT_PROFILE";
const EDIT_NICKNAME = "EDIT_NICKNAME"
// const DUP_CHECK = "DUP_CHECK";

// Action creators
const getUserInfo = createAction(GET_USER_INFO, (user) => ({ user }));
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const editProfile = createAction(
  EDIT_PROFILE,
  (nickname, profileImg, introduction) => ({
    nickname,
    profileImg,
    introduction,
  })
);
const editNickname = createAction(EDIT_NICKNAME, (nickname) => nickname)
// const dupCheck = createAction(DUP_CHECK, (dupCheck) => ({ dupCheck }));

// initialState
// 리덕스에 저장되는 데이터 틀을 설정해놓는 부분
const initialState = {
  user: "",
  is_uplaoding: false,
  preview: null,
  dupCheck: false,
};

  // 해당유저의 정보 가져오기 : Story의 유저정보
  const getUserInfoAPI = (nickname) => {
    return function (dispatch, getState, { history }) {
      axios({
        method: "GET",
        url: `${config.api}/profile/${nickname}`,
        headers: {
          "X-AUTH-TOKEN": getCookie("jwt"),
        },
      }).then((res) => {
        console.log(res.data.data);
          let _user = res.data.data;
  
          let user = {
            userId : _user.userId,
            nickname: _user.nickname,
            profileImgUrl: _user.imgUrl,
            introduction: _user.introduceMsg,
          };
          console.log(user);
          dispatch(getUserInfo(user));
        })
        .catch((err) => {
          console.error("게시물을 가져오는데 문제가 있습니다", err);
        });
    };
  };


// 게시물 수정하기
const editProfileAPI = (profileImg, introduction) => {
  console.log(profileImg)
  console.log(introduction)
  return function (dispatch, getState, { history }) {
    const form_edit = new FormData();
    form_edit.append("profileFile", profileImg);
    form_edit.append("introduceMsg", introduction);
    console.log(form_edit);
    // const jwt = getCookie("token");

    axios({
      method: "PUT",
      url: `${config.api}/editmyprofile`,
      data: form_edit,
      headers: {
        "X-AUTH-TOKEN": getCookie("jwt"),
        "Content-Type" : "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data);
        let _user = res.data.data;
        let user = {
          profileImgUrl: _user.imgUrl,
          introduction: _user.introduceMsg,
        };
        dispatch(getUserInfo(user));
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const editNicknameAPI = (newNickname) => {
  console.log(newNickname);
  return function (dispatch, getState, { history }) {
    const API = `${config.api}/editnickname`
    axios.put(API, {
      nickname: newNickname,
    },
    {
      headers: {
      "X-AUTH-TOKEN": getCookie("jwt"),
    },
  })
      .then((res) => {
        console.log(res.data.data.nickname);
        let nickname = res.data.data.nickname;
        dispatch(editNickname(nickname));
        localStorage.setItem("nickname", res.data.data.nickname)
        // if(res.data.data.nickname === true){
        //   alert("닉네임이 변경되었습니다! :)")
        // }
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_uploading = action.payload.uplaoding;
      }),
    // SET_PREVIEW : 업로드한 사진을 보여주도록 처리한다.
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [EDIT_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.nickname;
      }),
  },
  initialState
);

// 이 모듈 파일에서 정의된 액션생성함수와 미들웨어 함수들을 한데 모은다.
const actionCreators = {
  
  getUserInfo,
  getUserInfoAPI,
  uploading,
  setPreview,
  editProfile,
  editProfileAPI,
  editNicknameAPI,
  editNickname,
};

// actionCreators로 묶은 함수들을
// 다른 컴포넌트 파일에서 쓸 수 있게 export 해준다.
export { actionCreators };
