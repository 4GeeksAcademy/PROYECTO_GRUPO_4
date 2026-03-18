const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const registerUser = async (data) => {

    try {

        const response = await fetch(`${BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        return result;

    } catch (error) {

        console.log("Register error:", error);

        return { error: "Server error" };

    }
};




export const loginUser = async (data) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        // --- ESTO ES PARA DEPURAR ---
        console.log("Respuesta del servidor:", result); 

        if (response.ok) {
            // Buscamos la llave dentro de la respuesta
            // Probamos con 'token' o con 'access_token' por si el PR cambió el nombre
            const realToken = result.token || result.access_token;

            if (realToken && typeof realToken === 'string') {
                localStorage.setItem("token", realToken);
                console.log("✅ ¡Llave guardada correctamente!");
            } else {
                console.error("❌ El servidor no envió un string. Envió:", realToken);
            }
        }
        return result;
    } catch (error) {
        console.error("Error en login:", error);
        return { error: "Server error" };
    }
};
export const getMuscles = async () => {
  const response = await fetch(`${BASE_URL}/muscles`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
};

export const getEquipment = async () => {
  const response = await fetch(`${BASE_URL}/equipment`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
};

export const generateWorkout = async (selection) => {
  const token= localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/workouts/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(selection),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  alert("No se puydo generar el entrenamiento. Comprueba si iniciaste sesion");
  return null;
};
