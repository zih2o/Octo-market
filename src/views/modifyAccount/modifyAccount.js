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

//This page is rendered when URI is given as /users/${userId}

const emailIn = document.querySelector("#emailIn");
const oldpwIn = document.querySelector("#oldpwIn");
const newpwIn = document.querySelector("#newpwIn");
const postcode= document.querySelector("#sample6_postcode");
const addrIn1 = document.querySelector("#sample6_address");
const addrIn2 = document.querySelector("#sample6_detailAddress");
const phone = document.querySelector("#phoneNum");
const submitBtn = document.querySelector("#submitBtn");

const {accessToken, userId, userType} = {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY5Y2FjZjg4M2Y0Njg2YmNkYWViNWUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2Nzg3NzcxM30.-wwMXn85_1UFtDrKX8itCngS1r56vQowwgp3v5hUtdY",
    "userId": "6369cacf883f4686bcdaeb5e",
    "userType": "user"
};
sessionStorage.setItem('token', accessToken)

// const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
// const emailToken = sessionStorage.getItem('userEmail')

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    emailAttach();
}
function addAllEvents() {
    submitBtn.addEventListener("click", handleSubmit)
}



async function emailAttach () {
    const userInfo = await Api.get('/users', userId);
    emailIn.placeholder = `${userInfo.email}`;
}

async function handleSubmit(e) {
    e.preventDefault();
    const password = newpwIn.value;
    const currentPassword = oldpwIn.value;
    
    if (password.length < 7 || password.length > 20){
        alert("비밀번호의 길이는 8자 이상 20자 이하입니다.")
        return;
    }
    
    const address = {
        "postalCode": postcode.value,
        "address1": addrIn1.value,
        "address2": addrIn2.value,
    };

    if (address === ' '){
        alert("주소가 공란입니다.")
        return;
    }
    
    const phoneNum = phone.value;

    if (!phoneNum){
        alert("전화번호가 공란입니다.")
        return;
    }
    if (!/^[\d]$/.test(phoneNum)){
        alert("전화번호는 숫자만 입력해 주세요.")
        return;
    }

    const data = {
        password,
        currentPassword,
        address,    
        phoneNum,
    };

    try {
        console.log(data)
        const res = await Api.put(`/users/${userId}`, data);

        if (res.statusCode === 200)
            return alert("정상적으로 수정되었습니다.")
        else
            return alert(res.reason)
    }
    catch (err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}
