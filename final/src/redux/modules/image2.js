import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";
const GET_PREVIEW = "GET_PREVIEW";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getPreview = createAction(GET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  preview: [],
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
  },
  initialState
);

const actionCreators = {
  setPreview,
  getPreview,
};

export { actionCreators };
