const AlunoModel = require("../models/users/aluno.models.mongo")

//VERSÃO GAMBIARRA  

// const AlunoModel = require("../models/users/aluno.models")

// let alunos = [
//     new AlunoModel("Anderson", "alu@alu.com", "12345", 515027, "DD", 5, []),
//     new AlunoModel("Yuri", "est@est.com", "54321", 584725, "DD", 5, []),
//     new AlunoModel("Sávila", "sav@sav.com", "56789", 524731, "DD", 5, []),
//     new AlunoModel("Nataly", "nat@nat.com", "56654", 594522, "DD", 5, []),
//     new AlunoModel("Davi", "dav@dav.com", "48992", 523456, "DD", 5, [])
// ]




// class LoginService {

//     static Logar(data) {

//         for (let aluno of alunos) {
//             if (aluno.email === data.email && aluno.senha === data.senha) {
//                 return aluno
//             }
//         }

//         return "Usuário não está cadastrado!"
//     }

// }

//VERSÃO COM MONGOOSE --- Colocar Abaixo daqui

class LoginService {
    static Logar(body, res) {

        const email = body.email
        const senha = body.senha
        const aluno = AlunoModel.findOne({ 'user.email': email }).then((alunoEncontrado) => {
            if (alunoEncontrado) {
                console.log('Aluno encontrado:', alunoEncontrado);
                if (email == alunoEncontrado.user.email && senha == alunoEncontrado.user.senha) {
                    res.status(200).json({"aluno": true, "id": alunoEncontrado._id, "nome": alunoEncontrado.user.nome, "email": alunoEncontrado.user.email, "senha": alunoEncontrado.user.senha, "matricula": alunoEncontrado.matricula, "curso": alunoEncontrado.curso, "semestre": alunoEncontrado.semestre})
                } 
                else {
                    res.status(200).json(false)
                }
            } else {
                res.status(200).json(false)
            }
        
    })
            .catch((err) => {
                res.status(500).json(err)
            });
    }
}


module.exports = LoginService