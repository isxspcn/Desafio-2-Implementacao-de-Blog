"use strict";
// MAIN HEADER DROPDOWN MENU (MOBILE)
const dropdownButton = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("page-nav");
const overlay = document.getElementById("overlay");
const menuLinks = document.querySelectorAll("#page-nav ul li a");
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
// MOVING PRODUCT SEARCH FROM SHOP HEADER TO FEATURED PRODUCTS HEADER
const shopSearch = document.querySelector(".shop-search");
const shopSectionHeader = document.querySelector("#shop .section-header");
const featuredHeader = document.querySelector(".featured-header");
function moveShopSearch() {
    if (shopSearch && shopSectionHeader && featuredHeader) {
        if (window.innerWidth < 768) {
            shopSectionHeader.appendChild(shopSearch);
        }
        else {
            featuredHeader.appendChild(shopSearch);
        }
    }
}
moveShopSearch();
window.addEventListener("resize", moveShopSearch);
// PRODUCT FILTER
const filterSelect = document.getElementById("product-filter");
const filterButtonsContainer = document.getElementById("filter-buttons");
// TURNING EACH OPTION FROM SELECT INTO A BUTTON
if (filterSelect && filterButtonsContainer) {
    Array.from(filterSelect.options).forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.textContent;
        button.value = option.value;
        button.addEventListener("click", () => {
            filterSelect.value = button.value;
            filterSelect.dispatchEvent(new Event("change"));
            const filterButtons = filterButtonsContainer.querySelectorAll("button");
            // Removes active-filter class from all buttons before adding it only to the
            // button clicked
            filterButtons.forEach((btn) => {
                btn.classList.remove("active-filter");
            });
            button.classList.add("active-filter");
        });
        filterButtonsContainer.appendChild(button);
    });
    // Adds the active-filter class to the initial <select> value (Random)
    const initialButtons = filterButtonsContainer === null || filterButtonsContainer === void 0 ? void 0 : filterButtonsContainer.querySelectorAll("button");
    initialButtons.forEach((btn) => {
        if (btn.value === filterSelect.value) {
            btn.classList.add("active-filter");
        }
    });
}
// FILTERING PRODUCTS
const productCards = document.querySelectorAll(".product-card");
if (filterSelect && productCards) {
    function filterProducts(category) {
        if (category === "random") {
            const visibleCards = Array.from(productCards)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            productCards.forEach((card) => {
                if (visibleCards.some((visibleCard) => visibleCard === card)) {
                    card.style.display = "flex";
                }
                else {
                    card.style.display = "none";
                }
            });
        }
        else {
            productCards.forEach((card) => {
                if (card.dataset.category === category) {
                    card.style.display = "flex";
                }
                else {
                    card.style.display = "none";
                }
            });
        }
    }
    filterSelect.addEventListener("change", () => {
        filterProducts(filterSelect.value);
    });
    // Execute the function when page loads
    filterProducts(filterSelect.value);
}
