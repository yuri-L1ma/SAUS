const ReservaModel = require("../models/reservation_system/reserva.models")
const PeriodoModel = require("../models/reservation_system/periodo.models")
const TurnoModel = require("../models/reservation_system/turno.models")
var moment = require('moment');
const AlunoModel = require("../models/users/aluno.models");

let salas = [
  { id: 0, nome: "SALA 1", bloco: "3", disponivel: true, capacidade: 45, materiais: ["projetor", "ar-condicionado"], periodos: [], reservas: [] }
  // { id: 1, nome: "SALA 2", bloco: "3", disponivel: false, capacidade: 45, materiais: ["projetor", "ar-condicionado"], periodos: [{idPeriodo: 1, dataInicial: new Date("2023-06-03T15:30:00"), dataFinal: new Date("2023-06-03T17:30:00"), nomeTurno: "CD tarde"}], reservas: [] },
  // { id: 2, nome: "SALA 3", bloco: "3", disponivel: true, capacidade: 45, materiais: ["projetor", "ar-condicionado"], periodos: [{idPeriodo: 2, dataInicial: new Date("2023-06-04T13:30:00"), dataFinal: new Date("2023-06-04T15:30:00"), nomeTurno: "AB tarde"}], reservas: [] },
  // { id: 3, nome: "SALA 4", bloco: "3", disponivel: false, capacidade: 45, materiais: ["projetor", "ar-condicionado"], periodos: [{idPeriodo: 3, dataInicial: new Date("2023-06-05T10:00:00"), dataFinal: new Date("2023-06-05T12:00:00"), nomeTurno: "CD manhã"}], reservas: [] },
  // { id: 4, nome: "SALA 5", bloco: "3", disponivel: true, capacidade: 45, materiais: ["projetor", "ar-condicionado"], periodos: [{idPeriodo: 4, dataInicial: new Date("2023-06-06T08:00:00"), dataFinal: new Date("2023-06-06T10:00:00"), nomeTurno: "AB manhã"}], reservas: [] },
  // { id: 5, nome: "SALA 6", bloco: "3", disponivel: true, capacidade: 45, materiais: ["projetor", "ar-condicionado"], periodos: [{idPeriodo: 5, dataInicial: new Date("2023-06-07T15:30:00"), dataFinal: new Date("2023-06-07T17:30:00"), nomeTurno: "CD tarde"}], reservas: [] },
  // { id: 6, nome: "SALA 7", bloco: "3", disponivel: false, capacidade: 45, materiais: ["projetor", "ar-condicionado"], periodos: [{idPeriodo: 6, dataInicial: new Date("2023-06-08T13:30:00"), dataFinal: new Date("2023-06-08T15:30:00"), nomeTurno: "AB tarde"}], reservas: [] }
]



let periodo0 = new PeriodoModel(0, new Date("2023-06-02"), "AB manhã")

//colocando período na sala
salas[0].periodos.push(periodo0)



let alunos = [
  new AlunoModel("Anderson", "alu@alu.com", "12345", 515027, "DD", 5, []),
  new AlunoModel("Yuri", "est@est.com", "54321", 584725, "DD", 5, []),
  new AlunoModel("Sávila", "sav@sav.com", "56789", 524731, "DD", 5, []),
]




class SalaService {
  static listar() {
    return salas;
  }

  static retrieveSala(id) {
    for (let sala of salas) {
      if (sala.id == id) {
        return sala;
      }
    }
    return null;
  }

  static retrieveAluno(matricula) {
    for (let aluno of alunos) {
      if (aluno.matricula === matricula) {
        return aluno;
      }
    }
    return "aluno não encontrado";
  }

/*  
  static retrieveTurnoByNome(turnoNome) {
    for (let sala of salas) {
      for (let periodo of sala.periodos) {
        for (let turno of periodo.turnos) {
          if (turno.turnoNome === turnoNome) {
            return turno;
          }
        }
      }
    }
    return null;
  }
*/  

/*
  static retrieveIdPeriodoSalaByDia(dia) {
    for (let sala of salas) {
      for (let periodo of sala.periodos) {
        if (periodo.dia === dia) {
          return periodo.idPeriodo;
        }
      } 
    }
    return null;
  }
*/

  static reservar(id, data) {
    let sala = this.retrieveSala(id);
    let aluno = this.retrieveAluno(data.matricula);
    //let idPeriodo = sala.periodos[id].idPeriodo
    //let dia = sala.periodos[id].dia
    //let turno = sala.periodos[id].turno
    //let turno = this.retrieveTurnoByName(data.turnoNome);
    

    let periodoReserva = sala.periodos[0];

    let reserva = new ReservaModel(
      data.atividade,
      data.justificativa,
      aluno,
      data.qtdAlunos,
      periodoReserva 
    );

    // sala
    sala.disponivel = false;
    sala.reservas.push(reserva);

    // Deixar o período indisponível
    // if (sala.periodos.dia === data.dia && sala.periodos.turno === data.turno) {
    //   sala.periodos = [];
    // }


    // aluno
    //aluno.reservas.push(reserva);

    // retornando a sala
    return sala;
  }
}

module.exports = SalaService;