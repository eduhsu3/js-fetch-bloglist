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

function renderPost() {
    const elePostList = document.querySelector('.post_list');
    elePostList.innerHTML = '';

    for (let item of posts) {
        const { title, body } = item;
        elePostList.innerHTML += `
        <!-- item[s] -->
        <div class="item">
            <a href="#">
                <div class="item_top">
                    <p class="title">${title}</p>
                    <p class="body">${body}</p>
                </div>
            </a>
            <div class="item_bottom">
                <div class="date"><span>2024.10.10</span></div>
                <div class="like"><a href="#">좋아요</a></div>
            </div>
        </div>
        <!-- item[e] -->
        
        `;
    }
}

const eleSchKeyword = document.querySelector('#schKeyword');

function onSearchHandler(e) {
    const keyWord = e.target.value;
    //console.log(keyWord);

    /* posts.filter((item) => {
        
    });  */
}
eleSchKeyword.addEventListener('keyup', onSearchHandler);
