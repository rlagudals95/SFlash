import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { history } from '../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

// component, element 파일들 가져오기
import Map from "../components/Map";

const Main = (props) => {
  const dispatch = useDispatch();

  // 페이지 렌더링이 되면서 모달창에 들어갈 데이터들을 받아온다.
  // useEffect(() => {
  //   dispatch(postActions.getMyPostAPI())
  // }, []);

  return (
    <React.Fragment>
      <Map/>
    </React.Fragment>
  );
};

export default Main;
