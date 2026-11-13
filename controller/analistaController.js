import { Analista } from '../model/Analista.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/analistaRepository.js';
import { validarId } from '../utils/validarId.js';

export async function cadastrarAnalista(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do analista em formato JSON.' });
    }

    const analista = new Analista(req.body.nome, req.body.registro, req.body.especialidade);
    try {
        analista.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(analista);
        return res.status(201).json({ mensagem: 'Analista cadastrado com sucesso.', id_analista: id });
    } catch (erro) {
        console.error('Erro ao cadastrar analista:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar analista.' });
    }
}

export async function listarAnalistas(req, res) {
    try {
        const analistas = await listar();
        return res.status(200).json(analistas);
    } catch (erro) {
        console.error('Erro ao listar analistas:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar analistas.' });
    }
}

export async function buscarAnalistaPorId(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const analista = await buscarPorId(id);
        if (!analista) {
            return res.status(404).json({ mensagem: 'Analista não encontrado.' });
        }
        return res.status(200).json(analista);
    } catch (erro) {
        console.error('Erro ao buscar analista:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar analista.' });
    }
}

export async function atualizarAnalista(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do analista em formato JSON.' });
    }
    if (!['nome', 'registro', 'especialidade'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const analistaExistente = await buscarPorId(id);
        if (!analistaExistente) {
            return res.status(404).json({ mensagem: 'Analista não encontrado.' });
        }

        const analista = new Analista(
            req.body.nome !== undefined ? req.body.nome : analistaExistente.nome,
            req.body.registro !== undefined ? req.body.registro : analistaExistente.registro,
            req.body.especialidade !== undefined ? req.body.especialidade : analistaExistente.especialidade
        );
        try {
            analista.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, analista);
        return res.status(200).json({ mensagem: 'Analista atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar analista:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar analista.' });
    }
}

export async function deletarAnalista(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const analista = await buscarPorId(id);
        if (!analista) {
            return res.status(404).json({ mensagem: 'Analista não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Analista não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Analista excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir analista:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir analista.' });
    }
}
