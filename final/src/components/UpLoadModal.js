import React, { useState } from "react";
import { history } from "../redux/configStore";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { actionCreators as imageActions } from "../redux/modules/image2";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Slider from "react-slick";
import UploadImg from "../components/UpLoadModal";
import { useDispatch, useSelector } from "react-redux";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import Upload2 from "../shared/Upload2";
import SelectCate from "./SelectCate";
import { actionCreators as postActions } from "../redux/modules/post";

const UploadModal = (props) => {

  const { latitude, longitude, spotName } = props;
  
  console.log("위도: " + latitude + " , " + "경도: " + longitude + " , " + "장소이름 : " + spotName);

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image2.preview);

  const user_info = useSelector((state) => state.user.user);
  const [contents, setContents] = React.useState("");
  const [title, setTitle] = React.useState("");
  const post_list = useSelector((state) => state.post.list);
  // const post_id = props.match.params.id;
  // const is_edit = props.id ? true : false; 게시글 작성시 props로 id를 받냐 안받냐 차이
  // const _post = is_edit ? post_list.find((p) => p.id == post_id) : null;
  // console.log("프리뷰", preview);
  const ok_submit = contents ? true : false;

  // React.useEffect(() => {
  //   // if (!preview) {
  //   //   dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
  //   // }
  //   if (is_edit) {
  //     // 포스트의 이미지 url로 프리뷰 설정
  //   } else {
  //     dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (is_edit && !_post) {
  //     // 포스트 id가 같지 않거나 post_id가 현재 post_list중 같은게 없다면
  //     console.log("포스트 정보가 없어요!");
  //     history.goBack(); // 포스팅을 찾을 수 없다는 뜻 그러므로 리턴

  //     return;
  //   }

  //// 수정가능한 상태인지는 props.id(post_id) 여부에 따라

  //   //만약 수정가능 상태라면
  //   if (is_edit) {
  //     dispatch(imageActions.setPreview(_post.post_image_url)); // 페이지가 렌더링 되면서 기존 이미지 같이 렌더링
  //   } else {
  //     dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
  //   }
  // }, []);

  // 작성된 것을 리듀서-스토어에 디스패치해서 변경된 데이터를 본페이지에서 렌더링 되게 요청
  const addPost = () => {
    if (!contents) {
      window.alert("😗빈칸을 채워주세요...ㅎㅎ");
      return;
    }
    let post = {
      title: title,
      content: contents,
      latitude: props.latitude,
      longitude: props.longitude,
      spotName: props.spotName,

    };
    console.log(post);
    dispatch(postActions.addPostAPI(post));
    history.replace('/');
  };

  // 수정된 것을 리듀서-스토어에 디스패치해서 변경된 데이터를 본페이지에서 렌더링 되게 요청
  //위의 수정 조건을 다 만족 했을 시에 수정 버튼을 눌러 editPostAX를 디스패치로 실행
  // const editPost = () => {
  //   if (!contents) {
  //     window.alert("😗빈칸을 채워주세요...ㅎㅎ");
  //     return;
  //   }

  //   let post = {
  //     contents: contents,
  //   };
  //   console.log(post_id);
  //   dispatch(postActions.editPostAPI(post_id, post));
  // };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const editPost = () => {
    dispatch(postActions.editPostAPI(props.id, _post));
    // history.replace("/postlist");

    window.location.reload();
  };

  const _post = {
    title: title,
    content: contents,
  };

  //캐러셀 모듈 코드
  var settings = {
    dots: true, // 이미지 밑의 점을 출력할 건지 입력
    infinite: true,
    speed: 500, //이미지 넘어가는 속도
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //밑에두면 preview값을 바로 받을 수가 없다?

  return (
    <React.Fragment>
      <Component onClick={props.close} />
      <ModalComponent>
        {/* <UploadImg setImage={setImage} /> */}
        <ModalHeader>
          <ModalLeftHeader>
            <ProCircle src={props.profile_image_url} />
            <ModalAuthor>username</ModalAuthor>

            <Upload2></Upload2>
            <ExitContainer>
              <ExitBtn onClick={props.close}>
                <CloseIcon fontSize="large" />
              </ExitBtn>
            </ExitContainer>
          </ModalLeftHeader>
        </ModalHeader>
        {/* 게시물 올릴때랑 수정일때 다르게 return */}

        {/* {is_edit? 수정할 때 : 수정안 할 때 via홀더 보여줌 } */}
        {preview ? (
          preview.length > 1 ? (
            <Slider {...settings}>
              {preview.map((p, idx) => {
                return (
                  <div>
                    <ModalImg src={preview[idx]} />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <ModalImg src={preview} />
          )
        ) : null}

        {/* 수정할때  */}

        {/* {props.imgUrl.length > 1 ? (
          <Slider {...settings}>
            {props.imgUrl.map((p, idx) => {
              return (
                <div>
                  <ModalImg src={props.imgUrl[idx]} />
                </div>
              );
            })}
          </Slider>
        ) : (
          <ModalImg />
        )} */}
        <ModalBottomContainer>
          <MiddleBox>
            <Title>
              <TextField
                id="outlined-multiline-static"
                label="📝제목 작성"
                multiline
                rows={1}
                variant="outlined"
                value={title}
                onChange={changeTitle}
              />
            </Title>
          </MiddleBox>

          <TextField
            id="outlined-multiline-static"
            label="📝글 작성"
            multiline
            rows={6}
            variant="outlined"
            value={contents}
            onChange={changeContents}
          />
          <SelectCate></SelectCate>

          {/* {is_edit? <WriteSubmit
          
            onClick={editPost}
            onClick={props.close}
          >
            게시글 작성
          </WriteSubmit> : <WriteSubmit
            onClick={addPost}
            // onClick={props.close}
          >
            게시글 작성
          </WriteSubmit> } */}
          <WriteSubmit
            onClick={addPost}
            // onClick={editPost}
            // onClick={props.close}
          >
            게시글 작성
          </WriteSubmit>
        </ModalBottomContainer>
      </ModalComponent>
    </React.Fragment>
  );
};

const ModalImg = styled.img`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;
  background-position: 0px;
  background-repeat: no-repeat;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 55vh;
  max-height: 350px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 35vh;
    margin-bottom: -20px;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 40vh;
    margin-bottom: 1vh;
  }
`;

const Component = styled.div`
  position: fixed;
  opacity: 0.8;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ModalComponent = styled.div`
  position: fixed !important;
  width: 580px;
  height: 870px;
  /* overflow: hidden; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  border: none;
  box-sizing: border-box;
  min-width: 380px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: fixed;
    /* width: 35vw; */
    width: 470px;
    height: 730px;
    /* overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: white; */
    z-index: 1000;
    border: none;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: absolute;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: white; */
    z-index: 1000;
    border: none;
    box-sizing: border-box;
    z-index: 7000;
  }
  /* @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  /* } */ /////////////// */
`;

const ExitContainer = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px;
`;

const ExitBtn = styled.button`
  cursor: pointer;
  color: lightgray;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ModalBottomContainer = styled.div`
  margin: 0px auto;
  margin-top: 30px;
  text-align: left;
  width: 550px;
  height: 600px;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 450px;
    // 이거 올려주니까 댓글창이보인다..!
    height: 600px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 5vh;
    /* background-color: red; */
  }

  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    text-align: left;
    width: 93vw;
    height: 50vh; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 5vh;
  }
  /* justify-content: space-between; */

  /* border-left: 1px solid #efefef; */
`;

const ModalHeader = styled.div`
  padding: 1.5vh;
  /* border-bottom: 1px solid #efefef; */
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;
const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

// const ModalRightHeader = styled.div`
//   cursor: pointer;
// `;

const ProCircle = styled.img`
  margin-left: 0.1vw;
  height: 3.5vh;
  width: 3.5vh;
  border-radius: 50%;
  background-size: cover;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;
const ModalAuthor = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 5px;
`;

const WriteSubmit = styled.button`
  margin: auto;
  text-align: center;
  font-weight: 600;
  background-color: #0095f6;
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  border: none;
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    margin: auto;
    margin-top: 2vh;
    text-align: center;
    font-weight: 600;
    background-color: #0095f6;
    color: white;
    padding: 8px 14px;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    border: none;
  }
`;

const MiddleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-bottom: 1vh;
`;
const CateBtn = styled.div`
  font-size: bold;
  width: 6.5vw;
  /* border: 1px solid lightgray; */
  height: 3.5vh;
  border-radius: 10px;
`;

export default UploadModal;
