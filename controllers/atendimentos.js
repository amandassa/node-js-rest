const atendimentoModel = require("../models/atendimento");
module.exports = app => {
    app.get("/atendimentos", (req, res) => {
        atendimentoModel.listar(res);
    });

    app.get("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        atendimentoModel.buscarId(id, res);
    })

    app.post("/atendimentos", (req, res) => {
        const atendimento = req.body;
        atendimentoModel.adicionar(atendimento, res);   // res esta indo para o metodo de Atendimento
    });

    app.patch("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        atendimentoModel.alterar(id, valores, res);
    });

    app.delete("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        atendimentoModel.deletar(id, res);
    })
};