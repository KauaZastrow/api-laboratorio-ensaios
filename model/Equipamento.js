export class Equipamento {

    constructor(nome, patrimonio, situacao) {
        this.nome = nome;
        this.patrimonio = patrimonio;
        this.situacao = situacao;
    }

    validar() {
        if (typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            throw new Error('O nome do Equipamento deve ter pelo menos 3 caracteres.');
        }

        if (
            this.patrimonio === undefined ||
            this.patrimonio === null ||
            (typeof this.patrimonio === 'string' && !this.patrimonio.trim())
        ) {
            throw new Error('O patrimônio do Equipamento é obrigatório.');
        }

        if (typeof this.situacao !== 'string' || !this.situacao.trim()) {
            throw new Error('A situação do Equipamento é obrigatória.');
        }
    }
}