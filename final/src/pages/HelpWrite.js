import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";

const HelpWrite = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.profile.is_uploading);
  const preview = useSelector((state) => state.profile.preview);

  React.useEffect(() => {
    // if (!help_id) {
    //   return false;
    // }
    // dispatch(profileActions.setPreview(user_info.profileImgUrl));
  }, []);

  // 제목 입력 값 가져오기
  const [title, setTitle] = React.useState("");
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 내용 입력 값 가져오기
  const [content, setContent] = React.useState("");
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <React.Fragment>
      <Container>
        <Title>문의하기</Title>
        <ContentContainer>
        <InputStyle
          value={title}
          placeholder="제목 입력"
          type="type"
          width="100%"
          onClick={() => {
            document.querySelector(".checkNickname").style.display = "block";
          }}
          onChange={changeTitle}
        />
        <TextField
          value={content}
          placeholder="문의내용을 입력해주세요."
          onChange={changeContent}
          disabled={is_uploading}
        />

        {/* 사진 업로드 기능 추가하기*/}

        <SolidBtn width="150px" 
        // onClick={}
        >
          저장하기
        </SolidBtn>
        </ContentContainer>
        
      </Container>
    </React.Fragment>
  );
};

HelpWrite.defaultProps = {
  help: {
    id: "11",
    title: "로그인 관련 문의 드립니다",
    writerName: "nickname",
    createdAt: "자기소개를 입력해주세요",
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
  margin-bottom: 50px;
`;

const ContentContainer = styled.div`
  max-width: 800px;
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

const TextField = styled.textarea`
  display: block;
  border: 1px solid grey;
  border-radius: 8px;
  width: 100%;
  height: 300px;
  padding: 16px 16px;
  box-sizing: border-box;

  font-size: 1.1rem;
  line-height: 1.5rem;
`;

const SolidBtn = styled.button`
  display: block;
  border: none;
  margin: 20px 0px;
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

export default HelpWrite;
