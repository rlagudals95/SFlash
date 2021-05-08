import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { actionCreators as PostActions } from "./post";

const SET_PREVIEW = "SET_PREVIEW";
const GET_PREVIEW = "GET_PREVIEW";
const GET_FILE = "GET_FILE";
const DELETE_PREVIEW = "DELETE_PREVIEW";
const DELETE_FILE = "DELETE_FILE";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getPreview = createAction(GET_PREVIEW, (preview) => ({ preview }));
const getFile = createAction(GET_FILE, (file) => ({ file }));
const deletePreview = createAction(DELETE_PREVIEW, (preview) => ({ preview }));
const deleteFile = createAction(DELETE_FILE, (file) => ({ file }));
// props의 이미지들을 지워줘야하는데..... 이걸 어디다 저장 해두냐,,?!
const initialState = {
  preview: ["http://via.placeholder.com/400x300"],
  file: [],
};

const deleteImg = (board_id, imgNum) => {
  return function (dispatch, getState) {
    // console.log("object");
    // console.log("삭제하려는 보드", board_id);
    // console.log("삭제하려는 이미지 번호", imgNum);
    const post_list = getState().post.list;

    let idx = post_list.findIndex((p) => p.id === board_id);
    const editPost = post_list[idx];

    console.log("고쳐야할 포스트", editPost);
    console.log("내가 삭제할 이미지??", editPost.img_url);

    const deleteImg = editPost.img_url[imgNum];
    let deleteOk = [];
    for (let i = 0; i < editPost.img_url.length; i++) {
      if (editPost.img_url[i].imgUrl !== editPost.img_url[imgNum].imgUrl) {
        deleteOk.push(editPost.img_url[i]);
      }
    }

    if (deleteOk) {
      console.log(deleteOk);
    } //여기 까지해서 이미지 삭제? 필터링 완료 여기서 바꾸고자 하는 포스트의 img 배열을 딜리트 ok로 바꾸면된다

    if (deleteOk.length == 0) {
      // editPost.img_url = deleteOk;
      console.log("다 삭제됨", deleteOk);
    } else {
      editPost.img_url = deleteOk;
      console.log(editPost);
    }

    // 이제 포스트리스트 안에서
    // console.log("포스트 리스트 뽑자", post_list);

    dispatch(PostActions.editPost(board_id, editPost)); // 보드 id와 바꾸려는 보드가 들어가야함
    // 여기서 이미지를 뽑아서 받은 이미지와 같으면 삭제
    // 그리고 dispatch 셋포스트로 다시 게시물 처리!
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
          if (r !== "http://via.placeholder.com/400x300") {
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
    [DELETE_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            // console.log(r.id);
            return [...draft.list, r];
          }
        });
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  getPreview,
  getFile,
  deleteImg,
};

export { actionCreators };
