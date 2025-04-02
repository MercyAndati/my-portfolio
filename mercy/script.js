const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear existing messages
        const existingMessage = contactForm.querySelector('.form-success');
        if (existingMessage) existingMessage.remove();
        
        // Create and show sending message
        const message = document.createElement('div');
        message.className = 'form-success';
        message.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i><p>Sending your message...</p>`;
        contactForm.querySelector('button[type="submit"]').after(message);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                message.innerHTML = `<i class="fas fa-check-circle"></i><p>Thank you! Your message has been sent.</p>`;
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch {
            message.innerHTML = `<i class="fas fa-times-circle"></i><p>Failed to send. Please try again or email me directly.</p>`;
        } finally {
            setTimeout(() => {
                message.classList.add('fade-out');
                setTimeout(() => message.remove(), 500);
            }, 5000);
        }
    });
}