const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

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
  const response = await fetch(`${BASE_URL}/workouts/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(selection),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  alert("No se puydo generar el entrenamiento.Comprueba si iniciaste sesion");
  return null;
};
