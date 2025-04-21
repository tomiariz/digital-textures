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

    // Función para agregar listeners a los botones de categoría
    function addCategoryListeners() {
        document.querySelectorAll(".category-btn").forEach(btn => {
            // Remover listeners previos para evitar duplicados
            btn.removeEventListener("click", handleCategoryClick);
            btn.addEventListener("click", handleCategoryClick);
        });
    }

    function handleCategoryClick() {
        const selected = this.dataset.category;
        console.log("Selected category:", selected); // Depuración
        const subs = subcategories[selected];
        console.log("Subcategories:", subs); // Depuración

        if (!subs) {
            console.error("No subcategories found for:", selected);
            return;
        }

        // Actualizar chips
        subcategoryList.innerHTML = subs.map(sub => `<button class="chip" data-value="${sub.toLowerCase()}">${sub}</button>`).join("");
        categoryMenu.classList.add("hidden");

        // Agregar event listeners a los nuevos chips
        addChipListeners(selected);
    }

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

    // Inicializar listeners
    addCategoryListeners();
    addChipListeners("country");

    // Aplicar filtro inicial cuando los sets estén cargados
    document.addEventListener("setsLoaded", () => {
        filterSets("country", "all");
        addChipListeners("country");
        addCategoryListeners(); // Reaplicar por si script.js modifica el DOM
    }, { once: true });
});