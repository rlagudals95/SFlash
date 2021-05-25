import React, { useState, useEffect } from "react";
// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { useDispatch, useSelector } from "react-redux";
import { markerImgUrls } from "../shared/configMarkerImgUrl"; // 마커이미지url

import styled from "styled-components";
import _ from "lodash"; // throttle, debounce 사용
import * as BiIcons from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io"
import Swal from "sweetalert2";
// component, element 파일들 가져오기
import "../Css/Map.css";
import UpLoadModal from "./UpLoadModal";
import CategoryInMap from "../components/CategoryInMap";
import { actionCreators as ModalActions } from "../redux/modules/mapModal";
import MapModal from "./MapModal";

// window 객체로부터 kakao mpa api를 호출하기
// 이것이 되게 하기 위해서는 index.html(index.js 아님!!!)의 script 태그안의 src에다가
// 카카오개발자 사이트에서 지정해준 apikey 값이 들어간 링크를 넣어줘야 한다.
const { kakao } = window;

const Maps = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const nickname = localStorage.getItem("nickname"); // 내가 작성한 게시물을 판별하는 기준 상수

  // 사진이 나오는 모달창 제어
  const [is_uploadModal, setUpLoadModal] = useState(false); // 작은 모달에서 댓글 달기를 누르면 나오는 확장된 모달

  // 위도, 경도, 마커, 주소
  const [startLat, setStartLat] = useState(); // 접속한 위치 위도 설정
  const [startLng, setStartLng] = useState(); // 접속한 위치 경도 설정
  const [latitude, setLatitude] = useState(); // 클릭한 위치 위도 설정
  const [longitude, setLongitude] = useState(); // 클릭한 위치 경도 설정
  const [spotName, setSpotName] = useState(""); // 클릭한 위치 spotName

  const [_map, setMap] = useState(); // useEffect 외부에서 map을 쓰기 위한 것.
  const [search, setSearch] = useState(""); // search가 변경 될때마다 화면 렌더링되도록 useEffect에 [search]를 넣어준다.
  //조건 걸어주기 // 나를 기준으로 몇 km 이내

  // 카테고리 제어하기 : 12가지 + 전체카테고리
  const is_category_in_map = useSelector((state) => {
    return state.category_in_map.is_category_in_map;
  });
  // console.log("is_category_in_map: " + is_category_in_map);
  const is_all = is_category_in_map.length === 12 ? true : false;
  // console.log(is_all);

  // is_category_in_map 배열 안에 해당 카테고리가 원소로서 존재 여부를 true, false로 설정한다.
  const is_mypost = is_category_in_map.includes("내꺼");
  const is_mylike = is_category_in_map.includes("내좋아요");
  const is_cafe = is_category_in_map.includes("카페"); //요게 카페가 나온다는건? 배열안에 카페가 있다는 것!
  const is_night = is_category_in_map.includes("야경");
  const is_ocean = is_category_in_map.includes("바다");
  const is_mountain = is_category_in_map.includes("산");
  const is_flower = is_category_in_map.includes("꽃");
  const is_alone = is_category_in_map.includes("나홀로");
  const is_couple = is_category_in_map.includes("연인");
  const is_friend = is_category_in_map.includes("친구");
  const is_pet = is_category_in_map.includes("반려동물");
  const is_city = is_category_in_map.includes("도심");
  const is_park = is_category_in_map.includes("공원");
  const is_exhibition = is_category_in_map.includes("전시");

  // 모든 게시물의 데이터들을 받아 온다.
  const map_post_list = useSelector((state) => {
    return state.post.map_post_list; // 비동기 문제 해결
  });

  console.log();

  // 디테일 모달 관련 상태값
  const [is_detailModal, setDetailModal] = useState();

  const openModal = () => {
    setDetailModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };

  // if (map_post_list) {
  //   console.log(map_post_list);
  // }

  // 종류별 데이터는 필터 함수를 이용해 묶어 내고 필요한 부분에 가져다 쓴다.
  // 전체 마커, 내 마커, 내가 좋아요한 마커
  // 1. 내가 작성한 게시물이 데이터
  const myPostData = map_post_list.filter(
    (map_post_list) => map_post_list.writerName == nickname
  );
  // console.log("내 작성 게시물 왔나??: " + myPostData);
  // 1. 내가 작성한한 게시물 데이터를 다시 카테고리별로 데이터분류 시작!!!
  const myPostCafe = myPostData.filter(
    (myPostData) => myPostData.category === "카페" // 1. 카페
  );
  const myPostNight = myPostData.filter(
    (myPostData) => myPostData.category === "야경" // 2. 야경
  );
  const myPostOcean = myPostData.filter(
    (myPostData) => myPostData.category === "바다" // 3. 바다
  );
  const myPostMountain = myPostData.filter(
    (myPostData) => myPostData.category === "산" // 4. 산
  );
  const myPostFlower = myPostData.filter(
    (myPostData) => myPostData.category === "꽃" // 5. 꽃
  );
  const myPostAlone = myPostData.filter(
    (myPostData) => myPostData.category === "나홀로" // 6. 나홀로
  );
  const myPostCouple = myPostData.filter(
    (myPostData) => myPostData.category === "연인" // 7. 연인
  );
  const myPostFriend = myPostData.filter(
    (myPostData) => myPostData.category === "친구" // 8. 친구
  );
  const myPostPet = myPostData.filter(
    (myPostData) => myPostData.category === "반려동물" // 9. 반려동물
  );
  const myPostCity = myPostData.filter(
    (myPostData) => myPostData.category === "도심" // 10. 도심
  );
  const myPostPark = myPostData.filter(
    (myPostData) => myPostData.category === "공원" // 11. 공원
  );
  const myPostExhibition = myPostData.filter(
    (myPostData) => myPostData.category === "전시" // 12. 전시
  );
  // 1. 내가 작성한한 게시물 데이터를 다시 카테고리별로 데이터분류 끝!!!

  // 2. 내가 좋아요한 데이터
  const myLikeData = map_post_list.filter(
    (map_post_list) => map_post_list.like == true
  );
  // console.log("내좋아요 데이터있나??: " + myLikeData);
  // 2. 내가 좋아요한 게시물 데이터를 다시 카테고리별로 데이터분류 시작!!!
  const myLikeCafe = myLikeData.filter(
    (myLikeData) => myLikeData.category === "카페" // 1. 카페
  );
  const myLikeNight = myLikeData.filter(
    (myLikeData) => myLikeData.category === "야경" // 2. 야경
  );
  const myLikeOcean = myLikeData.filter(
    (myLikeData) => myLikeData.category === "바다" // 3. 바다
  );
  const myLikeMountain = myLikeData.filter(
    (myLikeData) => myLikeData.category === "산" // 4. 산
  );
  const myLikeFlower = myLikeData.filter(
    (myLikeData) => myLikeData.category === "꽃" // 5. 꽃
  );
  const myLikeAlone = myLikeData.filter(
    (myLikeData) => myLikeData.category === "나홀로" // 6. 나홀로
  );
  const myLikeCouple = myLikeData.filter(
    (myLikeData) => myLikeData.category === "연인" // 7. 연인
  );
  const myLikeFriend = myLikeData.filter(
    (myLikeData) => myLikeData.category === "친구" // 8. 친구
  );
  const myLikePet = myLikeData.filter(
    (myLikeData) => myLikeData.category === "반려동물" // 9. 반려동물
  );
  const myLikeCity = myLikeData.filter(
    (myLikeData) => myLikeData.category === "도심" // 10. 도심
  );
  const myLikePark = myLikeData.filter(
    (myLikeData) => myLikeData.category === "공원" // 11. 공원
  );
  const myLikeExhibition = myLikeData.filter(
    (myLikeData) => myLikeData.category === "전시" // 12. 전시
  );
  // 2. 내가 좋아요한 게시물 데이터를 다시 카테고리별로 데이터분류 끝!!!

  // 각 카테고리별 데이터
  const cafeData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "카페"
  );
  const nightData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "야경"
  );
  const oceanData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "바다"
  );
  const mountainData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "산"
  );
  const flowerData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "꽃"
  );
  const aloneData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "나홀로"
  );
  const coupleData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "연인"
  );
  const friendData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "친구"
  );
  const petData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "반려동물"
  );
  const cityData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "도심"
  );
  const parkData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "공원"
  );
  const exhibitionData = map_post_list.filter(
    (map_post_list) => map_post_list.category === "전시"
  );

  // 검색시 화면 렌더링을  제어합니다.(타이핑 할 때마다 렌더링 되지 않도록)
  const debounce = _.debounce((e) => {
    setSearch(e.target.value);
  }, 300); //키보드 떼면 입력한게 0.3초 뒤에 나타난다.

  // getLocation();
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
    if (!map_post_list) {
      return;
    } else {
      // 지도 렌더링 코드
      // 페이지가 렌더링 되면 지도 띄우기
      var container = document.getElementById("map"); // 지도를 표시할 div
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(startLat, startLng), //지도 중심(시작) 좌표, LatLng 클래스는 반드시 필요.
        level: 11, //지도 확대 레벨
      };

      var map = new kakao.maps.Map(container, options); // 지도생성 및 객체 리턴
      // -----------------------------------------------------------------------------------
      // 여기까지는 지도를 가져오기 위한 필수 부분.
      // 아래부터 우리가 원하는걸 구현하는 코드를 작성한다.
      // -----------------------------------------------------------------------------------

      // useEffect 밖으로 map정보를 가져오기 위해서 useState로 함수를 만든다.
      setMap(map);
    }

    // geolocation으로 얻은 접속좌표에다가 현재위치를 표시하는 마커 또는 표식 올리기
    const currentMarkerSize = new kakao.maps.Size(30, 30);
    const currentMarkerImage = new kakao.maps.MarkerImage(
      `${markerImgUrls.currentMarkerImageUrl}`,
      currentMarkerSize
    );
    const currentPosition = new kakao.maps.LatLng(startLat, startLng);

    const currentMarker = new kakao.maps.Marker({
      map: map, // 이러면 애초에 현재 위치가 표시된다.
      position: currentPosition,
      image: currentMarkerImage,
      zIndex: 50,
    });

    currentMarker.setMap(map);

    // var centerPoint = map.getCenter();
    // console.log("중심좌표: " + centerPoint);
    // console.log("중심좌표 위도: " + centerPoint.getLat());
    // console.log("중심좌표 경도: " + centerPoint.getLng());

    // 콘솔창에 클릭한 위치의 위도 경도가 표시되는 코드
    // 지도에 클릭 이벤트를 등록합니다 : 클릭하면 위도, 경도, 주소 정보를 받고 작성창이 뜨게 한다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다.

    // services.Geocoder() 는 주소-좌표간 변환 서비스를 제공한다.
    var geocoder = new kakao.maps.services.Geocoder();

    // ** 주의!!! 구현된것들이 안정적으로 돌아간다고 판단된 이후에는
    // ** 로그인 한 사람만 할 수 있는 클릭이벤트가 되도록
    // ** 아래처럼 if문으로 설정한다.
    // window.alert("로그인 해야 게시물을 작성할 수 있어요!")
    if (!is_login) {
      kakao.maps.event.addListener(map, "click", function () {
        return;
      });
    } else {
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        var latlng = mouseEvent.latLng;
        var hereLat = latlng.getLat(); // 위도 = latlng.Ma = latlng.getLat()
        var hereLng = latlng.getLng(); // 경도 = latlng.La = latlng.getLng()
        setLatitude(hereLat); // useState() : 위도 latitude 값 전역으로 설정
        setLongitude(hereLng); // useState() : 경도 longitude 값 전역으로 설정
        // console.log(latitude + " " + longitude);

        // var message = "클릭한 위치의 위도는 " + hereLat + " 이고, ";
        // message += "경도는 " + hereLng + " 입니다";
        // // console.log(message);

        // // 위도 경도 좌표로 주소 알아내기
        // var coord = new kakao.maps.LatLng(hereLat, hereLng);
        // console.log(coord);

        // 좌표 => 주소 변환 코드 시작!!!
        // 좌표 => 법정동 주소(지번주소, 도로명주소 포함)
        // 위도, 경도 좌표로 행정동 주소 정보를 요청하는 코드 시작!!
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              //서버로 보낼 장소 이름(spotName) 데이터를 구한다.
              if (result[0].road_address == null) {
                // 도로명 주소가 없다면 지번 주소로
                setSpotName(result[0].address.address_name);
              } else {
                setSpotName(result[0].road_address.address_name); // 도로명주소가 있으면 도로명주소로
              }
            }
          }
        );
        // 위도,경도 좌표로 법정동(상세) 주소 정보를 요청하는 함수
        function searchDetailAddrFromCoords(coords, callback) {
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
        // 좌표 => 주소 변환 코드 끝!!!

        // 작성용 마커를 띄우기
        // 작성용 마커를 클릭하면 게시물 작성창이 뜨게 하기 : 로그인 한 사람만 되게 하기
        var imageSize = new kakao.maps.Size(42, 63);
        var writeMarkerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.writeMarkerImgUrl}`,
          imageSize
        );

        var writePosition = new kakao.maps.LatLng(hereLat, hereLng);
        var writeMarker = new kakao.maps.Marker({
          // 클릭한 위치에 게시물 작성용 마커를 띄워준다.
          // map: map,
          position: writePosition,
          image: writeMarkerImage,
          // clickable: true,
          zIndex: 50,
        });

        writeMarker.setMap(map);

        // 작성용 마커를 사용하는 방법을 알려주는 인포윈도우
        // 작성용 마커위에 갖다대면 뜨고(mouseover) 마우스를 떼면(mouseout) 사라진다.
        // 작성용 마커에 우클릭을 하면 마커가 사라지면서 인포윈도우도 사라진다.
        // var writeGuideContent =
        //   '<div class="writeinfobox">' +
        //   `<img class="writeinfowindow" src=${writeInfoWindow}>` +
        //   "</div>";

        // // 인포윈도우 생성하기
        // var writeGuideWindow = new kakao.maps.InfoWindow({
        //   position: writePosition,
        //   content: writeGuideContent,
        // });

        // 마커에 안내용 커스텀오버레이를 제어하는 mouseover 이벤트와 mouseout 이벤트를 등록한다.
        // mouseover : 안내창 생성, mouseout, rightclick: 안내창 닫기
        // kakao.maps.event.addListener(
        //   writeMarker,
        //   "mouseover",
        //   mouseOverListener(map, writeMarker, writeGuideWindow)
        // );
        // kakao.maps.event.addListener(
        //   writeMarker,
        //   "mouseout",
        //   mouseOutListener(writeGuideWindow)
        // );
        // kakao.maps.event.addListener(
        //   writeMarker,
        //   "rightclick",
        //   mouseRightClickListener(writeGuideWindow)
        // );

        // // 작성용 마커에 안내창을 띄우는 클로저를 만드는 함수 : mouseover
        // function mouseOverListener(map, writeMarker, writeGuideWindow) {
        //   return function () {
        //     writeGuideWindow.open(map, writeMarker);
        //   };
        // }

        // // 작성용 마커의 안내창을 닫는 클로저를 만드는 함수 : mouseout
        // function mouseOutListener(writeGuideWindow) {
        //   return function () {
        //     writeGuideWindow.close();
        //   };
        // }

        // // 작성용 마커의 안내창을 닫는 클로저를 만드는 함수 : rightclick
        // function mouseRightClickListener(writeGuideWindow) {
        //   return function () {
        //     writeGuideWindow.close();
        //   };
        // }

        // 게시물 작성법을 안내하는 커스텀오버레이
        // 모달창(커스텀오버레이)에 들어갈 내용
        const writeInfoContent = '<div class="writeinfocontainer"><div/>';

        const writeInfoCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: writePosition, // 커스텀 오버레이의 좌표
          content: writeInfoContent, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.8, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 100, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(writeMarker, "mouseover", function () {
          writeInfoCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(writeMarker, "mouseout", function () {
          writeInfoCustomOverlay.setMap(null);
        });

        //마커에서 우클릭하면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(writeMarker, "rightclick", function () {
          writeInfoCustomOverlay.setMap(null);
        });

        // 작성용마커를 클릭하면 게시물 작성모달창이 뜨게 하기 : 개발중에는 로그인 없이도 되게 하기
        // 이거 이용해서 디테일 모달 띄우는 것도 구현 가능하지 않을까?
        kakao.maps.event.addListener(writeMarker, "click", function () {
          setUpLoadModal(true);
        });

        kakao.maps.event.addListener(writeMarker, "rightclick", function () {
          writeMarker.setMap(null);
        });

        // 게시물 작성용 마커가 있는 상태에서 지도상의 다른 곳을 클릭하면
        // 원래 있던 게시물 작성용 마커는 사라지고, 새로 클릭한 자리에 게시물 작성용 마커가 뜨게 한다.
        kakao.maps.event.addListener(map, "click", function () {
          writeMarker.setMap(null);
        });
      }); // 작성용 마커를 지도위에 띄우는 지도클릭이벤트 종료!!!
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

    // 1. 내가 작성한 게시물만, 카테고리별로 데이터 나누기 : 모든 종류의 마커들 + 커스텀 오버레이
    // 93-128번줄에 내가 작성한 게시물 데이터를 카테고리별로 나눠둠. 그것들을 가져와서 아래 코드를 작성한다.
    if (is_mypost) {
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
    // 내가 작성한 게시물만 : 끝!!!

    // 2. 내가 좋아요한 게시물만, 카테고리별로 데이터 나누기 : 좋아요마커 + 커스텀 오버레이
    if (is_mylike) {
      // 134-176번줄에 내가 좋아요한 게시물 데이터 카테고리별로 나눠둠. 그것들을 가져와서 아래 코드를 작성
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
    // 내가 좋아요한 게시물만 : 끝!!!!

    // 카테고리별 마커 + 커스텀오버레이 제어 시작!!
    // 1. 카페 카테고리 : 카페마커 + 커스텀 오버레이
    if (is_cafe) {
      cafeData.forEach((cafe) => {
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.cafeMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
        var cafeMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${cafe.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${cafe.spotName1}</div>` +
          `<div class="spotname2">${cafe.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var cafeCustomOverlay = new kakao.maps.CustomOverlay({
          // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다
          clickable: true, // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
          position: position, // 커스텀 오버레이의 좌표
          content: content, // 엘리먼트 또는 HTML 문자열 형태의 내용
          xAnchor: 0.5, // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          yAnchor: 1.27, // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
          zIndex: 10000, //  커스텀 오버레이의 z-index
          altitude: 10,
        });

        // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
        kakao.maps.event.addListener(cafeMarkers, "mouseover", function () {
          cafeCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(cafeMarkers, "mouseout", function () {
          cafeCustomOverlay.setMap(null);
        });

        kakao.maps.event.addListener(cafeMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(cafe.id));
          // dispatch(ModalActions.getModalPostAPI(cafe.id));
          openModal();
        });
      });
    }

    // 2. 밤카테고리 : 밤마커 + 커스텀 오버레이
    if (is_night) {
      nightData.forEach((night) => {
        // nightData를 mockdata로 구현가능한지 테스트 할 것!
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.nightMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(night.latitude, night.longitude);
        var nightMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${night.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${night.spotName1}</div>` +
          `<div class="spotname2">${night.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var nightCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(nightMarkers, "mouseover", function () {
          nightCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(nightMarkers, "mouseout", function () {
          nightCustomOverlay.setMap(null);
        });
        kakao.maps.event.addListener(nightMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(night.id));
          // dispatch(ModalActions.getModalPostAPI(night.id));
          openModal();
        });
      });
    }

    // 3. 바다카테고리 : 바다마커 + 커스텀 오버레이
    if (is_ocean) {
      oceanData.forEach((ocean) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.oceanMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(ocean.latitude, ocean.longitude);
        var oceanMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${ocean.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${ocean.spotName1}</div>` +
          `<div class="spotname2">${ocean.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var oceanCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(oceanMarkers, "mouseover", function () {
          oceanCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(oceanMarkers, "mouseout", function () {
          oceanCustomOverlay.setMap(null);
        });
        kakao.maps.event.addListener(oceanMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(ocean.id));
          // dispatch(ModalActions.getModalPostAPI(ocean.id));
          openModal();
        });
      });
    }

    // 4. 산카테고리 : 산마커 + 커스텀 오버레이
    if (is_mountain) {
      mountainData.map((mountain) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.mountainMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(
          mountain.latitude,
          mountain.longitude
        );
        var mountainMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${mountain.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${mountain.spotName1}</div>` +
          `<div class="spotname2">${mountain.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var mountainCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(mountainMarkers, "mouseover", function () {
          mountainCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(mountainMarkers, "mouseout", function () {
          mountainCustomOverlay.setMap(null);
        });

        kakao.maps.event.addListener(mountainMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(mountain.id));
          // dispatch(ModalActions.getModalPostAPI(mountain.id));
          openModal();
        });
      });
    }

    // 5. 꽃카테고리 : 꽃마커 + 커스텀 오버레이
    if (is_flower) {
      flowerData.forEach((flower) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.flowerMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(flower.latitude, flower.longitude);
        var flowerMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${flower.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${flower.spotName1}</div>` +
          `<div class="spotname2">${flower.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var flowerCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(flowerMarkers, "mouseover", function () {
          flowerCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(flowerMarkers, "mouseout", function () {
          flowerCustomOverlay.setMap(null);
        });

        kakao.maps.event.addListener(flowerMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(flower.id));
          // dispatch(ModalActions.getModalPostAPI(flower.id));
          openModal();
        });
      });
    }

    // 6. 나홀로카테고리 : 나홀로마커 + 커스텀 오버레이
    if (is_alone) {
      aloneData.map((alone) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.aloneMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(alone.latitude, alone.longitude);
        var aloneMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${alone.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${alone.spotName1}</div>` +
          `<div class="spotname2">${alone.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var aloneCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(aloneMarkers, "mouseover", function () {
          aloneCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(aloneMarkers, "mouseout", function () {
          aloneCustomOverlay.setMap(null);
        });

        kakao.maps.event.addListener(aloneMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(alone.id));
          // dispatch(ModalActions.getModalPostAPI(alone.id));
          openModal();
        });
      });
    }

    // 7. 커플카테고리 : 커플마커 + 커스텀 오버레이
    if (is_couple) {
      coupleData.forEach((couple) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.coupleMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(couple.latitude, couple.longitude);
        var coupleMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${couple.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${couple.spotName1}</div>` +
          `<div class="spotname2">${couple.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var coupleCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(coupleMarkers, "mouseover", function () {
          coupleCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(coupleMarkers, "mouseout", function () {
          coupleCustomOverlay.setMap(null);
        });
        kakao.maps.event.addListener(coupleMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(couple.id));
          // dispatch(ModalActions.getModalPostAPI(couple.id));
          openModal();
        });
      });
    }

    // 8. 친구카테고리 : 친구마커 + 커스텀 오버레이
    if (is_friend) {
      friendData.forEach((friend) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.friendMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(friend.latitude, friend.longitude);
        var friendMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${friend.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${friend.spotName1}</div>` +
          `<div class="spotname2">${friend.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var friendCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(friendMarkers, "mouseover", function () {
          friendCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(friendMarkers, "mouseout", function () {
          friendCustomOverlay.setMap(null);
        });
        kakao.maps.event.addListener(friendMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(friend.id));
          // dispatch(ModalActions.getModalPostAPI(friend.id));
          openModal();
        });
      });
    }

    // 9. 반려동물카테고리 : 반려동물마커 + 커스텀 오버레이
    if (is_pet) {
      petData.forEach((pet) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.petMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(pet.latitude, pet.longitude);
        var petMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${pet.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${pet.spotName1}</div>` +
          `<div class="spotname2">${pet.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var petCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(petMarkers, "mouseover", function () {
          petCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(petMarkers, "mouseout", function () {
          petCustomOverlay.setMap(null);
        });

        kakao.maps.event.addListener(petMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(pet.id));
          // dispatch(ModalActions.getModalPostAPI(pet.id));
          openModal();
        });
      });
    }

    // 10. 도심카테고리 : 도심마커 + 커스텀 오버레이
    if (is_city) {
      cityData.forEach((city) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.cityMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(city.latitude, city.longitude);
        var cityMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${city.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${city.spotName1}</div>` +
          `<div class="spotname2">${city.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        var cityCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(cityMarkers, "mouseover", function () {
          cityCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(cityMarkers, "mouseout", function () {
          cityCustomOverlay.setMap(null);
        });
        kakao.maps.event.addListener(cityMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(city.id));
          // dispatch(ModalActions.getModalPostAPI(city.id));
          openModal();
        });
      });
    }

    // 11. 공원카테고리 : 공원마커 + 커스텀 오버레이
    if (is_park) {
      parkData.forEach((park) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        var imageSize = new kakao.maps.Size(42, 63);
        var markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.parkMarkerImgUrl}`,
          imageSize
        );
        var position = new kakao.maps.LatLng(park.latitude, park.longitude);
        var parkMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${park.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${park.spotName1}</div>` +
          `<div class="spotname2">${park.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const parkCustomOverlay = new kakao.maps.CustomOverlay({
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
        kakao.maps.event.addListener(parkMarkers, "mouseover", function () {
          parkCustomOverlay.setMap(map);
        });

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(parkMarkers, "mouseout", function () {
          parkCustomOverlay.setMap(null);
        });

        kakao.maps.event.addListener(parkMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(park.id));
          // dispatch(ModalActions.getModalPostAPI(park.id));
          openModal();
        });
      });
    }

    // 12. 전시카테고리 : 전시마커 + 커스텀 오버레이
    if (is_exhibition) {
      exhibitionData.forEach((exhibition) => {
        // 서버와 연결해서 받은 데이터로 맵함수를 돌린다.
        const imageSize = new kakao.maps.Size(42, 63);
        const markerImage = new kakao.maps.MarkerImage(
          `${markerImgUrls.exhibitionMarkerImgUrl}`,
          imageSize
        );
        const position = new kakao.maps.LatLng(
          exhibition.latitude,
          exhibition.longitude
        );
        const exhibitionMarkers = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage,
        });

        // 모달창(커스텀오버레이)에 들어갈 내용
        const content =
          '<div class="modalcontainer">' +
          `<img class="picbox" src=${exhibition.imgForOverlay} >` +
          '<div class="head">' +
          `<div class="spotname1">${exhibition.spotName1}</div>` +
          `<div class="spotname2">${exhibition.spotName2}</div>` +
          "</div>" +
          "</div>";

        // 모달창(커스텀오버레이) 객체를 생성
        const exhibitionCustomOverlay = new kakao.maps.CustomOverlay({
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
          exhibitionMarkers,
          "mouseover",
          function () {
            exhibitionCustomOverlay.setMap(map);
          }
        );

        //마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
        kakao.maps.event.addListener(
          exhibitionMarkers,
          "mouseout",
          function () {
            exhibitionCustomOverlay.setMap(null);
          }
        );

        kakao.maps.event.addListener(exhibitionMarkers, "click", function () {
          // 서버로 해당 마커의 id를 보내고 모달창 오픈
          dispatch(ModalActions.getModalPostAPI(exhibition.id));
          // dispatch(ModalActions.getModalPostAPI(park.id));
          openModal();
        });
      });
    }

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성하기.
    // var mapTypeControl = new kakao.maps.MapTypeControl();
    // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성하기.
  // var zoomControl = new kakao.maps.ZoomControl();
  // map.addControl(zoomControl, kakao.maps.ControlPosition.Right);

    // 지도 api 설정은 여기서 끝
    // 지도 api 추가/수정/삭제하면서 함수 범위를 꼬이지 않게 주의할 것.
    // useEffect의 dependency에는 카테고리 설정값이 들어간다.
    // }, [search, startlat, startlon,
    // }, [startlat, startlon]);
  }, [
    startLat,
    startLng,
    is_mypost,
    is_mylike,
    map_post_list,
    is_all,
    is_cafe,
    is_night,
    is_ocean,
    is_mountain,
    is_flower,
    is_alone,
    is_couple,
    is_friend,
    is_pet,
    is_city,
    is_park,
    is_exhibition,
  ]);

  // 업로드모달에 props로 전달되는 데이터
  if (latitude && longitude && spotName) {
    console.log(
      "위도: " +
        latitude +
        " " +
        ", 경도: " +
        longitude +
        " " +
        ", 장소: " +
        spotName
    );
  };

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

  // 작성모달 관련
  const closeUpLoadModal = () => {
    setUpLoadModal(false);
  };

  // 지도 줌인아웃기능 - 대한민국 전체 보기 
  const zoomOutKorea = () => {
    // _map.setLevel(13, {anchor: new kakao.maps.LatLng(startLat, startLng,)});
    _map.setLevel(12, 
      {animate: {duration: 500}},
      {anchor: new kakao.maps.LatLng(36.23122278638665, 127.55065523494979)},
    );
  };

  // 현접속위치 주변으로 이동해서 보기
  const moveToCurrentPosition = () => {
    const moveToCurrentPosition = new kakao.maps.LatLng(startLat, startLng);
    _map.panTo(moveToCurrentPosition)
  };

  // 지도 줌인아웃 기능
  const zoomIn = () => { 
    _map.setLevel(_map.getLevel() - 1);
  };

  const zoomOut = () => {
    _map.setLevel(_map.getLevel() + 1)
  };

  const [roadmap, setRoadmap] = useState(true);
  // const [hybridmap, setHybridmap] = useState(false);

  const setMapROADMAP = () => {
    _map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
  }
  const setMapHYBRID = () => {
    _map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
  }

  return (
    <React.Fragment>
      {/* <PopUp /> */}
      {is_detailModal ? (
        <MapModal
          // onClick={openModal}
          close={closeDetailModal}
          // {...map_post_list}
        ></MapModal>
      ) : null}

      <SearchBox>
        <SearchInput
          type="text"
          placeholder="지역으로 검색"
          onChange={debounce}
        />

        <SearchIcon>
          <BiIcons.BiSearch size="40" color="#ffb719" />
        </SearchIcon>
      </SearchBox>

      {roadmap ? (
        <MapTypeChangeContainer>
          <RoadMapSelected>지도</RoadMapSelected>
          <HybridMap 
            onClick={() => {
              setMapHYBRID();
              setRoadmap(false);
            }}
          >스카이뷰
          </HybridMap>
        </MapTypeChangeContainer>
      ) : (
        <MapTypeChangeContainer>
          <RoadMap 
            onClick={() => {
              setMapROADMAP();
              setRoadmap(true);
            }}
          >지도
          </RoadMap>
          <HybridMapSelected>스카이뷰</HybridMapSelected>
        </MapTypeChangeContainer>
      )}

      <PanControlContainer>
        <PanEntireControl onClick={zoomOutKorea}>
          지도 전체보기
        </PanEntireControl>
        <PanMyCurrentControl onClick={moveToCurrentPosition}>
          내 주변보기
        </PanMyCurrentControl>
      </PanControlContainer>

      <ZoomControlBox>
        {/* <ZoomControl onClick={zoomIn} style={{borderRight: "2pt solid #ffb719"}}> */}
        <ZoomControl onClick={zoomIn}>
          <IoMdAdd size="30" color="#ffb719"/>
        </ZoomControl>
        <ZoomControl onClick={zoomOut}>
          <IoMdRemove size="30" color="#ffb719" />
        </ZoomControl>
      </ZoomControlBox>  

      <CategoryInMap />

      <MapBox>
        {/* 위에서 설정된 getElementById("map")에 의해서 id="map"인 div에 맵이 표시된다 */}
        <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      </MapBox>

      {is_uploadModal ? (
        <UpLoadModal
          close={closeUpLoadModal}
          latitude={latitude}
          longitude={longitude}
          spotName={spotName}
        />
      ) : null}
    </React.Fragment>
  );
};

