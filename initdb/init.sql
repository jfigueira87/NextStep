-- Establecer la codificación de caracteres a UTF8
\encoding UTF8

-- Conectarse a la base de datos postgres
\c postgres

-- Cerrar todas las conexiones activas a la base de datos 'nextstep'
SELECT pg_terminate_backend(pid)  
FROM pg_stat_activity
WHERE datname = 'nextstep' AND pid <> pg_backend_pid();

-- Conectarse a la base de datos 'nextstep'
\c nextstep

-- Establecer la codificación de cliente a UTF8
SET client_encoding TO 'UTF8';

-- Agregar un comentario descriptivo sobre la base de datos 'nextstep'
COMMENT ON DATABASE nextstep
    IS 'Base de datos para Nextstep';

-- Crear el esquema si no existe
CREATE SCHEMA IF NOT EXISTS nextstep;

-- -----------------------------  Eliminar las tablas si existen  ----------------------------- --
DROP TABLE IF EXISTS nextstep.usuario CASCADE;
DROP TABLE IF EXISTS nextstep.carrera CASCADE;

-- -----------------------------  Crear las tablas  ----------------------------- --

CREATE TABLE nextstep.usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  edad INTEGER NOT NULL,
  cc_aa VARCHAR(20) NOT NULL,
  provincia VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  centro_estudios VARCHAR(100) NOT NULL,
  email_orientador VARCHAR(100) NOT NULL,
  renta_familiar INTEGER NOT NULL
);

CREATE TABLE nextstep.carrera (
  id SERIAL PRIMARY KEY,
  titulacion VARCHAR(100) NOT NULL,
  tipo_estudio VARCHAR(100) NOT NULL
);
