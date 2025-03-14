"use strict";
// DROPDOWN MENU
const dropdownButton = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const menuLinks = document.querySelectorAll("#mobile-menu ul li a");
function toggleVisibility(element) {
    element === null || element === void 0 ? void 0 : element.classList.toggle("hidden");
}
dropdownButton === null || dropdownButton === void 0 ? void 0 : dropdownButton.addEventListener("click", () => {
    toggleVisibility(mobileMenu);
    toggleVisibility(overlay);
});
menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        toggleVisibility(mobileMenu);
        toggleVisibility(overlay);
    });
});
// PRODUCT FILTER
// FORM VALIDATION
