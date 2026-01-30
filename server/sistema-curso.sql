
-- create
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

CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  celular BIGINT NOT NULL,
  data_cadastro TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matriculas (
  id SERIAL PRIMARY KEY,
  id_aluno INT REFERENCES alunos(id),
  id_curso INT REFERENCES cursos(id), 
  data_matricula TIMESTAMP DEFAULT NOW()
);


-- insert


INSERT INTO cursos(id, titulo, descricao, carga_horaria, vagas, duracao, preco, imagem) VALUES (1, 'C# Pro', 'Nessa jornada, você vai explorar o desenvolvimento com C#, desde os fundamentos até a criação de aplicações robustas, passando por Programação Orientada a Objetos (POO), desenvolvimento web e integração de APIs com ASP.NET.', 15, 1, '3 semanas', 'R$ 199,90', 'https://via.placeholder.com/140');
INSERT INTO cursos(id, titulo, descricao, carga_horaria, vagas, duracao, preco, imagem) VALUES (2, 'Excel Avançado', 'Esse curso foi desenvolvido para demostrar a aplicação das funções mais avançadas num contexto prático.', 10, 2, '2 semanas', 'R$ 89,90', 'https://via.placeholder.com/140');
INSERT INTO cursos(id, titulo, descricao, carga_horaria, vagas, duracao, preco, imagem) VALUES (3, 'Inteligência Artificial e Machine Learning: O Guia Completo', 'Quer estudar IA e não sabe por onde começar? Aqui você aprende tudo o que precisa saber sobre a área na teoria e prática', 25, 5, '5 semanas', 'R$ 249,90', 'https://via.placeholder.com/140');
INSERT INTO cursos(id, titulo, descricao, carga_horaria, vagas, duracao, preco, imagem) VALUES (4, 'Dominando Python', 'Nessa jornada, você vai mergulhar profundamente no mundo do desenvolvimento com Python.', 100, 10, '20 semanas', 'R$ 299,90', 'https://via.placeholder.com/140');
INSERT INTO cursos (id, titulo, descricao, carga_horaria, vagas, duracao, preco, imagem) VALUES (5, 'Banco de Dados', 'Aprenda os conceitos básicos de Banco de Dados', 20, 10, '4 semanas', 'R$ 149,90', 'https://via.placeholder.com/140');

-- inicializa vagas_disponiveis com valor de vagas
UPDATE cursos SET vagas_disponiveis = vagas;

-- function 
CREATE OR REPLACE FUNCTION verificar_vagas(curso_id INT)
  RETURNS BOOLEAN
  LANGUAGE plpgsql
AS
$$
DECLARE
  vagas_restantes INT;
BEGIN
  SELECT vagas_disponiveis INTO vagas_restantes FROM cursos WHERE id = curso_id;
  RETURN vagas_restantes > 0;
END;
$$;

CREATE OR REPLACE FUNCTION reduzir_vagas()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE cursos
  SET vagas_disponiveis = vagas_disponiveis - 1
  WHERE id = NEW.id_curso;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- procedure
CREATE OR REPLACE PROCEDURE realizar_matricula(aluno_id INT, curso_id INT)
  LANGUAGE plpgsql
AS
$$
DECLARE 
  tem_vaga BOOLEAN;
BEGIN
  tem_vaga := verificar_vagas(curso_id);
  
  IF tem_vaga THEN
    INSERT INTO matriculas (id_aluno, id_curso)
    VALUES (aluno_id, curso_id);
    
    RAISE NOTICE 'Matrícula realizada com sucesso.';
    
  ELSE
    RAISE NOTICE 'Não há vagas disponíveis neste curso.';
  END IF;
  
END;
$$;


--trigger
CREATE TRIGGER trg_reduzir_vagas
AFTER INSERT ON matriculas
FOR EACH ROW
EXECUTE FUNCTION reduzir_vagas();


SELECT * FROM cursos;