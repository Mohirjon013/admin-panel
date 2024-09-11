let elLoginForm = document.querySelector(".login-form")
let elLoginBtn = document.querySelector(".login-btn")


const isRegistered = JSON.parse(localStorage.getItem("isRegistered"))

elLoginForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        username:e.target.user.value,
        password:e.target.password.value
    }
    if(isRegistered){

        if(data.username == isRegistered.newUsername && data.password == isRegistered.newPassword){
            elLoginBtn.innerHTML =`<img class ="mx-auto scale-[1]" src="../images/login-icon.png" alt="" width="40" >`
            elLoginBtn.classList.remove("py-[14px]")
            localStorage.setItem("login",JSON.stringify(data))
            setTimeout(() => {
                location.pathname ="../../admin.html"
            }, 800);
        }
        else{
            alert("u got a problem !!!")
        }
    }
    else{
        if(data.username == "mohirjon"&& data.password == "123"){
            elLoginBtn.innerHTML =`<img class ="mx-auto scale-[1]" src="../images/login-icon.png" alt="" width="40" >`
            elLoginBtn.classList.remove("py-[14px]")
            localStorage.setItem("login",JSON.stringify(data))
            setTimeout(() => {
                location.pathname ="../../admin.html"
            }, 800);
        }
        else{
            alert("u got a problem !!!")
        }
    }
})
