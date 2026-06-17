 function atualizarDashboard(
    totalDiferenca,
    totalDecimo,
    totalMeses
){
    document.getElementById("cardDiferenca").innerText =
        moeda(totalDiferenca)

    document.getElementById("cardDecimo").innerText =
        moeda(totalDecimo)

    document.getElementById("cardTotal").innerText =
        moeda(totalDiferenca + totalDecimo)

    document.getElementById("cardMeses").innerText =
        totalMeses
}

 let contador = 0


function adicionarReajuste() {
   
    contador ++

    document.getElementById("reajustes").innerHTML += `<div class= "bloco-reajuste"> 
    <h3> Reajuste ${contador}</h3>
    
    Data: 
    <input type= "month" class= "dataReajuste"> 
    
    Salário Base:
    <input type= "number" class= "salarioBase">
    
    Salário pago: 
    <input type= "number" class= "salarioPago">

     <button onclick="removerReajuste(this)"> Excluir </button>
    </div>`

}

function removerReajuste(botao) { botao.parentElement.remove()

}

function obterReajustes() {
    let datas = document.querySelectorAll(".dataReajuste")
    let bases = document.querySelectorAll(".salarioBase")
    let pagos = document.querySelectorAll(".salarioPago")

    let reajustes = []

    for(let i=0; i< datas.length; i++) {
        reajustes.push({
            data: datas[i].value,
            base: Number(bases[i].value),
            pago: Number(pagos[i].value)
        })
    }

    return reajustes
}

function carregarRelatorio(indice) {
    let historico = JSON.parse(localStorage.getItem("historicoRelatorios")) || []

    let relatorio = historico[indice]

    document.getElementById("nomeCliente").value = relatorio.cliente

    document.getElementById("dataInicio").value = relatorio.dadosFormulario.dataInicio

    document.getElementById("dataFim").value = relatorio.dadosFormulario.dataFim

    document.getElementById("valorInicial").value = relatorio.dadosFormulario.valorInicial

    document.getElementById("valorBase").value = relatorio.dadosFormulario.valorBase

    document.getElementById("reajustes").innerHTML = ""

    contador = 0

    for(
        let i= 0; i < relatorio.dadosFormulario.reajustes.length; i++
    ) {
        adicionarReajuste()

        let datas = document.querySelectorAll(".dataReajuste")

        let bases = document.querySelectorAll(".salarioBase")

        let pagos = document.querySelectorAll(".salarioPago")

        datas[i].value = relatorio.dadosFormulario.reajustes[i].data

        bases[i].value = relatorio.dadosFormulario.reajustes[i].base
        pagos[i].value = relatorio.dadosFormulario.reajustes[i].pago
    }

    document.getElementById("resultado").innerHTML = relatorio.dadosFormulario.tabelaGerada

    document.getElementById("periodoRelatorio").innerText = relatorio.dadosFormulario.periodoRelatorio

    document.getElementById("")

     gerarTabela()
}

function excluirRelatorio(indice) {
    if(!confirm(
        "Deseja realmente excluir este relatório?"
    )) {
        return
    }

    let historico = JSON.parse(localStorage.getItem("historicoRelatorios")) || []

    historico.splice(indice,1)

    localStorage.setItem("historicoRelatorios", JSON.stringify(historico))

    mostrarHistorico()

}