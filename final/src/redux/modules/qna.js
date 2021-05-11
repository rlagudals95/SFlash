import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import { config } from "../../shared/config";
import _ from "lodash";

const SET_QNA = "SET_QNA";
const SET_QNA_DETAIL = "SET_QNA_DETAIL";
const ADD_QNA = "ADD_QNA";
const EDIT_QNA = "EDIT_QNA";
const DELETE_QNA = "DELETE_QNA";
const ADD_QNA_COMMENT = "ADD_QNA_COMMENT";

const setQna = createAction(SET_QNA, (qna_list) => ({ qna_list }));
const setQnaDetail = createAction(SET_QNA_DETAIL, (qna) => ({ qna }));
const addQna = createAction(ADD_QNA, (qna) => ({ qna }));
const editQna = createAction(EDIT_QNA, (qna) => ({ qna }));
const deleteQna = createAction(DELETE_QNA, (id) => ({ id }));
const addQnaComment = createAction(ADD_QNA_COMMENT, (comment,qnaId) => ({ comment, qnaId }));

const initialState = {
  list: [],
  qna: [],
};

const getQnaAPI = (page = 1, size = 10) => {
  console.log("getQnaAPI");
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/qna?page=${page}&size=${size}`,
    })
      .then((res) => {
        console.log(res);
        let qna_list = [];
        res.data.data.forEach((_qna) => {
          let qna = {
            id: _qna.id,
            title: _qna.title,
            content: _qna.content,
            writer: _qna.writer,
            modified: _qna.modified.split("T")[0],
          };
          qna_list.push(qna);
          console.log(qna_list);
        });
        dispatch(setQna(qna_list));
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const getQnaDetailAPI = (qnaId) => {
  console.log("qnaId:", qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/qna/${qnaId}/detail`,
    })
      .then((res) => {
        console.log(res.data.data);
        let _qna = res.data.data;
        let qna = {
          id: _qna.id,
          title: _qna.title,
          content: _qna.content,
          modified: _qna.modified.split("T")[0],
          writer: _qna.writer,
          qcomments: _qna.qcomments,
        };
        console.log(qna);
        dispatch(setQnaDetail(qna));
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const addQnaAPI = (qna) => {
  console.log("addQnaAPI", qna);
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `${config.api}/qna`,
      data: qna,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200)
          window.alert("문의 내용이 정상적으로 등록되었습니다.");
        history.goBack();
        // dispatch(getQnaAPI());
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const editQnaAPI = (qna, qnaId) => {
  console.log("editQnaAPI", qna, qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "PUT",
      url: `${config.api}/qna/${qnaId}`,
      data: qna,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        let _qna = res.data.data;
        let qna = {
          title: _qna.title,
          content: _qna.content,
        };
        dispatch(editQna(qna, qnaId));
        window.alert("게시물이 수정되었습니다.");
        history.goBack();
      })
      .catch((err) => {
        console.error("작성 실패", err);
      });
  };
};

const deleteQnaAPI = (qnaId) => {
  console.log("deleteQnaAPI", qnaId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "DELETE",
      url: `${config.api}/qna/${qnaId}`,
      headers: {
        "X-AUTH-TOKEN": `${config.jwt}`,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        dispatch(deleteQna(qnaId));
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

export default handleActions(
  {
    [SET_QNA]: (state, action) =>
      produce(state, (draft) => {
        console.log("오 이제 나온다");
        draft.list = action.payload.qna_list;
        // draft.list = draft.list.reduce((acc, cur) => {
        //   if(acc.findIndex(a => a.id === cur.id) === -1 ){
        //     return [...acc, cur];
        //   }else{
        //     acc[acc.findIndex((a) => a.id === cur.id)] = cur;
        //     return acc;
        //   }
        // }, []);
      }),
    [SET_QNA_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.qna = action.payload.qna;
        // draft.list = draft.list.reduce((acc, cur) => {
        //   if(acc.findIndex(a => a.id === cur.id) === -1 ){
        //     return [...acc, cur];
        //   }else{
        //     acc[acc.findIndex((a) => a.id === cur.id)] = cur;
        //     return acc;
        //   }
        // }, []);
      }),
    [ADD_QNA]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.qna);
      }),
    [EDIT_QNA]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.qnaId);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.qna };
      }),
    [DELETE_QNA]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((q) => {
          if (q.id !== action.payload.qnaId) {
            return [...draft.list, q];
          }
        });
      }),
      [ADD_QNA_COMMENT]: (state, action) => 
      produce(state, (draft) => {
        draft.list.unshift(action.payload.qna);
      }),
  },
  initialState
);
const actionCreators = {
  getQnaAPI,
  getQnaDetailAPI,
  addQna,
  addQnaAPI,
  setQna,
  setQnaDetail,
  editQna,
  editQnaAPI,
  deleteQna,
  deleteQnaAPI,
  addQnaComment,
  addQnaCommentAPI,
};

export { actionCreators };
