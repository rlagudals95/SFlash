import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";

import SFlash_logo from "../static/SFlash_logo.svg";


const About = (props) => {
   
  return (
    <React.Fragment>
      <Background>
      <Container>
        <Grid height="50px"></Grid>
        <SflashLogo src = {SFlash_logo}/>
        <Grid height="50px"></Grid>
        <Text>인스타, 블로그 나만 모르는 명소들... 대체 거기가 어디야?</Text>
        <Text>늘 가던 곳이 아닌 새로운 스팟이 필요하다면? 내 주변에 숨겨진 스팟이 궁금하다면?</Text>
        <Text>SFlash는 지도와 이미지로 멋진 포토스팟을 찾을 수 있도록 도와주는 서비스 입니다.</Text>
        <Text>내 스토리에 마음에 드는 스팟을 모으고, 나만의 스팟도 공유하며 스플래쉬(SFlash) 하세요 :) </Text>
       
      </Container>
      </Background>
     
    </React.Fragment>
  
  );
};

const Container = styled.div`
  margin: auto;
  height: 100%;

  margin-top: 12vh;
  @media (min-width: 1280px) {
    width: 1024px;
  }
  @media (max-width: 1280px) {
    width: 800px;
  }
  @media (max-width: 960px) {
    width: calc(100% - 5rem);
    max-width: 800px;
  }
  @media (max-width: 400px) {
    width: calc(100% - 2rem);
  }
  /* background-color: red; */
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 50px;
`;

const Text = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #ffffff;
`;

const Background = styled.div`
position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  background-color: #1b2685;
`;

const SflashLogo = styled.img`
  /* background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=92594323-944a-40d7-8085-b323c23246fe"); */
  width: 150px;
  height: 150px;
  background-size: cover;
  z-index:100;
  
`;





export default About;
