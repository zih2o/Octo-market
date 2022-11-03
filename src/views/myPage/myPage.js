const pwBtn = document.querySelector("#pwSubmitBtn")
const pwInput = document.querySelector('.input')

/* Dummy password */
const pw = "1111"

pwBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    /* This part must be handled with additional api 
    that compares pwInput value, hash it, compare with actual hased pw, and returns boolean. */
    if (pwInput.value !== pw)
        alert("비밀번호가 일치하지 않습니다")

    
})