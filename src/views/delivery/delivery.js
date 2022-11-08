import * as Api from '../api.js';

//This page is rendered when URI is given as /orders/users/

const orderList = document.querySelector('#orderList');

// Data mocked
// sessionStorage.setItem('loginToken', JSON.stringify({
//     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY0OWI5ZDgwYTMzZTUwMWNlNWY5NDYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2NzUzODI5OX0.38U02nnJHS_UaEdR5weEll3wKzLE1zS-_f6FTIkdB10",
//     userId: "63649b9d80a33e501ce5f946",
//     userType: "user"
// }))
// sessionStorage.setItem('userEmail', 'semin0706@naver.com')


// const orders = [
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
//             "address1": "2222",
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
//             "address1": "2222",
//             "address2": "3333",
//                 },
//         "state": "배송 준비",
//         "createdAt": "2022-11-06",
//         "updatedAt": "2022-11-07",
//     },
// ]


const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
const emailToken = sessionStorage.getItem('userEmail')

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    isLoggedIn();
    allOrders();
}
function addAllEvents() {
}


async function allOrders()
{
    var retHtml = "";
    var deliStatus = [0, 0, 0, 0, 0];
    try 
    {
        const res = await Api.get(`/orders/users/${userId}`);
        const orders = JSON.parse(res.body);
        if (res.status == 401 || res.status == 403)
            return alert(orders.message)

        var count = 1;
        
        for (let order of orders){
            const {_id, orderInfo, totalPrice, email, address, state, createdAt, updatedAt} = order

            deliStatus[checkStatus(state)] += 1
            //let tableContent = `<tr><th>${String(count++).padStart(6, '0')}</th>`;
            let tableContent = `<tr><th>${_id}</th>`;
            let orderName = `<td>${orderInfo[0].name} 등 ${orderInfo.length}개</td>`;
            let stateDef = `<td>${state}</td>`;
            let buttons = `<td><btn class="button is-small is-danger is-outlined">취소</btn></td></tr>`
            retHtml += (tableContent + orderName + stateDef + buttons);
        }

        orderList.insertAdjacentHTML("beforeend", retHtml);
        updateDeliveryStatus(deliStatus);

    }
    catch(err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

function checkStatus(strIn)
{
    if (strIn === "입금 대기")
        return 0;
    else if (strIn === "결제 완료")
        return 1;
    else if (strIn === "배송 준비")
        return 2;
    else if (strIn === "배송 중")
        return 3;
    else if (strIn === "배송 완료")
        return 4;
}

function updateDeliveryStatus(arrIn)
{
    for (let i=0; i<5; i++)
        document.querySelector(`#deliveryStatus-${i}`).innerHTML = arrIn[i];
}

function isLoggedIn() 
{
    if (!accessToken){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/login";
    } 
}