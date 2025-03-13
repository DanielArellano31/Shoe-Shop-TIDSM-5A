document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    const formData = {};

    inputs.forEach(input => {
        input.addEventListener('change', function (event) {
            formData[event.target.name] = event.target.value;
            console.log(formData);
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});