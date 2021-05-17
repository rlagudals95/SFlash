import React, { useState, useEffect, useRef } from "react";

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";

import styled from "styled-components";
import * as BiIcons from "react-icons/bi";
import _ from "lodash"; // throttle, debounce 사용

// component, element 파일들 가져오기
import "../Css/Map.css";
import PostModal from "./StoryPostModal/PostModal";
import { actionCreators as ModalActions } from "../redux/modules/storypostmodal";

// window 객체로부터 kakao mpa api를 호출하기
// 이것이 되게 하기 위해서는 index.html(index.js 아님!!!)의 script 태그안의 src에다가
// 카카오개발자 사이트에서 지정해준 apikey 값이 들어간 링크를 넣어줘야 한다.
const { kakao } = window;

const StoryMap = (props) => {
  const { post_list, marker_icon } = props;
  console.log("StoryMap post_list",post_list);
  console.log("Marker marker_icon", marker_icon);

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const nickname = localStorage.getItem("nickname"); // 내가 작성한 게시물을 판별하는 기준 상수

  
  // 위도, 경도, 마커, 주소
  const [startlat, setStartLat] = useState(); // 현위치 위도 설정
  const [startlon, setStartLon] = useState(); // 현위치 경도 설정
  const [latitude, setLatitude] = useState(); // 클릭한 위치 위도 설정
  const [longitude, setLongitude] = useState(); // 클릭한 위치 경도 설정
  const [spotName, setSpotName] = useState(""); // 클릭한 위치 이름 설정
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

  useEffect(() => {
    // geolocation 제거했습니다.

    if (!post_list) {
      return;
    } else {
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

    if (post_list) {
      post_list.forEach((post) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
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
          `<img class="picbox"  src=${post.img_url[0].imgUrl} >` +
          '<div class="head">' +
          `<div class="spotname">${post.spotName}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const customOverlay = new kakao.maps.CustomOverlay({
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
        // 마커를 클릭 했을 때 디테일 모달이 나오는
        //mouseover , mouseout
        kakao.maps.event.addListener(postMarkers, "mouseover", function () {
          // 클릭하면 열기
          customOverlay.setMap(map);
        });

        kakao.maps.event.addListener(postMarkers, "mouseout", function () {
          // 우클릭하면 닫기

          customOverlay.setMap(null);
        });

        kakao.maps.event.addListener(postMarkers, "click", function () {
          // 클릭하면 모달 오픈하고 동시에 모달정보 받아오기
          console.log("마커 클릭했을 때 나오는 post.id", post.id);
          dispatch(ModalActions.getModalPostAPI(post.id)); 
          // 오픈 모달모달보다 먼저 선언되어야 한다  꼭!
          openModal();
        });
      });
    }
  }, [post_list]);

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
        // window.alert("검색결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        window.alert("검색 결과 중 오류가 발생했습니다.");
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
          <BiIcons.BiSearch size="2rem" color="rgb(255, 183, 25)" />
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
  margin-top: 25px;
  margin-left: 25px;
  z-index: 10;
  width: 350px;
`;

const SearchInput = styled.input`
  height: 45px;
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  font-size: 15px;
  border: none;
  &:focus {
    /* outline: blue; */
    border-radius: 5px;
    border-color: blue;
  }
  opacity: 0.8;
`;

const SearchIcon = styled.div`
  position: fixed;
  top: 10px;
  right: 0;
`;

const MapBox = styled.div`
  width: 100%;
  height: 650px;
  padding-top: 10px;
  position: relative;
`;
