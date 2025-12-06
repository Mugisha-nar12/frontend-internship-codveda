document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact-form form');
    const notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        notification.textContent = 'Message sent';
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);

        contactForm.reset();
    });
});