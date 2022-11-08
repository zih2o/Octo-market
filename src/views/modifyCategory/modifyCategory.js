import * as Api from '../api.js';

const modify = document.querySelector("#selectCategory");
const catchselect = document.querySelector("#category");
const selectBox = document.querySelector("#selectBox");
const submitBtn = document.querySelector("#btnSubmit");

// Data mocked
sessionStorage.setItem('loginToken', JSON.stringify({
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY0OWI5ZDgwYTMzZTUwMWNlNWY5NDYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY2NzUzODI5OX0.38U02nnJHS_UaEdR5weEll3wKzLE1zS-_f6FTIkdB10",
    userId: "63649b9d80a33e501ce5f946",
    userType: "admin",
}))
sessionStorage.setItem('userEmail', 'semin0706@naver.com')

//const categories = getCategory()
const categories = [`
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>
`, 7, [1,2,3,4,5,6,7,8]]




const {accessToken, userId, userType} = JSON.parse(sessionStorage.getItem('loginToken'));
const emailToken = sessionStorage.getItem('userEmail')

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
    const data = {
      name : document.querySelector('.input').value,
    }
    const res = API.post('/admin/categories', data)
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
    const res = API.put(`/admin/categories/${catId}`, data)
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
    const res = API.delete(`/admin/categories/${catId}`, data)
    if (res.statusCode)
      return alert(res.reason);
    else
      return alert("성공적으로 삭제되었습니다.")
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
  const res = await API.get('/categories');
  const category = res.categories;
  var retHTML = ``;
  var categoryId = [];
  if (res.status === 200){
      for (let i=0; i<category.length;i++)
      {
          retHTML += `<option>${category[i].name}</option>`
          categoryId.push(category[i]._id)
        }
      return [retHTML, category.length, categoryId]
  }
  else
    return alert("카테고리 조회에 실패하였습니다")
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