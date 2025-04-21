document.addEventListener("DOMContentLoaded", () => {
  const filterToggle = document.getElementById("filter-toggle");
  const categoryMenu = document.getElementById("category-menu");
  const subcategoryList = document.getElementById("subcategory-list");
  const galleryContainer = document.querySelector(".gallery-container");

  const subcategories = {
      country: ["ALL", "ARGENTINA", "FIJI", "USA", "GERMANY", "JAPAN"],
      genre: ["ALL", "HOUSE", "PROGRESSIVE", "DEEP HOUSE"]
  };

  // Mostrar/ocultar el menú de categorías
  filterToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      categoryMenu.classList.toggle("hidden");
  });

  // Cambiar subcategorías al seleccionar una categoría
  document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", () => {
          const selected = btn.dataset.category; // "country" o "genre"
          const subs = subcategories[selected];

          // Actualizar chips
          subcategoryList.innerHTML = subs.map(sub => `<button class="chip" data-value="${sub.toLowerCase()}">${sub}</button>`).join("");
          categoryMenu.classList.add("hidden");

          // Agregar event listeners a los nuevos chips
          addChipListeners(selected);
      });
  });

  // Cerrar menú si se hace clic fuera
  document.addEventListener("click", (e) => {
      if (!document.querySelector(".filter-bar-wrapper").contains(e.target)) {
          categoryMenu.classList.add("hidden");
      }
  });

  // Función para agregar listeners a los chips
  function addChipListeners(category) {
      document.querySelectorAll(".chip").forEach(chip => {
          chip.addEventListener("click", () => {
              const value = chip.dataset.value;
              if (category && value) {
                  filterSets(category, value);
                  // Resaltar chip activo
                  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
                  chip.classList.add("active");
              }
          });
      });
  }

  // Función para filtrar sets
  function filterSets(category, value) {
      if (!["country", "genre"].includes(category)) {
          console.error("Invalid category:", category);
          return;
      }
      const sets = galleryContainer.querySelectorAll(".set-post");
      if (sets.length === 0) {
          // Esperar a que los sets se carguen
          document.addEventListener("setsLoaded", () => {
              filterSets(category, value);
          }, { once: true });
          return;
      }
      sets.forEach(set => {
          const setValue = set.dataset[category]?.toLowerCase() || "";
          if (value === "all" || setValue === value) {
              set.style.display = "";
          } else {
              set.style.display = "none";
          }
      });
  }

  // Agregar listeners a los chips iniciales
  addChipListeners("country");

  // Aplicar filtro inicial cuando los sets estén cargados
  document.addEventListener("setsLoaded", () => {
      filterSets("country", "all");
      // Reaplicar listeners a los chips iniciales
      addChipListeners("country");
  }, { once: true });
});