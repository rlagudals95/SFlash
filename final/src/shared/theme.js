const size = {
  mobile: "767px",
  tablet: "1024px",
  desktop: "1025px",
};

const theme = {
  responsiveContainer: `
    @media (min-width: 1280px) {
      width: 1024px;
    }
    @media (max-width: 1280px) {
      width: 960px;
    }
    @media (max-width: 768px) {
      width: calc(100% - 2rem);
    }
    @media (max-width: 480px) {
      width: calc(100% - 1px);
    }
    margin: auto;
    padding-bottom: 300px;
    
    `,

  main_color: "rgb(255, 183, 25)",
  main_white: "#ffffff",
  main_grey: "#343a40",
  gray: "#adb5bd",
  post_bg: "#f1f3f5",
  black: "#343a40",
  category_gray: "#f2f3f7",
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  flex_column:
    "display: flex; flex-direction:column; align-items: center; justify-content: space-between; ",
  flex_row:
    "display: flex; align-items: center; justify-content: space-between;",
  default_width:
    "width:100vw; max-width:768px; box-sizing:border-box; padding:0 1rem",
  max_width: `max-width:768px`,
  border_box: `box-sizing:border-box`,
};

export default theme;
