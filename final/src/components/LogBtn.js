import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import styled from "styled-components";
import { history } from "../redux/configStore";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(0.5),
//   },
// }));

export default function LogBtn() {
  //   const classes = useStyles();

  return (
    <LogBox
      onClick={() => {
        history.push("/login");
      }}
    >
      로그인
      {/* <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab> */}
      {/* <Fab variant="extended">
        <NavigationIcon className={classes.extendedIcon} />
        Navigate
      </Fab> */}
      {/* <Fab disabled aria-label="like">
        <FavoriteIcon />
      </Fab> */}
    </LogBox>
  );
}

const LogBox = styled.button`
  position: fixed;
  top: 25px;
  right: 25px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 20px;
  border: 1px solid lightgray;
  background-color: none;
`;
