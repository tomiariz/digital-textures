document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.querySelector(".gallery-container");

    fetch("./sets.json")
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load sets.json: ${response.status}`);
            return response.json();
        })
        .then(data => {
            galleryContainer.innerHTML = ""; // Limpiar contenedor
            data.forEach(set => {
                const post = document.createElement("a");
                post.href = set.link;
                post.className = "set-post";
                post.dataset.country = set.country;
                post.dataset.genre = set.genre;
                post.innerHTML = `
                    <div class="set-cover">
                        <img src="${set.image}" alt="${set.dj} cover">
                        <p class="see-more">See More</p>
                    </div>
                `;
                galleryContainer.appendChild(post);
            });
            // Disparar evento cuando los sets están cargados
            document.dispatchEvent(new Event("setsLoaded"));
        })
        .catch(error => {
            console.error("Error cargando sets:", error);
            galleryContainer.innerHTML = "<p>Error loading sets. Please try again later.</p>";
        });
});