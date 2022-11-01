const loggedAdmin = document.querySelector('#is-admin');

var admin = false;
var adminTemplate = 
`
<span class="">관리자 옵션</span>
    <ul>
        <li><a>상품 추가/삭제</a></li>
    </ul>
`

isAdmin();
function isAdmin()
{
    if (admin)
        loggedAdmin.insertAdjacentHTML('beforeend', adminTemplate)
}