import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
// import { history } from "../redux/configStore";
// import { actionCreators as qnaActions } from "../redux/modules/qna";
import { actionCreators as qnaCommentActions } from "../redux/modules/qnacomment";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const QnaDetailComment = (props) => {
  const dispatch = useDispatch();

  // userId 값을 props로 받아옵니다.
  const { qnaId } = props;

  // me: 게시물 열람이나 댓글 권한 여부를 판단하기 위해 로컬스토리지의 nickname을 사용합니다.
  // role: 관리자 여부를 판단해 관리자만 댓글 작성이 가능하도록 합니다.
  const me = localStorage.getItem("nickname");
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    if (!qnaId) {
      return;
    }
    dispatch(qnaCommentActions.getQnaCommentAPI(qnaId));
  }, []);

  // 해당 게시물의 댓글 리스트 불러오기
  const comment_list = useSelector((state) => state.qnacomment.list);
  const editIdx = useSelector((state) => state.qnacomment.idx);

  //  댓글 등록, 수정
  const [comment, setComment] = React.useState(
    editIdx ? comment_list[editIdx].content : ""
  );
  const changeComment = (e) => {
    setComment(e.target.value);
  };
  const [editCommentMode, setEditCommentMode] = React.useState(false);

  // 댓글 등록 버튼을 누르면 실행되는 함수
  // 내용의 유무를 판단하고 백으로 값을 전달합니다.
  const onAddCommentSubmit = (comment) => {
    if (!comment) {
      Swal.fire({
        text: "댓글을 입력하지 않으셨습니다.",
        confirmButtonColor: "#ffb719",
      });
      return;
    } else if (role !== "ADMIN") {
      Swal.fire({
        text: "댓글 권한이 없습니다.",
        confirmButtonColor: "#ffb719",
      });
      return;
    } else {
      dispatch(qnaCommentActions.addQnaCommentAPI(comment, qnaId));
      setComment("");
    }
  };

  // 댓글 등록 버튼을 누르면 실행되는 함수
  // 내용의 유무를 판단하고 백으로 값을 전달합니다.
  const onEditCommentMode = (idx) => {
    dispatch(qnaCommentActions.editCommentMode(idx));
    setEditCommentMode(true);
  };

  const onEditCommentSubmit = (comment) => {
    const qcommentId = comment_list[editIdx].id;
    if (!comment) {
      Swal.fire({
        text: "댓글을 입력하지 않으셨습니다.",
        confirmButtonColor: "#ffb719",
      });
      return;
    } else if (role !== "ADMIN") {
      Swal.fire({
        text: "댓글 권한이 없습니다.",
        confirmButtonColor: "#ffb719",
      });
      return;
    } else {
      Swal.fire({
        text: "댓글을 수정 하시겠습니까?",
        confirmButtonText: "예",
        confirmButtonColor: "#ffb719",
        showCancelButton: true,
        cancelButtonText: "아니오",
        cancelButtonColor: "#eee",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            qnaCommentActions.editQnaCommentAPI(comment, qcommentId, qnaId)
          );
          setComment("");
          setEditCommentMode(false);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <CommentContainer>
        {/* 댓글 리스트 부분 */}
        {comment_list &&
          comment_list.map((c, idx) => {
            const qcommentId = comment_list[idx].id;
            return (
              <Comment key={c.id} {...c}>
                <Grid flex>
                  <Text weight="600">{c.writer}</Text>
                  <Text>{c.content}</Text>
                  <Text width="130px" style={{ color: "grey" }}>
                    {c.modified.split("T")[0]}
                  </Text>
                </Grid>

                {/* 댓글, 수정 삭제 버튼 */}
                <Icon onClick={() => onEditCommentMode(idx)}>
                  <FiEdit3 size="17" />
                </Icon>
                <Icon
                  onClick={() => {
                    window.confirm("댓글을 삭제하시겠습니까") &&
                      dispatch(
                        qnaCommentActions.deleteQnaCommentAPI(qcommentId, qnaId)
                      );
                  }}
                >
                  <RiDeleteBinLine size="18" />
                </Icon>
              </Comment>
            );
          })}

        {/* 댓글 입력창 부분 */}
        {editCommentMode ? (
          <Comment>
            <Text weight="600">{me}</Text>
            <InputStyle
              value={comment}
              placeholder="댓글은 관리자만 입력 가능합니다."
              type="type"
              width="60%"
              onChange={changeComment}
            />
            <BorderBtn
              width="100px"
              onClick={() => onEditCommentSubmit(comment)}
            >
              수정하기
            </BorderBtn>
            <BorderBtn width="65px" onClick={() => setEditCommentMode(false)}>
              취소
            </BorderBtn>
          </Comment>
        ) : (
          <Comment>
            <Text weight="600">{me}</Text>
            <InputStyle
              value={comment}
              placeholder="댓글은 관리자만 입력 가능합니다."
              type="type"
              width="60%"
              onChange={changeComment}
            />
            <BorderBtn
              width="100px"
              onClick={() => onAddCommentSubmit(comment)}
            >
              댓글 달기
            </BorderBtn>
          </Comment>
        )}
      </CommentContainer>
    </React.Fragment>
  );
};

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
  color: ${(props) => props.theme.main_grey};
  /* background-color: green; */
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
  width: ${(props) => props.width};
  height: 48px;
  border: 1px solid grey;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 8px 4px;
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

export default QnaDetailComment;
