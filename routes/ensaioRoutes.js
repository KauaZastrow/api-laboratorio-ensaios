import express from 'express';
import {
    atualizarEnsaio,
    buscarEnsaioPorId,
    cadastrarEnsaio,
    deletarEnsaio,
    listarEnsaios
} from '../controller/ensaioController.js';

const router = express.Router();

router.post('/', cadastrarEnsaio);
router.get('/', listarEnsaios);
router.get('/:id', buscarEnsaioPorId);
router.patch('/:id', atualizarEnsaio);
router.delete('/:id', deletarEnsaio);

export default router;
