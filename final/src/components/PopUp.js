import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

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

  return (
    //  <CloseIcon fontSize="small" />
    <React.Fragment>
      <Overlay onClick={props.close} />
      <PopUpContainer>
        <Slider {...settings}>
          <div>
            <PopUpImg
              src={
                "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/popup-01.jpg?alt=media&token=85b4fa77-235d-453b-849a-32543c890738"
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
                "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/popup-02.jpg?alt=media&token=1193f358-702f-4c17-99bb-0683ad3633d3"
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
                "https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/popup-03.jpg?alt=media&token=2094a5ba-92e9-43cb-af6f-c79ccce99e4a"
              }
            >
              <ExitBtn onClick={props.close}>
                <CloseIcon style={{ color: "white", fontSize: 50 }} />
              </ExitBtn>
              <StartBtn>
                <StartFont>SFlash시작하기</StartFont>
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

const ExitBtn = styled.div`
  position: relative;
  /* top: 50%; */
  right: 100px;
  transform: translate(-50%, -50%);
  z-index: 18005;
  /* position: fixed; */
  top: 50px;
  /* right: 0; */
  cursor: pointer;
  background-color: red;
  width: 80px;
  height: 80px;
`;

const StartBtn = styled.div`
  width: 220px;
  height: 30px;
  border-radius: 60px;
  border: 2px solid ${(props) => props.theme.main_color};
  /* background-color: ${(props) => props.theme.main_color}; */
  color: ${(props) => props.theme.main_color};
  text-align: center;
  padding-top: 4.5px;
  margin: 0px auto;
  margin-top: 540px;
`;

const StartFont = styled.div`
  /* margin: auto 0px; */
  font-weight: bold;
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
  top: 45%;
  left: 50%;
  width: 1200px;
  height: 700px;
  transform: translate(-50%, -50%);
  /* background-color: red; */
  z-index: 10002;
`;

const PopUpImg = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  margin: auto auto;
  z-index: 10002;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  /* object-fit: cover; */
  background-repeat: no-repeat;
  border: none;
  box-sizing: border-box;
  height: 800px;
  width: 1200px;
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
