

//lock and unlock scroll while modals opened and closed
function lockScroll() {
    document.body.classList.add("_scroll-block")
}
function unlockScroll() {
    document.body.classList.remove("_scroll-block")
}

//Slider
const sliderContainer = document.querySelector(".slider-container");
const caruselLine = document.querySelector(".carusel-line");
const cycle = document.querySelectorAll(".cycle");
const sliderImgs = document.querySelectorAll(".carusel-line img");
const profileBtn = document.querySelector(".profile-btn");
let scrollWidth = 475;

function startPageSlider() {

      if(window.innerWidth < 1440 && window.innerWidth >= 1300) {
        scrollWidth = 425;
        sliderImgs.forEach(el => el.style.width = "400px");
        sliderContainer.style.width = "1250px";
      } else if(window.innerWidth < 1300 && window.innerWidth >= 1145) {
        scrollWidth = 375;
        sliderImgs.forEach(el => el.style.width = "350px");
        sliderContainer.style.width = "1100px";
      } else if(window.innerWidth < 1145 && window.innerWidth > 1024) {
        scrollWidth = 325;
        sliderImgs.forEach(el => el.style.width = "300px");
        sliderContainer.style.width = "950px";
      } else {
        scrollWidth = 475;
        sliderImgs.forEach(el => el.style.width = "450px");
        sliderContainer.style.width = "1400px";
      }
      
} 
window.addEventListener("resize", startPageSlider);
startPageSlider();

const slideBtn = document.querySelectorAll(".slideBtn");
for(let i = 0; i < slideBtn.length; i++) {
    slideBtn[i].addEventListener("click", () => {
        caruselLine.style.transform = `translateX(-${i * scrollWidth}px)`;
        currentCycle(i)
        counterImg = i;
        arrowUnactive();
    })
    
}

function currentCycle (index) {
    for(let i = 0; i < cycle.length; i++) {
        cycle[i].classList.remove("active");
        slideBtn[i].classList.remove("cycles-wrapper-active");
    }
    cycle[index].classList.add("active");
    slideBtn[index].classList.add("cycles-wrapper-active");
}

const btnPrev = document.querySelector(".arrow-left");
const btnNext = document.querySelector(".arrow-right");

let counterImg = 0;

btnPrev.addEventListener("click", () => {
    counterImg--
    if(counterImg <= 0) {
        counterImg = 0;
    }
    caruselLine.style.transform = `translateX(-${counterImg * scrollWidth}px)`;
    arrowUnactive();
    currentCycle(counterImg)
})

btnNext.addEventListener("click", () => {
    counterImg++;
    if(counterImg >= 4) {
        counterImg = 4;
    }
    caruselLine.style.transform = `translateX(-${counterImg * scrollWidth}px)`;
    arrowUnactive();
    currentCycle(counterImg)
})

function arrowUnactive() {
   if(counterImg === 0) {
    btnPrev.classList.add("arrow-unactive");
    btnNext.classList.remove("arrow-unactive");
    } else if(counterImg === 4) {
    btnNext.classList.add("arrow-unactive");
    btnPrev.classList.remove("arrow-unactive");
    } else {
    btnPrev.classList.remove("arrow-unactive");
    btnNext.classList.remove("arrow-unactive");
    } 
} 

//Slider at the favorites section
const seasonsContent = document.querySelectorAll(".seasons-content");
const labels = document.querySelectorAll(".labels-radio");

labels.forEach((el, i) => {
    el.addEventListener("click", () => {
        const radioBtn = el.querySelector("input");
        radioBtn.checked = true;
        handleSeasons(i);
    })
})

function handleSeasons(index) {
    for(let el = 0; el < seasonsContent.length; el++) {
        if(el === index) {
            labels[el].classList.add("season-active");
            fadeStart(seasonsContent[el])
            
        } else {
            labels[el].classList.remove("season-active");
            fadeEnd(seasonsContent[el])
        }
    }
}
function fadeEnd(el) {
   el.classList.add("seasons-content");
   el.classList.remove("seasons-show");
   setTimeout(() => {
    el.style.display = "none"
   }, 300)

}
function fadeStart(el) {
   el.classList.remove("seasons-content");
   el.classList.add("seasons-show");
   setTimeout(() => {
    el.style.display = "block"
   }, 300)
}

