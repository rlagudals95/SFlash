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
import { actionCreators as ModalActions } from "../redux/modules/mapModal";
import { history } from "../redux/configStore";
import Swal from "sweetalert2";
import Spinner from "../shared/Spinner";
import { actionCreators as sideActions } from "../redux/modules/side";

// import { actionCreators as imageActions } from "../redux/modules/image2";
// import { actionCreators as CommnetActions } from "../redux/modules/comment";
// import { actionCreators as likeActions } from "../redux/modules/like";
// import { forEach } from "lodash";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const ModalDetail = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {}, []);

  // console.log("eeee", props);
  // const userId = localStorage.getItem("userId"); // 세션스토리지 토큰에 저장되어있는 유저 아이디 가져옴
  const modalData = useSelector((state) => state.mapmodal.post);

  const commentData = useSelector((state) => state.mapmodal.comment); //코멘트를 가져온다
  //수정 버튼 누르면 수정 모달이 뜨는 효과 구현

  if (commentData) {
    // console.log("코멘트 데이타", commentData);
  }
  //수정 버튼 누르면 수정 모달이 뜨는 효과 구현
  const [is_Editmodal, setEditModal] = useState();

  // console.log("모달 데이타", modalData);

  const nickname = localStorage.getItem("nickname");
  const user_id = localStorage.getItem("userId");

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

  // const is_comment = commentData ? true : false;
  const [comments, setComments] = useState();
  const ok_submit = comments ? true : false;

  const addLike = () => {
    dispatch(ModalActions.modalAddLikeAPI(modalData.id, modalData));
    dispatch(postActions.getMapPostAPI());
  };

  const disLike = () => {
    dispatch(ModalActions.modalDisLikeAPI(modalData.id, modalData));
    dispatch(postActions.getMapPostAPI());
  };

  const addComment = () => {
    //작성한 댓글 내용서버로 보낸단
    dispatch(ModalActions.modalAddCommentAPI(comments, modalData.id));
    setComments("");
  };

  const deleteComment = (id) => {
    //삭제한 댓글의 내용과 board id를 서버로 보낸다
    dispatch(ModalActions.modalDeleteCommentAPI(id));
  };

  // console.log("댓글 내용", comments);

  const selectComment = (e) => {
    setComments(e.target.value);
  };

  const closeModal = (e) => {
    dispatch(ModalActions.resetModal(false));
    props.close();
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
  //새로운 데이터가 들어올땐 어떻게 해야할까...?
  return (
    <React.Fragment>
      {modalData ? (
        commentData && ( //모달데이터가 들어와야 실행!
          <React.Fragment>
            <React.Fragment>
              <Component onClick={closeModal} />
              <ModalComponent>
                <ModalHeader>
                  <ModalLeftHeader>
                    <React.Fragment>
                      <ProCircle
                        src={
                          modalData.profileImg
                            ? modalData.profileImg
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        }
                        onClick={() => {
                          dispatch(sideActions.getPage());
                          history.replace(`/story/${modalData.writerId}`); // 게시물 작성자의 프로필부분들 클릭하면 해당유저의 마이페이지로 이동
                        }}
                      />
                      <ModalAuthor
                        onClick={() => {
                          dispatch(sideActions.getPage());
                          history.replace(`/story/${modalData.writerId}`); // 댓글 작성자의 프로필부분들 클릭하면 해당유저의 마이페이지로 이동
                        }}
                      >
                        {modalData.writerName}
                      </ModalAuthor>
                    </React.Fragment>
                    {/* <PostDate>{timeForToday(props.creatAt)}</PostDate> */}
                    <ExitContainer>
                      <ExitBtn onClick={closeModal}>
                        <CloseIcon fontSize="large" />
                      </ExitBtn>
                    </ExitContainer>
                  </ModalLeftHeader>
                </ModalHeader>
                {/* 이미지 슬라이드 구현 props로 받는 이미지의 개수가 1개를 초과할때  */}
                {/* 그 수만큼 map함수로 출력해준다 */}

                {modalData.img_url[0].imgUrl && modalData.img_url.length > 1 ? ( // 이미지가 없을때 에러뜨는 것을 방지
                  <Slider {...settings}>
                    {modalData.img_url.map((p, idx) => {
                      return (
                        //modalData[0].imgUrl
                        <div>
                          <ModalImg
                            src={
                              modalData.img_url[0].imgUrl &&
                              modalData.img_url[idx].imgUrl
                            }
                          />
                        </div>
                      );
                    })}
                  </Slider>
                ) : (
                  <ModalImg
                    src={
                      modalData.img_url[0].imgUrl && modalData.img_url[0].imgUrl
                    }
                  />
                )}

                <ModalBottomContainer>
                  <InfoBox>
                    <InfoBoxInner>
                      {/*is_like 여부로 하트모양 변경  */}

                      {modalData.like ? (
                        <LikeBox>
                          <div style={{ cursor: "pointer" }}>
                            {/* 좋아요 상태에 따라서 하트 모양의 조건부 렌더 */}
                            <FavoriteIcon
                              onClick={disLike}
                              style={{
                                color: "rgb(255, 183, 25)",
                                fontSize: 29,
                              }}
                            />
                            <LikeCntBox> {modalData.likeCnt}</LikeCntBox>
                          </div>
                        </LikeBox>
                      ) : (
                        <LikeBox>
                          <div style={{ cursor: "pointer" }}>
                            <FavoriteBorderIcon
                              style={{
                                fontSize: 30,
                                color: "rgb(255, 183, 25)",
                              }}
                              onClick={addLike}
                            />

                            <LikeCntBox> {modalData.likeCnt}</LikeCntBox>
                          </div>
                        </LikeBox>
                      )}
                      {/* 게시물 수정과 삭제 버튼은 작성자 에게만 보이게 설정  */}
                      {modalData.writerId == user_id ? (
                        <ModalEdit>
                          <React.Fragment onClick={props.close}>
                            <EditBtn
                              onClick={() => {
                                setEditModal(true);
                              }}
                            >
                              수정
                            </EditBtn>
                          </React.Fragment>
                          /
                          <DeleteBtn
                            onClick={(e) => {
                              Swal.fire({
                                text: "게시물을 삭제 하시겠습니까?",
                                icon: "question",
                                confirmButtonText: "예",
                                confirmButtonColor: "#ffb719",
                                showCancelButton: true,
                                cancelButtonText: "아니오",
                                cancelButtonColor: "#eee",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  // 클릭하면 게시물 삭제
                                  dispatch(
                                    postActions.deletePostAPI(modalData.id)
                                  ); //이거 왜안될까??....
                                  dispatch(
                                    postActions.deleteMarker(modalData.id)
                                  );
                                  props.close(); //삭제 바로반영?
                                }
                              });
                            }}
                          >
                            삭제
                          </DeleteBtn>
                        </ModalEdit>
                      ) : (
                        <ModalCate>
                          <ModalCateInner>#{modalData.category}</ModalCateInner>
                        </ModalCate>
                      )}
                    </InfoBoxInner>
                    <InfoOutter>
                      <PostTilte>
                        {modalData.title}{" "}
                        <PostDate>{timeForToday(modalData.creatAt)}</PostDate>
                      </PostTilte>
                      <PostContents>{modalData.content}</PostContents>
                      <PostTime>{modalData.spotName}</PostTime>
                    </InfoOutter>
                  </InfoBox>
                  <ModalCmtBox>
                    {commentData &&
                      commentData.map((c, idx) => {
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
                                      dispatch(sideActions.getPage());
                                      history.replace(`/story/${c.userId}`);
                                    }}
                                  ></ReplyImg>
                                  <ReplyWriter
                                    onClick={() => {
                                      dispatch(sideActions.getPage());
                                      history.replace(`/story/${c.userId}`);
                                    }}
                                  >
                                    {c.writerName}
                                  </ReplyWriter>
                                </React.Fragment>
                                <ReplyContainer>
                                  <Reply>
                                    {c.content}

                                    <CmtD>{timeForToday(c.modified)}</CmtD>
                                  </Reply>
                                </ReplyContainer>
                              </ReplyLeft>

                              {/* 방금 전 */}

                              {nickname === c.writerName ? (
                                <CmtDeleteBtn
                                  onClick={() => {
                                    deleteComment(c.commentId);
                                  }}
                                >
                                  <DeleteForeverIcon />
                                </CmtDeleteBtn>
                              ) : (
                                <CmtDeleteBtn2>space</CmtDeleteBtn2>
                              )}
                            </Replys>
                          </ReplyBox>
                        );
                      })}
                  </ModalCmtBox>
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
                </ModalBottomContainer>
              </ModalComponent>
              {is_Editmodal ? (
                <UploadModal
                  close={closeDetailModal}
                  {...modalData}
                  modal={"modal"}
                />
              ) : null}
            </React.Fragment>
          </React.Fragment>
        )
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

