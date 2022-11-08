import * as Api from '../api.js';

//This page is rendered when URI is given as /users/${userId}

const emailIn = document.querySelector("#emailIn");
const oldpwIn = document.querySelector("#oldpwIn");
const newpwIn = document.querySelector("#newpwIn");
const postcode= document.querySelector("#search_postcode");
const addrIn1 = document.querySelector("#sample6_address");
const addrIn2 = document.querySelector("#sample6_detailAddress");
const phone = document.querySelector("#phoneNum");
const submitBtn = document.querySelector("#submitBtn");

// sessionStorage.setItem('loginToken', JSON.stringify({
//     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY0OWI5ZDgwYTMzZTUwMWNlNWY5NDYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2NzUzODI5OX0.38U02nnJHS_UaEdR5weEll3wKzLE1zS-_f6FTIkdB10",
//     userId: "63649b9d80a33e501ce5f946",
//     userType: "user"
// }))
// sessionStorage.setItem('userEmail', 'semin0706@naver.com')

const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
const emailToken = sessionStorage.getItem('userEmail')

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    emailAttach();
}
function addAllEvents() {
    submitBtn.addEventListener("click", handleSubmit)
}



function emailAttach () {
    emailIn.placeholder = emailToken;
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
        postalcode: postcode.value,
        address1: addrIn1.value,
        address2: addrIn2.value,
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
    if (!/^\d+$/.test(phoneNum)){
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
        const res = await Api.put(`/users/${userId}`, data);
        //const res = 200
        if (res.status == 200) {
            alert("수정되었습니다.");
            return;
        }
        else if (res.status == 403)
        {
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }
        else if (res.status == 404)
        {
            alert("해당하는 유저가 없습니다.")
            return;
        }
        window.location.href = window.location.href
    }
    catch (err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}