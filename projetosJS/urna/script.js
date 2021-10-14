let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    
    let numeroHtml = '';
        numero ='';
        votoBranco = false;

        for(let i=0;i<etapa.numeros;i++) {
            if(i === 0) {
                numeroHtml += '<div class="numero pisca"></div>';
            } else {
                numeroHtml += '<div class="numero"></div>';
            }
        }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
   
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    
console.log ("Candidato", candidato);
    if(candidato.length > 0) {
        candidato = candidato;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        console.log(candidato[0].nome);
        descricao.innerHTML = 'Nome:'+ candidato[0].nome +'<br/>Partido: '+candidato[0].partido;
        
        let fotosHtml = '';
        for(let i in candidato[0].fotos) {

            if(candidato[i].small){
                fotosHtml += '<div class="d-1-image small"><img src="imagens/' + candidato[0].fotos[i].url + '" alt="" />' + candidato[0].fotos[i].legenda + '</div>';
            }else{
    
            fotosHtml += '<div class="d-1-image"><img src="imagens/' + candidato[0].fotos[i].url + '" alt="" />' + candidato[0].fotos[i].legenda + '</div>';
            }
        }
        console.log(fotosHtml);

        lateral.innerHTML = fotosHtml;
    }else {
        seuVotoPara.style.display = 'block';
        aviso.style.display ='block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }

}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        //numero = '${numero}${n}';
        numero += elNumero.textContent;
        

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        
        } else {
                console.log(numero,'digitado');
            atualizaInterface();

        }
    }
}
function branco () {
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
}

function corrige(n) {
    comecarEtapa();
}

function confirma(n) {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = true;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante"> FIM!</div>';
            console.log(votos);    
        }
    }
}

comecarEtapa();