//Sticky favorites seasons
const stickyBtns = document.querySelector(".favorites-seasons");
let isSticky = false;
window.addEventListener("scroll", () => {
    let currentPosition = window.scrollY >= stickyBtns.offsetTop;
    if(currentPosition && !isSticky) {
        stickyBtns.classList.add("favorites-seasons-sticky");
        isSticky = true;
    } else if(!currentPosition && isSticky) {
        stickyBtns.classList.remove("favorites-seasons-sticky");
        isSticky = false;
    }
})

const modalRegisterBody = document.querySelector(".modal-register-body");
const profileIcon = document.querySelector(".profile-icon");

profileIcon.addEventListener("click", () => {
    modalRegisterBody.classList.toggle("modal-register-body-active");
})

document.addEventListener("click", (e) => {
    if(!modalRegisterBody.contains(e.target) && e.target !== modalRegisterBody && e.target !== profileIcon && e.target !== userRegIcon) {
        modalRegisterBody.classList.remove("modal-register-body-active")
        
    }
})

//modal regustration
const popUpRegistration = document.querySelector(".pop-up-registration"); 
const popUpRegistrationLink = document.querySelector(".modal-register-link");
const popUpRegistrationCloseBtn = document.querySelector(".pop-up-registration-close");
const firstModalLinks = document.querySelectorAll(".first-modal-links");
const popUpRegistrationContainer = document.querySelector(".pop-up-body");
const signUpBtn = document.querySelector(".sign-up-btn");
let isRegistrationOpen = false;
const loginLinkFromRegModal = document.querySelector(".pop-up-link-login");
const registerLinkFromLoginModal = document.querySelector(".login-modal-register-link");

registerLinkFromLoginModal.addEventListener("click", () => {
    closeModalLogin();
    openPopUpRegistration();
});

firstModalLinks.forEach(el => {
    el.addEventListener("click", () => {
        modalRegisterBody.classList.remove("modal-register-body-active")
    })
})

popUpRegistrationLink.addEventListener("click", (e) => {
    if(popUpRegistrationLink.textContent === "Register") {
        openPopUpRegistration();
     }
});
popUpRegistrationCloseBtn.addEventListener("click", closePopUpRegistration)
signUpBtn.addEventListener("click", openPopUpRegistration);

function openPopUpRegistration() {
    popUpRegistration.classList.add("pop-up-registration-active"); 
    lockScroll();
}
function closePopUpRegistration() {
      popUpRegistration.classList.remove("pop-up-registration-active");  
      unlockScroll();
}
popUpRegistration.addEventListener("click", (e) => {
    if(!popUpRegistrationContainer.contains(e.target)) {
        closePopUpRegistration();
    }
})

const formBtnSubmit = document.querySelector(".registration-btn");
const registrationNoticeSuccess = document.querySelector(".registration-succes-notice");
const registrationForm = document.querySelector(".registration-form");
const registrationInputs = document.querySelectorAll(".registration-input");
const inputErrors = document.querySelectorAll(".input-error");

let isInputFirstNameValid = false;
let isInputLastNameValid = false;
let isInputEmailValid = false;
let isInputPasswordValid = false;
    
//registration form validation
registrationInputs.forEach((el, i) => {
    el.addEventListener("blur", () => {

        if(i === 0) {
            if(!/^[A-Za-zА-Яа-яЁё]{2,30}$/.test(el.value)) {
                inputErrors[i].innerText = "First name should be more than 2 letters";
                registrationInputs[i].style.borderColor = "#FF44AA";
                isInputFirstNameValid = false;
                if(/\d/.test(el.value)) {
                    inputErrors[i].innerText = "First name should contains only letters";
                    registrationInputs[i].style.borderColor = "#FF44AA";
                    isInputFirstNameValid = false;
                }
            } else {
                inputErrors[i].innerText = "";
                registrationInputs[i].style.borderColor = "#BB945F";
                isInputFirstNameValid = true;
            }
        }
        if(i === 1) {
            if(!/^[A-Za-zА-Яа-яЁё]{2,30}$/.test(el.value)) {
                inputErrors[i].innerText = "Last name should be more than 2 letters";
                registrationInputs[i].style.borderColor = "#FF44AA";
                isInputLastNameValid = false;
                if(/\d/.test(el.value)) {
                    inputErrors[i].innerText = "Last name should contains only letters";
                    registrationInputs[i].style.borderColor = "#FF44AA";
                    isInputLastNameValid = false;
                }
            } else {
                inputErrors[i].innerText = "";
                registrationInputs[i].style.borderColor = "#BB945F";
                isInputLastNameValid = true;
            }
        }
       
        if(i === 2) {
            if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(el.value)) {
                inputErrors[i].innerText = "E-mail should be correct";
                registrationInputs[i].style.borderColor = "#FF44AA";
                isInputEmailValid = false;
            } else {
                inputErrors[i].innerText = "";
                registrationInputs[i].style.borderColor = "#BB945F";
                isInputEmailValid = true;
            }
        }
        if(i === 3) {
            if(!/^.{8,}$/.test(el.value)) {
                inputErrors[i].innerText = "Password should be at least 8 characters";
                registrationInputs[i].style.borderColor = "#FF44AA";
                isInputPasswordValid = false;;
            } else {
                inputErrors[i].innerText = "";
                registrationInputs[i].style.borderColor = "#BB945F";
                isInputPasswordValid = true;
            }
        }
    })
})

