import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { actionCreators as PostActions } from "./post";
import { conforms, result } from "lodash";

const SET_PREVIEW = "SET_PREVIEW";
const GET_PREVIEW = "GET_PREVIEW";

//게시글 작성중 업로드 모닫을 닫을 시 초기화하는 액션

const RESET_PREVIEW = "RESET_PREVIEW";

const GET_FILE = "GET_FILE";
const DELETE_PREVIEW = "DELETE_PREVIEW";
const DELETE_FILE = "DELETE_FILE";
// 사진 수정 액션들
const GET_EDIT_POST = "GET_EDIT_POST";
const EDIT_POST = "EDIT_POST";

const CHANGE_IMG = "CHANGE_IMG";
/////////
const GET_IMAGE = "GET_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";
// 수정할때 삭제된 이미지 ID들을 관리하는 액션
const GET_DELETE_ID = "GET_DELETE_ID";
// 수정할때 삭제된 파일들을 관리하는 액션
const GET_EDIT_FILE = "GET_EDIT_FILE";
// 수정시 이미지를 추가할 때 필요한 액션
const ADD_EDIT_IMAGE = "ADD_EDIT_IMAGE";
// 수정시 수정전의 파일 말고 이미지를 구별해서 삭제할때 필요한 액션 // 음 둘다 가능할 것 같다 해보자! 수정전과 수정할때 둘다!
const DELETE_FILE_IDX = "DELETE_FILE_IDX";
// 올라간 파일이 맘에 안들어 다시 삭제하고 싶을때 하는 액션
const DELETE_EDIT = "DELETE_EDIT";
// 이미지 idx 로 지우기
const DELETE_IMAGE_IDX = "DELETE_IMAGE_IDX";
// 수정시 업로드한 이미지를 삭제할 때 idx값을 이용해 파일도 같이 삭제하기위해 이미지를 파일배열안에 넣어놓는다
const GET_IMAGE_TO_FILE = "GET_IMAGE_TO_FILE";
// 수정후에 수정시 사용한 리덕스 상태 값들 초기화
const RESET_EDIT = "RESET_EDIT";
// 파일만 따로 리셋 해보자
const RESET_FILE = "RESET_FILE";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getPreview = createAction(GET_PREVIEW, (preview) => ({ preview }));
const getFile = createAction(GET_FILE, (file) => ({ file }));
//게시글 작성중 업로드 모닫을 닫을 시 초기화하는 액션
const resetPreview = createAction(RESET_PREVIEW, (preview, file) => ({
  preview,
  file,
}));

const deleteImageIdx = createAction(DELETE_IMAGE_IDX, (idx) => ({ idx })); // 이건딱히,..,?

const deleteFileIdx = createAction(DELETE_FILE_IDX, (idx) => ({ idx }));

/////////////////////////////////
const getImage = createAction(GET_IMAGE, (image) => ({ image }));
// 고쳐야할 포스트의 img_url을 바꿔준다
const deleteImage = createAction(DELETE_IMAGE, (imgUrlId) => ({ imgUrlId }));
// 삭제한 이미지 아이디 저장
const getDeleteId = createAction(GET_DELETE_ID, (id) => ({ id }));
// 수정할때 삭제된 파일들을 관리하는 액션
const getEditFile = createAction(GET_EDIT_FILE, (edit_file) => ({ edit_file }));
// 수정시 이미지를 추가할 때 필요한 액션
const addEditImage = createAction(ADD_EDIT_IMAGE, (image) => ({ image }));
// 수정시 업로드한 이미지를 삭제할 때 idx값을 이용해 파일도 같이 삭제하기위해 이미지를 파일배열안에 넣어놓는다
const getImgToFile = createAction(GET_IMAGE_TO_FILE, (image) => ({ image }));
// 수정후에 수정시 사용한 리덕스 상태 값들 초기화
const resetEdit = createAction(RESET_EDIT, (edit) => ({ edit }));
// 파일만 따로 리셋 해보자
const resetFile = createAction(RESET_FILE, (edit) => ({ edit }));
//가져와서 post 에서 리스트 하나 가져와서 edit에 두고

const initialState = {
  preview: [
    "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/back_01.PNG?alt=media&token=e39ad399-6ef6-4e68-b046-e4a7c2072e36",
  ],
  file: [],
  edit: false, // 잘들어온다 //고쳐야할놈
  image: [], // 이미지를 따로 빼오자 // 이미지 x 클릭시 x 이미지를 제외한 배열이 들어옴 //이게 onlyImage
  id: [], //삭제한 id가 들어간 배열  // 게시 버튼과 동시에 초기화!
  //이것을 editPost의 img_url로 바꿔주고 setPost 해줘야 한다
  edit_file: [], //여기에 파일이 들어온다! //게시 버튼과 동시에 초기화
};

//요기서 수정해야하는 board를 찾아서 image에 저장해준다 image를 이용해 프리뷰를 뿌려주고 x 버튼으로 수정 해준다
const getPost = (board_id) => {
  return function (dispatch, getState) {
    console.log("hi");
    //여기선 고쳐야할 포스트를 찾아서 edit(draft)로 만들어주자
    const post_list = getState().post.list; // 일단 가져온다

    let idx = post_list.findIndex((p) => p.id === board_id);
    const editPost = post_list[idx]; //고쳐야할 포스트

    //여기서 이미지만 뽑아주면??

    const onlyImg = editPost.img_url;
    // dispatch(getEditPost(editPost));
    dispatch(getImage(onlyImg)); // 온리이미지르르..파일에도 넣자?

    // console.log("이미지들길이", onlyImg.length);
    // console.log("이미지들길이", onlyImg[0]);
    for (let i = 0; i < onlyImg.length; i++) {
      dispatch(getImgToFile(onlyImg[i]));
    }
  };
};

