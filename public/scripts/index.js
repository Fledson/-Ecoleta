const botaoPesquisa = document.querySelector("#page-home main a") //Buscando no #pagehome pelo dentro do "main" o "a"
const modal = document.querySelector("#modal") //Buscando pelo modal dentro do index
const fechar = document.querySelector("#modal .header a")


// adicionando um ouvidor de eventos no botão, para mostrar a tela de pesquisa de pontos de coleta
botaoPesquisa.addEventListener("click", () => {
    modal.classList.remove("hide") //acessando a classe list e removendo a classe "HIDE" para que a tela apareça quando o botão for clicado

})

// Evento para fechar a tela de pesquisa de cidade no "X"
fechar.addEventListener("click", () => {
    modal.classList.add("hide")
})