const AlunoModel = require("../models/users/aluno.models")

let alunos = [
    new AlunoModel("Anderson", "alu@alu.com", "12345", 515027, "DD", 5, []),
    new AlunoModel("Yuri", "est@est.com", "54321", 584725, "DD", 5, []),
    new AlunoModel("Sávila", "sav@sav.com", "56789", 524731, "DD", 5, []),
    new AlunoModel("Nataly", "nat@nat.com", "56654", 594522, "DD", 5, []),
    new AlunoModel("Davi", "dav@dav.com", "48992", 523456, "DD", 5, [])
]




class LoginService {

    static Logar(data) {

        for (let aluno of alunos) {
            if (aluno.email === data.email && aluno.senha === data.senha) {
                return aluno
            }
        }

        return "Usuário não está cadastrado!"
    }

}

module.exports = LoginService