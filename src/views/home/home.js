// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '../api.js';
import { URL, URLSearchParams } from 'url';

// const { URL, URLSearchParams } = require('url');
// import * as url from 'url';
// console.log(url);

const itemlist = {
  items: [
    [
      {
        _id: '63648af2f6cbdc57bcdd5345',
        name: '고등어1',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:45:54.191Z',
        updatedAt: '2022-11-04T03:45:54.191Z',
        __v: 0,
        id: '63648af2f6cbdc57bcdd5345',
      },
      {
        _id: '6364887e39e4d0963d6ed1de',
        name: '청어1',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:35:26.431Z',
        updatedAt: '2022-11-04T03:41:31.051Z',
        __v: 0,
        id: '6364887e39e4d0963d6ed1de',
      },
      {
        _id: '63648af2f6cbdc57bcdd5345',
        name: '고등어2',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:45:54.191Z',
        updatedAt: '2022-11-04T03:45:54.191Z',
        __v: 0,
        id: '63648af2f6cbdc57bcdd5345',
      },
      {
        _id: '6364887e39e4d0963d6ed1de',
        name: '청어2',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:35:26.431Z',
        updatedAt: '2022-11-04T03:41:31.051Z',
        __v: 0,
        id: '6364887e39e4d0963d6ed1de',
      },
      {
        _id: '63648af2f6cbdc57bcdd5345',
        name: '고등어3',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:45:54.191Z',
        updatedAt: '2022-11-04T03:45:54.191Z',
        __v: 0,
        id: '63648af2f6cbdc57bcdd5345',
      },
      {
        _id: '6364887e39e4d0963d6ed1de',
        name: '청어3',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:35:26.431Z',
        updatedAt: '2022-11-04T03:41:31.051Z',
        __v: 0,
        id: '6364887e39e4d0963d6ed1de',
      },
      {
        _id: '63648af2f6cbdc57bcdd5345',
        name: '고등어4',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:45:54.191Z',
        updatedAt: '2022-11-04T03:45:54.191Z',
        __v: 0,
        id: '63648af2f6cbdc57bcdd5345',
      },
      {
        _id: '6364887e39e4d0963d6ed1de',
        name: '청어4',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:35:26.431Z',
        updatedAt: '2022-11-04T03:41:31.051Z',
        __v: 0,
        id: '6364887e39e4d0963d6ed1de',
      },
      {
        _id: '63648af2f6cbdc57bcdd5345',
        name: '고등어5',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:45:54.191Z',
        updatedAt: '2022-11-04T03:45:54.191Z',
        __v: 0,
        id: '63648af2f6cbdc57bcdd5345',
      },
      {
        _id: '6364887e39e4d0963d6ed1de',
        name: '청어5',
        brand: '청년수산',
        price: '10000',
        description: '맛있엉',
        category: '63622c58942ce8e513937058',
        imageUrl: 'http://ddd',
        createdAt: '2022-11-04T03:35:26.431Z',
        updatedAt: '2022-11-04T03:41:31.051Z',
        __v: 0,
        id: '6364887e39e4d0963d6ed1de',
      },
    ],
  ],
};

// 전체 카테고리 조회 시 url
// let url = `http://localhost:5050/items?${query}`;

// 특정 카테고리 조회 시 rul
// let url = `http://localhost:5050/items/category/:cat_id?${query}`;

// 스크롤 페이지네이션 시 페이지 확인용 통신 횟수 카운트 변수
let cnt = 1;

// 상풍 박스 추가 함수
const createProductBox = data => {
  const product = `
        <li class="product-item" style="width:25%;">
            <div class="item-container">
                <div class="item-photobox">
                    <a href="http://localhost:5050/items/${data._id}">
                        <img src="${data.imageUrl}" alt="${data.name}" loading="lazy">
                    </a>
                </div>
                <div class="item-info-container">
                        <div class="item-namebox"><strong><span>${data.name}</span></strong></div>
                        <div class="item-pricebox"><strong><span>${data.price}</span></strong></div>
                    </div>
                </div>
            </li>
            `;
  return product;
};

// let list = [];
// 초기 렌더링 시 데이터가 페칭된다고 가정
window.addEventListener('DOMContentLoaded', function () {
  callApi();
});

// 인터섹션 옵저버 감시 시, 상품 데이터 API 요청
// 페이지 정보를 쿼리로 보내서 다음 데이터를 fetch로 가져옴
// 낮은 가격순 lowPrice, 높은 가격순 HighPrice, 최근 등록순 createdAt
// 내림차순 sc: -1 / 오름차순 sc: 1
const callApi = async () => {
  let url = new URL('http://localhost:5050/items');
  let params = {
    cnt: `${cnt}`,
    per: '20',
    sort: 'createdAt',
  };

  url.search = new URLSearchParams(params).toString();
  const res = await fetch(url);
  const fetchedProducts = await res.json();
  console.log('fetchedProducts: ', fetchedProducts);

  const result = dummy[cnt - 1];

  const boxes = dummy.map(el => createProductBox(el));
  const docFragment = document.createDocumentFragment();
  const targetUl = document.getElementById('product-ul');
  if (targetUl) {
    let templateStr = '';
    Object.keys(boxes).forEach(box => {
      templateStr += boxes[box];
    });

    const lastLi = document.createElement('li');
    lastLi.id = 'intersaction';
    docFragment.appendChild(lastLi);
    targetUl.appendChild(docFragment);

    // 다른 방식으로 구현 실패 부분.
    const endpoint = document.querySelector('#intersaction');
    endpoint.insertAdjacentHTML('beforeend', templateStr);

    // 옵저브
    intersaction();
  }
};

const intersaction = () => {
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // 50%
  };

  const callback = (entries, observer) => {
    entries?.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry);
        cnt += 1;
        observer.unobserve(entry.target); // 감시 해제
        entry.target.remove();
        callApi();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector('#intersaction')); // 감시 설정
};

// async function addProductData() {
//   const datas = await Api.get('http://localhost:5000/items');
//   console.log('datas', datas);
// }
// addProductData();

// console.log(Api);
// console.log(getCategories());
// async function getDataFromApi() {
//   // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
//   const data = await Api.get('/api/user/data');
//   const random = randomId();

//   console.log({ data });
//   console.log({ random });
// }
