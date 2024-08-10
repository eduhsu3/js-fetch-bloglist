//=======================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const API_PATH = 'https://jsonplaceholder.typicode.com'; //1페지이 20개 요청
    //const API_PATH = 'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20'; //1페지이 20개 요청
    //const API_PATH = 'https://jsonplaceholder.typicode.com/posts?title_like=sun'; //검색어 요청

    let currentPage = 1;
    let limit = 10;
    let isSearchedList = false;
    let searchKeyword = '';

    function loadPost() {
        //console.log(limit);
        let API_FULL_URL = '';
        if (isSearchedList) {
            API_FULL_URL = `${API_PATH}/posts?_limit=${limit}&title_like=${searchKeyword}`;
        } else {
            API_FULL_URL = `${API_PATH}/posts?_limit=${limit}`;
        }

        fetch(API_FULL_URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject('데이터를 로딩중 장애발생');
                }
            })
            .then((data) => {
                //console.log(data);
                renderList(data);
                /* if (isSearchedList) {
                    document.querySelector('#moreBtn').style.display = 'none';
                } else {
                    document.querySelector('#moreBtn').style.display = 'inline-block';
                } */
            })
            .catch((err) => {
                console.error('ERROR : ', err);
            });
    }
    //초기로드
    loadPost();

    function renderList(prmData) {
        const elePostContainer = document.querySelector('.post_container');

        elePostContainer.innerHTML = '';

        prmData.forEach((item, idx) => {
            const { title, body } = item;

            const eleItem = document.createElement('div');
            eleItem.classList.add('item');

            eleItem.innerHTML += `
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
           `;
            elePostContainer.appendChild(eleItem);
        });
    }

    //=================moreBtn======================================================================
    const eleMoreBtn = document.querySelector('#moreBtn');
    eleMoreBtn.addEventListener('click', () => {
        limit += 10;
        loadPost();
    });

    //=================search======================================================================
    const eleSchBtn = document.querySelector('#schBtn');
    const eleSchInput = document.querySelector('#schKeyword');

    function onSearchHandler(e) {
        if (eleSchInput.value.trim() === '') {
            isSearchedList = false;
            loadPost();
            return;
        }
        isSearchedList = true;
        searchKeyword = eleSchInput.value.trim().toLowerCase();
        loadPost();

        function changeHighlight(text, query) {
            if (!query) return text;
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }
        /* 
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
        }); */

        //renderPost(filteredData);
    }
    eleSchBtn.addEventListener('click', onSearchHandler);
});
