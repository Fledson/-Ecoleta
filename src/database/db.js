// Importando as dependencias do Sqlite3 - (o metodo verbose serve para aparecer mensagens no terminal)
const sqlite3 = require("sqlite3").verbose()

// Criando objeto do banco de dados que vai fazaer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//Exportando o banco de dados para usar em outro local
module.exports = db
    // Usar o objeto do banco de dados nas operações 
    // db.serialize(() => {
    //     // Criar tabelas
    //     db.run(`
    //         CREATE TABLE IF NOT EXISTS places (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             image TEXT,
    //             name TEXT,
    //             address TEXT,
    //             address2 TEXT,
    //             state TEXT,
    //             city TEXT,
    //             items TEXT
    //         );
    //     `)

//     // Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Paperside",
//         "Guilherme Gembala, Jardim América",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err) {
//         // se tiver erro retorna o erro
//         if (err) {
//             return console.log(err)
//         }

//         // Se passar direto retorna as mensagens
//         console.log("Cadastrado com sucesso!")
//         console.log(this)
//     }


//     db.run(query, values, afterInsertData)

//     // Consultar os dados da tabela
//     // db.all(`SELECT name FROM places`, function(err, rows) {
//     //     if (err) {
//     //         return console.log(err);
//     //     }

//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })

//     // Deletar um dado da tabela
//     // db.run(`DELETE FROM places where id = ?`, [2], function(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Registro deletado com sucesso")
//     // })

// })