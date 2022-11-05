//임시 셋팅
sessionStorage.setItem("cart", "0,1,2");

//임시 함수
const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//임시 데이터
const items = [
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

//요소 선택
const productsCount = document.querySelector("#productsCount");
const productsPrice = document.querySelector("#productsPrice");
const deliveryCharge = document.querySelector("#deliveryCharge");
const totalPrice = document.querySelector("#totalPrice");

//저장한 값을 화면에 적용
function settingInfo() {
  let totalCount = 0;
  for (let key in amount) {
    totalCount += amount[key];
  }
  productsCount.innerHTML = totalCount + "개";
  productsPrice.innerHTML = state.productsPrice + "원";
  deliveryCharge.innerHTML = state.deliveryCharge + "원";
  totalPrice.innerHTML = state.productsPrice + state.deliveryCharge + "원";
  return;
}

//상품별 데이터 받는 함수
// const datafunction = async (itemId) => {
//   const res = await fetch(`/items/${itemId}`);
//   const item = await res.json();
//   return item;
// };
//임시
const datafunction = (itemId) => {
  return items[itemId];
};

//+버튼 눌렀을 때
async function plusAmount(e) {
  e.preventDefault();

  const amountNumber = e.target.previousElementSibling;
  const itemId = amountNumber.dataset.itemId;
  const item = datafunction(itemId);

  if (amount[itemId] === 5) {
    return alert("5개까지 구매하실 수 있습니다.");
  }

  amount[itemId]++;
  amountNumber.innerHTML = amount[itemId];

  const eachPrice = e.target.parentElement.nextElementSibling;
  eachPrice.innerHTML = addCommas(amount[itemId] * Number(item.price));

  state.productsPrice += Number(item.price);
  settingInfo();
  return;
}

//-버튼 눌렀을 때
function minusAmount(e) {
  e.preventDefault();

  const amountNumber = e.target.nextElementSibling;
  const itemId = amountNumber.getAttribute("id").split("_")[1];
  if (amount[itemId] === 1) {
    return alert("최소 수량입니다.");
  }

  amount[itemId]--;
  amountNumber.innerHTML = amount[itemId];

  const item = datafunction(itemId);

  const eachPrice = e.target.parentElement.nextElementSibling;
  eachPrice.innerHTML = addCommas(amount[itemId] * Number(item.price));

  state.productsPrice -= Number(item.price);
  settingInfo();
  return;
}

//상품별 체크버튼 토글할 때
function checkboxToggle(e) {
  e.target.classList.toggle("include");

  const checkList = document.querySelectorAll(".include");
  state.productsCount = 0;
  state.productsPrice = 0;
  state.deliveryCharge = 0;

  if (!checkList.length) {
    amount = {};
    settingInfo();
    return;
  } else {
    state.deliveryCharge = 3000;
    checkList.forEach((e) => {
      const itemId = e.dataset.itemid;
      const item = datafunction(itemId);

      state.productsCount += amount[itemId];
      state.productsPrice += amount[itemId] * Number(item.price);
    });
    settingInfo();
    return;
  }
}

//결제하기 버튼 눌렀을 때
function goToBuy() {
  const cartList = document.querySelectorAll(".productElement");
  const checkList = document.querySelectorAll(".include");

  if (!cartList) {
    return alert("장바구니에 담은 상품이 없습니다.");
  }

  if (!checkList.length) {
    return alert("선택한 상품이 없습니다.");
  }
  sessionStorage.setItem("count", state.productsCount);
  sessionStorage.setItem("total", state.productsPrice + 3000);
  window.location.href = "/order";
}

//상품의 개별 수랑을 저장하는 객체
const amount = {};

//결제 정보를 저장하는 객체
const state = {
  productsCount: 0,
  productsPrice: 0,
  deliveryCharge: 3000,
};

//페이지 입장 시 첫 화면 구성
async function firstCartList() {
  if (!sessionStorage.getItem("cart")) {
    state.deliveryCharge = 0;
    return;
  } else {
    const itemList = sessionStorage.getItem("cart").split(",");
    console.log(itemList);

    itemList.forEach((itemId) => {
      const item = datafunction(itemId);

      amount[itemId] = 1;
      state.productsPrice += Number(item.price);

      const cartList = document.querySelector("#cartList");
      cartList.insertAdjacentHTML(
        "beforeend",
        ` <div class="productElement">
            <div>
              <label class="checkbox">
                <input type="checkbox" class="include" data-itemid="${itemId}"/>
              </label>
            </div>
            <div class="productimg" ><img src=${item.imageUrl}/></div>
          <div class="productDescription">
            <span class="productName is-size-5">${item.name}</span>
            <span class="eachPrice">${addCommas(item.price)}원</span>
            <nav class="eachAmount">
              <button class="minusBtn"><i class="fa-solid fa-minus"></i></button>
              <span id="amount_${itemId} data-itemid="${itemId}">1</span>
              <button class="plusBtn"><i class="fa-solid fa-plus"></i></button>
            </nav>
            <span class="eachTatalPrice">${addCommas(item.price)}원</span>
          </div>
        </div>`
      );
    });
  }
  const checkbox = document.querySelectorAll("input");
  checkbox.forEach((e) => (e.checked = true));
  settingInfo();
}

firstCartList();

document.querySelectorAll(".plusBtn").forEach((e) => {
  e.addEventListener("click", plusAmount);
});

document.querySelectorAll(".minusBtn").forEach((e) => {
  e.addEventListener("click", minusAmount);
});

const input = document.querySelectorAll("input");
const productCheckbox = Array.from(input);

for (let i = 1; i < productCheckbox.length; i++) {
  productCheckbox[i].addEventListener("click", checkboxToggle);
}

document.querySelector("#goToBuy").addEventListener("click", goToBuy);
document
  .querySelector("#deleteSelec")
  .addEventListener("click", (e) => e.preventDefault());
