let elPersonData = document.querySelector(".person-data")
const loginData = JSON.parse(localStorage.getItem("login"))
elPersonData.textContent = loginData.username.toUpperCase()



let elRenderList = document.querySelector(".render-list")
let products = JSON.parse(localStorage.getItem("product"))||  []


// add Product start
function handleProductBtnClick(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
        <form class ="add-product-form">
            <label>
                <input class="choosen-input hidden" type="file">
                <img class = "choosen-img mx-auto rounded-lg" src="./images/empty-img.png" alt="Choose img" width="200" height="150">
            </label>

            <div class ="flex justify-between mt-[20px]">
                <div class ="w-[48%]  flex flex-col gap-[20px]">
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Name</span>
                        <input class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="text" placeholder="Enter name " name="username" autocomplete="off" required>
                    </label>
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Email</span>
                        <input class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700 type="email" placeholder="Enter email " name="email" autocomplete="off" required>
                    </label>
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Phone</span>
                        <input class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="tel" placeholder="Enter phone number" name="number" autocomplete="off" required>
                    </label>
                </div>

                <div class ="w-[48%]  flex flex-col gap-[20px]">
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Enroll Number</span>
                        <input class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="tel" placeholder="Enter enroll number " name="enrollNumber" autocomplete="off" required>
                    </label>
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Date admission</span>
                        <input class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="date" placeholder="Enter date admission " name="dateAdmission" autocomplete="off" required>
                    </label>
                </div>
            </div>

            <button type="submit" class="add-btn w-[350px] mt-[35px] ml-[150px] inline-block py-2 rounded-[30px] bg-[#FEAF00] font-bold text-[25px] leading-[29px] text-white border-[1px] border-transparent ">Enter</button>
        </form>




    `

    let choosenInput = document.querySelector(".choosen-input")
    let choosenImg = document.querySelector(".choosen-img")
    choosenInput.addEventListener("change", function(e){
        choosenImg.src= URL.createObjectURL(e.target.files[0])
    })


    let elAddForm = document.querySelector(".add-product-form")
    let elAddBtn = document.querySelector(".add-btn")
    elAddForm.addEventListener("submit", function(e){
        e.preventDefault()
        const data = {
            id:products.length ? products[products.length - 1].id + 1 : 1,
            name:e.target.username.value,
            email:e.target.email.value,
            phoneNumber:e.target.number.value,
            ernollNumber:e.target.enrollNumber.value,
            dateAdmis:e.target.dateAdmission.value,
            img:choosenImg.src
        }
        products.push(data)

        console.log(products);
        elAddBtn.innerHTML = `<img class ="mx-auto scale-[1.3]" src="../images/login-icon.png" alt="" width="40" >`
        setTimeout(() => {
            elModalWrapper.classList.add("scale-0")
            renderProducts(products)
        }, 800);
        
    })
}
// add Product end


// render product start
function renderProducts(arr){
    elRenderList.innerHTML = null
    arr.forEach(item => {
        let elProductItem = document.createElement("li")
        elProductItem.className = "w-full bg-white flex items-center justify-between rounded-[8px] mb-[10px] font-[400] text-[14px] text-[#000000] leading-[17px]"
        elProductItem.innerHTML = `
            <img onerror ="personImg()" class="perosn-img my-[15px] ml-[13px] rounded-lg " src="${item.img}" alt="profile img" width="65" height="55">
            <p>${item.name}</p>
            <p>${item.email}</p>
            <p>${item.phoneNumber}</p>
            <p>${item.ernollNumber}</p>
            <p>${item.dateAdmis}</p>
            <div class="flex mr-[15px] gap-[17px]">
                <img onclick= "handleMoreBtn(${item.id})" class="hover:scale-[1.3] duration-300 cursor-pointer" src="./images/more-icon.svg" alt="more img" width="19" height="4.5">
                <img onclick ="handleUpdateBtn(${item.id})" class="hover:scale-[1.3] duration-300 cursor-pointer" src="./images/update-icon.svg" alt="update-icon" width="19" height="19">
                <img onclick ="handleDeleteBtn(${item.id})" class="hover:scale-[1.3] duration-300 cursor-pointer" src="./images/delete-icon.svg" alt="delete-icon" width="16" height="18">
            </div>
        `
        elRenderList.appendChild(elProductItem)
    });
    localStorage.setItem("product", JSON.stringify(products))
}
renderProducts(products)
function personImg(){
    let elPersonImg = document.querySelector(".perosn-img")
    elPersonImg.src = "./images/empty-img.png"
}
// render product end



//more btn start
function handleMoreBtn(id){
    const findIdObj = products.find(item => item.id == id)
  
    localStorage.setItem("more-id", JSON.stringify(findIdObj))
    location.pathname = "../../single.html"
}
//more btn end


// delete start
function handleDeleteBtn(id){
    elModalWrapper.classList.remove("scale-0")

    elModalInner.innerHTML =`
        <div>
            <h2 class = "text-[30px] font-bold text-zinc-600 text-center my-[10px]">Do you want to delete it ?</h2>
            <div class = "flex justify-between">
                <button onclick ="handleCancelBtnClick()"  class="add-btn w-[49%] py-2 rounded-[30px] bg-amber-500 font-bold text-[25px] leading-[29px] text-white hover:bg-transparent hover:border-amber-500 hover:text-amber-500 border-[2px] border-transparent duration-300">Cancel</button>
                <button onclick ="handleYesBtnClick(${id})" class="add-btn w-[49%] py-2 rounded-[30px] bg-red-500 font-bold text-[25px] leading-[29px] text-white hover:bg-transparent hover:border-red-500 hover:text-red-500 border-[2px] border-transparent duration-300">Yes</button>
            </div>
        </div>
    `
}
function handleYesBtnClick(id){
    const findedDelete =  products.findIndex(item => item.id == id)
    products.splice(findedDelete, 1)
    renderProducts([...products])
    elModalWrapper.classList.add("scale-0")

    localStorage.setItem("product", JSON.stringify(products))
}
function handleCancelBtnClick(){
    elModalWrapper.classList.add("scale-0")
}
// delete end


// update start
function handleUpdateBtn(id){
    elModalWrapper.classList.remove("scale-0")
    const updateDate = products.find(item => item.id == id)
    elModalInner.innerHTML = `
        <form class ="updated-product-form">
            <label>
                <input class="updated-input hidden" type="file">
                <img onerror ="ImgUpdated()" class = "updated-img mx-auto rounded-lg" src="${updateDate.img ? updateDate.img : "./images/empty-img.png"}" alt="Choose img" width="200" height="150">
            </label>

            <div class ="flex justify-between mt-[20px]">
                <div class ="w-[48%]  flex flex-col gap-[20px]">
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Name</span>
                        <input value ="${updateDate.name}" class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="text" placeholder="Enter name " name="username" autocomplete="off" required>
                    </label>
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Email</span>
                        <input value ="${updateDate.email}" class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700 type="email" placeholder="Enter email " name="email" autocomplete="off" required>
                    </label>
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Phone</span>
                        <input value ="${updateDate.phoneNumber}" class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="tel" placeholder="Enter phone number" name="number" autocomplete="off" required>
                    </label>
                </div>

                <div class ="w-[48%]  flex flex-col gap-[20px]">
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Enroll Number</span>
                        <input value ="${updateDate.ernollNumber}" class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="tel" placeholder="Enter enroll number " name="enrollNumber" autocomplete="off" required>
                    </label>
                    <label class="flex flex-col">
                        <span class="text-[15px] text-black ">Date admission</span>
                        <input value ="${updateDate.dateAdmis}" class="bg-amber-400 placeholder:text-white p-3 rounded-lg mt-2 outline-none focus:shadow  focus:shadow-amber-700" type="date" placeholder="Enter date admission " name="dateAdmission" autocomplete="off" required>
                    </label>
                </div>
            </div>

            <button type="submit" class="updated-btn w-[350px] mt-[35px] ml-[150px] inline-block py-2 rounded-[30px] bg-[#FEAF00] font-bold text-[25px] leading-[29px] text-white border-[1px] border-transparent hover:bg-transparent hover:text-[#FEAF00] hover:border-[#FEAF00] duration-300">Enter</button>
        </form>




    `
    let elUpdatedAddBtn = document.querySelector(".updated-btn")
    let elUpdatedForm = document.querySelector(".updated-product-form")
    let elUpdatedInput = document.querySelector(".updated-input")
    let elUpdatedImg = document.querySelector(".updated-img")
    
    elUpdatedInput.addEventListener("change", function(e){
        elUpdatedImg.src = URL.createObjectURL(e.target.files[0])
    })


    elUpdatedForm.addEventListener("submit", function(e){
        e.preventDefault()
        updateDate.img = elUpdatedImg.src
        updateDate.name = e.target.username.value
        updateDate.email = e.target.email.value
        updateDate.phoneNumber = e.target.number.value
        updateDate.ernollNumber = e.target.enrollNumber.value
        updateDate.dateAdmis = e.target.dateAdmission.value


        elUpdatedAddBtn.innerHTML = `<img class ="mx-auto scale-[1.3]" src="../images/login-icon.png" alt="" width="40" >`

        setTimeout(() => {
            elModalWrapper.classList.add("scale-0")
            renderProducts(products)
        }, 800);
    })
    localStorage.setItem("product", JSON.stringify(products))
    
    
}
function ImgUpdated(){
    let elUpdatedImg = document.querySelector(".updated-img")
    elUpdatedImg.src = "./images/empty-img.png"
}
// update end


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


// sort img start
let elSortImg = document.querySelector(".sort-img")
elSortImg.addEventListener("click", function(e){
    products.sort((a, b) => a.name > b.name ? 1 : -1)
    renderProducts(products)
    // localStorage.setItem("product", JSON.stringify(products))
})

// sort img end


// logout start
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


// search start
let elSaerchInput = document.querySelector(".search-input")
elSaerchInput.addEventListener("keyup", function(e){
    const saerchVAlue = e.target.value.toLowerCase()
    const productsFilter = products.filter(item => item.name.toLowerCase().includes(saerchVAlue) || item.phoneNumber.toLowerCase().includes(saerchVAlue))
    renderProducts(productsFilter)
})
// search end


// modal start
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modaul-inner")

elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "modal-wrapper") elModalWrapper.classList.add("scale-0")
})
// modal end