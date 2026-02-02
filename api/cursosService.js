import axiosInstance from './axiosInstance';

export const cursosService = {
  buildFormData(dadosCurso) {
    const formData = new FormData();

    Object.entries(dadosCurso).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'imagem') {
        formData.append(key, String(value));
      }
    });

    if (dadosCurso.imagem) {
      const uri = dadosCurso.imagem;
      if (uri.startsWith('file://') || uri.startsWith('content://')) {
        const fileName = uri.split('/').pop() || `imagem-${Date.now()}.jpg`;
        const ext = (fileName.split('.').pop() || 'jpg').toLowerCase();
        const type = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/jpeg';
        formData.append('imagem', { uri, name: fileName, type });
      } else {
        formData.append('imagem', uri);
      }
    }

    return formData;
  },
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
      
      throw error;
    }
  },

  // Obter um curso específico
  async buscarCursoPorId(id) {
    try {
      const response = await axiosInstance.get(`/cursos/${id}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar curso:', error.message);
      throw error;
    }
  },

  // Criar um novo curso
  async criarCurso(dadosCurso) {
    try {
      console.log('🔄 Criando novo curso...');
      const formData = this.buildFormData(dadosCurso);
      const response = await axiosInstance.post('/cursos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
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
      const formData = this.buildFormData(dadosCurso);
      const response = await axiosInstance.put(`/cursos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('✅ Curso atualizado com sucesso!');
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar curso:', error.message);
      throw error;
    }
  },
};