let userData = {};

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let isFormValid = false;
        
    registrationInputs.forEach((el, i) => {
        if(el.value === "") {
            inputErrors[i].innerText = "Empty field is not allowed";
            registrationInputs[i].style.borderColor = "#FF44AA";
            isFormValid = false;
        } else {
            if(isInputFirstNameValid && isInputLastNameValid && isInputEmailValid && isInputPasswordValid) {
            inputErrors[i].innerText = "";
            registrationInputs[i].style.borderColor = "#BB945F";
            isFormValid = true;
            userData[el.name] = el.value
            }
        }
    })
    
    if(isFormValid) {
        isInputFirstNameValid = false;
        isInputLastNameValid = false;
        isInputEmailValid = false;
        isInputPasswordValid = false;
        registrationNoticeSuccess.innerText = "Success!";
        registrationNoticeSuccess.classList.add("registration-succes-notice-active");
        setTimeout(() => {
            registrationNoticeSuccess.classList.remove("registration-succes-notice-active");
        }, 2000);
        registrationForm.reset();
        setTimeout(() => {
            closePopUpRegistration();
        }, 2000)
        sendUsersData(userData);
        
    } 
    
})

//check and send new user to storage
function sendUsersData(newUser) {
    let usersArrayData = JSON.parse(localStorage.getItem("usersHaveRegustration")) || [];
    newUser.isUserStatusActive = true;
    newUser.userVisitsCounter = 1;
    newUser.userUniqCardNumber = randomCardNumber();
    newUser.userRentedBooks = [];
    newUser.isUserBuyTicket = false;
   
    if(usersArrayData.length === 0) {
        usersArrayData.push(newUser);
        localStorage.setItem("usersHaveRegustration", JSON.stringify(usersArrayData));
        pageAfterRegistration(newUser)
        
    } else {
        const isUserAlreadyExist = usersArrayData.find(user => user.email === newUser.email);
        if(isUserAlreadyExist) {
            registrationNoticeSuccess.innerText = "User exist!\nUse login!";
            registrationNoticeSuccess.classList.add("registration-succes-notice-active-user-exist");
            setTimeout(() => {
                registrationNoticeSuccess.classList.remove("registration-succes-notice-active-user-exist");
                registrationNoticeSuccess.innerText = "";
            }, 3000);
        } else {
            usersArrayData.push(newUser);
            localStorage.setItem("usersHaveRegustration", JSON.stringify(usersArrayData));
            setTimeout(() => closePopUpRegistration(), 2000);
            pageAfterRegistration(newUser)
        }
    }
}
const visitsDash = document.getElementById("dash-visits");
const bookNumDash = document.getElementById("dash-book-num");
const visits = document.querySelector(".visits-number");
const bookNumber = document.querySelector(".books-number");

//change icon profile and connect data to my profile dashboard
const userRegIcon = document.querySelector(".profile-icon-container");
function changeProfileIcon(user) {
    if(user) {
        renderVisits();
        const twoLettersName = user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();
        profileIcon.style.display = "none";
        userRegIcon.innerText = twoLettersName;
        userRegIcon.style.display = "flex";
        addTooltip(user);
        const letterSide = document.querySelector(".letters");
        letterSide.innerText = twoLettersName;
        const fullName = document.querySelector(".name-name")
        fullName.innerText = `${user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase()} ${user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase()}`;
        bookNumDash.innerText = user.userRentedBooks.length;
        let rentedBookArea = document.querySelector(".rented-books-area");
        const userCardNumberMyProfile = document.querySelector(".card-number-number");
        userCardNumberMyProfile.innerText = user.userUniqCardNumber;
    } 
    
}

//open user prof
function openUserMenu() {
    userRegIcon.addEventListener("click", () => {
      modalRegisterBody.classList.toggle("modal-register-body-active");  
    })
}

