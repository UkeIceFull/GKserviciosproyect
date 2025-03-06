const API_KEY = "d2dadfb40d0342b787d8b5bf84b477a3"; 
const BASE_URL = "https://newsapi.org/v2/everything?q=seguridad OR robo OR asalto OR delito OR crimen OR policía&language=es";

export const fetchNoticias = async () => {
  try {
    const response = await fetch(`${BASE_URL}&apiKey=${API_KEY}`);
    const data = await response.json();
    if (data.articles) {
      return data.articles;
    }
    return [];
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    return [];
  }
};
