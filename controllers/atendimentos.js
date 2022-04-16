module.exports = app => {
    app.get("/atendimentos", (req, res) => res.send("Você está na página de atendimentos <3"));

    app.post("/atendimentos", (req, res) => {
        console.log(req.body);
        res.send("Você está na rota de atendimentos.\nEstá realizando um post.");
    });
};