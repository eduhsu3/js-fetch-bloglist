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
        renderPost(posts);
    })
    .catch((err) => {
        console.log(err);
    });

function renderPost(arrData) {
    const elePostList = document.querySelector('.post_list');
    elePostList.innerHTML = '';

    for (let item of arrData) {
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
    const userInputKeyWord = e.target.value.trim().toLowerCase();
    //console.log(userInputKeyWord);

    function changeHighlight(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    const filteredData = posts
        .filter((item) => {
            const changeTitleLower = item.title.toLowerCase();
            //console.log(changeTitleLower);
            return changeTitleLower.includes(userInputKeyWord);
        })
        .map((item) => {
            return {
                ...item,
                title: changeHighlight(item.title, userInputKeyWord),
            };
        });

    renderPost(filteredData);
}
eleSchKeyword.addEventListener('keyup', onSearchHandler);
