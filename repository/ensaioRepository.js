import conexao from '../database/conexao.js';

export async function cadastrar(ensaio) {
    const sql = 'INSERT INTO ensaio (nome, norma, status_ensaios) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [ensaio.nome, ensaio.norma, ensaio.status_ensaios]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM ensaio';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM ensaio WHERE id_ensaio = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, ensaio) {
    const sql = 'UPDATE ensaio SET nome = ?, norma = ?, status_ensaios = ? WHERE id_ensaio = ?';
    const [resultado] = await conexao.execute(sql, [ensaio.nome, ensaio.norma, ensaio.status_ensaios, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM ensaio WHERE id_ensaio = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}
