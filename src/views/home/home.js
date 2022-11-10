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
  // 관리자 로그인 그리기
  drawAdminLink,
} from '../useful-functions.js';

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

const mdCategoryUl = document.getElementsByClassName('md-category-ul')[0];

// 카테고리 목록 조회 이용하여 md랜더링 부분
categoryList.then(datas => {
  let mdCategoryStr = '';

  // li 생성 및 사용할 데이터 객체로 저장
  datas.map(el => {
    const template = `
        <li class="md-category-li">
        <a class="md-category-button" href="#" data-id="${el._id}">
        ${el.name}
        </a>
        </li>
        `;
    mdCategoryStr += template;
    const path = `/items/category/${el._id}`;
    categoryOj[path] = el.name;
  });
  mdCategoryUl.insertAdjacentHTML('beforeend', mdCategoryStr);
  // console.log('timing check')

  // url 로 현재 상품 리스트 타이틀 텍스트 설정하기
  const categoryTitle = document.querySelector('#category-title');


  categoryTitle.innerText = '전체보기';



  // md 카테고리 a 태그 연결 대신 해당 카테고리 데이터로 li들을 채움
  const mdcategoryButtons = document.getElementsByClassName('md-category-button');
  // foreach, map 은 안되고 for 만 가능
  for (let i = 0; i < mdcategoryButtons.length; i++) {
    // console.log('md카테 하나', mdcategoryButtons[i]);
    mdcategoryButtons[i].addEventListener('click', (e) => {
      e.preventDefault();
      console.log(e.target)
      console.log('데이터 셋으로 가져온 데이터 =>', e.target.dataset.id);
      fillRecommend(e.target.dataset.id);
       console.log(
         '카테고리 타겟팅',
         e.target.dataset.id,
       );
    })
  }


  // 카테고리 클릭 이벤트 발생 시 박스에 데이터를 채워주는 함수
  // 카테고리 명을 categoryId 로 받는다
  const fillRecommend = async (categoryId) => {
    let url = categoryId;
    let params = {
      re: 'isRecommend', // 추천상품인지 확인을 위한 쿼리
      isRecommend: true, // boolean 입력
      count: 1, // 통신 횟수 count
      perCount: 4,
    };

    url = `${url}?${new URLSearchParams(params).toString()}`;
    console.log('세민님이 말한 fetch의  url ', url);

    // fetch 잠시 주석처리
    const res = await fetch(url);
    const fetchedMdProducts = await res.json();
    console.log(fetchedMdProducts)

    // 빈 박스 요소 만들어 넣기
    let sumTemplate = "";
    const itemUrl = '/items/';

    const createMdCategoryBox = num => {
      const productId = fetchedMdProducts[num]._id;
      const productImg = fetchedMdProducts[num].imageUrl;
      const productName = fetchedMdProducts[num].name;
      const productPrice = fetchedMdProducts[num].price;
      const calcPrice = addCommas(productPrice);

      const product = `
      <li class="product-item md-box" style="width:25%;">
                <div class="item-container">
                  <div class="item-photobox">
                    <a id="md${num + 1}-a" href="${itemUrl}${
        productId
      }">
                      <img id="md${num + 1}-img" src="${
        productImg
      }" alt="" loading="lazy">
                    </a>
                  </div>
                  <div class="item-info-container">
                    <div class="item-namebox">
                      <strong><span id="md${num + 1}-name">${productName}</span></strong>
                    </div>
                    <div class="item-pricebox">
                      <strong><span id="md${num + 1}-price">${calcPrice}</span></strong>
                    </div>
                  </div>
                </div>
              </li>
                    `;
      return product;
    };
    // 4개의 추천 상품
    for (let i = 0; i < 4; i++) {
      sumTemplate += createMdCategoryBox(i);
    }

    const mdProductUl = document.getElementsByClassName('md-product-ul')[0];
    mdProductUl.innerHTML = sumTemplate;

  };

  // 추후 md카테고리 클릭 이벤트 시, 값 변경 예정
  let mdCategoryId = Object.keys(categoryOj)[0];
  console.log('md카테고리 아이디', mdCategoryId);

  fillRecommend(mdCategoryId);
  console.log(mdCategoryId)
}).catch(function(err) {
  console.log('then 내부 에러는! ',err);
})



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
                <a href="/items/${
                  data._id
                }">
                    <img src="${'../images/dummy.png'}" alt="${
    data.name
  }" loading="lazy">
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
let sortType = 'createdAt';

// 스크롤 페이지네이션 시 페이지 확인용 통신 횟수 카운트 변수
let cnt = 1;

// 페이지 첫 돔 로딩시, callApi 호출
window.addEventListener('DOMContentLoaded', function () {
  callApi();
});

