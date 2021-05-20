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
import profile_ahyeon from "./profile/profile_ahyeon.jpg";
import profile_eunjeong from "./profile/profile_eunjeong.jpg";

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
        "이번 프로젝트에서 전체적인 게시물에 관한 CRUD와 인프라를 맡았습니다 :)",
      skill: "",
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
      skill: "",
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
        "데이터에 관심이 많은 주니어 백엔드 개발자입니다. 기능 구현을 넘어 보다 좋은 코드를 작성하기 위해 고민하고 공부합니다. sflash에서 마이페이지와 qna를 구현하였습니다.",
      skill: "",
      github: "https://github.com/meozes",
      etc_1: "",
      etc_2: "",
    },
    {
      id: 3,
      name: "Minkyu Heo",
      position: "Front-end Developer",
      img: profile_minkyu,
      content: "SFlash 프로젝트에서 지도 API를 맡아 지도에 마커를 올리고 게시물을 띄우는 기능을 구현했습니다. 개발이 어렵더라도 사용자들이 유용하고 편하게 쓸 수 있게 구현할 수 있게 고민을 많이 했고, 하나씩 원하게 구현이 될 때마다 크게 기뻐했습니다.",
      skill: "",
      github: "https://github.com/heo-mk",
      etc_1: "https://heo-dev-0229.tistory.com/",
      etc_2: "https://www.notion.so/Heo-MinKyu-8c8ea47ff1d94a9b8dab3b06bfbd1a01",
    },
    {
      id: 4,
      name: "Hyeongmin Kim",
      position: "Front-end Developer",
      img: profile_hyeongmin,
      content: "커뮤니티 페이지와 게시물 CRUD부분 메인으로 담당했습니다~!",
      skill: "",
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
      content: "사람들에게 긍정적인 경험을 줄 수 있는 좋은 서비스를 위해 고민하는 개발자 입니다. SFlash 프로젝트에서 로그인/회원가입, 스토리페이지, 문의하기 등 USER 기능을 메인으로 담당했습니다.",
      skill: "",
      github:"https://github.com/dayoung0601?tab=repositories",
      etc_1: "https://www.notion.so/Kim-Dayoung-7c27b43d10a84bbab64ecb5e5c9efe2f",
      etc_2: "",
    },
    {
      id: 6,
      name: "Ahyeon Im",
      position: "UX/UI Designer",
      img: profile_ahyeon,
      content:
        "SFlash 디자이너로 참여해 UI/UX 부분 디자인을 진행한 임아현입니다. 평소 배우던 서비스디자인에 관한 내용을 바탕으로 사용자 입장에서 어떻게하면 유용하게 서비스를 이용할 수 있을까 고민했고 SFlash UI/UX를 구성에 반영보았습니다.",
      skill: "",
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
      skill: "",
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

export default About;
