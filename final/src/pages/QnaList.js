import React from "react";
import styled from "styled-components";

import { history } from "../redux/configStore";
import { Grid } from "../elements/index";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { actionCreators as qnaActions } from "../redux/modules/qna";

import { BsFillLockFill } from "react-icons/bs";
import { RiEditFill } from "react-icons/ri";
// import Pagination from '@material-ui/lab/Pagination';

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";



const QnaList = (props) => {
  const dispatch = useDispatch();
  const qna_list = useSelector((state) => state.qna.list);
  console.log("qna_list:", qna_list);
  const me = localStorage.getItem("nickname");
  const role = localStorage.getItem("role");

  const [page, setPage] = React.useState(1); //현재페이지, 1부터 시작
  const [size, setSize] = React.useState(10); //페이지당 post갯수 = 10개씩(고정값) (사실 setSize 안써도 됨)

  //pageNumber = [1,2,3,4,5,...]
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(200 / size); i++) {
    pageNumber.push(i);
  }

  //paginate : page 바꾸기 setPage로 바꾼다
  const paginate = (PageNumber) => setPage(PageNumber);

  React.useEffect(() => {
    dispatch(qnaActions.getQnaAPI(page, size));
  }, [page]);

  //페이지네이션 화살표 함수

  // 오른쪽 화살표 함수
  const forward = () => {
    if (page < 20) {
      setPage(page + 1);
    } else {
      window.alert("마지막 페이지에요!");
    }
  };
  // 왼쪽 화살표 함수
  const backward = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      window.alert("첫번째 페이지에요!");
    }
  };

  if (qna_list.length === 0) {
    return (
      <React.Fragment>
        <Container>
          <Title>문의하기</Title>
          <SolidBtn onClick={() => history.push("/qnawrite")}>
            <RiEditFill size="12" /> 글쓰기
          </SolidBtn>
          <Content>
            {/* <Text width="4%">
          <b>NO.</b>
        </Text> */}
            <Text width="70%">
              <b>제목</b>
            </Text>
            <Text width="11%">
              <b>작성자</b>
            </Text>
            <Text width="11%">
              <b>일자</b>
            </Text>
          </Content>
          <Warning>
          <SflashLogo />
        </Warning>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container>
          <Title>문의하기</Title>
          <SolidBtn onClick={() => history.push("/qnawrite")}>
            <Icon>
              <RiEditFill size="18" />
            </Icon>{" "}
            글쓰기
          </SolidBtn>
          <Content>
            {/* <Text width="4%">
          <b>NO.</b>
        </Text> */}
            <Text width="70%">
              <b>제목</b>
            </Text>
            <Text width="13%">
              <b>작성자</b>
            </Text>
            <Text width="10%">
              <b>일자</b>
            </Text>
          </Content>
          {qna_list.map((q, idx) => {
            return (
              <ContentUnit key={q.id} {...q}>
                {/* <Text width="4%">{props.help.id}</Text> */}
                <TextBtn
                  width="70%"
                  onClick={() => {
                    if (q.writer !== me && role !== "ADMIN") {
                      alert("해당 게시물에 대한 권힌이 없습니다.");
                      return;
                    } else {
                      history.push(`/qnadetail/${q.id}`);
                    }
                  }}
                >
                  {q.title}
                  {(q.writer !== me && role !== "ADMIN") &&
                    <Icon onClick={() => history.push("/qnawrite/:id")}>
                      <BsFillLockFill size="17" color="grey" />
                    </Icon>
                  }
                </TextBtn>
                <Text width="13%">{q.writer}</Text>
                <Text width="10%">{q.modified}</Text>
              </ContentUnit>
            );
          })}
          {/* <Pagination count={10} color="primary" /> */}
          <Container>
        <ul className="pagination">
          <ArrowLeftIcon
            style={{ cursor: "pointer", verticalAlign: "-30px" }}
            onClick={backward}
          />
          {pageNumber.map((pageNum) => (
            <li key={pageNum} className="pagination_item">
              <PageSpan onClick={() => paginate(pageNum)}>{pageNum}</PageSpan>
            </li>
          ))}
          <ArrowRightIcon style={{ cursor: "pointer" }} onClick={forward} />
        </ul>
      </Container>
        </Container>
      </React.Fragment>
    );
  }
};

QnaList.defaultProps = {
  qna: [
    {
      // id: 11,
      title: "문의 제목입니다",
      writer: "nickname",
      modifiedDate: "2021-05-08",
    },
    {
      // id: 11,
      title: "문의 제목입니다",
      writer: "nickname",
      modifiedDate: "2021-05-08",
    },
    {
      // id: 11,
      title: "문의 제목입니다",
      writer: "nickname",
      modifiedDate: "2021-05-08",
    },
  ],
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
  margin-bottom: 0px;
`;

const Content = styled.div`
  border-bottom: 1.5px solid grey;
  display: flex;
  align-items: center;
  width: 100%;
  /* background-color: green; */
`;

const ContentUnit = styled.div`
  border-bottom: 0.2px solid lightgrey;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  /* background-color: green; */
`;

const Text = styled.div`
  display: flex;
  font-size: 1rem;
  width: ${(props) => props.width};
  border: white;
  padding: 10px 12px;
  /* background-color: yellow; */
`;

const TextBtn = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  width: ${(props) => props.width};
  border: white;
  padding: 10px 12px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  /* background-color: yellow; */
`;

const Icon = styled.div`
  border-radius: 50px;
  padding: 5px 10px 5px 20px;
  /* background-color: green; */
`;

const SolidBtn = styled.button`
  align-items: center;
  display: flex;
  float: right;
  border: none;
  padding: 7px 20px 7px 0px;
  margin: 10px 0px;
  ${(props) => (props.width ? `width:${props.width};` : "")}
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.main_color};
  /* color: #ffffff; */
  outline: none;
  &:hover {
    color: grey;
    background-color: lightgrey;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;
const Warning = styled.div`
  text-align: center;
  margin: 30px auto;
  padding: 150px;
  border: 2.5pt solid #eee;
`;
const SflashLogo = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/calender-ed216.appspot.com/o/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%89%AC%20%EB%A1%9C%EA%B3%A0.png?alt=media&token=92594323-944a-40d7-8085-b323c23246fe");
  width: 100px;
  height: 100px;
  margin: auto;
  background-size: cover;
`;

const PageSpan = styled.div`
  padding: 1rem;
  width: 1rem;
  border-radius: 10rem;
  text-align: center;
  transition: font-weight 100ms ease-in, background-color 100ms ease-in,
    color 100ms ease-in;
  :hover {
    font-weight: 900;
    background-color: #d2d2d21a;
    color: #212121;
  }
`;


export default QnaList;
