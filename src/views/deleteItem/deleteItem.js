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
    orderList.addEventListener("click", e => Update(e))
    document.addEventListener("DOMContentLoaded", e => modalManipulate())
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

            let buttons = `<td>
            <btn class="js-modal-trigger button is-small is-info is-outlined" id="modify" data-target="modal-js-example">수정</btn>
            <btn class="button is-small is-danger is-outlined" id="delete">삭제</btn></td></tr>`;
            retHtml += (tableContent + itemName + brandName + categoryName +  orderDate + itemprice + buttons);
        }
        orderList.insertAdjacentHTML('beforeend', retHtml)
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

async function Update(event)
{
    const btnTouched = event.target
    if (btnTouched.id === 'delete')
    {
        const table = btnTouched.closest("table")
        const currRow = btnTouched.closest("tr")
        const itemId = idArray[Number(currRow.cells[0].innerHTML) - 1]
        console.log(itemId)
        //delete Row
        table.deleteRow(currRow.rowIndex)

        //Update on DB
        // const res = await Api.delete(`/admin/items/${itemId}`)

        // if (res.success) {
        //     alert("성공적으로 삭제되었습니다")
        //     return
        // }
        // else
        //     return alert(res.reason);
    }
    if (btnTouched.id === "modify")
    {
        console.log("modify touched!!!!!!!!!!!!")
    }
}

async function modifyUpdate(event)
{
    const btnTouched = event.target
    if (btnTouched.id !== "modify")
        return

    const table = btnTouched.closest("table")
    const currRow = btnTouched.closest("tr")
    const itemId = idArray[Number(currRow.cells[0].innerHTML) - 1]
    console.log(itemId)
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


function modalManipulate () 
{
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
}
