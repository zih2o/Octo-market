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

const prodName = document.querySelector('#productName');
const prodBrand= document.querySelector('#productBrand');
const prodCate = document.querySelector('#productCategory');
const prodDesc = document.querySelector('#productDesc');

//This page is rendered when URI is given as /admin/orders/
const orderList = document.querySelector('#orderList');
// const orderList = document.getElementById('orderList');

const accessToken = sessionStorage.getItem("loginToken")
const userId = sessionStorage.getItem("userId")
const userType = sessionStorage.getItem("adminToken")

//const emailToken = sessionStorage.getItem('userEmail')

var itemArray = [];
var descArray = [];
var selectedItem;
const categorylist = await (await fetch(`/categories`)).json()
const modalCloseModal = document.querySelectorAll(".close-button");
const modalPutModal = document.querySelector(".put-button");

addAllElements();
addAllEvents();


function addAllElements() {
    isLoggedIn();
    isAdmin();
    allOrdersAdmin();
    getCategory();
}

function addAllEvents() {
    // Add row delete and call delivery cancel api
    orderList.addEventListener("click", e => Update(e))
    document.addEventListener("DOMContentLoaded", e => modalManipulate())
    modalPutModal.addEventListener("click", e => updateData(e))
    modalCloseModal.forEach(button => button.addEventListener("click", closeModal));
}


async function allOrdersAdmin()
{
    /* Read and Add rows to table if get request is successful */
    var retHtml = "";
    var recur = false;
    try
    {
        const items = await (await fetch(`/items`)).json();


        if (items.length > 0)
            recur = true
        else
            recur = false

        var count = 1;
        for (let item of items){
            const {name, brand, price, createdAt, category, description, imageUrl, isRecommend, isDiscount, dispercent, id} = item;
            let tableContent = `<tr><th>${id}</th>`;
            let itemName = `<td>${name}</td>`;
            let brandName = `<td>${brand}</td>`;
            let nameCate = matchCategory(category, categorylist)
            let categoryName = `<td>${nameCate}</td>`
            let orderDate = `<td>${createdAt.split('T')[0].replaceAll('-', '.')}</td>`
            let itemprice = `<td>${price}</td>`;
            let buttons = `<td>
            <btn class="js-modal-trigger button is-small is-info is-outlined" id="modify" data-target="modal-js-example">수정</btn>
            <btn class="button is-small is-danger is-outlined" id="delete">삭제</btn></td></tr>`;
            retHtml += (tableContent + itemName + brandName + categoryName +  orderDate + itemprice + buttons);
            itemArray.push({name, brand, price, description, category, imageUrl, isRecommend, isDiscount, dispercent, id})
        }
        orderList.insertAdjacentHTML('beforeend', retHtml)
    }
    catch(err)
    {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}


function populateForm(itemRow) {
    selectedItem = itemArray[Number(itemRow.cells[0].innerHTML-1)];
    prodName.setAttribute('value', selectedItem.name)
    prodBrand.setAttribute('value', selectedItem.brand)
    //prodCate.value = matchCategory(selectedItem.category, categorylist)
    prodDesc.value = selectedItem.description
    //delete selectedItem.id
}

async function updateData(e) {
    console.log("control flow")
    const itemId = selectedItem.id;
    selectedItem.name = prodName.value
    selectedItem.brand = prodBrand.value
    selectedItem.category = deMatchCategory(prodCate.value, categorylist)
    selectedItem.description = prodDesc.value
    const {name, brand, price, description, imageUrl, isRecommend, isDiscount} = selectedItem

    const postData = 
    {
        name, brand, price, description, imageUrl, isRecommend, isDiscount
    }
    const res = await Api.put(`/admin/items/${itemId}`, postData)  
}

function matchCategory(categoryId, categoryList)
{
    return categoryList.filter(x => x._id === categoryId)[0].name
}

function deMatchCategory(categoryName, categoryList)
{
    return categoryList.filter(x => x.name === categoryName)[0]._id
}

async function Update(event)
{
    const btnTouched = event.target
    if (btnTouched.id === 'delete')
    {
        const table = btnTouched.closest("table")
        const currRow = btnTouched.closest("tr")
        const itemId = currRow.cells[0].innerHTML
        console.log(itemId)
        //delete Row
        table.deleteRow(currRow.rowIndex)

        //Update on DB
        const res = await Api.delete(`/admin/items/${itemId}`)

        if (res.success) {
            alert("성공적으로 삭제되었습니다")
            return
        }
        else
            return alert(res.reason);
    }
    if (btnTouched.id === "modify")
    {
      const currRow = btnTouched.closest("tr")
      const modal = document.querySelector("#modal");
      populateForm(currRow);
      modal.showModal();
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

async function getCategory() {
    var retHTML = ``;
    var categoryId = [];
    for (let i=0; i<categorylist.length;i++)
    {
        retHTML += `<option>${categorylist[i].name}</option>`
        categoryId.push(categorylist[i]._id)
    }
    prodCate.innerHTML = retHTML;
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
