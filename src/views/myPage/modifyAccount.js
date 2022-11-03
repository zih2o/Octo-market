const emailIn = document.querySelector("#emailIn")
const oldpwIn = document.querySelector("#oldpwIn")
const newpwIn = document.querySelector("#newpwIn")
const addrIn1 = document.querySelector("#sample6_address")
const addrIn2 = document.querySelector("#sample6_detailAddress")

const phone = document.querySelector("#phoneNum")
const submitBtn = document.querySelector("#submitBtn")

const userId = 1 //How can I read userId? where is token located?
submitBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const oldpw = oldpwIn.value;
    
    const newpw = newpwIn.value;
    if (newpw.length < 7 || newpw.length > 20){
        alert("비밀번호의 길이는 8자 이상 20자 이하입니다.")
        return;
    }
    
    const address = (addrIn1.value+' '+addrIn2.value);
    if (address === ' '){
        alert("주소가 공란입니다.")
        return;
    }
    
    const phoneNum = phone.value;
    console.log(phoneNum)
    if (!phoneNum){
        alert("전화번호가 공란입니다.")
        return;
    }
    if (!/^\d+$/.test(phoneNum)){
        alert("전화번호는 숫자만 입력해 주세요.")
        return;
    }

    const data = {
        oldpw,
        newpw,
        address,
        phoneNum,
    };

    const dataJson = JSON.stringify(data);
    const res = await fetch (`http://localhost:5000/users/updateinfo/${userId}`, 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: dataJson,
    })

    
})