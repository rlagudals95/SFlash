import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/index";
import Modal from "react-modal";
import SFlash_logo_darkgrey from "../static/SFlash_logo_darkgrey.svg";

import profile_hyunjun from "../static/profile/profile_hyunjun.jpg";
import profile_seungwook from "../static/profile/profile_seungwook.jpg";
import profile_sejeong from "../static/profile/profile_sejeong.jpg";
import profile_minkyu from "../static/profile/profile_minkyu.jpg";
import profile_hyeongmin from "../static/profile/profile_hyeongmin.jpg";
import profile_dayoung from "../static/profile/profile_dayoung.jpg";
import profile_ahyeon from "../static/profile/profile_ahyeon.jpg";
import profile_eunjeong from "../static/profile/profile_eunjeong.jpg";

import AboutDetail from "./AboutDetail";

const About = (props) => {
  const about_us = props.about_us;
  console.log(props.about_us);

  return (
    <React.Fragment>
      <Wrapper>
        <Grid height="80px"></Grid>
        <UpperContainer>
          <SflashLogo src={SFlash_logo_darkgrey} />
          <Grid height="20px"></Grid>
          <Text>We are team SFlash!</Text>
        </UpperContainer>
        <Grid height="40px"></Grid>

        <BottomContainer>
          {about_us.map((a, idx) => {
            return <AboutDetail key={a.id} {...a}/>
          })}
        </BottomContainer>

           {/* <Modal isOpen={modal} close={closeModal} style={modalStyle} >
                  <CloseButton
                    src="https://image.flaticon.com/icons/png/512/458/458595.png"
                    onClick={closeModal}
                  />

                  <Grid flex>
                    <ProfileImg2 src={a.img} />
                    <Grid>
                      <ModalProfileContainer>
                        <Name style={{ fontSize: "1.8rem" }}>{a.name}</Name>
                        <Position style={{ fontSize: "1.1rem" }}>
                          {a.position}
                        </Position>
                        <Content>{a.content}</Content>
                        <Content>{a.github}</Content>
                        <Content>{a.etc_1}</Content>
                        <Content>{a.etc_2}</Content>
                      </ModalProfileContainer>
                    </Grid>
                  </Grid>
                </Modal> */}

      </Wrapper>
    </React.Fragment>
  );
};

About.defaultProps = {
  about_us: [
    {
      id: 0,
      name: "Hyunjun Jang",
      position: "Back-end Developer",
      img: profile_hyunjun,
      content:
        "이번 프로젝트에서 전체적인 게시물에 관한 CRUD와 인프라를 맡았습니다 :)",
      github: "https://github.com/JangHyeonJun2",
      etc_1: "",
      etc_2: "",
    },
    {
      id: 1,
      name: "Seungwook Kim",
      position: "Back-end Developer",
      img: profile_seungwook,
      content:
        "개발과 성장에 관심이 많은 백엔드 취준생입니다. SFlash에서 회원부분을 구현하였고, jwt, oauth2, smtp, security, refreshToken, role 등을 활용하면서 단순히 기능을 구현하는 것에 끝나지 않고 왜 이 기술을 적용하여야 하는지 생각해보고 어떻게 동작하는지에 대해서도 파고 들어서 더욱 성장 할 수 있었습니다.",
      github: "https://github.com/rlatmd0829",
      etc_1: "",
      etc_2: "",
    },
    {
      id: 2,
      name: "Sejeong Lee",
      position: "Back-end Developer",
      img: profile_sejeong,
      content:
        "데이터에 관심이 많은 주니어 백엔드 개발자입니다. \n 기능 구현을 넘어 보다 좋은 코드를 작성하기 위해 고민하고 공부합니다. \n sflash에서 마이페이지와 qna를 구현하였습니다.",
      github: "https://github.com/meozes",
      etc_1: "",
      etc_2: "",
    },
    {
      id: 3,
      name: "Minkyu Heo",
      position: "Front-end Developer",
      img: profile_minkyu,
      content: "",
      github: "https://github.com/heo-mk",
      etc_1: "https://heo-dev-0229.tistory.com/",
      etc_2: "",
    },
    {
      id: 4,
      name: "Hyeongmin Kim",
      position: "Front-end Developer",
      img: profile_hyeongmin,
      content: "",
      github: "https://github.com/rlagudals95",
      etc_1:
        " https://www.notion.so/Kim-hyeong-min-79c0da5ccf924a0292a90c965ad5edf3",
      etc_2: "https://hmk1022.tistory.com/",
    },
    {
      id: 5,
      name: "Dayoung Kim",
      position: "Front-end Developer",
      img: profile_dayoung,
      content: "",
      github: "https://github.com/dayoung0601?tab=repositories",
      etc_1: "",
      etc_2: "",
    },
    {
      id: 6,
      name: "Ahyeon Im",
      position: "UX/UI Designer",
      img: profile_ahyeon,
      content:
        "SFlash 디자이너로 참여해 UI/UX 부분 디자인을 진행한 임아현입니다. 평소 배우던 서비스디자인에 관한 내용을 바탕으로 사용자 입장에서 어떻게하면 유용하게 서비스를 이용할 수 있을까 고민했고 SFlash UI/UX를 구성에 반영보았습니다.",
      github: "",
      etc_1: "https://www.behance.net/gallery/113037249/_",
      etc_2: "",
    },
    {
      id: 7,
      name: "Eunjeong Song",
      position: "UX/UI Designer",
      img: profile_eunjeong,
      content:
        "개발자분들과 SFlash 개발에 참여하며 또 한수 배우게 된 디자이너 송은정입니다.",
      github: "",
      etc_1: "",
      etc_2: "",
    },
  ],
};

const Wrapper = styled.div`
  ${(props) => props.theme.responsiveContainer};
`;
const SflashLogo = styled.img`
  width: 110px;
  margin: auto;
  text-align: center;
`;

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: grey;
`;

const UpperContainer = styled.div`
  text-align: center;
`;

const BottomContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  margin: auto;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
`;

const ProfileContainer = styled.div`
  margin: 10px;
  text-align: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 50px;
`;

const ProfileImg = styled.img`
  width: 180px;
  height: 180px;
  margin: 10px;
  border-radius: 170px;
  background-size: cover;
  object-fit: cover;
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const ProfileImg2 = styled.img`
  width: 360px;
  height: 100%;

  background-size: cover;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${(props) => props.theme.main_grey};
`;
const Position = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_grey};
`;
const Content = styled.div`
  margin-top: 30px;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.main_grey};
  line-height: 2rem;
`;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    alignItems: "center",
    textAlign: "cetner",
    backgroundColor: "rgba(48, 48, 48, 0.2)",
    transition: "opacity 2000ms ease-in-out",
    zIndex: "1000",
  },
  content: {
    width: "800px",
    height: "600px",
    margin: "auto",
    padding: "0px",
    border: "none",
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
  },
};

const ModalProfileContainer = styled.div`
  margin: 120px 40px;
`;

const CloseButton = styled.img`
  width: 15px;
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 10px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    color: grey;
    background-color: #eee;
  }
`;

export default About;
