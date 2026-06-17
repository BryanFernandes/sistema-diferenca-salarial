function salvarDados() {
    let dados = {
        nome: document.getElementById("nomeCliente").value,
        dataInicio: document.getElementById("dataInicio").value,
        dataFim: document.getElementById("dataFim").value,
        valorInicial: document.getElementById("valorInicial").value,
        valorBase: document.getElementById("valorBase").value,
        reajustes: obterReajustes()
    }

    localStorage.setItem(
        "dadosSistema", 
        JSON.stringify(dados)
    )

   alert("Dados salvos com sucesso!")

}

function carregarDados() {

    let dadosSalvos = localStorage.getItem("dadosSistema")

    if(!dadosSalvos) {
        return
    }

    let dados = JSON.parse(dadosSalvos)

    document.getElementById("nomeCliente").value = dados.nome

    document.getElementById("dataInicio").value = dados.dataInicio

    document.getElementById("dataFim").value = dados.dataFim

    document.getElementById("valorInicial").value = dados.valorInicial

    document.getElementById("valorBase").value = dados.valorBase

    for(let i = 0; i< dados.reajustes.length; i++) {
        adicionarReajuste()

        let datas = document.querySelectorAll(".dataReajuste")
        let bases = document.querySelectorAll(".salarioBase")
        let pagos = document.querySelectorAll(".salarioPago")

        datas[i].value = dados.reajustes[i].data
        bases[i].value = dados.reajustes[i].base
        pagos[i].value = dados.reajustes[i].pago
    }

}

function limparDados() {

    if(confirm("Deseja realmente apagar os dados pré salvos?")) {
    localStorage.removeItem("dadosSistema")

    location.reload()
    }
}

function salvarRelatorio() {
    let historico = JSON.parse(
        localStorage.getItem("historicoRelatorios")
    ) || []

    let agora = new Date()

    let dataGeracao = 
    agora.toLocaleString("pt-BR")

    let relatorio = {
        id: Date.now(),

        cliente: document.getElementById("nomeCliente").value,

        dataGeracao: dataGeracao,

        dadosFormulario: {
            dataInicio: document.getElementById("dataInicio").value,

            dataFim: 
            document.getElementById("dataFim").value,

            valorInicial: 
            document.getElementById("valorInicial").value,

            valorBase: 
            document.getElementById("valorBase").value,

            reajustes:
            obterReajustes(),

            tabelaGerada:
            document.getElementById("resultado").innerHTML,

            periodoRelatorio: 
            document.getElementById("periodoRelatorio").innerText


        }

    }

     historico.push(relatorio)

     localStorage.setItem(
        "historicoRelatorios",JSON.stringify(historico)
     )

     alert("Relatorio salvo no histórico")

    

}
