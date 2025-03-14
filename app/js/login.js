document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const loginButton = document.getElementById('login-btn');

    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }

            const data = await response.json();
            localStorage.setItem('userId', data.user._id); // Guarda el userId en localStorage
            window.location.href = 'dashboard.html'; // Redirige al dashboard
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert(error.message || 'Hubo un error al iniciar sesión');
        }
    });
});