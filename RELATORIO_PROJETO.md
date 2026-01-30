# RELATÓRIO TÉCNICO - SISTEMA DE GERENCIAMENTO DE CURSOS

---

## 1. CONTEXTUALIZAÇÃO

### 1.1 Escopo da Aplicação

O **Sistema de Gerenciamento de Cursos Online** é uma aplicação mobile desenvolvida em **React Native** que permite administradores gerenciar cursos através de operações CRUD (Create, Read, Update, Delete). A aplicação se conecta a um servidor **Node.js/Express** que comunica com um banco de dados **PostgreSQL**.

**Plataforma:** React Native (Aplicação Mobile)  
**Backend:** Node.js + Express.js  
**Banco de Dados:** PostgreSQL  
**Linguagens:** JavaScript/ES6+, SQL  

### 1.2 Funcionalidades Principais

- ✅ **Listar cursos** com informações detalhadas
- ✅ **Criar novos cursos** com validação de dados
- ✅ **Editar cursos** existentes
- ✅ **Deletar cursos** com confirmação de segurança
- ✅ Interface intuitiva e responsiva
- ✅ Tratamento de erros robusto

### 1.3 Fluxo da Aplicação

```
Mobile App (React Native)
         ↓
  API REST (Axios)
         ↓
Node.js/Express Server
         ↓
PostgreSQL Database
```

---

## 2. DIAGRAMAS

### 2.1 Diagrama de Entidade-Relacionamento (DER)

```
┌─────────────────────┐
│      CURSOS         │
├─────────────────────┤
│ PK id (INT)         │
│    titulo (VARCHAR) │
│    descricao (TEXT) │
│    carga_horaria    │
│    duracao (VARCHAR)│
│    preco (VARCHAR)  │
│    vagas (INT)      │
│    imagem (VARCHAR) │
└──────────┬──────────┘
           │ 1
           │
        M  │  M
           │
    ┌──────┴──────┐
    │  MATRICULAS │
    ├─────────────┤
    │ PK id (INT) │
    │ FK id_curso │
    │ FK id_aluno │
    │ data_mat... │
    └──────┬──────┘
           │ 1
           │
┌──────────┴──────────┐
│      ALUNOS         │
├─────────────────────┤
│ PK id (INT)         │
│    nome (VARCHAR)   │
│    email (VARCHAR)  │
│    celular (BIGINT) │
│    data_cadastro    │
└─────────────────────┘
```

### 2.2 Diagrama de Arquitetura da Aplicação

```
┌──────────────────────────────────────────────────────────┐
│              MOBILE APPLICATION (React Native)            │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │          CursosAdmin Component                     │  │
│  │  - State Management (useState)                     │  │
│  │  - Modal para CRUD                                 │  │
│  │  - FlatList para renderizar cursos                 │  │
│  └─────────────────┬──────────────────────────────────┘  │
│                    │                                       │
│  ┌─────────────────▼──────────────────────────────────┐  │
│  │        CursosService (API Client)                  │  │
│  │  - buscarCursos()                                  │  │
│  │  - criarCurso()                                    │  │
│  │  - atualizarCurso()                                │  │
│  │  - deletarCurso()                                  │  │
│  └─────────────────┬──────────────────────────────────┘  │
│                    │                                       │
│  ┌─────────────────▼──────────────────────────────────┐  │
│  │        AxiosInstance (HTTP Client)                 │  │
│  │  - baseURL: http://localhost:3000/api              │  │
│  │  - Interceptors para erros                         │  │
│  └─────────────────┬──────────────────────────────────┘  │
└────────────────────┼──────────────────────────────────────┘
                     │ HTTP REST
┌────────────────────▼──────────────────────────────────────┐
│           BACKEND SERVER (Node.js/Express)                │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  GET    /api/cursos           → Listar todos             │
│  GET    /api/cursos/:id       → Buscar um                │
│  POST   /api/cursos           → Criar novo               │
│  PUT    /api/cursos/:id       → Atualizar                │
│  DELETE /api/cursos/:id       → Deletar                  │
│                                                            │
│  (+ endpoints de matriculas, alunos, etc)               │
│                                                            │
└────────────────────┬──────────────────────────────────────┘
                     │ SQL Queries
┌────────────────────▼──────────────────────────────────────┐
│          BANCO DE DADOS (PostgreSQL)                      │
├──────────────────────────────────────────────────────────┤
│  - Table: cursos                                          │
│  - Table: alunos                                          │
│  - Table: matriculas                                      │
│  - Functions & Triggers                                  │
└──────────────────────────────────────────────────────────┘
```

