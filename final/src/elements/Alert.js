// 1. npm 설치 : npm install sweetalert2

// 2. import 해주세요
import Swal from 'sweetalert2'

// 3. 아래 template 모양대로 작성해서 alert 창 부분에 넣어주세요. 
Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: '확인',
    confirmButtonColor:  "#ffb719",
    cancelButtonText: '취소',
    showCancelButton: true,
  })

  // 예시(필요없는 건 뺄껀 빼도 됩니다!!)
  Swal.fire({
    text: '이미 등록된 닉네임 입니다!',
    confirmButtonColor: "#ffb719",
  })

// confirm 형
  Swal.fire({
    text: '게시물을 삭제 하시겠습니까?',
    confirmButtonText: '예',
    confirmButtonColor: '#ffb719',
    showCancelButton: true,
    cancelButtonText: '아니오',
    cancelButtonColor: '#eee',
  }).then((result) => {
    if (result.isConfirmed) {
        // dispatch(userActions.logOut());
      // Swal.fire(
      //   "로그아웃 되었습니다."
      // )
    }
  })
 
//이미지 삽입형
  Swal.fire({
    title: 'Sweet!',
    text: 'Modal with a custom image.',
    imageUrl: 'https://unsplash.it/400/200',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
  
// 움직이는 팝업창
  Swal.fire({
    title: 'Custom animation with Animate.css',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

//  icon: 'success', 'error', 'warning', 'info', 'question' 디자인 아래 경로에서 참고
// https://sweetalert2.github.io/#icons


if (res.data.message === "tokenExpired"){
  dispatch(userActions.logOut());
  Swal.fire({
    text: '로그인 기간이 만료되어 재로그인이 필요합니다 :)',
    confirmButtonText: '로그인 하러가기',
    confirmButtonColor: '#ffb719',
    showCancelButton: true,
    cancelButtonText: '취소',
    cancelButtonColor: '#eee',
  }).then((result) => {
    if (result.isConfirmed) {
      history.push("/login");
    }
  })
}