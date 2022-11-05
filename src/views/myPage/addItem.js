import * as API from '../api.js';

const prodName = document.querySelector('productName')
const prodBrand= document.querySelector('productBrand')
const prodCate = document.querySelector('productCategory')
const prodDesc = document.querySelector('productDesc')
const prodSrc  = document.querySelector('productSrc')
const prodPrice= document.querySelector('productPrice')

addItemtoDB()

async function addItemtoDB () {
    /* Login validation */
    const token = sessionStorage.getItem("token");
    if (!token){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/login";
    } 
    /* Admin validation is needed */


    const name = prodName.value;
    const brand = prodBrand.value;
    const price = prodPrice.value;
    const description = prodDesc.value;
    const src = prodSrc.value;
    const category = category.value

    const data = {
        name,
        brand,
        price,
        description,
        src,
        category,
    }
    try {
        const res = await API.post(`http://localhost:5050/admin/items`, data);
        if (res === 201)
            alert("상품이 정상적으로 추가되었습니다");
    }
    catch(e)
    {
        console.error(e.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
    }
}

