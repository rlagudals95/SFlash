// 이미지 데이터를 관리하는 모듈 파일
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import axios from "axios";
import { config } from "../../shared/config";
import Swal from 'sweetalert2'

// Action
const GET_USER_INFO = "GET_USER_INFO";
const UPLOADING = "UPLOADING"; //업로드 여부
const SET_PREVIEW = "SET_PREVIEW"; // 사용자 프로필 이미지를 보여주는 액션
const EDIT_PROFILE = "EDIT_PROFILE";
const EDIT_NICKNAME = "EDIT_NICKNAME";

// Action creators
const getUserInfo = createAction(GET_USER_INFO, (user) => ({ user }));
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const editProfile = createAction(EDIT_PROFILE, (profile) => ({ profile }));
const editNickname = createAction(EDIT_NICKNAME, (nickname) => ({ nickname }));

// initialState
// 리덕스에 저장되는 데이터 틀을 설정해놓는 부분
const initialState = {
  user: "",
  is_uplaoding: false,
  preview: null,
};

// 해당유저의 정보 가져오기 : Story의 유저정보
const getUserInfoAPI = (userId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/profile/${userId}`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        // console.log(res.data.data);
        let _user = res.data.data;

        let user = {
          userId: _user.userId,
          nickname: _user.nickname,
          profileImgUrl: _user.imgUrl,
          introduction: _user.introduceMsg,
        };
        dispatch(getUserInfo(user));
      })
      .catch((err) => {
        console.error("게시물 로드 에러", err);
      });
  };
};

// 프로필 수정하기(두개의 경우의 수로 나누어 생각하기)
const editProfileAPI = (profile, userId) => {
  console.log(profile, userId);
  return function (dispatch, getState, { history }) {
    const _image = getState().profile.preview;
    const _user_info = getState().profile.user;

    // 1. 자기소개만 변경했을 때(이미지 변경 x)
    if (_image === _user_info.profileImgUrl) {
      const formData = new FormData();
      formData.append("introduceMsg", profile.introduction);
      console.log(formData);

      axios({
        method: "PUT",
        url: `${config.api}/editmyprofile/${userId}`,
        data: formData,
        headers: {
          "X-AUTH-TOKEN": `${config.jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res.data.data);
          let _user = res.data.data;
          let profile = {
            introduction: _user.introduceMsg,
          };
          dispatch(editProfile(profile));
        })
        .catch((err) => {
          console.error("작성 실패", err);
        });
    }
    // 2. 이미지 & 자기소개 모두 변경했을 때
    else {
      const formData = new FormData();
      formData.append("profileFile", profile.profileImg);
      formData.append("introduceMsg", profile.introduction);
      console.log(formData);
      // const jwt = getCookie("token");

      axios({
        method: "PUT",
        url: `${config.api}/editmyprofile/${userId}`,
        data: formData,
        headers: {
          "X-AUTH-TOKEN": `${config.jwt}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res.data.data);
          let _user = res.data.data;
          let profile = {
            profileImgUrl: _user.imgUrl,
            introduction: _user.introduceMsg,
          };
          dispatch(editProfile(profile));
        })
        .catch((err) => {
          console.error("작성 실패", err);
        });
    }
  };
};

const editNicknameAPI = (newNickname, userId) => {
  console.log(newNickname, userId);
  return function (dispatch, getState, { history }) {
    const API = `${config.api}/editnickname/${userId}`;
    axios
      .put(
        API,
        {
          nickname: newNickname,
        },
        {
          headers: {
            "X-AUTH-TOKEN": `${config.jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        let nickname = {
          nickname: res.data.data.nickname,
        };
        console.log("닉네임 수정 정보", nickname);
        // let nickname = res.data.data.nickname;
        dispatch(editNickname(nickname));
        if (res.data.data.nickname === true) {
          Swal.fire({
            text: '닉네임이 변경 되었습니다.',
            icon: 'success',
            confirmButtonText: '확인',
            confirmButtonColor:  "#ffb719",
          })
        }
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
    [EDIT_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.user = { ...draft.user, ...action.payload.profile };
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
        draft.user = { ...draft.user, ...action.payload.nickname };
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