### 2.3 Casos de Uso (UML)

```
┌───────────────────────────────────────────────────────────┐
│                  SISTEMA DE CURSOS                        │
├───────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                           │
│  │ Administrador│                                          │
│  └──────┬──────┘                                           │
│         │                                                  │
│         ├─────► [Listar Cursos]                           │
│         │                                                  │
│         ├─────► [Criar Curso]                             │
│         │          │                                       │
│         │          ├─► Preencher formulário               │
│         │          └─► Validar dados                      │
│         │                                                  │
│         ├─────► [Editar Curso]                            │
│         │          │                                       │
│         │          ├─► Abrir modal com dados              │
│         │          ├─► Modificar campos                   │
│         │          └─► Atualizar no BD                    │
│         │                                                  │
│         └─────► [Deletar Curso]                           │
│                  │                                         │
│                  ├─► Confirmar exclusão                   │
│                  ├─► Remover matrículas                   │
│                  └─► Remover do BD                        │
│                                                             │
└───────────────────────────────────────────────────────────┘
```

---

## 3. SQL - OPERAÇÕES CRUD

### 3.1 CREATE - Inserir Novo Curso

```sql
-- Inserir um novo curso na tabela cursos
INSERT INTO cursos (
  titulo, 
  descricao, 
  carga_horaria, 
  duracao, 
  preco, 
  vagas
) VALUES (
  'React Avançado',
  'Aprenda React com Hooks, Context e Redux',
  40,
  '4 semanas',
  199.99,
  30
) RETURNING *;
```

### 3.2 READ - Consultar Cursos

```sql
-- Buscar todos os cursos
SELECT * FROM cursos ORDER BY id;

-- Buscar um curso específico
SELECT * FROM cursos WHERE id = $1;

-- Buscar cursos com filtro
SELECT * FROM cursos WHERE titulo ILIKE '%React%';

-- Contar total de cursos
SELECT COUNT(*) as total FROM cursos;
```

### 3.3 UPDATE - Atualizar Curso

```sql
-- Atualizar informações de um curso
UPDATE cursos 
SET 
  titulo = $1,
  descricao = $2,
  carga_horaria = $3,
  duracao = $4,
  preco = $5,
  vagas = $6
WHERE id = $7 
RETURNING *;

-- Atualizar apenas campos específicos
UPDATE cursos 
SET preco = $1 
WHERE id = $2 
RETURNING *;
```

### 3.4 DELETE - Deletar Curso

```sql
-- Deletar matrículas associadas ao curso
DELETE FROM matriculas WHERE id_curso = $1;

-- Deletar o curso
DELETE FROM cursos WHERE id = $1 RETURNING *;
```

### 3.5 Functions - Verificar Vagas

```sql
-- Function para verificar se há vagas disponíveis
CREATE OR REPLACE FUNCTION verificar_vagas(curso_id INT)
  RETURNS BOOLEAN
  LANGUAGE plpgsql
AS $$
DECLARE
  vagas_restantes INT;
BEGIN
  SELECT vagas INTO vagas_restantes 
  FROM cursos 
  WHERE id = curso_id;
  
  RETURN vagas_restantes > 0;
END;
$$;

-- Uso: SELECT verificar_vagas(1);
```

### 3.6 Trigger - Atualizar Vagas

