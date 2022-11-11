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
  

//This page is rendered when URI is given as /orders/users/

const orderList = document.querySelector('#orderList');
const orderName = document.querySelector("#orderName")
const modalCloseModal = document.querySelectorAll(".close-button");
const modalPutModal = document.querySelector(".put-button");
const deliStatus = document.querySelector("#delivery")


const token = sessionStorage.getItem('loginToken')
const userId = sessionStorage.getItem('userId')
var idArray = [];

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    isLoggedIn();
    allOrders();
    userIdhref();
}
function addAllEvents() {
    orderList.addEventListener("click", e=>deleteUpdate(e));
    modalPutModal.addEventListener("click", e => updateData(e))
    modalCloseModal.forEach(button => button.addEventListener("click", closeModal));
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
                let buttons = `<td><btn class="button is-small is-outlined is-danger cancel-btn" data-target="modal-js-example">취소</btn></td></tr>`
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
    const currRow = btnTouched.closest("tr")
    const orderId = currRow.cells[0].innerHTML
// 주문 취소 버튼인 경우
    if (btnTouched.classList.contains('cancel-btn')){
        currRow.cells[2].innerHTML = "주문 취소"
        const res = await Api.put(`/orders/${orderId}`, {
            state:"주문 취소"})
        if (res.success) {
            return alert("성공적으로 취소되었습니다")
        }
        else
           return;
// 주문 수정인 경우
    } else{
        console.log(orderId)
        const modal = document.querySelector("#modal");
        const order = await Api.get(`/orders/${orderId}`)
        console.log(order)
        orderName.value = orderId
        modal.showModal();

    }
}

async function updateData(e)
{
    const orderId = orderName.value
    const res = await Api.put(`/orders/${orderId}`, {
        state:`${deliStatus.value}`
    })
    alert("배송 상태 수정이 반영되었습니다")
    window.location.href = window.location.href;
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

function userIdhref()
{
    let menu_href = document.querySelector(".menu-list > li > ul > li > a")
    menu_href.setAttribute('href',`/users/userlist/${userId}`)
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
