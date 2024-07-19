const urlLogin = "https://655133be7d203ab6626ea39e.mockapi.io/users";
import { get_mail, get_pass } from "../controladores/login-controler.js";

// Función para obtener el token JWT


async function getToken() {
  try {
    let email = get_mail();
    let password = get_pass();
    const response = await fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    
    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Espera correctamente a que la respuesta se convierta en JSON

    
    return data.access_token; // Guarda el token globalmente para usarlo en las solicitudes
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

export const tokenServices = {
  getToken,
};