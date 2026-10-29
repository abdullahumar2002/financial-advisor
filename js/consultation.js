// Send the enquiry through the visitor's email application.
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const body = [
            `Name: ${formData.get('name')}`,
            `Email: ${formData.get('email')}`,
            `Phone: ${formData.get('phone')}`,
            `Service: ${formData.get('service')}`,
            `Message: ${formData.get('message') || '(not provided)'}`
        ].join('\n');
        const subject = encodeURIComponent('Website enquiry');
        window.location.href = `mailto:enquiries@hensoncrisp.com?subject=${subject}&body=${encodeURIComponent(body)}`;
    });
}
