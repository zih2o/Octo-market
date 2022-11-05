// 에디터 사용하여 마크업 덩어리로 데이터 받을 경우 id="detailContent" 박스 안을 모두 비우고 받기
// 아래는 요소 개별 선택하여 각각 데이터 넣어 주는 형식으로 작성함
import * as Api from "../api.js";
import { addCommas } from "../useful-functions.js";

// 요소 선택
const image = document.querySelector("#image");
const productName = document.querySelector("#productName");
const brand = document.querySelector("#brand");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const addToCartBtn = document.querySelector("#addToCart");
const buyNowBtn = document.querySelector("#buyNow");

const item_id = window.location.pathname.slice(1);

//서버에서 데이터 받아 각 요소에 넣어주는 함수
async function makeProductDetail() {
  const res = await fetch(`/items/${item_id}`);
  const data = await res.json();

  image.setAttribute("src", data.imageUrl);
  productName.innerHTML = data.name;
  brand.innerHTML = data.brand;
  description.innerHTML = data.description;
  price.innerHTML = `${addCommas(data.price)} 원`;
}

//장바구니 추가
async function addToCart() {

  //세션스토리지에 담겨 있는지 확인
  if (!sessionStorage.getItem("cart")) {
    sessionStorage.setItem("cart", item_id);
    return alert("장바구니에 상품이 추가 되었습니다.");
  } else if (sessionStorage.getItem("cart").includes(item_id)) {
    return alert("이미 장바구니에 추가된 상품입니다.");
  } else {
    sessionStorage.setItem(
      "cart",
      sessionStorage.getItem("cart") + "," + item_id
    );
    return alert("장바구니에 상품이 추가 되었습니다.");
  }
}

//바로 결제
async function buyNow() {
  const token = sessionStorage.getItem("token");

  //비회원은 로그인 페이지로, 회원은 장바구니로
  if (!token) {
    alert("로그인 후 이용해 주세요.");
    window.location.href = "/login";
  } else {
    sessionStorage.setItem("buyNow", item_id);
    window.location.href = "/order";
  }
}

makeProductDetail();
addToCartBtn.addEventListener("click", addToCart);
buyNowBtn.addEventListener("click", buyNow);
