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


//This page is rendered when URI is given as /admin/orders/
const orderList = document.querySelector('#orderList');
// const orderList = document.getElementById('orderList');

const accessToken = sessionStorage.getItem("loginToken")
const userId = sessionStorage.getItem("userId")
const userType = sessionStorage.getItem("adminToken")

//const emailToken = sessionStorage.getItem('userEmail')

var idArray = [];
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
    var recur = false;
    try
    {
        const items = await (await fetch(`/items`)).json();
        const categorylist = await (await fetch(`/categories`)).json()


        if (items.length > 0)
            recur = true
        else
            recur = false
        
        var count = 1;
        for (let item of items){
            const {name, brand, price, createdAt, category, description, isRecommend, isDiscount, id} = item;
            let tableContent = `<tr><th>${String(count++).padStart(5, '0')}</th>`;
            idArray.push(id)
            let itemName = `<td>${name}</td>`;
            let brandName = `<td>${brand}</td>`;
            let categoryName = `<td>${matchCategory(category, categorylist)}</td>`
            let orderDate = `<td>${createdAt.split('T')[0].replaceAll('-', '.')}</td>`
            let itemprice = `<td>${price}</td>`;
            let state = ''
            let stateDef = `<td>${state}</td>`;
            let buttons = `<td>
            <btn class="button is-small is-info is-outlined" id="modify">수정</btn>
            <btn class="button is-small is-danger is-outlined" id="delete">삭제</btn></td></tr>`;
            retHtml += (tableContent + itemName + brandName + categoryName +  orderDate + itemprice + buttons);
        }
        orderList.insertAdjacentHTML('beforeend', retHtml)
        console.log(idArray)
    }
    catch(err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

function matchCategory(categoryId, categoryList)
{
    return categoryList.filter(x => x._id === categoryId)[0].name
}

async function deleteUpdate(event)
{
    const btnTouched = event.target
    if (btnTouched.id !== 'delete'){
        return
    }
    const table = btnTouched.closest("table")
    const currRow = btnTouched.closest("tr")
    const itemId = idArray[Number(currRow.cells[0].innerHTML) - 1]
    console.log(itemId)
    //delete Row
    table.deleteRow(currRow.rowIndex)

    //Update on DB
    const res = await Api.delete(`/admin/items/{itemId}`)

    if (res.success) {
        return alert("성공적으로 삭제되었습니다")
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
