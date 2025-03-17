"use strict";
// MENU DROPDOWN DO HEADER PRINCIPAL
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
// MOVER O SEARCH DO HEADER DO SHOP PRO HEADER DOS PRODUTOS
const shopSearch = document.querySelector(".shop-search");
const shopSectionHeader = shopSearch === null || shopSearch === void 0 ? void 0 : shopSearch.parentElement;
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
// FILTRO DOS PRODUTOS
const filterSelect = document.getElementById("product-filter");
const filterButtonsContainer = document.getElementById("filter-buttons");
// Botões do filtro
if (filterSelect && filterButtonsContainer) {
    Array.from(filterSelect.options).forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.textContent;
        button.value = option.value;
        button.addEventListener("click", () => {
            filterSelect.value = button.value;
            filterSelect.dispatchEvent(new Event("change"));
            const filterButtons = filterButtonsContainer.querySelectorAll("button");
            filterButtons.forEach((btn) => {
                btn.classList.remove("active-filter");
            });
            button.classList.add("active-filter");
        });
        filterButtonsContainer.appendChild(button);
    });
    const initialButtons = filterButtonsContainer === null || filterButtonsContainer === void 0 ? void 0 : filterButtonsContainer.querySelectorAll("button");
    initialButtons.forEach((btn) => {
        if (btn.value === filterSelect.value) {
            btn.classList.add("active-filter");
        }
    });
}
// Filtro em si
const productCards = document.querySelectorAll(".product-card");
if (filterSelect && productCards) {
    function filterProducts(category) {
        if (category === "random") {
            let sliceEnd = window.innerWidth < 768 ? 2 : 3;
            const visibleCards = Array.from(productCards)
                .sort(() => 0.5 - Math.random())
                .slice(0, sliceEnd);
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
    filterProducts("random");
}
// FORM VALIDATION
