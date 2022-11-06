// nav 버튼
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');
const joinBtn = document.getElementById('join');

// 카테고리 버튼
// const entireBtn = document.getElementById('entire');
// const processedBtn = document.getElementById('processed');
// const marineBtn = document.getElementById('marine');
// const noodleBtn = document.getElementById('noodle');
// const seasoningBtn = document.getElementById('seasoning');
// const riceBtn = document.getElementById('rice');
// const canBtn = document.getElementById('can');

// 로그인 시 세션 스토리지 확인용
// sessionStorage.setItem('loginToken', '1');

// 세션 스토리지 토큰에 따라
if (sessionStorage.getItem('loginToken')) {
  loginBtn.classList.add('active');
  joinBtn.classList.add('active');
  logoutBtn.classList.remove('active');
} else {
  // 토큰이 없다면
  console.log('토큰 없음');
  loginBtn.classList.remove('active');
  joinBtn.classList.remove('active');
  logoutBtn.classList.add('active');
}

// 로그아웃 시 세션스토리지 토큰 제거
if (!logoutBtn.classList.contains('active')) {
  sessionStorage.removeItem('loginToken');
}

// fetch 사용 전 더미 데이터
const dummys = {
  items: [
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
    {
      _id: '63648af2f6cbdc57bcdd5345',
      name: '고등어6',
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
      name: '청어6',
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
      name: '고등어7',
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
      name: '청어7',
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
      name: '고등어8',
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
      name: '청어8',
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
      name: '고등어9',
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
      name: '청어9',
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
      name: '고등어10',
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
      name: '청어10',
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
      name: '고등어11',
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
      name: '청어11',
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
      name: '고등어12',
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
      name: '청어12',
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
      name: '고등어13',
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
      name: '청어13',
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
      name: '고등어14',
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
      name: '청어14',
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
      name: '고등어15',
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
      name: '청어15',
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
      name: '고등어16',
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
      name: '청어16',
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
      name: '고등어17',
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
      name: '청어17',
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
};

// 상품 객체 배열을 size개씩 배열로 나눠 담은 배열로 리턴해주는 함수
function sliceChunkDataArr(arr, size) {
  let slicedDataArr = [];
  for (let i = 0; i < arr.length; i += size) {
    slicedDataArr.push(arr.slice(i, i + size));
  }
  return slicedDataArr;
}
console.log(sliceChunkDataArr(dummys.items, 3));

// 데이터 객체로 html화 하여 상품을 만들고 문자열로 만드는 함수
const createProductBox = data => {
  const product = `
  <li class="product-item" style="width:25%;">
  <div class="item-container">
  <div class="item-photobox">
                <a href="http://localhost:5050/items/${data._id}">
                    <img src="${'../images/dummy.png'}" alt="${
    data.name
  }" loading="lazy">
                    </a>
                    </div>
                    <div class="item-info-container">
                    <div class="item-namebox"><strong><span>${
                      data.name
                    }</span></strong></div>
                    <div class="item-pricebox"><strong><span>${
                      data.price
                    }</span></strong></div>
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
let sc = 0;

// 스크롤 페이지네이션 시 페이지 확인용 통신 횟수 카운트 변수
let cnt = 1;

// 페이지 첫 돔 로딩시, callApi 호출
window.addEventListener('DOMContentLoaded', function () {
  callApi();
});

// 쿼리에 맞는 상품 데이터를 API로 요청 및 http 랜더링 함수
// 페이지 정보를 쿼리로 보내서 다음 데이터를 fetch로 가져옴
const callApi = async () => {
  let url = 'http://localhost:5050/items';

  let params = {
    cnt: `${cnt}`,
    per: '20',
    sort: `${sortType}`,
    sc: `${sc}`,
  };

  url = `${url}?${new URLSearchParams(params).toString()}`;
  console.log('url => ', url);

  // 서버 연결 시 사용할 fetch문
  // const res = await fetch(url);
  // const fetchedProducts = await res.json();
  // console.log('fetchedProducts: ', fetchedProducts);

  // const dummy = dummys[cnt - 1];
  let dummy = sliceChunkDataArr(dummys.items, 8)[cnt - 1];
  // console.log(dummy);

  const targetUl = document.getElementsByClassName('product-ul')[0];
  let ulInnerHTML = targetUl.innerHTML;
  console.log('ulinnerHTML ==> ', ulInnerHTML);

  // 추가할 상품 데이터가 있다면
  if (dummy) {
    console.log('dummy =>>', dummy);
    console.log('이너 html ==> ', targetUl.innerHTML);
    // console.log(targetUl.innerHTML);
    dummy.map(oj => {
      let ojbox = createProductBox(oj);
      ulInnerHTML += ojbox;
    });
    targetUl.innerHTML = ulInnerHTML;

    // 감지할 div 를 만들어 li의 맨 뒤에 추가해준다
    const lastLi = document.createElement('div');
    lastLi.id = 'intersaction';
    console.log('lastLi =>> ', lastLi);
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
