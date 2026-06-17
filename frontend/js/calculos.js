function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

function gerarTabela() {
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

atualizarDashboard(totalDiferenca,totalDecimo,totalMeses)
    
}

