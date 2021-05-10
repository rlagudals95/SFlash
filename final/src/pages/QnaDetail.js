import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as qnaActions } from "../redux/modules/qna";

const QnaDetail = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.profile.is_uploading);
  const preview = useSelector((state) => state.profile.preview);

  const myNickname = localStorage.getItem("nickname");

  React.useEffect(() => {
    // if (!help_id) {
    //   return false;
    // }
    // dispatch(profileActions.setPreview(user_info.profileImgUrl));
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
          <Text size="1.5rem" weight="600" width="70%">
            {props.qna.title}
          </Text>
          <Grid is_flex width="25%">
            <Text>{props.qna.writerName}</Text>
            <Text>|</Text>
            <Text>{props.qna.createdAt}</Text>
          </Grid>
        </TitleContainer>
        <ContentContainer>
          <Text>{props.qna.contents}</Text>
        </ContentContainer>
        <CommentContainer>
          <Comment>
            <Grid flex>
            <Text weight="600">{props.qna.comment.writerName}</Text>
            <Text width="65%">{props.hqna.comment.contents}</Text>
            </Grid>
            <Text>{props.qna.comment.createdAt}</Text>
          </Comment>
          <Comment>
            <Text weight="600">{myNickname}</Text>
            <InputStyle
          value={comment}
          placeholder="제목 입력"
          type="type"
          width="60%"
          onChange={changeComment}
        />
          </Comment>
          <BorderBtn>게시</BorderBtn>
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
    contents: "안녕하세요? 문의 내용 입니다. 감사합니다.",
    writerName: "nickname",
    createdAt: "2021-05-08",
    comment: {
      id: 1,
      writerName: "nickname",
      contents: "댓글 내용입니다.",
      createdAt: "2021-05-09",
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
  justify-content: space-between;
  background-color: red;
`;

const Text = styled.div`
  align-items: center;
  display: flex;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  width: ${(props) => props.width};
  border: white;
  padding: 18px 14px;
  /* background-color: green; */
`;

const InputStyle = styled.input`
  border: 1px solid grey;
  width: 60%;
  min-width: 380px;
  height: 38px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 1rem;
  font-weight: 500;
  margin: 16px 0px;
  color: grey;
  input:focus {
    outline: none !important;
    border: 1px solid red;
  }
  cursor: pointer;
`;

const BorderBtn = styled.button`
  width: 100%;
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
