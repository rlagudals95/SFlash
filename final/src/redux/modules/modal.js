import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const GET_MODAL_ID = "GET_MODAL_ID";

const openModal = createAction(OPEN_MODAL, (is_open) => ({ is_open }));
const closeModal = createAction(CLOSE_MODAL, (is_open) => ({ is_open }));
const getModal_id = createAction(GET_MODAL_ID, (modal_id) => ({ modal_id }));

const initialState = {
  is_open: false,
  modal_id: null,
};

export default handleActions(
  {
    [OPEN_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.is_open = true;
      }),
    [CLOSE_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.is_open = false;
      }),
    [GET_MODAL_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.modal_id = action.payload.modal_id;
      }),
  },
  initialState
);

const actionCreators = {
  openModal,
  closeModal,
  getModal_id,
};

export { actionCreators };
