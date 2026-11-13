import conexao from '../database/conexao.js';

export async function cadastrar(analista) {
    const sql = 'INSERT INTO analista (nome, registro, especialidade) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [analista.nome, analista.registro, analista.especialidade]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM analista';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM analista WHERE id_analista = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, analista) {
    const sql = 'UPDATE analista SET nome = ?, registro = ?, especialidade = ? WHERE id_analista = ?';
    const [resultado] = await conexao.execute(sql, [analista.nome, analista.registro, analista.especialidade, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM analista WHERE id_analista = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}

