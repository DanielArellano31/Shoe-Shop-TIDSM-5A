document.getElementById('login-btn').addEventListener('click', async (e) => {
    e.preventDefault(); // Corregido: agregar paréntesis para llamar a la función
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            window.location.href = '../html/dashboard.html'; // Redirige al dashboard
        } else {
            alert('Error al iniciar sesión. Verifique sus credenciales.');
            console.error(`Error: ${response.status} - ${data.error}`);
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        alert('Hubo un problema al iniciar sesión.');
    }
});