// 쿼리에 맞는 상품 데이터를 API로 요청 및 http 랜더링 함수
// 페이지 정보를 쿼리로 보내서 다음 데이터를 fetch로 가져옴
const callApi = async () => {
  let url = '/items';

  let params = {
    cnt: `${cnt}`,
    per: '20',
    sort: `${sortType}`,
    // sc: `${sc}`,
  };

  url = `${url}?${new URLSearchParams(params).toString()}`;
  // 서버 연결 시 사용할 fetch문
  const res = await fetch(url);
  const fetchedProducts = await res.json();

  // const dummy = dummys[cnt - 1];
  // let dummy = sliceChunkDataArr(dummys.items, 8)[cnt - 1];
  // console.log(dummy);

  const targetUl = document.getElementsByClassName('product-ul')[0];

  // 추가할 상품 데이터가 있다면
  if (fetchedProducts) {
    let insertBoxesTemplate = '';
    fetchedProducts.map(oj => {
      let ojbox = createProductBox(oj);
      insertBoxesTemplate += ojbox;
    });
    targetUl.insertAdjacentHTML('beforeend', insertBoxesTemplate);

    // 감지할 div 를 만들어 li의 맨 뒤에 추가해준다
    const lastLi = document.createElement('div');
    lastLi.id = 'intersaction';
    targetUl.appendChild(lastLi);

    // 타겟인 요소를 감지실행
    intersaction();
  }
};

// 감지 함수
const intersaction = () => {
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
        callApi();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(document.querySelector('#intersaction')); // 감시 대상 설정
};

//할인 상품 섹션 함수 여기서부터 시작입니다~!
//카운트다운
const countDown = () => {
  const timeTonight = new Date();

  const countDownDate = new Date(
    `${timeTonight.getFullYear()}-${
      timeTonight.getMonth() + 1
    }-${timeTonight.getDate()} 24:00:00`,
  ).getTime();

  function timePart(val, text) {
    if (val < 10) {
      if (text === 'hour') {
        document.querySelector('.hour').innerHTML = `0${val}`;
      } else if (text === 'min') {
        document.querySelector('.min').innerHTML = `0${val}`;
      } else {
        document.querySelector('.sec').innerHTML = `0${val}`;
      }
    } else {
      if (text === 'hour') {
        document.querySelector('.hour').innerHTML = val;
      } else if (text === 'min') {
        document.querySelector('.min').innerHTML = val;
      } else {
        document.querySelector('.sec').innerHTML = val;
      }
    }

    return;
  }

  const now = new Date().getTime();

  const distance = countDownDate - now;

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timePart(hours, 'hour');
  timePart(minutes, 'min');
  timePart(seconds, 'sec');

  var x = setInterval(function () {
    const now = new Date().getTime();

    const distance = countDownDate - now;

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (hours === -1) {
      location.reload();
    }

    timePart(hours, 'hour');
    timePart(minutes, 'min');
    timePart(seconds, 'sec');

    if (distance < 0) {
      clearInterval(x);

      timePart(hours, 'hour');
      timePart(minutes, 'min');
      timePart(seconds, 'sec');
    }
  }, 1000);
};

//상품 정보
async function getDiscountItem() {
  try {
    const params = {
      dis: 'isDiscount',
      isDis: true,
      count: 1,
      perCount: 4,
    };

    const urlParams = new URLSearchParams(params).toString();

    const res = await fetch(
      `/items?${urlParams}`,
    );
    const items = await res.json();

    if (!localStorage.getItem('discount')) {
      itemRender(items, 0);
      localStorage.setItem('discount', 1);
    } else if (localStorage.getItem('discount') >= 3) {
      itemRender(items, 3);
      localStorage.setItem('discount', 0);
    } else {
      itemRender(items, Number(localStorage.getItem('discount')));
      localStorage.setItem(
        'discount',
        Number(localStorage.getItem('discount')) + 1,
      );
    }
  } catch (err) {
    console.log(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//html 뿌려주는 함수
function itemRender(items, number) {
  const discountName = document.querySelector('.discountName');
  const discountProductDescription = document.querySelector(
    '.discountProductDescription',
  );
  const disPercent = document.querySelector('.disPercent');
  const firstPrice = document.querySelector('.firstPrice');
  const finalPrice = document.querySelector('.finalPrice');
  const discountLink = document.querySelector('.discountLink');
  const discountImg = document.querySelector('.discountImg');

  const item = items[number];
  let description = '';
  if (item.description.length >= 20) {
    description = item.description.slice(0, 20) + '...';
  } else {
    description = item.description;
  }

  discountName.innerHTML = item.name;
  discountProductDescription.innerHTML = `${description}`;
  disPercent.innerHTML = `${item.disPercent}%`;
  firstPrice.innerHTML = `${addCommas(item.price)}원`;
  finalPrice.innerHTML = `${addCommas(
    Math.floor(Number(item.price) * (1 - Number(item.disPercent) / 100)),
  )}원`;
  discountImg.setAttribute('src', item.imageUrl);
  discountLink.setAttribute('href', `/items/${item._id}`);
}

countDown();
getDiscountItem();

//여기까지가 특가 상품 함수입니닷

