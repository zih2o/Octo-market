//임시 데이터
const data = [
  {
    name: "고등어",
    brand: "청년수산",
    price: "10000",
    description: "맛있엉",
    imageUrl: "http://ddd",
  },
  {
    name: "갈치",
    brand: "청년수산",
    price: "12000",
    description: "맛있엉",
    imageUrl: "http://ddd",
  },
  {
    name: "이면수",
    brand: "청년수산",
    price: "11000",
    description: "맛있엉",
    imageUrl: "http://ddd",
  },
];

//임시 셋팅
sessionStorage.setItem("cart", "0,1,2");

//임시 함수
const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//기본 데이터 셋팅
//모든 상품 목록
const items = {};
//개별 상품 개수
const amount = {};
//총 결제 정보
const state = {
  productsCount: 0,
  deliveryCharge: 0,
  productsPrice: 0,
};

const productsCount = document.querySelector("#productsCount");
const productsPrice = document.querySelector("#productsPrice");
const deliveryCharge = document.querySelector("#deliveryCharge");
const totalPrice = document.querySelector("#totalPrice");

function settingInfo() {
  productsCount.innerHTML = state.productsCount + "개";
  productsPrice.innerHTML = state.productsPrice + "원";
  deliveryCharge.innerHTML = state.deliveryCharge + "원";
  totalPrice.innerHTML = state.productsPrice + state.deliveryCharge + "원";
  return;
}

//데이터 받아서 item에 저장하기 + 첫 화면 장바구니 목록 구성
async function itemSave() {
  if (!sessionStorage.getItem("cart")) {
    return;
  } else {
    const itemList = sessionStorage.getItem("cart").split(",");
    itemList.forEach((itemId) => (items[itemId] = {}));
    itemList.forEach((itemId) => {
      // const res = await fetch(`http://localhost:5050/items/${itemId}`);
      // const item = await res.json();

      //임시 코드
      const item = data[itemId];

      items[itemId].name = item.name;
      items[itemId].price = Number(item.price);
      amount[itemId] = 1;
      state.productsPrice += Number(item.price);
      state.productsCount++;

      const cartList = document.querySelector("#cartList");
      cartList.insertAdjacentHTML(
        "beforeend",
        ` <div class="productElement" id="check_${itemId}">
              <label class="checkbox include">
                <input type="checkbox"/>
              </label>
            <div class="productimg" ><img src=${item.imageUrl}/></div>
          <div class="productDescription">
            <span class="productName is-size-5">${items[itemId].name}</span>
            <span class="eachPrice">${addCommas(items[itemId].price)}원</span>
            <nav class="eachAmount" data-itemid="${itemId}">
              <button class="minusBtn">-</button>
              <span>1</span>
              <button class="plusBtn">+</button>
            </nav>
            <span class="eachTotalPrice" id="eachTotalPrice_${itemId}">${addCommas(
          items[itemId].price
        )}원</span>
          </div>
        </div>`
      );
    });
    state.deliveryCharge = 3000;
    const checkbox = document.querySelectorAll("input");
    checkbox.forEach((e) => {
      e.checked = true;
    });
  }
  return;
}
itemSave();
settingInfo();

//+,- 누를 때 체크 해제되어 있는지 확인
function checkCheck(e) {
  return e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.classList.contains(
    "include"
  );
}

//+버튼 누를 때
function plusAmount(e) {
  if (!checkCheck(e)) {
    return alert("체크가 해제된 상품입니다.");
  }

  const itemId = e.target.closest(".eachAmount").dataset.itemid;
  if (amount[itemId] === 5) {
    return alert("최대 5개까지 구매하실 수 있습니다.");
  } else {
    amount[itemId]++;
    state.productsPrice += items[itemId].price;
    state.productsCount++;
  }

  e.target.previousElementSibling.innerHTML = amount[itemId];
  const eachTotalPrice = document.querySelector(`#eachTotalPrice_${itemId}`);
  eachTotalPrice.innerHTML =
    addCommas(amount[itemId] * items[itemId].price) + "원";
  settingInfo();
  return;
}

