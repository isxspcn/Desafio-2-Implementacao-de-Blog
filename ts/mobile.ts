// AJUSTAR A ALTURA DO CARD DO PRODUTO AUTOMATICAMENTE
// DE ACORDO COM A ALTURA DA IMAGEM DO PRODUTO

const productImage = document.querySelectorAll(
  ".product-image"
) as NodeListOf<HTMLImageElement>;

function calculateCardHeight() {
  productImage.forEach((image: HTMLImageElement) => {
    const productCard = image.parentElement as HTMLElement | null;

    if (productCard) {
      if (image.complete) {
        productCard.style.height = `${image.offsetHeight}px`;
      } else {
        image.onload = () => {
          productCard.style.height = `${image.offsetHeight}px`;
        };
      }
    } else {
      console.error("Could not find product card for image:", productImage);
    }
  });
}

calculateCardHeight();

// MENU DROPDOWN DO HEADER PRINCIPAL

const dropdownButton = document.getElementById("hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const menuLinks = document.querySelectorAll("#mobile-menu ul li a");

function toggleVisibility(element: HTMLElement | null) {
  element?.classList.toggle("hidden");
}

dropdownButton?.addEventListener("click", () => {
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

const shopSearch = document.querySelector('.shop-search') as HTMLElement | null;
const shopSectionHeader = shopSearch?.parentElement as HTMLElement | null;
const featuredHeader = document.querySelector('.featured-header') as HTMLElement | null;

function moveShopSearch() {
  if (shopSearch && shopSectionHeader && featuredHeader) {
    if (window.innerWidth < 768) {
      shopSectionHeader.appendChild(shopSearch);
    } else {
      featuredHeader.appendChild(shopSearch);
    }
  }
}

moveShopSearch();

window.addEventListener('resize', moveShopSearch);

// FILTRO DOS PRODUTOS

const filterSelect = document.getElementById(
  "product-filter"
) as HTMLSelectElement | null;
const filterButtonsContainer = document.getElementById(
  "filter-buttons"
) as HTMLElement | null;

// Botões do filtro
if (filterSelect && filterButtonsContainer) {
  Array.from(filterSelect.options).forEach((option: HTMLOptionElement) => {
    const button = document.createElement("button");

    button.textContent = option.textContent;
    button.value = option.value;
    button.addEventListener("click", () => {
      filterSelect.value = button.value;
      filterSelect.dispatchEvent(new Event("change"));

      const filterButtons = document.querySelectorAll(
        "button"
      ) as NodeListOf<HTMLButtonElement>;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active-filter");
      });
      button.classList.add("active-filter");
    });

    filterButtonsContainer.appendChild(button);
  });

  const initialButtons = filterButtonsContainer?.querySelectorAll(
    "button"
  ) as NodeListOf<HTMLButtonElement>;

  initialButtons.forEach((btn) => {
    if (btn.value === filterSelect.value) {
      btn.classList.add("active-filter");
    }
  });
}

// Filtro em si

const productCards = document.querySelectorAll(
  ".product-card"
) as NodeListOf<HTMLElement>;

if (filterSelect && productCards) {
  function filterProducts(category: string) {
    if (category === "random") {
      const visibleCards = Array.from(productCards)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      productCards.forEach((card) => {
        if (visibleCards.some((visibleCard) => visibleCard === card)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    } else {
      productCards.forEach((card) => {
        if (card.dataset.category === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    }
  }

  filterSelect.addEventListener("change", () => {
    filterProducts(filterSelect.value);
    calculateCardHeight();
  });

  filterProducts("random");
}

// FORM VALIDATION
