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

export const drawNavbar = () => {
  const loginBtn = document.getElementById('login');
  const logoutBtn = document.getElementById('logout');
  const joinBtn = document.getElementById('join');

  const loginAfter = document.getElementById('vb-login-after');
  const logoutAfter = document.getElementById('vb-logout-after');
  const joinAfter = document.getElementById('vb-join-after');

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

  // 로그아웃 시 세션스토리지 토큰 제거
  if (!logoutBtn.classList.contains('active')) {
    sessionStorage.removeItem('loginToken');
    sessionStorage.removeItem('userEmail');
  }
};
