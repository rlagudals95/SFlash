import React, { useState } from "react";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Slider from "react-slick";
import UploadModal from "./UpLoadModal";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as CommnetActions } from "../redux/modules/comment";
import { actionCreators as likeActions } from "../redux/modules/like";
import { history } from "../redux/configStore";

const ModalDetail = (props) => {
  const dispatch = useDispatch();
  // React.useEffect(() => {}, []);

  React.useEffect(() => {
    // console.log("시작");
    dispatch(CommnetActions.getComment(props.id));
    // }, [dispatch, props.id]);
  }, []);

  // const userId = localStorage.getItem("userId"); // 세션스토리지 토큰에 저장되어있는 유저 아이디 가져옴
  // const user_info = useSelector((state) => state.user.user);

  //수정 버튼 누르면 수정 모달이 뜨는 효과 구현
  const [is_Editmodal, setEditModal] = useState();

  // console.log(user_info);
  const nickname = localStorage.getItem("nickname");
  const user_id = localStorage.getItem("userId");

  // const openEditModal = () => {
  //   setEditModal(true);
  // };

  const closeDetailModal = () => {
    setEditModal(false);
  };

  //캐러셀 모듈 코드
  var settings = {
    dots: true, // 이미지 밑의 점을 출력할 건지 입력
    infinite: true,
    speed: 500, //이미지 넘어가는 속도
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 받아온 이미지들
  let image_list = [];

  for (let i = 0; i < props.img_url.length; i++) {
    image_list.push(props.img_url[i]);
  }

  let images = [];

  image_list.forEach((img) => {
    images.push(img.imgUrl);
  });

  // console.log("이미지들!!", images);

  let comment_list = [];
  for (let i = 0; i < props.comment.length; i++) {
    comment_list.push(props.comment[i]);
  }

  const comment_List = useSelector((state) => state.comment.list);

  // console.log("이포스트의 댓글은??", comment_List);

  const is_comment = comment_List ? true : false;
  const [comments, setComments] = useState();
  const ok_submit = comments ? true : false;

  const addLike = () => {
    dispatch(likeActions.addLikeAPI(props.id, props));
    // dispatch(postActions.editLikeP(props.id, props)); // 리덕스
  };

  const disLike = () => {
    dispatch(likeActions.disLikeAPI(props.id, props));
    // dispatch(postActions.editLikeD(props.id, props));
  };

  const addComment = () => {
    //작성한 댓글 내용서버로 보낸단
    dispatch(CommnetActions.addCommentAPI(comments, props.id));
    setComments("");
  };

  const deleteComment = (id) => {
    //삭제한 댓글의 내용과 board id를 서버로 보낸다
    dispatch(CommnetActions.deleteCommentAPI(id, props.id));
  };

  const selectComment = (e) => {
    setComments(e.target.value);
  };

  //작성 날짜 설정하기
  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
    <React.Fragment>
      <Component onClick={props.close} />
      <ModalComponent>
        <ModalHeader>
          <ModalLeftHeader>
            <React.Fragment>
              <ProCircle
                src={
                  props.profileImg
                    ? props.profileImg
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                onClick={() => {
                  history.replace(`/story/${props.writerId}`); // 게시물 작성자의 프로필부분들 클릭하면 해당유저의 마이페이지로 이동
                }}
              />
              <ModalAuthor
                onClick={() => {
                  history.replace(`/story/${props.writerId}`); // 댓글 작성자의 프로필부분들 클릭하면 해당유저의 마이페이지로 이동
                }}
              >
                {props.writerName}
              </ModalAuthor>
            </React.Fragment>
            {/* <PostDate>{timeForToday(props.creatAt)}</PostDate> */}
            <ExitContainer>
              <ExitBtn onClick={props.close}>
                <CloseIcon fontSize="small" />
              </ExitBtn>
            </ExitContainer>
          </ModalLeftHeader>
        </ModalHeader>
        {/* 이미지 슬라이드 구현 props로 받는 이미지의 개수가 1개를 초과할때  */}
        {/* 그 수만큼 map함수로 출력해준다 */}
        {images.length > 1 ? (
          <Slider {...settings}>
            {images.map((p, idx) => {
              return (
                <div>
                  <ModalImg src={images[idx]} />
                </div>
              );
            })}
          </Slider>
        ) : (
          <ModalImg src={images[0]} />
        )}

        <ModalBottomContainer>
          <InfoBox>
            <InfoBoxInner>
              {/*is_like 여부로 하트모양 변경  */}

              {props.like ? (
                <LikeBox>
                  <div style={{ cursor: "pointer" }}>
                    {/* 좋아요 상태에 따라서 하트 모양의 조건부 렌더 */}
                    <FavoriteIcon
                      onClick={disLike}
                      style={{ color: "rgb(255, 183, 25)", fontSize: 30 }}
                    />
                    <LikeCntBox> {props.likeCnt}</LikeCntBox>
                  </div>
                </LikeBox>
              ) : (
                <LikeBox>
                  <div style={{ cursor: "pointer" }}>
                    <FavoriteBorderIcon
                      // style={{ color: "rgb(255, 183, 25)" }}
                      style={{ fontSize: 30, color: "rgb(255, 183, 25)" }}
                      onClick={addLike}
                    />

                    <LikeCntBox> {props.likeCnt}</LikeCntBox>
                  </div>
                </LikeBox>
              )}

              {/* 게시물 수정과 삭제 버튼은 작성자 에게만 보이게 설정  */}
              {props.writerId == user_id ? (
                <ModalEdit>
                  <React.Fragment onClick={props.close}>
                    <EditBtn
                      onClick={() => {
                        setEditModal(true);

                        // dispatch(imageActions.getPost(props.id));
                      }}
                    >
                      수정
                    </EditBtn>
                  </React.Fragment>
                  /
                  <DeleteBtn
                    onClick={(e) => {
                      // e.prevent..., e.stopPro.. 이것들로 이벤트 버블링을 막는다
                      e.preventDefault();
                      e.stopPropagation();
                      // 클릭하면 게시물 삭제
                      dispatch(postActions.deletePostAPI(props.id)); //이거 왜안될까??....
                    }}
                  >
                    삭제
                  </DeleteBtn>
                </ModalEdit>
              ) : (
                <ModalCate>
                  <ModalCateInner>#{props.category}</ModalCateInner>
                </ModalCate>
              )}
            </InfoBoxInner>
            <InfoOutter>
              <PostTilte>
                {props.title} <PostDate>{timeForToday(props.creatAt)}</PostDate>
              </PostTilte>
              <PostContents>{props.content}</PostContents>
              <PostTime>{props.spotName}</PostTime>
            </InfoOutter>
          </InfoBox>
          <ModalCmtBox>
            {is_comment
              ? comment_List.map((c, idx) => {
                  //여기서 댓글을 입력하고 map으로 props 값을 돌려서 화면을 띄우게 해줌
                  //댓글이 2개보다 작다면? 1개라면?
                  return (
                    <ReplyBox>
                      <Replys>
                        <ReplyLeft>
                          <React.Fragment>
                            <ReplyImg
                              src={
                                //댓글 작성자가 아직 프로필 이미지를 등록 안했을 경우엔 기본이미지를 보여주도록 설정
                                c.writerImgUrl
                                  ? c.writerImgUrl
                                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                              }
                              onClick={() => {
                                history.replace(`/story/${c.userId}`);
                              }}
                            ></ReplyImg>
                            <ReplyWriter
                              onClick={() => {
                                history.replace(`/story/${c.userId}`);
                              }}
                            >
                              {c.writerName}
                            </ReplyWriter>
                          </React.Fragment>
                          <ReplyContainer>
                            <Reply>{c.content}</Reply>
                          </ReplyContainer>
                        </ReplyLeft>
                        <ReplyRight>
                          <CmtDate>
                            {/* 방금 전 */}
                            {timeForToday(c.modified)}
                          </CmtDate>
                          {nickname == c.writerName ? (
                            <CmtDeleteBtn
                              onClick={() => {
                                deleteComment(c.commentId);
                              }}
                            >
                              {/*  */}
                              <DeleteForeverIcon />
                            </CmtDeleteBtn>
                          ) : null}
                        </ReplyRight>
                      </Replys>
                    </ReplyBox>
                  );
                })
              : null}
          </ModalCmtBox>
          <CommentOutter>
            <ModalCmtInputBox>
              <CommentInput
                type="text"
                placeholder="댓글달기..."
                onChange={selectComment}
                value={comments}
              />

              {ok_submit ? (
                <UploadBtn onClick={addComment}>게시</UploadBtn>
              ) : (
                <UploadBtn style={{ opacity: "0.3" }}>게시</UploadBtn>
              )}
            </ModalCmtInputBox>
          </CommentOutter>
        </ModalBottomContainer>
      </ModalComponent>
      {is_Editmodal ? (
        <UploadModal close={closeDetailModal} {...props} />
      ) : null}
    </React.Fragment>
  );
};

const LikeBox = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  width: 60px;
`;

const LikeCntBox = styled.span`
  margin: auto 0px;
  font-weight: bold;
  opacity: 0.7;
`;

const ModalImg = styled.img`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;

  background-repeat: no-repeat;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 400px;
  height: 400px;
  background-position: center;

  @media (max-width: 1440px) {
    /* 1450밑으로 넓이가 내려가면 */
    /* all: unset; */
    background-image: url("${(props) => props.src}");
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 315px;
    max-height: 42vh;
  }
  @media (max-width: 600px) {
    /* 1450밑으로 넓이가 내려가면 */
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
  }
`;

const Component = styled.div`
  position: fixed;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ModalComponent = styled.div`
  border-radius: 0.5vw;
  position: fixed !important;
  /* width: 590px; */
  width: 500px;
  height: 810px;
  /* overflow: hidden; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fafafc;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border: none;
  box-sizing: border-box;
  min-width: 380px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: fixed;
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

  @media (max-width: 1030px) {
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
    z-index: 6998;
  }
`;

// const HeaderInner = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: auto auto;
//   align-items: center;
//   padding: 1.3vh 0px;
//   width: 95%;
// `;

// const HeaderEdit = styled.div`
//   color: ${(props) => props.theme.main_color};
//   font-weight: bold;
//   background-color: transparent;
//   font-size: 14px;
//   cursor: pointer;
// `;

const ExitContainer = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px;
  opacity: 0.7;
`;

const ExitBtn = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.main_color};
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ModalBottomContainer = styled.div`
  text-align: left;
  width: 480px;
  height: 290px;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  margin: 0px auto;
  /* background-color: red; */
  @media (max-width: 1600px) {
    text-align: left;
    width: 470px;
    height: 290px;
    display: flex;
    flex-direction: column;
    padding: 0px 12px;
    margin: 0px auto;
  }

  @media (max-width: 1440px) {
    /* background-color: red; */
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 450px;
    // 이거 올려주니까 댓글창이보인다..!
    height: 260px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 1.3vh;
  }
  @media (max-width: 1080px) {
    /* background-color: red; */
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 450px;
    // 이거 올려주니까 댓글창이보인다..!
    height: 280px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 1.3vh;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    text-align: left;
    width: 100%;
    height: 55vh; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
  }
  /* justify-content: space-between; */

  /* border-left: 1px solid #efefef; */
`;

const ModalHeader = styled.div`
  padding: 1vh;
  /* border-bottom: 1px solid #efefef; */
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;
const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0px auto;
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

  cursor: pointer;
`;
const ModalAuthor = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 5px;
  cursor: pointer;
`;

const PostDate = styled.span`
  font-size: 0.3rem;
  opacity: 0.3;
  padding-top: 0.35vh;
`;
const InfoBox = styled.div`
  width: 100%;
  height: 480px;
  text-align: left;
  margin: 0px auto;
  border-bottom: 1px solid #efefef;
  /* background-color: blue; */
  /* background-color: red; */
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    width: calc(100% - 2vw); //패딩대신... 오,....
    height: 150px;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    width: calc(100% - 7vw); //패딩대신... 오,....
    height: 21vh;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    /* background-color: red; */
  }
`;

const InfoBoxInner = styled.div`
  width: 100%; //요놈 크기 바꿔
  height: 33px;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    width: 100%;
    height: 15vh;
    padding: 0px;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    width: 100%;
    height: 50px;
    padding: 0px;
  }
`;

const ModalCate = styled.div`
  background-color: white;
  width: 80px;
  height: 24px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  vertical-align: middle;
  line-height: 24px;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0.1, 0.1, 0.2);
`;
const ModalCateInner = styled.div``;

const ModalEdit = styled.div`
  opacity: 0.5;
  font-size: 0.8rem;
`;
const InfoOutter = styled.div`
  height: 110px;
  width: 100%;
  /* background-color: red; */
`;

const PostTilte = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  width: 100%;
  margin-bottom: 10px;
  height: 40px;
  max-height: 40px;

  /* overflow-y: scroll; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 600px) {
    font-size: 17px;
  }
`;
const PostContents = styled.div`
  font-size: 0.9rem;
  opacity: 0.6;
  width: 100%;
  margin-top: 3px;
  /* background-color: red; */
  max-height: 50px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const PostTime = styled.div`
  font-size: 0.7rem;
  opacity: 0.4;
  margin-top: 13px;

  /* margin: 15px 0px 8px 0px; */
`;
const ModalCmtInputBox = styled.div`
  align-items: center;
  margin-bottom: -53px;
  width: 100%;
  height: 37px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  box-sizing: border-box;
  border: 2px solid #efefef;
  /* background-color: blue; */
  box-shadow: 1px 1px 3px 1px rgba(0, 0.1, 0.1, 0.1);
  /* background-color: red; */
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    height: 30px;
    /* background-color: green; */
    margin-bottom: -150px;
  }
  @media (max-width: 1100px) {
    // 1450밑으로 넓이가 내려가면
    height: 35px;
    /* background-color: pink; */
  }

  @media (max-width: 600px) {
    height: 40px;
    margin-bottom: -7vh;
  }
`;

const ModalCmtBox = styled.div`
  padding: 0px 0px;
  display: flex;
  flex-direction: column;
  height: 600px;
  /* background-color: red; */
  /* 아래 태그는 댓글이 많으면 
  스크롤로 아래 부분이 위로 올라가게 해서 
  댓글이 보여지게 함 */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* flex-direction: column; */
    /* background-color: red; */
    padding: 0px 14px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* flex-direction: column; */
    height: 13vh;
    /* background-color: red; */
    padding: 0px 14px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ReplyBox = styled.div`
  /* padding: 5px 25px 0px 0px; */
  align-items: center;
  /* margin-left: -12px; */
  width: 100%;
  margin: 0.5vh auto;
  /* background-color: blue; */
`;

const Replys = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3vh;
  width: 100%;
  @media (max-width: 1440px) {
    /* background-color: red; */
    display: flex;
    align-items: center;
    margin-top: 1vh;
    justify-content: space-between;
    height: 3vh;
  }
`;
const ReplyImg = styled.div`
  height: 2.2vh;
  width: 2.2vh;
  border-radius: 50%;
  background-size: cover;
  margin-right: 10px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;

  @media (max-width: 600px) {
    height: 20px;
    width: 20px;
  }
`;

const ReplyWriter = styled.div`
  font-size: 1.1vh;
  font-weight: bold;
  padding-right: 10px;
  cursor: pointer;
`;

const ReplyContainer = styled.div`
  width: 270px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Reply = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  @media (max-width: 600px) {
    /* width: 59vw; */
    overflow-x: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ReplyLeft = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 600px) {
    /* background-color: red; */
    width: 45vh;
  }
`; // space-between 효과 주기위해서 쓴다
const ReplyRight = styled.div`
  display: flex;
`;

const CmtDate = styled.div`
  font-size: 0.2rem;
  margin: auto 0;
  opacity: 0.3;
  @media (max-width: 600px) {
    /* background-color: red; */
    font-size: 3px;
  }
`;

const CmtDeleteBtn = styled.button`
  height: 0.3vh;
  width: 0.3vh;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  opacity: 0.2;
  margin-right: 1.3vw;
  margin-bottom: 2.3vh;
  &:hover {
    opacity: 1;
  }
`;

const CommentOutter = styled.div`
  @media (max-width: 600px) {
    /* display: block;
    height: 30px;
    padding: 0px 0px; */
    /* background-color: red; */
  }
`;

const CommentInput = styled.input`
  background: white;
  border: none;
  outline: none;
  width: 100%;
  padding: auto 0px;
  background-color: white;

  @media (max-width: 600px) {
    /* line-height: 10px;
    height: 200px; */
    padding: -50px -50px;
  }
`;

const UploadBtn = styled.div`
  font-size: 14px;

  /* color: #3897f0; */
  color: ${(props) => props.theme.main_color};
  cursor: pointer;
  opacity: 1;
  font-weight: 600;
  width: 30px;
  margin-right: 1vw;
  /* margin: 10px 5px 0px 0px; */
  /* padding-bottom: 5px; */
  /* width: 30px;
  @media (max-width: 1440px) {
   
    margin: 5px 5px 0px 0px;
  }
  @media (max-width: 600px) {
    
    margin: 10px 5px 0px 0px;
    width: 40px;
  } */
  @media (max-width: 600px) {
    /* height: 100px;
    padding: 0px 0px; */
  }
`;

const EditBtn = styled.span`
  cursor: pointer;
`;

const DeleteBtn = styled.span`
  margin-left: 1px;
  cursor: pointer;
`;

export default ModalDetail;
