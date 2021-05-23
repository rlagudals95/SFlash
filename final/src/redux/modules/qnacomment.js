import { createAction, handleActions } from "redux-actions";
import { actionCreators as userActions } from "./user";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import { config } from "../../shared/config";
// import _ from "lodash";
import Swal from "sweetalert2";

const SET_QNA_COMMENT = "SET_QNA_COMMENT";
const ADD_QNA_COMMENT = "ADD_QNA_COMMENT";
const SET_EDIT_COMMENT_MODE = "SET_EDIT_COMMENT_MODE";
const EDIT_QNA_COMMENT = "EDIT_QNA_COMMENT";
const DELETE_QNA_COMMENT = "DELETE_QNA_COMMENT";

const setQnaComment = createAction(SET_QNA_COMMENT, (comment_list) => ({
  comment_list,
}));
const setEditCommentMode = createAction(SET_EDIT_COMMENT_MODE, (idx) => ({
  idx,
}));
const editQnaComment = createAction(EDIT_QNA_COMMENT, (qcommentId) => ({
  qcommentId,
}));
const addQnaComment = createAction(ADD_QNA_COMMENT, (qcomment) => ({
  qcomment,
}));
const deleteQnaComment = createAction(DELETE_QNA_COMMENT, (qcommentId) => ({
  qcommentId,
}));

const initialState = {
  list: [],
  idx: "",
};

const getQnaCommentAPI = (qnaId) => {
  // console.log("qnaId:", qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/qna/${qnaId}/detail`,
    })
      .then((res) => {
        let comment_list = res.data.data.qcomments;
        // console.log("comment_list", comment_list);

        dispatch(setQnaComment(comment_list));
      })
      .catch((err) => {
        console.error("댓글 업로드 실패", err);
      });
  };
};

const addQnaCommentAPI = (comment, qnaId) => {
  // console.log("addQnaCommentAPI", comment, qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/qcomment/${qnaId}`,
      data: {
        content: comment,
      },
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res.data.data);

        if (res.data.message === "tokenExpired") {
          dispatch(userActions.logOut());
          Swal.fire({
            text: "로그인 기간이 만료되어 재로그인이 필요합니다 :)",
            confirmButtonText: "로그인 하러가기",
            confirmButtonColor: "#ffb719",
            showCancelButton: true,
            cancelButtonText: "취소",
            cancelButtonColor: "#eee",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          });
        } else {
          let _qcomment = res.data.data;
          let qcomment = {
            id: _qcomment.id,
            writer: _qcomment.writer,
            content: _qcomment.content,
            modified: _qcomment.modified,
          };
          dispatch(addQnaComment(qcomment));
        }
      })
      .catch((err) => {
        console.error("댓글 작성 실패", err);
        Swal.fire({
          text: "댓글 작성에 문제가 있습니다.",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

const editCommentMode = (idx) => {
  // console.log(idx);
  return function (dispatch, getState, { history }) {
    dispatch(setEditCommentMode(idx));
  };
};

const editQnaCommentAPI = (comment, qcommentId, qnaId) => {
  // console.log("addQnaCommentAPI", comment, qcommentId, qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "PUT",
      url: `${config.api}/qcomment/${qcommentId}/qna/${qnaId}`,
      data: {
        content: comment,
      },
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        // console.log(res.data.data);

        if (res.data.message === "tokenExpired") {
          dispatch(userActions.logOut());
          Swal.fire({
            text: "로그인 기간이 만료되어 재로그인이 필요합니다 :)",
            confirmButtonText: "로그인 하러가기",
            confirmButtonColor: "#ffb719",
            showCancelButton: true,
            cancelButtonText: "취소",
            cancelButtonColor: "#eee",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          });
        } else {
          let _qcomment = res.data.data;
          let qcomment = {
            id: _qcomment.id,
            writer: _qcomment.writer,
            content: _qcomment.content,
            modified: _qcomment.modified,
          };
          dispatch(editQnaComment(qcomment));
        }
      })
      .catch((err) => {
        console.error("댓글 수정 실패", err);
        Swal.fire({
          text: "댓글을 수정할 수 없습니다.",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

const deleteQnaCommentAPI = (qcommentId, qnaId) => {
  //이 아이디는 코멘트 id
  // console.log("댓글 id", qcommentId, qnaId);
  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `${config.api}/qcomment/${qcommentId}/qna/${qnaId}`, //서버에서 지우고
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        // console.log(res);

        if (res.data.message === "tokenExpired") {
          dispatch(userActions.logOut());
          Swal.fire({
            text: "로그인 기간이 만료되어 재로그인이 필요합니다 :)",
            confirmButtonText: "로그인 하러가기",
            confirmButtonColor: "#ffb719",
            showCancelButton: true,
            cancelButtonText: "취소",
            cancelButtonColor: "#eee",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          });
        } else {
          dispatch(deleteQnaComment(qcommentId)); //화면에 반영시키기 위해 바로 렌더링 시켜주기
        }
      })
      .catch((err) => {
        Swal.fire({
          text: "댓글을 삭제하실 수 없습니다!",
          confirmButtonColor: "#ffb719",
        });
      });
  };
};

export default handleActions(
  {
    [SET_QNA_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.comment_list);
        draft.list = action.payload.comment_list;
      }),
    [SET_EDIT_COMMENT_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.idx = action.payload.idx;
      }),
    [EDIT_QNA_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.splice(draft.idx, 1, action.payload.qcomment);
      }),
    [ADD_QNA_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.qcomment);
      }),
    [DELETE_QNA_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // draft 리스트에 받은 qcommentId 와 같은 것을 삭제해준다.
        let idx = draft.list.findIndex(
          (c) => c.id === action.payload.qcommentId
        );
        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
  },
  initialState
);

const actionCreators = {
  getQnaCommentAPI,
  setQnaComment,
  editCommentMode,
  editQnaComment,
  editQnaCommentAPI,
  addQnaComment,
  addQnaCommentAPI,
  deleteQnaCommentAPI,
};

export { actionCreators };
