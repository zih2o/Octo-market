import * as Api from '../../api.js';

//This page is rendered when URI is given as /admin/items

const prodName = document.querySelector('#productName');
const prodBrand= document.querySelector('#productBrand');
const prodCate = document.querySelector('#productCategory');
const prodDesc = document.querySelector('#productDesc');
const prodPrice= document.querySelector('#productPrice');
const btnSubmit= document.querySelector('#btnSubmit');
const isRecom = document.querySelector('#isRecommend');
const isDisc = document.querySelector('#isDiscount');
const discRate = document.querySelector('#discountRate')
const filebtn  = document.querySelector(".file-input");
const filename = document.querySelector(".file-name");
// Data mocked
// sessionStorage.setItem('loginToken', JSON.stringify({
//     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY0OWI5ZDgwYTMzZTUwMWNlNWY5NDYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2NzUzODI5OX0.38U02nnJHS_UaEdR5weEll3wKzLE1zS-_f6FTIkdB10",
//     userId: "63649b9d80a33e501ce5f946",
//     userType: "admin"
// }))
// sessionStorage.setItem('userEmail', 'semin0706@naver.com')

// resCate = {
//     categories: [{
//         _id: "A",
//         name: "11111111111111111111",
//         },
//         {
//         _id: "B",
//         name: "2",
//         },
//         {
//         _id: "C",
//         name: "3",
//         },
//     ],
//     message: "success",
// }


// const {accessToken, userId, userType} = {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY4YmRmNzQ5ZGZlODA4OTg4ZWEyMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njc4OTk2NTYsImV4cCI6MTY2Nzk4NjA1Nn0.A62VUIXHdHdJocM-ws40oEeq4ppj9N3sf6tfP33WWmI",
//     "userId": "6368bdf749dfe808988ea212",
//     "userType": "admin"
// }
// sessionStorage.setItem('token', accessToken)
const accessToken = sessionStorage.getItem("loginToken")
const userId = sessionStorage.getItem("userId")
const userType = sessionStorage.getItem("adminToken")

var fileSrc= "";
var categories = await getCategory();

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    isLoggedIn();
    isAdmin();
}

function addAllEvents() {
    filebtn.addEventListener('change', fileHandler)
    isDisc.addEventListener('change', enableDiscRate)
    btnSubmit.addEventListener('click', addItemtoDB)
}


function enableDiscRate(e) {
    if (e.currentTarget.checked)
        discRate.disabled = false;
    else
        discRate.disabled = true;
}


async function fileHandler(e) {
    // console.log(e.target.files[0])
    let formData = new FormData();
    formData.append("image", e.target.files[0])

    console.log(formData)
    const res = await fetch('/admin/items/upload', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    })

    const {imageUrl} = await res.json()
    filename.innerHTML = e.target.files[0].name
    fileSrc = imageUrl;
}



async function getCategory() {
    // const category = resCate.categories;
    try{
    const category = await Api.get('/categories');
    var retHTML = ``;
    var categoryId = [];
    
        for (let i=0; i<category.length;i++)
        {
            retHTML += `<option>${category[i].name}</option>`
            categoryId.push(category[i]._id)
          }
        prodCate.insertAdjacentHTML("beforeend", retHTML);
        return [retHTML, category.length, categoryId]
    }
    catch (e)
    {
      console.error(err.stack);
      alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
  }
  


async function addItemtoDB () {
    const name = prodName.value;
    const brand = prodBrand.value;
    const price = prodPrice.value;
    const description = prodDesc.value;
    const category = categories[2][prodCate.selectedIndex];

    const imageUrl = fileSrc;
    const isRecommend = isRecom.checked;
    const isDiscount = isDisc.checked;
    const disPercent = discRate.value ? discRate.value : 1;

    if (!name)
        return alert ("상품명을 입력해 주세요.")
    if (!brand)
        return alert ("브랜드를 입력해 주세요.")
    if (!/^\d+$/.test(price))
        return alert ("가격은 숫자만 입력하셔야 합니다.")
    if (description.length < 10)
        return alert ("설명은 10자 이상이어야 합니다.")
    if (!imageUrl)
        return alert ("상품 사진을 선택해 주세요.")
    
    const data = {
        name,
        brand,
        price,
        description,
        category,
        imageUrl,
        isRecommend,
        isDiscount,
        disPercent,
    }
    try {
        const res = await Api.post(`/admin/items`, data);
        if (res.id)
            return alert("상품이 정상적으로 추가되었습니다");
    }
    catch(e)
    {
        console.error(e.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
    }
}


function isLoggedIn() 
{
    if (!accessToken){
        alert("로그인 후 이용해 주세요.");
        window.location.href = "/login";
    } 
}


function isAdmin()
{
    if (userType !== "admin"){
        alert("관리자가 아닙니다")
        window.location.href = "/login";
    }
}