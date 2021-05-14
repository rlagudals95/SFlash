import React, { useState, useEffect, useRef } from "react";
import { CustomOverlay } from "react-kakao-maps";
// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import _ from "lodash"; // throttle, debounce 사용

// component, element 파일들 가져오기
import { markerdata } from "./MarkerMockData";
// import ModalSmallPost from "./ModalSmallPost";
import "../Css/Map.css";
import UpLoadModal from "./UpLoadModal";

// window 객체로부터 kakao mpa api를 호출하기
// 이것이 되게 하기 위해서는 index.html(index.js 아님!!!)의 script 태그안의 src에다가
// 카카오개발자 사이트에서 지정해준 apikey 값이 들어간 링크를 넣어줘야 한다.
const { kakao } = window;

const Maps = (props) => {
  const { post_list, marker_icon } = props;
  console.log(post_list);
  console.log(marker_icon);

  const is_login = useSelector((state) => state.user.is_login);

  // 사진이 나오는 모달창 제어
  const [is_modal, setModal] = useState(false); // 마커 클릭하면 나오는 작은 모달
  const [is_uploadModal, setUpLoadModal] = useState(false); // 작은 모달에서 댓글 달기를 누르면 나오는 확장된 모달

  // 위도, 경도, 마커, 주소
  const [startlat, setStartLat] = useState(); // 현위치 위도 설정
  const [startlon, setStartLon] = useState(); // 현위치 경도 설정
  const [latitude, setLatitude] = useState(); // 클릭한 위치 위도 설정
  const [longitude, setLongitude] = useState(); // 클릭한 위치 경도 설정
  const [spotName, setSpotName] = useState(""); // 클릭한 위치 이름 설정
  const [_map, setMap] = useState(); // useEffect 외부에서 map을 쓰기 위한 것.
  const [search, setSearch] = useState(""); // search가 변경 될때마다 화면 렌더링되도록 useEffect에 [search]를 넣어준다.
  //조건 걸어주기 // 나를 기준으로 몇 km 이내

  // 검색시 화면 렌더링을  제어합니다.(타이핑 할 때마다 렌더링 되지 않도록)
  const debounce = _.debounce((e) => {
    setSearch(e.target.value);
  }, 300); //키보드 떼면 입력한게 0.3초 뒤에 나타난다.

  useEffect(() => {
    if (!post_list) {
      return;
    } else {
      // 페이지가 렌더링 되면 지도 띄우기
      var container = document.getElementById("map"); // 지도를 표시할 div
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(35.83819028173818, 127.88227108131916), //지도 중심(시작) 좌표, LatLng 클래스는 반드시 필요.
        level: 13, //지도 확대 레벨
      };

      var map = new kakao.maps.Map(container, options); // 지도생성 및 객체 리턴
      // -----------------------------------------------------------------------------------
      // 여기까지는 지도를 가져오기 위한 필수 부분.
      // 아래부터 우리가 원하는걸 구현하는 코드를 작성한다.
      // -----------------------------------------------------------------------------------

      // useEffect 밖으로 map정보를 가져오기 위해서 useState로 함수를 만든다.
      setMap(map);
    }

    // 전체 마커 + 카테고리별 마커 설정
    // 기본 설정 규칙 설명 --------------------------------------------------------------------------
    // useEffect의 두번째 인자에 'is_카테고리명'(true, false)에 따라 마커가 재렌더링되게 한다.
    // 1. 지도 렌더링시, 모든 게시물 자료들을 가져온다.
    // 2. 마커를 생성하고, 지정된 지도상의 좌표에 각 마커들을 표시한다.
    // 3. 마커들을 클릭하는 등의 이벤트가 일어나면 커스텀오버레이가 뜨게 한다.
    // 4. 카테고리들을 제어해 카테고리에 맞는 마커들만 선택되도록 한다.
    // 5. 서버 연결 전 테스트중에는 MarkerMockData.js 로 하드코딩한 걸 갖고 와서 테스트한다.
    // 6. 서버와 연결되어 데이터 통신이 이뤄지면 if문으로 분기하는 코드를 사용한다.
    // 기본 설정 규칙 설명 끝------------------------------------------------------------------------

    if (post_list) {
      post_list.forEach((post) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(30, 40);
        const markerImage = new kakao.maps.MarkerImage(marker_icon, imageSize);
        const position = new kakao.maps.LatLng(post.latitude, post.longitude);
        const postMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox"  src=${post.imgForOverlay} >` +
          // `<img src=${p.imgUrl} onclick={() => {history}}>` +
          '<div class="head">' +
          `<div class="spotname">${post.spotName}</div>` +
          "</div>" +
          // '<div class="center"></div>' +
          '<div class="bottomiconbox">' +
          '<img class="likeicon" onclick></img>' +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const postCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.2, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(postMarkers, "click", function () {
          postCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(postMarkers, "rightclick", function () {
          postCustomOverlay.setMap(null);
        });
      });
    }
  }, [post_list]);

  //useEffect 끝 -----------------------------------------------------------------------------------------------------

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
        console.log(data);
        console.log(bounds);

        for (var i = 0; i < data.length; i++) {
          // displayMarker(data[i], bounds);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다.
          _map.setBounds(bounds);
        }
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        window.alert("검색결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        window.alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    });
  }

  // 작성모달 관련
  const closeUpLoadModal = () => {
    setUpLoadModal(false);
  };

  return (
    <React.Fragment>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="지역으로 검색"
          onChange={debounce}
        />
      </SearchBox>
      {/* <CustomOverlayUseInfo/> */}
      <MapBox>
        {/* 위에서 설정된 getElementById("map")에 의해서 id="map"인 div에 맵이 표시된다 */}
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </MapBox>

      {/* {is_uploadModal ? (
        <UpLoadModal
          latitude={latitude}
          longitude={longitude}
          spotName={spotName}
          close={closeUpLoadModal}
        />
      ) : null} */}
    </React.Fragment>
  );
};

export default Maps;

const SearchBox = styled.div`
  position: absolute;
  margin-top: 30px;
  margin-left: 30px;
  z-index: 10;
  width: 400px;
`;

const SearchInput = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  padding-left: 15px;
  font-size: 15px;
  border: none;
  &:focus {
    /* outline: blue; */
    border-radius: 5px;
    border-color: blue;
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`;
