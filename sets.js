document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.querySelector(".gallery-container");

    // Cargar sets desde JSON
    fetch("./sets.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(set => {
                const setHTML = `
                    <a href="${set.link}" class="set-post" data-country="${set.country}" data-genre="${set.genre}">
                        <div class="set-cover">
                            <img src="${set.image}" alt="${set.dj} cover">
                        </div>
                    </a>
                `;
                galleryContainer.insertAdjacentHTML("beforeend", setHTML);
            });
        })
        .catch(error => console.error("Error cargando sets:", error));

});