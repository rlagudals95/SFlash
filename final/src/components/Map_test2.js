import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
// import { actionCreators as markerActions } from '../redux/modules/marker';

import styled from "styled-components";
import _ from "lodash"; // throttle, debounce 사용

// component, element 파일들 가져오기
import LogBtn from "./LogBtn";
import { Grid, Text, Button, Input } from "../elements/index";
import ModalSmallPost from "./ModalSmallPost";
import { markerdata } from "./MarkerData";

// window 객체로부터 kakao mpa api를 호출하기
// 이것이 되게 하기 위해서는 index.html(index.js 아님!!!)의 script 태그안의 src에다가
// 카카오개발자 사이트에서 지정해준 apikey 값이 들어간 링크를 넣어줘야 한다.
const { kakao } = window;

const Maps = (props) => {
  const dispatch = useDispatch();
  // const is_login = useSelector((state) => state.user.is_login);

  // 사진이 나오는 모달창 제어
  const [is_modal, setModal] = useState(false); // 마커 클릭하면 나오는 작은 모달
  const [is_wideModal, setWideModal] = useState(false); // 작은 모달에서 댓글 달기를 누르면 나오는 확장된 모달

  // 위도, 경도, 마커, 주소
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [address, setAddress] = useState();
  const [markerId, setMarkerId] = useState();
  const [_map, setMap] = useState();

  // search가 변경 될때마다 화면 렌더링
  const [search, setSearch] = useState("");
  //조건 걸어주기 // 나를 기준으로 몇 km 이내

  // 이래야 화면 렌더링이 계속안된다
  const debounce = _.debounce((e) => {
    setSearch(e.target.value);
  }, 300); //키보드 떼면 입력한게 0.3초 뒤에 나타난다.

  // 페이지가 렌더링 되면 지도 띄우기
  useEffect(() => {
    mapscript();
  }, [search]);

  const mapscript = () => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(37.526667, 127.028011), //지도 중심(시작) 좌표, LatLng 클래스는 반드시 필요.
      level: 5, //지도 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도생성 및 객체 리턴
    // -----------------------------------------------------------------------------------
    // 여기까지는 지도를 가져오기 위한 필수 부분
    // 아래부터 우리가 원하는걸 구현하는 코드를 작성한다.
    // -----------------------------------------------------------------------------------

    // useEffect 밖으로 map정보를 가져오기 위해서 useState로 함수를 만든다.
    setMap(map);

    // 마커 이미지
    // 디자이너분들이 만들어주실 종류별 마커 이미지들이 저장된 url을 변수에 할당
    // const myMarkerSrc = "http://........./../....png"
    // const myMarkerSize = new kakao.maps.Size(35, 35);
    // const myMarkerImage = new kakao.maps.MarkerImage(myMarker, )
    // const 

    // 커스텀오버레이 : 마커위에 인포윈도우가 아니라 모달창을 띄우기
    // 커스텀오버레이에 표시할 내용
    // Dom elements : 이걸 모달로 가져오는건 어떻게 할까?
    // const content = () => {
    //   return ModalSmallPost;
    // }
    // 커스텀오버레이 : 글자만
    const content = '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>';

    // 커스텀오버레이가 표시 될 위치
    const position = new kakao.maps.LatLng(37.526667, 127.028011);

    // 커스텀오버레이를 생성
    const customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
    })
    // 커스텀오버레이를 지도 위에 표시
    customOverlay.setMap(map);

    // 커스텀오버레이 : 박스형태
    const contentBoxType = '<div class="overlaybox">' +
    '    <div class="boxtitle">금주 영화순위</div>' +
    '    <div class="first">' +
    '        <div class="triangle text">1</div>' +
    '        <div class="movietitle text">드래곤 길들이기2</div>' +
    '    </div>' +
    '    <ul>' +
    '        <li class="up">' +
    '            <span class="number">2</span>' +
    '            <span class="title">명량</span>' +
    '            <span class="arrow up"></span>' +
    '            <span class="count">2</span>' +
    '        </li>' +
    '        <li>' +
    '            <span class="number">3</span>' +
    '            <span class="title">해적(바다로 간 산적)</span>' +
    '            <span class="arrow up"></span>' +
    '            <span class="count">6</span>' +
    '        </li>' +
    '        <li>' +
    '            <span class="number">4</span>' +
    '            <span class="title">해무</span>' +
    '            <span class="arrow up"></span>' +
    '            <span class="count">3</span>' +
    '        </li>' +
    '        <li>' +
    '            <span class="number">5</span>' +
    '            <span class="title">안녕, 헤이즐</span>' +
    '            <span class="arrow down"></span>' +
    '            <span class="count">1</span>' +
    '        </li>' +
    '    </ul>' +
    '</div>';

    // 박스형태 커스텀오버레이가 표시 될 위치
    const positionOfBox = new kakao.maps.LatLng(37.5268, 127.021000);

    // 커스텀오버레이를 생성
    const customOverlayOfBox = new kakao.maps.CustomOverlay({
      position: positionOfBox,
      content: contentBoxType,
      xAnchor: 0.3,
      yAnchor: 0.91,
    })
    // 커스텀오버레이를 지도 위에 표시
    customOverlayOfBox.setMap(map);

    // 마커
    // 마커가 표시될 위치.
    const markerPosition = new kakao.maps.LatLng(
      37.465264512305174,
      127.10676860117488
    );

    // 마커를 생성하기.
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      // position: map.getCenter, // 지도 중심좌표에 마커 생성
    });

    // 마커를 지도 위에 표시하기.
    marker.setMap(map);

    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }

    // 마커를 가져온다. 처음엔 mockdata로 나중엔 서버에서 가져온다.
    markerdata.forEach((el) => {
      // 마커 생성
      new kakao.maps.Marker({
        map: map, // 마커가 표시 될 지도
        position: new kakao.maps.LatLng(el.lat, el.lng), // 마커가 표시될 위치
        title: el.title, // 마커에 hover 하면 나타날 title
      });
    });



    // -----------------------------------------------------------------------------------
    // 마커는 여기까지
    // -----------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------
    // 여기서부터 검색 기능 : 키워드로 검색하기
    // 마커에 마우스를 올리면 정보가 뜨는 창 : 인포윈도우 설정
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(`${search}`, placesSearchCB); // 여길 바꿔주면 검색이 된다

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]); // 아래쪽에 있는 지도에 마커를 표시하는 함수
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
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
      <MapBox>
        {/* 위에서 설정된 getElementById("map")에 의해서 id="map"인 div에 맵이 표시된다 */}
        <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      </MapBox>
    </React.Fragment>
  );
};

export default Maps;

const SearchBox = styled.div`
  position: absolute;
  top: 80px;
  left: 30%;
  transform: translate(-60%, -50%);
  z-index: 10;
`;

const SearchInput = styled.input`
  height: 50px;
  width: 500px;
  border-radius: 10px;
  padding-left: 15px;
  font-size: 15px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
`;
