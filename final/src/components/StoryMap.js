import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { useDispatch } from "react-redux";

import styled from "styled-components";
import * as BiIcons from "react-icons/bi";
import _ from "lodash"; // throttle, debounce 사용

// component, element 파일들 가져오기
import "../Css/StoryMap.css";
import PostModal from "./StoryPostModal/PostModal";
import { actionCreators as ModalActions } from "../redux/modules/storypostmodal";
import { markerImgUrls } from "../shared/configMarkerImgUrl"; // 마커이미지들 모음
// console.log(markerImgUrls.myPostOceanMarkerImgUrl);

// window 객체로부터 kakao mpa api를 호출하기
// 이것이 되게 하기 위해서는 index.html(index.js 아님!!!)의 script 태그안의 src에다가
// 카카오개발자 사이트에서 지정해준 apikey 값이 들어간 링크를 넣어줘야 한다.
const { kakao } = window;

const StoryMap = (props) => {
  const { post_list, userPostMode } = props;
  // console.log("StoryMap post_list", post_list);
  // console.log("Marker marker_icon", marker_icon);
  // console.log("userPostMode", userPostMode);
  // console.log("마커있나테스트", markerImgUrls.myPostOceanMarkerImgUrl);

  // 1. 내가 작성한 게시물 데이터를 카테고리별로 쪼개서 묶는다.
  const myPostCafe = post_list.filter(
    (post_list) => post_list.category === "카페"
  ); // 1. 카페
  const myPostNight = post_list.filter(
    (post_list) => post_list.category === "야경"
  ); // 2. 야경
  const myPostOcean = post_list.filter(
    (post_list) => post_list.category === "바다"
  ); // 3. 바다
  const myPostMountain = post_list.filter(
    (post_list) => post_list.category === "산"
  ); // 4. 산
  const myPostFlower = post_list.filter(
    (post_list) => post_list.category === "꽃"
  ); // 5. 꽃
  const myPostAlone = post_list.filter(
    (post_list) => post_list.category === "나홀로"
  ); // 6. 나홀로
  const myPostCouple = post_list.filter(
    (post_list) => post_list.category === "연인"
  ); // 7. 연인
  const myPostFriend = post_list.filter(
    (post_list) => post_list.category === "친구"
  ); // 8. 친구
  const myPostPet = post_list.filter(
    (post_list) => post_list.category === "반려동물"
  ); // 9. 반려동물
  const myPostCity = post_list.filter(
    (post_list) => post_list.category === "도심"
  ); // 10. 도심
  const myPostPark = post_list.filter(
    (post_list) => post_list.category === "공원"
  ); // 11. 공원
  const myPostExhibition = post_list.filter(
    (post_list) => post_list.category === "전시"
  ); // 12. 전시
  // console.log("데이터 있나??", myPostMountain);

  // 2. 내가 좋아요 게시물 데이터를 카테고리별로 쪼개서 묶는다.
  const myLikeCafe = post_list.filter(
    (post_list) => post_list.category === "카페"
  ); // 1. 카페
  const myLikeNight = post_list.filter(
    (post_list) => post_list.category === "야경"
  ); // 2. 야경
  const myLikeOcean = post_list.filter(
    (post_list) => post_list.category === "바다"
  ); // 3. 바다
  const myLikeMountain = post_list.filter(
    (post_list) => post_list.category === "산"
  ); // 4. 산
  const myLikeFlower = post_list.filter(
    (post_list) => post_list.category === "꽃"
  ); // 5. 꽃
  const myLikeAlone = post_list.filter(
    (post_list) => post_list.category === "나홀로"
  ); // 6. 나홀로
  const myLikeCouple = post_list.filter(
    (post_list) => post_list.category === "연인"
  ); // 7. 연인
  const myLikeFriend = post_list.filter(
    (post_list) => post_list.category === "친구"
  ); // 8. 친구
  const myLikePet = post_list.filter(
    (post_list) => post_list.category === "반려동물"
  ); // 9. 반려동물
  const myLikeCity = post_list.filter(
    (post_list) => post_list.category === "도심"
  ); // 10. 도심
  const myLikePark = post_list.filter(
    (post_list) => post_list.category === "공원"
  ); // 11. 공원
  const myLikeExhibition = post_list.filter(
    (post_list) => post_list.category === "전시"
  ); // 12. 전시

  const dispatch = useDispatch();
  // const is_login = useSelector((state) => state.user.is_login);
  // const nickname = localStorage.getItem("nickname"); // 내가 작성한 게시물을 판별하는 기준 상수
  // 위도, 경도, 마커, 주소
  const [startLat, setStartLat] = useState(); // 현위치 위도 설정
  const [startLng, setStartLng] = useState(); // 현위치 경도 설정
  const [_map, setMap] = useState(); // useEffect 외부에서 map을 쓰기 위한 것.
  const [search, setSearch] = useState(""); // search가 변경 될때마다 화면 렌더링되도록 useEffect에 [search]를 넣어준다.
  //조건 걸어주기 // 나를 기준으로 몇 km 이내

  // 디테일 모달 관련 상태값
  const [is_detailModal, setDetailModal] = useState();
  const openModal = () => {
    setDetailModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };

  // 검색시 화면 렌더링을  제어합니다.(타이핑 할 때마다 렌더링 되지 않도록)
  const debounce = _.debounce((e) => {
    setSearch(e.target.value);
  }, 300); //키보드 떼면 입력한게 0.3초 뒤에 나타난다.

  // geolocation
  getLocation();

  function getLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // console.log(
          //   "현위치의 위도 = " +
          //     position.coords.latitude +
          //     ", 현위치의 경도 = " +
          //     position.coords.longitude
          // );
          setStartLat(position.coords.latitude);
          setStartLng(position.coords.longitude);
          // var nowPositionLat = position.coords.latitude
          // var nowPositionLon = position.coords.longitude
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      window.alert(
        "geolocation을 사용할 수 없어 현재 내 위치를 표시 할 수 없습니다"
      );
    }
  }
  // geolocation은 여기까지.
  // console.log(startLat, startLng);

  useEffect(() => {
    if (!post_list) {
      return;
    } else {
      // 지도 렌더링 코드
      // 페이지가 렌더링 되면 지도 띄우기
      var container = document.getElementById("map"); // 지도를 표시할 div
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(35.83819028173818, 127.88227108131916), //지도 중심(시작) 좌표, LatLng 클래스는 반드시 필요.
        level: 12, //지도 확대 레벨
      };

      var map = new kakao.maps.Map(container, options); // 지도생성 및 객체 리턴
      // -----------------------------------------------------------------------------------
      // 여기까지는 지도를 가져오기 위한 필수 부분.

      // useEffect 밖으로 map정보를 가져오기 위해서 useState로 함수를 만든다.
      setMap(map);
    }

    // 1. 내가 작성한 게시물들 카테고리별로 다 보이게 하기 제어 시작!!!
    if (userPostMode) {
      // userPostMode === true 라서 내가 작성한 게시물이 된다.
      // 31번-43번줄에 카테고리별로 데이터 묶어 놓음
      // 1. 내가 작성한 게시물 : 카페
      myPostCafe.forEach((myCafe) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostCafeMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myCafe.latitude,
          myCafe.longitude
        );
        const myCafeMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myCafe.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myCafe.spotName1}</div>` +
          `<div class="spotname2">${myCafe.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myCafeCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myCafeMarkers, "mouseover", function () {
          myCafeCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myCafeMarkers, "mouseout", function () {
          myCafeCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myCafeMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myCafe.id));
          // dispatch(ModalActions.getModalPostAPI(myCafe.id));
          openModal();
        });
      });

      // 2. 내가 작성한 게시물 : 야경
      myPostNight.forEach((myNight) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostNightMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myNight.latitude,
          myNight.longitude
        );
        const myNightMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myNight.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myNight.spotName1}</div>` +
          `<div class="spotname2">${myNight.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myNightCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myNightMarkers, "mouseover", function () {
          myNightCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myNightMarkers, "mouseout", function () {
          myNightCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myNightMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myNight.id));
          // dispatch(ModalActions.getModalPostAPI(myNight.id));
          openModal();
        });
      });

      // 3. 내가 작성한 게시물 : 바다
      myPostOcean.forEach((myOcean) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostOceanMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myOcean.latitude,
          myOcean.longitude
        );
        const myOceanMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myOcean.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myOcean.spotName1}</div>` +
          `<div class="spotname2">${myOcean.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myOceanCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myOceanMarkers, "mouseover", function () {
          myOceanCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myOceanMarkers, "mouseout", function () {
          myOceanCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myOceanMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myOcean.id));
          // dispatch(ModalActions.getModalPostAPI(myOcean.id));
          openModal();
        });
      });

      // 4. 내가 작성한 게시물 : 산
      myPostMountain.forEach((myMountain) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostMountainMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myMountain.latitude,
          myMountain.longitude
        );
        const myMountainMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myMountain.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myMountain.spotName1}</div>` +
          `<div class="spotname2">${myMountain.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myMountainCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myMountainMarkers,
          "mouseover",
          function () {
            myMountainCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myMountainMarkers,
          "mouseout",
          function () {
            myMountainCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myMountainMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myMountain.id));
          // dispatch(ModalActions.getModalPostAPI(myMountain.id));
          openModal();
        });
      });

      // 5. 내가 작성한 게시물 : 꽃
      myPostFlower.forEach((myFlower) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostFlowerMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myFlower.latitude,
          myFlower.longitude
        );
        const myFlowerMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myFlower.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myFlower.spotName1}</div>` +
          `<div class="spotname2">${myFlower.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myFlowerCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myFlowerMarkers, "mouseover", function () {
          myFlowerCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myFlowerMarkers, "mouseout", function () {
          myFlowerCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myFlowerMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myFlower.id));
          // dispatch(ModalActions.getModalPostAPI(myFlower.id));
          openModal();
        });
      });

      // 6. 내가 작성한 게시물 : 나홀로
      myPostAlone.forEach((myAlone) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostAloneMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myAlone.latitude,
          myAlone.longitude
        );
        const myAloneMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myAlone.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myAlone.spotName1}</div>` +
          `<div class="spotname2">${myAlone.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myAloneCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myAloneMarkers, "mouseover", function () {
          myAloneCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myAloneMarkers, "mouseout", function () {
          myAloneCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myAloneMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myAlone.id));
          // dispatch(ModalActions.getModalPostAPI(myAlone.id));
          openModal();
        });
      });

      // 7. 내가 작성한 게시물 : 커플
      myPostCouple.forEach((myCouple) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostCoupleMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myCouple.latitude,
          myCouple.longitude
        );
        const myCoupleMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myCouple.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myCouple.spotName1}</div>` +
          `<div class="spotname2">${myCouple.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myCoupleCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myCoupleMarkers, "mouseover", function () {
          myCoupleCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myCoupleMarkers, "mouseout", function () {
          myCoupleCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myCoupleMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myCouple.id));
          // dispatch(ModalActions.getModalPostAPI(myCouple.id));
          openModal();
        });
      });

      // 8. 내가 작성한 게시물 : 친구
      myPostFriend.forEach((myFriend) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostFriendMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myFriend.latitude,
          myFriend.longitude
        );
        const myFriendMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myFriend.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myFriend.spotName1}</div>` +
          `<div class="spotname2">${myFriend.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myFriendCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myFriendMarkers, "mouseover", function () {
          myFriendCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myFriendMarkers, "mouseout", function () {
          myFriendCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myFriendMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myFriend.id));
          // dispatch(ModalActions.getModalPostAPI(myFriend.id));
          openModal();
        });
      });

      // 9. 내가 작성한 게시물 : 반려동물
      myPostPet.forEach((myPet) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostPetMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(myPet.latitude, myPet.longitude);
        const myPetMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myPet.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myPet.spotName1}</div>` +
          `<div class="spotname2">${myPet.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myPetCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myPetMarkers, "mouseover", function () {
          myPetCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myPetMarkers, "mouseout", function () {
          myPetCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myPetMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myPet.id));
          // dispatch(ModalActions.getModalPostAPI(myPet.id));
          openModal();
        });
      });

      // 10. 내가 작성한 게시물 : 도심
      myPostCity.forEach((myCity) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostCityMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myCity.latitude,
          myCity.longitude
        );
        const myCityMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myCity.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myCity.spotName1}</div>` +
          `<div class="spotname2">${myCity.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myCityCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myCityMarkers, "mouseover", function () {
          myCityCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myCityMarkers, "mouseout", function () {
          myCityCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myCityMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myCity.id));
          // dispatch(ModalActions.getModalPostAPI(myCity.id));
          openModal();
        });
      });

      // 11. 내가 작성한 게시물 : 공원
      myPostPark.forEach((myPark) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostParkMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myPark.latitude,
          myPark.longitude
        );
        const myParkMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myPark.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myPark.spotName1}</div>` +
          `<div class="spotname2">${myPark.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myParkCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(myParkMarkers, "mouseover", function () {
          myParkCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myParkMarkers, "mouseout", function () {
          myParkCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myParkMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myPark.id));
          // dispatch(ModalActions.getModalPostAPI(myPark.id));
          openModal();
        });
      });

      // 12. 내가 작성한 게시물 : 전시
      myPostExhibition.forEach((myExhibition) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myPostExhibitionMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myExhibition.latitude,
          myExhibition.longitude
        );
        const myExhibitionMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myExhibition.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myExhibition.spotName1}</div>` +
          `<div class="spotname2">${myExhibition.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myExhibitionCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myExhibitionMarkers,
          "mouseover",
          function () {
            myExhibitionCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myExhibitionMarkers,
          "mouseout",
          function () {
            myExhibitionCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myExhibitionMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myExhibition.id));
          // dispatch(ModalActions.getModalPostAPI(myExhibition.id));
          openModal();
        });
      });
    }
    // 1. 내가 작성한 게시물들 카테고리별로 다 보이게 하기 제어 끝!!!

    // 2. 내가 좋아요한 게시물 카테고리별로 다 보이게 하기 시작!!!
    if (!userPostMode) {
      // userPostMode === false 라서 내가 좋아요한 게시물이 된다.
      // 45-57번줄에 카테고리별로 데이터 묶어놓음
      // 1. 내가 좋아요한 게시물 : 카페
      myLikeCafe.forEach((myCafe) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeCafeMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myCafe.latitude,
          myCafe.longitude
        );
        const myLikeCafeMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myCafe.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myCafe.spotName1}</div>` +
          `<div class="spotname2">${myCafe.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeCafeCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeCafeMarkers,
          "mouseover",
          function () {
            myLikeCafeCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeCafeMarkers,
          "mouseout",
          function () {
            myLikeCafeCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeCafeMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myCafe.id));
          // dispatch(ModalActions.getModalPostAPI(myCafe.id));
          openModal();
        });
      });

      // 2. 내가 좋아요한 게시물 : 야경
      myLikeNight.forEach((myNight) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeNightMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myNight.latitude,
          myNight.longitude
        );
        const myLikeNightMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myNight.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myNight.spotName1}</div>` +
          `<div class="spotname2">${myNight.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeNightCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeNightMarkers,
          "mouseover",
          function () {
            myLikeNightCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeNightMarkers,
          "mouseout",
          function () {
            myLikeNightCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeNightMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myNight.id));
          // dispatch(ModalActions.getModalPostAPI(myNight.id));
          openModal();
        });
      });

      // 3. 내가 좋아요한 게시물 : 바다
      myLikeOcean.forEach((myOcean) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeOceanMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myOcean.latitude,
          myOcean.longitude
        );
        const myLikeOceanMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myOcean.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myOcean.spotName1}</div>` +
          `<div class="spotname2">${myOcean.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeOceanCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeOceanMarkers,
          "mouseover",
          function () {
            myLikeOceanCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeOceanMarkers,
          "mouseout",
          function () {
            myLikeOceanCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeOceanMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myOcean.id));
          // dispatch(ModalActions.getModalPostAPI(myOcean.id));
          openModal();
        });
      });

      // 4. 내가 좋아요한 게시물 : 산
      myLikeMountain.forEach((myMountain) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeMountainMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myMountain.latitude,
          myMountain.longitude
        );
        const myLikeMountainMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myMountain.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myMountain.spotName1}</div>` +
          `<div class="spotname2">${myMountain.spotName2}</div>` +
          "</div>" +
          "</div>";
        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeMountainCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.

        kakao.maps.event.addListener(
          myLikeMountainMarkers,
          "mouseover",
          function () {
            myLikeMountainCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeMountainMarkers,
          "mouseout",
          function () {
            myLikeMountainCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(
          myLikeMountainMarkers,
          "click",
          function () {
            // 서버로 해당 마커의 id를 보내고 모달창 오픈
            dispatch(ModalActions.getModalPostAPI(myMountain.id));
            // dispatch(ModalActions.getModalPostAPI(myMountain.id));
            openModal();
          }
        );
      });

      // 5. 내가 좋아요한 게시물 : 꽃
      myLikeFlower.forEach((myFlower) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeFlowerMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myFlower.latitude,
          myFlower.longitude
        );
        const myLikeFlowerMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myFlower.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myFlower.spotName1}</div>` +
          `<div class="spotname2">${myFlower.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeFlowerCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeFlowerMarkers,
          "mouseover",
          function () {
            myLikeFlowerCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeFlowerMarkers,
          "mouseout",
          function () {
            myLikeFlowerCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeFlowerMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myFlower.id));
          // dispatch(ModalActions.getModalPostAPI(myFlower.id));
          openModal();
        });
      });

      // 6. 내가 좋아요한 게시물 : 나홀로
      myLikeAlone.forEach((myAlone) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeAloneMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myAlone.latitude,
          myAlone.longitude
        );
        const myLikeAloneMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myAlone.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myAlone.spotName1}</div>` +
          `<div class="spotname2">${myAlone.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeAloneCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeAloneMarkers,
          "mouseover",
          function () {
            myLikeAloneCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeAloneMarkers,
          "mouseout",
          function () {
            myLikeAloneCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeAloneMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myAlone.id));
          // dispatch(ModalActions.getModalPostAPI(myAlone.id));
          openModal();
        });
      });

      // 7. 내가 좋아요한 게시물 : 연인
      myLikeCouple.forEach((myCouple) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeCoupleMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myCouple.latitude,
          myCouple.longitude
        );
        const myLikeCoupleMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myCouple.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myCouple.spotName1}</div>` +
          `<div class="spotname2">${myCouple.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeCoupleCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeCoupleMarkers,
          "mouseover",
          function () {
            myLikeCoupleCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeCoupleMarkers,
          "mouseout",
          function () {
            myLikeCoupleCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeCoupleMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myCouple.id));
          // dispatch(ModalActions.getModalPostAPI(myCouple.id));
          openModal();
        });
      });

      // 8. 내가 좋아요한 게시물 : 친구
      myLikeFriend.forEach((myFriend) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeFriendMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myFriend.latitude,
          myFriend.longitude
        );
        const myLikeFriendMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myFriend.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myFriend.spotName1}</div>` +
          `<div class="spotname2">${myFriend.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeFriendCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeFriendMarkers,
          "mouseover",
          function () {
            myLikeFriendCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeFriendMarkers,
          "mouseout",
          function () {
            myLikeFriendCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeFriendMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myFriend.id));
          // dispatch(ModalActions.getModalPostAPI(myFriend.id));
          openModal();
        });
      });

      // 9. 내가 좋아요한 게시물 : 반려동물
      myLikePet.forEach((myPet) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikePetMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(myPet.latitude, myPet.longitude);
        const myLikePetMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myPet.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myPet.spotName1}</div>` +
          `<div class="spotname2">${myPet.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikePetCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikePetMarkers,
          "mouseover",
          function () {
            myLikePetCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(myLikePetMarkers, "mouseout", function () {
          myLikePetCustomOverlay.setMap(null);
        });

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikePetMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myPet.id));
          // dispatch(ModalActions.getModalPostAPI(myPet.id));
          openModal();
        });
      });

      // 10. 내가 좋아요한 게시물 : 도심
      myLikeCity.forEach((myCity) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeCityMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myCity.latitude,
          myCity.longitude
        );
        const myLikeCityMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myCity.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myCity.spotName1}</div>` +
          `<div class="spotname2">${myCity.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeCityCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeCityMarkers,
          "mouseover",
          function () {
            myLikeCityCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeCityMarkers,
          "mouseout",
          function () {
            myLikeCityCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeCityMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myCity.id));
          // dispatch(ModalActions.getModalPostAPI(myCity.id));
          openModal();
        });
      });

      // 11. 내가 좋아요한 게시물 : 공원
      myLikePark.forEach((myPark) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeParkMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myPark.latitude,
          myPark.longitude
        );
        const myLikeParkMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myPark.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myPark.spotName1}</div>` +
          `<div class="spotname2">${myPark.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeParkCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeParkMarkers,
          "mouseover",
          function () {
            myLikeParkCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeParkMarkers,
          "mouseout",
          function () {
            myLikeParkCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(myLikeParkMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(myPark.id));
          // dispatch(ModalActions.getModalPostAPI(myPark.id));
          openModal();
        });
      });

      // 12. 내가 좋아요한 게시물 : 전시
      myLikeExhibition.forEach((myExhibition) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.myLikeExhibitionMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          myExhibition.latitude,
          myExhibition.longitude
        );
        const myLikeExhibitionMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${myExhibition.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${myExhibition.spotName1}</div>` +
          `<div class="spotname2">${myExhibition.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const myLikeExhibitionCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(
          myLikeExhibitionMarkers,
          "mouseover",
          function () {
            myLikeExhibitionCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          myLikeExhibitionMarkers,
          "mouseout",
          function () {
            myLikeExhibitionCustomOverlay.setMap(null);
          }
        );

        // 클릭시 모달 디테일 뜨게 하기 테스트
        kakao.maps.event.addListener(
          myLikeExhibitionMarkers,
          "click",
          function () {
            // 서버로 해당 마커의 id를 보내고 모달창 오픈
            dispatch(ModalActions.getModalPostAPI(myExhibition.id));
            // dispatch(ModalActions.getModalPostAPI(myExhibition.id));
            openModal();
          }
        );
      });
    }
  }, [startLat, startLng, userPostMode, post_list]);

  // 키워드로 검색하기!!!!!!
  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places();
  // 키워드로 장소를 검색합니다
  if (search) {
    //search가 빈 string일때 검색이 되어서 오류가 뜨는 경우를 없애기 위해 if문으로 분기한다.
    ps.keywordSearch(search, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        var bounds = new kakao.maps.LatLngBounds(); // LatLngBounds 객체에 좌표를 추가합니다
        // console.log(data);
        // console.log(bounds);

        for (var i = 0; i < data.length; i++) {
          // displayMarker(data[i], bounds);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다.
          _map.setBounds(bounds);
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // window.alert("검색결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        Swal.fire({
          text: "검색 결과 중 오류가 발생했습니다.",
          confirmButtonColor: "#ffb719",
        });
        return;
      }
    });
  }

  return (
    <React.Fragment>
      {is_detailModal ? (
        <PostModal
          // onClick={openModal}
          close={closeDetailModal}
          // {...map_post_list}
        ></PostModal>
      ) : null}

      <SearchBox>
        <SearchInput
          type="text"
          placeholder="지역으로 검색"
          onChange={debounce}
        />
        <SearchIcon>
          <BiIcons.BiSearch size="1.7rem" color="rgb(255, 183, 25)" />
        </SearchIcon>
      </SearchBox>

      <MapBox>
        {/* 위에서 설정된 getElementById("map")에 의해서 id="map"인 div에 맵이 표시된다 */}
        <div id="map" style={{ width: "100%", height: "700px" }}></div>
      </MapBox>
    </React.Fragment>
  );
};

export default StoryMap;

const SearchBox = styled.div`
  position: absolute;
  margin-top: 35px;
  /* margin-left: 25px; */
  /* top: 30px; */
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 10;
  width: 500px;
  align-items: center;
`;

const SearchInput = styled.input`
  height: 45px;
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  font-size: 15px;
  border: 2.5pt solid rgb(255, 183, 25);
  &:focus {
    outline: none;
    /* box-shadow: 0 0 0 1px #ffb719; */
  }
  opacity: 0.8;
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 0;
  color: ${(props) => props.theme.main_color};
`;

const MapBox = styled.div`
  width: 100%;
  height: 650px;
  padding-top: 10px;
  position: relative;
`;
