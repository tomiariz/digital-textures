document.addEventListener("DOMContentLoaded", () => {
    const filterToggle = document.getElementById("filter-toggle");
    const categoryMenu = document.getElementById("category-menu");
    const subcategoryList = document.getElementById("subcategory-list");
  
    const subcategories = {
      countries: ["ARGENTINA", "USA", "GERMANY", "JAPAN"],
      genres: ["HOUSE", "PROGRESSIVE", "DEEP HOUSE"]
    };
  
    // Mostrar/ocultar el menú de categorías al tocar el ícono de filtro
    filterToggle.addEventListener("click", (event) => {
      event.stopPropagation();  // Evita que el clic en el ícono se propague
      categoryMenu.classList.toggle("hidden");
    });
  
    // Cambiar subcategorías al hacer clic en una categoría
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const selected = btn.dataset.category;
        const subs = subcategories[selected];
  
        // Actualizamos las subcategorías mostradas
        subcategoryList.innerHTML = subs.map(sub => `<button class="chip">${sub}</button>`).join("");
  
        // Ocultar el menú de categorías luego de seleccionar
        categoryMenu.classList.add("hidden");
      });
    });
  
    // Cerrar menú si se hace clic fuera
    document.addEventListener("click", (e) => {
      if (!document.querySelector(".filter-bar-wrapper").contains(e.target)) {
        categoryMenu.classList.add("hidden");
      }
    });
  });
  