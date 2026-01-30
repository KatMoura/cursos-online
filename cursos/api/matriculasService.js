import axiosInstance from './axiosInstance';

export const matriculasService = {
  // Realizar inscrição
  async inscrever(nome, email, celular, idCurso) {
    try {
      const response = await axiosInstance.post('/matriculas', {
        nome,
        email,
        celular,
        id_curso: idCurso,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar inscrição:', error);
      throw error;
    }
  },

  // Obter matrículas do aluno por email
  async buscarMatriculas(emailAluno) {
    try {
      console.log('🔄 Buscando matrículas do aluno:', emailAluno);
      const response = await axiosInstance.get(`/matriculas/aluno/${emailAluno}`);
      console.log('✅ Matrículas carregadas:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar matrículas:', error.message);
      if (error.response?.status === 404) {
        // Aluno não tem matrículas ainda
        return [];
      }
      throw error;
    }
  },
};