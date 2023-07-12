const AdminModel = require('../models/users/administrador.models.mongo')
const UsuarioModel = require('../models/users/usuario.models.mongo')

class AdminService {

    static cadastrar(req, res) {

        UsuarioModel.create(req.body.user).then((usuario) => {
            AdminModel.create({...req.body, user: usuario})
                .then(
                    (admin) => {
                        res.status(201).json(admin)
                    }
                )
                .catch(
                    (erro) => {
                        res.status(500).json(erro)
                    }
                )
        }).catch(err => res.status(500).json(err))


    }

    static retrieve(req, res) {
        console.log(req.params.id)
        AdminModel.findById(req.params.id)
            .then(
                (admin) => {
                    res.status(200).json({ "id": admin._id, "nome": admin.user.nome, "user_id": admin.user._id, "email": admin.user.email, "senha": admin.user.senha, "cpf": admin.cpf, "cargo": admin.cargo })
                }
            )
            .catch(err => res.status(500).json(err))

    }

    static atualizar(req, res) {

        // console.log(req.body.user)
        // console.log(req.body.adm)

        console.log(req.params.adm_id)
        console.log(req.params.user_id)

        UsuarioModel.findByIdAndUpdate(req.params.user_id, req.body.user, { new: true }).then((usuario) => {
            console.log(usuario)
            // console.log({...req.body.adm, user: usuario})
            AdminModel.findByIdAndUpdate(req.params.adm_id, { ...req.body.adm, user: usuario }, { new: true }).then((admin) => {
                res.status(200).json({ "id": admin._id, "nome": admin.user.nome, "user_id": admin.user._id, "email": admin.user.email, "senha": admin.user.senha, "cpf": admin.cpf, "cargo": admin.cargo })
            }).catch(err => res.status(500).json(err))
        }).catch(err => res.status(500).json(err))



    }

}

module.exports = AdminService