let loginPage = document.querySelector(".login");
let signuppage = document.querySelector(".sign-up");
let toSignUp = document.querySelector(".btn");
let toLogin = document.querySelector(".log-btn");
toSignUp.addEventListener("click", () => {
   signuppage.classList.add("move-down");
   loginPage.classList.add("move-up")
})

toLogin.addEventListener("click", ()=> {
   signuppage.classList.remove("move-down");
loginPage.classList.remove("move-up")
});
