var main_nav_toggle = document.querySelector(".main-nav__toggle");
var main_nav = document.querySelector(".main-nav__list");

main_nav_toggle.classList.remove("no-js");

if(window.screen.width <= 767) {
  main_nav_toggle.classList.remove("main-nav__toggle--close");
  main_nav.classList.add("main-nav__list--hidden");
}

main_nav_toggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  main_nav_toggle.classList.toggle("main-nav__toggle--close");
  main_nav.classList.toggle("main-nav__list--hidden");
});