//generator for card number
function randomCardNumber() {
    let res = "";
    const hex = "0123456789ABCDEF";
    while(res.length !== 9) {
     res += hex[Math.floor(Math.random() * (15 - 0 + 1)) + 0]
    }
    return res;
}
//add tooltip to icon
function addTooltip (user) {
    userRegIcon.setAttribute("title", `${user.firstName} ${user.lastName}`)
}

const profileCardNumber = document.querySelector(".modal-register-title");
const myProfileLink = document.querySelector(".modal-log-in");
const logOutLink = document.querySelector(".modal-register-link");

//for change modal body when user after reg
function changeModalBodyText(user) {
    profileCardNumber.innerHTML = user.userUniqCardNumber;
    profileCardNumber.style.fontSize = "13px";
    myProfileLink.innerHTML = "My profile";
    logOutLink.innerHTML = "Log Out";
    modalRegisterBody.style.padding = "5px 4px 20px 4px";
    modalRegisterBody.style.marginTop = "3px";
    if(profileCardNumber.innerText !== "Profile") {
        profileCardNumber.style.fontSize = "11px";
    } 
}

//my profile modal HTML element
const myProfileModal = document.querySelector(".modal-my-profile");

//open my profile modal
function openMyProfileModal() {
    myProfileLink.addEventListener("click", () => {
        if(myProfileLink.textContent === "My profile") {
            myProfileModal.classList.add("modal-my-profile-active");
            lockScroll();
        }
    })
}

const closeBtnMyProfile = document.querySelector(".my-profile-close-btn");
const myProfileContainer = document.querySelector(".my-profile-container");

//close my profile modal
closeBtnMyProfile.addEventListener("click", closeMyProfile);
function closeMyProfile() {
    myProfileModal.classList.remove("modal-my-profile-active");
    unlockScroll();
}
//close my profile modal beyond modal
myProfileModal.addEventListener("click", (e) => {
    if(!myProfileContainer.contains(e.target)) {
        closeMyProfile();
    }
})

//field card number at the my profile modal 
const cardNumberField = document.querySelector(".card-number-number");



//btn copy to bufer
const copyBtn = document.querySelector(".card-number-copy");
copyBtn.addEventListener("click", copyNumber)

function copyNumber() {
    const textForCopy = cardNumberField.innerText;
    navigator.clipboard.writeText(textForCopy)
    .then(() => {
        const copiedNotice = document.querySelector(".notice-copyed");
        copiedNotice.classList.add("notice-copyed-active");
        setTimeout(() => {
            copiedNotice.classList.remove("notice-copyed-active")
        }, 2000)
        }).catch(err => {
        console.log("copy failed", err)
        });
}

//open modal login 
myProfileLink.addEventListener("click", openModalLogin);
const modalLogin = document.querySelector(".modal-login");

loginLinkFromRegModal.addEventListener("click", () => {
    closePopUpRegistration();
    openModalLogin();
});
const loginBtnFromCardsSec = document.querySelector(".log-in-btn");
loginBtnFromCardsSec.addEventListener("click", openModalLogin);

function openModalLogin() {
    lockScroll()
    if(myProfileLink.textContent === "Log In") {
        modalLogin.classList.add("modal-login-activ")
    }
}

//close modal login
const modalLoginContainer = document.querySelector(".modal-login-container");
const modalLoginCloseBtn = document.querySelector(".modal-login-close-btn");
modalLoginCloseBtn.addEventListener("click", closeModalLogin);
modalLogin.addEventListener("click", (e) => {
    if(!modalLoginContainer.contains(e.target)) {
        closeModalLogin()
    }
})
function closeModalLogin() {
    modalLogin.classList.remove("modal-login-activ");
    unlockScroll()
}
    
//books sec buttons
const bookSecButtons = document.querySelectorAll(".main-button");
bookSecButtons.forEach(el => {
    el.addEventListener("click", () => {
        openModalLogin();
    })
})

//login form validation
const loginInputs = document.querySelectorAll(".registration-input-login");
const loginForm = document.querySelector(".login-form");
const inputErrorLogin = document.querySelectorAll(".input-error-login");
let isLoginValid = false;
let isLoginFormValid = false;

function checkReadersName(name) {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration")) || [];
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].firstName === name) {
            return carrentUsersData[i];
        }
    }
    return false;
}

function checkUser(value) {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration")) || [];
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].userUniqCardNumber === value || carrentUsersData[i].email === value) {
            return carrentUsersData[i];
        } 
    }
    return false;
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let entryUser;
    loginInputs.forEach((el, i) => {
        const carrentUser = checkUser(loginInputs[0].value);   
        if(el.value !== "") {
            if((loginInputs[0].value === carrentUser.email || loginInputs[0].value === carrentUser.userUniqCardNumber) && loginInputs[1].value === carrentUser.password) {
                isLoginFormValid = true;
                entryUser = carrentUser;
                el.style.borderColor = "#BB945F";
                inputErrorLogin[i].innerText = ""; 
            } else {
                el.style.borderColor = "#FF44AA";
                inputErrorLogin[i].innerText = "Emal/Card number or password isn't exist";
                isLoginFormValid = false;
            }
                     
        } else {
            el.style.borderColor = "#FF44AA";
            inputErrorLogin[i].innerText = "Empty field is not allowed";
            isLoginFormValid = false;
        }
        if(loginInputs[1].value.length < 8) {
            el.style.borderColor = "#FF44AA";
            inputErrorLogin[1].innerText = "Password should be at least 8 characters";
        }
    })

    const loginSuccesNotice = document.querySelector(".login-succes-notice");
    const loginSuccesElem = document.querySelector(".login-succes-notice");
    if(isLoginFormValid) {
        loginInputs[0].style.borderColor = "#BB945F";
        loginInputs[1].style.borderColor = "#BB945F";
        inputErrorLogin[0].innerText = "";
        inputErrorLogin[1].innerText = "";
        isLoginFormValid = false;
        loginForm.reset()
        setTimeout(() => {closeModalLogin()}, 2000);
        loginSuccesElem.innerText = "Success!"
        loginSuccesNotice.classList.add("login-succes-notice-active");
        setTimeout(() => {loginSuccesNotice.classList.remove("login-succes-notice-active")}, 1500);
        activUser(entryUser);
        pageAfterRegistration(entryUser);
        renderVisits();
    }
})

function activUser(user) {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].email === user.email) {
            carrentUsersData[i].isUserStatusActive = true;
            carrentUsersData[i].userVisitsCounter++;
            localStorage.setItem("usersHaveRegustration", JSON.stringify(carrentUsersData));
        }
    }
}

const mainForm = document.querySelector(".form-bg");
const mainFormContainer = document.querySelector(".form");
const mainFormInputs = document.querySelectorAll(".main-form-inputs");
const mainFormContainerAppereance = document.querySelector(".main-form-appereance");



let isMainFormValid = false;
mainForm.addEventListener("submit", (e) => {
        let userObj;
        e.preventDefault()
        if(checkReadersName(mainFormInputs[0].value)) {
            const currentUserData = checkReadersName(mainFormInputs[0].value);
            // mainFormInputs[0].style.borderColor = "#00AAAA";
            if(mainFormInputs[1].value === currentUserData.userUniqCardNumber) {
                // mainFormInputs[1].style.borderColor = "#00AAAA";
                isMainFormValid = true;
                userObj = currentUserData;
            } else {
                // mainFormInputs[1].style.borderColor = "#FF44AA";
                isMainFormValid = false;
            }
        } else {
            // mainFormInputs[0].style.borderColor = "#FF44AA";
            // mainFormInputs[1].style.borderColor = "#FF44AA";
            isMainFormValid = false;
        }
        if(isMainFormValid) {
            isMainFormValid = false;
            changeMainForm(userObj);
        }


})

const timeView = document.querySelector(".time-view");
const mainFormAppereancedInputs = document.querySelectorAll(".appereancedInputs");

function changeMainForm(userObj) {
    visits.innerText = userObj.userVisitsCounter;
    bookNumber.innerText = userObj.userRentedBooks.length;
    mainFormAppereancedInputs[0].value = `${userObj.firstName[0].toUpperCase() + userObj.firstName.slice(1).toLowerCase()} ${userObj.lastName[0].toUpperCase() + userObj.lastName.slice(1).toLowerCase()}`;
    mainFormAppereancedInputs[1].value = userObj.userUniqCardNumber;
    mainFormContainer.style.display = "none";
    mainFormContainerAppereance.style.display = "flex";
    setTimeout(() => {
        mainFormContainer.style.display = "flex";
        mainFormContainerAppereance.style.display = "none";
        mainForm.reset()
    }, 11000);
    timeForInterval()
}

function timeForInterval() {
    let time = 10;
    const interval = setInterval(() => {
        time--
        if(time === -1) {
            clearInterval(interval);
            time = 10;
        }
        timeView.innerText = time;
    }, 1000)
}


//logout button
const logOutBtn = document.getElementById("log-out-btn");
logOutBtn.addEventListener("click", () => {
    if(logOutBtn.textContent !== "Register") {
        exitUser()
    }
})

