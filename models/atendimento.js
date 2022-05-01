const { default: axios } = require("axios");
const moment = require("moment");
const conexao = require("../infraestrutura/database/conexao.js");
const repositorio = require("../repositorios/atendimentos.js");
class Atendimento {
    adicionar (atendimento) {
        const dataCriacao = moment().format("YYYY-MM-DD hh:mm:ss");
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD hh:mm:ss"); // moment vai converter ddmmyyyy->yyyymmdd
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
                mensagem: "Cliente deve ter pelo menos 5 caracter no nome."
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length !== 0;

        if (existemErros) {
            return new Promise((reject) => reject(erros));
        } else {
            const atendimentoDatado = {...atendimento, data, dataCriacao};

            return repositorio.adiciona(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId;
                    return {...atendimento, id};
                });
        }
    }

    listar (res) {
        const query = "SELECT * FROM Atendimentos";
        conexao.query(query, (err, resultados) => {
            if (err) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscarId (id, res) {
    const query = `SELECT * FROM Atendimentos WHERE ID=${id}`;
        conexao.query(query, async (err, resultados) => {
            const atendimento = resultados[0];
            const cpf = atendimento.cliente;
            if (err) {
                res.status(400).json(err);
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                res.status(200).json(atendimento);
            }
        })
    }

    alterar (id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:MM:SS");
        }
        const query = "UPDATE Atendimentos SET ? WHERE id=?";
        conexao.query(query, [valores, id], (err, resultados) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({...valores, id});
            }
        });
    }

    deletar (id, res) {
        const query = "DELETE FROM atendimentos WHERE id=?";
        conexao.query(query, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento();