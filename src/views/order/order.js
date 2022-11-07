import * as Api from "../api.js";
import { addCommas } from "../useful-functions.js";

const reqData = {
  orderInfo: [
    {
      itemId: "",
      name: "",
      amount: 0,
      price: 0,
    },
  ],
  totalPrice: 0,
  email: sessionStorage.getItem("userEmail"),
  address: {
    postalCode: "",
    address1: "",
    address2: "",
  },
};

sessionStorage.setItem("cart", "0,,2,3,4");
sessionStorage.setItem("0", "1");
sessionStorage.setItem("3", "3");
sessionStorage.setItem("4", "2");

const productPriceEl = document.querySelector("#productsPrice");
const totalPrice = document.querySelector("#totalPrice");
const updateInfoBtn = document.querySelector("#correct");
const buyBtn = document.querySelector("#buy");

updateInfoBtn.addEventListener("click", () => {
  alert("회원 정보 수정 페이지로 이동합니다.");
  window.location.href = `/updateinfo/${sessionStorage.getItem("userEmail")}`;
});

buy();
userInfo();
buyNow();

//주문하기 버튼 누를 때 서버에 정보 보내서 검증하기
async function buy() {}

//회원정보 받아오는 함수
// async function userInfo() {
//   const userId = sessionStorage.getItem("userEmail");
//   const user = await Api.post(`/ /${userId}`);
// }

//buyNow 값 유무 확인
async function buyNow() {
  if (sessionStorage.getItem("buyNow")) {
    alert(
      "[바로 결제]를 누르신 단일 상품입니다. 장바구니의 상품과 함께 구매하시려면 장바구니에 추가한 후 이용해 주세요."
    );
    const itemId = sessionStorage.getItem("buyNow");
    // const item = Api.get("/items", itemId);
    const item = data[itemId];
    const productList = document.querySelector("#productList");
    productList.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td><img src="${item.imageUrl}"></td>
      <td class="productName">${item.name}</td>
      <td class="eachPrice">${addCommas(item.price)}원</td>
      <td class="eachCount">1개</td>
      <td class="productPrice">${addCommas(item.price)}원</td>
    </tr>`
    );
    productPriceEl.innerHTML = `${addCommas(item.price)}원`;
    totalPrice.innerHTML = `${addCommas(Number(item.price) + 3000)}원`;
    sessionStorage.removeItem("buyNow");
  } else {
    const itemsId = sessionStorage.getItem("cart");
    const itemIdArray = itemsId.split(",").filter((e) => e !== "");
    let productsPrice = 0;

    //장바구니 기반 세션 스토리지 값 받아와 상품 목록 생성
    itemIdArray.forEach(async (itemId) => {
      try {
        if (sessionStorage.getItem(itemId)) {
          const item = await Api.get("/items", itemId);

          const sum =
            Number(sessionStorage.getItem(itemId)) * Number(item.price);

          const productList = document.querySelector("#productList");
          productList.insertAdjacentHTML(
            "beforeend",
            `<tr>
            <td><img src="${item.imageUrl}"></td>
          <td class="productName">${item.name}</td>
          <td class="eachPrice">${addCommas(item.price)}원</td>
          <td class="eachCount">${sessionStorage.getItem(itemId)}개</td>
          <td class="productPrice">${addCommas(sum)}원</td>
        </tr>`
          );

          productsPrice += sum;
        }
      } catch (err) {
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }
    });
    productPriceEl.innerHTML = `${addCommas(productsPrice)}원`;
    totalPrice.innerHTML = `${addCommas(productsPrice + 3000)}원`;
  }
}
