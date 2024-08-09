# 🚀 Promise 객체, fetch API 연습
프로미스 공부중 fetch API까지 진도가 나가면서 알게된 학습내용  
fetch API 사용법 숙지

<br><br>

## 프로젝트 소개

- JSON placeholder API 를 활용한 블로그 형태 목록 구현

<br>


## 사용된 기술 & 라이브러리

- Javascript
- html
- css
  <br>


```javascript
let posts = [];
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
//데이터 가져오기
fetch(API_URL)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('데이터를 가져올수없습니다.');
        }
    })
    .then((data) => {
        //성공 후 실행 코드 및 함수
        //posts = data;
        posts = [...data];
        renderPost();
    })
    .catch((err) => {
        console.log(err);
    });
```

<br>
