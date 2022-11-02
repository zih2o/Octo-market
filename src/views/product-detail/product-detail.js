// 에디터 사용하여 마크업 덩어리로 데이터 받을 경우 id="detailContent" 박스 안을 모두 비우고 받기
// 아래는 요소 개별 선택하여 각각 데이터 넣어 주는 형식으로 작성함
// import * as Api from '/api.js';

//요소 선택
//이미지 데이터 관리 방법 결정 전이므로 우선 주석처리
// const image = document.querySelector('#image');
const productName = document.querySelector('#productName');
const brand = document.querySelector('#brand');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const addToCart = document.querySelector('#addToCart');
const buy = document.querySelector('#buy');

makeProductDetail();

const addCommas = n => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

//서버에서 데이터 받아 각 요소에 넣어주는 함수
function makeProductDetail() {
  // const res = await fetch('http://localhost:5000/items/:item_id');
  // const data = await res.json();
  const data = {
    items: {
      name: '쫄바지',
      brand: '나익기',
      price: '12000',
      description: '따뜻하고 쫀쫀해요',
    },
    message: 'success',
  };

  const productDatails = data.items;

  productName.innerHTML = productDatails.name;
  brand.innerHTML = productDatails.brand;
  description.innerHTML = productDatails.description;
  price.innerHTML = `${addCommas(productDatails.price)} 원`;
}
