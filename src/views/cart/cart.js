import {
  addCommas,
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
  

//기본 데이터 셋팅
//총 결제 정보
const state = {
  productsCount: 0,
  deliveryCharge: 0,
  productsPrice: 0,
};
//개별 상품 개수
const amount = {};
//모든 상품 목록
const items = {};


const productsCount = document.querySelector("#productsCount");
const productsPrice = document.querySelector("#productsPrice");
const deliveryCharge = document.querySelector("#deliveryCharge");
const totalPrice = document.querySelector("#totalPrice");
const cartList = document.querySelector('#cartList');

getProductList();

//총 결제 정보 html 입력
function settingInfo() {
  productsCount.innerHTML = state.productsCount + "개";
  productsPrice.innerHTML = addCommas(state.productsPrice) + "원";
  deliveryCharge.innerHTML = addCommas(state.deliveryCharge) + "원";
  totalPrice.innerHTML =
    addCommas(state.productsPrice + state.deliveryCharge) + "원";
  return;
}

//처음 화면 진입 시 모든 체크박스 활성화
function firstView() {
  const checkbox = document.querySelectorAll("input");
  checkbox.forEach((e) => {
    e.checked = true;
  });
}


function makeProductList(itemId) {
  if (items[itemId].isDiscount) {
    cartList.insertAdjacentHTML('beforeend', `<div class="productElement" id="check_${itemId}">
              <input type="checkbox" class="checkbox include" autocomplete="off" />
              <div class="productimg"><img src=${items[itemId].imageUrl}></div>
            <div class="productDescription">
              <span class="productName is-size-5"><span>${
                items[itemId].name
              }</span><span class="is-size-7" id="discount_${itemId}">${items[itemId].disPercent}% 할인 적용</span></span>
              <span class="eachPrice">${addCommas(
                items[itemId].price
              )}원</span>
              <nav class="eachAmount" id="nav_${itemId}">
                <button class="minusBtn">-</button>
                <span>${sessionStorage.getItem(itemId)}</span>
                <button class="plusBtn">+</button>
              </nav>
              <span class="eachTotalPrice" id="eachTotalPrice_${itemId}">${addCommas(
            items[itemId].price * amount[itemId]
          )}원</span>
            </div>
          </div>`)
  } else {
    cartList.insertAdjacentHTML('beforeend', `<div class="productElement" id="check_${itemId}">
              <input type="checkbox" class="checkbox include" autocomplete="off" />
              <div class="productimg"><img src=${items[itemId].imageUrl}></div>
            <div class="productDescription">
              <span class="productName is-size-5"><span>${
                items[itemId].name
              }</span><span class="is-size-7" id="discount_${itemId}"></span></span>
              <span class="eachPrice">${addCommas(
                items[itemId].price
              )}원</span>
              <nav class="eachAmount" id="nav_${itemId}">
                <button class="minusBtn">-</button>
                <span>${sessionStorage.getItem(itemId)}</span>
                <button class="plusBtn">+</button>
              </nav>
              <span class="eachTotalPrice" id="eachTotalPrice_${itemId}">${addCommas(
            items[itemId].price * amount[itemId]
          )}원</span>
            </div>
          </div>`)
  }
}

async function getProductList() {
  if (!sessionStorage.getItem("cart")) {
    return;
  } else {
    const itemList = sessionStorage
      .getItem("cart")
      .split(",")
      .filter((e) => e !== "");

    for (const itemId of itemList) {
      try {
        const res = await fetch(`/items/${itemId}`);
        const item = await res.json();

        if (sessionStorage.getItem(itemId)) {
          items[itemId] = {};
          items[itemId].name = item.name;
          items[itemId].price = item.price;
          items[itemId].imageUrl = item.imageUrl;
          items[itemId].isDiscount = item.isDiscount;
          items[itemId].disPercent = item.disPercent;
          amount[itemId] = Number(sessionStorage.getItem(itemId));
          state.productsCount += Number(sessionStorage.getItem(itemId));

          if (items[itemId].isDiscount) {
            items[itemId].price =
              Math.floor(Number(items[itemId].price) * (1 - Number(items[itemId].disPercent) / 100));
            state.productsPrice += items[itemId].price * amount[itemId];
          } else {
            state.productsPrice += Number(items[itemId].price) * amount[itemId];
          }
          state.deliveryCharge = 3000;
          settingInfo();
        }         
        makeProductList(itemId);
        const plusBtn = document.querySelectorAll(".plusBtn");
        const minusBtn = document.querySelectorAll(".minusBtn");
        const checkbox = document.querySelectorAll(".checkbox");

        plusBtn.forEach((e) => e.addEventListener("click", plusAmount));
        minusBtn.forEach((e) => e.addEventListener("click", minusAmount));
        checkbox.forEach((e) => e.addEventListener("click", checkboxToggle));
        firstView();
        settingInfo();
      } catch (err) {
        console.log(err);
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }
    }
  } 
  return;
}


//+,- 누를 때 체크 해제되어 있는지 확인
function checkCheck(e) {
  return e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.classList.contains(
    "include"
  );
}

//+누를 때
function plusAmount(e) {
  if (!checkCheck(e)) {
    return alert("체크가 해제된 상품입니다.");
  }

  const itemId = e.target.parentElement.id.split("_")[1];

  if (amount[itemId] === 5) {
    return alert("최대 5개까지 구매하실 수 있습니다.");
  } else {
    amount[itemId]++;
    state.productsPrice += items[itemId].price;
    
    state.productsCount++;
    sessionStorage.setItem(itemId, amount[itemId]);
  }

  e.target.previousElementSibling.innerHTML = amount[itemId];
  const eachTotalPrice = document.querySelector(`#eachTotalPrice_${itemId}`);
  eachTotalPrice.innerHTML =
    addCommas(amount[itemId] * items[itemId].price) + "원";
  settingInfo();
  return;
}

//-누를 때
function minusAmount(e) {
  if (!checkCheck(e)) {
    return alert("체크가 해제된 상품입니다.");
  }

  const itemId = e.target.parentElement.id.split("_")[1];

  if (amount[itemId] === 1) {
    return alert("최소 수량입니다.");
  } else {
    amount[itemId]--;
    state.productsPrice -= items[itemId].price;
    state.productsCount--;
    sessionStorage.setItem(itemId, amount[itemId]);
  }

  e.target.nextElementSibling.innerHTML = amount[itemId];
  const eachTotalPrice = document.querySelector(`#eachTotalPrice_${itemId}`);
  eachTotalPrice.innerHTML =
    addCommas(amount[itemId] * items[itemId].price) + "원";
  settingInfo();
  return;
}

//모든 체크 박스 해제된 것 확인
function allCancel() {
  const includeList = document.querySelectorAll(".include");

  if (!includeList.length) {
    state.deliveryCharge = 0;
  } else {
    state.deliveryCharge = 3000;
  }
  return;
}

//체크박스 누를 때
function checkboxToggle(e) {
  e.target.classList.toggle("include");
  const itemId = e.target.parentElement.id.split("_")[1];

  if (e.target.classList.length === 1) {
    state.productsCount -= amount[itemId];
    state.productsPrice -= amount[itemId] * items[itemId].price;
    sessionStorage.removeItem(itemId);
  } else {
    state.productsCount += amount[itemId];
    state.productsPrice += amount[itemId] * items[itemId].price;
    sessionStorage.setItem(itemId, amount[itemId]);
  }

  allCancel();
  settingInfo();
  return;
}

//전체선택 누를 때
function allCheck() {
  const productElements = document.querySelectorAll(".productElement");
  const includeList = document.querySelectorAll(".include");
  const checkbox = document.querySelectorAll("input");

  if (includeList.length === 0) {
    checkbox.forEach((e) => {
      e.checked = true;
      e.classList.add("include");
      const itemId = e.parentElement.id.split("_")[1];

      state.productsCount += amount[itemId];
      state.deliveryCharge = 3000;
      state.productsPrice += Number(items[itemId].price) * amount[itemId];
      sessionStorage.setItem(itemId, amount[itemId]);
      settingInfo();
    });
  } else if (includeList.length === productElements.length) {
    checkbox.forEach((e) => {
      e.classList.remove("include");
      e.checked = false;
      const itemId = e.parentElement.id.split("_")[1];

      state.productsCount = 0;
      state.deliveryCharge = 0;
      state.productsPrice = 0;
      sessionStorage.removeItem(itemId);
      settingInfo();
    });
  } else {
    checkbox.forEach((e) => {
      if (!e.checked) {
        e.checked = true;
        e.classList.add("include");
        const itemId = e.parentElement.id.split("_")[1];

        state.productsCount += amount[itemId];
        state.deliveryCharge = 3000;
        state.productsPrice += Number(items[itemId].price) * amount[itemId];
        sessionStorage.setItem(itemId, amount[itemId]);
        settingInfo();
      }
    });
  }
  return;
}

//선택 삭제 누를 때
function delSelect() {
  const checkbox = document.querySelectorAll(".include");

  checkbox.forEach((e) => {
    const itemId = e.parentElement.id.split("_")[1];
    state.productsCount -= amount[itemId];
    state.productsPrice -= amount[itemId] * items[itemId].price;
    sessionStorage.removeItem(itemId);
    sessionStorage.setItem(
      "cart",
      sessionStorage.getItem("cart").replace(itemId, "")
    );
    e.parentElement.remove();
  });

  const resetChecked = document.querySelectorAll(".include");
  if (resetChecked.length === 0) {
    state.deliveryCharge = 0;
  }

  const itemList = sessionStorage
      .getItem("cart")
      .split(",")
      .filter((e) => e !== "");

  itemList.forEach(e => sessionStorage.setItem(e, 1));
  settingInfo();
  return;
}

//결제하기
function goToBuy() {
  sessionStorage.setItem('order', ',');
  const cartList = sessionStorage.getItem('cart');
  if (!cartList) {
    alert('장바구니에 상품이 없습니다.')
    return;
  }
  const itemList = cartList
      .split(",")
      .filter((e) => e !== "");
  itemList.forEach(itemId => {
    if (sessionStorage.getItem(itemId)) {
      sessionStorage.setItem('order', sessionStorage.getItem('order') + ',' + itemId);
    } else {
      sessionStorage.setItem(itemId, amount[itemId]);
    }
  })

  if (!sessionStorage.getItem("loginToken")) {
    alert("로그인 후 이용하실 수 있습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/users/login";
  } else {
    window.location.href = `/orders/${sessionStorage.getItem('userId')}`;
  }
}


document.querySelector("#selectAll").addEventListener("click", allCheck);
document.querySelector("#delSelect").addEventListener("click", delSelect);
document.querySelector("#goToBuy").addEventListener("click", goToBuy);
