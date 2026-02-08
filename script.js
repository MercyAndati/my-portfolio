// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Icon animation toggle
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        // Since we are using formsubmit.co, let the default submission happen or manage it via AJAX
        // If the user wants AJAX behavior for better UX:
        e.preventDefault();
        
        // Clear existing messages
        const existingMessage = contactForm.querySelector('.form-success');
        if (existingMessage) existingMessage.remove();
        
        // Create and show sending message
        const message = document.createElement('div');
        message.className = 'form-success';
        message.style.marginTop = '1rem';
        message.style.color = 'var(--accent)';
        message.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Sending your message...`;
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.after(message);
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                message.innerHTML = `<i class="fas fa-check-circle"></i> Thank you! Your message has been sent.`;
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            message.innerHTML = `<i class="fas fa-times-circle"></i> Failed to send. Please try again or email me directly at andatishine@gmail.com`;
            message.style.color = '#ff6b6b';
        } finally {
            submitBtn.disabled = false;
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 500);
            }, 5000);
        }
    });
}