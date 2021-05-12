import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { history } from '../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";

// component, element 파일들 가져오기
import Map from "../components/Map";

const Main = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  // 페이지 렌더링이 되면서 모달창에 들어갈 데이터들을 받아온다.
  useEffect(() => {
    dispatch(postActions.getMapPostAPI()) // 서버에서 지도위에 뿌려질 데이터들을 받아서 리덕스 스토어에 저장
  }, []);

  // 리덕스 스토어에서 가져올 지도위에 뿌려질 마커, 커스텀오버레이 데이터
  const map_post_list = useSelector((state) => {
    return state.post.map_post_list
  });
  
  // 마커데이터 확인
  if (map_post_list) { 
    console.log("map_post_list는: " + map_post_list);
  };
  
  // 카테고리 제어하기 : 12가지 + 전체카테고리
  const is_category_in_map = useSelector((state) => {
    return state.category_in_map.is_category_in_map
  });
  
  // 카테고리데이터 확인
  if (is_category_in_map) {
    console.log("is_category_in_map은: " + is_category_in_map);
  };

  return (
    <React.Fragment>
      <Map 
        map_post_list={map_post_list}
        is_category_in_map={is_category_in_map}/>
    </React.Fragment>
  );
  
};

export default Main;
