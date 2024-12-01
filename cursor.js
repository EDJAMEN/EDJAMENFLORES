document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, button, input, .interactive');

    // Optimize cursor movement with hardware acceleration
    cursor.style.willChange = 'transform';
    
    // Direct cursor positioning with transform for better performance
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    // Hover effects
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            element.style.cursor = 'none';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // Click effects with instant response
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    // Handle cursor visibility
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
});
