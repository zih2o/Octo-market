import * as Api from "../api.js";
import {
  addCommas,
  // 회원가입 등 네비바 랜더링
  drawNavbar,
  // 토큰 보유에 따라 네비바 변화
  activeNavbar,
  // 푸터 랜더링
  drawFooter,
} from "../useful-functions.js";

// html 랜더링 관련 함수들 실행
drawNavbar();
activeNavbar();
drawFooter();

const productPriceEl = document.querySelector("#productsPrice");
const totalPrice = document.querySelector("#totalPrice");
const updateInfoBtn = document.querySelector("#correct");
const buyBtn = document.querySelector("#buy");
const userId = sessionStorage.getItem("userId");

userInfo();
buyNow();

const postData = {
  orderInfo: [],
  totalPrice: 0,
  userId: "",
  address: {},
};

//주문하기 버튼 누를 때 서버에 정보 보내서 검증하기
async function buy() {
  try {
    await Api.post(`/orders/personal/${userId}`, postData);

    alert(`주문이 완료되었습니다.`);

    // 홈페이지로 이동
    window.location.href = "/";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//회원정보 받아오는 함수
async function userInfo() {
  try {
    const userInfo = await Api.post(`/users/${userId}`);
    postData.address = userInfo.address;

    const name = document.querySelector("#secondColumn");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const postalCode = document.querySelector("#postCode");
    const adress1 = document.querySelector("#adress1");
    const adress2 = document.querySelector("#adress2");

    name.innerHTML = userInfo.name;
    email.innerHTML = userInfo.email;
    phone.innerHTML = userInfo.phoneNum;
    postalCode.innerHTML = userInfo.adress.postalCode;
    adress1.innerHTML = userInfo.adress.adress1;
    adress2.innerHTML = userInfo.adress.adress2;

    //서버에 전송할 데이터 따로 저장
    postData.address.postalCode = userInfo.adress.postalCode;
    postData.address.adress1 = userInfo.adress.adress1;
    postData.address.adress2 = userInfo.adress.adress2;
  } catch (err) {}
}

//buyNow 값 유무 확인
async function buyNow() {
  if (sessionStorage.getItem("buyNow")) {
    alert(
      "[바로 결제]를 누르신 단일 상품입니다. 장바구니의 상품과 함께 구매하시려면 장바구니에 추가한 후 이용해 주세요."
    );
    try {
      //상품 정보 받아서 html 구성
      const itemId = sessionStorage.getItem("buyNow");
      const item = await Api.get("/items", itemId);

      let price = 0;
      if (item.isDiscount) {
        price = Math.floor(Number(item.price) * (1 - Number(item.disPercent) / 100));
      } else {
        price = Number(item.price);
      }

      const productList = document.querySelector("#productList");
      productList.insertAdjacentHTML(
        "beforeend",
        `<tr>
        <td><img src="${item.imageUrl}"></td>
      <td class="productName">${item.name}</td>
      <td class="eachPrice">${addCommas(price)}원</td>
      <td class="eachCount">1개</td>
      <td class="productPrice">${addCommas(price)}원</td>
    </tr>`
      );
      productPriceEl.innerHTML = `${addCommas(price)}원`;
      totalPrice.innerHTML = `${addCommas(price + 3000)}원`;
      sessionStorage.removeItem("buyNow");

      //서버에 전송할 데이터 따로 저장
      postData.orderInfo.push({
        itemId: itemId,
        name: item.name,
        amount: 1,
        price: Number(item.price),
      });
      postData.totalPrice = Number(item.price);
      postData.userId = userId;
    } catch (err) {
      alert(
        `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
      );
    }
  } else {
    const itemsId = sessionStorage.getItem("cart");
    const itemIdArray = itemsId.split(",").filter((e) => e !== "");
    let productsPrice = 0;
    //장바구니 기반 상품 정보 받아서 html 구성
    itemIdArray.forEach(async (itemId) => {
      try {
        if (sessionStorage.getItem(itemId)) {
          const item = await Api.get("/items", itemId);

          let price = 0;
          if (item.isDiscount) {
            price = Math.floor(Number(item.price) * (1 - Number(item.disPercent) / 100));
          } else {
            price = Number(item.price);
          }

          const sum =
            Number(sessionStorage.getItem(itemId)) * price;

          const productList = document.querySelector("#productList");
          productList.insertAdjacentHTML(
            "beforeend",
            `<tr>
            <td><img src="${item.imageUrl}"></td>
          <td class="productName">${item.name}</td>
          <td class="eachPrice">${addCommas(price)}원</td>
          <td class="eachCount">${sessionStorage.getItem(itemId)}개</td>
          <td class="productPrice">${addCommas(sum)}원</td>
        </tr>`
          );
          productsPrice += sum;

          //서버에 전송할 데이터 따로 저장
          postData.orderInfo.push({
            itemId: itemId,
            name: item.name,
            amount: 1,
            price: price,
          });
        }
      } catch (err) {
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }
    });
    postData.totalPrice = productsPrice + 3000;
    postData.userId = userId;
    productPriceEl.innerHTML = `${addCommas(productsPrice)}원`;
    totalPrice.innerHTML = `${addCommas(productsPrice + 3000)}원`;
  }
}

updateInfoBtn.addEventListener("click", () => {
  alert("회원 정보 수정 페이지로 이동합니다.");
  window.location.href = "/updateInfo"; 
});

buyBtn.addEventListener("click", buy);
