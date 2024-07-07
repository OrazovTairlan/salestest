document.addEventListener("DOMContentLoaded", () => {
    const phoneInputField = document.querySelector("#phone");
    const token = "90e878d72b4ee6bbbfd69644090585b950f196e0";
    const phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
    });

    const form = document.querySelector(".form");
    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        clearErrors();

        if (isFormValid()) {
            const data = getFormData();
            document.querySelector(".form__actions-submit").classList.toggle("btn--attention")
            submitData(data);
        } else {
            alert('form is not completed');
        }
    }

    function clearErrors() {
        document.querySelectorAll('.field').forEach(field => {
            field.classList.remove('field--error');
        });
    }

    function isFormValid() {
        let valid = true;

        document.querySelectorAll('.field[required]').forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('field--error');
                valid = false;
            }
        });

        if (!phoneInput.isValidNumber()) {
            document.getElementById('phone').classList.add('field--error');
            valid = false;
        }

        return valid;
    }

    function getFormData() {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }

    async function submitData(data) {
        try {
            const response = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.success) {
                alert('success');
            } else {
                alert('error: ' + result.error);
            }
        } catch (error) {
            alert('error also: ' + error.message);
        }
    }
});