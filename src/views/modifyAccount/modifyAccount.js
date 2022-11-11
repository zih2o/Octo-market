import * as Api from '/api.js';
import {
    // 회원가입 등 네비바 랜더링
    drawNavbar,
    // 토큰 보유에 따라 네비바 변화
    activeNavbar,
    // 푸터 랜더링
    drawFooter,
    // 관리자 로그인 그리기
    drawAdminLink,
  } from '/useful-functions.js';
  
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
const deleteId = document.querySelector('#deleteId');

const accessToken = sessionStorage.getItem("loginToken")
const userId = sessionStorage.getItem("userId")
const userType = sessionStorage.getItem("adminToken")

// const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
// const emailToken = sessionStorage.getItem('userEmail')

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    emailAttach();
    userIdhref();
}
function addAllEvents() {
    submitBtn.addEventListener("click", handleSubmit)
    deleteId.addEventListener("click", membershipDelete)
}

async function membershipDelete() {
    try {
        await Api.delete(`/users/${userId}`);

        sessionStorage.removeItem('loginToken');
        sessionStorage.removeItem('userId');

        alert('회원탈퇴가 완료되었습니다.') 
        window.location.href = '/';
    } catch (err) {
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
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
    console.log(address.postalCode);

    if (address === ' '){
        alert("주소가 공란입니다.")
        return;
    }
    
    const phoneNum = phone.value;

    if (!phoneNum){
        alert("전화번호가 공란입니다.")
        return;
    }
    if (!/^[\d]+$/.test(phoneNum)){
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

        
        alert("정상적으로 수정되었습니다.")
        window.location.hrer = '/';
    }
    catch (err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

function userIdhref()
{
    let menu_href = document.querySelector(".menu-list > li > ul > li > a")
    menu_href.setAttribute('href',`/users/userlist/${userId}`)
}
