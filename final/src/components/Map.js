import React, { useState, useEffect, useRef } from "react";
import { CustomOverlay } from 'react-kakao-maps';

// 리덕스를 이용하게 해주는 함수들, 모듈 파일 가져오기
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../redux/modules/map";
import { actionCreators as userActions } from "../redux/modules/user";
// import { actionCreators as markerActions } from '../redux/modules/marker';
import { history } from "../redux/configStore";

import styled from "styled-components";
import _ from "lodash"; // throttle, debounce 사용

// component, element 파일들 가져오기
import { markerdata } from "./MarkerMockData";
// import ModalSmallPost from "./ModalSmallPost";
import "../Css/Map.css";
import UpLoadModal from "./UpLoadModal";
import Category from "../components/Category";
import category from "../redux/modules/category";

// window 객체로부터 kakao mpa api를 호출하기
// 이것이 되게 하기 위해서는 index.html(index.js 아님!!!)의 script 태그안의 src에다가
// 카카오개발자 사이트에서 지정해준 apikey 값이 들어간 링크를 넣어줘야 한다.
const { kakao } = window;

const Maps = (props) => {
  const dispatch = useDispatch();
  // const totalPicPostData = useSelector((state) => state.map.narmal_data);
  // const is_login = useSelector((state) => state.user.is_login);
  // const is_session = sessionStorage.getItem('jwt') ? true : false;

  // 사진이 나오는 모달창 제어
  const [is_modal, setModal] = useState(false); // 마커 클릭하면 나오는 작은 모달
  const [is_uploadModal, setUpLoadModal] = useState(false); // 작은 모달에서 댓글 달기를 누르면 나오는 확장된 모달

  // 위도, 경도, 마커, 주소
  const [startlat, setStartLat] = useState();    // 현위치 위도 설정
  const [startlon, setStartLon] = useState();    // 현위치 경도 설정
  const [latitude, setLatitude] = useState();    // 클릭한 위치 위도 설정
  const [longitude, setLongitude] = useState();  // 클릭한 위치 경도 설정
  const [address, setAddress] = useState();
  const [markerId, setMarkerId] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [spotName, setSpotName] = useState("");  // 클릭한 위치 이름 설정
  const [_map, setMap] = useState();             // useEffect 외부에서 map을 쓰기 위한 것.
  const [search, setSearch] = useState(""); // search가 변경 될때마다 화면 렌더링되도록 useEffect에 [search]를 넣어준다.
  //조건 걸어주기 // 나를 기준으로 몇 km 이내

  // 카테고리 제어하기
  const is_category = useSelector((state) => state.category.is_category);
  // category 모듈의 상태값에 따른 판단여부
  const resultCafe = is_category.find((item) => item === "카페"); //요게 카페가 나온다는건? 배열안에 카페가 있다는 것!
  const resultNight = is_category.find((item) => item === "야경");
  const resultOcean = is_category.find((item) => item === "바다");
  const resultMountain = is_category.find((item) => item === "산");
  const resultFlower = is_category.find((item) => item === "꽃");
  const resultAlone = is_category.find((item) => item === "나홀로");
  const resultCouple = is_category.find((item) => item === "연인");
  const resultFreind = is_category.find((item) => item === "친구");
  const resultPet = is_category.find((item) => item === "반려동물");
  const resultCity = is_category.find((item) => item === "도심");
  const resultPark = is_category.find((item) => item === "공원");
  const resultExhibition = is_category.find((item) => item === "전시");
  
  // 각 마커별 데이터 가져오기
  // const myTotalData = useSelector((state) => state.post.my_total_data);
  // const myLikeData = useSelector((state) => state.post.my_like_data);
  // 마커 카데고리별 데이터
  // const caftData = useSelector((state) => state.post.cafe_data);
  // const nightData = useSelector((state) => state.post.night_data);
  // const oceanData = useSelector((state) => state.post.ocean_data);
  // const mountainData = useSelector((state) => state.post.mountain_data);
  // const flowerData = useSelector((state) => state.post.flower_data);
  // const aloneData = useSelector((state) => state.post.alone_data);
  // const coupleData = useSelector((state) => state.post.couple_data);
  // const friendData = useSelector((state) => state.post.friend_data);
  // const petData = useSelector((state) => state.post.pet_data);
  // const cityData = useSelector((state) => state.post.city_data);
  // const parkData = useSelector((state) => state.post.park_data);
  // const exhibitionData = useSelector((state) => state.post.exhibition_data);

  // 이래야 화면 렌더링이 계속안된다
  const debounce = _.debounce((e) => {
    setSearch(e.target.value);
  }, 300); //키보드 떼면 입력한게 0.3초 뒤에 나타난다.

  useEffect(() => {
    // window.alert('');
    getLocation();

    function getLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다   
        navigator.geolocation.getCurrentPosition(
          function(position) {
            console.log("현위치의 위도 = " + position.coords.latitude + ", 현위치의 경도 = " + position.coords.longitude);
            setStartLat(position.coords.latitude); 
            setStartLon(position.coords.longitude);
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
        } else {  // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          window.alert("geolocation을 사용할 수 없어 현재 내 위치를 표시 할 수 없습니다")
        }
      }
    // geolocation은 여기까지.
    console.log(startlat, startlon);

    // 페이지가 렌더링 되면 지도 띄우기
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(startlat, startlon), //지도 중심(시작) 좌표, LatLng 클래스는 반드시 필요.
      level: 4, //지도 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도생성 및 객체 리턴
    // -----------------------------------------------------------------------------------
    // 여기까지는 지도를 가져오기 위한 필수 부분.
    // 아래부터 우리가 원하는걸 구현하는 코드를 작성한다.
    // -----------------------------------------------------------------------------------

    // useEffect 밖으로 map정보를 가져오기 위해서 useState로 함수를 만든다.
    setMap(map);

    // services.Geocoder() 는 주소-좌표간 변환 서비스를 제공한다.
    var geocoder = new kakao.maps.services.Geocoder();

    // 콘솔창에 클릭한 위치의 위도 경도가 표시되는 코드
    // 지도에 클릭 이벤트를 등록합니다 : 클릭하면 위도, 경도, 주소 정보를 받고 작성창이 뜨게 한다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다.
    // ** 주의!!! 구현된것들이 안정적으로 돌아간다고 판단된 이후에는 
    // ** 로그인 한 사람만 할 수 있는 클릭이벤트가 되도록
    // ** 아래처럼 if문으로 설정한다.
    // if (is_login) {}
    // window.alert("로그인 해야 게시물을 작성할 수 있어요!")
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
      
      // 클릭한 위도, 경도 정보를 가져옵니다 
      const latlng = mouseEvent.latLng;
      // latlng.Ma = latlng.getLat() = 위도
      // latlng.La = latlng.getLng() = 경도
      const hereLat = latlng.getLat()
      const hereLng = latlng.getLng()
      setLatitude(hereLat);  // useState() : 위도 latitude 값 전역으로 설정
      setLongitude(hereLng); // useState() : 경도 longitude 값 전역으로 설정
      console.log(latitude + " " + longitude);

      var message = '클릭한 위치의 위도는 ' + hereLat + ' 이고, ';
          message += '경도는 ' + hereLng + ' 입니다';
      console.log(message);

      // 위도 경도 좌표로 주소 알아내기
      var coord = new kakao.maps.LatLng(hereLat, hereLng);
      console.log(coord);

      searchAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          //서버로 보낼 장소 이름(spotName) 데이터를 구한다.
          var spotName = result[0].address_name;
          console.log(result[0]);
          console.log(spotName);
          setSpotName(spotName)
          // dispatch(mapActions.addSpotNameAPI(spotName)) // spotName을 서버로 보내서 저장시키기
        };
      });
      
      function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
      }
      
      // 작성용 마커를 띄우기
      // 작성용 마커를 클릭하면 게시물 작성창이 뜨게 하기 : 로그인 한 사람만 되게 하기
      var writeMarkerImgUrl = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          imageSize = new kakao.maps.Size(40, 50),
          writeMarkerImage = new kakao.maps.MarkerImage(writeMarkerImgUrl, imageSize);

      var position = new kakao.maps.LatLng(hereLat, hereLng)
      var marker = new kakao.maps.Marker({
        // 클릭한 위치에 게시물 작성용 마커를 띄워준다.
        // 렌더링 되면서 마커만 나오므로, 데이터는 좌표와 마커이미지만 필요.
        // map: map,
        position: position,
        image: writeMarkerImage,
        clickable: true,
        draggable: true, 
        zIndex: 50,
      })

      marker.setMap(map);
      // marker.setDraggable(true);

      // 작성용마커를 클릭하면 게시물 작성모달창이 뜨게 하기 : 개발중에는 로그인 없이도 되게 하기
      kakao.maps.event.addListener(marker, 'click', function() {
        setUpLoadModal(true);
      })

      kakao.maps.event.addListener(marker, 'rightclick', function() {
        marker.setVisible(false);
      })

      // kakao.maps.event.addListener(marker, 'rightclick', function() {
      //   marker.setVisible(false);
      // })

      // 클릭한 위치 위도, 경도, 장소이름을 서버로 보내기.
      // if (latitude && longitude && spotName) {
        // dispatch(postActions.addLatLngSpotNameAPI(latitude, longitude, spotName))
      // }
          
      // 클릭이벤트 종료
    });

    // -----------------------------------------------------------------------------
    // 키워드로 검색하기
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(); 
    // 키워드로 장소를 검색합니다
    if (search) { // search가 빈 string일때 검색이 되어서 오류가 뜨는 경우를 없애기 위해 if문으로 분기한다.
      ps.keywordSearch(search, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        console.log(data);
        console.log(bounds);

        for (var i = 0; i < data.length; i++) {
          // displayMarker(data[i], bounds);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다.
          map.setBounds(bounds);
        };
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          window.alert('검색결과가 존재하지 않습니다.');
          return;
      } else if (status === kakao.maps.services.Status.ERROR) {
          window.alert('검색 결과 중 오류가 발생했습니다.');
          return;
        }
      });
    }  

    // 마커 관련 설정
    // 마커를 생성하고 지도에 표시합니다
    // 기본(전체) 마커, 좋아요 마커, 각 카테고리별 마커들의 url
    var normalMarkerImgUrl = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png"
    // var myMarker = "",
    // var myLikeMarker = "",
    // var caftMarker = "",
    // var nightMarker = "",
    // var oceanMarker = "",
    // var mountainMarker = "",
    // var flowerMarker = "",
    // var aloneMarker = "",
    // var coupleMarker = "",
    // var friendMarker = "",
    // var petMarker = "",
    // var cityMarker = "",
    // var parkMarker = "",
    // var exhibitionMarker = "",

    // 지도 렌더링시, 모든 게시물 자료들을 가져와서 마커와 함께 렌더링한다.
    // 서버와 연결되어 데이터 통신이 이뤄지면 이 코드를 사용한다
    // if (totaldata) {}
    //   totalPicPostData.map((p, idx) => {
    markerdata.forEach((p) => { // mockdate를 이용한 테스트. 나중엔 서버에서 가져온다.

      var imageSize = new kakao.maps.Size(40, 40);
      var markerImage = new kakao.maps.MarkerImage(normalMarkerImgUrl, imageSize);
      var position = new kakao.maps.LatLng(p.latitude, p.longitude)
      const markers = new kakao.maps.Marker({
        // 마커들을 생성하고, 그것들을 대응되는 좌표에다가 뿌려줍니다.
        // 렌더링 되면서 마커만 나오므로, 데이터는 좌표와 마커이미지만 필요.
        map: map,
        position: position,
        image: markerImage,
      })

      // 모달창의 x 를 클릭하면 사라지게 하는 함수 
      var closeOverlay = function() {
        customOverlay.setMap(null);     
      }

      // 모달창(커스텀오버레이)에 들어갈 내용
      var content = '<div class="modalcontainer">' +
                        `<img class="picbox" src=${p.imgUrl} >` +
                            // `<img src=${p.imgUrl} onclick={() => {history}}>` +
                            '<div class="head">' +
                                `<div class="spotname">${p.spotName}</div>` +
                                // `<div class="close" onclick=${closeOverlay()} title="닫기"></div>` +
                                // '<div class="close" onclick={closeOverlay()} title="닫기"></div>' + 
                                // `<div class="close" onclick=${() => {closeOverlay()}} title="닫기"></div>` + 
                                // `<div class="close" onclick = 'console.log("체크체크")' title="닫기"></div>` +
                                // '<div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
                                
                            '</div>' +
                            // '<div class="center"></div>' +
                            '<div class="bottomiconbox">' +
                                '<img class="likeicon" onclick></img>' +
                            '</div>' +
                        '</img>' +
                    '</div>';

      // 모달창(커스텀오버레이) 객체를 생성
      var customOverlay = new kakao.maps.CustomOverlay({
        // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다 
        clickable: true,    // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
        position: position, // 커스텀 오버레이의 좌표
        content: content,   // 엘리먼트 또는 HTML 문자열 형태의 내용
        xAnchor: 0.5,       // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
        yAnchor: 1.2,       // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
        zIndex: 100,        //  커스텀 오버레이의 z-index
        altitude: 10,
      });
      // console.log(customOverlay);

      // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
      kakao.maps.event.addListener(markers, 'click', function() { // 클릭하면 열기
        customOverlay.setMap(map);
      });

      kakao.maps.event.removeListener(markers, 'click', function() { // 클릭하면 열기
        customOverlay.setMap(map);
      });

      // kakao.maps.event.addListener(markers, 'rightclick', function() { // 우클릭하면 닫기
      //   customOverlay.setMap(null); 
      // });

    });

    // if (is_cafe) {
    //   markercafedata.forEach((cafe) => { // mockdate를 이용한 테스트. 나중엔 서버에서 가져온다.
    //     var imageSize = new kakao.maps.Size(40, 40);
    //     var markerImage = new kakao.maps.MarkerImage(cafeMarkerImgUrl, imageSize);
    //     var position = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
    //     const markers = new kakao.maps.Marker({
    //       map: map,
    //       position: position, 
    //       image: markerImage,
    //     })
    //   })

    //   // 모달창의 x 를 클릭하면 사라지게 하는 함수 
    //   var closeOverlay = function() {
    //     customOverlay.setMap(null);     
    //   }

    //   // 모달창(커스텀오버레이)에 들어갈 내용
    //   var content = '<div class="modalcontainer">' +
    //                     `<img class="picbox" src=${p.imgUrl} >` +
    //                         // `<img src=${p.imgUrl} onclick={() => {history}}>` +
    //                         '<div class="head">' +
    //                             `<div class="spotname">${p.spotName}</div>` +
    //                             `<div class="close" onclick=${closeOverlay} title="닫기"></div>` + 
    //                             // `<div class="close" onclick=${closeOverlay()} title="닫기"></div>` + 
    //                             // `<div class="close" onclick=${() => closeOverlay()} title="닫기"></div>` + 
    //                             // '<div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
                                
    //                         '</div>' +
    //                         // '<div class="center"></div>' +
    //                         '<div class="bottomiconbox">' +
    //                             '<img class="likeicon" onclick></img>' +
    //                         '</div>' +
    //                     '</img>' +
    //                 '</div>';

    //   // 모달창(커스텀오버레이) 객체를 생성
    //   var customOverlay = new kakao.maps.CustomOverlay({
    //     // map: map,        // 이거 있으면 처음부터 커스텀오버레이가 보인다 
    //     clickable: true,    // true 로 설정하면 컨텐츠 영역을 클릭했을 경우 지도 이벤트를 막아준다.
    //     position: position, // 커스텀 오버레이의 좌표
    //     content: content,   // 엘리먼트 또는 HTML 문자열 형태의 내용
    //     xAnchor: 0.5,       // 컨텐츠의 x축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
    //     yAnchor: 1.2,       // 컨텐츠의 y축 위치. 0_1 사이의 값을 가진다. 기본값은 0.5
    //     zIndex: 100,        //  커스텀 오버레이의 z-index
    //     altitude: 10,
    //   });

    //   // 마커를 위한 클릭이벤트 + 닫기 이벤트를 설정한다.
    //   // 마커에 마우스를 올려 놓으면 커스텀오버레이가 보이게 한다.
    //   kakao.maps.event.addListener(markers, 'mouseover', function() {
    //   // kakao.maps.event.addListener(markers, 'click', function() {
    //     customOverlay.setMap(map); 
    //   })

    //   // 마커에서 마우스를 떼면 커스텀오버레이가 사라지게한다.
    //   // kakao.maps.event.addListener(markers, 'mouseout', function() {
    //   //   customOverlay.setMap(null); 
    //   // })
    // }

    // var marker = new kakao.maps.Marker({
    //     map: map,
    //     position: new kakao.maps.LatLng(place.y, place.x) 
    // });
  
  // 지도 api 설정은 여기서 끝
  // 지도 api 추가/수정/삭제하면서 함수 범위를 꼬이지 않게 주의할 것.  
  }, [search, startlat, startlon]); // 마커별로 제어가 되면 마커들도 인자로 추가한다.
  // }, [search]);

  console.log(latitude);
  console.log(longitude);
  console.log(spotName);

  // 작성모달 관련
  const closeUpLoadModal = () => {
    setUpLoadModal(false);
  };


  // 작성창이 뜨게 하기 제어부분
  // const 
  // _map

  return (
    <React.Fragment>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="지역으로 검색"
          onChange={debounce}
        />
      </SearchBox>
      <Category/>
      {/* <CustomOverlayUseInfo/> */}
      <MapBox>
        {/* 위에서 설정된 getElementById("map")에 의해서 id="map"인 div에 맵이 표시된다 */}
        <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      </MapBox>
      {/* { is_total ? 
        markerdata.forEach((p) => {
          //...각종 변수들 정의
          <CustomOverlay
            content={<MyOverlay />}
            lat={p.latitude}
            lng={p.longitude}>
          </CustomOverlay>}) : null} */}
      {is_uploadModal ? 
        <UpLoadModal 
          latitude={latitude}
          longitude={longitude}
          spotName={spotName}
          close={closeUpLoadModal}/> : null}
    </React.Fragment>
  );
};

export default Maps;

const SearchBox = styled.div`
  position: fixed;
  margin: auto;
  top: 75px;
  left: 110px;
  /* transform: translate(-60%, -60%); */
  z-index: 10;
  @media (min-width: 1280px) {
    width: 600px;
  }
  @media (max-width: 1280px) {
    /* top: 140px; */
    width: 400px;
  }
  @media (max-width: 960px) {
    top: 100px;
    /* left: 110px; */
    margin: auto;
    width: 350px;
    left: 10vw;
  }
  @media (max-width: 400px) {
    top: 100px;
    width: 50%;
    margin: auto;
    left: 20vw;
  } 
`;

const SearchInput = styled.input`
  height: 50px;
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
`;

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  position: absolute;

`;