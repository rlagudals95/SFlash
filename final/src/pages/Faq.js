import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import * as RiIcons from "react-icons/ri";
import "../Css/Faq.css";

const Faq = () => {
  const [slide, setSlide] = useState(false);
  const [cloeseSlide, setCloseSlide] = useState(false);
  const slideOpen = () => {
    setSlide(true);
  };
  const slideClose = () => {
    setSlide(false);
  };

  return (
    <React.Fragment>
      <Container>
        <FaqTitle>FAQ</FaqTitle>

        <FaqContainer>
          <FAQ>
            <FaqLeft>
              Q.
              <FaqName>투자문의 합니다... 금액은 200억정도...</FaqName>
            </FaqLeft>
            <FaqRight>
              {slide ? (
                <RiIcons.RiArrowDownSLine
                  onClick={slideClose}
                  size="2rem"
                  id="btn"
                ></RiIcons.RiArrowDownSLine>
              ) : (
                <RiIcons.RiArrowDownSLine
                  onClick={slideOpen}
                  size="2rem"
                  id="btn"
                ></RiIcons.RiArrowDownSLine>
              )}
            </FaqRight>
          </FAQ>
          <FaqToggle id={slide ? "slideToggleOpen" : "slideTogglebox"}>
            굽신굽신....
          </FaqToggle>
          <FAQ></FAQ>
          <FAQ></FAQ>
          <FAQ></FAQ>
          <FAQ></FAQ>
          <FAQ></FAQ>
        </FaqContainer>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  height: 100%;
  width: 45vw;
  margin-top: 12vh;
  /* background-color: red; */
  /* box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1); */
`;

const FaqTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8vh;
`;
const FaqContainer = styled.div`
  /* background-color: blue; */
  height: 70vh;
  width: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgray;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: lightgrey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const FAQ = styled.div`
  padding: 0.3vw 0.9vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 43.2vw;
  height: 5vh;
  /* background-color: green; */
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0.1, 0.1);
`;

const FaqLeft = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  padding-bottom: 5px;
  opacity: 0.7;
`;

const FaqName = styled.span`
  opacity: 0.8;
  font-size: 1rem;
`;

const FaqRight = styled.div`
  opacity: 0.7;
`;

const FaqToggle = styled.div``;

export default Faq;
