import * as Api from '../api.js';
import { validateEmail } from '../useful-functions.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const numberInput = document.querySelector('#numberInput');
const postcodeInput = document.querySelector('#sample6_postcode');
const adressInput = document.querySelector('#sample6_address');
const detailAdressInput = document.querySelector('#sample6_detailAddress');

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
}

// 회원가입 진행
async function handleSubmit(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phone = numberInput.value;
  const postCode = postcodeInput.value;
  const adress = adressInput.value;
  const detailAdress = detailAdressInput.value;

  // 잘 입력했는지 확인
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;
  const isNumberValid = Number(phone);
  const isdetailAdressValid = detailAdress.length;

  console.log(isEmailValid);

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  if (isNumberValid === NaN) {
    return alert('번호는 숫자만 입력해 주세요.');
  }

  if (!isdetailAdressValid) {
    return alert('상세주소를 입력해 주세요.');
  }

  // 회원가입 api 요청
  try {
    const data = {
      fullName,
      email,
      password,
      phone,
      postCode,
      adress1: adress,
      adress2: detailAdress,
      type: 'User',
    };

    await Api.post('http://localhost://5000/auth/sign-in', data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = '/login';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