```sql
-- Trigger para atualizar vagas quando alguém se inscreve
CREATE OR REPLACE FUNCTION atualizar_vagas()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE cursos 
  SET vagas_disponiveis = vagas_disponiveis - 1
  WHERE id = NEW.id_curso;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_atualizar_vagas
AFTER INSERT ON matriculas
FOR EACH ROW
EXECUTE FUNCTION atualizar_vagas();
```

---

## 4. TABELAS DO BANCO DE DADOS

### 4.1 Estrutura da Tabela CURSOS

```sql
CREATE TABLE cursos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(250) NOT NULL,
  descricao TEXT,
  carga_horaria INT NOT NULL,
  vagas INT NOT NULL,
  duracao VARCHAR(50) DEFAULT '4 semanas',
  preco VARCHAR(20) DEFAULT 'R$ 99,90',
  imagem VARCHAR(255) DEFAULT 'https://via.placeholder.com/140',
  vagas_disponiveis INT
);
```

**Exemplo de Registros:**

| id | titulo | descricao | carga_horaria | vagas | duracao | preco | vagas_disponiveis |
|----|--------|-----------|---------------|-------|---------|-------|-------------------|
| 1 | C# Pro | Nessa jornada... | 15 | 1 | 3 semanas | R$ 199,90 | 1 |
| 2 | Excel Avançado | Esse curso foi... | 10 | 2 | 2 semanas | R$ 89,90 | 2 |
| 3 | IA e ML | Quer estudar IA... | 25 | 5 | 5 semanas | R$ 249,90 | 5 |
| 4 | Dominando Python | Nessa jornada... | 100 | 10 | 20 semanas | R$ 299,90 | 10 |
| 5 | Banco de Dados | Aprenda os conceitos... | 20 | 10 | 4 semanas | R$ 149,90 | 10 |

### 4.2 Estrutura da Tabela ALUNOS

```sql
CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  celular BIGINT NOT NULL,
  data_cadastro TIMESTAMP DEFAULT NOW()
);
```

### 4.3 Estrutura da Tabela MATRICULAS

```sql
CREATE TABLE matriculas (
  id SERIAL PRIMARY KEY,
  id_aluno INT REFERENCES alunos(id),
  id_curso INT REFERENCES cursos(id),
  data_matricula TIMESTAMP DEFAULT NOW()
);
```

---

## 5. APLICAÇÃO - INTERFACE E FUNCIONALIDADES

### 5.1 Componente Principal: CursosAdmin.js

**Arquivo:** `cursos-online0/app/CursosAdmin.js`

**Funcionalidades:**
- Exibe lista de cursos em cards
- Permite criar novo curso com modal
- Permite editar curso com modal
- Permite deletar curso com confirmação
- Carrega dados do servidor automaticamente

**Estrutura de Estados:**
```javascript
- cursos: Array de cursos
- loading: Indicador de carregamento
- modalVisible: Controla visibilidade do modal
- isEditing: Flag para modo edição
- saving: Flag para operação em andamento
- [campos do formulário]: titulo, descricao, cargaHoraria, duracao, preco, vagas
```

### 5.2 Serviço de API: cursosService.js

**Arquivo:** `cursos-online0/api/cursosService.js`

**Métodos:**
```javascript
cursosService.buscarCursos()          // GET /cursos
cursosService.buscarCursoPorId(id)    // GET /cursos/:id
cursosService.criarCurso(dados)       // POST /cursos
cursosService.atualizarCurso(id, dados) // PUT /cursos/:id
cursosService.deletarCurso(id)        // DELETE /cursos/:id
```

### 5.3 Fluxo de Interação do Usuário

#### 5.3.1 Listar Cursos
```
1. Componente monta
2. useEffect dispara carregarCursos()
3. cursosService.buscarCursos() faz GET /api/cursos
4. Dados carregam no estado
5. FlatList renderiza cada curso em um card
```

#### 5.3.2 Criar Curso
```
1. Usuário clica em "➕ Novo Curso"
2. abrirModalNovo() abre modal vazio
3. Preenche formulário com dados
4. Clica em "Criar"
5. salvar() valida dados
6. cursosService.criarCurso() faz POST /api/cursos
7. Modal fecha
8. carregarCursos() atualiza lista
```

