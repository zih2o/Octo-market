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
} from '../useful-functions.js';

// html 랜더링 관련 함수들 실행
drawNavbar();
activeNavbar();
drawCategoryBar();
// 카테고리 목록 반환받음
const categoryList = fillCategoryBar();
drawFooter();

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
    console.log('li템플릿 el => ',el)
    const template = `
        <li class="md-category-li">
        <a class="md-category-button"" href="#" data-categoryid="${el._id}">
        ${el.name}
        </a>
        </li>
        `;
    mdCategoryStr += template;
    categoryOj[el._id] = el.name;
  });
  mdCategoryUl.insertAdjacentHTML('beforeend', mdCategoryStr);
  // console.log('timing check')

  // url 로 현재 상품 리스트 타이틀 텍스트 설정하기
  const categoryTitle = document.querySelector('#category-title');
  let pathname = window.location.pathname;

  const categoryTitleName = categoryOj[`http://localhost:5050/${pathname}`];
  if (categoryTitleName) {
    categoryTitle.innerText = categoryTitleName;
  } else {
    categoryTitle.innerText = '전체보기';
  }
  console.log(categoryTitle.innerText);


  // md 카테고리 a 태그 연결 대신 해당 카테고리 데이터로 li들을 채움
  const mdcategoryButtons = document.getElementsByClassName('md-category-button');
  // foreach, map 은 안되고 for 만 가능
  for (let i = 0; i < mdcategoryButtons.length; i++) {
    // console.log('md카테 하나', mdcategoryButtons[i]);
    mdcategoryButtons[i].addEventListener('click', (e) => {
      e.preventDefault();
      console.log(e.target)
      console.log('데이터 셋으로 가져온 데이터 =>', e.target.dataset.categoryid);
      fillRecommend(e.target.dataset.categoryid);
    })
  }


  // 카테고리 클릭 이벤트 발생 시 박스에 데이터를 채워주는 함수
  // 카테고리 명을 categoryId 로 받는다
  const fillRecommend = async (categoryId) => {
    console.log('refill 카테고리 아이디 요청 ===>>> ', categoryId)
    let url = 'http://localhost:5050/items/category/';
    url += categoryId;

    // console.log('md카테고리 콜 url =>', url);

    let params = {
      re: 'isRecommend', // 추천상품인지 확인을 위한 쿼리
      isRecommend: true, // boolean 입력
      count: 1, // 통신 횟수 count
      perCount: 4,
    };

    url = `${url}?${new URLSearchParams(params).toString()}`;
    // console.log('fet할 완성 url =>', url);

    // 확인용 더미
    // const fetchedMdProducts = [
    //   {
    //     name: 'Apple AirPods Pro 1 ()',
    //     brand: 'Apple',
    //     price: 293000,
    //     description: '음질 지리는 에어팟입니다.',
    //     category: 'first',
    //     imageUrl: 'https://pbs.twimg.com/media/EqEGWJ-VoAIAFj_.jpg',
    //     isRecommend: true,
    //     isDiscount: true,
    //     disPercent: 30,
    //     _id: '6369c1d05a1dbc3a930fec1e',
    //     createdAt: '2022-11-08T02:41:20.810Z',
    //     updatedAt: '2022-11-08T02:41:20.810Z',
    //     __v: 0,
    //     id: '6369c1d05a1dbc3a930fec1e',
    //   },
    //   {
    //     name: 'Apple AirPods Pro 2 ()',
    //     brand: 'Apple',
    //     price: 293000,
    //     description: '음질 지리는 에어팟입니다.',
    //     category: 'second',
    //     imageUrl:
    //       'https://nateonweb.nate.com/imgbbs/1/20200411/_20200411130421_C675D78_AA40_4BD2_BA83_35A27E383F67.jpeg.8C675D78_AA40_4BD2_BA83_35A27E383F67.jpg',
    //     isRecommend: true,
    //     isDiscount: true,
    //     disPercent: 30,
    //     _id: '6369c1d05a1dbc3a930fec1e',
    //     createdAt: '2022-11-08T02:41:20.810Z',
    //     updatedAt: '2022-11-08T02:41:20.810Z',
    //     __v: 0,
    //     id: '6369c1d05a1dbc3a930fec1e',
    //   },
    //   {
    //     name: 'Apple AirPods Pro 3 ()',
    //     brand: 'Apple',
    //     price: 293000,
    //     description: '음질 지리는 에어팟입니다.',
    //     category: 'third',
    //     imageUrl: 'https://pbs.twimg.com/media/EqEGWJ-VoAIAFj_.jpg',
    //     isRecommend: true,
    //     isDiscount: true,
    //     disPercent: 30,
    //     _id: '6369c1d05a1dbc3a930fec1e',
    //     createdAt: '2022-11-08T02:41:20.810Z',
    //     updatedAt: '2022-11-08T02:41:20.810Z',
    //     __v: 0,
    //     id: '6369c1d05a1dbc3a930fec1e',
    //   },
    //   {
    //     name: 'Apple AirPods Pro 4 ()',
    //     brand: 'Apple',
    //     price: 293000,
    //     description: '음질 지리는 에어팟입니다.',
    //     category: 'fourth',
    //     imageUrl:
    //       'https://nateonweb.nate.com/imgbbs/1/20200411/_20200411130421_C675D78_AA40_4BD2_BA83_35A27E383F67.jpeg.8C675D78_AA40_4BD2_BA83_35A27E383F67.jpg',
    //     isRecommend: true,
    //     isDiscount: true,
    //     disPercent: 30,
    //     _id: '6369c1d05a1dbc3a930fec1e',
    //     createdAt: '2022-11-08T02:41:20.810Z',
    //     updatedAt: '2022-11-08T02:41:20.810Z',
    //     __v: 0,
    //     id: '6369c1d05a1dbc3a930fec1e',
    //   },
    // ];


    // fetch 잠시 주석처리
    const res = await fetch(url);
    const fetchedMdProducts = res.json();
    console.log('fetchedMdProducts =>> ', fetchedMdProducts);


    // 빈 박스 요소 만들어 넣기
    let sumTemplate = "";
    const itemUrl = 'http://localhost:5050/items/';

    const createMdCategoryBox = num => {
      const productId = fetchedMdProducts[num]._id;
      const productImg = fetchedMdProducts[num].imageUrl;
      const productName = fetchedMdProducts[num].name;
      const productPrice = fetchedMdProducts[num].price;

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
                      <strong><span id="md${num + 1}-price">${productPrice}</span></strong>
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



    // fetch 로 받은 데이터를 박스에 넣기(노가다 비효율)

    // 카테고리 클릭 시 마다 dom 의 reflow(재배치)를 최소화 하기 위해서 요소 삽입, 삭제는 피했다
    // 박스의 수가 정해진 소수이니 api로 값만 타겟하고 변경하여 클라이언트의 연산을 줄였다
    // 단 하나씩 연결해주어야 하므로 노가다에 코드 라인이 많아지고 지저분해 보이는 단점이 있다

    // const md1a = document.getElementById('md1-a');
    // const md1img = document.getElementById('md1-img')
    // const md1name = document.getElementById('md1-name')
    // const md1price = document.getElementById('md1-price')
    // const md2a = document.getElementById('md2-a');
    // const md2img = document.getElementById('md2-img')
    // const md2name = document.getElementById('md2-name')
    // const md2price = document.getElementById('md2-price')
    // const md3a = document.getElementById('md3-a');
    // const md3img = document.getElementById('md3-img')
    // const md3name = document.getElementById('md3-name')
    // const md3price = document.getElementById('md3-price')
    // const md4a = document.getElementById('md4-a');
    // const md4img = document.getElementById('md4-img')
    // const md4name = document.getElementById('md4-name')
    // const md4price = document.getElementById('md4-price')


    // md1a.href = `${itemUrl}${fetchedMdProducts[0]._id}`;
    // md2a.href = `${itemUrl}${fetchedMdProducts[1]._id}`;
    // md3a.href = `${itemUrl}${fetchedMdProducts[2]._id}`;
    // md4a.href = `${itemUrl}${fetchedMdProducts[3]._id}`;

    // md1img.src = fetchedMdProducts[0].imageUrl;
    // md2img.src = fetchedMdProducts[1].imageUrl;
    // md3img.src = fetchedMdProducts[2].imageUrl;
    // md4img.src = fetchedMdProducts[3].imageUrl;

    // md1name.innerText = fetchedMdProducts[0].name;
    // md2name.innerText = fetchedMdProducts[1].name;
    // md3name.innerText = fetchedMdProducts[2].name;
    // md4name.innerText = fetchedMdProducts[3].name;

    // md1price.innerText = fetchedMdProducts[0].price;
    // md2price.innerText = fetchedMdProducts[1].price;
    // md3price.innerText = fetchedMdProducts[2].price;
    // md4price.innerText = fetchedMdProducts[3].price;
  };

  // 추후 md카테고리 클릭 이벤트 시, 값 변경 예정
  let mdCategoryId = Object.keys(categoryOj)[0];

  fillRecommend(mdCategoryId);
})
        console.log('categoryoj===.>> ',categoryOj);


        // fetch 사용 전 더미 데이터
