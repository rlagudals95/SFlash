import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import { config } from "../../shared/config";
import _ from "lodash";

const SET_QNA_COMMENT = "SET_QNA_COMMENT";
const ADD_QNA_COMMENT = "ADD_QNA_COMMENT";
const DELETE_QNA_COMMENT = "DELETE_QNA_COMMENT";

const setQnaComment = createAction(SET_QNA_COMMENT, (comment_list) => ({ comment_list }));
const addQnaComment = createAction(ADD_QNA_COMMENT, (comment,qnaId) => ({ comment, qnaId }));
const deleteQnaComment = createAction(DELETE_QNA_COMMENT, (qcommentId) => ({ qcommentId }));

const initialState = {
  list: [],
};

const getQnaCommentAPI = (qnaId) => {
  console.log("qnaId:", qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/qna/${qnaId}/detail`,
    })
      .then((res) => {
        let comment_list = res.data.data.qcomments;
        console.log("comment_list", comment_list);

        dispatch(setQnaComment(comment_list));
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const addQnaCommentAPI = (comment, qnaId) => {
  console.log("addQnaCommentAPI", comment, qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/qcomment/${qnaId}`,
      data: {
        content: comment,
      },
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => {
        console.log(res);
        // let _qcomment = res.
        // dispatch(addQnaComment());
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const editQnaCommentAPI = (comment, qcommentId, qnaId) => {
  console.log("addQnaCommentAPI", comment, qcommentId, qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "PUT",
      url: `${config.api}/qcomment/${qcommentId}/qna/${qnaId}`,
      data: {
        content: comment,
      },
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        // let _qcomment = res.
        // dispatch(addQnaComment());
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const deleteQnaCommentAPI = (qcommentId, qnaId) => {
  //이 아이디는 코멘트 id
  console.log("댓글 id", qcommentId, qnaId);
  return function (dispatch) {
    axios({
      method: "DELETE",
      url: `${config.api}/qcomment/${qcommentId}/qna/${qnaId}`, //서버에서 지우고
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deleteQnaComment(qcommentId)); //화면에 반영시키기 위해 바로 렌더링 시켜주기
      })
      .catch((err) => {
        window.alert("댓글 삭제에 문제가 있어요!");
      });
  };
};

export default handleActions(
  {   
      [SET_QNA_COMMENT]: (state, action) => 
      produce(state, (draft) => {
        console.log(action.payload.comment_list);
        draft.list = action.payload.comment_list;
      }),
      [ADD_QNA_COMMENT]: (state, action) => 
      produce(state, (draft) => {
        draft.list.unshift(action.payload.qna);
      }),
      [DELETE_QNA_COMMENT]: (state, action) => 
      produce(state, (draft) => {
        // draft 리스트에 받은 qcommentId 와 같은 것을 삭제해준다.
        let idx = draft.list.findIndex((c)=>c.id === action.payload.qcommentId)
        if(idx !== -1){
          draft.list.splice(idx, 1)
        }
      }),
  },
  initialState
);


const actionCreators = {
  getQnaCommentAPI,
  setQnaComment,
  addQnaComment,
  addQnaCommentAPI,
  deleteQnaCommentAPI,
};

export { actionCreators };
