import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/style-app';
import { matriculasService } from '../api/matriculasService';


// Função para validar email
function ehEmailValido(email) {
  // Verifica se tem @ e um ponto
  const temArroba = email.includes('@');
  const temPonto = email.includes('.');
  return temArroba && temPonto;
}

// Função para formatar telefone de forma simples
function formatarTelefone(texto) {
  // Remove tudo que não é número
  const apenasNumeros = texto.replace(/\D/g, '');

  // Se tem 11 números, formata como (XX) XXXXX-XXXX
  if (apenasNumeros.length >= 10) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
  }

  // Se tem menos números, apenas mostra os números
  return apenasNumeros;
}

export default function InscricaoScreen({ route, navigation }) {
  // Pega o curso que foi passado pela navegação
  const { curso } = route.params;

  // Estados (dados que mudam)
  const [nome, setNome] = useState('');           // Armazena o nome
  const [email, setEmail] = useState('');         // Armazena o email
  const [celular, setCelular] = useState('');     // Armazena o celular
  const [loading, setLoading] = useState(false);  // Carregando = true enquanto processa

  // Função que é chamada quando o usuário aperta "Confirmar Inscrição"
  const handleInscrever = async () => {
    // 1. Verifica se nome não está vazio
    if (nome.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha o nome!');
      return; // Para a execução aqui
    }

    // 2. Verifica se email não está vazio
    if (email.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha o email!');
      return;
    }

    // 3. Verifica se email é válido
    if (!ehEmailValido(email)) {
      Alert.alert('Erro', 'Email inválido!');
      return;
    }

    // 4. Verifica se celular não está vazio
    if (celular.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha o celular!');
      return;
    }

    // 5. Verifica se ainda tem vagas
    if (curso.vagas <= 0) {
      Alert.alert('Erro', 'Este curso não tem mais vagas!');
      return;
    }

    try {
      setLoading(true);
      const resultado = await matriculasService.inscrever(
        nome,
        email,
        celular,
        curso.id
      );

      // Salva o email do usuário para uso futuro
      await AsyncStorage.setItem('userEmail', email);

      Alert.alert('Sucesso!', 'Inscrição realizada com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro completo:', error);
      
      let mensagem = 'Não foi possível realizar a inscrição.';
      
      if (error.code === 'ECONNABORTED') {
        mensagem = 'O servidor demorou muito para responder. Verifique se ele está rodando.';
      } else if (error.code === 'ERR_NETWORK' || !error.response) {
        mensagem = 'Não foi possível conectar ao servidor.\n\nVerifique se o servidor está rodando em:\nhttp://192.168.0.120:3000';
      } else if (error.response?.status === 400) {
        mensagem = error.response.data.error || 'Dados inválidos.';
      } else if (error.response?.status === 500) {
        mensagem = 'Erro no servidor. Verifique os logs do servidor.';
      }
      
      Alert.alert('Erro ao Inscrever', mensagem);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      {/* CABEÇALHO COM IMAGEM */}
      <View style={styles.header}>
        {/* Botão de voltar */}
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
        </TouchableOpacity>

        {/* Imagem do curso */}
        <Image
          source={curso.imagem}
          style={styles.imagemCurso}
          resizeMode="cover"
        />

        {/* Título */}
        <Text style={styles.headerTitle}>Inscrição em Curso</Text>
        <Text style={styles.headerSubtitle}>{curso.titulo}</Text>
      </View>

      {/* CONTEÚDO ROLÁVEL */}
      <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>

        {/* SEÇÃO 1: FORMULÁRIO COM OS CAMPOS */}
        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Seus Dados</Text>

          {/* Campo: Nome */}
          <View style={styles.secao}>
            <Text style={styles.label}>Nome Completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#bdc3c7"
              value={nome}
              onChangeText={setNome}
              editable={!loading}
            />
          </View>

          {/* Campo: Email */}
          <View style={styles.secao}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="seu.email@exemplo.com"
              placeholderTextColor="#bdc3c7"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          {/* Campo: Celular */}
          <View style={styles.secao}>
            <Text style={styles.label}>Celular *</Text>
            <TextInput
              style={styles.input}
              placeholder="(11) 98765-4321"
              placeholderTextColor="#bdc3c7"
              keyboardType="phone-pad"
              value={celular}
              onChangeText={(texto) => setCelular(formatarTelefone(texto))}
              editable={!loading}
            />
          </View>
        </View>

        {/* SEÇÃO 2: RESUMO DO QUE VAI SER COBRADO */}
        <View style={styles.resumo}>
          <Text style={styles.labelResumo}>Resumo da Inscrição</Text>

          {/* Mostra: Nome do Curso */}
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Curso</Text>
            <Text style={styles.resumoValor}>{curso.titulo}</Text>
          </View>

          {/* Mostra: Horas do Curso */}
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Carga Horária</Text>
            <Text style={styles.resumoValor}>{curso.carga_horaria}h</Text>
          </View>

          {/* Mostra: Preço (em verde) */}
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Preço</Text>
            <Text style={[styles.resumoValor, { color: '#27ae60', fontWeight: 'bold' }]}>
              {curso.preco}
            </Text>
          </View>

          {/* Mostra: Vagas (verde se tem, vermelho se não tem) */}
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Vagas Disponíveis</Text>
            <Text style={[
              styles.resumoValor,
              { color: curso.vagas > 0 ? '#27ae60' : '#e74c3c' }
            ]}>
              {curso.vagas > 0 ? `${curso.vagas} vagas` : 'Sem vagas'}
            </Text>
          </View>
        </View>

        {/* Aviso de privacidade */}
        <View style={styles.notaRodape}>
          <Text style={styles.textoRodape}>
            Ao se inscrever, você concorda com nossos termos.
          </Text>
        </View>
      </ScrollView>

      {/* BOTÃO DE CONFIRMAR (fica no final da tela) */}
      <TouchableOpacity
        style={[
          styles.botaoConfirmar,
          { opacity: loading || curso.vagas <= 0 ? 0.6 : 1 }
        ]}
        onPress={handleInscrever}
        disabled={loading || curso.vagas <= 0}
      >
        <Text style={styles.textoBotao}>
          {loading ? 'Processando...' : 'Confirmar Inscrição'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


