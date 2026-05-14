document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        return;
    }

    const statusEl = document.getElementById('contactFormStatus');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const pageUrlField = contactForm.querySelector('input[name="page_url"]');

    if (pageUrlField) {
        pageUrlField.value = window.location.href;
    }

    function setStatus(message, type) {
        if (!statusEl) {
            return;
        }

        statusEl.hidden = false;
        statusEl.textContent = message;
        statusEl.classList.remove('text-success', 'text-danger', 'text-light');

        if (type === 'success') {
            statusEl.classList.add('text-success');
            return;
        }

        if (type === 'error') {
            statusEl.classList.add('text-danger');
            return;
        }

        statusEl.classList.add('text-light');
    }

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        setStatus('Sending your message...', 'pending');

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                setStatus('Thank you. Your message has been sent successfully!', 'success');
                contactForm.reset();
            } else {
                let message = 'Something went wrong. Please try again in a moment.';

                try {
                    const data = await response.json();
                    if (data && data.errors && data.errors.length > 0 && data.errors[0].message) {
                        message = data.errors[0].message;
                    }
                } catch (_error) {
                    // Keep the default message when no JSON error payload is present.
                }

                setStatus(message, 'error');
            }
        } catch (_error) {
            setStatus('Network issue detected. Please check your connection and try again.', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
        }
    });
});
