// 문자열+숫자로 이루어진 랜덤 5글자 반환
export const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

// 이메일 형식인지 확인 (true 혹은 false 반환)
export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

// 숫자에 쉼표를 추가함. (10000 -> 10,000)
export const addCommas = n => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 13,000원, 2개 등의 문자열에서 쉼표, 글자 등 제외 후 숫자만 뺴냄
// 예시: 13,000원 -> 13000, 20,000개 -> 20000
export const convertToNumber = string => {
  return parseInt(string.replace(/(,|개|원)/g, ''));
};

// ms만큼 기다리게 함.
export const wait = ms => {
  return new Promise(r => setTimeout(r, ms));
};

//비밀번호 빈 칸 여부 검증
export const hasWhiteSpace = s => {
  return s.indexOf(' ') >= 0;
};

// nav 바에 js 요소 적용
export const activeNavbar = () => {
  const loginBtn = document.getElementById('login');
  const logoutBtn = document.getElementById('logout');
  const joinBtn = document.getElementById('join');
  const mypageBtn = document.getElementById('mypage');

  const loginAfter = document.getElementById('vb-login-after');
  const logoutAfter = document.getElementById('vb-logout-after');
  const joinAfter = document.getElementById('vb-join-after');

  // 로그인 시 세션 스토리지 확인용
  // sessionStorage.setItem('loginToken', '1');

  // 세션 스토리지 로그인 토큰 확인, nav 메뉴 구성
  // css 에 active 관련 추가해서 사용할 것
  if (sessionStorage.getItem('loginToken')) {
    loginBtn.classList.add('active');
    loginAfter.classList.add('active');
    joinBtn.classList.add('active');
    joinAfter.classList.add('active');
    logoutBtn.classList.remove('active');
    logoutAfter.classList.remove('active');
  } else {
    // 토큰이 없다면
    console.log('로그인 확인 토큰 없음');
    loginBtn.classList.remove('active');
    loginAfter.classList.remove('active');
    joinBtn.classList.remove('active');
    joinAfter.classList.remove('active');
    logoutBtn.classList.add('active');
    logoutAfter.classList.add('active');
  }

  // 관리자 토큰 보유 시, 마이페이지 버튼 눌렀을때 관리자 마이페이지 로 이동하도록 경로 수정
  if (sessionStorage.getItem('adminToken')) {
    mypageBtn.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = 'http://localhost:5050/admin/mypage';
    });
  }

  // 로그아웃 시 세션스토리지 토큰 제거
  if (!logoutBtn.classList.contains('active')) {
    sessionStorage.removeItem('loginToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('adminToken');
  }
};

// 카테고리 데이터 조회하여 동적으로 카테고리 바 구현 + 카테고리 목록 리턴
export const fillCategoryBar = async () => {
  const categoryUl = document.getElementById('category-ul');
  // console.log('카테고리바 요소 => ', categoryBar);
  const res = await fetch('http://localhost:5050/categories');
  const categorys = await res.json();
  let categorylist = '';

  categorys.map(el => {
    const template = `
      <li>
        <a href="http://localhost:5050/items/category/${el._id}">
          <strong>${el.name}</strong>
        </a>
      </li>
    `;
    categorylist += template;
  });
  categoryUl.insertAdjacentHTML('beforeend', categorylist);
  return categorys;
};

export const drawNavbar = () => {
  const template = `
    <nav class="navbar" id="nav-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand" id="nav-logobox">
        <img id="nav-logo" src="../images/octo-logo.png" alt="">
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" id="menu-box">
              <a href="http://localhost:5050/users/login" class="button is-primary" id="login">
                <strong>로그인</strong>
              </a>
              <div class="vertical-bar" id="vb-login-after"></div>
              <a href="http://localhost:5050/" class="button is-primary" id="logout">
                <strong>로그아웃</strong>
              </a>
              <div class="vertical-bar" id="vb-logout-after"></div>
              <a href="http://localhost:5050/users/signup" class="button is-primary" id="join">
                <strong>회원가입</strong>
              </a>
              <div class="vertical-bar" id="vb-join-after"></div>
              <a href="http://localhost:5050/cart" class="button is-primary" id="cart">
                <strong>장바구니</strong>
              </a>
              <div class="vertical-bar" id="vb-cart-after"></div>
              <a href="http://localhost:5050/users/mypage" class="button is-primary" id="mypage">
                <strong>마이페이지</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div id="title-container">
      <div id="title">
        <a href="http://localhost:5050/">
          <img src="../images/octopus-title.png" alt="문어상점">
        </a>
      </div>
    </div>

  `;
  const headerTag = document.getElementsByTagName('header')[0];
  headerTag.insertAdjacentHTML('afterbegin', template);
};

export const drawCategoryBar = () => {
  const template = `
    <div class="tabs is-medium is-centered position-sticky" id="category-bar">
      <ul id="category-ul">
        <li id="entire"><a href="http://localhost:5050/items"><strong>전체보기</strong></a></li>

      </ul>
    </div>

  `;
  const headerTag = document.getElementsByTagName('header')[0];
  headerTag.insertAdjacentHTML('afterend', template);
};

export const drawFooter = () => {
  const template = `
    <div id="footer-container">
      <div id="footer-icons">
        <a href="https://www.instagram.com/">
          <img src="../images/instagram-icon.jpg" alt="옥토 인스타그램">
        </a>
        <a href="https://ko-kr.facebook.com/">
          <img src="../images/facebook-icon.png" alt="옥토 페이스북">
        </a>
        <a href="https://twitter.com/?lang=ko">
          <img src="../images/twitter-icon.png" alt="옥토 트위터">
        </a>
      </div>
      <div id="footer-textbox">
        <div id="footer-info">
          <a href="">Info</a>
          <a href="">Support</a>
          <a href="">Marketing</a>
        </div>
        <div id="footer-policy">
          <a href="">Terms of Use</a>
          <a href="">Private Policy</a>
        </div>
        <div id="footer-company">
          <a href="http://localhost:5050/admin/login">ⓒ 2022 OCTO infinite</a>
        </div>
      </div>
    </div>

  `;
  const footerTag = document.getElementsByTagName('footer')[0];
  footerTag.insertAdjacentHTML('beforeend', template);
};
