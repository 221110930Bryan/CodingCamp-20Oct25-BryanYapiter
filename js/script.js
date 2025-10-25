// Page Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding page
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // Load saved name from localStorage when page loads
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('user-name').textContent = savedName;
        document.getElementById('userName').value = savedName;
    }
    
    // Add event listener to contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
});

// Add this new function for showing notifications
function showNotification(message, isSuccess = true) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification';
    
    if (isSuccess) {
        notification.style.backgroundColor = '#28a745'; // Green for success
    } else {
        notification.style.backgroundColor = '#dc3545'; // Red for error
    }
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Update welcome message with user's name
function updateGreeting() {
    const userNameInput = document.getElementById('userName');
    const userNameDisplay = document.getElementById('user-name');
    const userNameValue = userNameInput.value.trim();
    
    if (userNameValue) {
        userNameDisplay.textContent = userNameValue;
        // Store in localStorage so it persists across page refreshes
        localStorage.setItem('userName', userNameValue);
    } else {
        userNameDisplay.textContent = 'Guest';
        localStorage.removeItem('userName');
    }
}

// Form validation function
function validateForm(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    let selectedGender = '';
    
    // Validate each field
    let isValid = true;
    
    // Clear all previous errors
    clearError('name');
    clearError('email');
    clearError('phone');
    clearError('message');
    clearError('gender');
    
    // Name validation
    if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    if (!phone) {
        showError('phone', 'Please enter your phone number');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Message validation
    if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    // Gender validation
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            selectedGender = genderInputs[i].value;
            break;
        }
    }
    
    if (!selectedGender) {
        showError('gender', 'Please select your gender');
        isValid = false;
    }
    
    // If form is valid, show submission results
    if (isValid) {
        showSubmissionResult(name, email, phone, message, selectedGender);
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Clear gender selection
        for (let i = 0; i < genderInputs.length; i++) {
            genderInputs[i].checked = false;
        }
    } else {
        // Show error notification if validation fails
        showNotification('Please fix the errors in the form', false);
    }
}

// Update the showSubmissionResult function
function showSubmissionResult(name, email, phone, message, gender) {
    const resultName = document.getElementById('resultName');
    const resultEmail = document.getElementById('resultEmail');
    const resultPhone = document.getElementById('resultPhone');
    const resultMessage = document.getElementById('resultMessage');
    const resultGender = document.getElementById('resultGender');
    const resultDate = document.getElementById('resultDate');
    
    resultName.textContent = name;
    resultEmail.textContent = email;
    resultPhone.textContent = phone;
    resultMessage.textContent = message;
    resultGender.textContent = gender;
    resultDate.textContent = new Date().toLocaleString();
    
    // Show success notification
    showNotification('Message submitted successfully!');
}

// Helper function to show error messages
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Add error styling to input
    const inputElement = document.getElementById(fieldId);
    inputElement.style.borderColor = '#dc3545';
    inputElement.style.boxShadow = '0 0 5px rgba(220,53,69,0.2)';
}

// Helper function to clear error messages
function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.style.display = 'none';
    
    // Remove error styling from input
    const inputElement = document.getElementById(fieldId);
    inputElement.style.borderColor = '#ddd';
    inputElement.style.boxShadow = 'none';
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate phone number
function isValidPhone(phone) {
    // Simple phone validation - can be adjusted as needed
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});