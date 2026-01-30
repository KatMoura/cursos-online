# 📚 Funcionalidades de Gerenciamento de Cursos

## ✅ Implementado

### Backend (Node.js + Express + PostgreSQL)

#### Novos Endpoints:

1. **POST `/api/cursos`** - Criar um novo curso
   - Parâmetros: `titulo`, `descricao`, `carga_horaria`, `duracao`, `preco`, `vagas`, `instrutor` (opcional), `imagem` (opcional)
   - Retorna: Curso criado com ID

2. **PUT `/api/cursos/:id`** - Atualizar um curso existente
   - Parâmetros: Qualquer campo do curso (todos são opcionais)
   - Retorna: Curso atualizado

3. **DELETE `/api/cursos/:id`** - Deletar um curso
   - Remove o curso e todas as matrículas associadas
   - Retorna: Curso deletado

### Frontend (React Native)

#### Novos Serviços (cursosService.js):

- `criarCurso(dadosCurso)` - Cria um novo curso via API
- `deletarCurso(id)` - Deleta um curso via API
- `atualizarCurso(id, dadosCurso)` - Atualiza um curso via API

#### Novo Componente (AdminScreen.js):

Tela completa para gerenciar cursos com:

- ✏️ **Editar Cursos** - Modal para atualizar dados
- 🗑️ **Deletar Cursos** - Remove cursos com confirmação
- ➕ **Criar Novos Cursos** - Modal para criar novo curso
- 📋 **Listar Todos os Cursos** - Exibe todos os cursos cadastrados

**Formulário do Modal:**
- Título do Curso
- Descrição
- Carga Horária (horas)
- Duração
- Preço
- Número de Vagas
- Instrutor (opcional)

#### Atualizações:

- ✅ `App.js` - Adicionada rota para AdminScreen
- ✅ `ProfileScreen.js` - Novo botão "Gerenciar Cursos" que leva ao painel de administração
- ✅ `style-app.js` - Novos estilos para a tela de administração

---

## 🚀 Como Usar

### 1. Criar um Novo Curso

1. Acesse o perfil (ícone 👤)
2. Clique no botão "⚙️ Gerenciar Cursos"
3. Clique no botão "➕" no canto superior direito
4. Preencha o formulário com os dados do curso
5. Clique em "Criar Curso"

### 2. Editar um Curso

1. Na tela de administração, encontre o curso desejado
2. Clique no botão "✏️ Editar"
3. Modifique os dados necessários
4. Clique em "Atualizar"

### 3. Deletar um Curso

1. Na tela de administração, encontre o curso desejado
2. Clique no botão "🗑️ Deletar"
3. Confirme a exclusão na mensagem de aviso
4. O curso será deletado (junto com todas as matrículas associadas)

---

## 📡 Exemplo de Requisições cURL

### Criar Curso
```bash
curl -X POST http://localhost:3000/api/cursos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "React Avançado",
    "descricao": "Aprenda React com hooks e context",
    "carga_horaria": 40,
    "duracao": "4 semanas",
    "preco": 199.99,
    "vagas": 30,
    "instrutor": "João Silva"
  }'
```

### Atualizar Curso
```bash
curl -X PUT http://localhost:3000/api/cursos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "React Avançado 2024",
    "preco": 249.99
  }'
```

### Deletar Curso
```bash
curl -X DELETE http://localhost:3000/api/cursos/1
```

---

## 🔒 Validações

- ✅ Campos obrigatórios validados
- ✅ Tipos de dados convertidos corretamente (números, datas, etc)
- ✅ Curso verificado antes de atualizar/deletar
- ✅ Matrículas associadas deletadas automaticamente ao remover curso
- ✅ Mensagens de erro detalhadas

---

## 📝 Notas Importantes

1. **Exclusão em Cascata**: Ao deletar um curso, todas as matrículas de alunos naquele curso são automaticamente removidas
2. **Campos Opcionais**: Instrutor e imagem são campos opcionais
3. **Validação de Tipos**: Carga horária e vagas são convertidas para números, preço para decimal
4. **Feedback Visual**: A aplicação mostra alertas de sucesso/erro ao realizar operações

---

## 📂 Arquivos Modificados

- `server/server.js` - Adicionados 3 novos endpoints (POST, PUT, DELETE)
- `cursos-online0/api/cursosService.js` - Adicionados 3 novos métodos
- `cursos-online0/app/AdminScreen.js` - Novo arquivo com componente de administração
- `cursos-online0/App.js` - Rota adicional
- `cursos-online0/app/ProfileScreen.js` - Botão para acessar admin
- `cursos-online0/styles/style-app.js` - Novos estilos

---

## ✨ Próximas Melhorias Sugeridas

- [ ] Adicionar foto/imagem ao criar curso
- [ ] Autenticação para acessar painel de admin
- [ ] Filtros e busca na tela de admin
- [ ] Histórico de alterações em cursos
- [ ] Exportar dados em CSV
- [ ] Dashboard com estatísticas
