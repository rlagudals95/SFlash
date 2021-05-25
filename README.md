
# SFlash
항해99 실전 프로젝트 SFlash 입니다!
# 🔖 항해99 실전프로젝트

## SFlash(Spot + Flash) | 나만의 사진 명소 저장하기 서비스
<h4><a href="https://www.sflash.net/" target="_blank">사이트 바로가기</a> <a href="" target="_blank"> / Youtube 시연영상</a><h4>

## 소개 유튜브 영상
*(개발 완료 이후 유튜브 링크 여기다 적기)

## 개발 기간
+ 2021년 4월 23일(금) ~ 2021년 5월 27일(목)
## 개발 목표
+ 원하는 장소를 “쉽게” 찾 을수 있도록 사용자 측면에서 고민을 거듭했습니다.
+ 카테고리별로 장소를 검색할 수 있도록 하여 사용자 편의를 높이고, 유저가 업로드한 게시물, 좋아요한 게시물을 모아볼 수 있도록 하여 나만의 지도와 사진첩를 만드는 재미를 부여했습니다.
+ 사용자들이 기존에 인지하고 있는 지도 인터페이스를 활용해 직관적이고 쉬운 인터페이스를 구현하고자 노력했습니다.  
  
### 👨‍👨‍👦‍👦 개발 구성원들
[팀 소개 페이지로 이동하기](https://www.sflash.net/about) <br/>
+ Frontend - React
  + 허민규
    + 메인페이지 제작, 카카오 지도 API로 목표기능 구현
  + 김다영 ([Github Repo](https://github.com/dayoung0601/SFlash)) 
    + 회원가입/로그인 페이지 제작
    + 회원가입/로그인용 리덕스 모듈 코드 작성
  + 김형민 ([Github Repo](https://github.com/rlagudals95/SFlash)) 
    + 커뮤니티 페이지제작
    + 게시물 CRUD 구현
 
+ Backend - Spring boot 
  + 장현준 ([Github Repo](https://github.com/JangHyeonJun2))
  + 김승욱 ([Github Repo](https://github.com/rlatmd0829))
  + 이세정 ([Github Repo](https://github.com/meozes))
+ Design - Adobe Xd, Figma 
  ([UI/UX Wireframe: Figma](https://www.figma.com/file/XjkfeG33ysb5LNcNGhGqgB/%ED%95%AD%ED%95%B499-7%EC%A1%B0---%EB%AA%85%EB%88%84%EC%B0%BE(%EA%B0%80%EC%A0%9C)?node-id=0%3A1)) ([UI/UX Wireframe: AdobeXD](https://xd.adobe.com/view/a37de14d-31ca-4925-a56a-85f1ba0ae57d-f62e/grid/))
  + 임아현
    + 와이어프레임 그리기, 로고 제작, 색상 선택, 마커 제작
  + 송은정
    + 와이어프레임 그리기, 로고 제작, 색상 선택,

## 구동사진
### 지도 API : 카카오 지도 API 사용

### 1. 회원가입
![회원가입 페이지](https://user-images.githubusercontent.com/76252074/118971855-db508c00-b9aa-11eb-8847-57dc7bbaa381.jpg)
  
### 2. 소셜로그인
  
- 구글, 네이버, 카카오 계정을 활용한 소셜 로그인 방식 적용
![로그인 페이지](https://user-images.githubusercontent.com/76252074/118971660-a8a69380-b9aa-11eb-9cf4-58ea58e834cf.jpg)
  
### 3. 접속시 처음 뜨는 팝업창
  
![1](https://user-images.githubusercontent.com/76252074/118969984-b1966580-b9a8-11eb-8dde-9efb47a9b162.jpg)
  
### 4. 메인화면 
![image](https://user-images.githubusercontent.com/76252074/119500403-ba20de80-bda2-11eb-8896-e01d03c73877.png)
 
### 5. 게시물 클릭시 보여지는 상세보기  
![image](https://user-images.githubusercontent.com/76252074/119500656-fce2b680-bda2-11eb-8779-e2f960cc6e71.png)

### 6. 이미지가 먼저 보여지는 커뮤니티 페이지 
![image](https://user-images.githubusercontent.com/76252074/119500748-1a178500-bda3-11eb-9263-8ad4e6c5294d.png)

### 7. 내가 올린 & 좋아요한 게시물을 이미지와 지도로 확인할 수 있는 마이페이지
![image](https://user-images.githubusercontent.com/76252074/119500932-50ed9b00-bda3-11eb-9425-5644a6b4775e.png)
![마이페이지 지도](https://user-images.githubusercontent.com/76252074/118970520-4a2ce580-b9a9-11eb-8b78-aa9488f36c25.jpg)


## 🐱‍🏍Difficulties and overcoming  

# CRUD 부분
  https://velog.io/@dbfudgudals/%ED%95%AD%ED%95%B499-%ED%8C%8C%EC%9D%B4%EB%84%90-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-SFLASH-%EC%96%B4%EB%A0%A4%EC%9B%A0%EB%8D%98-%EC%A0%90%EA%B3%BC-%EA%B7%B9%EB%B3%B5%ED%95%9C-%EC%A0%90%EB%8B%A4%EC%88%98%EC%9D%98-%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC-%EC%84%A0%ED%83%9D
  

## 🧠사용 패키지

- react-redux, redux (redux-actions, immer, logger), redux-thunk, react-router-redux
- react-router-dom
- axios
- styled-components
- material-ui, react-icons
- moment
- lodash
- slick-carousel
- sweetalert2
- jwt-decode



