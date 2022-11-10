import * as Api from '../api.js';

import {
    // 회원가입 등 네비바 랜더링
    drawNavbar,
    // 토큰 보유에 따라 네비바 변화
    activeNavbar,
    // 푸터 랜더링
    drawFooter,
    // 관리자 로그인 그리기
    drawAdminLink,
  } from '../useful-functions.js';
  
  // html 랜더링 관련 함수들 실행
  drawNavbar();
  activeNavbar();
  drawFooter();
  drawAdminLink();

const returnEmailForm = document.getElementById('res-container');
// 요소(element), input 혹은 상수
const nameInput = document.querySelector('#nameInput');
const phoneNumInput = document.querySelector('#phoneNumInput');
const submitButton = document.querySelector('#submitButton');
const emailInput = document.querySelector('#resEmail');

addAllEvents();

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 로그인 진행
async function handleSubmit(e) {
  e.preventDefault();

  const name = nameInput.value;
  console.log(name);
  const phoneNum = phoneNumInput.value;
  console.log(phoneNum);

  // 유효성 검사 방법은 추후 논의 후 변경 가능
  const isNameValid = name.length >= 2;
  console.log('이름 체크?', isNameValid);
  const isPhoneNumValid = !Number.isNaN(phoneNum) && phoneNum.length >= 11;
  console.log('번호 체크?', isPhoneNumValid);

  if (!isNameValid || !isPhoneNumValid) {
    return alert(
      '입력하신 이름이 2글자 이상인지, 휴대폰 번호는 - 를 뺀 11개 이상의 수 인지 확인바랍니다.',
    );
  }

  // 로그인 api 요청
  try {
    const data = {
      name: name,
      phoneNum: phoneNum
    };

    // fetch 사용 가능 시 주석 해제 예정
    // fetch 경로 추가 바람
    const result = await Api.post('/users/findemail', data);
    const email = result.email;

    // 확인용 더미 email
    // let email = 'tkemk';

    emailInput.value = email;

    // 이메일 값이 있으면 보이도록
    if (email) {
      returnEmailForm.style.display="block";
    }

  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
