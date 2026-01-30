# CASOS DE USO - SISTEMA DE GERENCIAMENTO DE CURSOS

## Diagrama de Casos de Uso (UML)

```
┌─────────────────────────────────────────────────────────────────────┐
│         Sistema de Gerenciamento de Cursos Online                  │
│                                                                      │
│                                                                      │
│  ┌────────────────────┐                                             │
│  │  Administrador     │                                             │
│  └─────────┬──────────┘                                             │
│            │                                                        │
│            │                     ┌──────────────────────┐           │
│            ├────────────────────▶│  Listar Cursos       │           │
│            │                     └──────────────────────┘           │
│            │                                                        │
│            │                     ┌──────────────────────┐           │
│            ├────────────────────▶│  Criar Curso         │──────┐   │
│            │                     └──────────────────────┘      │   │
│            │                                  ▲                │   │
│            │                                  │                │   │
│            │                     ┌──────────────────────┐      │   │
│            ├────────────────────▶│  Editar Curso        │──┐   │   │
│            │                     └──────────────────────┘  │   │   │
│            │                                  ▲            │   │   │
│            │                                  │            │   │   │
│            │                     ┌──────────────────────┐  │   │   │
│            └────────────────────▶│  Deletar Curso       │──┼───┼───┼──┐
│                                  └──────────────────────┘  │   │   │  │
│                                           ▲                │   │   │  │
│                                           │                │   │   │  │
│                      ┌────────────────────────────────┐    │   │   │  │
│                      │     ┌──────────────────────┐   │    │   │   │  │
│                      │     │ Validar Dados        │   │    │   │   │  │
│                      │     └──────────────────────┘   │    │   │   │  │
│                      │           ▲                    │    │   │   │  │
│                      │           │                    │    │   │   │  │
│                      │     ┌──────────────────────┐   │    │   │   │  │
│                      │     │ Acessar Banco Dados  │   │    │   │   │  │
│                      │     └──────────────────────┘   │    │   │   │  │
│                      │           ▲                    │    │   │   │  │
│                      └───────────────────────────────┘    │   │   │  │
│                                                  ▲        │   │   │  │
│                                                  │        │   │   │  │
│                                   ┌──────────────────────┐│   │   │  │
│                                   │  Banco de Dados      ││◀──┴───┴──┘
│                                   └──────────────────────┘│
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 1. CASO DE USO: LISTAR CURSOS

### 1.1 Informações Gerais
- **Nome:** Listar Cursos
- **Ator Principal:** Administrador
- **Pré-condições:** Administrador estar logado
- **Pós-condições:** Lista de cursos exibida
- **Fluxo Principal:** Sucesso

### 1.2 Fluxo Principal
1. Administrador acessa a aplicação
2. Sistema carrega automaticamente todos os cursos do banco de dados
3. Sistema exibe a lista de cursos com informações:
   - Título
   - Descrição
   - Carga horária
   - Duração
   - Preço
   - Número de vagas disponíveis
4. Cada curso é exibido em um card com botões de ação (Editar/Deletar)

### 1.3 Fluxos Alternativos
- **3a. Nenhum curso cadastrado:** Sistema exibe mensagem "Nenhum curso cadastrado"
- **2a. Erro ao conectar ao BD:** Sistema exibe erro e pode usar dados locais como fallback

### 1.4 Requisitos Funcionais
- RF1: Sistema deve buscar todos os cursos do banco de dados
- RF2: Sistema deve exibir cursos em formato de lista
- RF3: Sistema deve mostrar todas as informações do curso

---

## 2. CASO DE USO: CRIAR CURSO

### 2.1 Informações Gerais
- **Nome:** Criar Curso
- **Ator Principal:** Administrador
- **Pré-condições:** Administrador estar logado
- **Pós-condições:** Novo curso inserido no banco de dados
- **Fluxo Principal:** Sucesso

### 2.2 Fluxo Principal
1. Administrador clica no botão "➕ Novo Curso"
2. Sistema abre um modal com formulário vazio
3. Administrador preenche os seguintes campos:
   - Título (obrigatório)
   - Descrição (obrigatório)
   - Carga Horária (obrigatório)
   - Duração (obrigatório)
   - Preço (obrigatório)
   - Vagas (obrigatório)
4. Sistema valida os dados
5. Administrador clica em "Criar Curso"
6. Sistema envia dados para o servidor via POST /api/cursos
7. Servidor insere o curso no banco de dados
8. Sistema retorna sucesso
9. Modal fecha
10. Sistema atualiza a lista de cursos
11. Administrador vê o novo curso na lista

### 2.3 Fluxos Alternativos
- **4a. Campos inválidos:** Sistema exibe mensagem de erro
- **6a. Erro ao enviar ao servidor:** Sistema exibe erro "Não foi possível criar o curso"
- **8a. Valores inválidos:** Sistema converte ou rejeita

### 2.4 Requisitos Funcionais
- RF1: Sistema deve validar todos os campos obrigatórios
- RF2: Sistema deve converter tipos de dados (números, datas)
- RF3: Sistema deve enviar dados ao servidor
- RF4: Sistema deve confirmar criação com mensagem

### 2.5 Dados Necessários
```javascript
{
  titulo: string (máx 250 caracteres),
  descricao: string,
  carga_horaria: number (horas),
  duracao: string (ex: "4 semanas"),
  preco: number (formato decimal),
  vagas: number (quantidade inteira)
}
```

---

## 3. CASO DE USO: EDITAR CURSO

### 3.1 Informações Gerais
- **Nome:** Editar Curso
- **Ator Principal:** Administrador
- **Pré-condições:** 
  - Administrador estar logado
  - Curso deve existir no banco de dados
- **Pós-condições:** Dados do curso atualizados
- **Fluxo Principal:** Sucesso

### 3.2 Fluxo Principal
1. Administrador visualiza a lista de cursos
2. Administrador clica no botão "✏️ Editar" em um curso
3. Sistema abre um modal com formulário preenchido com dados atuais
4. Administrador modifica os campos desejados
5. Administrador clica em "Atualizar"
6. Sistema valida os dados
7. Sistema envia dados para o servidor via PUT /api/cursos/:id
8. Servidor atualiza o curso no banco de dados
9. Sistema retorna sucesso
10. Modal fecha
11. Sistema atualiza a lista de cursos
12. Administrador vê o curso atualizado na lista

### 3.3 Fluxos Alternativos
- **2a. Curso não encontrado:** Sistema exibe erro
- **4a. Dados inválidos:** Sistema exibe mensagem de erro
- **7a. Erro ao enviar ao servidor:** Sistema exibe erro
- **8a. Curso não existe mais:** Sistema exibe erro "Curso não encontrado"

### 3.4 Requisitos Funcionais
- RF1: Sistema deve carregar dados atuais do curso
- RF2: Sistema deve validar campos modificados
- RF3: Sistema deve enviar apenas dados modificados (ou todos)
- RF4: Sistema deve confirmar atualização

---

## 4. CASO DE USO: DELETAR CURSO

### 4.1 Informações Gerais
- **Nome:** Deletar Curso
- **Ator Principal:** Administrador
- **Pré-condições:**
  - Administrador estar logado
  - Curso deve existir no banco de dados
- **Pós-condições:** Curso removido do banco de dados
- **Fluxo Principal:** Sucesso com confirmação

### 4.2 Fluxo Principal
1. Administrador visualiza a lista de cursos
2. Administrador clica no botão "🗑️ Deletar" em um curso
3. Sistema exibe um Alert de confirmação:
   - "Tem certeza que deseja deletar '[Nome do Curso]'?"
   - Botões: "Cancelar" e "Deletar"
4. Administrador confirma clicando em "Deletar"
5. Sistema envia requisição DELETE /api/cursos/:id
6. Servidor verifica se o curso existe
7. Servidor deleta todas as matrículas associadas ao curso
8. Servidor deleta o curso do banco de dados
9. Sistema retorna sucesso
10. Alert fecha
11. Sistema atualiza a lista de cursos
12. Administrador vê que o curso foi removido

### 4.3 Fluxos Alternativos
- **4a. Administrador clica "Cancelar":** Sistema fecha Alert e nada é deletado
- **6a. Curso não encontrado:** Sistema exibe erro "Curso não encontrado"
- **5a. Erro ao conectar:** Sistema exibe erro "Não foi possível deletar"

### 4.4 Requisitos Funcionais
- RF1: Sistema deve pedir confirmação antes de deletar
- RF2: Sistema deve enviar requisição corretamente
- RF3: Sistema deve deletar também as matrículas associadas (cascata)
- RF4: Sistema deve confirmar exclusão com mensagem

### 4.5 Comportamento de Cascata
- Quando um curso é deletado:
  1. Todas as matrículas do curso são deletadas
  2. Os alunos inscritos recebem notificação (futuro)
  3. O curso é removido permanentemente

---

## 5. CASO DE USO: VALIDAR DADOS

### 5.1 Informações Gerais
- **Nome:** Validar Dados
- **Tipo:** Caso de uso de sistema (<<include>>)
- **Pré-condições:** Dados foram preenchidos
- **Pós-condições:** Dados validados ou erros exibidos

### 5.2 Regras de Validação

#### Título
- ✅ Obrigatório
- ✅ Máximo 250 caracteres
- ✅ Não pode ser vazio

#### Descrição
- ✅ Obrigatório
- ✅ Sem limite de caracteres
- ✅ Mínimo 10 caracteres (sugerido)

#### Carga Horária
- ✅ Obrigatório
- ✅ Deve ser número inteiro
- ✅ Maior que 0

#### Duração
- ✅ Obrigatório
- ✅ Formato: "X semanas" ou "X meses"
- ✅ Sem valores vazios

#### Preço
- ✅ Obrigatório
- ✅ Deve ser número decimal
- ✅ Maior ou igual a 0

#### Vagas
- ✅ Obrigatório
- ✅ Deve ser número inteiro
- ✅ Maior que 0

### 5.3 Mensagens de Erro
```
"Preencha todos os campos obrigatórios"
"Título deve ter no máximo 250 caracteres"
"Carga horária deve ser um número válido"
"Preço deve ser um número válido"
"Vagas deve ser um número inteiro válido"
"Descrição deve ter no mínimo 10 caracteres"
```

---

## 6. CASO DE USO: ACESSAR BANCO DE DADOS

### 6.1 Informações Gerais
- **Nome:** Acessar Banco de Dados
- **Tipo:** Caso de uso de sistema (<<include>>)
- **Ator Secundário:** Banco de Dados PostgreSQL
- **Pré-condições:** Conexão ativa com BD

### 6.2 Operações no BD

#### SELECT - Listar
```sql
SELECT * FROM cursos ORDER BY id;
```
- Retorna lista de todos os cursos

#### INSERT - Criar
```sql
INSERT INTO cursos (titulo, descricao, carga_horaria, duracao, preco, vagas) 
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
```
- Insere novo curso e retorna o registro criado

#### UPDATE - Editar
```sql
UPDATE cursos 
SET titulo=$1, descricao=$2, carga_horaria=$3, duracao=$4, preco=$5, vagas=$6 
WHERE id=$7 RETURNING *;
```
- Atualiza curso existente

#### DELETE - Deletar
```sql
DELETE FROM matriculas WHERE id_curso=$1;
DELETE FROM cursos WHERE id=$1 RETURNING *;
```
- Remove matrículas e depois o curso

---

## 7. MATRIZ DE RASTREABILIDADE

| ID | Caso de Uso | RF | Backend | BD | Mobile |
|----|-------------|----|---------|----|--------|
| CU1 | Listar Cursos | RF1, RF2, RF3 | GET /cursos | SELECT cursos | FlatList |
| CU2 | Criar Curso | RF1, RF2, RF3, RF4 | POST /cursos | INSERT cursos | Modal Form |
| CU3 | Editar Curso | RF1, RF2, RF3, RF4 | PUT /cursos/:id | UPDATE cursos | Modal Form |
| CU4 | Deletar Curso | RF1, RF2, RF3, RF4 | DELETE /cursos/:id | DELETE cursos, matriculas | Alert |
| CU5 | Validar Dados | RF1, RF2 | Validação | - | Input Validation |
| CU6 | Acessar BD | - | Pool Connection | Queries | Axios |

---

## 8. FLUXO DE DADOS ENTRE CASOS DE USO

```
┌─────────────────┐
│  Administrador  │
└────────┬────────┘
         │
    ┌────▼─────┐
    │           │
    ▼           ▼
