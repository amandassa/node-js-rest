const atendimentoModel = require("../models/atendimento");
module.exports = app => {
    app.get("/atendimentos", (req, res) => res.send("Você está na página de atendimentos <3"));

    app.post("/atendimentos", (req, res) => {
        const atendimento = req.body;
        atendimentoModel.adicionar(atendimento, res);   // res esta indo para o metodo de Atendimento
    });
};