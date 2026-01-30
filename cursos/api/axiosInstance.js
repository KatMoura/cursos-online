import axios from 'axios';

const API_URL = 'http://192.168.1.66:3000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para melhorar mensagens de erro
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout: Servidor demorou muito para responder');
      error.message = 'Servidor demorou muito. Verifique se está rodando.';
    } else if (error.code === 'ERR_NETWORK') {
      console.error('🌐 Erro de rede: Não foi possível conectar ao servidor');
      error.message = 'Não foi possível conectar ao servidor. Verifique se ele está rodando em http://192.168.1.66:3000';
    } else if (!error.response) {
      console.error('❌ Sem resposta do servidor');
      error.message = 'Servidor não está respondendo. Inicie o servidor com: cd server && npm start';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;