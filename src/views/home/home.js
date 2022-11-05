// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '../api.js';
import { URL, URLSearchParams } from 'url';
// const { URL, URLSearchParams } = require('url');
// import * as url from 'url';
console.log(url);
// import {
//   sortByProductNo,
//   sortByLowerPrice,
//   sortByHigherPrice,
// } from '../useful-functions.js';

// import { getCategories } from '../../controller/category-controller.js';

try {
  // 응답으로 가져올 더미 데이터 예시
  const itemlist = {
    items: [
      {
        productNo: '00000023',
        name: '소세지',
        brand: 'kakao',
        price: '20000',
        description: '고급 소세지',
        category: 0,
      },
      {
        productNo: '00000052',
        name: '고등어',
        brand: 'kakao',
        price: '10000',
        description: '노르웨이 순살 고등어',
        category: 1,
      },
      {
        productNo: '00000035',
        name: '열라면',
        brand: 'kakao',
        price: '4000',
        description: '얼큰한 열라면',
        category: 2,
      },
      {
        productNo: '00000019',
        name: '참치',
        brand: 'kakao',
        price: '30000',
        description: '최고급 횟감 참치',
        category: 1,
      },
    ],
    message: 'success',
  };
} catch (err) {
  console.error(err.stack);
  alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
}
// 전체 카테고리 조회 시 url
// let url = `http://localhost:5050/items?${query}`;

// 특정 카테고리 조회 시 rul
// let url = `http://localhost:5050/items/category/:cat_id?${query}`;

// 스크롤 페이지네이션 시 page 확인 변수
let page = 1;

// fetch 쿼리 보내기

fetch(``);

// fetch(url)
//   .then(data => data.text())
//   .then(text => {
//     console.log('request succeeded with JSON response', text);
//   })
//   .catch(function (error) {
//     console.log('request failed', error);
//   });

// 상풍 박스 li 템플릿 수정 가능
const template = `
  <li class="product-item" style="width:25%;">
    <div class="item-container">
      <div class="item-photobox">
        <a href="${productDetailUrl}"><img src="${productImgUrl}" alt="${productName} loading="lazy"></a>
      </div>
      <div class="item-info-container">
        <div class="item-namebox">
          <strong><span>${productName}</span></strong>
        </div>
        <div class="item-pricebox">
          <strong><span>${productPrice}</span></strong>
        </div>
      </div>
    </div>
  </li>
`;

// 인터섹션 옵저버 감시 시, 상품 데이터 API 요청
const dummy = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
  ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차'],
  ['a10', 'b11', 'c12', 'd13', 'e14', 'f15', 'g16', 'h17', 'i18', 'j19'],
  ['a@', 'b@', 'c@', 'd@', 'e@', 'f@', 'g@', 'h@', 'i@', 'j@'],
  ['az', 'bz', 'cz', 'dz', 'ez', 'fz', 'gz', 'hz', 'iz', 'jz'],
  ['ax', 'bx', 'cx', 'dx', 'ex', 'fx', 'gx', 'hx', 'ix', 'jx'],
];

let list = [];
window.addEventListener('DOMContentLoaded', function () {
  // 초기 렌더링 시 데이터가 페칭된다고 가정
  callApi();
});

const callApi = async () => {
  // 페이지 정보를 쿼리로 보내서 다음 데이터를 fetch로 가져옴
  let url = new URL('http://localhost:5050/items');
  let params = {
    perpage: '20',
    page: `${page}`,
  };

  url.search = new URLSearchParams(params).toString();
  const res = await fetch(url);
  const fetchedProducts = await res.json();
  console.log('fetchedProducts: ', fetchedProducts);

  const result = dummy[page - 1];

  const docFragment = document.createDocumentFragment();
  const targetUl = document.getElementById('product-ul');
  if (targetUl) {
    result?.forEach((value, index) => {
      const li = document.createElement('li');
      li.textContent = value;
      docFragment.appendChild(li);
    });

    const lastLi = document.createElement('li');
    lastLi.classList.add('skeleton-item');
    lastLi.id = 'intersaction';
    docFragment.appendChild(lastLi);

    targetUl.appendChild(docFragment);

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
        page += 1;
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
