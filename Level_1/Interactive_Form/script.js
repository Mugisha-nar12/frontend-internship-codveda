document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interactive-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const passwordError = document.getElementById('password-error');
    const successMessage = document.getElementById('success-message');

    const validateName = () => {
        if (name.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Invalid email format.';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    };

    const validatePhone = () => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.value)) {
            phoneError.textContent = 'Phone number must be 10 digits.';
            phoneError.style.display = 'block';
            return false;
        } else {
            phoneError.style.display = 'none';
            return true;
        }
    };

    const validatePassword = () => {
        if (password.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            passwordError.style.display = 'block';
            return false;
        } else {
            passwordError.style.display = 'none';
            return true;
        }
    };

    name.addEventListener('blur', validateName);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    password.addEventListener('blur', validatePassword);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();

        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
            successMessage.textContent = 'Form submitted successfully!';
            form.reset();
        } else {
            successMessage.textContent = '';
        }
    });
});