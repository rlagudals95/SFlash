import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

//마커를 누르면 상세모달창이 뜨는 것을 효율적으로 구현하기 위해서 만든 모듈
const GET_MODAL = "GET_MODAL";

//혹시 모르니 만들어두자..
const SET_MADAL = "SET_MODAL";

const getModal = createAction(GET_MODAL, (post) => ({ post }));

const getModalPost = (id) => {
  return function (dispatch, getState) {
    const post_list = getState().post.map_post_list;
    console.log("가와~~", post_list);

    const idx = post_list.findIndex((p) => {
      if (p.id === id) {
        return p;
      }
    });

    const ModalPost = post_list[idx];
    console.log("찾았다!", ModalPost);
    dispatch(getModal(ModalPost));
  };
};

const getModalPostAPI = (id) => {
  return function (dispatch) {};
};

const initialState = {
  post: null,
};

export default handleActions(
  {
    [GET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
      }),
  },
  initialState
);

const actionCreators = {
  getModalPost,
};

export { actionCreators };
