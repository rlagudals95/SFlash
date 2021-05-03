import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  preview: [],
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        console.log("어떤거 지워야해??", action.payload.preview);
        // draft.preview.shift();
        //  http://via.placeholder.com/400x300지우자

        draft.preview.push(action.payload.preview);
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
};

export { actionCreators };
