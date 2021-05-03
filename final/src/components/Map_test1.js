import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { history } from '../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
// import { actionCreators as markerActions } from '../redux/modules/marker';

import styled from "styled-components";
import _ from "lodash"; // throttle, debounce 사용

// component, element 파일들 가져오기
import LogBtn from "../components/LogBtn";
import {Grid, Text, Button, Input} from '../elements/index';
import ModalInMain from "../components/ModalInMain";;

// window 객체로부터 kakao mpa api를 호출하기
// 이것이 되게 하기 위해서는 index.html(index.js 아님!!!)의 script 태그안의 src에다가
// 카카오개발자 사이트에서 지정해준 apikey 값이 들어간 링크를 넣어줘야 한다.
const { kakao } = window;  

const Maps = (props) => {
  const dispatch = useDispatch();
  // const is_login = useSelector((state) => state.user.is_login);

  // 사진이 나오는 모달창 제어
  const [ is_modal, setModal ] = useState(false);  // 마커 클릭하면 나오는 작은 모달
  const [ is_wideModal, setWideModal ] = useState(false); // 작은 모달에서 댓글 달기를 누르면 나오는 확장된 모달
  
  // 위도, 경도, 마커, 주소
  const [ latitude, setLatitude] = useState();
  const [ longitude, setLongitude ] = useState();
  const [ address, setAddress ] = useState();
  const [ markerId, setMarkerId ] = useState();
  const [ _map, setMap ] = useState();

  // search가 변경 될때마다 화면 렌더링
  const [search, setSearch] = useState(""); 
  //조건 걸어주기 // 나를 기준으로 몇 km 이내

  // 이래야 화면 렌더링이 계속안된다
  const debounce = _.debounce((e) => {
    setSearch(e.target.value);
  }, 300); //키보드 떼면 입력한게 1초 뒤에 나타난다.

  // 페이지가 렌더링 되면 지도 띄우기
  useEffect(() => {
    const container = document.getElementById("map");  // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(37.526667, 127.028011), //지도 중심(시작) 좌표, LatLng 클래스는 반드시 필요.
      level: 3, //지도 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도생성 및 객체 리턴
    // ----------------------------------------------------------------------------------- //
    // 여기까지는 지도를 가져오기 위한 필수 부분
    // 아래부터 우리가 원하는걸 구현하는 코드를 작성한다.
    // ----------------------------------------------------------------------------------- //

    // useEffect 밖으로 map정보를 가져오기 위해서 useState로 함수를 만든다.
    setMap(map)

    // 마커 이미지
    // 디자이너분들이 만들어주실 종류별 마커 이미지들이 저장된 url
    // const myMarker = "http://........./../....png"

    var markerPosition = new kakao.maps.LatLng(
      37.465264512305174,
      127.10676860117488
    );
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // 카테고리 별 검색 기능/////////////////////

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(`${search}`, placesSearchCB); // 여길 바꿔주면 검색이 된다

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
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

    // dispatch(markerActions.getMarkerAPI());
  }, [search]);

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
        <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      </MapBox>
    </React.Fragment>
  );
};

export default Maps;

const SearchBox = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
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
    outline:none;
  }
`;

const MapBox = styled.div`
  width: 100vw;
  height: 100vh;
`;
