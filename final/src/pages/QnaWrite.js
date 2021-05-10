import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as qnaActions } from "../redux/modules/qna";
import { actionCreators as imageActions } from "../redux/modules/image";

const QnaWrite = (props) => {
  const dispatch = useDispatch();
  const qnaId = props.id;
  const is_edit = qnaId ? true : false; //qna_id는 게시물이 존재하므로 수정 가능함
  // const preview = useSelector((state) => state.image.preview);
  // const is_uploading = useSelector((state) => state.image.is_uploading);

  React.useEffect(() => {
    if (!qnaId) {
      return false;
    }
    // dispatch(imageActions.setPreview());
  }, []);

  // 제목 입력 값 가져오기
  const [title, setTitle] = React.useState("");
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 내용 입력 값 가져오기
  const [contents, setContents] = React.useState("");
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  // // 이미지 업로드하기
  // const fileInput = React.useRef();
  // const selectFile = (e) => {
  //   // changed 된 event (e.target은 input)
  //   // console.log(e.target.files); // input 이 가진 files 객체
  //   // console.log(e.target.files[0]); //선택한 파일이 어떻게 저장되어 있나 확인
  //   // console.log(fileInput.current.files[0]); //ref로도 확인;

  //   // 이미지 미리보기
  //   const reader = new FileReader();
  //   var image = fileInput.current.files[0];
  //   reader.readAsDataURL(image); // readAsDataURL(읽고 싶은 파일) 메서드를 이용한다.
  //   reader.onloadend = () => {
  //     // onloadend: reader가 끝나자마자 다음 것을 수행한다.
  //     // console.log(reader.result);
  //     dispatch(imageActions.setPreview(reader.result));
  //   };
  // };

  // // 이미지 에러
  // const ImageError = () => {
  //   window.alert("잘못된 이미지 주소 입니다. :(");
  // };

  const onAddQna = () => {
    if (!title || !contents) {
      window.alert("제목과 내용을 모두 입력해주세요 :(");
    }
    let qna = {
      title: title,
      contents: contents,
      // image: fileInput.current.files[0],
    };
    dispatch(qnaActions.addQnaAPI(qna));
  };

  const onEditQna = () => {
    if (!title || !contents) {
      window.alert("제목과 내용을 모두 입력해주세요 :(");
    }
    let qna = {
      title: title,
      contents: contents,
      // image: fileInput.current.files[0],
    };
    dispatch(qnaActions.editQnaAPI(qna, qnaId));
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
            onChange={changeTitle}
          />
          <TextField
            value={contents}
            placeholder="문의내용을 입력해주세요."
            onChange={changeContents}
          />

          {/* <button
            variant="outlined"
            component="label"
            color="default"
            // startIcon={<CloudUploadIcon/>}
            size="small"
          >
            <input
              id={"file-input"}
              multiple
              style={{ display: "none" }}
              type="file"
              name="imageFile"
              onChange={selectFile}
              ref={fileInput}
              disabled={is_uploading}
            />
          </button>
          <PreviewImg
            src={
              preview
                ? preview
                : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            }
            onError={ImageError}
          /> */}

          {is_edit ? (
            <SolidBtn width="150px" onClick={onEditQna}>
              수정하기
            </SolidBtn>
          ) : (
            <SolidBtn
              width="150px"
              onClick={onAddQna}
            >
              저장하기
            </SolidBtn>
          )}
        </ContentContainer>
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

const PreviewImg = styled.div`
  width: 200px;
  aspect-ratio: 1/1;
  border-radius: 150px;
  padding: 0px;
  background-size: cover;
  object-fit: cover;
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

export default QnaWrite;
