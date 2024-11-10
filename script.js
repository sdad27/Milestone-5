// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value.split(',');
    var experience = document.getElementById('experience').value.split(',');
    var skills = document.getElementById('skills').value.split(',');
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Helper function to create list items
    var createListItems = function (items) {
        return items.map(function (item) { return "<li>".concat(item.trim(), "</li>"); }).join('');
    };
    // Generate the resume content dynamically
    var resumeHTML = "\n        <h1>Resume</h1>\n        <div>\n            <fieldset>\n                <legend>Personal Information</legend>\n                <p><strong>Name:</strong><span contenteditable=\"true\">".concat(name, "</span></p>\n                <p><strong>Email:</strong><span contenteditable=\"true\">").concat(email, "</span></p>\n                <p><strong>Phone:</strong><span contenteditable=\"true\">").concat(phone, "</span></p>\n            </fieldset>\n\n            <fieldset>\n                <legend>Education</legend>\n                <ul contenteditable=\"true\">\n                    ").concat(createListItems(education), "\n                </ul>\n            </fieldset>\n\n            <fieldset>\n                <legend>Experience</legend>\n                <ul contenteditable=\"true\">\n                    ").concat(createListItems(experience), "\n                </ul>\n            </fieldset>\n\n            <fieldset>\n                <legend>Skills</legend>\n                <ul contenteditable=\"true\">\n                    ").concat(createListItems(skills), "\n                </ul>\n            </fieldset>\n        </div>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
