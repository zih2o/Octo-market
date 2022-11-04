import * as Api from '../api.js';

const orderList = document.querySelector('#orderList');
console.log(orderList);


/* Data mocked
    const order = [
	{state:"배송 중",address:"B",items:[["C", 0]], createdAt:"D"},
	{state:"결제 완료",address:"F",items:[["G", 0]], createdAt:"H"},
]
*/
allOrders()


async function allOrders()
{
    const token = sessionStorage.getItem("token");
    if (!token){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/login";
    } 
    const userId = sessionStorage.getItem("userId")
    var retHtml = "";
    var deliStatus = [0, 0, 0, 0, 0];
    try 
    {
        const orders = await Api.get(`http://localhost:5050/orders/users/${userId}`);
        var count = 1;
        
        for (let order of orders){
            const {state, address, items, createdAt} = order;
            deliStatus[checkStatus(state)] += 1
            let tableContent = `<tr><th>${String(count++).padStart(6, '0')}</th>`;
            let orderName = `<td>${items[0][0]} 등 ${items.length}개</td>`;
            let stateDef = `<td>${state}</td>`;
            let buttons = `<td><btn class="button is-small is-danger is-outlined">취소</btn></td></tr>`
            retHtml += (tableContent + orderName + stateDef + buttons);
        }

        orderList.insertAdjacentHTML("beforeend", retHtml);
        updateDeliveryStatus(deliStatus);

    }
    catch(e)
    {
        console.error(e.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
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
