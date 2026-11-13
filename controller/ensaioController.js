import { Ensaio } from '../model/Ensaio.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/ensaioRepository.js';
import { validarId } from '../utils/validarId.js';

export async function cadastrarEnsaio(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do ensaio em formato JSON.' });
    }

    const ensaio = new Ensaio(req.body.nome, req.body.norma, req.body.status_ensaios);
    try {
        ensaio.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(ensaio);
        return res.status(201).json({ mensagem: 'Ensaio cadastrado com sucesso.', id_ensaio: id });
    } catch (erro) {
        console.error('Erro ao cadastrar ensaio:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar ensaio.' });
    }
}

export async function listarEnsaios(req, res) {
    try {
        const ensaios = await listar();
        return res.status(200).json(ensaios);
    } catch (erro) {
        console.error('Erro ao listar ensaios:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar ensaios.' });
    }
}

export async function buscarEnsaioPorId(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const ensaio = await buscarPorId(id);
        if (!ensaio) {
            return res.status(404).json({ mensagem: 'Ensaio não encontrado.' });
        }
        return res.status(200).json(ensaio);
    } catch (erro) {
        console.error('Erro ao buscar ensaio:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar ensaio.' });
    }
}

export async function atualizarEnsaio(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do ensaio em formato JSON.' });
    }
    if (!['nome', 'norma', 'status_ensaios'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const ensaioExistente = await buscarPorId(id);
        if (!ensaioExistente) {
            return res.status(404).json({ mensagem: 'Ensaio não encontrado.' });
        }

        const ensaio = new Ensaio(
            req.body.nome !== undefined ? req.body.nome : ensaioExistente.nome,
            req.body.norma !== undefined ? req.body.norma : ensaioExistente.norma,
            req.body.status_ensaios !== undefined ? req.body.status_ensaios : ensaioExistente.status_ensaios
        );
        try {
            ensaio.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, ensaio);
        return res.status(200).json({ mensagem: 'Ensaio atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar ensaio:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar ensaio.' });
    }
}

export async function deletarEnsaio(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const ensaio = await buscarPorId(id);
        if (!ensaio) {
            return res.status(404).json({ mensagem: 'Ensaio não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Ensaio não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Ensaio excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir ensaio:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir ensaio.' });
    }
}
