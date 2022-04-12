module.exports = app => {
    app.get("/atendimentos", (req, res) => res.send("Você está na página de atendimentos <3"));
};