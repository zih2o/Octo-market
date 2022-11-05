import * as Api from '../api.js';

const orderList = document.querySelector('#orderList');

/* Data mocked
    const order = [
	{state:"배송 중",address:"B",items:[["C", 0]], createdAt:"221104"},
	{state:"결제 완료",address:"F",items:[["G", 0]], createdAt:"221103"},
]
*/
allOrdersAdmin()
{/* <th>00002</th>
<td>semin0706@naver.com</td>
<td>22.11.03</td>
<td></td>
<td>나쵸 외 5개</td>
<td>50000</td>
<td>배송 중</td>
<td><btn class="button is-small is-danger is-outlined">취소</btn></td> */}


async function allOrdersAdmin()
{
    /* Login validation */
    const token = sessionStorage.getItem("token");
    if (!token){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/login";
    } 
    /* Admin validation is needed */
    

    /* Read and Add rows to table if get request is successful */
    var retHtml = "";

    try 
    {
        //const orders = await Api.get(`http://localhost:5050/admin/orders`);
        const orders = [
            {state:"배송 중",address:"B",items:[["C", 0]], createdAt:"221104"},
            {state:"결제 완료",address:"F",items:[["G", 0]], createdAt:"221103"},
        ]
        var count = 1;
        
        for (let order of orders){
            const {state, address, items, createdAt} = order;
            let tableContent = `<tr><th>${String(count++).padStart(6, '0')}</th>`;
            let userName = `<td></td>`;
            let orderDate = `<td>${createdAt}</td>`
            let userAddr = `<td>${address}</td>`
            let orderName = `<td>${items[0][0]} 등 ${items.length}개</td>`;
            let price = `<td></td>`;
            let stateDef = `<td>${state}</td>`;
            let buttons = `<td><btn class="button is-small is-danger is-outlined">취소</btn></td></tr>`;
            retHtml += (tableContent + userName + orderDate + userAddr + orderName + price + stateDef + buttons);
        }

        orderList.insertAdjacentHTML("beforeend", retHtml);

    }
    catch(e)
    {
        console.error(e.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
    }
}

function orderSum (inArr)
{
    console.log("not implemented")
}