import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { styles } from '../styles/style-app';
import { cursosService } from '../api/cursosService';

export default function HomeScreen({ navigation }) {
  const [cursos, setCursos] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCursos();
  }, []);

  const carregarCursos = async () => {
    try {
      const dados = await cursosService.buscarCursos();
      setCursos(dados);
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
      setCursos([]);
    } finally {
      setLoading(false);
    }
  };

  const imagemSource = (imagem) => 
    typeof imagem === 'string' ? { uri: imagem } : imagem;

  const cursosFiltrados = cursos.filter((curso) =>
    curso.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    curso.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const renderCurso = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { curso: item })}
      activeOpacity={0.85}
    >
      <Image
        source={imagemSource(item.imagem)}
        style={styles.imagemCurso}
        resizeMode="cover"
      />

      <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
        <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
        
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: 11, color: '#00478e', fontWeight: '800' }}>👥</Text>
            <Text style={[styles.vagas, { marginBottom: 0 }]}>
              {item.vagas > 0 ? `${item.vagas} vagas disponíveis` : 'Sem vagas'}
            </Text>
          </View>
        </View>

        <View style={[styles.footer, { borderTopWidth: 0, marginTop: 15, paddingTop: 0 }]}>
          <View>
            <Text style={{ fontSize: 11, color: '#00478e', fontWeight: '600', marginBottom: 4 }}>Preço</Text>
            <Text style={styles.preco}>{item.preco}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 11, color: '#00478e', fontWeight: '600', marginBottom: 4 }}>Duração</Text>
            <Text style={styles.duracao}>{item.carga_horaria}h</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerHome}>
        <View>
          <Text style={styles.headerTitle}>Cursos Online</Text>
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 12, marginTop: 4, fontWeight: '500' }}>
            Explore nossos programas
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoPerfil}
          onPress={() => navigation.navigate('Admin')}
          activeOpacity={0.7}
        >
          <Text style={styles.botaoPerfilTexto}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
        <TextInput
          style={styles.buscaInput}
          placeholder='🔍 Buscar cursos...'
          placeholderTextColor="rgba(112, 112, 112, 0.6)"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0099ff" />
          <Text style={{ fontSize: 16, color: '#7f8c8d', marginTop: 12, fontWeight: '600' }}>
            Carregando cursos...
          </Text>
        </View>
      ) : cursosFiltrados.length > 0 ? (
        <FlatList
          data={cursosFiltrados}
          renderItem={renderCurso}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          numColumns={1}
        />
      ) : (
        <View style={styles.semResultados}>
          <Text style={styles.semResultadosText}>🔍 Nenhum curso encontrado</Text>
          <Text style={styles.semResultadosSub}>
            Tente buscar por outro termo ou veja todos os cursos disponíveis
          </Text>
        </View>
      )}
    </View>
  );
}