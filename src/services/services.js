//Relleno de prueba para que no esté vacío

import axios from "axios";
const URL_API = "http://localhost:8000/meme";
const URL_STORAGE = "https://api.cloudinary.com/v1_1/dz53okn10/image/upload";

//Get all memes -- GET
export async function getAllMemes() {
  try {
    const response = await axios.get(URL_API);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};