export default Maps;

const MapTypeChangeContainer = styled.div`
  position: fixed;
  width: 130px;
  height: 50px;
  top: 600px;
  right: 200px;
  display: flex;
  flex-direction: row;
  background-color: #F2F3F7;
  border: 2pt solid #ffb719;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 100;
`;

const RoadMapSelected = styled.div`
  cursor: pointer;  
  width: 50%;
  height: 100%;
  background-color: #343a40; 
  align-items: center;
  border: none;
  font-size: 0.95rem;
  text-align: center;
  color: #F2F3F7;
  font-weight: bold;
  border-radius: 10px;
  display: table-cell;
  vertical-align: middle;
  line-height: 42px;
`;

const RoadMap = styled.div`
  cursor: pointer;  
  width: 50%;
  height: 100%;
  background-color: #F2F3F7; 
  align-items: center;
  border: none;
  font-size: 0.95rem;
  text-align: center;
  color: #343a40;
  font-weight: bold;
  border-radius: 10px;
  display: table-cell;
  vertical-align: middle;
  line-height: 42px;
`;

const HybridMapSelected = styled.div`
  cursor: pointer;  
  width: 50%;
  height: 100%;
  background-color: #343a40; 
  align-items: center;
  border: none;
  font-size: 0.95rem;
  text-align: center;
  color: #F2F3F7;
  font-weight: bold;
  border-radius: 10px;
  display: table-cell;
  vertical-align: middle;
  line-height: 42px;
  padding-left: 2px;
`;

