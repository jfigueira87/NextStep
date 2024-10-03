import axios from "axios"; 


export const URL = 'http://localhost:3000/nextstep'; 


export const postRegisterData = async (data) => {
  try {
      const response = await axios.post(URL, data);
      return response.data
  } catch (error) {
      console.error('Error al registrarte:', error);
      throw error;
  }
}