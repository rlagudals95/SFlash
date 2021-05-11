import React from "react";
import styled from "styled-components";

import { history } from "../redux/configStore";
import { Grid } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { actionCreators as qnaActions } from "../redux/modules/qna";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const QnaList = (props) => {
  const dispatch = useDispatch();
  const qna_list = useSelector((state) => state.qna.list);
  console.log("qna_list:", qna_list);

  React.useEffect(() => {
    dispatch(qnaActions.getQnaAPI());
  }, []);

  if (qna_list.length === 0) {
    return (
      <React.Fragment>
        <Container>
          <Title>문의하기</Title>
          <SolidBtn width="120px" onClick={() => history.push("/qnawrite")}>
            새 글 등록
          </SolidBtn>
          <Content>
            {/* <Text width="4%">
          <b>NO.</b>
        </Text> */}
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
          <Warning>
          <text style={{fontSize:"1.4rem"}}>등록된 게시물이 없습니다.</text>
        </Warning>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
          <Title>문의하기</Title>
          <SolidBtn width="120px" onClick={() => history.push("/qnawrite")}>
            새 글 등록
          </SolidBtn>
          <Content>
            {/* <Text width="4%">
          <b>NO.</b>
        </Text> */}
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
          {qna_list.map((q,idx) => {
            return (
              <ContentUnit key={q.id} {...q}>
                {/* <Text width="4%">{props.help.id}</Text> */}
                <TextBtn width="65%" onClick={() => history.push(`/qnadetail/${q.id}`)}>
                  {q.title}
                  <Icon onClick={() => history.push("/qnawrite/:id")}>
                    <FiEdit3 size="17" />
                  </Icon>
                  {/* <Icon><RiDeleteBinLine size="18"/></Icon> */}
                </TextBtn>
                <Text width="11%">{q.writer}</Text>
                <Text width="11%">{q.modified}</Text>
              </ContentUnit>
            );
          })}
        </Container>
      </React.Fragment>
    );
  }
};

QnaList.defaultProps = {
  qna: [
    {
      // id: 11,
      title: "문의 제목입니다",
      writer: "nickname",
      modifiedDate: "2021-05-08",
    },
    {
      // id: 11,
      title: "문의 제목입니다",
      writer: "nickname",
      modifiedDate: "2021-05-08",
    },
    {
      // id: 11,
      title: "문의 제목입니다",
      writer: "nickname",
      modifiedDate: "2021-05-08",
    },
  ],
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
const Warning = styled.div`
  text-align: center;
  align-items: center;
  margin: 20px auto;
  background-color: #eee;
  padding: 150px;
`;
export default QnaList;
