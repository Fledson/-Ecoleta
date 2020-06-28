function populateUfs() {
    //SELECIONANDO UM ITEM HTML -> (O SELECT QUE TEM O NAME = 'UF')
    const ufSelect = document.querySelector("select[name = uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome") // BUSCANDO OS ESTADOS --  p.s > adicione um orderBy por nome pra ficar melhor
        .then(res => res.json()) // TRANSFORMA O RESULTADO "RES" EM UM .JSON 
        .then(states => { //FUNÇÃO ANONIMA QUE PASSA COMO PARAMETRO TODOS OS ESTADOS ----> p.s esse parametro "states" esta recebendo os dados de resposta da função anterior que foi transformada em json

            for (const state of states) { //PARA CADA ESTADO(É UMA VARIAVEL QUALQUER) DENTRO DE ESTADOS( OS ESTADOS CONVERTIDOS EM JSON)
                ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>` // ADICIONA MAIS UMA OPTION RECEBENDO O ID E NOME DO ESTADO DA VEZ       
            }

        })

}

populateUfs();

function getCities(event) {
    const citySelect = document.querySelector("[name=city]") //SELECIONANDO O SELECT COM O NOME CITY
    const stateInput = document.querySelector("[name=state]") //SELECIONANDO O SELECT COM O NOME STATE

    const ufValue = event.target.value // CONSTANTE DE ARMAZENA O ID DA UF SELECIONADA

    const indexOfSelectedState = event.target.selectedIndex // ARMAZENA O INDEX DO BOX SELECIONADO [0...26]
    stateInput.value = event.target.options[indexOfSelectedState].text //PEGA O TEXTO DENTRO DO BOX SELECIONADO


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citySelect.innerHTML = '<option value="">Selecione a cidade</option>' //limpa as cidades quando trocar a UF
    citySelect.disabled = true; // Bloqueia novamente o campo antes de entrar e carregar as proximas cidades

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (city of cities) {
                citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false; // torna o campo ativo novamente

        })



}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities); // Aciona um evento quando mudar o valor no select do estado (O primeiro parametro é o gatilho que chama o segundo parametro que é a função)



/*ITEM DE COLETA*/

/*PEGANDO TODOS OS ITEMS DENTRO DO .items-grid li */
const itemsToCollect = document.querySelectorAll(".items-grid li")

/*ESTRUTURA DE REPETIÇÃO PARA ADICIONAR O EVENTO A TODOS OS BOTÕES*/
for (const items of itemsToCollect) {
    items.addEventListener("click", tratarItenSelecionado)
}
const colecaoItens = document.querySelector("input[name=items]") // campo input escodido do formulario que vai receber os itens que selecionei
let itensSelecionados = []

function tratarItenSelecionado(event) {
    const itemLi = event.target

    /*ADICIONAR OU REMOVER CLASSES COM JS*/
    itemLi.classList.toggle("selected") // ClassList.Toggle serve para adicionar ou remover uma classe dentro da tag

    const itemId = itemLi.dataset.id

    // console.log('Item ID: ', itemId)


    /*
        VERIFICAR SE EXISTEM ITENS SELECIONADOS
        SE EXISTIR, PEGAR OS ITENS SELECIONADOS
    */

    const estaSelecionado = itensSelecionados.findIndex(item => { //FindIndex vai percorrer esta função para todo id dentro do array
        const itemEconctrado = item == itemId //ESSA COMPARAÇÃO RETORNAR UM VALOR BOOLEANO
        return itemEconctrado
    })

    /* 
        SE JÁ ESTIVER SELECIONADO, TIRAR DA SELEÇÃO
    */
    if (estaSelecionado >= 0) { // verifica se a variavel "estaSelecionado é maior ou igual a 0", se for maior significa que o item esta dentro do array e precisa ser removido
        const itemsfiltrados = itensSelecionados.filter(item => {
            const itemsfiltrados = item != itemId // verifica se o "item" no index passado é diferente do id, nesse caso deve retornar falso (pois os item se já estiver selecionado vai ser igual )
            return itemsfiltrados //retorna o valor (false)
        })

        itensSelecionados = itemsfiltrados

    } else { //SE NÃO ESTIVER SELECIONADO 
        //ADICIONAR A SELEÇÃO
        itensSelecionados.push(itemId)

    }

    // console.log('itensSelecionados: ', itensSelecionados)


    /*
        ATUALIZAR O CAMPO ESCONDIDO COM O ITEN SELECIONADO
    */

    colecaoItens.value = itensSelecionados

}