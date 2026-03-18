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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok && result.token) {
            localStorage.setItem("token", result.token); 
            
            console.log("Sesión iniciada: Token guardado en el navegador.");
        }

        return result;

    } catch (error) {

        console.log("Login error:", error);

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
