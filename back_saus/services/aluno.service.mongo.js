const AlunoModel = require ("../models/users/aluno.models.mongo"); 

//VERSÃO SEM MONGOOSE

// const AlunoModel = require("../models/users/aluno.models")
// const ReservaModel = require("../models/reservation_system/reserva.models")
// const PeriodoModel = require("../models/reservation_system/periodo.models")

// let reservas = [
//     new ReservaModel("Reunião", "Porque sim!", {nome: "Anderson"}, 3, new PeriodoModel(0, new Date("2023-06-25"), "AB manhã")),
//     new ReservaModel("Estudar", "Porque eu quero!", {nome: "Yuri"}, 5, new PeriodoModel(1, new Date("2023-06-30"), "CD tarde")),
//     new ReservaModel("Projeto", "Porque preciso", {nome: "Sávila"}, 7, new PeriodoModel(2, new Date("2023-06-20"), "CD manhã")),
//     new ReservaModel("Chorar", "Porque sei lá!", {nome: "Nataly"}, 3, new PeriodoModel(3, new Date("2023-06-21"), "AB tarde"))
// ]

// let alunos = [
//     new AlunoModel("Anderson", "alu@alu.com", "12345", 515027, "DD", 5, [reservas[0]]),
//     new AlunoModel("Yuri", "est@est.com", "54321", 584725, "DD", 5, [reservas[1]]),
//     new AlunoModel("Sávila", "sav@sav.com", "56789", 524731, "DD", 5, [reservas[2]]),
//     new AlunoModel("Nataly", "nat@nat.com", "56654", 594522, "DD", 5, [reservas[3]]),
//     new AlunoModel("Davi", "dav@dav.com", "48992", 523456, "DD", 5, [])
// ]


// class AlunoService {

//     static listar() {
//         return alunos
//     }

//     static verReservas(matricula) {
//         for (let i = 0; i < alunos.length; i++) {
//             if (alunos[i].matricula == matricula) {
//                 return alunos[i].reservas
//             }
//         }

//         return "Q pena!"
//     }

// }

// module.exports = AlunoService

//VERSÃO COM MONGOOSE --- Colocar Abaixo daqui

class AlunoService{
    static cadastrar (req, res){
        AlunoModel.create(req.body)
        .then(
            (aluno) => {
                res.status(201).json(aluno)
            }
        )
    }
}

module.exports = AlunoService