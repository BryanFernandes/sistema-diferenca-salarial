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

