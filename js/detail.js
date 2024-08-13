import { loadingSpinner } from './common.js';

//=======================================================================================

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    const postId = getQueryParam('postId');
    console.log(postId);

    const API_PATH = 'https://jsonplaceholder.typicode.com';

    function loadPost() {
        loadingSpinner(true);
        //let API_FULL_URL = `${API_PATH}/posts?id=${postId}`;  //이것은 배열 안에 객체 넣어서 반환
        let API_FULL_URL = `${API_PATH}/posts/${postId}`; //이것은 해당 객체를 바로 반환

        fetch(API_FULL_URL)
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject('데이터를 로딩중 장애발생');
                }
            })
            .then((data) => {
                console.log(data);
                renderDetail(data);
                loadingSpinner(false);
            })
            .catch((err) => {
                loadingSpinner(false);
                console.error('ERROR : ', err);
            });
    }
    //초기로드
    loadPost();

    function renderDetail(prmData) {
        console.log(prmData);
        const eleTitle = document.querySelector('#detailTitle');
        const eleDetailBodyTxt = document.querySelector('#detailBodyTxt');

        eleTitle.textContent = prmData.title;
        eleDetailBodyTxt.textContent = prmData.body;
    }

    document.querySelector('#listGoBtn').addEventListener('click', () => {
        //history.back();
        location.href = 'index.html';
    });
});
