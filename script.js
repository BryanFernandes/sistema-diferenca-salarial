function gerarMeses() {
    var DataInicio = document.getElementById("dataInicio").value
    var DataFim = document.getElementById("dataFim").value 
    let ValorBase = Number(document.getElementById("valorBase").value)
    let ValorInicial = Number(document.getElementById("valorInicial").value)
    var res = document.getElementById("resultado")
    
    res.innerHTML = ""

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

    while(ano < anoFim || (ano === anoFim && mes <= mesFim)) {

        
        
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
            <td> R$ ${baseAtual.toFixed(2)}</td>
            <td> R$ ${pagoAtual.toFixed(2)}</td>
            <td> R$ ${decimo.toFixed(2)}</td>
            <td> R$ ${diferenca.toFixed(2)}</td>
            <td> R$ ${(decimo + diferenca).toFixed(2)}
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
    <td><strong>R$ ${totalDecimo.toFixed(2)}</strong></td>
    <td><strong>R$ ${totalDiferenca.toFixed(2)}</strong></td>
    <td><strong>R$ ${(totalDecimo+totalDiferenca).toFixed(2)}</strong></td>
</tr>
`

document.getElementById("periodoRelatorio").innerText = `Período: ${DataInicio} até ${DataFim}`
    
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
    </div>`

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

