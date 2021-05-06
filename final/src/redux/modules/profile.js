// 이미지 데이터를 관리하는 모듈 파일
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// Action
const UPLOADING = "UPLOADING"; //업로드 여부
const SET_PREVIEW = "SET_PREVIEW"; // 사용자 프로필 이미지를 보여주는 액션
const EDIT_PROFILE = "EDIT_PROFILE";
const EDIT_NICKNAME = "EDIT_NICKNAME"
// const DUP_CHECK = "DUP_CHECK";

// Action creators
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
  profileImgUrl: "",
  is_uplaoding: false,
  preview: null,
  dupCheck: false,
};


// 게시물 수정하기
const editProfileAPI = (profileImg, introduction) => {
  return function (dispatch, getState, { history }) {
    const form_edit = new FormData();
    form_edit.append("profileFile", profileImg);
    form_edit.append("introduceMsg", introduction);
    console.log(form_edit);
    // const jwt = getCookie("token");

    axios({
      method: "put",
      url: `${config.api}/editmyprofile`,
      data: form_edit,
      headers: {
        "X-AUTH-TOKEN": getCookie("jwt"),
        "Content-Type" : "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        // let profile = {
        //   profileImg: profileImg,
        //   introduction: introduction,
        // };
        // dispatch(editProfile(nickname, profile);
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
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_uploading = action.payload.uplaoding;
      }),
    // SET_PREVIEW : 업로드한 사진을 보여주도록 처리한다.
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        // indIndex: 배열 중에 (p) => 뒤에 조건에 맞는 idx를 찾아 준다)
        let idx = draft.list.findIndex(
          (u) => u.nickname === action.payload.nickname
        );
        // immer 에 스프레드 문법을 사용한 이유 :  수정할 때 이미지는 바꿀 수도 있고 안바꿀 수도 있는데
        // 그 상황을 굳이 if 문으로 나눠서 쓰지 않고  spread 문법을 사용해 유지하거나 수정시에만 내용이 반영되도록 한다.
        draft.list[idx] = { ...draft.list[idx], ...action.payload.profile };
      }),
    // [DUP_CHECK]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.dupCheck = action.payload.dupCheck;
    //   }),
    [EDIT_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.nickname;
      }),
  },
  initialState
);

// 이 모듈 파일에서 정의된 액션생성함수와 미들웨어 함수들을 한데 모은다.
const actionCreators = {
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
