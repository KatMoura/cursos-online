import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from '../styles/style-app';

export default function DetalhesScreen({ route, navigation }) {
  const curso = route?.params?.curso;

  if (!curso) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Curso não encontrado</Text>
      </View>
    );
  }

  const imagemSource = (imagem) => 
    typeof imagem === 'string' ? { uri: imagem } : imagem;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
        </TouchableOpacity>

        <Image
          source={imagemSource(curso.imagem)}
          style={styles.imagemCurso}
          resizeMode="cover"
        />
        
        <Text style={styles.headerTitle}>{curso.titulo}</Text>
      </View>

      <ScrollView style={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.secao}>
          <Text style={styles.label}>Sobre o Curso</Text>
          <Text style={styles.texto}>{curso.descricao}</Text>
        </View>

        <View style={styles.resumo}>
          <Text style={styles.labelResumo}>Informações</Text>
          
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Carga Horária</Text>
            <Text style={styles.resumoValor}>{curso.carga_horaria} horas</Text>
          </View>

          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Duração</Text>
            <Text style={styles.resumoValor}>{curso.duracao}</Text>
          </View>

          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Preço</Text>
            <Text style={[styles.resumoValor, { color: '#0099ff' }]}>
              {curso.preco}
            </Text>
          </View>

          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Vagas Disponíveis</Text>
            <Text style={[
              styles.resumoValor,
              { color: curso.vagas > 0 ? '#0099ff' : '#e74c3c' }
            ]}>
              {curso.vagas > 0 ? `${curso.vagas} vagas` : 'Sem vagas'}
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>O Que Você Vai Aprender</Text>
          <Text style={styles.texto}>✓ Conceitos Fundamentais</Text>
          <Text style={styles.texto}>✓ Prática com Exercícios</Text>
          <Text style={styles.texto}>✓ Projetos Práticos</Text>
          <Text style={styles.texto}>✓ Certificado ao Concluir</Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>Requisitos</Text>
          <Text style={styles.texto}>✓ Computador ou Notebook</Text>
          <Text style={styles.texto}>✓ Internet</Text>
          <Text style={styles.texto}>✓ Vontade de aprender</Text>
        </View>
      </ScrollView>
    </View>
  );
}