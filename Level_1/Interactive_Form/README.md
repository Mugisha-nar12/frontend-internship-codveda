# Interactive Form with Real-Time Validation

This project is a simple, interactive web form that provides real-time validation feedback to the user as they type. It is built using HTML, CSS, and vanilla JavaScript.

## How It Works

The form includes fields for Name, Email, Phone Number, and Password. As you fill out each field, the form provides instant feedback:

- A **green border** and a "Valid input" message appear when the data is entered correctly.
- A **red border** and an error message appear if the input is incorrect.

This immediate feedback helps guide the user to fill out the form correctly before they even try to submit it.

## Core Code Explanation

The functionality of this form is divided into three files: `index.html`, `style.css`, and `script.js`.

### 1. HTML Structure (`index.html`)

The HTML file provides the basic structure of the form. Each input field is grouped in a `div` with the class `form-group` and includes:

- A `label` for accessibility.
- An `input` field for user data.
- A `span` with the class `error` to display validation messages.

```html
<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
    <span class="error" aria-live="polite"></span>
</div>
```

### 2. Styling (`style.css`)

The CSS file styles the form to be clean and user-friendly. Key features include:

- A modern color scheme and centered layout.
- Consistent width for all input fields and the submit button.
- Visual feedback styles for valid and invalid inputs:
  - `input.valid`: Applies a green border.
  - `input.invalid`: Applies a red border.
- Error messages are colored red to draw attention.

```css
input.valid {
    border-color: #2ecc71;
}

input.invalid {
    border-color: #e74c3c;
}

.error {
    color: #e74c3c;
    font-size: 0.9em;
    display: block;
    margin-top: 5px;
}
```

### 3. JavaScript Logic (`script.js`)

This is the core of the interactive validation. The script listens for `input` events on each form field, allowing it to check the data in real-time.

#### Key Functions

- **`setValidationState(input, isValid, message)`**: This function is central to the visual feedback. It takes an input field, a boolean (`isValid`), and a message. Based on whether the input is valid, it:

  - Adds or removes the `valid` and `invalid` classes to change the border color.
  - Sets the error message text and color.

- **Validation Functions (`validateName`, `validateEmail`, etc.)**: Each field has a dedicated function to check its value against specific rules (e.g., email format, password length).

- **Event Listeners**: An `input` event listener is attached to each input field. When the user types, the corresponding validation function is called, and `setValidationState` updates the UI instantly.

```javascript
function setValidationState(input, isValid, message) {
    const errorElement = input.nextElementSibling;
    if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.textContent = 'Valid input';
        errorElement.style.color = '#2ecc71';
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
    }
}

nameInput.addEventListener('input', () => {
    const isValid = validateName(nameInput.value);
    setValidationState(nameInput, isValid, 'Name is required.');
});
```

This combination of HTML, CSS, and JavaScript creates a seamless and intuitive experience for the end-user while demonstrating key web development concepts for beginners.