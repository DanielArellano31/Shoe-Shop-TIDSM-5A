// app.post("/users/regist",registerUsers)
document.getElementById("submit-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validación básica
    if (!name || !email || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        rol: "client"
    };

    try {
        const response = await fetch("http://127.0.0.1:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const result = await response.json();
            alert("¡Usuario registrado exitosamente!");
            console.log(result);
            window.location.href = "../html/login.html"; // Redirige al formulario de inicio de sesión
        } else {
            const errorMsg = await response.text();
            alert(`Error al registrar usuario: ${errorMsg}`);
            console.error(`Error: ${response.status} - ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al registrar el usuario.");
    }
});