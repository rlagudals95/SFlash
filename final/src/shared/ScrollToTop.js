import { Component } from "react";
import { withRouter } from "react-router";

//페이지 이동시 스크롤 맨위로 초기화 시켜주는 친구
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
