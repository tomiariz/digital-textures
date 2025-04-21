document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch("./sets.json")
        .then(response => response.json())
        .then(data => {
            const set = data.find(item => item.id === id);

            if (!set) {
                document.getElementById("set-title").textContent = "Set no encontrado";
                return;
            }

            document.getElementById("set-title").textContent = `${set.title} by ${set.dj}`;
            document.getElementById("set-description").textContent = set.description;

            document.getElementById("youtube-container").innerHTML = set.youtube;
            document.getElementById("soundcloud-container").innerHTML = set.soundcloud;
            document.getElementById("spotify-container").innerHTML = set.spotify;
        })
        .catch(error => {
            console.error("Error cargando sets:", error);
            document.getElementById("set-title").textContent = "Error cargando set";
        });
});
