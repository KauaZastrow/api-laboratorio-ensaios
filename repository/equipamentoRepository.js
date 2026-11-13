import conexao from '../database/conexao.js';

export async function cadastrar(equipamento) {
    const sql = 'INSERT INTO equipamento (nome, patrimonio, situacao) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [equipamento.nome, equipamento.patrimonio, equipamento.situacao]);
    return resultado.insertId;
}

export async function listar() {
    const sql = 'SELECT * FROM equipamento';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}

export async function buscarPorId(id) {
    const sql = 'SELECT * FROM equipamento WHERE id_equipamento = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, equipamento) {
    const sql = 'UPDATE equipamento SET nome = ?, patrimonio = ?, situacao = ? WHERE id_equipamento = ?';
    const [resultado] = await conexao.execute(sql, [equipamento.nome, equipamento.patrimonio, equipamento.situacao, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM equipamento WHERE id_equipamento = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}

