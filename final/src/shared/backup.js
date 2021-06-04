//백업 해둔 코드들을 보관해놓는 곳이다

const addPost = (e) => {
  if (!is_file) {
    window.alert("😗사진은 최소 1장 이상 업로드 해주세요!");
    return;
  }
  if (!contents) {
    window.alert("😗빈칸을 채워주세요...ㅎㅎ");
    return;
  }
  if (!title) {
    window.alert("😗빈칸을 채워주세요...ㅎㅎ");
    return;
  }
  if (!is_category) {
    window.alert("😗카테고리를 선택해주세요...ㅎㅎ");
    return;
  }

  //카테고리 선택 조건

  let post = {
    title: title,
    content: contents,
    latitude: props.latitude,
    longitude: props.longitude,
    spotName: props.spotName,
    spotNameForCustomOverlay: props.spotNameForCustomOverlay,
  };
  // console.log(post);
  if (is_file) {
    dispatch(postActions.addPostAPI(post));
  } else {
    window.alert("😗사진은 최소 1장 이상 업로드 해주세요!");
    return;
  }

  props.close();

  resetPreview();
  // history.replace("/");
};

///////////////

const editPost = () => {
  if (!contents) {
    window.alert("😗빈칸을 채워주세요...ㅎㅎ");
    return;
  }
  if (!title) {
    window.alert("😗빈칸을 채워주세요...ㅎㅎ");
    return;
  }
  if (onlyImg.length == 0) {
    window.alert("😗사진을 최소 1장 이상 업로드 해주세요!");
    return;
  }
  if (onlyImg.length > 5) {
    window.alert("😗사진은 최대 5장까지 업로드 가능합니다...ㅎㅎ");
    return;
  }
  let edit = {
    title: title,
    contents: contents,
  };
  dispatch(postActions.editPostAPI(props.id, edit));
  props.close();
  dispatch(imageActions.resetEdit([])); //업로드 후 리덕스에 남은 수정 정보 모두 리셋
  //에딧파일 초기화...
};

 const changeContents = (e) => {
   setContents(e.target.value);
 };

 const changeTitle = (e) => {
   setTitle(e.target.value);
 };