import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as qnaActions } from "../redux/modules/qna";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const QnaDetail = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.profile.is_uploading);
  const preview = useSelector((state) => state.profile.preview);

  //  url에서 userId 불러오기
  const qnaId = props.match.params.id;
  const qna = useSelector((state) => state.qna.qna);
  console.log(qna);
  // 댓글 남길 때 필요한 내 닉네임은 로컬스토리지에서 가져와 사용한다.
  // 댓글은 관리자만 ???????????????
  const me = localStorage.getItem("nickname");

  React.useEffect(() => {
    if (!qnaId) {
      return false;
    }
    dispatch(qnaActions.getQnaDetailAPI(qnaId));
  }, []);

  const [comment, setComment] = React.useState("");
  const changeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <React.Fragment>
      <Container>
        <Title>문의하기</Title>

        <TitleContainer>
          <Text size="1.1rem" width="100%">
            {qna.title}
          </Text>
          <Grid is_flex width="40%">
          <TextBtn onClick={() => history.push("/qnawrite/:id")}>
           수정
          </TextBtn>
          <TextBtn onClick = {() => 
          { window.confirm("게시물을 삭제하시겠습니까") &&
            dispatch(qnaActions.deleteQnaAPI(qnaId))
          }}>
           삭제
          </TextBtn>
            <Text>{qna.writer}</Text>
            <Text>|</Text>
            <Text>{qna.modified}</Text>
          </Grid>
        </TitleContainer>

        <ContentContainer>
          <Text>{qna.content}</Text>
        </ContentContainer>
        <CommentContainer>
          <Comment>
            <Grid flex>
              <Text weight="600">{props.qna.qcomments.writer}</Text>
              <Text width="65%">{props.qna.qcomments.content}</Text>
            </Grid>
            <Text width="100px">{props.qna.qcomments.modified}</Text>
            <Icon onClick={() => history.push("/qnawrite/:id")}>
            <FiEdit3 size="17" />
          </Icon>
          <Icon onClick = {() => 
          { window.confirm("댓글을 삭제하시겠습니까") &&
            dispatch(qnaActions.deleteQnaAPI(qnaId))
          }}>
            <RiDeleteBinLine size="18" />
          </Icon>
          </Comment>
          <Comment>
            <Text weight="600">{me}</Text>
            <InputStyle
              value={comment}
              placeholder="댓글 입력"
              type="type"
              width="60%"
              onChange={changeComment}
            />
            <BorderBtn>게시</BorderBtn>
          </Comment>
        </CommentContainer>
        <Grid height="200px" />
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

const Icon = styled.div`
  margin-left: 0px;
  border-radius: 50px;
  padding: 8px 12px;
  &:hover {
    color: red;
    background-color: #eee;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
  /* background-color: green; */
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
  min-height: 500px;
  border-bottom: 1pt solid grey;
`;

const CommentContainer = styled.div`
  justify-content: space-between;
  height: 40px;
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  /* background-color: red; */
`;

const Text = styled.div`
  align-items: center;
  display: flex;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  width: ${(props) => props.width};
  border: white;
  padding: 18px 14px;
  word-break: keep-all;
  /* background-color: green; */
`;

const TextBtn = styled.text`
  font-size: 1rem;
  padding: 5px;
  word-break: keep-all;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InputStyle = styled.input`
  border: 1px solid grey;
  width: 100%;
  min-width: 380px;
  height: 38px;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 4px 16px;
  font-size: 1rem;
  font-weight: 500;
  margin: 16px 10px;
  color: grey;
  input:focus {
    outline: none !important;
    border: 1px solid red;
  }
  cursor: pointer;
`;

const BorderBtn = styled.button`
  width: 60px;
  min-height: 45px;
  max-height: 70px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 8px auto;
  font-size: 0.9rem;
  font-weight: 500;
  color: grey;
  background-color: #ffffff;
  :focus {
    outline: none;
  }
  &:hover {
    color: grey;
    background-color: lightgrey;
    border: none;
    cursor: pointer;
  }
`;

export default QnaDetail;
