import React from "react";
import styled from "styled-components";

import { actionCreators } from "../redux/modules/user";
// import * as FaIcons from "react-icons/fa"
import * as FaIcons from "react-icons/fi";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";

//머티리얼 ui에서 가져온 카드속성
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const post_list = [
  {
    imgUrl:
      "https://image.news1.kr/system/photos/2019/5/17/3648407/article.jpg/dims/optimize",
    title: "바람좋구먼~",
  },
  {
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyKD1-YGiJrzk3PakRGE8AbqtzgkEG3iWpoA&usqp=CAU",
    title: "황홀~",
  },
  {
    imgUrl:
      "https://image.edaily.co.kr/images/Photo/files/NP/S/2016/06/PS16060300126.jpg",
    title: "사서 고생하는 구먼~",
  },
  {
    imgUrl:
      "https://content.presspage.com/uploads/685/1920_solaceinsolo1.jpg?10000",
    title: "둥둥..",
  },
  {
    imgUrl:
      "https://content.presspage.com/uploads/685/1920_solaceinsolo1.jpg?10000",
    title: "둥둥..",
  },
  {
    imgUrl:
      "https://content.presspage.com/uploads/685/1920_solaceinsolo1.jpg?10000",
    title: "둥둥..",
  },
];

export default function Post() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {post_list.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.imgUrl} //카드 이미지
                  title={card.title} //카드 타이틀
                />
                <Like>
                  <FaIcons.FiHeart size="23" />
                  <LikeCnt>0</LikeCnt>
                </Like>

                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

const Like = styled.div`
  font-size: 20px;
  font-weight: 300px;
  width: 50px;
  display: flex;
  margin-left: 225px;
  padding: 8px 0px 0px 0px;
`;

const LikeCnt = styled.div`
  margin-left: 3px;
`;
