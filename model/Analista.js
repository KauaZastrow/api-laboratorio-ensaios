export class Analista {

    constructor(nome, registro, especialidade) {
        this.nome = nome;
        this.registro = registro;
        this.especialidade = especialidade;
    }

    validar() {
        if (typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            throw new Error('O nome do Analista deve ter pelo menos 3 caracteres.');
        }

        if (
            this.registro === undefined ||
            this.registro === null ||
            (typeof this.registro === 'string' && !this.registro.trim())
        ) {
            throw new Error('O registro do Analista é obrigatório.');
        }

        if (typeof this.especialidade !== 'string' || !this.especialidade.trim()) {
            throw new Error('A especialidade do Analista é obrigatória.');
        }
    }
}