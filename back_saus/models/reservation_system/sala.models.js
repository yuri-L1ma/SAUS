class SalaModel {

    constructor(id, nome, bloco, disponivel, capacidade, materiais, periodos, reservas) {
        this.id = id
        this.nome = nome
        this.bloco = bloco
        this.disponivel = disponivel
        this.capacidade = capacidade
        this.materiais = materiais
        this.periodos = periodos
        this.reservas = reservas
    }

}

module.exports = SalaModel