import React from "react";
import styled from "styled-components";
import { Grid } from "../../elements/index";

import SFlash_logo_darkgrey from "../../static/SFlash_logo_darkgrey.svg";
import profile_hyunjun from "./profile/profile_hyunjun.jpg";
import profile_seungwook from "./profile/profile_seungwook.jpg";
import profile_sejeong from "./profile/profile_sejeong.jpg";
import profile_minkyu from "./profile/profile_minkyu.jpg";
import profile_hyeongmin from "./profile/profile_hyeongmin.jpg";
import profile_dayoung from "./profile/profile_dayoung.jpg";
import profile_ahhyun from "./profile/profile_ahhyun.jpg";
import profile_eunjeong from "./profile/profile_eunjeong.jpg";

import AboutDetail from "./AboutDetail";

const About = (props) => {
  const about_us = props.about_us;
  // console.log(props.about_us);

  return (
    <React.Fragment>
      <Wrapper>
        <UpperContainer>
          <SflashLogo src={SFlash_logo_darkgrey} />
          <Grid height="20px"></Grid>
          <Text>We are team SFlash! Click to see details.</Text>
        </UpperContainer>
        <Grid height="20px"></Grid>

        <BottomContainer>
          {about_us.map((a, idx) => {
            return <AboutDetail key={a.id} {...a} />;
          })}
        </BottomContainer>
      </Wrapper>
    </React.Fragment>
  );
};

About.defaultProps = {
  about_us: [
    {
      id: 0,
      name: "Hyeonjun Jang",
      position: "Back-end Developer",
      img: profile_hyunjun,
      content:
        "SFlash 프로젝트에서 조장을 맡은 장현준입니다.\n프로젝트를 통해 개발은 힘들지만 재미있다는 걸 다시금 깨달았고, 기획, 설계, 구현, 트러블슈팅을 반복하며 코드리뷰가 얼마나 중요한지 알게 되었습니다.\nSFlash에서는 좋아요, 게시물(CRUD), 댓글(CRUD)와 S3, JPA최적화에 힘썼고 인프라에서 travis, Nginx, ec2, https, elb를 사용해서 무중단 배포를 구현했습니다!",
      skill: null,
      github: "https://github.com/JangHyeonJun2",
      portfolio: null,
      resume: null,
      etc_1: null,
      etc_2: null,
    },
    {
      id: 1,
      name: "Seungwook Kim",
      position: "Back-end Developer",
      img: profile_seungwook,
      content:
        "개발과 성장에 관심이 많은 백엔드 취준생입니다. SFlash에서 회원부분을 구현하였고, jwt, oauth2, smtp, security, refreshToken, role 등을 활용하면서 단순히 기능을 구현하는 것에 끝나지 않고 왜 이 기술을 적용하여야 하는지 생각해보고 어떻게 동작하는지에 대해서도 파고 들어서 더욱 성장 할 수 있었습니다.",
      skill: null,
      github: "https://github.com/rlatmd0829",
      portfolio: null,
      resume: null,
      etc_1: null,
      etc_2: null,
    },
    {
      id: 2,
      name: "Sejeong Lee",
      position: "Back-end Developer",
      img: profile_sejeong,
      content:
        "데이터에 관심이 많은 주니어 백엔드 개발자입니다. 기능 구현을 넘어 보다 좋은 코드를 작성하기 위해 고민하고 공부합니다. sflash에서 마이페이지와 qna를 구현하였습니다.",
      skill: null,
      github: "https://github.com/meozes",
      portfolio: null,
      resume: null,
      etc_1: null,
      etc_2: null,
    },
    {
      id: 3,
      name: "Minkyu Heo",
      position: "Front-end Developer",
      img: profile_minkyu,
      content:
        "SFlash 프로젝트에서 지도 API를 맡아 지도에 마커를 올리고 게시물을 띄우는 기능을 구현했습니다. 개발이 어렵더라도 사용자들이 유용하고 편하게 쓸 수 있게 구현할 수 있게 고민을 많이 했고, 하나씩 원하게 구현이 될 때마다 크게 기뻐했습니다.",
      skill: null,
      github: "https://github.com/heo-mk",
      portfolio: null,
      resume:
        "https://www.notion.so/Heo-MinKyu-8c8ea47ff1d94a9b8dab3b06bfbd1a01",
      etc_1: "https://heo-dev-0229.tistory.com/",
      etc_2: null,
    },
    {
      id: 4,
      name: "Hyeongmin Kim",
      position: "Front-end Developer",
      img: profile_hyeongmin,
      content: "커뮤니티 페이지와 게시물 CRUD부분 메인으로 담당했습니다~!",
      skill: null,
      github: "https://github.com/rlagudals95",
      portfolio: null,
      resume:
        " https://www.notion.so/Kim-hyeong-min-79c0da5ccf924a0292a90c965ad5edf3",
      etc_1: "https://hmk1022.tistory.com/",
      etc_2: "https://velog.io/@dbfudgudals",
    },
    {
      id: 5,
      name: "Dayoung Kim",
      position: "Front-end Developer",
      img: profile_dayoung,
      content:
        "디자인 경험을 바탕으로 사람들에게 긍정적인 경험을 줄 수 있는 좋은 서비스를 위해 고민하는 개발자 입니다. SFlash 프로젝트에서 로그인/회원가입, 스토리페이지, 문의하기 등 USER 기능을 메인으로 담당했습니다.",
      skill: null,
      github: "https://github.com/dayoung0601",
      portfolio: null,
      resume: null,
      etc_1: null,
      etc_2: null,
    },
    {
      id: 6,
      name: "Ahhyun Lim",
      position: "UX/UI Designer",
      img: profile_ahhyun,
      content:
        "SFlash 디자이너로 참여해 UI/UX 부분 디자인을 진행한 임아현입니다. 평소 배우던 서비스디자인에 관한 내용을 바탕으로 사용자 입장에서 어떻게하면 유용하게 서비스를 이용할 수 있을까 고민했고 SFlash UI/UX를 구성에 반영보았습니다.",
      skill: null,
      github: null,
      portfolio: "https://www.behance.net/gallery/113037249/_",
      resume: null,
      etc_1: null,
      etc_2: null,
    },
    {
      id: 7,
      name: "Eunjeong Song",
      position: "UX/UI Designer",
      img: profile_eunjeong,
      content:
        "개발자분들과 SFlash 개발에 참여하며 또 한수 배우게 된 디자이너 송은정입니다.",
      skill: null,
      github: null,
      portfolio: null,
      resume: null,
      etc_1: null,
      etc_2: null,
    },
  ],
};

const Wrapper = styled.div`
  ${(props) => props.theme.responsiveContainer};
`;
const SflashLogo = styled.img`
  width: 120px;
  margin: auto;
  text-align: center;
`;

const Text = styled.div`
  font-size: 1.2rem;
  height: 35px;
  font-weight: 500;
  color: grey;
`;

const UpperContainer = styled.div`
  text-align: center;
  @media (min-width: 1280px) {
    padding-top: 80px;
  }
  @media (max-width: 1280px) {
    padding-top: 150px;
  }
  @media (max-width: 960px) {
    padding-top: 150px;
  }
  @media (max-width: 400px) {
    padding-top: 100px;
  }
`;

const BottomContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  margin: auto;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 10px;
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 10px;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 10px;
  }
`;

export default About;
