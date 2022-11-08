// 에디터 사용하여 마크업 덩어리로 데이터 받을 경우 id="detailContent" 박스 안을 모두 비우고 받기
// 아래는 요소 개별 선택하여 각각 데이터 넣어 주는 형식으로 작성함
import { addCommas } from "../useful-functions.js";

// 요소 선택
const image = document.querySelector("#image");
const productName = document.querySelector("#productName");
const brand = document.querySelector("#brand");
const description = document.querySelector("#description");
const discount = document.querySelector(".discount");
const firstPrice = document.querySelector(".firstPrice");
const finalPrice = document.querySelector(".finalPrice");
const addToCartBtn = document.querySelector("#addToCart");
const buyNowBtn = document.querySelector("#buyNow");

//아이템아이디
const itemId = window.location.pathname.slice(1);

//서버에서 데이터 받아 각 요소에 넣어주는 함수
async function makeProductDetail() {
  try {
    const res = await fetch(`http://localhost:5050/items${itemId}`);
    const item = await res.json();

    image.setAttribute("src", item.imageUrl);
    productName.innerHTML = item.name;
    brand.innerHTML = item.brand;
    description.innerHTML = item.description;

    if (item.isDiscount) {
      firstPrice.innerHTML = `${addCommas(item.price)}원`;
      discount.innerHTML = `${item.disPercent}%`;
      finalPrice.innerHTML = `${addCommas(
        Number(item.price) * (1 - Number(item.disPercent) / 100)
      )} 원`;
    }
    finalPrice.innerHTML = `${addCommas(item.price)} 원`;
  } catch (err) {
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
  return;
}

//장바구니 추가
function addToCart() {
  //세션스토리지에 담겨 있는지 확인
  if (!sessionStorage.getItem("cart")) {
    sessionStorage.setItem("cart", itemId);
    sessionStorage.setItem(itemId, 1);
    return alert("장바구니에 상품이 추가 되었습니다.");
  } else if (sessionStorage.getItem("cart").includes(itemId)) {
    return alert("이미 장바구니에 추가된 상품입니다.");
  } else {
    sessionStorage.setItem(
      "cart",
      sessionStorage.getItem("cart") + "," + itemId
    );
    sessionStorage.setItem(itemId, 1);
    return alert("장바구니에 상품이 추가 되었습니다.");
  }
}

//바로 결제
function buyNow() {
  const token = sessionStorage.getItem("loginToken");

  //비회원은 로그인 페이지로, 회원은 장바구니로
  if (!token) {
    alert("로그인 후 이용해 주세요.");
    window.location.href = "/login";
  } else {
    sessionStorage.setItem("buyNow", itemId);
    window.location.href = "/order";
  }
  return;
}

makeProductDetail();
addToCartBtn.addEventListener("click", addToCart);
buyNowBtn.addEventListener("click", buyNow);
