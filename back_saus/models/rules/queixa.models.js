class QueixaModel {

    constructor(emissor, reserva, descricao, data) {
        this.emissor = emissor
        this.reserva = reserva
        this.regrasVioladas = []
        this.descricao = descricao
        this.data = data
    }

}

module.exports = QueixaModel