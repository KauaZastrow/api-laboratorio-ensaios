export class Ensaio {

    constructor(nome, norma, status_ensaios) {
        this.nome = nome;
        this.norma = norma;
        this.status_ensaios = status_ensaios;
    }

    validar() {
        if (typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            throw new Error('O nome do Ensaio deve ter pelo menos 3 caracteres.');
        }

        if (typeof this.norma !== 'string' || !this.norma.trim()) {
            throw new Error('A norma do Ensaio é obrigatória.');
        }

        if (typeof this.status_ensaios !== 'string' || !this.status_ensaios.trim()) {
            throw new Error('O status do Ensaio é obrigatório.');
        }
    }
}
