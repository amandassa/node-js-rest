const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/database/conexao.js");
const tabelas = require("./infraestrutura/database/tabelas.js");
conexao.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log("conectado com sucesso");
        tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log("servidor rodando na porta 3000"));
    }
});
