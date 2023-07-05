const AlunoModel = require("../models/users/aluno.models.mongo");

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
        const EmailsAdmin = ["tabataadmin@gmail.com", "admin2@gmail.com", "admin3@gmail.com", "admin4@gmail.com", "admin5@gmail.com" ]
        const email = body.email
        const senha = body.senha
        const aluno = AlunoModel.findOne({ 'user.email': email }).then((alunoEncontrado) => {
            if (alunoEncontrado) {
                console.log('Aluno encontrado:', alunoEncontrado);
                if (email == alunoEncontrado.user.email && senha == alunoEncontrado.user.senha) {
                    let boolAdmin = false;
                    for (let i = 0; i < EmailsAdmin.length; i++) {
                        if (email == EmailsAdmin[i]) {
                            boolAdmin = true;
                        }
                    }
                    if (boolAdmin == true) {
                        res.json({ "admin": true })
                    } else {
                        res.json({ "aluno": true })
                    }
                } else {
                    res.json(false)
                }
            } else {
                console.log('Nenhum aluno encontrado.');
            }
        })
            .catch((err) => {
                console.error('Erro ao buscar aluno:', err);
            });
    }
}

module.exports = LoginService