#### 5.3.3 Editar Curso
```
1. Usuário clica em "✏️ Editar"
2. abrirModalEdicao() abre modal preenchido
3. Modifica dados necessários
4. Clica em "Atualizar"
5. salvar() valida dados
6. cursosService.atualizarCurso() faz PUT /api/cursos/:id
7. Modal fecha
8. carregarCursos() atualiza lista
```

#### 5.3.4 Deletar Curso
```
1. Usuário clica em "🗑️ Deletar"
2. Alert.alert() pede confirmação
3. Se confirma:
   a. cursosService.deletarCurso() faz DELETE /api/cursos/:id
   b. Backend deleta matrículas associadas
   c. Backend deleta curso
4. carregarCursos() atualiza lista
5. Alert de sucesso
```

### 5.4 Layout da Interface

**Tela Principal:**
```
┌────────────────────────────────────────┐
│  Gerenciador de Cursos                 │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│  ➕ Novo Curso                          │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  React Avançado                        │
│  Aprenda React com Hooks...            │
│  ⏱️ 40h • 4 semanas                     │
│  R$ 199.99 • 30 vagas                  │
│                                        │
│  [✏️ Editar]  [🗑️ Deletar]             │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  JavaScript Basics                     │
│  Fundamentos de JavaScript...          │
│  ⏱️ 20h • 2 semanas                     │
│  R$ 89.99 • 50 vagas                   │
│                                        │
│  [✏️ Editar]  [🗑️ Deletar]             │
└────────────────────────────────────────┘
```

**Modal de Criação/Edição:**
```
┌────────────────────────────────────────┐
│ Novo Curso                          ✕  │
├────────────────────────────────────────┤
│ Título                                 │
│ [_______________________________]      │
│                                        │
│ Descrição                              │
│ [_______________________________]      │
│ [_______________________________]      │
│                                        │
│ Carga Horária (horas)                  │
│ [_______________________________]      │
│                                        │
│ Duração                                │
│ [_______________________________]      │
│                                        │
│ Preço (R$)                             │
│ [_______________________________]      │
│                                        │
│ Vagas                                  │
│ [_______________________________]      │
│                                        │
│ [Cancelar]  [Criar Curso]             │
└────────────────────────────────────────┘
```

---

## 6. CONSIDERAÇÕES FINAIS

O projeto implementou com sucesso um sistema completo de gerenciamento de cursos utilizando React Native, Node.js/Express e PostgreSQL. Durante o desenvolvimento, adquirimos conhecimentos em frontend mobile, APIs RESTful, design de banco de dados, arquitetura MVC e tratamento robusto de erros. O sistema oferece CRUD completo com interface responsiva, validação de dados, confirmação de exclusão e feedback visual adequado.

Os principais desafios encontrados foram resolvidos: conexão mobile-backend via Axios e CORS, validação em frontend e backend, gerenciamento de modais com useState, atualização de listas após CRUD e tratamento de erros de rede com interceptadores.

Melhorias futuras podem incluir autenticação de usuários, dashboard com estatísticas, filtros avançados, exportação de dados, upload de imagens, paginação, notificações em tempo real e testes automatizados.

---

## 7. REFERÊNCIAS

### 7.1 Documentação Oficial

- [React Native Documentation](https://reactnative.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Axios Documentation](https://axios-http.com/)
- [Node.js Guide](https://nodejs.org/en/docs/)

### 7.2 Recursos Utilizados

- React Native Official Docs
- Express.js Middleware Documentation
- PostgreSQL SQL Language Reference
- Axios HTTP Client Library
- MDN Web Docs para JavaScript

### 7.3 Ferramentas

- Visual Studio Code
- Expo Go (Simulador React Native)
- pgAdmin (Gerenciador PostgreSQL)
- Postman (Tester API)
- Node.js + npm

---

**Data de Elaboração:** 29 de Janeiro de 2026  
**Status:** ✅ Completo e Funcional  
**Versão:** 1.0
