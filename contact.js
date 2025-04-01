// Initialize phone input
const phoneInput = window.intlTelInput(document.querySelector("#phone"), {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    preferredCountries: ["in", "us", "gb"],
    separateDialCode: true
});

// Email validation
const emailInput = document.querySelector("#email");
const emailValidation = document.querySelector(".email-validation");

emailInput.addEventListener("input", () => {
    const email = emailInput.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (email) {
        emailValidation.textContent = isValid ? "Valid email address" : "Invalid email address";
        emailValidation.className = `email-validation ${isValid ? "valid" : "invalid"}`;
    } else {
        emailValidation.textContent = "";
        emailValidation.className = "email-validation";
    }
});

// File validation
const attachments = document.querySelector("#attachments");
attachments.addEventListener("change", () => {
    const files = attachments.files;
    let totalSize = 0;
    const maxSize = 25 * 1024 * 1024; // 25MB
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];

    for (const file of files) {
        totalSize += file.size;
        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Invalid file type",
                text: "Please upload only PDF, DOC, DOCX, JPG, or PNG files"
            });
            attachments.value = "";
            return;
        }
        if (file.size > maxSize) {
            Swal.fire({
                icon: "error",
                title: "File too large",
                text: "Each file must be less than 25MB"
            });
            attachments.value = "";
            return;
        }
    }

    if (totalSize > maxSize) {
        Swal.fire({
            icon: "error",
            title: "Total size exceeded",
            text: "Total attachments size must be less than 25MB"
        });
        attachments.value = "";
    }
});

// Form submission
document.querySelector("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData();
    formData.append("name", document.querySelector("#name").value);
    formData.append("email", document.querySelector("#email").value);
    formData.append("phone", phoneInput.getNumber());
    formData.append("message", document.querySelector("tinymce-editor").getContent());

    // Add files
    const files = document.querySelector("#attachments").files;
    for (const file of files) {
        formData.append("attachments", file);
    }

    try {
        // Here you would normally send the form data to your server
        // For demonstration, we'll show a success message
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We'll get back to you soon.",
            confirmButtonColor: "#4ade80"
        });

        // Reset form
        e.target.reset();
        document.querySelector("tinymce-editor").setContent("");
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again.",
            confirmButtonColor: "#4ade80"
        });
    }
});

// Initialize hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});