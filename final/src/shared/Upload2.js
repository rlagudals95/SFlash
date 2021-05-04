import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image2";
import styled from "styled-components";
import $ from "jquery";

const Upload = (props) => {
  const dispatch = useDispatch();
  //   const uploading = useSelector((state) => state.image.uploading);
  const fileInput = React.useRef();

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

    for (let i = 0; i < files.length; i++) {
      images.push(fileInput.current.files[i]);
    }

    if (file === undefined) {
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
      return;
    }

    // images.forEach((img) => {
    //   console.log(img);
    //   reader.readAsDataURL(img);
    // });

    // reader.onloadend = () => {
    //   console.log(reader.result);
    //   dispatch(imageActions.setPreview(reader.result));
    //   };

    // 제이쿼리를 사용해 파일 여러개 파일리더로 읽기
    // $.each(images, function (index, file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     console.log(reader.result);
    //     dispatch(imageActions.setPreview(reader.result));
    //   };
    //   reader.readAsDataURL(file);
    // });

    images.forEach((img) => {
      const reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result);
        dispatch(imageActions.getPreview(reader.result));
      };
      reader.readAsDataURL(img);
    });

    //   $.each(images, function (index, file) {
    //     const reader = new FileReader();
    //     reader.onload = function (e) {
    //       fileData = e.target.result;
    //       //요 fileData로 파일 내 텍스트가 읽어드려진다.
    //     };
    //     reader.readAsDataURL(file);
    //   });
    //   images.forEach((img) => {
    //     console.log(img);
    //     return img;
    //   });
    // };

    // reader.readAsDataURL(files);

    //   function readFile2(fileNames) {
    //     const target = document.getElementsByName(fileNames);
    //     const fileLength = target[0].files.length;
    //     if (fileLength < 1) return;
    //     $.each(target[0].files, function (index, file) {
    //       const reader = new FileReader();
    //       reader.onload = function (e) {
    //         fileData = e.target.result;
    //         //요 fileData로 파일 내 텍스트가 읽어드려진다.
    //       };
    //       reader.readAsText(file, "euc-kr");
    //     });
    //   }

    // reader.onloadend = () => {
    //   // console.log(reader.result);
    //   dispatch(imageActions.setPreview(reader.result));
    // };
  };

  return (
    <React.Fragment>
      {/* multiple붙이면 파일여러개 업로드가능! */}
      <FileInput type="file" ref={fileInput} onChange={selectFile} multiple />
    </React.Fragment>
  );
};

const FileInput = styled.input`
  font-size: 2px;
  border: none;
  margin-left: 2vw;
`;

export default Upload;
