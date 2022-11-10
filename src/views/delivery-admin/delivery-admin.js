import * as Api from '../api.js';
import {
  drawNavbar,
  activeNavbar,
  drawFooter,
} from '../../useful-functions.js';

// html 랜더링 관련 함수들 실행
drawNavbar();
activeNavbar();
drawFooter();


//This page is rendered when URI is given as /admin/orders/
const orderList = document.querySelector('#orderList');
// const orderList = document.getElementById('orderList');

// Data mocked
// sessionStorage.setItem('loginToken', JSON.stringify({
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY4YmRmNzQ5ZGZlODA4OTg4ZWEyMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njc4NzE3Mzd9.AW1x6uJ2itKC8oMFXdL0CjFzaA2cisATQE263fzqF9Q",
//     "userId": "6368bdf749dfe808988ea212",
//     "userType": "admin"
// }
// ))
// sessionStorage.setItem('userEmail', 'semin0706@naver.com')


// var orders = JSON.stringify([
//     {
//         "_id": "555555",
//         "orderInfo": [
//             {
//                 "item_id": "666666",
//                 "name": "아이팟",
//                 "amount": 10000,
//                 "price": 10,
//             },
// 				],
// 		"totalPrice": 10000,
//         "email": "semin0706@naver.com",
//         "address": {
//             "postalCode": 1111,
//             "address1": "경기도 안양시 비산동 KFC",
//             "address2": "3333",
// 		        },
//         "state": "배송 준비",
//         "createdAt": "2022-11-06",
//         "updatedAt": "2022-11-07",
//         },
//     {
//         "_id": "66666",
//         "orderInfo": [
//             {
//                 "item_id": "77777",
//                 "name": "갤럭시",
//                 "amount": 10000,
//                 "price": 10,
//             },
//                 ],
//                 "totalPrice": 10000,
//         "email": "semin0706@naver.com",
//         "address": {
//             "postalCode": 1111,
//             "address1": "경기도 안양시 동안구 평촌동",
//             "address2": "3333",
//                 },
//         "state": "배송 준비",
//         "createdAt": "2022-11-06",
//         "updatedAt": "2022-11-07",
//     },
// ])

const accessToken = sessionStorage.getItem("loginToken")
const userId = sessionStorage.getItem("userId")
const userType = sessionStorage.getItem("adminToken")

//const emailToken = sessionStorage.getItem('userEmail')

addAllElements();
addAllEvents();


function addAllElements() {
    isLoggedIn();
    isAdmin();
    allOrdersAdmin();
}

function addAllEvents() {
    // Add row delete and call delivery cancel api
    orderList.addEventListener("click", e => deleteUpdate(e))
}


async function allOrdersAdmin()
{
    /* Read and Add rows to table if get request is successful */
    var retHtml = "";
    try
    {
        const res = await Api.get(`/admin/orders`);
        const orders = res;
        if (res.status === 403)
            return alert(orders.message)

        var count = 1;
        for (let order of orders){
            const {id, orderInfo, totalPrice, userId, address, state, createdAt, updatedAt} = order;
            let tableContent = `<tr><th>${id}</th>`;
            let user = `<td>${userId}</td>`;
            let orderDate = `<td>${createdAt.split('T')[0].replaceAll('-', '.')}</td>`
            let userAddr = `<td>${address.address1+' '+address.address2}</td>`
            let orderName = `<td>${orderInfo[0].name} 등 ${orderInfo.length}개</td>`;
            let price = `<td>${totalPrice}</td>`;
            let stateDef = `<td>${state}</td>`;
            let buttons = `<td><btn class="button is-small is-danger is-outlined">취소</btn></td></tr>`;
            retHtml += (tableContent + user + orderDate + userAddr + orderName + price + stateDef + buttons);
        }
        orderList.insertAdjacentHTML('beforeend', retHtml)

    }
    catch(err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

async function deleteUpdate(event)
{
    const btnTouched = event.target
    if (!btnTouched.classList.contains('button')){
        return
    }
    const table = btnTouched.closest("table")
    const currRow = btnTouched.closest("tr")
    const orderId = currRow.cells[0].innerHTML
    const userId = currRow.cells[1]

    //delete Row
    table.deleteRow(currRow.rowIndex)

    //Update on DB
    const res = await Api.delete(`/admin/orders/${orderId}`)

    if (res.success) {
        return alert("성공적으로 취소되었습니다")
    }
    else
        return alert(res.reason);
}


function isLoggedIn()
{
    if (!accessToken){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/users/login";
    }
}

function isAdmin()
{
    if (userType !== "admin"){
        alert("관리자가 아닙니다")
        window.location.href = "/users/login";
    }
}