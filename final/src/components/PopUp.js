import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import * as AiIcons from "react-icons/ai";

const PopUp = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/popup-01.jpg?alt=media&token=85b4fa77-235d-453b-849a-32543c890738",
    "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/popup-02.jpg?alt=media&token=1193f358-702f-4c17-99bb-0683ad3633d3",
    "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/popup-03.jpg?alt=media&token=2094a5ba-92e9-43cb-af6f-c79ccce99e4a",
  ];

  const dayExpires = () => {
    props.close();
    //창을 닫고 만료일이 24시간인 토큰이 생긴다 토큰이 있으면 팝업창이 안뜨게 설정
    let expires = new Date();
    expires = expires.setHours(expires.getHours() + 24);
    localStorage.setItem("hasVisitedBefore", expires);
  };

  return (
    //  <CloseIcon fontSize="small" />
    <React.Fragment>
      <Overlay onClick={props.close} />
      <PopUpContainer>
        <Slider {...settings}>
          <div>
            <PopUpImg
              src={
                "https://firebasestorage.googleapis.com/v0/b/diction-f1678.appspot.com/o/popup01%402x.png?alt=media&token=24097870-9e08-40ff-bb8e-31fda31e4f58"
              }
            >
              <ExitBtn onClick={props.close}>
                <CloseIcon style={{ color: "white", fontSize: 50 }} />
              </ExitBtn>
              <DayBtn onClick={dayExpires}>
                <DayIcom>
                  <AiIcons.AiOutlineCheckSquare size="1.5rem" />
                </DayIcom>
                오늘 하루 보지 않기
              </DayBtn>
              <NoThank onClick={props.close} />
            </PopUpImg>
          </div>
          <div>
            <PopUpImg
              src={
                "https://firebasestorage.googleapis.com/v0/b/diction-f1678.appspot.com/o/popup02%402x.png?alt=media&token=65018d06-8705-4d7e-9a6d-46863363c230"
              }
            >
              <ExitBtn onClick={props.close}>
                <CloseIcon style={{ color: "white", fontSize: 50 }} />
              </ExitBtn>
            </PopUpImg>
          </div>
          <div>
            <PopUpImg
              src={
                "https://firebasestorage.googleapis.com/v0/b/diction-f1678.appspot.com/o/%ED%8C%9D%EC%97%853%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8.png?alt=media&token=5a8d500d-1896-4bd5-bc14-eac14d783c69"
              }
            >
              <ExitBtn onClick={props.close}>
                <CloseIcon style={{ color: "white", fontSize: 50 }} />
              </ExitBtn>
              <StartBtn>
                <StartFont onClick={props.close}>SFlash시작하기</StartFont>
              </StartBtn>
            </PopUpImg>
          </div>

          {/* {images.map((p, idx) => {
            return (
              <div>
                <PopUpImg src={images[idx]}>
                  <ExitBtn onClick={props.close}>
                    <CloseIcon style={{ color: "white", fontSize: 50 }} />
                  </ExitBtn>
                </PopUpImg>
              </div>
            );
          })} */}
        </Slider>
      </PopUpContainer>
    </React.Fragment>
  );
};

const DayBtn = styled.div`
  display: flex;
  background-size: cover;
  background-repeat: no-repeat;
  width: 200px;
  height: 40px;
  position: absolute;
  left: 1130px;
  top: 13px;
  color: ${(props) => props.theme.main_color};
  cursor: pointer;
  align-items: center;
  font-size: 17px;
  opacity: 0.5;
  :hover {
    opacity: 1;
  }
`;
const DayIcom = styled.div`
  padding-top: 2px;
  margin-top: 8px;
  margin-right: 3px;
`;

const ExitBtn = styled.div`
  position: relative;
  /* top: 50%; */
  right: -1030px;
  /* transform: translate(-50%, -50%); */
  z-index: 18005;
  /* position: fixed; */
  top: 10px;
  /* right: 0; */
  cursor: pointer;
  /* background-color: red; */
  width: 800px;
  height: 80px;
`;

const StartBtn = styled.div`
  width: 220px;
  height: 40px;
  border-radius: 60px;
  border: 2px solid ${(props) => props.theme.main_color};
  /* background-color: ${(props) => props.theme.main_color}; */
  color: ${(props) => props.theme.main_color};
  text-align: center;
  padding-top: 4.5px;
  margin: 0px auto;
  margin-top: 483px;
  cursor: pointer;
  :hover {
    color: white;
    background-color: ${(props) => props.theme.main_color};
  }
`;

const NoThank = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  width: 250px;
  height: 40px;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/diction-f1678.appspot.com/o/popup_01.png?alt=media&token=93b47d5a-e728-4766-83f6-bafe93e5eb4e");
  position: absolute;
  left: 1225px;
  top: 450px;
  cursor: pointer;
`;

const StartFont = styled.div`
  /* margin: auto 0px; */
  font-weight: bold;
  font-size: 20px;
  /* background-color: red; */
`;

const Overlay = styled.div`
  position: fixed;
  opacity: 0.6;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const PopUpContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1100px;
  height: 650px;
  /* border-radius: 20px; */
  transform: translate(-50%, -50%);
  /* background-color: red; */
  z-index: 10002;
  border-radius: 20px;
  /* overflow: hidden; */
`;

const PopUpImg = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  margin: auto auto;
  border-radius: 20px;
  z-index: 10002;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  /* object-fit: cover; */
  background-repeat: no-repeat;
  border: none;
  box-sizing: border-box;
  height: 650px;
  width: 1100px;
  overflow: hidden;
  background-position: center;
  /* background-color: red; */
  /* @media (max-width: 1440px) {
    all: unset;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 315px;
    max-height: 42vh;
  }

  @media (max-width: 600px) {
    
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 40vh;
  } */
`;

export default PopUp;
