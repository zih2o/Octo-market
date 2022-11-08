import * as Api from '../api.js';

//This page is rendered when URI is given as /admin/items

const prodName = document.querySelector('#productName');
const prodBrand= document.querySelector('#productBrand');
const prodCate = document.querySelector('#productCategory');
const prodDesc = document.querySelector('#productDesc');
const prodSrc  = document.querySelector('#productSrc');
const prodPrice= document.querySelector('#productPrice');
const btnSubmit= document.querySelector('#btnSubmit');
const filebtn  = document.querySelector(".file-input");
const filename = document.querySelector(".file-name")
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


const {accessToken, userId, userType} = {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY4YmRmNzQ5ZGZlODA4OTg4ZWEyMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njc4OTk2NTYsImV4cCI6MTY2Nzk4NjA1Nn0.A62VUIXHdHdJocM-ws40oEeq4ppj9N3sf6tfP33WWmI",
    "userId": "6368bdf749dfe808988ea212",
    "userType": "admin"
}
sessionStorage.setItem('token', accessToken)

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
    filebtn.addEventListener('change', fileHandler)
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
    filename.innerHTML = imageUrl

    
}



async function getCategory() {
    try {
        const category = await Api.get('/categories');
        for (let i=0; i<category.length;i++)
            prodCate.insertAdjacentHTML("beforeend", `<option>${category[i].name}</option>`)
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
        const res = await Api.post(`/admin/items`, data);
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