// 마커 데이터를 제어하는 모듈
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import { config } from "../../shared/configureStore";

// Actions
const ADD_MARKER = "ADD_MARKER";
const SET_MARKER = "SET_MARKER";
const DELETE_MARKER = "DELETE_MARKER";

// Action Creaters 
const addMarker = createAction(ADD_MARKER, (marker) => ({marker}));
const setMarker = createAction(SET_MARKER, (marker_list) => ({marker_list}));
const deleteMarker = createAction(DELETE_MARKER, (markerId) => ({markerId}));

// initialState 
const initialState = {
  marker_list = [],
}

// 생성된 마커 데이터를 클라이언트에서 서버로 보내기
const addMarkerAPI = (marker) => {
  return function (dispatch, getState, {history}) {
    const _token = sessionStorage.getItem("jwt");
    let token = {
      headers : { authorization: `Bearer ${_token}`},
    }
    
    // 생성된 마커 데이터를 서버로 보내기
    axios.post(`${config.api}/marker`)

  }
}

// 서버에 저장된 마커 데이터들을 클라이언트로 가져온다.
const getMarkerAPI = () => {
  return function (dispatach, getState, {history}) {
    
    // 로그인 여부에 관계없이 마커를 가져오므로 토큰은 불필요?
    axios.get(`${config.api}/marker`)
  }
}