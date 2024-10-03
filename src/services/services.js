
import axios from "axios";
const URL_API = "http://localhost:8000/meme";


//Get all users -- GET
export async function getAllusers() {
  try {
    const response = await axios.get(URL_API);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};