const HybridMap = styled.div`
  cursor: pointer;  
  width: 50%;
  height: 100%;
  background-color: #F2F3F7; 
  display: flex;
  align-items: center;
  border: none;
  font-size: 0.95rem;
  text-align: center;
  color: #343a40;
  font-weight: bold;
  border-radius: 10px;
  padding-left: 5px;
`;

const PanControlContainer = styled.div`
  position: fixed;
  width: 280px;
  height: 50px;
  top: 530px;
  right: 50px;
  display: flex;
  flex-direction: row;
  background-color: #F2F3F7;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 100;
`;

const PanEntireControl = styled.div`
  cursor: pointer;
  width: 50%;
  padding-top: 13px;
  padding-bottom: 21px;
  padding-left: 7px;
  border: none;
  font-size: 1rem;
  text-align: center;
  color: #343a40;
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  &:hover {
    color: #ffb719;
  } 
`;

const PanMyCurrentControl = styled.div`
  cursor: pointer;
  width: 50%;
  padding-top: 13px;
  padding-bottom: 21px;
  padding-right: 7px;
  border: none;
  font-size: 1rem;
  text-align: center;
  color: #343a40;
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  &:hover {
    color: #ffb719;
  } 
`;

const ZoomControlBox = styled.div`
  position: fixed;
  width: 130px;
  height: 50px;
  top: 600px;
  right: 50px;
  display: flex;
  flex-direction: row;
  background-color: #F2F3F7;
  border: 2pt solid #ffb719;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 100;
`;

const ZoomControl = styled.div`
  cursor: pointer;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-sizing: border-box;
  padding: 10px 10px;
  &:hover {
    color: white;
    background-color: #343a40;
    border-radius: 10px;
    border: 2pt solid #ffb719
  } 
`;

const SearchBox = styled.div`
  position: fixed;
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  border-radius: 10px;
  top: 30px;
  left: 50%;
  height: 60px;
  transform: translate(-50%, -70%);
  z-index: 3;
  @media (min-width: 1400px) {
    width: 700px;
    top: 100px;
  }
  @media (max-width: 1400px) {
    position: fixed;
    width: 400px;
    top: 140px;
    margin: auto;
  }
  @media (max-width: 600px) {
    top: 7vh;
    width: 50%;
    left: 25%;
    margin: auto 25vw;
  }
`;

const SearchInput = styled.input`
  border: 2.5pt solid #ffb719;
  box-sizing: border-box;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  padding-left: 18px;
  font-size: 1.2rem;
  &:focus {
    outline: none;
    /* box-shadow: 0 0 0 2px #ffb719; */
  }
  opacity: 0.8;
`;

const SearchIcon = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-size: cover;
  object-fit: cover;
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
`;
