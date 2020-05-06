particlesJS.load('particles-js', './assets/js/particles.json', 
    function() {
    console.log('particles.json config loaded...');
});

// .........................................................
function pegaCatetoOposto(){
    let catetoOposto = document.querySelector("#cat_op");
    return catetoOposto;
}
function pegaCatetoAdjacente(){
    let catetoAdjacente = document.querySelector("#cat_adj");
    return catetoAdjacente;
}

let cateto = 0;
function focoCatetoOposto() {
    cateto = 1
    pegaCatetoOposto().focus();
}
function focoCatetoAdjacente() {
    cateto = 2
    pegaCatetoAdjacente().focus();
}

function digitar(num){
    let campoSelecionado;
    if(cateto == 1){
        campoSelecionado = pegaCatetoOposto();
        let valorCatetoOposto = campoSelecionado.value;
        campoSelecionado.value = valorCatetoOposto +  String(num);
    }else if(cateto == 2){
        campoSelecionado = pegaCatetoAdjacente();
        let valorCatetoAdjacente = campoSelecionado.value;
        campoSelecionado.value = valorCatetoAdjacente +  String(num);
    }

    calculaQuadrado();

    calculaHip()
}

function apagaCampo(){
    if(cateto == 1){
        var campoSelecionado = pegaCatetoOposto();
        valorCatetoOposto = campoSelecionado.value;
        
        campoSelecionado.value = "";
        focoCatetoOposto();

        catOpostoQuadrado = document.querySelector("#coQuadrado");
        catOpostoQuadrado.textContent ="";
    }else if (cateto == 2){
        var campoSelecionado = pegaCatetoAdjacente();
        valorCatetoAdjacente = campoSelecionado.value;
        
        campoSelecionado.value = "";
        focoCatetoAdjacente();

        catAdjQuadrado = document.querySelector("#caQuadrado");
        catAdjQuadrado.textContent ="";
    }

    calculaHip()
}

function calculaQuadrado(){
    if(cateto == 1){
        let catOpostoQuadrado = document.querySelector("#coQuadrado");
        catOpostoQuadrado.textContent = Math.pow((pegaCatetoOposto().value), 2);
    }else if(cateto == 2){
        let catAdjQuadrado = document.querySelector("#caQuadrado");
        catAdjQuadrado.textContent = Math.pow((pegaCatetoAdjacente().value), 2);
    }
}

function consultaAPI(cat_op, cat_adj){
    let url = 'https://atlas-231814.appspot.com/calcula';

    let dados = {
        cat_op,    
        cat_adj
    }

    let dadosJson = JSON.stringify(dados)

    const config = {
        method:'POST',
        headers:{
                    'Content-Type': 'application/json'
                },
        body: dadosJson
    }

    fetch(url, config)
                    .then(resposta => {
                            return resposta.json()
                    }).then(respostaJson => {
                        hipotenusa = respostaJson.hip;
                        let hipotenusaResultado = document.querySelector("#resultadoAPI");
                        hipotenusa = parseFloat(hipotenusa.toFixed(9));
                        hipotenusaResultado.textContent = hipotenusa;
                    })
}

function calculaHip(){
    let cat_op = pegaCatetoOposto().value;
    let cat_adj = pegaCatetoAdjacente().value;

    if(cat_op != 0 && cat_adj != 0){
        cat_op = parseInt(cat_op);
        cat_adj = parseInt(cat_adj);
        consultaAPI(cat_op, cat_adj); 
    } else {
        let hipotenusaResultado = document.querySelector("#resultadoAPI");
        hipotenusaResultado.textContent = "";
    }
}

// function atualiza() {
//     let campoResultado = document.querySelector("#resultadoAPI");
//     campoResultado.value = calculaHip();

//     if (pegaCatetoOposto().value == "" && pegaCatetoAdjacente().value == "") {
//         campoResultado.value = "";
//     }else {
//         campoResultado.value = calculaHip();
//     }
// }