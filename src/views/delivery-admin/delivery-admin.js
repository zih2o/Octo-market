import * as Api from '../api.js';

//This page is rendered when URI is given as http://localhost:5050/admin/orders/
const orderList = document.querySelector('#orderList');

// Data mocked
// sessionStorage.setItem('loginToken', JSON.stringify({
//     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY0OWI5ZDgwYTMzZTUwMWNlNWY5NDYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2NzUzODI5OX0.38U02nnJHS_UaEdR5weEll3wKzLE1zS-_f6FTIkdB10",
//     userId: "63649b9d80a33e501ce5f946",
//     userType: "admin",
// }))
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


const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
const emailToken = sessionStorage.getItem('userEmail')

addAllElements();
addAllEvents();


function addAllElements() {
    isLoggedIn();
    isAdmin();
    allOrdersAdmin();
}

function addAllEvents() {
}


async function allOrdersAdmin()
{
    /* Read and Add rows to table if get request is successful */
    var retHtml = "";

    try 
    {
        const res = await Api.get(`http://localhost:5050/admin/orders`);
        const orders = JSON.parse(res.body);
        if (res.status == 403)
            return alert(orders.message)
        
        var count = 1;
        for (let order of orders){
            const {_id, orderInfo, totalPrice, email, address, state, createdAt, updatedAt} = order;
            console.log(_id, orderInfo, totalPrice, email, address, state, createdAt, updatedAt)
            let tableContent = `<tr><th>${_id}</th>`;
            let userEmail = `<td>${email}</td>`;
            let orderDate = `<td>${createdAt}</td>`
            let userAddr = `<td>${address.address1+' '+address.address2}</td>`
            let orderName = `<td>${orderInfo[0].name} 등 ${orderInfo.length}개</td>`;
            let price = `<td>${totalPrice}</td>`;
            let stateDef = `<td>${state}</td>`;
            let buttons = `<td><btn class="button is-small is-danger is-outlined">취소</btn></td></tr>`;
            retHtml += (tableContent + userEmail + orderDate + userAddr + orderName + price + stateDef + buttons);
        }

        orderList.insertAdjacentHTML("beforeend", retHtml);
    }
    catch(err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

function isLoggedIn() 
{
    if (!accessToken){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/login";
    } 
}

function isAdmin()
{
    if (userType !== "admin"){
        alert("관리자가 아닙니다")
        window.location.href = "/login";
    }
}