//edit을 이미지 url이 변경된 리스트로 바꿔줘야한다! 클릭할때 마다

const ChangeEdit = (Img_idx) => {
  return function (dispatch, getState) {
    const currentPost = getState().image2.edit; // 이미지가 바뀌기 전의 포스트

    const selectImg = currentPost.img_url[Img_idx].imgUrlId; // 요건 선택된 이미지 //선택된 이미지가 제외된 리스트를 만드렁주자

    const c = currentPost.img_url.filter((p) => {
      return selectImg !== p.imgUrlId;
    });

    console.log("??", c);
  };
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.push(action.payload.preview);
        draft.preview = draft.preview.reduce((acc, cur) => {
          if (acc.findIndex((a) => a === cur) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a === cur)] = null;
            return acc;
          }
        }, []);
      }),
    [GET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.push(action.payload.preview);

        draft.preview = draft.preview.filter((r) => {
          // 프리뷰 이미지를 걸러내주는 작업
          if (
            r !==
            "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/back_01.PNG?alt=media&token=e39ad399-6ef6-4e68-b046-e4a7c2072e36"
          ) {
            return [...draft.preview, r];
          }
        });
      }),
    [GET_FILE]: (state, action) =>
      produce(state, (draft) => {
        // draft.file = action.payload.file;
        draft.file.push(action.payload.file);
      }),
    [DELETE_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            // console.log(r.id);
            return [...draft.list, r];
          }
        });
      }),

    [GET_EDIT_POST]: (state, action) =>
      //여기서 고쳐야할 리스트를 받아온다
      produce(state, (draft) => {
        draft.edit = action.payload.edit;
      }),
    [EDIT_POST]: (state, action) =>
      //위에서 받아온 리스트를 바꾼 리스트로 바꿔준다
      produce(state, (draft) => {
        draft.edit = action.payload.edit;
      }),
    [GET_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image = action.payload.image;
      }),

    [CHANGE_IMG]: (state, action) => {
      produce(state, (draft) => {
        // draft.edit.img_url = action.payload.editImage;
      });
    },
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image = draft.image.filter((i, idx) => {
          if (i.imgUrlId !== action.payload.imgUrlId) {
            return [...draft.image, i];
          }
        });

        //아니면 여기서 idx만 받아서 삭제 할 수가 있나?
      }),
    [GET_DELETE_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.id.push(action.payload.id);
      }),
    [GET_EDIT_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.edit_file.push(action.payload.edit_file);
      }),
    [ADD_EDIT_IMAGE]: (state, action) =>
      //여기서 imgUrl:(파일리더로 읽은값,,,)이렇게 해줘야하나?
      produce(state, (draft) => {
        draft.image.push(action.payload.image);
      }),
    ////////idx로 한번 지워보자!
    [DELETE_IMAGE_IDX]: (state, action) =>
      produce(state, (draft) => {
        // 수정시 이미지 왼쪽상단의 삭제 버튼을 누르면 해당이미지의 idx값을 받아 이미지를 선택해 삭제
        draft.image = draft.image.filter((i, idx) => {
          if (i !== action.payload.idx) {
            return i;
          }
        });
      }),
    [DELETE_FILE_IDX]: (state, action) =>
      produce(state, (draft) => {
        console.log("파일지워야되", action.payload.idx); //이미지 리더 값이 나온다... 파일이랑 연관짓자
        // 처음엔 이미지 파일과 같이 들어있는 배열이온다
        //idx를 받으면 해당 패열에서 idx 받은 곳의 요소 1개를 삭제한다
        draft.edit_file.splice(action.payload.idx, 1);
      }),
    [GET_IMAGE_TO_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.edit_file.push(action.payload.image);
      }),

    //모든 상태값 초기화

    [RESET_EDIT]: (state, action) =>
      produce(state, (draft) => {
        // 혹시라도 다른 게시물을 연속으로 수정할 경우 전에 수정하던 데이터가 보여질 수 있으므로
        // 수정 버튼을 누르고 수정을 하고 나면 수정시 리덕스의 상태값을 모두 빈배열로 리셋 해준다

        draft.edit_file = action.payload.edit;
        draft.image = action.payload.edit;
        draft.id = action.payload.edit;
      }),

    [RESET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.editFile = action.payload.edit;
      }),

    [RESET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        console.log("프리뷰 초기화!", action.payload.preview);
        console.log("파일 초기화!", action.payload.file);
        draft.preview = action.payload.preview;
        draft.file = action.payload.file;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  getPreview,
  getFile,
  // deleteImg,
  getPost,
  ChangeEdit,
  deleteImage, //수정중 x 버튼을 누를때 이미지 사라지게 하기
  getDeleteId, //삭제된 이미지 아이디 가져오기
  getEditFile,
  addEditImage,
  deleteImageIdx, // idx로 지워보자
  deleteFileIdx, //idx로 지우자
  resetEdit,
  resetFile, // 파일만따로
  resetPreview,
};

export { actionCreators };
