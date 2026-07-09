const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0px)";

        }

    });

});

document.querySelectorAll("section").forEach(section => {

    section.style.opacity = 0;
    section.style.transform = "translateY(80px)";
    section.style.transition = "1s";

    observer.observe(section);

});

document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;

    // Cria as bolinhas de navegação
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

        // Para o vídeo quando o slide sai de vista (recarrega o iframe)
        slides.forEach((slide, i) => {
            const iframe = slide.querySelector('iframe');
            if (iframe && i !== currentIndex) {
                iframe.src = iframe.src;
            }
        });
    }

    function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
    }

    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    // Suporte a swipe (arrastar o dedo) no celular
    let startX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
        }
    });

});