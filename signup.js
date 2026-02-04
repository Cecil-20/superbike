// Get form elements
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Form Submit Event Listener
signupForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Retrieve input values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate input fields
    if (name === "" || email === "" || password === "") {
        showAlert('Please fill in all fields.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.', 'error');
        return;
    }

    // Simulate successful registration
    showAlert('Account created successfully! Redirecting...', 'success');
    
    // Redirect to main page after 2 seconds
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
});

// Validate Email Format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Show Alert Message
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