//         const dummys = {
//           items: [
//             {
//               _id: '63648af2f6cbdc57bcdd5345',
//               name: '고등어1',
//               brand: '청년수산',
//               price: '10000',
//               description: '맛있엉',
//               category: '63622c58942ce8e513937058',
//               imageUrl: 'http://ddd',
//               createdAt: '2022-11-04T03:45:54.191Z',
//               updatedAt: '2022-11-04T03:45:54.191Z',
//               __v: 0,
//               id: '63648af2f6cbdc57bcdd5345',
//             },
//             {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어1',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어2',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어2',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어3',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어3',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어4',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어4',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어5',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어5',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어6',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어6',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어7',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어7',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어8',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어8',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어9',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어9',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어10',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어10',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어11',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어11',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어12',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어12',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어13',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어13',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어14',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어14',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어15',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어15',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어16',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어16',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//     {
//       _id: '63648af2f6cbdc57bcdd5345',
//       name: '고등어17',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:45:54.191Z',
//       updatedAt: '2022-11-04T03:45:54.191Z',
//       __v: 0,
//       id: '63648af2f6cbdc57bcdd5345',
//     },
//     {
//       _id: '6364887e39e4d0963d6ed1de',
//       name: '청어17',
//       brand: '청년수산',
//       price: '10000',
//       description: '맛있엉',
//       category: '63622c58942ce8e513937058',
//       imageUrl: 'http://ddd',
//       createdAt: '2022-11-04T03:35:26.431Z',
//       updatedAt: '2022-11-04T03:41:31.051Z',
//       __v: 0,
//       id: '6364887e39e4d0963d6ed1de',
//     },
//   ],
// };

