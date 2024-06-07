function toggleMenu() {
    var navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidesContainer = document.querySelector('.slides');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let slideInterval;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        const newTransformValue = `translateX(-${currentSlide * 100}%)`;
        slidesContainer.style.transform = newTransformValue;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 3000); // Restart auto-slide
    });

    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 3000); // Restart auto-slide
    });

    slidesContainer.addEventListener('touchstart', handleTouchStart, false);
    slidesContainer.addEventListener('touchmove', handleTouchMove, false);

    let xStart = null;

    function handleTouchStart(event) {
        xStart = event.touches[0].clientX;
        clearInterval(slideInterval);
    }

    function handleTouchMove(event) {
        if (!xStart) return;

        let xEnd = event.touches[0].clientX;
        let xDiff = xStart - xEnd;

        if (xDiff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }

        xStart = null;
        slideInterval = setInterval(nextSlide, 3000); // Restart auto-slide
    }

    // Auto-slide every 3 seconds
    slideInterval = setInterval(nextSlide, 3000);
});