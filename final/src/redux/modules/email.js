import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const GET_EMAIL = "GET_EMAIL";

const getEmail = createAction(GET_EMAIL, (email) => ({ email }));

const initialState = {
  email: null,
};

export default handleActions(
  {
    [GET_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.email = action.payload.email;
      }),
  },
  initialState
);

const actionCreators = {
  getEmail,
};

export { actionCreators };
