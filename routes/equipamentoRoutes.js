import express from 'express';
import {
    atualizarEquipamento,
    buscarEquipamentoPorId,
    cadastrarEquipamento,
    deletarEquipamento,
    listarEquipamentos
} from '../controller/equipamentoController.js';

const router = express.Router();

router.post('/', cadastrarEquipamento);
router.get('/', listarEquipamentos);
router.get('/:id', buscarEquipamentoPorId);
router.patch('/:id', atualizarEquipamento);
router.delete('/:id', deletarEquipamento);

export default router;
