// map.js 
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// Actions 
const GET_ADDRESS = "GET_ADDRESS";

// Action creators 
const getAddress = createAction(GET_ADDRESS, (address) => ({address}));

// initialState 
const initialState = {
  addressList: [],
}

// reducer
export default handleActions({
  [GET_ADDRESS]: (state, action) => produce(state, (draft) => {
    draft.addressList.push(action.payload.address);
  }),
}, initialState);

// actionCreators export
const actionCreators = {
  getAddress,
};

export { actionCreators };