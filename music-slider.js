class MusicSlider {
    constructor() {
        this.currentSlide = 0;
        this.slider = document.querySelector('.music-slider');
        this.slides = document.querySelectorAll('.music-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-nav.prev');
        this.nextBtn = document.querySelector('.slider-nav.next');
        
        this.init();
    }

    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add dot click events
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        this.slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, false);

        // Initialize play buttons
        const playButtons = document.querySelectorAll('.play-button, .play-track');
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const icon = button.querySelector('i');
                if (icon.classList.contains('fa-play')) {
                    icon.classList.replace('fa-play', 'fa-pause');
                } else {
                    icon.classList.replace('fa-pause', 'fa-play');
                }
            });
        });

        // Add hover effect for navigation arrows
        this.addNavHoverEffect();
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        if (startX - endX > threshold) {
            this.nextSlide();
        } else if (endX - startX > threshold) {
            this.prevSlide();
        }
    }

    updateSlider() {
        // Update slider position
        this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    addNavHoverEffect() {
        const addHoverEffect = (element, direction) => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = `translateY(-50%) scale(1.1) translateX(${direction === 'prev' ? '-5px' : '5px'})`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(-50%) scale(1)';
            });
        };

        addHoverEffect(this.prevBtn, 'prev');
        addHoverEffect(this.nextBtn, 'next');
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicSlider();
});
