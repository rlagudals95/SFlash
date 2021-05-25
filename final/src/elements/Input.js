import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    width,
    margin,
  } = props;
  const styles = {
    width: width,
    margin: margin,
  };

  // const styles = {
  //   is_flex: is_flex,
  //   width: width,
  //   margin: margin,
  //   padding: padding,
  //   bg: bg,
  //   center: center,
  // };

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
          {...styles}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          {...styles}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  _onChange: () => {},
  value: "",
  width: "100%",
};

const ElTextarea = styled.textarea`
  border: none;
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  @media (max-width: 600px) {
    height: 17vh;
  }
  :focus {
    outline: none;
  }
`;

const ElInput = styled.input`
  width: ${(props) => props.width};
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  box-shadow: 2px 2px 5px 1px rgba(0, 0.1, 0.1, 0.1);
  :focus {
    outline: none;
  }
`;

export default Input;
