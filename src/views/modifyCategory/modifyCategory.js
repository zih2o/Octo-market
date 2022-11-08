import * as Api from '../api.js';

const catchselect = document.querySelector("#category");
const selectBox = document.querySelector("#selectBox");
const submitBtn = document.querySelector("#btnSubmit");

// Data mocked
const {accessToken, userId, userType} = {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY4YmRmNzQ5ZGZlODA4OTg4ZWEyMTIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njc4NzU1MTh9.jaHZAFtGgXdvUWw_QoQyWztNjIQGCCyOZZd_mWlTbuU",
  "userId": "6368bdf749dfe808988ea212",
  "userType": "admin"
};
sessionStorage.setItem('token', accessToken)

var categories = await getCategory();
// const categories = [`
// <option>1</option>
// <option>2</option>
// <option>3</option>
// <option>4</option>
// <option>5</option>
// <option>6</option>
// <option>7</option>
// `, 7, [1,2,3,4,5,6,7]]




// const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
// const emailToken = sessionStorage.getItem('userEmail')

addAllElements();
addAllEvents();


function addAllElements() {
  isLoggedIn();
  isAdmin();
  initializeForm(categories[1]);
}
function addAllEvents() {
  catchselect.addEventListener('change', categoryModify)
  submitBtn.addEventListener('click', submitModify)
  submitBtn.addEventListener('click', updateCategory)
}

async function updateCategory () {
  categories = await getCategory();
}



async function categoryModify () {
  const numCategory = categories[1];
  if (numCategory > 7 & catchselect.value === "생성")
    return alert("카테고리는 8개 이하만 생성해 주세요.")
  else
  {
    selectBox.innerHTML = template(catchselect.value);  
  }
}

async function submitModify () {
  const selectedAction = catchselect.selectedIndex;

  // post
  if (selectedAction === 0)
  {
    if (categories[1] > 7){
      alert ("카테고리를 더 추가할 수 없습니다.")
      catchselect.value = "생성"
      return
    }
    const name = document.querySelector('.input').value;
    if (name.length > 6)
      return alert ("카테고리 이름은 여섯 글자 이하입니다.")

    const data = {
      name,
    }
    const res = await Api.post('/admin/categories', data)
    categories = await getCategory();
    if (res.statusCode)
      return alert(res.reason);
    else
      return alert("성공적으로 등록되었습니다.")
  }
  // put
  else if (selectedAction === 1)
  {
    const categoryInd = document.querySelectorAll('select')[1].selectedIndex;
    const data = {
      name : document.querySelector('.input').value,
    }
    const catId = categories[2][categoryInd];
    const res = await Api.put(`/admin/categories/${catId}`, data)
    categories = await getCategory();
    console.log("modify response : ",res)
    if (res.statusCode)
      return alert(res.reason);
    else
      return alert("성공적으로 수정되었습니다.")
  }
  // delete
  else if (selectedAction === 2)
  {
    const categoryInd = document.querySelectorAll('select')[1].selectedIndex;
    const catId = categories[2][categoryInd];
    const res = await Api.delete(`/admin/categories/${catId}`)
    categories = await getCategory();
    console.log("delete Response : ",res);
    if (res.success)
      return alert("성공적으로 삭제되었습니다.");
    else
      return alert(res.reason)
  }
}


function template(option) {
  if (option === "생성")
    return `<div class="field">
    <label class="label">카테고리 생성</label>
    <div class="control">
        <input class="input" placeholder="생성할 카테고리 이름을 적어주세요">
    </div>
    </div>`
  else if (option === "수정")
    return `<div class="field">
    <label class="label">수정할 카테고리를 선택하세요</label>
    <div class="control">
      <div class="select is-primary">
        <select>
          ${categories}
        </select>
      </div>
    </div>
    </div>
    <div class="field">
    <label class="label">카테고리의 새 이름을 정해주세요</label>
    <div class="control">
        <input class="input" type="text" placeholder="수정할 카테고리 이름을 적어주세요">
    </div>
    </div>`
  else if (option === "삭제")
  return `<div class="field">
    <label class="label">삭제할 카테고리를 선택하세요</label>
    <div class="control">
      <div class="select is-primary">
        <select>
          ${categories}
        </select>
      </div>
    </div>
    </div>`
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
      return [retHTML, category.length, categoryId]
  }
  catch (e)
  {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

function initializeForm(numCategory)
{
  if (numCategory > 7)
  {
    catchselect.value = "수정"
    selectBox.innerHTML = template("수정")
  }
  else
  {
    catchselect.value = "생성"
    selectBox.innerHTML = template("생성")
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