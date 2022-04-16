const moment = require("moment");
const conexao = require("../infraestrutura/conexao.js");
class Atendimento {
    adicionar (atendimento, res) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");      // moment vai converter ddmmyyyy->yyyymmdd
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;
        const validacoes = [
            {
                nome: "data",
                valido: dataEhValida,
                mensagem: "data deve ser >= data atual"
            },
            {
                nome: "cliente",
                valido: clienteEhValido,
                mensagem: "Cliente deve ter pelo menos 5 caracteres no nome."
            }
        ];
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length !== 0;

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, data, dataCriacao};
            const query = "INSERT INTO Atendimentos SET ?";
            conexao.query(query, atendimentoDatado, (err, resultados) => {
                if (err) {
                    res.status(400).json(err); // bad request
                } else {
                    res.status(201).json(resultados);   // created
                }
            });    
        }
    }
}

module.exports = new Atendimento();