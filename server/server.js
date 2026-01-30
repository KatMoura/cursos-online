const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

console.log('🔧 Variáveis de ambiente carregadas:');
console.log('   DB_USER:', process.env.DB_USER);
console.log('   DB_HOST:', process.env.DB_HOST);
console.log('   DB_PORT:', process.env.DB_PORT);
console.log('   DB_NAME:', process.env.DB_NAME);

// Configuração do banco de dados
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sistema-cursos',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.1.X:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})); 
app.use(express.json());

console.log('\n📊 Tentando conectar ao PostgreSQL...');
pool.on('error', (err) => {
  console.error('❌ ERRO NO POOL:', err.message);
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar:', err.message);
    return;
  }
  console.log('✅ PostgreSQL conectado com sucesso!');

  // Teste de query
  client.query('SELECT COUNT(*) as total FROM cursos', (err, result) => {
    release();
    if (err) {
      console.error('❌ Erro ao contar cursos:', err.message);
    } else {
      console.log('✅ Tabela cursos existe com', result.rows[0].total, 'registros');
    }
  });
});

// Rota: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor rodando' });
});

// Rota: Buscar todos os cursos
app.get('/api/cursos', async (req, res) => {
  console.log('\n📍 GET /api/cursos - Requisição recebida');

  try {
    console.log('   ⏳ Executando query...');
    const result = await pool.query('SELECT * FROM cursos ORDER BY id');

    console.log('   ✅ Query executada com sucesso');
    console.log('   📦 Total de cursos:', result.rows.length);

    if (result.rows.length === 0) {
      console.log('   ⚠️  AVISO: Nenhum curso encontrado no banco!');
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('   ❌ ERRO na query:', error.message);
    console.error('   📋 Stack:', error.stack);

    res.status(500).json({
      error: 'Erro ao buscar cursos',
      mensagem: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Rota: Buscar curso por ID
app.get('/api/cursos/:id', async (req, res) => {
  const { id } = req.params;
  console.log('\n📍 GET /api/cursos/:id - ID:', id);

  try {
    const result = await pool.query('SELECT * FROM cursos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      console.log('   ⚠️  Curso não encontrado');
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    console.log('   ✅ Curso encontrado:', result.rows[0].titulo);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
    res.status(500).json({ error: error.message });
  }
});



// Rota: Criar um novo curso
app.post('/api/cursos', async (req, res) => {
  console.log('\n📍 POST /api/cursos');
  const { titulo, descricao, carga_horaria, duracao, preco, vagas, instrutor, imagem } = req.body;

  console.log('   📋 Dados recebidos:', { titulo, descricao, carga_horaria, duracao, preco, vagas, instrutor });

  try {
    // Validar campos obrigatórios
    if (!titulo || !descricao || !carga_horaria || !duracao || !preco || !vagas) {
      console.log('   ❌ Campos obrigatórios faltando');
      return res.status(400).json({ error: 'Campos obrigatórios faltando: titulo, descricao, carga_horaria, duracao, preco, vagas' });
    }

    console.log('   1️⃣ Inserindo novo curso no banco...');
    
    const result = await pool.query(
      'INSERT INTO cursos (titulo, descricao, carga_horaria, duracao, preco, vagas, instrutor, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [titulo, descricao, parseInt(carga_horaria), duracao, parseFloat(preco), parseInt(vagas), instrutor || null, imagem || null]
    );

    console.log('   ✅ Curso criado com sucesso! ID:', result.rows[0].id);
    res.status(201).json({
      success: true,
      message: 'Curso criado com sucesso!',
      curso: result.rows[0]
    });

  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
    res.status(500).json({
      error: 'Erro ao criar curso',
      mensagem: error.message,
      detalhes: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Rota: Deletar um curso
app.delete('/api/cursos/:id', async (req, res) => {
  const { id } = req.params;
  console.log('\n📍 DELETE /api/cursos/:id - ID:', id);

  try {
    // Validar ID
    const cursoId = parseInt(id);
    if (isNaN(cursoId)) {
      console.log('   ❌ ID do curso inválido');
      return res.status(400).json({ error: 'ID do curso inválido' });
    }

    console.log('   1️⃣ Verificando se o curso existe...');
    
    // Verificar se curso existe
    const cursoExistente = await pool.query('SELECT * FROM cursos WHERE id = $1', [cursoId]);
    
    if (cursoExistente.rows.length === 0) {
      console.log('   ⚠️  Curso não encontrado');
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    console.log('   2️⃣ Deletando matrículas associadas...');
    
    // Deletar matrículas associadas ao curso
    await pool.query('DELETE FROM matriculas WHERE id_curso = $1', [cursoId]);

    console.log('   3️⃣ Deletando o curso...');
    
    // Deletar o curso
    const result = await pool.query('DELETE FROM cursos WHERE id = $1 RETURNING *', [cursoId]);

    console.log('   ✅ Curso deletado com sucesso! Titulo:', result.rows[0].titulo);
    res.json({
      success: true,
      message: 'Curso deletado com sucesso!',
      curso_deletado: result.rows[0]
    });

  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
    res.status(500).json({
      error: 'Erro ao deletar curso',
      mensagem: error.message,
      detalhes: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Rota: Atualizar um curso
app.put('/api/cursos/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, carga_horaria, duracao, preco, vagas, instrutor, imagem } = req.body;
  
  console.log('\n📍 PUT /api/cursos/:id - ID:', id);
  console.log('   📋 Dados a atualizar:', { titulo, descricao, carga_horaria, duracao, preco, vagas, instrutor });

  try {
    // Validar ID
    const cursoId = parseInt(id);
    if (isNaN(cursoId)) {
      console.log('   ❌ ID do curso inválido');
      return res.status(400).json({ error: 'ID do curso inválido' });
    }

    console.log('   1️⃣ Verificando se o curso existe...');
    
    // Verificar se curso existe
    const cursoExistente = await pool.query('SELECT * FROM cursos WHERE id = $1', [cursoId]);
    
    if (cursoExistente.rows.length === 0) {
      console.log('   ⚠️  Curso não encontrado');
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    console.log('   2️⃣ Atualizando o curso...');
    
    // Construir a query dinamicamente baseado nos campos fornecidos
    const campos = [];
    const valores = [];
    let indice = 1;

    if (titulo !== undefined) {
      campos.push(`titulo = $${indice++}`);
      valores.push(titulo);
    }
    if (descricao !== undefined) {
      campos.push(`descricao = $${indice++}`);
      valores.push(descricao);
    }
    if (carga_horaria !== undefined) {
      campos.push(`carga_horaria = $${indice++}`);
      valores.push(parseInt(carga_horaria));
    }
    if (duracao !== undefined) {
      campos.push(`duracao = $${indice++}`);
      valores.push(duracao);
    }
    if (preco !== undefined) {
      campos.push(`preco = $${indice++}`);
      valores.push(parseFloat(preco));
    }
    if (vagas !== undefined) {
      campos.push(`vagas = $${indice++}`);
      valores.push(parseInt(vagas));
    }
    if (instrutor !== undefined) {
      campos.push(`instrutor = $${indice++}`);
      valores.push(instrutor);
    }
    if (imagem !== undefined) {
      campos.push(`imagem = $${indice++}`);
      valores.push(imagem);
    }

    if (campos.length === 0) {
      console.log('   ⚠️  Nenhum campo para atualizar');
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    valores.push(cursoId);
    const query = `UPDATE cursos SET ${campos.join(', ')} WHERE id = $${indice} RETURNING *`;
    
    const result = await pool.query(query, valores);

    console.log('   ✅ Curso atualizado com sucesso!');
    res.json({
      success: true,
      message: 'Curso atualizado com sucesso!',
      curso: result.rows[0]
    });

  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
    res.status(500).json({
      error: 'Erro ao atualizar curso',
      mensagem: error.message,
      detalhes: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Rota: Criar inscrição
app.post('/api/matriculas', async (req, res) => {
  console.log('\n📍 POST /api/matriculas');
  const { nome, email, celular, id_curso } = req.body;

  console.log('   📋 Dados recebidos:', { nome, email, celular, id_curso });

  try {
    // Validar campos
    if (!nome || !email || !celular || !id_curso) {
      console.log('   ❌ Campos obrigatórios faltando');
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Converter id_curso para número
    const cursoId = parseInt(id_curso);
    if (isNaN(cursoId)) {
      console.log('   ❌ ID do curso inválido:', id_curso);
      return res.status(400).json({ error: 'ID do curso inválido' });
    }

    // Converter celular para número (remove formatação)
    const celularNumero = parseInt(celular.toString().replace(/\D/g, ''));
    if (isNaN(celularNumero)) {
      console.log('   ❌ Celular inválido:', celular);
      return res.status(400).json({ error: 'Celular inválido' });
    }

    console.log('   1️⃣ Verificando se aluno existe...');

    // Verificar se aluno já existe
    let alunoId;
    const alunoExistente = await pool.query(
      'SELECT id FROM alunos WHERE email = $1',
      [email]
    );

    if (alunoExistente.rows.length > 0) {
      alunoId = alunoExistente.rows[0].id;
      console.log('   ✅ Aluno encontrado, ID:', alunoId);
    } else {
      console.log('   2️⃣ Criando novo aluno...');

      // Criar novo aluno
      const novoAluno = await pool.query(
        'INSERT INTO alunos (nome, email, celular) VALUES ($1, $2, $3) RETURNING id',
        [nome, email, celularNumero]
      );

      alunoId = novoAluno.rows[0].id;
      console.log('   ✅ Novo aluno criado, ID:', alunoId);
    }

    // Verificar se já tem matrícula
    console.log('   3️⃣ Verificando matrícula anterior...');
    const matriculaExistente = await pool.query(
      'SELECT id FROM matriculas WHERE id_aluno = $1 AND id_curso = $2',
      [alunoId, cursoId]
    );

    if (matriculaExistente.rows.length > 0) {
      console.log('   ⚠️  Aluno já está inscrito neste curso');
      return res.status(400).json({ error: 'Você já está inscrito neste curso' });
    }

    // Criar matrícula
    console.log('   4️⃣ Criando matrícula...');
    const result = await pool.query(
      'INSERT INTO matriculas (id_aluno, id_curso, data_matricula) VALUES ($1, $2, NOW()) RETURNING *',
      [alunoId, cursoId]
    );

    console.log('   ✅ Inscrição criada com sucesso!');
    res.status(201).json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      matricula: result.rows[0]
    });

  } catch (error) {
    console.error('   ❌ ERRO COMPLETO:', error);
    console.error('   📋 Mensagem:', error.message);
    console.error('   📋 Stack:', error.stack);
    console.error('   📋 Código:', error.code);
    res.status(500).json({
      error: 'Erro ao criar inscrição',
      mensagem: error.message,
      codigo: error.code,
      detalhes: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Rota: Buscar aluno por email
app.get('/api/alunos/:email', async (req, res) => {
  const { email } = req.params;
  console.log('\n📍 GET /api/alunos/:email - Email:', email);

  try {
    const result = await pool.query('SELECT * FROM alunos WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      console.log('   ⚠️  Aluno não encontrado');
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    console.log('   ✅ Aluno encontrado:', result.rows[0].nome);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Rota: Buscar matrículas do aluno
app.get('/api/matriculas/aluno/:email', async (req, res) => {
  const { email } = req.params;
  console.log('\n📍 GET /api/matriculas/aluno/:email - Email:', email);

  try {
    // Busca o aluno pelo email
    const aluno = await pool.query('SELECT id FROM alunos WHERE email = $1', [email]);

    if (aluno.rows.length === 0) {
      console.log('   ⚠️  Aluno não encontrado');
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    const alunoId = aluno.rows[0].id;
    console.log('   📋 Buscando matrículas do aluno ID:', alunoId);

    // Busca as matrículas com informações dos cursos
    const result = await pool.query(`
      SELECT 
        m.id,
        m.data_matricula,
        c.id as curso_id,
        c.titulo,
        c.descricao,
        c.carga_horaria,
        c.duracao,
        c.preco,
        c.imagem
      FROM matriculas m
      JOIN cursos c ON m.id_curso = c.id
      WHERE m.id_aluno = $1
      ORDER BY m.data_matricula DESC
    `, [alunoId]);

    console.log('   ✅ Matrículas encontradas:', result.rows.length);
    res.json(result.rows);
  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Rota: Debug - Ver info do banco
app.get('/api/debug', async (req, res) => {
  console.log('\n🔧 DEBUG - Verificando banco de dados...');

  try {
    const cursos = await pool.query('SELECT COUNT(*) as total FROM cursos');
    const alunos = await pool.query('SELECT COUNT(*) as total FROM alunos');
    const matriculas = await pool.query('SELECT COUNT(*) as total FROM matriculas');

    console.log('   ✅ Stats do banco carregadas');

    res.json({
      status: 'OK',
      cursos: cursos.rows[0].total,
      alunos: alunos.rows[0].total,
      matriculas: matriculas.rows[0].total,
      mensagem: 'Banco de dados está conectado!'
    });
  } catch (error) {
    console.error('   ❌ ERRO:', error.message);
    res.status(500).json({
      status: 'ERRO',
      mensagem: error.message
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log('='.repeat(50));
  console.log('\n📡 Rotas disponíveis:');
  console.log('   GET  http://localhost:3000/api/health');
  console.log('   GET  http://localhost:3000/api/cursos');
  console.log('   GET  http://localhost:3000/api/cursos/:id');
  console.log('   POST http://localhost:3000/api/cursos (criar novo curso)');
  console.log('   PUT  http://localhost:3000/api/cursos/:id (atualizar curso)');
  console.log('   DELETE http://localhost:3000/api/cursos/:id (deletar curso)');
  console.log('   GET  http://localhost:3000/api/alunos/:email');
  console.log('   POST http://localhost:3000/api/matriculas');
  console.log('   GET  http://localhost:3000/api/matriculas/aluno/:email');
  console.log('   GET  http://localhost:3000/api/debug');
  console.log('\n');
});