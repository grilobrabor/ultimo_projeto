function testar() {
    let contElsa = 0;
    let contKristoff = 0;
    let contOlaf = 0;
    let contAnna = 0;
    let todasRespondidas = true;

    let radios = document.querySelectorAll('input[type="radio"]');

    
    for (let i = 0; i < radios.length; i++) {
        let questionName = radios[i].name;
        let questionRadios = document.getElementsByName(questionName);
        
        let questionAnswered = false;
        for (let j = 0; j < questionRadios.length; j++) {
            if (questionRadios[j].checked) {
                questionAnswered = true;
                break;
            }
        }
        
        if (!questionAnswered && questionName !== "desempate") {
            todasRespondidas = false;
            break;
        }
    }

    if (todasRespondidas) {
        
        radios.forEach(e => {
            if (e.checked) {
                if (e.value == "Elsa") {
                    contElsa++;
                } else if (e.value == "Kristoff") {
                    contKristoff++;
                } else if (e.value == "Olaf") {
                    contOlaf++;
                } else if (e.value == "Anna") {
                    contAnna++;
                }
            }
        });

        let totalRespostas = contElsa + contKristoff + contOlaf + contAnna;

        let porcentagemElsa = (contElsa / totalRespostas) * 100;
        let porcentagemKristoff = (contKristoff / totalRespostas) * 100;
        let porcentagemOlaf = (contOlaf / totalRespostas) * 100;
        let porcentagemAnna = (contAnna / totalRespostas) * 100;

        let resultados = [
            { nome: 'Elsa', respostas: contElsa, porcentagem: porcentagemElsa },
            { nome: 'Kristoff', respostas: contKristoff, porcentagem: porcentagemKristoff },
            { nome: 'Olaf', respostas: contOlaf, porcentagem: porcentagemOlaf },
            { nome: 'Anna', respostas: contAnna, porcentagem: porcentagemAnna }
        ];

        
        resultados.sort((a, b) => b.respostas - a.respostas);

        let empate = resultados[0].respostas === resultados[1].respostas;

        if (empate) {
            document.getElementById("desempate").style.display = "block"; 

           
            let personagensEmpatados = [];
            if (resultados[0].respostas === contElsa) personagensEmpatados.push("Elsa");
            if (resultados[0].respostas === contKristoff) personagensEmpatados.push("Kristoff");
            if (resultados[0].respostas === contOlaf) personagensEmpatados.push("Olaf");
            if (resultados[0].respostas === contAnna) personagensEmpatados.push("Anna");

            let todasAsPerguntas = document.querySelectorAll('h2');
            todasAsPerguntas.forEach(pergunta => {
                let nomePersonagem = pergunta.innerHTML.match(/Elsa|Kristoff|Olaf|Anna/);
                if (nomePersonagem && !personagensEmpatados.includes(nomePersonagem[0])) {
               
                    let perguntaElement = pergunta.closest('.pergunta');
                    if (perguntaElement) {
                        perguntaElement.style.display = 'none';
                    }
                }
            });

          
            let radiosDesempate = document.querySelectorAll('input[name="desempate"]');
            let desempateRespondido = false;

            for (let i = 0; i < radiosDesempate.length; i++) {
                if (radiosDesempate[i].checked) {
                    desempateRespondido = true;
                    break;
                }
            }

            if (desempateRespondido) {
              
                let resultadoDesempate = document.querySelector('input[name="desempate"]:checked').value;

                if (resultadoDesempate === "Elsa") {
                    contElsa++;
                } else if (resultadoDesempate === "Kristoff") {
                    contKristoff++;
                } else if (resultadoDesempate === "Olaf") {
                    contOlaf++;
                } else if (resultadoDesempate === "Anna") {
                    contAnna++;
                }

                totalRespostas = contElsa + contKristoff + contOlaf + contAnna;

                porcentagemElsa = (contElsa / totalRespostas) * 100;
                porcentagemKristoff = (contKristoff / totalRespostas) * 100;
                porcentagemOlaf = (contOlaf / totalRespostas) * 100;
                porcentagemAnna = (contAnna / totalRespostas) * 100;

                resultados = [
                    { nome: 'Elsa', respostas: contElsa, porcentagem: porcentagemElsa },
                    { nome: 'Kristoff', respostas: contKristoff, porcentagem: porcentagemKristoff },
                    { nome: 'Olaf', respostas: contOlaf, porcentagem: porcentagemOlaf },
                    { nome: 'Anna', respostas: contAnna, porcentagem: porcentagemAnna }
                ];

                resultados.sort((a, b) => b.respostas - a.respostas);

                let vencedor = resultados[0].nome;
                let porcentagemVencedor = resultados[0].porcentagem.toFixed(2);
                document.getElementById("resultado").innerHTML = `O vencedor é: ${vencedor} com ${porcentagemVencedor}% das respostas!`;

                setTimeout(() => {
                    window.location.href = `${vencedor}.html`;
                }, 5000);

            } else {
                alert("Responda a questão de desempate para continuar.");
            }

        } else {
        
            let vencedor = resultados[0].nome;
            let porcentagemVencedor = resultados[0].porcentagem.toFixed(2);
            document.getElementById("resultado").innerHTML = `O vencedor é: ${vencedor} com ${porcentagemVencedor}% das respostas!`;

            setTimeout(() => {
                window.location.href = `${vencedor}.html`;
            }, 5000);
        }

    } else {
        alert("Por favor, responda todas as questões antes de continuar.");
    }
}
