import * as Api from '../api.js';
import { validateEmail, drawNavbar } from '../useful-functions.js';

drawNavbar();

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
    const data = { name, phoneNum };

    // fetch 사용 가능 시 주석 해제 예정
    // fetch 경로 추가 바람
    const result = await Api.post('http://localhost:5050/users/추가경로', data);
    // const email = result.email;
    // 확인용 더미 email
    let email = 'tkemk';
    emailInput.value = email;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
