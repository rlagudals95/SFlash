import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Grid } from "../elements/index";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as qnaActions } from "../redux/modules/qna";

import QnaDetailComment from "../components/QnaDetailComment";

const QnaDetail = (props) => {
  const dispatch = useDispatch();

  //  url에서 userId 불러오기
  const qnaId = props.match.params.id;
  const qna = useSelector((state) => state.qna.qna);
  // console.log(qna);
  // console.log(qna.qcomments);

  React.useEffect(() => {
    if (!qnaId) {
      return false;
    }
    dispatch(qnaActions.getQnaDetailAPI(qnaId));
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Title>문의하기</Title>

        <TitleContainer>
          <Text size="1.3rem" width="100%">
            {qna.title}
          </Text>
          <Grid is_flex width="50%">
            <Text size="1rem">{qna.writer}</Text>
            <Text size="1rem">|</Text>
            <Text width="90px">{qna.modified}</Text>
            <TextBtn onClick={() => history.push(`/qnawrite/${qnaId}`)}>
              수정
            </TextBtn>
            <TextBtn
              onClick={() => {
                Swal.fire({
                  text: "게시물을 삭제 하시겠습니까?",
                  confirmButtonText: "예",
                  confirmButtonColor: "#ffb719",
                  showCancelButton: true,
                  cancelButtonText: "아니오",
                  cancelButtonColor: "#eee",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(qnaActions.deleteQnaAPI(qnaId));
                  }
                });
              }}
            >
              삭제
            </TextBtn>
          </Grid>
        </TitleContainer>

        <ContentContainer>
          <Text>{qna.content}</Text>
        </ContentContainer>

        <QnaDetailComment qnaId={qnaId} />

        <Grid height="600px" />
      </Container>
    </React.Fragment>
  );
};

QnaDetail.defaultProps = {
  qna: {
    id: 11,
    title: "문의 제목",
    content: "안녕하세요? 문의 내용 입니다. 감사합니다.",
    writer: "nickname",
    modified: "2021-05-08",
    qcomments: {
      id: 1,
      writer: "nickname",
      content: "댓글 내용입니다.",
      modified: "2021-05-09",
    },
  },
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
  margin-bottom: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1pt solid grey;
  height: 70px;
  /* background-color: yellow; */
`;

const ContentContainer = styled.div`
  min-height: 450px;
  border-bottom: 1pt solid grey;
  background-color: #f8f8f8;
  padding: 15px;
`;

const Text = styled.div`
  align-items: center;
  display: flex;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  width: ${(props) => props.width};
  border: white;
  padding: 10px 10px;
  word-break: keep-all;
  /* background-color: green; */
`;

const TextBtn = styled.text`
  font-size: 1rem;
  padding: 5px 10px 10px 10px;
  margin: 5px;
  border-radius: 4px;
  word-break: keep-all;
  background-color: #eee;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    background-color: light grey;
  }
`;

export default QnaDetail;
