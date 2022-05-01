class Tabelas {
    init (conexao) {
        this.conexao = conexao;
        this.criarAtendimento();
        this.criarPets();
    }
    criarAtendimento () {
        const query = "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL DEFAULT '1970-01-01 00:00:00', dataCriacao datetime NOT NULL DEFAULT '1970-01-01 00:00:00', status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))";
        this.conexao.query(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Tabela Atendimentos criada");
            }
        });
    }
    criarPets () {
        const query = "CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, imagem varchar(200), PRIMARY KEY(id))";
        this.conexao.query(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Tabela Pets criada");
            }
        });
    }
}
module.exports = new Tabelas();