import * as API from '../api.js';

//This page is rendered when URI is given as http://localhost:5050/admin/items

const prodName = document.querySelector('#productName')
const prodBrand= document.querySelector('#productBrand')
const prodCate = document.querySelector('#productCategory')
const prodDesc = document.querySelector('#productDesc')
const prodSrc  = document.querySelector('#productSrc')
const prodPrice= document.querySelector('#productPrice')
const btnSubmit= document.querySelector
('#btnSubmit')

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


const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
const emailToken = sessionStorage.getItem('userEmail')

addAllElements()
addAllEvents()

// Event grouper
function addAllElements() {
    isLoggedIn();
    isAdmin();
    getCategory();
}
function addAllEvents() {
    btnSubmit.addEventListener('click', addItemtoDB)
}


async function getCategory() {
    const category = resCate.categories;
    // const res = await API.get('http://localhost:5050/categories');
    // const category = JSON.parse(res.body).categories;
    
    for (let i=0; i<category.length;i++)
        prodCate.insertAdjacentHTML("beforeend", `<option>${category[i].name}</option>`)
}


async function addItemtoDB () {
    const name = prodName.value;
    const brand = prodBrand.value;
    const price = prodPrice.value;
    const description = prodDesc.value;
    const src = prodSrc.value;
    const category = prodCate.value;

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
        // const res = JSON.stringify({
        //     status : 403, 
        //     body : {
        //         statusCode: 403,
        //         reason: '접근 권한이 없습니다.'
        //     },
        // })
        if (res.status === 201)
            return alert("상품이 정상적으로 추가되었습니다");
        else
            return alert(JSON.parse(res.body).reason)
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