document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.documentElement;
    const menuButton = document.querySelector('#menuButton');
    const menu = document.getElementById("menu-container");
    const menuItems = document.querySelectorAll('.menu li');

    let currentRotation = 0;

    // Al hacer click en el botón, togglea el menú y rota el botón
    menuButton.addEventListener('click', () => {
        toggleMenu(menu, menuItems);

        currentRotation -= 45;
        menuButton.style.transform = `rotate(${currentRotation}deg)`;
    });

    // Mostrar u ocultar el menú
    function toggleMenu(menu, items) {
        rootElement.toggleAttribute('menu-open');
        menu.classList.toggle("open");

        if (menu.classList.contains("open")) {
            items.forEach((item, index) => {
                setTimeout(() => item.classList.add("show"), index * 150);
            });
        } else {
            items.forEach(item => item.classList.remove("show"));
        }
    }
});