┌─────────┐  ┌──────────┐
│ Listar  │  │ Criar    │
└────┬────┘  └────┬─────┘
     │            │ ┌─────────────────┐
     │            │ │ Validar Dados   │
     │            │ └────────┬────────┘
     │            │          │
     │            ▼          ▼
     │        ┌──────────────────────┐
     │        │  Acessar Banco Dados │
     │        └──────┬───────────────┘
     │               │
     ▼               ▼
  ┌────────────────────────────┐
  │  Listar de Cursos Atualizada│
  └────────────────────────────┘
         │              │
         │              │
    ┌────▼───┐    ┌─────▼─────┐
    │ Editar │    │ Deletar    │
    └────┬───┘    └─────┬─────┘
         │              │
         │              ▼
         │          ┌──────────────┐
         │          │Alert Confirm │
         │          └──────┬───────┘
         │                 │
         └────────┬────────┘
                  ▼
          ┌──────────────────┐
          │ Validar Dados    │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │Acessar BD (PUT)  │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │Atualizar Lista   │
          └──────────────────┘
```

---

## 9. REGRAS DE NEGÓCIO

### RN1: Validação Obrigatória
Todos os dados de entrada devem ser validados antes de serem enviados ao servidor.

### RN2: Confirmação de Deleção
Nenhum curso pode ser deletado sem confirmação do administrador.

### RN3: Cascata de Deleção
Ao deletar um curso, todas as matrículas associadas devem ser deletadas automaticamente.

### RN4: Feedback ao Usuário
Toda operação deve retornar uma mensagem clara de sucesso ou erro.

### RN5: Recarregamento de Lista
Após qualquer operação (Criar, Editar, Deletar), a lista deve ser recarregada do servidor.

### RN6: Conversão de Tipos
Dados numéricos devem ser convertidos para número antes do envio.

### RN7: Tratamento de Erros
Erros de conexão não devem impedir o uso da aplicação se houver dados em cache.

---

## 10. ATORES E RESPONSABILIDADES

### 10.1 Administrador
- ✅ Responsável por gerenciar todos os cursos
- ✅ Pode criar, editar, listar e deletar cursos
- ✅ Deve confirmar ações destrutivas
- ✅ Fornece os dados dos cursos

### 10.2 Sistema (Mobile)
- ✅ Valida dados de entrada
- ✅ Gerencia interface do usuário
- ✅ Comunica com o servidor
- ✅ Exibe feedback ao usuário

### 10.3 Servidor (Backend)
- ✅ Valida dados recebidos
- ✅ Executa operações no banco de dados
- ✅ Retorna dados consistentes
- ✅ Garante integridade dos dados

### 10.4 Banco de Dados
- ✅ Armazena dados de cursos
- ✅ Mantém relacionamentos
- ✅ Executa transações
- ✅ Garante persistência

---

**Documento Gerado:** 29 de Janeiro de 2026  
**Versão:** 1.0  
**Status:** Completo
