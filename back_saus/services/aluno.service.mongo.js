const AlunoModel = require("../models/users/aluno.models.mongo")
const UsuarioModel = require("../models/users/usuario.models.mongo")

class AlunoService {

    static cadastrar(req, res) {

        AlunoModel.create(req.body)
            .then(
                (aluno) => {
                    UsuarioModel.create(req.body.user)

                    res.status(201).json(aluno)
                }
            )
            .catch(
                (erro) => {
                    res.status(500).json(erro)
                }
            )
    }

    static listar(req, res) {

        AlunoModel.find()
            .then((alunos) => {
                const listaAlunos = alunos.map((aluno) => ({
                    nome: aluno.user.nome,
                    email: aluno.user.email,
                    matricula: aluno.matricula,
                    curso: aluno.curso,
                    semestre: aluno.semestre,
                }));

                res.status(200).json(listaAlunos)
            })
            .catch((err) => res.status(500).json(err))

    }

    static retrieve(req, res) {

        AlunoModel.findById(req.params.id)
            .then(
                (aluno) => {
                    res.status(200).json({ "id": aluno._id, "nome": aluno.user.nome, "email": aluno.user.email, "senha": aluno.user.senha, "matricula": aluno.matricula, "curso": aluno.curso, "semestre": aluno.semestre })
                }
            )
            .catch(err => res.status(500).json(err))

    }

    static retrieveByMatricula(req, res) {
        const matriculaQuery = req.params.matricula;
      
        // console.log(regex)
        AlunoModel.find()
            .then(
                (alunos) => {
                    const filteredAlunos = alunos.filter((aluno) => {
                        return aluno.matricula.toString().startsWith(matriculaQuery);
                      });
                    const listaAlunos = filteredAlunos.map((aluno) => {
                        return {
                            id: aluno._id,
                            nome: aluno.user.nome,
                            email: aluno.user.email,
                            senha: aluno.user.senha,
                            matricula: aluno.matricula,
                            curso: aluno.curso,
                            semestre: aluno.semestre
                        };
                    });

                    res.status(200).json(listaAlunos)
                }
            )
            .catch(err => res.status(200).json(false))

    }
    static atualizar(req, res) {

        AlunoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .then(
                (aluno) => {
                    res.status(200).json({ "id": aluno._id, "nome": aluno.user.nome, "email": aluno.user.email, "senha": aluno.user.senha, "matricula": aluno.matricula, "curso": aluno.curso, "semestre": aluno.semestre })
                }
            )
            .catch(err => res.status(500).json(err))

    }

    static remover(req, res) {

        AlunoModel.findByIdAndRemove(req.params.id)
            .then(
                (aluno) => {
                    res.status(200).json(aluno)
                }
            )
            .catch(err => res.status(500).json(err))

    }
}

module.exports = AlunoService

