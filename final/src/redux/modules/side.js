import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { push } from "react-router-redux";

// 사이드바의 메뉴 액티브 효과를 리덕스로 상태관리 해줬다
const GET_PAGE = "GET_PAGE";

const initialState = {
  page: "home",
};

const getPage = createAction(GET_PAGE, (page) => ({ page }));

export default handleActions(
  {
    [GET_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.page = action.payload.page;
      }),
  },
  initialState
);

const actionCreators = {
  getPage,
};

export { actionCreators };
