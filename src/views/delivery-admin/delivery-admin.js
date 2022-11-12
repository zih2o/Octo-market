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


//This page is rendered when URI is given as /admin/orders/
const orderList = document.querySelector('#orderList');
const accessToken = sessionStorage.getItem("loginToken")
const userId = sessionStorage.getItem("userId")
const userType = sessionStorage.getItem("adminToken")

const orderName = document.querySelector("#orderName")
const deliStatus = document.querySelector("#delivery")

const modalCloseModal = document.querySelectorAll(".close-button");
const modalPutModal = document.querySelector(".put-button");


//const emailToken = sessionStorage.getItem('userEmail')

var idArray = [];
var rowInd;
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
    modalPutModal.addEventListener("click", e => updateData(e))
    modalCloseModal.forEach(button => button.addEventListener("click", closeModal));
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
            let res2 = await fetch(`/users/${userId}`, {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            })
            let {name} = await res2.json()
            let tableContent = `<tr><th>${id}</th>`;
            idArray.push(id)
            let user = `<td>${name}</td>`;
            let orderDate = `<td>${createdAt.split('T')[0].replaceAll('-', '.')}</td>`
            let userAddr = `<td>${address.address1+' '+address.address2}</td>`
            let orderName = `<td>${orderInfo[0].name} 등 ${orderInfo.length}개</td>`;
            let price = `<td>${totalPrice}</td>`;
            let stateDef = `<td>${state}</td>`;
            let buttons = `<td><btn class="button is-small is-info is-outlined" id="modify">수정</btn>
            <btn class="button is-small is-danger is-outlined">취소</btn></td></tr>`;
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

async function updateData(e)
{
    const res = await Api.put(`/admin/orders/${idArray[rowInd]}`, {
        state:`${deliStatus.value}`
    })
    alert("배송 상태 수정이 반영되었습니다")
    window.location.href = window.location.href;
}


async function deleteUpdate(event)
{
    const btnTouched = event.target
    if (btnTouched.classList.contains('is-danger')){
        const table = btnTouched.closest("table")
        const currRow = btnTouched.closest("tr")
        rowInd = currRow.rowIndex
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
    else if (btnTouched.classList.contains('is-info'))
    {
        const currRow = btnTouched.closest("tr")
        rowInd = currRow.rowIndex - 1
        const modal = document.querySelector("#modal");
        populateForm(rowInd);
        modal.showModal();
    }
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

function closeModal()
{
    const modal = document.querySelector("#modal");
    modal.setAttribute("close", "");
  
    modal.addEventListener(
      "transitionend",
      () => {
        modal.removeAttribute("close");
        modal.close();
      },
      {once: true}
    );
}

function populateForm(itemRow) {
    orderName.value = idArray[itemRow];
}