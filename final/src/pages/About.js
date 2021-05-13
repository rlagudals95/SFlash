import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";


const About = (props) => {
   
  return (
    <React.Fragment>
      <Container>
        <SflashLogo />
        <Grid height="50px"></Grid>
        <Text>SFlash 소개</Text>
       
      </Container>
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
  font-weight: bold;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  max-width: 800px;
`;

const SflashLogo = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=92594323-944a-40d7-8085-b323c23246fe");
  width: 150px;
  height: 150px;
  background-size: cover;
`;





export default About;
