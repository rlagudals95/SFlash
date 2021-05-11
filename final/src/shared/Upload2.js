import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image2";
import styled from "styled-components";
import * as MdIcons from "react-icons/md";

const Upload = (props) => {
  const dispatch = useDispatch();
  //   const uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();
  const files = useSelector((state) => state.image2.file);
  // console.log("파일들", files);
  const selectFile = async (e) => {
    // e.target은 input이죠!
    // input이 가진 files 객체를 살펴봅시다.
    // console.log(e.target.files);
    // 선택한 파일이 어떻게 저장되어 있나 봅시다.
    // console.log(e.target.files[0]);

    // ref로도 확인해봅시다. :)
    // console.log(fileInput.current.files[0]);
    // const reader = await new FileReader();

    // 고르만큼 갯수 추가.... 어케하지?>!?
    const file = fileInput.current.files[0];
    // files의 length 만큼 for문 돌리자

    const files = fileInput.current.files;

    let images = []; // 이미지 파일들이 들어간 배열
    console.log("이미지들", images);
    // images 안에 있는 파일들을 formData형식으로 넘겨주자
    // image2 모듈안에 파일을 저장하는 곳을 따로 만들어 놔야겠다
    for (let i = 0; i < files.length; i++) {
      images.push(fileInput.current.files[i]);
    }

    if (file === undefined) {
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
      return;
    }

    images.forEach((img) => {
      //images의 파일들을 forEach로 모두 읽게한다
      const reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result);
        dispatch(imageActions.getPreview(reader.result));
        dispatch(imageActions.getFile(img));
      };
      reader.readAsDataURL(img);
    });
  };

  return (
    <React.Fragment>
      {/* multiple붙이면 파일여러개 업로드가능! */}

      <InputBtn>
        <Label for="file">
          {/* 사진추가 아이콘 */}
          <MdIcons.MdAddToPhotos size="2.5rem" color="#fff" />
        </Label>
        <FileInput
          id="file"
          type="file"
          ref={fileInput}
          onChange={selectFile}
          multiple
          style={{ display: "none" }}
        />
      </InputBtn>
    </React.Fragment>
  );
};

const InputBtn = styled.div`
  all: unset;
  font-size: 2px;
  border: none;
  margin-left: 2vw;
  z-index: 7001;
  width: 50px;
  position: fixed;
  right: 5px;
  top: 380px;
  cursor: pointer;
  @media (max-width: 1440px) {
    right: 0px;
    top: 335px;
  }
  @media (max-width: 600px) {
  }
`;

const Label = styled.label`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const FileInput = styled.input`
  font-size: 2px;
  border: none;
  margin-left: 2vw;
`;

export default Upload;
