import React from "react";
import styled from "styled-components";

import { history } from "../redux/configStore";
import { Grid } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const HelpList = (props) => {


  return (
    <React.Fragment>
      <Container>
        <Title>문의하기</Title>
        <SolidBtn width="120px" onClick={() => history.push("/helpwrite")}>
          새 글 등록
        </SolidBtn>
        <Content>
          <Text width="4%">
            <b>NO.</b>
          </Text>
          <Text width="65%">
            <b>제목</b>
          </Text>
          <Text width="11%">
            <b>작성자</b>
          </Text>
          <Text width="11%">
            <b>일자</b>
          </Text>
        </Content>
        <ContentUnit>
          <Text width="4%">{props.help.id}</Text>

          <TextBtn width="65%" 
          onClick={() => history.push("/helpdetail")}
          >
            {props.help.title}
            <Icon onClick={() => history.push("/helpwrite/:id")}>
              <FiEdit3 size="17" />
            </Icon>
            {/* <Icon><RiDeleteBinLine size="18"/></Icon> */}
          </TextBtn>

          <Text width="11%">{props.help.writerName}</Text>
          <Text width="11%">{props.help.createdAt}</Text>
        </ContentUnit>
      </Container>
    </React.Fragment>
  );
};

HelpList.defaultProps = {
  help: {
    id: 11,
    title: "문의 제목입니다",
    writerName: "nickname",
    createdAt: "2021-05-08",
  },
};

const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  margin-bottom: 0px;
`;

const Content = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  align-items: center;
  width: 100%;
  /* background-color: green; */
`;

const ContentUnit = styled.div`
  border-bottom: 0.2px solid grey;
  display: flex;
  align-items: center;
  width: 100%;
  /* background-color: green; */
`;

const Text = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  width: ${(props) => props.width};
  border: white;
  padding: 10px 12px;
  /* background-color: yellow; */
`;

const TextBtn = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  width: ${(props) => props.width};
  border: white;
  padding: 10px 12px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  /* background-color: yellow; */
`;

const Icon = styled.div`
  margin-left: 5px;
  border-radius: 50px;
  padding: 10px 15px;
  &:hover {
    color: red;
    background-color: #eee;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
  /* background-color: green; */
`;

const SolidBtn = styled.button`
  float: right;
  border: none;
  margin: 5px 0px;
  ${(props) => (props.width ? `width:${props.width};` : "")}
  height: 48px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.main_color};
  color: #ffffff;
  outline: none;
  &:hover {
    color: grey;
    background-color: lightgrey;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

export default HelpList;
