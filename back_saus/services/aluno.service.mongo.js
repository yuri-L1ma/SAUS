const AlunoModel = require("../models/users/aluno.models.mongo")
const UsuarioModel = require("../models/users/usuario.models.mongo")

class AlunoService {

    static cadastrar(req, res) {

        UsuarioModel.create(req.body.user).then((usuario) => {
            AlunoModel.create({...req.body, user: usuario})
                .then(
                    (aluno) => {
                        res.status(201).json(aluno)
                    }
                )
                .catch(
                    (erro) => {
                        res.status(500).json(erro)
                    }
                )
        }).catch(err => res.status(500).json(err))
    }

    static listar(req, res) {

        AlunoModel.find()
            .then((alunos) => {
                
                const listaAlunos = alunos.map((aluno) => ({
                    id: aluno._id,
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
                    res.status(200).json({ "id": aluno._id, "nome": aluno.user.nome, "user_id": aluno.user._id, "email": aluno.user.email, "user_id": aluno.user._id, "senha": aluno.user.senha, "matricula": aluno.matricula, "curso": aluno.curso, "semestre": aluno.semestre })
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
                            user_id: aluno.user._id,
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

        console.log(req.body.user)
        console.log(req.body.aluno)
        console.log(req.params.user_id)
        console.log(req.params.aluno_id)

        UsuarioModel.findByIdAndUpdate(req.params.user_id, req.body.user, { new: true }).then((usuario) => {
            AlunoModel.findByIdAndUpdate(req.params.aluno_id, { ...req.body.aluno, user: usuario }, { new: true }).then((aluno) => {
                res.status(200).json({ "id": aluno._id, "nome": aluno.user.nome, "user_id": aluno.user._id, "email": aluno.user.email, "user_id": aluno.user._id, "senha": aluno.user.senha, "matricula": aluno.matricula, "curso": aluno.curso, "semestre": aluno.semestre })
            }).catch(err => res.status(500).json(err))
        }).catch(err => res.status(500).json(err))

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

