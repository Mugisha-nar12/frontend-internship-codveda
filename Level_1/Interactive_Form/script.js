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

    const setValidationState = (input, errorElement, isValid, message) => {
        if (isValid) {
            input.style.borderColor = 'green';
            errorElement.textContent = 'Valid input';
            errorElement.style.color = 'green';
            errorElement.style.display = 'block';
        } else {
            input.style.borderColor = 'red';
            errorElement.textContent = message;
            errorElement.style.color = 'red';
            errorElement.style.display = 'block';
        }
    };

    const validateName = () => {
        const isValid = name.value.trim() !== '';
        setValidationState(name, nameError, isValid, 'Name is required.');
        return isValid;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email.value);
        setValidationState(email, emailError, isValid, 'email must contain with @.');
        return isValid;
    };

    const validatePhone = () => {
        const phoneRegex = /^\d{10}$/;
        const isValid = phoneRegex.test(phone.value);
        setValidationState(phone, phoneError, isValid, 'Phone number must be 10 digits.');
        return isValid;
    };

    const validatePassword = () => {
        const isValid = password.value.length >= 8;
        setValidationState(password, passwordError, isValid, 'Password must be at least 8 characters long.');
        return isValid;
    };

    name.addEventListener('input', validateName);
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);
    password.addEventListener('input', validatePassword);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();

        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
            successMessage.textContent = 'Form submitted successfully!';
            form.reset();
            [name, email, phone, password].forEach(input => {
                input.style.borderColor = '#ccc';
                document.getElementById(`${input.id}-error`).style.display = 'none';
            });
        } else {
            successMessage.textContent = '';
        }
    });
});