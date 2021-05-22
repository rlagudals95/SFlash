// 이미지 데이터를 관리하는 모듈 파일
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// Action
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const UPLOADING = "UPLOADING"; //업로드 여부
const SET_PREVIEW = "SET_PREVIEW"; // 일반 이미지(사용자 프로필 이미지 제외) 보여주는 액션
const PROFILE_PREVIEW = "PROFILE_PREVIEW"; // 사용자 프로필 이미지를 보여주는 액션

// Action creators
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const profilePreview = createAction(PROFILE_PREVIEW, (profile_preview) => ({
  profile_preview,
}));

const initialState = {
  preview: null,
  is_uplaoding: false,
  profile_preview: null,
};

// reducer
export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),

    [PROFILE_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.profile_preview = action.payload.profile_preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  uploading,
  setPreview,
  profilePreview,
};

export { actionCreators };