const CmtD = styled.span`
  opacity: 0.4;
  font-size: 0.5px;
  margin-left: 3px;
`;

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
  all: unset;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  object-fit: cover;
  background-repeat: no-repeat;
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 320px;
  /* max-width: 350px; */
  background-position: center;

  @media (max-width: 1440px) {
    /* 1450밑으로 넓이가 내려가면 */
    /* all: unset; */
    background-image: url("${(props) => props.src}");

    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 325px;
    /* max-height: 42vh; */
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
  opacity: 0.8;
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
  width: 390px;
  height: 660px;

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
    position: fixed;
    width: 390px;
    height: 670px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
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
    /* background-color: red; */
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
  @media (max-width: 600px) {
    font-size: 7px;
    padding: 1px;
  }
`;

const ExitBtn = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.main_color};
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  @media (max-width: 600px) {
    font-size: 7px;
  }
`;

const ModalBottomContainer = styled.div`
  text-align: left;
  width: 370px;
  height: 272px;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  margin: 0px auto;
  /* background-color: red; */
  /* @media (max-width: 1600px) {
    text-align: left;
    width: 470px;
    height: 320px;
    display: flex;
    flex-direction: column;
    padding: 0px 12px;
    margin: 0px auto;
  } */

  @media (max-width: 1440px) {
    /* background-color: red; */
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 370px;
    height: 270px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 1.3vh;
  }
  /* @media (max-width: 1080px) {
 
    text-align: left;
    width: 450px;
   
    height: 335px;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
    margin-top: 1.3vh;
  } */
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    text-align: left;
    width: 100%;
    height: 47vh; // 이거 올려주니까 댓글창이보인다..!
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
  height: 290px;
  text-align: left;
  margin: 0px auto;
  /* background-color: red; */
  padding-top: 5px;
  border-bottom: 1px solid #efefef;
  /* background-color: blue; */
  /* @media (max-width: 1440px) {
    width: 240px;
    height: 290px;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    background-color: red;
  } */
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    width: calc(100% - 7vw); //패딩대신... 오,....
    height: 18vh;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
  }
`;

const InfoBoxInner = styled.div`
  width: 100%; //요놈 크기 바꿔
  height: 25px;
  /* margin-top: 10px; */

  font-size: 15px;
  display: flex;
  /* background-color: red; */
  justify-content: space-between;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    width: 100%;
    /* height: 15vh; */
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
  margin-top: 5px;
`;
const PostTilte = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  width: 100%;
  margin-bottom: 3px;
  height: 40px;
  max-height: 40px;
  /* background-color: red; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PostContents = styled.div`
  font-size: 0.8rem;
  opacity: 0.6;
  width: 100%;
  margin-top: 0px;
  /* background-color: red; */
  max-height: 40px;
  overflow-y: scroll;
  /* overflow: auto; */
  ::-webkit-scrollbar {
    /* display: none; */
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    width: 8px;
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const PostTime = styled.div`
  font-size: 0.7rem;
  opacity: 0.4;
  margin-top: 3.5px;

  /* margin: 15px 0px 8px 0px; */
`;
const ModalCmtInputBox = styled.div`
  /* margin-top: 100px; */
  align-items: center;
  width: 100%;
  padding: 4px;
  display: flex;
  box-sizing: border-box;
  border: 2px solid #efefef;
  background-color: white;
  box-shadow: 1px 1px 3px 1px rgba(0, 0.1, 0.1, 0.1);
  /* background-color: red; */
  /* @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    height: 80px;
  }
  @media (max-width: 1100px) {
    // 1450밑으로 넓이가 내려가면
    height: 80px;
  } */

  @media (max-width: 600px) {
    height: 100px;
    margin-bottom: -7vh;
  }
`;

const ModalCmtBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  /* background-color: red; */
  width: 100%;
  margin: 0px auto;
  /* margin-right: 100px; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  /* @media (max-width: 1440px) {

    ::-webkit-scrollbar {
      display: none;
    }


  } */
`;

const ReplyBox = styled.div`
  /* padding: 5px 25px 0px 0px; */
  align-items: center;
  /* margin-left: -12px; */
  /* width: 450px; */

  margin: 0.5vh auto;
  padding-left: 13px;
  /* background-color: blue; */
`;

const Replys = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 26px;
  width: 100%;
`;

const ReplyImg = styled.div`
  height: 2.2vh;
  width: 2.2vh;
  border-radius: 50%;
  background-size: cover;
  margin-right: 7px;
  background-image: url("${(props) => props.src}");
  cursor: pointer;
`;

const ReplyWriter = styled.div`
  font-size: 8px;
  font-weight: bold;
  padding-right: 5px;
  cursor: pointer;
`;

const ReplyContainer = styled.div`
  width: 250px;
  margin: 0 auto;
  /* overflow-y: scroll; */
  display: flex;
  height: 21px;
  height: auto;
  /* padding-top: 20px; */
  /* background-color: red; */
  word-break: break-all;
  white-space: wrap;
  line-height: 19px;
  /* text-overflow: ellipsis; */
  opacity: 0.7;
  ::-webkit-scrollbar {
    display: none;
  }
  /* ::-webkit-scrollbar-thumb {
    width: 8px;
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  } */
`;

const Reply = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const ReplyLeft = styled.div`
  align-items: center;
  display: flex;
  /* background-color: green; */
`; // space-between 효과 주기위해서 쓴다

// const ReplyRight = styled.div`
//   display: flex;
//   /* background-color: red; */
//   /* width: 20000px; */
// `;

// const CmtDate = styled.div`
//   font-size: 1px;
//   margin: auto 0;
//   opacity: 0.3;

//   /* width: 3px; */
//   @media (max-width: 1440px) {
//     /* background-color: red; */
//     display: flex;
//   }
// `;

const CmtDeleteBtn = styled.button`
  height: 2px;
  width: 2p;
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

const CmtDeleteBtn2 = styled.button`
  height: 2px;
  width: 2p;

  background-color: transparent;
  border: none;
  outline: none;
  opacity: 0;
  margin-right: 1.3vw;
  margin-bottom: 2.3vh;
`;

const CommentInput = styled.input`
  background: white;
  border: none;
  outline: none;
  width: 100%;
  padding: auto 0px;
  background-color: white;
  @media (max-width: 600px) {
  }
`;

const UploadBtn = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.main_color};
  cursor: pointer;
  opacity: 1;
  font-weight: 600;
  width: 30px;
`;

const EditBtn = styled.span`
  cursor: pointer;
`;

const DeleteBtn = styled.span`
  margin-left: 1px;
  cursor: pointer;
`;

export default ModalDetail;
