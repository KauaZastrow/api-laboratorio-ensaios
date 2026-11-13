DROP DATABASE IF EXISTS banco;
CREATE DATABASE banco;

USE banco;

CREATE TABLE ensaio (
    id_ensaio INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    norma VARCHAR(100) NOT NULL,
    status_ensaios VARCHAR(50) NOT NULL
);

CREATE TABLE equipamento (
    id_equipamento INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    patrimonio VARCHAR(100) NOT NULL,
    situacao VARCHAR(50) NOT NULL
);

CREATE TABLE analista (
    id_analista INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    registro VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100) NOT NULL
);