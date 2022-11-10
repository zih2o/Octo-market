import * as Api from '../../api.js';

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


// const {accessToken, userId, userType} = {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY5Y2FjZjg4M2Y0Njg2YmNkYWViNWUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2Nzg3NzcxM30.-wwMXn85_1UFtDrKX8itCngS1r56vQowwgp3v5hUtdY",
//     "userId": "6369cacf883f4686bcdaeb5e",
//     "userType": "user"
// };
// sessionStorage.setItem('token', accessToken)

const token = sessionStorage.getItem('loginToken')
const userId = sessionStorage.getItem('userId')

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    isLoggedIn();
    allOrders();
}
function addAllEvents() {
    orderList.addEventListener("click", e=>deleteUpdate(e))
}


async function allOrders()
{
    var retHtml = "";
    var deliStatus = [0, 0, 0, 0, 0];
    try 
    {
        const res = await Api.get(`/orders/personal/${userId}`);
        console.log(res)

        if (res.message)
            return alert(res.message)
        else if (res.length > 0) {
            const orders = res;
            var count = 1;
            
            for (let order of orders){
                const {_id, orderInfo, totalPrice, email, address, state, createdAt, updatedAt} = order

                deliStatus[checkStatus(state)] += 1
                //let tableContent = `<tr><th>${String(count++).padStart(6, '0')}</th>`;
                let tableContent = `<tr><th>${_id}</th>`;
                let orderName = `<td>${orderInfo[0].name} 등 ${orderInfo.length}개</td>`;
                let stateDef = `<td>${state}</td>`;
                let buttons = `<td><btn class="button  is-small is-warning is-outlined" data-target="modal-js-example">수정</btn></td></tr>`
                retHtml += (tableContent + orderName + stateDef + buttons);
            }

            orderList.insertAdjacentHTML("beforeend", retHtml);
            updateDeliveryStatus(deliStatus);
        }
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
    console.log(btnTouched)
    if (btnTouched.classList.contains('button')){
        alert("Button function not implemented")
        return
    }
    // const table = btnTouched.closest("table")
    // const currRow = btnTouched.closest("tr")
    // const orderId = currRow.cells[0].innerHTML
    // const userId = currRow.cells[1]

    // //delete Row
    // table.deleteRow(currRow.rowIndex)

    // //Update on DB
    // const res = await Api.delete(`/admin/orders/${orderId}`)

    // if (res.success) {
    //     return alert("성공적으로 취소되었습니다")
    // }
    // else
    //     return alert(res.reason);
}

function checkStatus(strIn)
{
    if (strIn === "결제 완료")
        return 0;
    else if (strIn === "배송 준비")
        return 1;
    else if (strIn === "배송 중")
        return 2;
    else if (strIn === "배송 완료")
        return 3;
    else if (strIn === "주문 취소")
        return 4;
}

function updateDeliveryStatus(arrIn)
{
    for (let i=0; i<5; i++)
        document.querySelector(`#deliveryStatus-${i}`).innerHTML = arrIn[i];
}

function isLoggedIn() 
{
    if (!token){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/users/login";
    } 
}
