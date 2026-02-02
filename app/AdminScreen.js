import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Alert,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { styles } from '../styles/style-app';
import { cursosService } from '../api/cursosService';
import * as ImagePicker from 'expo-image-picker';

const INITIAL_FORM = {
  titulo: '',
  descricao: '',
  cargaHoraria: '',
  duracao: '',
  preco: '',
  vagas: '',
  imagem: '',
};

export default function AdminScreen({ navigation }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cursoEmEdicao, setCursoEmEdicao] = useState(null);
  const [carregandoModal, setCarregandoModal] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    try {
      setLoading(true);
      const dados = await cursosService.buscarCursos();
      setCursos(dados);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os cursos');
    } finally {
      setLoading(false);
    }
  };

  const limparFormulario = () => {
    setFormData(INITIAL_FORM);
    setCursoEmEdicao(null);
  };

  const normalizarPreco = (valor) => {
    if (valor === null || valor === undefined) return NaN;
    if (typeof valor === 'number') return valor;
    const limpo = String(valor).replace(/[^\d,.-]/g, '').replace(',', '.');
    const num = parseFloat(limpo);
    return Number.isFinite(num) ? num : NaN;
  };

  const atualizarFormData = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const selecionarImagem = async () => {
    if (carregandoModal) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Autorize o acesso às fotos para selecionar uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        atualizarFormData('imagem', uri);
      }
    }
  };

  const abrirModalNovo = () => {
    limparFormulario();
    setModalVisible(true);
  };

  const abrirModalEdicao = (curso) => {
    setCursoEmEdicao(curso);
    setFormData({
      titulo: curso.titulo,
      descricao: curso.descricao,
      cargaHoraria: curso.carga_horaria.toString(),
      duracao: curso.duracao,
      preco: normalizarPreco(curso.preco).toString(),
      vagas: curso.vagas.toString(),
      imagem: curso.imagem || '',
    });
    setModalVisible(true);
  };

  const salvarCurso = async () => {
    if (!formData.titulo.trim() || !formData.descricao.trim() || !formData.cargaHoraria.trim() || !formData.duracao.trim() || !formData.preco.trim() || !formData.vagas.trim()) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos');
      return;
    }

    const precoNormalizado = normalizarPreco(formData.preco);
    if (!Number.isFinite(precoNormalizado)) {
      Alert.alert('Erro', 'Preço inválido. Use apenas números, por exemplo 199.90');
      return;
    }

    try {
      setCarregandoModal(true);
      
      const dadosCurso = {
        titulo: formData.titulo.trim(),
        descricao: formData.descricao.trim(),
        carga_horaria: parseInt(formData.cargaHoraria),
        duracao: formData.duracao.trim(),
        preco: precoNormalizado,
        vagas: parseInt(formData.vagas),
        imagem: formData.imagem.trim(),
      };

      if (cursoEmEdicao) {
        await cursosService.atualizarCurso(cursoEmEdicao.id, dadosCurso);
        Alert.alert('Sucesso', 'Curso atualizado!');
      } else {
        await cursosService.criarCurso(dadosCurso);
        Alert.alert('Sucesso', 'Curso criado com sucesso!');
      }

      setModalVisible(false);
      limparFormulario();
      carregarCursos();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar: ' + error.message);
    } finally {
      setCarregandoModal(false);
    }
  };

  const deletarCurso = (curso) => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja deletar "${curso.titulo}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              setLoading(true);
              await cursosService.deletarCurso(curso.id);
              Alert.alert('Sucesso', 'Curso deletado!');
              carregarCursos();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível deletar: ' + error.message);
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderCurso = ({ item }) => (
    <View style={styles.cardAdmin}>
      <View style={{ flex: 1 }}>
        <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
        
        <View style={{ marginTop: 14, gap: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#888', fontWeight: '600' }}>⏱️</Text>
              <Text style={styles.duracao}>{item.carga_horaria}h</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#888', fontWeight: '600' }}>👥</Text>
              <Text style={styles.vagas}>{item.vagas} vagas</Text>
            </View>
          </View>
          
          <View style={{ backgroundColor: '#f5f5f5', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 }}>
            <Text style={styles.preco}>{item.preco}</Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 16, flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={[styles.botaoAdmin, { backgroundColor: '#0060c1', flex: 1 }]}
          onPress={() => abrirModalEdicao(item)}
          activeOpacity={0.7}
        >
          <Text style={{ color: '#ffffff', fontWeight: '700', textAlign: 'center', fontSize: 14 }}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoAdmin, { backgroundColor: '#e74c3c', flex: 1 }]}
          onPress={() => deletarCurso(item)}
          activeOpacity={0.7}
        >
          <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center', fontSize: 14 }}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerHome}>
        <Text style={styles.headerTitle}>Gerenciar Cursos</Text>
        <TouchableOpacity
          style={[styles.botaoPerfil, { backgroundColor: '#ffffff' }]}
          onPress={abrirModalNovo}
          activeOpacity={0.7}
        >
          <Text style={styles.botaoPerfilTexto}>➕</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#00478e" />
          <Text style={{ fontSize: 16, color: '#7f8c8d', marginTop: 10 }}>Carregando...</Text>
        </View>
      ) : cursos.length > 0 ? (
        <FlatList
          data={cursos}
          renderItem={renderCurso}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          numColumns={1}
        />
      ) : (
        <View style={styles.semResultados}>
          <Text style={styles.semResultadosText}>📚 Nenhum curso criado</Text>
          <Text style={styles.semResultadosSub}>Clique em ➕ para criar</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.container, { paddingTop: 50 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16,marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#c6c6c6', paddingBottom: 16 }}>
            <Text style={{color: '#00478e', marginTop: 0, fontSize: 26, fontWeight: '800' }}>
              {cursoEmEdicao ? 'Editar' : '➕ Novo Curso'}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.7} style={{ padding: 8, backgroundColor: '#ffe0e0', borderRadius: 12 }}>
              <Text style={{ fontSize: 24, color: '#ffa399', fontWeight: '700' }}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Título do Curso *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: JavaScript Avançado"
              placeholderTextColor="#bbb"
              value={formData.titulo}
              onChangeText={(val) => atualizarFormData('titulo', val)}
              editable={!carregandoModal}
            />

            <Text style={styles.label}>Descrição *</Text>
            <TextInput
              style={[styles.input, { minHeight: 110, textAlignVertical: 'top' }]}
              placeholder="Descreva os principais tópicos do curso..."
              placeholderTextColor="#bbb"
              value={formData.descricao}
              onChangeText={(val) => atualizarFormData('descricao', val)}
              multiline={true}
              numberOfLines={5}
              editable={!carregandoModal}
            />

            <Text style={styles.label}>Carga Horária (horas) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 40"
              placeholderTextColor="#bbb"
              value={formData.cargaHoraria}
              onChangeText={(val) => atualizarFormData('cargaHoraria', val)}
              keyboardType="numeric"
              editable={!carregandoModal}
            />

            <Text style={styles.label}>Duração *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 4 semanas"
              placeholderTextColor="#bbb"
              value={formData.duracao}
              onChangeText={(val) => atualizarFormData('duracao', val)}
              editable={!carregandoModal}
            />

            <Text style={styles.label}>Preço (R$) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 199.90"
              placeholderTextColor="#bbb"
              value={formData.preco}
              onChangeText={(val) => atualizarFormData('preco', val)}
              keyboardType="decimal-pad"
              editable={!carregandoModal}
            />

            <Text style={styles.label}>Vagas Disponíveis *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 30"
              placeholderTextColor="#bbb"
              value={formData.vagas}
              onChangeText={(val) => atualizarFormData('vagas', val)}
              keyboardType="numeric"
              editable={!carregandoModal}
            />

            <Text style={styles.label}>Imagem do Curso</Text>
            <TouchableOpacity
              style={[styles.botaoConfirmar, { backgroundColor: '#00478e' }]}
              onPress={selecionarImagem}
              disabled={carregandoModal}
              activeOpacity={0.7}
            >
              <Text style={{ color: 'white', fontWeight: '800', textAlign: 'center', fontSize: 16 }}>
                Selecionar imagem
              </Text>
            </TouchableOpacity>

            {formData.imagem ? (
              <View style={{ marginTop: 12 }}>
                <Image
                  source={{ uri: formData.imagem }}
                  style={{ width: '100%', height: 160, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => atualizarFormData('imagem', '')}
                  disabled={carregandoModal}
                  style={{ marginTop: 8, alignSelf: 'flex-start' }}
                >
                  <Text style={{ color: '#e74c3c', fontWeight: '700' }}>Remover imagem</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 32, marginBottom: 20 }}>
              <TouchableOpacity
                style={[styles.botaoConfirmar, { backgroundColor: '#a5a7a7', flex: 1 }]}
                onPress={() => {
                  setModalVisible(false);
                  limparFormulario();
                }}
                disabled={carregandoModal}
                activeOpacity={0.7}
              >
                <Text style={{ color: 'white', fontWeight: '800', textAlign: 'center', fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botaoConfirmar, { backgroundColor: '#00478e', flex: 1 }]}
                onPress={salvarCurso}
                disabled={carregandoModal}
                activeOpacity={0.7}
              >
                {carregandoModal ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={{ color: 'white', fontWeight: '800', textAlign: 'center', fontSize: 16 }}>
                    {cursoEmEdicao ? 'Atualizar' : 'Criar'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