//library card section
const libraryCardSec = document.querySelector(".library-cards-container")
const libraryCardSecLogined = document.querySelector(".library-card-container-logined")
const visitsNumLogined = document.getElementById("visits");
const bookNumLogined = document.getElementById("book-num");
const libSecInput1Logined = document.getElementById("lib-sec-input1-logined")
const libSecInput2Logined = document.getElementById("lib-sec-input2-logined")

function openLibraryCardSec(user) {
    libraryCardSec.style.display = "none";
    libraryCardSecLogined.style.display = "flex"
    renderVisits();
    renderBookNumber();
    libSecInput1Logined.value = `${user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase()} ${user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase()}`;
    libSecInput2Logined.value = user.userUniqCardNumber;
}

profileBtn.addEventListener("click", () => {
    myProfileModal.classList.add("modal-my-profile-active");
    lockScroll();
})

//render visits counter
function renderVisits() {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].isUserStatusActive) {
            const visitsCounter = carrentUsersData[i].userVisitsCounter;
            visits.innerText = visitsCounter;
            visitsDash.innerText = visitsCounter;
            visitsNumLogined.innerText = visitsCounter;
        }
    }
}

//rende number of books
function renderBookNumber() {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].isUserStatusActive) {
            const bookNumberCounter = carrentUsersData[i].userRentedBooks.length;
            bookNumLogined.innerText = bookNumberCounter;
            bookNumDash.innerText = bookNumberCounter;
            bookNumber.innerText = bookNumberCounter;
        }
    }
}

//buy modal validation
const buyModalLargeInputs = document.querySelectorAll(".modal-buy-large-inputs");
const buyModalSmallInputs = document.querySelectorAll(".modal-buy-small-inputs");
const buyModalForm = document.querySelector(".modal-buy-form");
const modalBuyNoticeText = document.querySelectorAll(".modal-buy-error-notice-text");
const modalBuySmallInputNoticeText = document.querySelectorAll(".small-input-error-text");
const cvcNoticeText = document.querySelector(".small-input-error-text-cvc");
const cvcInput = document.querySelector(".modal-buy-cvc-input");
const modalBuyBtn = document.querySelector(".modal-buy-btn");
const buyModalSuccess = document.querySelector(".succes-buy-notice");
const buyModalAllInputs = buyModalForm.querySelectorAll("input");
const buyModalNotice = document.querySelector(".buy-modal-notice");

let isBankCardNumberValid = false;
let isCvcInputValid = false;
let isSmallInput1Valid = false;
let isSmallInput2Valid = false;
let isCardholderInputValid = false;
let isPostInputValid = false;
let isCityInputValid = false;

function checkBuyModalInputs() {
    if(buyModalAllInputs[0].value !== "" && buyModalAllInputs[1].value !== "" &&
        buyModalAllInputs[2].value !== "" &&  buyModalAllInputs[3].value !== "" &&
        buyModalAllInputs[4].value !== "" && buyModalAllInputs[5].value !== "" &&
        buyModalAllInputs[6].value !== "") {
            modalBuyBtn.removeAttribute("disabled");
            modalBuyBtn.style.pointerEvents = "all";
            //buyModalNotice.innerText = ""
    } else {
            modalBuyBtn.setAttribute("disabled", "disabled");
            modalBuyBtn.style.pointerEvents = "none"
    }
    
}

const rentedBookArea = document.querySelector(".rented-books-area");
const allBooks = document.querySelectorAll(".book-name");

buyModalAllInputs.forEach((el) => {
    el.addEventListener("input", checkBuyModalInputs)})

buyModalForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(buyModalLargeInputs[1].value === "") {
        buyModalLargeInputs[1].style.borderColor = "#FF44AA"; 
        modalBuyNoticeText[1].innerText = "Empty field is not allowed";
        isCardholderInputValid = false;
    } else {
        buyModalLargeInputs[1].style.borderColor = "#BB945F"; 
        modalBuyNoticeText[1].innerText = "";
        isCardholderInputValid = true;
    }
    if(buyModalLargeInputs[2].value === "") {
        buyModalLargeInputs[2].style.borderColor = "#FF44AA"; 
        modalBuyNoticeText[2].innerText = "Empty field is not allowed";
        isPostInputValid = false;
    } else {
        buyModalLargeInputs[2].style.borderColor = "#BB945F"; 
        modalBuyNoticeText[2].innerText = "";
        isPostInputValid = true;
    }
    if(buyModalLargeInputs[3].value === "") {
        buyModalLargeInputs[3].style.borderColor = "#FF44AA"; 
        modalBuyNoticeText[3].innerText = "Empty field is not allowed";
        isCityInputValid = false;
    } else {
        buyModalLargeInputs[3].style.borderColor = "#BB945F"; 
        modalBuyNoticeText[3].innerText = "";
        isCityInputValid = true;
    }

    if(buyModalLargeInputs[0].value.length !== 16) {
        buyModalLargeInputs[0].style.borderColor = "#FF44AA"; 
        modalBuyNoticeText[0].innerText = "Should contains 16 digits without spaces!"
        isBankCardNumberValid = false;
    } else {
        buyModalLargeInputs[0].style.borderColor = "#BB945F"; 
        modalBuyNoticeText[0].innerText = "";
        isBankCardNumberValid = true;
    }
    
    if(buyModalSmallInputs[0].value.length !== 2) {
        buyModalSmallInputs[0].style.borderColor = "#FF44AA"; 
        modalBuySmallInputNoticeText[0].innerText = "2 dig.";
        isSmallInput1Valid = false;
    } else {
        buyModalSmallInputs[0].style.borderColor = "#BB945F"; 
        modalBuySmallInputNoticeText[0].innerText = "";
        isSmallInput1Valid = true;
    }

    if(buyModalSmallInputs[1].value.length !== 2) {
        buyModalSmallInputs[1].style.borderColor = "#FF44AA"; 
        modalBuySmallInputNoticeText[1].innerText = "2 dig.";
        isSmallInput2Valid = false;
    } else {
        buyModalSmallInputs[1].style.borderColor = "#BB945F"; 
        modalBuySmallInputNoticeText[1].innerText = "";
        isSmallInput2Valid = true;
    }
        
    if(cvcInput.value === "") {
        cvcInput.style.borderColor = "#FF44AA"; 
        cvcNoticeText.innerText = "Empty field is not allowed";
        isCvcInputValid = false;

    } else {
        if(cvcInput.value.length !== 3) {
            cvcInput.style.borderColor = "#FF44AA"; 
            cvcNoticeText.innerText = "Should contains 3 digits!";
            isCvcInputValid = false;
        } else {
            cvcInput.style.borderColor = "#BB945F"; 
            cvcNoticeText.innerText = "";
            isCvcInputValid = true;;
        }
    }
    
    if(isBankCardNumberValid && 
            isCvcInputValid && 
            isSmallInput1Valid && 
            isSmallInput2Valid && 
            isCardholderInputValid && 
            isPostInputValid && 
            isCityInputValid) {
        buyModalForm.reset();
        buyModalSuccess.classList.add("succes-buy-notice-active");
        buyModalSuccess.innerText = "Success!"
        setTimeout(() => {
            buyModalSuccess.classList.remove("succes-buy-notice-active");
            
        }, 1500);
        setTimeout(() => {closeBuyModal()}, 2000);
        addReaderTicket();
        addBookAfterBuyTicket();
        
    } 
})

function buyBook(book) {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    for(let i in carrentUsersData) {
        if(carrentUsersData[i].isUserStatusActive) {
            carrentUsersData[i].userRentedBooks.push(book);
            localStorage.setItem("usersHaveRegustration", JSON.stringify(carrentUsersData));
        }
    }
}

const buyModalBody = document.querySelector(".modal-buy-body");
const buyModalCloseBtn = document.querySelector(".modal-buy-close-btn");
const buyModalOverlay = document.querySelector(".modal-buy-overlay"); 
let boughtBookIndex;

function buyModal() {
   buyModalOverlay.addEventListener("click", (e) => {
        if(!buyModalBody.contains(e.target)) {
            closeBuyModal()
        }
   });
   buyModalCloseBtn.addEventListener("click", closeBuyModal);
   //book button 
   bookSecButtons.forEach((el, index) => {
        let user;
        el.addEventListener("click", (e) => {
            let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
            for(let i = 0; i < carrentUsersData.length; i++) {
                if(carrentUsersData[i].isUserStatusActive) {
                    user = carrentUsersData[i];
                }
            }
            if(!user.isUserBuyTicket) {
                openBuyModal();
                boughtBookIndex = index;
            } else {
                const boughtBook = e.target.parentNode.querySelector(".book-name").textContent
                const bookData = capitalizeTitle(boughtBook);
                buyBook(bookData)
                renderBooks();
                renderBookNumber();
                e.target.classList.add("main-button-disabled");
                e.target.innerText = "Own";
                
            }
        })
   })
}

