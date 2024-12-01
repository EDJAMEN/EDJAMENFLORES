document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation classes to the section
        entry.target.classList.add('scroll-animation', 'active');
        
        // Add delayed animations to children
        const children = entry.target.querySelectorAll('.animate-child');
        children.forEach((child, index) => {
          child.classList.add(`scroll-animation-delay-${index + 1}`);
          child.classList.add('active');
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    section.classList.add('scroll-animation');
    
    // Add animation classes to important children
    const children = section.querySelectorAll('h2, .music-card, .timeline-item, .contact-card');
    children.forEach(child => {
      child.classList.add('animate-child', 'scroll-animation');
    });
    
    observer.observe(section);
  });
});
