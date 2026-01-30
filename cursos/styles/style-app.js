import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    color: colors.textSecondary,
  },

  // Header Styles
  header: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },

  headerHome: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginVertical: 8,
    letterSpacing: 0.5,
  },

  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    fontWeight: '500',
  },

  // Navigation Button
  botaoVoltar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },

  textoBotaoVoltar: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },

  // Search Bar Button
  botaoPerfil: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  botaoPerfilTexto: {
    fontSize: 26,
    fontWeight: '600',
  },

  // Image Styles
  imagemCurso: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },

  // Content Area
  conteudo: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },

  // Card Styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginVertical: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1.2,
    borderColor: 'rgba(52, 152, 219, 0.12)',
  },

  // Form Styles
  formSection: {
    marginBottom: 20,
  },

  formSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  secao: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1.5,
    borderColor: '#e1e8ed',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 14,
  },

  // Summary Styles
  resumo: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  labelResumo: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },

  resumoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  resumoLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
  },

  resumoValor: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '700',
  },

  textoResumo: {
    fontSize: 14,
    color: colors.text,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  // Text Styles
  titulo: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginVertical: 8,
  },

  subtitulo: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },

  texto: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 4,
  },

  descricao: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },

  // Price and Duration
  preco: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },

  duracao: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 12,
  },

  // Vagas Style
  vagas: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2ecc71',
    marginBottom: 8,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#2ecc71',
  },

  // Button Styles
  botaoConfirmar: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  textoBotao: {
    fontSize: 16,
    fontWeight: '800',
    color: '#898989',
    letterSpacing: 0.6,
  },

  botaoInscrever: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  // Empty State
  semResultados: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  semResultadosText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },

  semResultadosSub: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Profile Screen Styles
  profileContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  fotoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },

  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  fotoTexto: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
  },

  infoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },

  infoField: {
    paddingBottom: 14,
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },

  infoValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
    marginTop: 4,
  },

  // Course Item in Profile
  cursoItem: {
    backgroundColor: 'rgba(52, 152, 219, 0.05)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },

  cursoTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },

  cursoStatus: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
    fontWeight: '500',
  },

  progressoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },

  progressoBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressoPreenchido: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  cursoProgresso: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    minWidth: 40,
    textAlign: 'right',
  },

  // Action Buttons Container
  actionButtonsContainer: {
    marginTop: 20,
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  botaoEditar: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  botaoEditarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  botaoSair: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  botaoSairTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Footer Note
  notaRodape: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 4,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },

  textoRodape: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    fontWeight: '500',
  },

  // Admin Screen Styles
  cardAdmin: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 8,
    marginVertical: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1.2,
    borderColor: 'rgba(52, 152, 219, 0.12)',
  },

  botaoAdmin: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  semResultados: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  semResultadosText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },

  semResultadosSub: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },

  // Search input
  buscaInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginVertical: 12,
    width: '100%',
  },

  adminButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  adminButtonText: {
    fontSize: 26,
    fontWeight: '600',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 12,
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },

  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },

  searchContainer: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#3498db',
  },

  warningAlert: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#f39c12',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#f39c12',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  warningText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
  },
});

