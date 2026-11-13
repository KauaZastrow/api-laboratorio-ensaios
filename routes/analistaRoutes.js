import express from 'express';
import {
    atualizarAnalista,
    buscarAnalistaPorId,
    cadastrarAnalista,
    deletarAnalista,
    listarAnalistas
} from '../controller/analistaController.js';

const router = express.Router();

router.post('/', cadastrarAnalista);
router.get('/', listarAnalistas);
router.get('/:id', buscarAnalistaPorId);
router.patch('/:id', atualizarAnalista);
router.delete('/:id', deletarAnalista);

export default router;
