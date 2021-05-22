import { createAction, handleActions } from "redux-actions";
import { actionCreators as userActions } from "./user";
import { produce } from "immer";
import axios from "axios";
import Swal from "sweetalert2";
import { history } from "../configStore";
import { config } from "../../shared/config";
import _ from "lodash";
import { SignalCellularConnectedNoInternet0BarRounded } from "@material-ui/icons";

const SET_QNA = "SET_QNA";
const SET_QNA_DETAIL = "SET_QNA_DETAIL";
const ADD_QNA = "ADD_QNA";
const EDIT_QNA = "EDIT_QNA";
const DELETE_QNA = "DELETE_QNA";
const SET_TOTAL_LENGTH = "SET_TOTAL_LENGTH"

const setQna = createAction(SET_QNA, (qna_list) => ({ qna_list }));
const setQnaDetail = createAction(SET_QNA_DETAIL, (qna) => ({ qna }));
const addQna = createAction(ADD_QNA, (qna) => ({ qna }));
const editQna = createAction(EDIT_QNA, (qna) => ({ qna }));
const deleteQna = createAction(DELETE_QNA, (id) => ({ id }));
const setTotalLength = createAction(SET_TOTAL_LENGTH, (total_length) => ({ total_length }))

const initialState = {
  list: [],
  qna: [],
  total_length: ""
};

const getQnaAPI = (page, size) => {
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
            total_length: _qna.qnaSize
          };
          qna_list.push(qna);
          console.log(qna_list);
        });
        let total_length = qna_list[0].total_length;
        dispatch(setQna(qna_list));
        dispatch(setTotalLength(total_length));
      })
      .catch((err) => {
        console.error("문의 리스트 로드 실패", err);
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
        console.log(qna.content)
        console.log(typeof(qna.content))
        dispatch(setQnaDetail(qna));
      })
      .catch((err) => {
        console.error("문의하기 상세 업로드 실패", err);
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
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res);

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
        }else{
          Swal.fire({
            text: '문의 내용이 정상적으로 등록되었습니다 :)',
            confirmButtonColor: "#ffb719",
          })
          history.goBack();
        }
         
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
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res);

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
        }else{
          Swal.fire({
            text: '게시물이 수정되었습니다 :)',
            confirmButtonColor: "#ffb719",
          })
          history.replace(`/qnadetail/${qnaId}`)
        }
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
        "X-AUTH-TOKEN": localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log(res.data.data);

        if (res.data.message === "tokenExpired"){
          dispatch(userActions.logOut());
          Swal.fire({
            text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
            confirmButtonText: '로그인 하러가기',
            confirmButtonColor: '#ffb719',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: '#eee',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            }
          })
        }else{
          dispatch(deleteQna(qnaId));
          history.replace('/qna');
        }
      })
      .catch((err) => {
        Swal.fire({
          text: '게시물을 삭제할 수 없습니다.',
          confirmButtonColor: "#ffb719",
        })
      });
  };
};


export default handleActions(
  {
    [SET_QNA]: (state, action) =>
      produce(state, (draft) => {
        console.log("오 이제 나온다");
        draft.list = action.payload.qna_list;
      }),
    [SET_QNA_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.qna = action.payload.qna;
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
      [SET_TOTAL_LENGTH]: (state, action) => 
        produce(state, (draft) => {
          draft.total_length = action.payload.total_length ;
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
};

export { actionCreators };
