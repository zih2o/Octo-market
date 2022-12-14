// html 랜더링 함수 모음
import {
  // 회원가입 등 네비바 랜더링
  drawNavbar,
  // 카테고리 바 랜더링
  drawCategoryBar,
  // 토큰 보유에 따라 네비바 변화
  activeNavbar,
  // 카테고리 목록을 api 에서 받아와 값 채워 넣기
  fillCategoryBar,
  // 푸터 랜더링
  drawFooter,
  //숫자 자리수마다 , 찍기
  addCommas,
  drawAdminLink,
} from '../../../useful-functions.js';

// html 랜더링 관련 함수들 실행
drawNavbar();
activeNavbar();
drawCategoryBar();
// 카테고리 목록 반환받음
const categoryList = fillCategoryBar();
drawFooter();
drawAdminLink();

// top 스크롤 버튼
let topBtn = document.getElementById('scroll-top-Btn');
topBtn.addEventListener('click', topFunction);

// 스크롤 시 아래 함수 실행
window.onscroll = function () {
  scrollFunction();
};

// 현재 스크롤이 화면 상단에서 특정 거리 만큼 멀어져야만 버튼이 보이게 함
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
}

// 화면 최상단으로 스크롤 이동
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const categoryOj = {};

// 카테고리 목록 조회 이용하여 md랜더링 부분
categoryList.then(datas => {

  // console.log('카테고리 목록 조회 datas ', datas)

  datas.map(el => {
    const path = `/items/category-page/${el._id}/`;
    categoryOj[path] = el.name;
  });


  console.log('카테고리 oj=>>>> ', categoryOj)
  // url 로 현재 상품 리스트 타이틀 텍스트 설정하기
  const categoryTitle = document.querySelector('#category-title');
  let pathname = window.location.pathname;
  const categoryTitleName = categoryOj[pathname];
  console.log(categoryTitleName)
  categoryTitle.innerText = categoryTitleName;

});

// 데이터 객체로 html화 하여 상품을 만들고 문자열로 만드는 함수
const createProductBox = data => {
  const calcPrice = addCommas(data.price);
  let name = '';
  if (data.name.length >= 10) {
    name = data.name.slice(0, 20) + '...';
  } else {
    name = data.name;
  }
  const product = `
  <li class="product-item" style="width:25%;">
    <div class="item-container">
      <div class="item-photobox">
        <a href="/items/itemlist/${data._id}">
          <img src="${data.imageUrl}" alt="${data.name}" loading="lazy">
        </a>
      </div>
      <div class="item-info-container">
        <div class="item-namebox"><strong><span>${name}</span></strong></div>
        <div class="item-pricebox"><strong><span>${calcPrice}</span></strong></div>
      </div>
    </div>
  </li>
  `;

  return product;
};

// 상품 정렬 쿼리 데이터
// 낮은 가격순 lowPrice, 높은 가격순 HighPrice, 최근 등록순 createdAt
// 내림차순 sc: -1 / 오름차순 sc: 1

// 스크롤 페이지네이션 시 페이지 확인용 통신 횟수 카운트 변수
let cnt = 1;
const targetUl = document.getElementsByClassName('product-ul')[0];
console.log('카테고리 목룍 ==>>> ', categoryList);


// 페이지 첫 돔 로딩시, callApi 호출

// 쿼리에 맞는 상품 데이터를 API로 요청 및 http 랜더링 함수
// 페이지 정보를 쿼리로 보내서 다음 데이터를 fetch로 가져옴
const callApi = async (number) => {
  let pathname = window.location.pathname;
  const arrPathName = pathname.split('/')
  const catId = arrPathName[3]
  let url = `/items/category/${catId}/`
  console.log(url)
  let params = {};
  if (number === 2) {
    params = {
      count: `${cnt}`,
      perCount: '20',
      sort: 'price',
      sc : 1,
    };
  } else if (number === 3) {
    params = {
      count: `${cnt}`,
      perCount: '20',
      sort: 'price',
      sc : -1,
    };
  } else {
    params = {
      count: `${cnt}`,
      perCount: '20',
      sort: 'createdAt',
      sc : -1,
    };
  }

  url = `${url}?${new URLSearchParams(params).toString()}`;
  console.log('url => ', url);

  // 서버 연결 시 사용할 fetch문
  const res = await fetch(url);
  console.log('1', res) // 여기서 4번?
  const fetchedProducts = await res.json();
  if (fetchedProducts.length <= 0) return;

  // const dummy = dummys[cnt - 1];
  // let dummy = sliceChunkDataArr(dummys.items, 8)[cnt - 1];
  // console.log(dummy);



  // 추가할 상품 데이터가 있다면
  if (fetchedProducts) {
    let insertBoxesTemplate = '';
    fetchedProducts.map(oj => {
      let ojbox = createProductBox(oj);
      insertBoxesTemplate += ojbox;
    });
    targetUl.insertAdjacentHTML('beforeend', insertBoxesTemplate);
    // targetUl.innerHTML = insertBoxesTemplate;

    // 감지할 div 를 만들어 li의 맨 뒤에 추가해준다
    const lastLi = document.createElement('div');
    lastLi.id = 'intersaction';
    targetUl.appendChild(lastLi);

    // 타겟인 요소를 감지실행
    intersaction(number);
  }
};

document.addEventListener('DOMContentLoaded', ()=>{
  callApi(1);
});

// 감지 함수
const intersaction = (number) => {
  // 화면 아래 100px 부터 감지, 감지 대상이 빈 div 이므로 threshold 미적용
  let options = {
    root: null,
    rootMargin: '100px',
    // threshold: 0,
  };

  const callback = (entries, observer) => {
    console.log('intersaction observe 콜백 실행');
    entries?.forEach(entry => {
      // 감지 대상이 화면에 교차되어 감지되었다면 아래를 실행
      if (entry.isIntersecting) {
        console.log('대상 감지됨', entry);
        console.log('=======cnt 확인========<<<cnt = ', cnt);
        cnt += 1;
        // 해당 감지대상은 감시 해제(첫 감지 후 해제하기 위함)
        observer.unobserve(entry.target);
        // 감시 대상을 감지 목록에서 제외
        entry.target.remove();
        // 감지 시 api 실행
        callApi(number);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector('#intersaction')); // 감시 대상 설정
};

const productListInit = () => {
  const productUlEl = document.querySelector('.product-ul');
  if (productUlEl) productUlEl.innerHTML = '';
};

//상품 정렬 버튼
const createdAtBtn = document.querySelector('.createdAt');
createdAtBtn.addEventListener('click', () => {
  productListInit();
  cnt = 1;
  callApi(1);
});
const lowPriceBtn = document.querySelector('.lowPrice');
lowPriceBtn.addEventListener('click', () => {
  productListInit();
  cnt = 1;
  callApi(2);
});
const highPriceBtn = document.querySelector('.highPrice');
highPriceBtn.addEventListener('click', () => {
  productListInit();
  cnt = 1;
  callApi(3);
});
