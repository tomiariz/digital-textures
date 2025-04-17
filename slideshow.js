document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider-about');
    
    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll('.slide');
        const sliderId = slider.getAttribute('data-slider-id');
        const dotsContainer = document.querySelector(`.dots[data-dots-id="${sliderId}"]`);
        
        let currentIndex = 0;
        const nextBtn = document.getElementById('next');
        const prevBtn = document.getElementById('prev');

        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length; // para que nunca salga del rango
            slider.style.transform = `translateX(-${100 * currentIndex}%)`;
            updateDots();
        }

        function updateDots() {
            dotsContainer.querySelectorAll(".dot").forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        // Botón siguiente
        nextBtn.addEventListener('click', function () {
            goToSlide(currentIndex + 1);
        });

        // Botón anterior
        prevBtn.addEventListener('click', function () {
            goToSlide(currentIndex - 1);
        });

        // Generar puntos dinámicamente
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Navegación táctil
        let startX = 0;
        slider.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener("touchend", (e) => {
            const endX = e.changedTouches[0].clientX;
            const threshold = 50;
            if (startX - endX > threshold) {
                goToSlide(currentIndex + 1);
            } else if (endX - startX > threshold) {
                goToSlide(currentIndex - 1);
            }
        });

        // Iniciar con el primer slide
        goToSlide(currentIndex);
    });
});
