import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../redux/modules/map";
import { actionCreators as userActions } from "../redux/modules/user";
// import { actionCreators as markerActions } from '../redux/modules/marker';

import styled from "styled-components";
import _ from "lodash"; // throttle, debounce 사용

// component, element 파일들 가져오기
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

  // search가 변경 될때마다 화면 렌더링되도록 useEffect에 [search]를 넣어준다.
  const [search, setSearch] = useState("");
  //조건 걸어주기 // 나를 기준으로 몇 km 이내

  // 이래야 화면 렌더링이 계속안된다
  const debounce = _.debounce((e) => {
    setSearch(e.target.value);
  }, 300); //키보드 떼면 입력한게 0.3초 뒤에 나타난다.
  
  // 지금 내 위치 좌표가 지도 중앙에 나타나게 하기
  function getLocation() {
  // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다   
      navigator.geolocation.getCurrentPosition(
        function(position) {
          console.log("현위치의 위도 = " + position.coords.latitude + ", 현위치의 경도 = " + position.coords.longitude);
          setLatitude(position.coords.latitude); 
          setLongitude(position.coords.longitude)
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
      } else {  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        window.alert("geolocation을 사용할 수 없어 현재 내 위치를 표시 할 수 없습니다")
      }
    }
    getLocation();
    // geolocation은 여기까지.

    // 페이지가 렌더링 되면 지도 띄우기
  useEffect(() => {
    // window.alert('');
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), //지도 중심(시작) 좌표, LatLng 클래스는 반드시 필요.
      level: 4, //지도 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도생성 및 객체 리턴
    // -----------------------------------------------------------------------------------
    // 여기까지는 지도를 가져오기 위한 필수 부분
    // 아래부터 우리가 원하는걸 구현하는 코드를 작성한다.
    // -----------------------------------------------------------------------------------

    // useEffect 밖으로 map정보를 가져오기 위해서 useState로 함수를 만든다.
    setMap(map);
    
    // 좌표로 주소 얻어내기.
    var geocoder = new kakao.maps.services.Geocoder();

    // // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    // searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    // kakao.maps.event.addListener(map, 'idle', function() {
    //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    // });

    // function searchAddrFromCoords(coords, callback) {
    // // 좌표로 행정동 주소 정보를 요청합니다
    //   geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);   
    // }

    // // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다.
    // function displayCenterInfo (result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // var infoDiv = document.getElementById('centerAddr');
    //     console.log(result);
    //     for (var i = 0; i < result.length; i++) {
    //       // 행정동의 region_type 값은 'H'이므로
    //       if (result[i].region_type === 'H') {
    //         const address_of_here = result[i].address_name;
    //         // console.log(infoDiv.innerHTML);
    //         dispatch(mapActions.getAddress(address_of_here));
    //         break;
    //       }
    //     }
    //   }
    // }

    // -----------------------------------------------------------------------------
    // 키워드로 검색하기
    // 장소 검색 객체를 생성합니다
    // var ps = new kakao.maps.services.Places(); 
    // // 키워드로 장소를 검색합니다
    // ps.keywordSearch(`${search}`, placeSearchCB);
    // console.log(ps.keywordSearch(`${search}`, placeSearchCB))

    // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    // function placeSearchCB (data, status, pagination) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     var bounds = new kakao.maps.LatLngBounds();

    //     for (var i = 0; i < data.length; i++) {
    //       // displayMarker(data[i], bounds);
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

    //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다.
    //       map.setBounds(bounds);
    //     }
    //   }
    // }

    // 지도에 마커를 표시하는 함수입니다
    // function displayMarker(place) {
    
    //   // 마커를 생성하고 지도에 표시합니다
    //   var marker = new kakao.maps.Marker({
    //       map: map,
    //       position: new kakao.maps.LatLng(place.y, place.x) 
    //   });

    //   // 마커에 클릭이벤트를 등록합니다
    //   kakao.maps.event.addListener(marker, 'click', function() {
    //       // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    //       infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
    //       infowindow.open(map, marker);
    //   })
    // }
  
  // 지도 api 설정은 여기서 끝
  // 지도 api 추가/수정/삭제하면서 함수 범위를 꼬이지 않게 주의할 것.  
  }, [search, latitude, longitude]);

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
        {/* <div className="hAddr">
          <h1>현재위치는</h1>
          <span id="centerAddr"></span>
          <h2>가 맞나요?</h2>
        </div> */}
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

  .hAddr {
    width: 100%;
  }

  #centerAddr {
    font-size: 20px;
    font-weight: 600;
  }
`;