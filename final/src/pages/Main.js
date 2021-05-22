import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import PopUp from "../components/PopUp";

// component, element 파일들 가져오기
import Map from "../components/Map";
// 스피너
import Spinner from "../shared/Spinner";
import Spinner2 from "../shared/Spinner2";
import Spinner3 from "../shared/Spinner3";
const Main = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const map_post_list = useSelector((state) => state.post.map_post_list);

  console.log(
    "    --------------------------------------------------\n\
    < Welcome to SFlash!! Come and Experience our service! >\n\
    --------------------------------------------------\n\
            /\\__/\\           \n\
           /'    '\\          \n\
         === 0  0 ===       \n\
           \\  --  /         \n\
          /        \\        \n\
         /          \\       \n\
        |            |      \n\
         \\  ||  ||  /       \n\
          \\_oo__oo_/#######o" 
  );



  const [showModal, setShowModal] = useState(false);

  const HAS_VISITED_BEFORE = localStorage.getItem("hasVisitedBefore");

  useEffect(() => {
    const handleShowModal = () => {
      // 토큰이 있고 토큰의 만료일이 안됐으면 팝업이 안열린다
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }
      if (!HAS_VISITED_BEFORE) {
        // 토큰이 없어야 팝업이 뜬다 >> 만료일이 24시간인 토큰을 로컬에 저장
        // 오늘안보기 누르면 토큰이 생기게 하기!
        setShowModal(true);
      }
    };
    window.setTimeout(handleShowModal, 100);
  }, [HAS_VISITED_BEFORE]);

  const handleClose = () => setShowModal(false);
  const loading = useSelector((state) => state.post.spinner_loading);

  useEffect(() => {
    dispatch(postActions.getMapPostAPI());
  }, []);
  //클릭했을때 HAS_VISITED_BEFORE
  return (
    <React.Fragment>
      {/* !is_login 이렇게 로그인 상태가 아닐때만 보여주자? */}
      {showModal && <PopUp close={handleClose} />}
      {map_post_list ? <Map /> : <Spinner3 />}
      {loading ? <Spinner2 /> : null}
    </React.Fragment>
  );
};

export default Main;