// 상품 객체 배열을 size개씩 배열로 나눠 담은 배열로 리턴해주는 함수
// function sliceChunkDataArr(arr, size) {
//   let slicedDataArr = [];
//   for (let i = 0; i < arr.length; i += size) {
//     slicedDataArr.push(arr.slice(i, i + size));
//   }
//   return slicedDataArr;
// }
// console.log(sliceChunkDataArr(dummys.items, 3));

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

// 스크롤 페이지네이션 시 페이지 확인용 통신 횟수 카운트 변수
let cnt = 1;


console.log('카테고리 목룍 ==>>> ', categoryList)

// const callRecommends = (cnt) => {
//   let url = 'http://localhost:5050/items/category/';

//   let params = {
//     count: '1',
//     perCount: '4',
//     isRecommend: true,
//     re: 'isRecommend',
//     isDiscount: false,
//     dis: 'isDiscount',
//   }
//   // categoryList // 조회한 카테고리 목록

//   // 추천 섹션의 카테고리 목록

//   const template = `
//     <li>
//       <a href="http://localhost:5050/items">
//         <strong>전체보기</strong>
//       </a>
//     </li>
//   `;
//   const headerTag = document.getElementsByTagName('header')[0];
//   headerTag.insertAdjacentHTML('afterend', template);

// }

// 페이지 첫 돔 로딩시, callApi 호출
window.addEventListener('DOMContentLoaded', function () {
  callApi();
  // 카테고리 조회해서 카테고리바 동적 구현
});

// 쿼리에 맞는 상품 데이터를 API로 요청 및 http 랜더링 함수
// 페이지 정보를 쿼리로 보내서 다음 데이터를 fetch로 가져옴
const callApi = async () => {
  let url = 'http://localhost:5050/items';

  let params = {
    cnt: `${cnt}`,
    per: '20',
    sort: `${sortType}`,
    // sc: `${sc}`,
  };

  url = `${url}?${new URLSearchParams(params).toString()}`;
  console.log('url => ', url);

  // 서버 연결 시 사용할 fetch문
  const res = await fetch(url);
  const fetchedProducts = await res.json();
  console.log('fetchedProducts: ', fetchedProducts);

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
    if (text === 'hour') {
      document.querySelector('.hour').innerHTML = val;
    } else if (text === 'min') {
      document.querySelector('.min').innerHTML = val;
    } else {
      document.querySelector('.sec').innerHTML = val;
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
      isDiscount: true,
      count: 1,
      perCount: 4,
    };

    const urlParams = new URLSearchParams(params).toString();

    const res = await fetch(`http://localhost:5050/items?${urlParams}`);
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
    Number(item.price) * (1 - Number(item.disPercent) / 100),
  )}원`;
  discountImg.setAttribute('src', item.imageUrl);
  discountLink.setAttribute('href', `/items/${item._id}`);
}

countDown();
getDiscountItem();

//여기까지가 특가 상품 함수입니닷