//-버튼 누를 때
function minusAmount(e) {
  if (!checkCheck(e)) {
    return alert("체크가 해제된 상품입니다.");
  }

  const itemId = e.target.closest(".eachAmount").dataset.itemid;
  if (amount[itemId] === 1) {
    return alert("최소 수량입니다.");
  } else {
    amount[itemId]--;
    state.productsPrice -= items[itemId].price;
    state.productsCount--;
  }

  e.target.nextElementSibling.innerHTML = amount[itemId];
  const eachTotalPrice = document.querySelector(`#eachTotalPrice_${itemId}`);
  eachTotalPrice.innerHTML =
    addCommas(amount[itemId] * items[itemId].price) + "원";
  settingInfo();
  return;
}

//체크박스 누를 때
function checkboxToggle(e) {
  e.target.parentElement.classList.toggle("include");
  const itemId = e.target.closest(".productElement").id.split("_")[1];

  if (e.target.parentElement.classList.length === 1) {
    state.productsCount -= amount[itemId];
    state.productsPrice -= amount[itemId] * items[itemId].price;
  } else {
    state.productsCount += amount[itemId];
    state.productsPrice += amount[itemId] * items[itemId].price;
  }
  allCancel();
  settingInfo();
  return;
}

//모든 체크 박스 해제된 것 확인
function allCancel() {
  const includeList = document.querySelectorAll(".include");
  if (!includeList.length) {
    state.deliveryCharge = 0;
    document.querySelector("#allCheckbox").firstElementChild.checked = false;
  } else {
    state.deliveryCharge = 3000;
  }
  return;
}

//전체선택 누를 때
function allCheck() {
  const cheked = document.querySelectorAll(".include");
  const productElements = document.querySelectorAll(".productElement");

  if (cheked.length === productElements.length) {
    const checkbox = document.querySelectorAll("input");
    checkbox.forEach((e) => {
      e.checked = false;
    });

    state.productsCount = 0;
    state.deliveryCharge = 0;
    state.productsPrice = 0;
    settingInfo();
    return;
  }

  const checkList = document.querySelectorAll("label");
  const cartListArray = Array.from(checkList);
  cartListArray.shift();

  cartListArray.forEach((e) => {
    if (!e.classList.contains("include")) {
      e.classList.add("include");
      e.firstElementChild.checked = true;

      const itemId = e.parentElement.id.split("_")[1];
      state.productsCount += amount[itemId];
      state.productsPrice += amount[itemId] * items[itemId].price;
    }
  });

  settingInfo();
  return;
}

//선택삭제 누를 때
function deleteSelec() {
  const cheked = document.querySelectorAll(".include");

  if (!cheked.length) {
    return;
  } else {
    cheked.forEach((e) => {
      const itemId = e.parentElement.id.split("_")[1];
      state.productsCount -= amount[itemId];
      state.productsPrice -= amount[itemId] * items[itemId].price;
      e.parentElement.remove();
    });
  }
  return;
}

//결제하기 버튼 눌렀을 때
function goToBuy() {
  if (sessionStorage.getItem("userToken")) {
    const cartList = document.querySelectorAll(".productElement");
    const checkList = document.querySelectorAll(".include");

    if (!cartList) {
      return alert("장바구니에 담은 상품이 없습니다.");
    }

    if (!checkList.length) {
      return alert("선택한 상품이 없습니다.");
    }

    checkList.forEach((e) => {
      const itemId = e.parentElement.id.split("_")[1];
      sessionStorage.setItem(items[itemId].name, amount[itemId]);
    });
    sessionStorage.setItem("count", state.productsCount);
    sessionStorage.setItem("total", state.productsPrice + 3000);
    window.location.href = "/order";
  } else {
    alert("로그인 페이지로 이동합니다.");
    window.location.href = "/login";
  }
}

const plusBtn = document.querySelectorAll(".plusBtn");
plusBtn.forEach((e) => e.addEventListener("click", plusAmount));

const minusBtn = document.querySelectorAll(".minusBtn");
minusBtn.forEach((e) => e.addEventListener("click", minusAmount));

const checkbox = document.querySelectorAll(".checkbox");
checkbox.forEach((e) => e.addEventListener("click", checkboxToggle));

document.querySelector("#selectAll").addEventListener("click", allCheck);
document.querySelector("#deleteSelec").addEventListener("click", deleteSelec);
document.querySelector("#goToBuy").addEventListener("click", goToBuy);
