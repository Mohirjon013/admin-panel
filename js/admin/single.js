const moreID = JSON.parse(localStorage.getItem("more-id"))

let elPersonData = document.querySelector(".person-data")
const loginData = JSON.parse(localStorage.getItem("login"))
elPersonData.textContent = loginData.username.toUpperCase()



let elPersoname = document.querySelector(".person-name")
elPersoname.textContent = moreID.name.toUpperCase()



// back start
let elBackImg = document.querySelector(".back-img")
elBackImg.addEventListener("click", function(e){
    location.pathname = "../../admin.html"
})
// back end

// render start
let elRenderWrapper = document.querySelector(".render-wrapper")
elRenderWrapper.innerHTML = `
    <img onerror ="imgmore()" class ="img-more" src="${moreID.img ? moreID.img : "../images/empty-img.png"}" alt="big img" width="200" height="216">
    <ul class="ml-[50px] mt-[20px] flex flex-col gap-[15px]">
        <li>
            <span class="font[600] text-[12px] leading-[14px] text-[#ACACAC]">Name</span>
            <p class="font[400] text-[16px] leading-[19px] text-[#000000]">${moreID.name}</p>
        </li>
        <li>
            <span class="font[600] text-[12px] leading-[14px] text-[#ACACAC]">Email</span>
            <p class="font[400] text-[16px] leading-[19px] text-[#000000]">${moreID.email}</p>
        </li>

        <li>
            <span class="font[600] text-[12px] leading-[14px] text-[#ACACAC]">Phone</span>
            <p class="font[400] text-[16px] leading-[19px] text-[#000000]">${moreID.phoneNumber}</p>
        </li>
        <li>
            <span class="font[600] text-[12px] leading-[14px] text-[#ACACAC]">Date admission</span>
            <p class="font[400] text-[16px] leading-[19px] text-[#000000]">${moreID.dateAdmis}</p>
        </li>
    </ul>
`
function imgmore(){
    let elMoreImg = document.querySelector(".img-more")
    elMoreImg.src = "../images/empty-img.png"
}
// render end


// person choose img start
let elPersonChooseInput = document.querySelector(".person-choose-input")
let elPersonChooseImg = document.querySelector(".person-choose-img")
let imgAdmin = JSON.parse(localStorage.getItem("imgAdmin"))

elPersonChooseImg.src = imgAdmin ? imgAdmin : "./images/empty-img.png"
elPersonChooseInput.addEventListener("change", function(e){
    adminnImg = URL.createObjectURL(e.target.files[0])
    localStorage.setItem("imgAdmin", JSON.stringify(adminnImg))
    elPersonChooseImg.src = adminnImg
})
// person choose img end


// logout start
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modaul-inner")
let elLogoutModul = document.querySelector(".logout-modul")
elLogoutModul.addEventListener("click", function(e){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML =`
        <div>
            <h2 class = "text-[30px] font-bold text-zinc-600 text-center my-[10px]">Do you want to log out ?</h2>
            <div class = "flex justify-between">
                <button onclick ="handleCancelBtnLogout()"  class="add-btn w-[49%] py-2 rounded-[30px] bg-amber-500 font-bold text-[25px] leading-[29px] text-white hover:bg-transparent hover:border-amber-500 hover:text-amber-500 border-[2px] border-transparent duration-300">Cancel</button>
                <button onclick ="handleYesBtnLogout()" class="add-btn w-[49%] py-2 rounded-[30px] bg-red-500 font-bold text-[25px] leading-[29px] text-white hover:bg-transparent hover:border-red-500 hover:text-red-500 border-[2px] border-transparent duration-300">Yes</button>
            </div>
        </div>
    `
})
function handleCancelBtnLogout(){
    elModalWrapper.classList.add("scale-0")
}
function handleYesBtnLogout(){
    localStorage.clear()
    location.pathname = "/"
}
// logout end
