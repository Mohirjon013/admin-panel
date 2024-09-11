let elRegisterForm = document.querySelector(".register-form")
let elRegisterBtn = document.querySelector(".register-btn")
elRegisterForm.addEventListener("submit", function(e){
    e.preventDefault()
    const newData = {
        newUsername:e.target.user.value,
        newPassword:e.target.password.value
    }
    elRegisterBtn.innerHTML =`<img class ="mx-auto scale-[1]" src="../images/login-icon.png" alt="" width="40" >`
    elRegisterBtn.classList.remove("py-[14px]")
    localStorage.setItem("isRegistered", JSON.stringify(newData))
    setTimeout(() => {
        location.pathname ="/"
    }, 800);
})