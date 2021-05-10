import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import { config } from "../../shared/config";
import _ from "lodash";

const SET_QNA = "SET_QNA";
const ADD_QNA = "ADD_QNA";
const EDIT_QNA = "EDIT_QNA";
const DELETE_QNA = "DELETE_QNA";

const setQna = (SET_QNA, (list) => ({ list }));
const addQna = (ADD_QNA, (qna) => ({ qna }));
const editQna = (EDIT_QNA, (qna) => ({ qna }));
const deleteQna = (DELETE_QNA, (id) => ({ id }));

const initialState = {
  list: [],
};

const getQnaAPI = (start = null, size = null) => {
  console.log("getQnaAPI");
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `${config.api}/qna?page={page}&size={size}`,
    })
      .then((res) => {
        console.log(res.data.data);
        // let qna_list = [];
        // res.data.data.forEach((_qna) => {
        //   let post = {
        //     id: _.qna.id,
        //     title: _qna.title,
        //     contents: _qna.contents,
        //   };
        //   qna_list.push(post);
        // });
        // dispatch(setQna(qna_list));
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
        if(res.status===200)
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
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data.data);
        let _qna = res.data.data;
        let qna = {
          title: _qna.title,
          contents: _qna.contents,
        };
        dispatch(editQna(qna, qnaId));
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
    draft.list = action.payload.qna_list;
      draft.list = draft.list.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1 ){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, []);
      }),
    [ADD_QNA]: (state, action) => 
      produce(state, (draft) => {
        draft.list.unshift(action.payload.qna);
      }),
    [EDIT_QNA]: (state, action) => 
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.qnaId)
      draft.list[idx] = {...draft.list[idx], ...action.payload.qna}
      }),
    [DELETE_QNA]: (state, action) => 
      produce(state, (draft) => {
        draft.list = draft.list.filter((q) => {
          if (q.id !== action.payload.qnaId) {
            return [...draft.list, q];
          }
        });
      }),
  },
  initialState
);
const actionCreators = {
  getQnaAPI,
  addQna,
  addQnaAPI,
  setQna,
  editQna,
  editQnaAPI,
  deleteQna,
};

export { actionCreators };
