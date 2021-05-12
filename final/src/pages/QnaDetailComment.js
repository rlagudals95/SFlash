import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { actionCreators as qnaActions } from "../redux/modules/qna";
import { actionCreators as qnaCommentActions } from "../redux/modules/qnacomment";

import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const QnaDetailComment = (props) => {
  const dispatch = useDispatch();

  //  url에서 userId 불러오기
  const {qnaId} = props;
  
  const comment_list = useSelector((state) => state.qnacomment.list);
  console.log(comment_list);
 
  // 댓글 남길 때 필요한 내 닉네임은 로컬스토리지에서 가져와 사용한다.
  // 댓글은 관리자만 작성 가능하다
  const me = localStorage.getItem("nickname");

  React.useEffect(() => {
    if (!qnaId) {
      return false; 
    }
    dispatch(qnaCommentActions.getQnaCommentAPI(qnaId));
  }, []);

  const [comment, setComment] = React.useState("");
  const changeComment = (e) => {
    setComment(e.target.value);
  };
  const [editComment, setEditComment] = React.useState(false);
  const editCommentMode = () => {
    setEditComment(true);
  }

  const onAddComment = (comment) => {
    console.log(comment);
    if (!comment) {
      alert("댓글을 입력하지 않으셨습니다.");
    } else {
      dispatch(qnaCommentActions.addQnaCommentAPI(comment, qnaId));
    }
  };

  return ( 
    <React.Fragment>
        <CommentContainer>
          {comment_list ? (comment_list.map((c, idx) => {
            return(

              <Comment key={c.id} {...c}>
            <Grid flex>
              <Text weight="600">{c.writer}</Text>
              <Text >{c.content}</Text>
              <Text width="130px" style={{color:"lightgrey"}}>{c.modified.split('T')[0]}</Text>
            </Grid>
            
            {/* 댓글, 수정 삭제 버튼 */}
            <Icon onClick={editCommentMode}>
              <FiEdit3 size="17" />
            </Icon>
            <Icon
              onClick={() => {
                const qcommentId = comment_list[idx].id;
                window.confirm("댓글을 삭제하시겠습니까") &&
                  dispatch(qnaCommentActions.deleteQnaCommentAPI(qcommentId, qnaId));
              }}
            >
              <RiDeleteBinLine size="18" />
            </Icon>
          </Comment>
            )
          })):(null)
        }
          
          <Comment>
            <Text weight="600">{me}</Text>
            <InputStyle
              value={comment}
              placeholder="댓글 입력"
              type="type"
              width="60%"
              onChange={changeComment}
            />
            <BorderBtn onClick={()=>onAddComment(comment)}>게시</BorderBtn>
          </Comment>
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
  width: 75px;
  height: 48px;
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

export default QnaDetailComment;
