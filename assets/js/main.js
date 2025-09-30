// ===== ZIGMA DENTAL CLINIC - MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change hamburger icon
            const icon = this.querySelector('i') || this;
            if (navMenu.classList.contains('active')) {
                icon.innerHTML = '✕';
            } else {
                icon.innerHTML = '☰';
            }
        });

        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    }
    
    // ===== SCROLL TO TOP FUNCTIONALITY =====
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !phone) {
                showNotification('Пожалуйста, заполните обязательные поля', 'error');
                return;
            }
            
            // Phone validation (basic Belarus format)
            const phoneRegex = /^(\+375|375|8)\s?\(?\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                showNotification('Пожалуйста, введите корректный номер телефона', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // ===== CONSULTATION BUTTONS =====
    const consultationBtns = document.querySelectorAll('.btn-consultation, .btn-primary');
    
    consultationBtns.forEach(function(btn) {
        if (btn.textContent.includes('консультацию') || btn.textContent.includes('Записаться')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to contact form or show phone
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Show phone number
                    showNotification('Запись на консультацию: +375 29 640-03-03', 'info');
                }
            });
        }
    });
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 9999;
                    max-width: 400px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .notification-error {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                .notification-info {
                    background: #d1ecf1;
                    color: #0c5460;
                    border: 1px solid #bee5eb;
                }
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: inherit;
                    opacity: 0.7;
                }
                .notification-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // ===== ANIMATION ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .feature-item, .about-content, .contact-info-card, .contact-form');
    elementsToAnimate.forEach(function(el) {
        observer.observe(el);
    });
    
    // ===== HEADER BACKGROUND ON SCROLL =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });
    }
    
    // ===== PHONE NUMBER FORMATTING =====
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
    
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Belarus phone format
            if (value.length > 0) {
                if (value.startsWith('375')) {
                    value = '+' + value;
                } else if (value.startsWith('80')) {
                    value = '+375' + value.substring(2);
                } else if (!value.startsWith('+375')) {
                    value = '+375' + value;
                }
                
                // Format as +375 (XX) XXX-XX-XX
                value = value.replace(/(\+375)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
            }
            
            e.target.value = value;
        });
        
        // Set placeholder
        if (!input.placeholder) {
            input.placeholder = '+375 (XX) XXX-XX-XX';
        }
    });
    
    // ===== PAGE LOAD COMPLETE =====
    console.log('Zigma Dental Clinic website loaded successfully!');
});

// ===== UTILITY FUNCTIONS =====

// Auto scroll to top when page changes (for SPA navigation)
function autoScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format phone number for display
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('375')) {
        return cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    }
    return phone;
}