## 💻 Sobre o projeto

Aplicativo mobile desenvolvido em **React Native** com Expo para gerenciar cursos online.

**O que foi implementado:**
- ✅ Catálogo completo de cursos
- ✅ Sistema de inscrição integrado ao banco de dados
- ✅ Perfil de usuário com histórico de cursos
- ✅ Busca e filtro de cursos em tempo real
- ✅ Design moderno e responsivo
- ✅ Validações completas de formulário
- ✅ Integração PostgreSQL pronta

---

## 🎨 Design System

### Paleta de Cores Moderna
```
🔵 Primary:    #3498db (Azul vibrante)
🔴 Secondary:  #e74c3c (Vermelho elegante)
🟢 Success:    #27ae60 (Verde)
⚠️  Warning:    #f39c12 (Laranja)
⚪ Background: #f8f9fa (Cinza claro)
⚫ Text:       #2c3e50 (Cinza escuro)
```

---

## 🚀 Tecnologias Utilizadas

- **React Native** 0.81.5
- **Expo** ~54.0.25
- **React Navigation** (Stack Navigator)
- **JavaScript** (ES6+)
- **PostgreSQL** (Banco de Dados)

---

## 📱 Funcionalidades do App

### 🏠 Home Screen
- Listagem de cursos disponíveis
- Barra de busca com animação
- Cards com informações básicas
- Acesso rápido ao perfil
- Filtro em tempo real

### 📖 Detalhes do Curso
- Imagem e descrição completa
- Carga horária e duração
- Preço destacado
- Status de vagas (dinâmico)
- Conteúdo e requisitos

### ✍️ Inscrição Reformulada
- **Campos sincronizados com BD:**
  - Nome Completo
  - Email (com validação)
  - Celular (com formatação automática)
- Validações robustas
- Resumo visual
- Indicação de vagas

### 👤 Perfil do Usuário
- Avatar com iniciais
- Informações pessoais
- Histórico de cursos inscritos
- Barra de progresso
- Botões de ação

---

## 🧭 Estrutura de Navegação

A navegação utiliza **React Navigation Stack Navigator**:

```
App.js (Root Navigator)
  ├── HomeScreen (Casa)
  ├── DetalhesScreen (Informações do Curso)
  ├── InscricaoScreen (Formulário)
  └── ProfileScreen (Perfil)
```

---

## ⚙️ Status de Implementação

### Concluído ✅
- [x] Listagem de cursos com cards elegantes
- [x] Barra de pesquisa com animação
- [x] Navegação entre telas
- [x] Tela de detalhes com informações completas
- [x] Formulário de inscrição com validações
- [x] Tela de perfil de usuário
- [x] Design system completo
- [x] Integração com banco de dados (pronta)

### Próximas Etapas 🚀
- [ ] Conectar API real
- [ ] Implementar autenticação (JWT)
- [ ] Sincronizar com PostgreSQL
- [ ] Notificações push
- [ ] Testes automatizados

