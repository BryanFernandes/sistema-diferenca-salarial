function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

function gerarMeses() {
    var nome = document.getElementById("nomeCliente").value
    var DataInicio = document.getElementById("dataInicio").value
    var DataFim = document.getElementById("dataFim").value 
    let ValorBase = Number(document.getElementById("valorBase").value)
    let ValorInicial = Number(document.getElementById("valorInicial").value)
    var res = document.getElementById("resultado")
    
    res.innerHTML = ""

    if(!DataInicio || !DataFim) {
        alert("Preencha as datas de início e término de contrato") 
        return
    }

    if(DataFim < DataInicio){
        alert("A data final deve ser posterior à inicial")
        return 
    }

    if(ValorBase<=0 || ValorInicial <=0) {
        alert("Os salários devem ser maiores que zero")
        return 
    }

    let reajustes= obterReajustes()

    reajustes.sort((a,b) => a.data.localeCompare(b.data))

    let partesInicio = DataInicio.split("-")
    let partesFim = DataFim.split("-")

    let ano = Number(partesInicio[0])
    let mes = Number(partesInicio[1])

    let anoFim = Number(partesFim[0])
    let mesFim = Number(partesFim[1])

    let mesesNoAno = 0
    let totalDiferenca = 0
    let totalDecimo = 0
    let totalMeses = 0

    while(ano < anoFim || (ano === anoFim && mes <= mesFim)) {

        totalMeses++

        let dataAtual = `${ano}-${String(mes).padStart(2,"0")}`

        let baseAtual = ValorBase
        let pagoAtual = ValorInicial

        for(let i = 0; i < reajustes.length; i++) {
            if(dataAtual >= reajustes[i].data) {
                baseAtual = reajustes[i].base
                pagoAtual = reajustes[i].pago
            }

            
        }

        let diferenca = baseAtual - pagoAtual

        mesesNoAno++

        let decimo = 0

            if(mes=== 12) {
                decimo = diferenca * (mesesNoAno / 12)

                mesesNoAno = 0
            }

            totalDiferenca += diferenca
        totalDecimo += decimo


        res.innerHTML += `
        <tr>
            <td> ${mes}/${ano}</td>
            <td> ${moeda(baseAtual)}</td>
            <td> ${moeda(pagoAtual)}</td>
            <td> ${moeda(decimo)}</td>
            <td> ${moeda(diferenca)}</td>
            <td> ${moeda(decimo + diferenca)}</td>
            </tr>
            `

        mes++

        if(mes>12) {
            mes = 1
            ano++
        }
    }

    res.innerHTML += `
<tr>
    <td><strong>TOTAL</strong></td>
    <td>-</td>
    <td>-</td>
    <td><strong> ${moeda(totalDecimo)}</strong></td>
    <td><strong> ${moeda(totalDiferenca)}</strong></td>
    <td><strong> ${(moeda(totalDecimo + totalDiferenca))}</strong></td>
</tr>
`

document.getElementById("periodoRelatorio").innerText = ` Funcionário: ${nome}

Período: ${DataInicio} até ${DataFim}`

document.getElementById("cardDiferenca").innerText = moeda(totalDiferenca)

document.getElementById("cardDecimo").innerText = moeda(totalDecimo)

document.getElementById("cardTotal").innerText = moeda(totalDiferenca + totalDecimo)

document.getElementById("cardMeses").innerText = totalMeses
    
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

window.onload = carregarDados

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

function mostrarHistorico () {

    let historico = JSON.parse(
        localStorage.getItem("historicoRelatorios")
    ) || []

    let divHistorico = document.getElementById("historico")

    divHistorico.innerHTML = ""

    if(historico.length === 0) {
        divHistorico.innerHTML = "<p> Nenhum relatório salvo. </p>"
        return
    }

    for(let i= 0; i < historico.length; i++) {

        divHistorico.innerHTML += `
        <div class= "itemHistorico">
        
        <h3> ${historico[i].cliente} </h3>
        
        <p>
             ${historico[i].dataGeracao}
        </p>

        <button onclick="carregarRelatorio(${i})"> Carregar </button>

        <button onclick= "excluirRelatorio(${i})"> Excluir </button>
        
        </div>
        `

    }

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

     gerarMeses()
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