const moment = require("moment");
const conexao = require("../infraestrutura/conexao.js");
class Atendimento {
    adicionar (atendimento) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
        const atendimentoDatado = {...atendimento, data, dataCriacao};
        const query = "INSERT INTO Atendimentos SET ?";
        conexao.query(query, atendimentoDatado, (err, resultados) => {
            if (err) {
                console.log(err);
            } else {
                console.log(resultados);
            }
        });
    }
}

module.exports = new Atendimento();