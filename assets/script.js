var menuBTN = document.querySelector(".menu-toggle");
var menuContent = document.querySelector(".menu");
menuBTN.addEventListener("click", function(){
    menuContent.classList.toggle("open");
})