const conexao = require('./conexao.js');
const executaQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, params, (erros, resultados) => {
            if (erros) {
                reject(erros);
            } else {
                resolve(resultados);
            }
        });
    });
}

module.exports = executaQuery;