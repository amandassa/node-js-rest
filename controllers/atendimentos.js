const atendimentoModel = require("../models/atendimento");
module.exports = app => {
    app.get("/atendimentos", (res) => {
        atendimentoModel.listar()
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros));
    });

    app.get("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        atendimentoModel.buscarId(id, res);
    })

    app.post("/atendimentos", (req, res) => {
        const atendimento = req.body;
        atendimentoModel.adicionar(atendimento)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(erro => res.status(400).json(erro));
    });

    app.patch("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        atendimentoModel.alterar(id, valores, res);
    });

    app.delete("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        atendimentoModel.deletar(id, res);
    });
};