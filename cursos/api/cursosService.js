import axiosInstance from './axiosInstance';
import { cursos as cursosLocais } from '../data/cursos';

export const cursosService = {
  // Obter todos os cursos
  async buscarCursos() {
    try {
      console.log('🔄 Buscando cursos do servidor...');
      const response = await axiosInstance.get('/cursos');
      console.log('✅ Cursos carregados do servidor!');
      return response.data;
    } catch (error) {
      // Mostra detalhes completos do erro
      console.error('❌ ERRO ao buscar cursos:');
      console.error('   Tipo:', error.code || error.message);
      console.error('   Status:', error.response?.status);
      console.error('   Mensagem:', error.response?.statusText || error.message);
      console.error('   URL tentada:', error.config?.url);
      
      // Se for erro de conexão, mostra qual é
      if (error.code === 'ECONNREFUSED') {
        console.error('   ⚠️  Servidor não está respondendo!');
      } else if (error.code === 'ENOTFOUND') {
        console.error('   ⚠️  URL não encontrada (DNS)!');
      } else if (!error.response) {
        console.error('   ⚠️  Erro de rede (sem resposta do servidor)');
      }
      
      console.warn('📦 Usando dados locais como fallback');
      // Retorna dados locais como fallback
      return cursosLocais;
    }
  },

  // Obter um curso específico
  async buscarCursoPorId(id) {
    try {
      const response = await axiosInstance.get(`/cursos/${id}`);
      return response.data;
    } catch (error) {
      // Se falhar, procura nos dados locais
      console.warn('⚠️ Curso não encontrado no servidor, buscando localmente');
      console.error('Erro:', error.message);
      const cursoLocal = cursosLocais.find(c => c.id === id);
      if (cursoLocal) {
        return cursoLocal;
      }
      throw error;
    }
  },

  // Criar um novo curso
  async criarCurso(dadosCurso) {
    try {
      console.log('🔄 Criando novo curso...');
      const response = await axiosInstance.post('/cursos', dadosCurso);
      console.log('✅ Curso criado com sucesso!');
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar curso:', error.message);
      throw error;
    }
  },

  // Deletar um curso
  async deletarCurso(id) {
    try {
      console.log('🔄 Deletando curso ID:', id);
      const response = await axiosInstance.delete(`/cursos/${id}`);
      console.log('✅ Curso deletado com sucesso!');
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao deletar curso:', error.message);
      throw error;
    }
  },

  // Atualizar um curso
  async atualizarCurso(id, dadosCurso) {
    try {
      console.log('🔄 Atualizando curso ID:', id);
      const response = await axiosInstance.put(`/cursos/${id}`, dadosCurso);
      console.log('✅ Curso atualizado com sucesso!');
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar curso:', error.message);
      throw error;
    }
  },
};