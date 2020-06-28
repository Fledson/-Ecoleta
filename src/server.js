const express = require("express")
const server = express()

//IMPORTANDO O BANCO DE DADOS
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

// Habilitar o uso do req body
server.use(express.urlencoded({ extended: true }))

//usando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//Configurar os caminhos da aplicação

// Configurando caminho da pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Titulo" })
})

// Configurando caminho da pagina de cadastro de entidade
server.get("/create-point", (req, res) => {
    // req.query: a query de strings da url
    // console.log(req.query)

    return res.render("create-point.html")
})

// Pegando os dados com o post
server.post("/savepoint", (req, res) => {

    // req.body: o corpo do formulario 
    // console.log(req.body)

    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.nome,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        // se tiver erro retorna o erro
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        // Se passar direto retorna as mensagens
        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

// Configurando caminho da pagina de resultados
server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // Pesquisa vazia

        // Mostrar a pagina html com nenhum dado
        return res.render("search-results.html", { total: 0 }) //rows é um objeto
    }

    // pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city like '%${search}%' COLLATE SQL_Latin1_General_CP1_CI_AS`, function(err, rows) {
        if (err) {
            return console.log(err);
        }

        const total = rows.length // length conta os elementos do array

        // Mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total }) //rows é um objeto
    })



})

//Lingando o servidor
server.listen(3000)