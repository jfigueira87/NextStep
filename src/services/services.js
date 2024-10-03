import axios from "axios"; 


export const URL = 'http://localhost:4000/registerUsers'; 


export const postRegisterData = async (data) => {
  try {
      const response = await axios.post(URL, data);
      return response.data
  } catch (error) {
      console.error('Error al registrarte:', error);
      throw error;
  }
}
export async function getAllusers() {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};