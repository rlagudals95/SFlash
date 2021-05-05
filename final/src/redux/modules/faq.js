import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import { config } from "../../shared/config";

const SET_FAQ = "SET_FAQ";
const ADD_FAQ = "ADD_FAQ";
const DELETE_FAQ = "DELETE_FAQ";

const setFaq = (SET_FAQ, (faq_list) => ({ faq_list }));
const addFaq = (ADD_FAQ, (faq) => ({ faq }));
const deleteFaq = (DELETE_FAQ, (id) => ({ id }));

const initialState = {
  list: [],
};

export default handleActions(
  {
    [SET_FAQ]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [SET_FAQ]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.faq);
      }),
    [DELETE_FAQ]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((f, idx) => {
          if (f.id !== action.payload.id) {
            return [...draft.list, f];
          }
        });
      }),
  },
  initialState
);
const actionCreators = {};

export { actionCreators };
