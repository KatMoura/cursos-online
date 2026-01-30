import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from '../styles/style-app';

export default function DetalhesScreen({ route, navigation }) {
  // Pega o curso que foi passado pela navegação
  const { curso } = route.params;

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
        
        {/* Título do curso */}
        <Text style={styles.headerTitle}>{curso.titulo}</Text>
      </View>

      {/* CONTEÚDO ROLÁVEL */}
      <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>
        
        {/* SEÇÃO 1: DESCRIÇÃO DO CURSO */}
        <View style={styles.secao}>
          <Text style={styles.label}>Sobre o Curso</Text>
          <Text style={styles.texto}>{curso.descricao}</Text>
        </View>

        {/* SEÇÃO 2: INFORMAÇÕES IMPORTANTES */}
        <View style={styles.resumo}>
          <Text style={styles.labelResumo}>Informações</Text>
          
          {/* Mostra: Carga horária */}
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Carga Horária</Text>
            <Text style={styles.resumoValor}>{curso.carga_horaria} horas</Text>
          </View>

          {/* Mostra: Duração total */}
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Duração</Text>
            <Text style={styles.resumoValor}>{curso.duracao}</Text>
          </View>

          {/* Mostra: Preço (em verde) */}
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Preço</Text>
            <Text style={[styles.resumoValor, { color: '#27ae60' }]}>
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

        {/* SEÇÃO 3: O QUE VOCÊ APRENDE */}
        <View style={styles.secao}>
          <Text style={styles.label}>O Que Você Vai Aprender</Text>
          <Text style={styles.texto}>✓ Conceitos Fundamentais</Text>
          <Text style={styles.texto}>✓ Prática com Exercícios</Text>
          <Text style={styles.texto}>✓ Projetos Práticos</Text>
          <Text style={styles.texto}>✓ Certificado ao Concluir</Text>
        </View>

        {/* SEÇÃO 4: O QUE É NECESSÁRIO */}
        <View style={styles.secao}>
          <Text style={styles.label}>Requisitos</Text>
          <Text style={styles.texto}>✓ Computador ou Notebook</Text>
          <Text style={styles.texto}>✓ Internet</Text>
          <Text style={styles.texto}>✓ Vontade de aprender</Text>
        </View>
      </ScrollView>

      {/* BOTÃO DE INSCRIÇÃO (fica no final) */}
      <TouchableOpacity
        style={[
          styles.botaoInscrever,
          { opacity: curso.vagas <= 0 ? 0.6 : 1 }
        ]}
        disabled={curso.vagas <= 0}
        onPress={() => navigation.navigate('Inscricao', { curso })}
      >
        <Text style={styles.textoBotao}>
          {curso.vagas > 0 ? 'Se Inscrever Agora' : 'Sem Vagas'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}