// 이미지 데이터를 관리하는 모듈 파일
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// Action
const UPLOAD_IMAGE = "UPLOAD_IMAGE";  
const UPLOADING = "UPLOADING";    //업로드 여부
const PROFILE_PREVIEW = "PROFILE_PREVIEW";  // 사용자 프로필 이미지를 보여주는 액션

// Action creators 
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const profilePreview = createAction(PROFILE_PREVIEW, (profile_preview) => ({profile_preview}));

// initialState
// 리덕스에 저장되는 데이터 틀을 설정해놓는 부분
const initialState = {
  image_url: "",
  preview: null,
  is_uplaoding: false,
  profile_preview: null,
}

// reducer
export default handleActions({
  // SET_PREVIEW : 업로드한 사진을 보여주도록 처리한다.

  [PROFILE_PREVIEW]: (state, action) => produce(state, (draft) => {
    draft.profile_preview = action.payload.profile_preview;
  }),

}, initialState);

// 이 모듈 파일에서 정의된 액션생성함수와 미들웨어 함수들을 한데 모은다.
const actionCreators = {
  uploadImage,
  uploading,
  profilePreview,
};

// actionCreators로 묶은 함수들을
// 다른 컴포넌트 파일에서 쓸 수 있게 export 해준다.
export { actionCreators };