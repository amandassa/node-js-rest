const fs = require("fs");
const path = require("path");

module.exports = (caminho, nomeArquivo, callback) => {
    const extensoesValidas = ["jpg", "jpeg", "png"];
    console.log("CAMINHO:", caminho);
    const extensao = path.extname(caminho);
    const novoCaminho = `./assets/imagens/${nomeArquivo}${extensao}`;
    const tipoEhValido = (extensoesValidas.indexOf(extensao.substring(1)) !== -1);   // procura pelo nome da extensão após o ponto
    if (tipoEhValido) {
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on("finish", () => callback(false,novoCaminho));
    } else {
        const err = {erro: "Extensão de arquivo inválida!"};
        console.log("Extensão de arquivo inválida!");
        callback(err);
    }
}