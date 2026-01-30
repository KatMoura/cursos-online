import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { cursos as cursosLocais } from '../data/cursos';
import { styles } from '../styles/style-app';
import { cursosService } from '../api/cursosService';


export default function HomeScreen({ navigation }) {
  // Estado dos cursos
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usandoLocal, setUsandoLocal] = useState(false);

  // Carrega os cursos quando a tela abre
  useEffect(() => {
    carregarCursos();
  }, []);

  // Função para carregar cursos
  const carregarCursos = async () => {
    try {
      const dados = await cursosService.buscarCursos();
      setCursos(dados);
      
      // Se os dados são locais, mostra aviso
      if (dados === cursosLocais) {
        setUsandoLocal(true);
      }
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
      // Se falhar, usa dados locais como último recurso
      setCursos(cursosLocais);
      setUsandoLocal(true);
    } finally {
      setLoading(false);
    }
  };

  // Estado para armazenar o texto de busca
  const [busca, setBusca] = useState('');

  // Filtra os cursos baseado no que o usuário digitou
  const cursosFiltrados = cursos.filter((curso) => {
    // Procura na título ou na descrição
    return (
      curso.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      curso.descricao.toLowerCase().includes(busca.toLowerCase())
    );
  });

  // Função que renderiza cada curso na lista
  const renderCurso = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { curso: item })}
      activeOpacity={0.85}
    >
      <Image
        source={item.imagem}
        style={styles.imagemCurso}
        resizeMode="cover"
      />

      <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
        <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
        <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
        
        <View style={{ marginTop: 12, gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontSize: 11, color: '#2ecc71', fontWeight: '800' }}>👥</Text>
            <Text style={[styles.vagas, { marginBottom: 0 }]}>
              {item.vagas > 0 ? `${item.vagas} vagas disponíveis` : 'Sem vagas'}
            </Text>
          </View>
        </View>

        <View style={[styles.footer, { borderTopWidth: 0, marginTop: 12, paddingTop: 0 }]}>
          <View>
            <Text style={{ fontSize: 11, color: '#888', fontWeight: '600', marginBottom: 4 }}>Preço</Text>
            <Text style={styles.preco}>{item.preco}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 11, color: '#888', fontWeight: '600', marginBottom: 4 }}>Duração</Text>
            <Text style={styles.duracao}>{item.carga_horaria}h</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* AVISO: Usando dados locais */}
      {usandoLocal && (
        <View style={{ 
          backgroundColor: '#f39c12', 
          padding: 12, 
          marginHorizontal: 16,
          marginTop: 12,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#f39c12',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ color: 'white', fontWeight: '700', flex: 1, fontSize: 14 }}>
            ⚠️ Servidor offline - Dados locais
          </Text>
        </View>
      )}

      {/* CABEÇALHO COM BARRA DE BUSCA */}
      <View style={styles.headerHome}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Meus Cursos</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4, fontWeight: '500' }}>Explore nossos programas</Text>
        </View>

        {/* Botão Admin */}
        <TouchableOpacity
          style={styles.botaoPerfil}
          onPress={() => navigation.navigate('Admin')}
          activeOpacity={0.7}
        >
          <Text style={styles.botaoPerfilTexto}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Input de busca */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
        <TextInput
          style={styles.buscaInput}
          placeholder='🔍 Buscar cursos...'
          placeholderTextColor="rgba(112, 112, 112, 0.6)"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* LISTA DE CURSOS */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={{ fontSize: 16, color: '#7f8c8d', marginTop: 12, fontWeight: '600' }}>Carregando cursos...</Text>
        </View>
      ) : cursosFiltrados.length > 0 ? (
        <FlatList
          data={cursosFiltrados}
          renderItem={renderCurso}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          numColumns={1}
        />
      ) : (
        <View style={styles.semResultados}>
          <Text style={styles.semResultadosText}>🔍 Nenhum curso encontrado</Text>
          <Text style={styles.semResultadosSub}>Tente buscar por outro termo ou veja todos os cursos disponíveis</Text>
        </View>
      )}
    </View>
  );
}