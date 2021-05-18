import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";

// component, element 파일들 가져오기
import Map from "../components/Map";
// 스피너
import Spinner from "../shared/Spinner";

const Main = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const map_post_list = useSelector((state) => state.post.map_post_list);

  useEffect(() => {
    dispatch(postActions.getMapPostAPI());
  }, []);

  return (
    <React.Fragment>
      {map_post_list ? (
        <Map />
        ) : (
          <Spinner/>
      )}
      {/* <Map/> */}
    </React.Fragment>
  );
};

export default Main;
