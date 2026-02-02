import axiosInstance from './axiosInstance';

export const alunosService = {
  // Buscar dados do aluno por email
  async buscarAlunoPorEmail(email) {
    try {
      console.log('🔄 Buscando dados do aluno:', email);
      const response = await axiosInstance.get(`/alunos/${email}`);
      console.log('✅ Aluno encontrado:', response.data.nome);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar aluno:', error.message);
      if (error.response?.status === 404) {
        return null; // Aluno não encontrado
      }
      throw error;
    }
  },
};