function addBookAfterBuyTicket() {
    const currentBook = capitalizeTitle(allBooks[boughtBookIndex].textContent);
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].isUserStatusActive) {
            carrentUsersData[i].userRentedBooks.push(currentBook);
            localStorage.setItem("usersHaveRegustration", JSON.stringify(carrentUsersData));
            renderBooks();
            renderBookNumber();
        }
    }
}

function addReaderTicket() {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].isUserStatusActive) {
            carrentUsersData[i].isUserBuyTicket = true;
            localStorage.setItem("usersHaveRegustration", JSON.stringify(carrentUsersData));
        }
    }
}

function closeBuyModal() {
    buyModalOverlay.classList.remove("modal-buy-overlay-active");
    unlockScroll();
}
function openBuyModal() {
    buyModalOverlay.classList.add("modal-buy-overlay-active");
    lockScroll();
}

function findBook(titleBook) {
    allBooks.forEach((el, i) => {
        let book = capitalizeTitle(el.textContent);
        if(book.title === titleBook) {
            bookSecButtons[i].classList.add("main-button-disabled");
            bookSecButtons[i].innerText = "Own";
        }
    })
}

//add books
function renderBooks() {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    let user;
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].isUserStatusActive) {
            user = carrentUsersData[i];
        }
    }
    if(user.userRentedBooks.length > 0) {
        rentedBookArea.innerHTML = "";
        for(let i of user.userRentedBooks) {
            const newLi = document.createElement("li");
            newLi.innerText = `${i.title}, ${i.author}`;
            rentedBookArea.appendChild(newLi);  
            findBook(i.title)
        }
    } 
}


function capitalizeTitle(bookStr) {
    const boughtBook = bookStr.split("By");
    const eachTitle = boughtBook[0].trim().split(" ");
    let resTitle = [];
    for(let i in eachTitle) {
        resTitle.push(eachTitle[i][0].toUpperCase() + eachTitle[i].slice(1).toLowerCase())
    }
    return {
        author: boughtBook[1].trim(),
        title: resTitle.join(" ")
    }
}

//after regustration and authority
function pageAfterRegistration(user) {
    openUserMenu();
    changeProfileIcon(user);
    changeModalBodyText(user);
    openMyProfileModal();
    closeMyProfile();
    openLibraryCardSec(user);
    buyModal(user);
    renderBooks();
}


function findUser() {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    if(carrentUsersData) {
        for(let i = 0; i < carrentUsersData.length; i++) {
            if(carrentUsersData[i].isUserStatusActive) {
                pageAfterRegistration(carrentUsersData[i]) ;
            }
        }
    } 
}


//burger menu
const burgerMenuBody = document.querySelector(".burger-menu-body");
const burgerMenuIcon = document.querySelector(".burger-menu-icon");

if(burgerMenuIcon) {
    burgerMenuIcon.addEventListener("click", function() {
        burgerMenuIcon.classList.toggle("_active");
        burgerMenuBody.classList.toggle("_active");
        if(burgerMenuIcon.classList.contains("_active")) {
            lockScroll();
        } else {
            unlockScroll();
        }
    })
}

document.addEventListener('click', function(event) {
    if (!burgerMenuBody.contains(event.target) && event.target !== burgerMenuIcon && event.target !== myProfileLink && event.target !== popUpRegistrationLink && event.target !== signUpBtn && event.target !== loginBtnFromCardsSec && !modalLoginContainer.contains(event.target) && !popUpRegistrationContainer.contains(event.target) && !myProfileContainer.contains(event.target) && event.target !== profileBtn && !buyModalBody.contains(event.target)) {
        burgerMenuIcon.classList.remove("_active");
        burgerMenuBody.classList.remove("_active");
        unlockScroll();
    }
    if(event.target.classList.contains('main-button') && event.target.innerText !== "Own") {
        lockScroll();
    }
});

const menuLinks = burgerMenuBody.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenuIcon.classList.remove("_active");
        burgerMenuBody.classList.remove("_active");
        unlockScroll();
    });
});


function exitUser() {
    let carrentUsersData = JSON.parse(localStorage.getItem("usersHaveRegustration"));
    for(let i = 0; i < carrentUsersData.length; i++) {
        if(carrentUsersData[i].isUserStatusActive) {
            carrentUsersData[i].isUserStatusActive = false;
            localStorage.setItem("usersHaveRegustration", JSON.stringify(carrentUsersData));
            location.reload();
        }
    }
}

findUser()


console.log("Все пункты тз выполнены!\nОценка:200")





