let larguraUtil = parseInt(window.innerWidth);
let alturaUtil = parseInt(window.innerHeight);
while (larguraUtil%20 !=0)
    {
        larguraUtil++
    };
    while (alturaUtil%20 !=0)
        {
            alturaUtil++
        };
        let indice = 0;
        let posicaoX = 8000/2 -20;
        let posicaoY = 6000/2 -20;
        let posicao_tabuleiroX = -8000/2 + larguraUtil/2;
        let posicao_tabuleiroY = -6000/2 + alturaUtil/2;
        let ultima_tecla = "";
        let ultimo_movimento = "";
        let lista = [[posicaoX,posicaoY]];
        let lista_maca = [];
        const inimigos = {};
        const qtd_macas = 30;
        let pontos = 0;
        const pontuacao = document.getElementById('pontos');
        pontuacao.innerHTML= `Pontos: ${pontos}`;
        const cabeca_cobrinha = document.getElementById('cabeca_cobra');
        cabeca_cobrinha.style.left = `${posicaoX}px`;
        cabeca_cobrinha.style.top = `${posicaoY}px`;
        const container_jogo = document.getElementById('container_jogo');
        container_jogo.style.left = `-${posicao_tabuleiroX}px`;
        container_jogo.style.top = `-${posicao_tabuleiroY}px`;
        let cor_cobra = document.getElementById('inputCor').value
        let tempo_cor_cobra = 0;
        let jogando = false;
        document.addEventListener('keydown', clicar); //evento do click na tecla
        criar_inimigos();
        let score = 0;
        let cor_aleatoria = false;
        const texto_score = document.getElementById('score');
        function iniciar_jogo()
        {
            if (jogando == false)
                {
                    //zerando variaveis, inimigos, telas de inicio e pontuacao
                    
                    larguraUtil = parseInt(window.innerWidth);
            alturaUtil = parseInt(window.innerHeight);
            while (larguraUtil%20 !=0)
            {
                larguraUtil++
            };
            while (alturaUtil%20 !=0)
            {
                alturaUtil++
            };
            posicao_tabuleiroX = -8000/2 + larguraUtil/2;
            posicao_tabuleiroY = -6000/2 + alturaUtil/2;

            const macasAntigas = document.querySelectorAll('.maca_jogo');
            macasAntigas.forEach(maca => maca.remove());
            lista_maca = [];
            posicionar_maca();
            posicaoX = 8000/2  -20;
            posicaoY = 6000/2  -20;
            posicao_tabuleiroX = 8000/2 - larguraUtil/2;
            posicao_tabuleiroY = 6000/2 - alturaUtil/2;
            ultima_tecla = ""
            ultimo_movimento = ""
            lista = [[posicaoX,posicaoY]];
            pontos = 0;  
            container_jogo.style.left = `-${posicao_tabuleiroX}px`;
            container_jogo.style.top = `-${posicao_tabuleiroY}px`;
            const div_tela_jogo = document.getElementById('tela_jogo');
            div_tela_jogo.style.display = "block";
            container_jogo.style.display = "block";
            pontuacao.innerHTML = `Pontos: ${pontos}`;
            cabeca_cobrinha.style.display = "block";
            const div_tela_inicio = document.getElementById('tela_inicio');
            div_tela_inicio.style.display = "none";
            
            const botao_play = document.getElementById('imagem_play');
            botao_play.style.display= "none";
            resetar_posicao_inimigos();
            cor_cobra = document.getElementById('inputCor').value
            //tive que usar o parseInt para converter os numeros de hexadecimal para decimal
            if (cor_cobra == '#000000' || parseInt(document.getElementById('inputCor').value[1],16)<2 && parseInt(document.getElementById('inputCor').value[3],16)<2
        && parseInt(document.getElementById('inputCor').value[5],16)<2)
            {
                container_jogo.style.background = 'white';
                pontuacao.style.color = 'black';
            }
            else
            {
                container_jogo.style.background = 'black';
                pontuacao.style.color = 'white';
            }
            if (cor_cobra == '#ffffff')
            {
                cor_aleatoria = true;
            }
            else
            {
                cor_aleatoria = false;
            }
            jogando = true;
    };
};

function crescer_cobrinha()
{
    const corposAntigos = document.querySelectorAll('.corpo_cobra');
    corposAntigos.forEach(corpo => corpo.remove());
    cabeca_cobrinha.style.left = `${posicaoX}px`;
    cabeca_cobrinha.style.top = `${posicaoY}px`;
    let espacador = 0
    for (let[x,y] of lista){
        if (espacador == 0 || cor_cobra != "#000000")
            {
            
            let corpo_cobrinha = document.createElement('div');
            corpo_cobrinha.classList.add("corpo_cobra");
            corpo_cobrinha.style.left = `${x}px`;
            corpo_cobrinha.style.top = `${y}px`;
            if (cor_aleatoria)
            {
                let c1 = Math.floor(Math.random() * 256);
                let c2 = Math.floor(Math.random() * 256);
                let c3 = Math.floor(Math.random() * 256);
                corpo_cobrinha.style.background = `rgb(${c1},${c2},${c3})`;
            }
            else
            {
                corpo_cobrinha.style.background = cor_cobra;
            }
            container_jogo.appendChild(corpo_cobrinha);
            if (cor_cobra == "red")
            {
                tempo_cor_cobra++;
                corpo_cobrinha.style.boxShadow = "0px 0px 15px 10px rgba(255, 0, 0, 0.17)";
                if (tempo_cor_cobra >=250){
                    cor_cobra = document.getElementById('inputCor').value
                    tempo_cor_cobra = 0;
                }
            };
            }
            espacador+=1;
            if (espacador>pontos || espacador>50)
                {
                    espacador = 0;
                }
            };
}


function posicionar_maca()
{
    for (indice=0;indice<qtd_macas;indice++){
        //o Xmaca deve ser > posicaoX - larguraUtil/2 e < posicaoX + LarguraUtil/2
        //maximoX = posicaoX + larguraUtil/2;
        let minimoX = posicaoX - larguraUtil/2;
        Xmaca = Math.floor(minimoX/20) * 20;
        Xmaca += Math.floor(Math.random() * (larguraUtil)/20) * 20; //divide por 20 e arredonda e depois multiplica por 20 para ser múltiplo de 20
    //o Ymaca deve ser > posicaoY - alturaUtil/2 e < posicaoY + alturaUtil/2
    let minimoY = posicaoY - alturaUtil/2;
        Ymaca = Math.floor(minimoY/20) * 20;
        Ymaca += Math.floor(Math.random() * (alturaUtil)/20) * 20;
    let maca = document.createElement('div');
    maca.dataset.index = indice;
    lista_maca.push([Xmaca,Ymaca,indice]); //adicionar posicoes da maca na lista
    let cor1 = Math.floor(Math.random() * 256);
    let cor2 = Math.floor(Math.random() * 256);
    let cor3 = Math.floor(Math.random() * 256);
    maca.classList.add('maca_jogo');
    maca.style.background = `rgb(${cor1}, ${cor2}, ${cor3})`;
    maca.style.left = `${Xmaca}px`;
    maca.style.top = `${Ymaca}px`;
    let tamanho_maca = Math.floor(Math.random() *2)*5 + 10;
    maca.style.width = `${tamanho_maca}px`;
    maca.style.height = `${tamanho_maca}px`;
    maca.style.boxShadow = `0px 0px 45px 15px rgba(${cor1},${cor2},${cor3},0.614)`;

    container_jogo.appendChild(maca);
    };
}


// funcao para pegar as teclas clicadas
function mover_cobra(tecla)
{
    //possibilitando  o movimento com W,A,S,D
    if (tecla === 'KeyW'){tecla = 'ArrowUp'};
    if (tecla === 'KeyA'){tecla = 'ArrowLeft'};
    if (tecla === 'KeyS'){tecla = 'ArrowDown'};
    if (tecla === 'KeyD'){tecla = 'ArrowRight'};

    //impedindo a cobra voltar para trás passando por cima dela mesma
    if (tecla === 'ArrowLeft' && ultimo_movimento === 'ArrowRight' ||
    tecla === 'ArrowRight' && ultimo_movimento === 'ArrowLeft' ||
    tecla === 'ArrowUp' && ultimo_movimento === 'ArrowDown' ||
    tecla === 'ArrowDown' && ultimo_movimento === 'ArrowUp')
    {
        tecla = ultimo_movimento;
    };

    //verificando se clicou uma tecla errada
    if (tecla != 'ArrowLeft' && tecla != 'ArrowRight' && 
    tecla != 'ArrowUp' && tecla != 'ArrowDown')
    {
        tecla = ultimo_movimento;
    };
    
   // if (tecla === 'ArrowLeft' && posicaoX-5 >=0) {
    if (tecla === 'ArrowLeft') {
        if (posicaoY%20 == 0)
        {
            posicaoX -=5
            posicao_tabuleiroX -=5;
            ultimo_movimento = 'ArrowLeft';
        }
        else{
            if (ultimo_movimento == 'ArrowUp')
                {
                    posicaoY-=5;
                    posicao_tabuleiroY-=5;
                } 
            else{ 
                posicaoY +=5;
                posicao_tabuleiroY +=5;
            }
            };
    };
    //if (tecla === 'ArrowRight' && posicaoX+5 <= 800-20) {
    if (tecla === 'ArrowRight') {
        if (posicaoY%20 == 0)
        {
            posicaoX +=5;
            posicao_tabuleiroX += 5;
            ultimo_movimento = 'ArrowRight';
        }
        else{
            if (ultimo_movimento == 'ArrowUp')
                {
                    posicaoY-=5;
                    posicao_tabuleiroY -= 5;
                } 
            else{ 
                posicaoY +=5;
                posicao_tabuleiroY += 5;
        }
        };
    };
  //  if (tecla === 'ArrowUp' && posicaoY - 5 >= 0) {
    if (tecla === 'ArrowUp') {
        if (posicaoX%20 == 0)
        {
            posicaoY -=5;
            posicao_tabuleiroY -= 5;
            ultimo_movimento = 'ArrowUp';
        }
        else{
            if (ultimo_movimento == 'ArrowLeft')
                {
                    posicaoX-=5;
                    posicao_tabuleiroX -= 5;
                } 
            else{ 
                posicaoX +=5;
                posicao_tabuleiroX += 5;
            
            }
        };
    };
    //if (tecla === 'ArrowDown' && posicaoY + 5 <= 600-20) {
    if (tecla === 'ArrowDown') {
        if (posicaoX%20 == 0)
        {
            posicaoY +=5;
            posicao_tabuleiroY += 5;    
            ultimo_movimento = 'ArrowDown';
        }
        else{
            if (ultimo_movimento == 'ArrowLeft')
                {
                    posicaoX-=5;
                    posicao_tabuleiroX-= 5;
                } 
            else{ 
                posicaoX +=5;
                posicao_tabuleiroX += 5;
            }
        };
    };
    

    //verifica o indice da maca que foi acertada e muda ela de posicao
    for (let [c,d,e] of lista_maca)
    {
        if (c==posicaoX && d==posicaoY)
        {
            pontos++;
            pontuacao.innerHTML=`Pontos: ${pontos}`;
            let maca_colidida = document.querySelector(`.maca_jogo[data-index="${e}"]`);
            let novo_x_maca =Math.floor(Math.random() * 20) * 20;
            let novo_y_maca =Math.floor(Math.random() * 15) * 20;
            let sorteadorA = Math.floor(Math.random() * 10);
            let sorteadorB = Math.floor(Math.random() * 10);
            if (sorteadorA%2 == 0)
                {
                    novo_x_maca = novo_x_maca * (-1);
                };
            if (sorteadorB%2 == 0)
            {
                novo_y_maca = novo_y_maca * (-1);
            };
            maca_colidida.style.top = `${novo_y_maca + posicaoY}px`;
            maca_colidida.style.left = `${novo_x_maca + posicaoX}px`;
            lista_maca[e]= [novo_x_maca+posicaoX,novo_y_maca+posicaoY,e]; //e + 1 porque a lista_maca já inicia com a posicao da primeira maca
            //apenas estética 
            let cor1 = Math.floor(Math.random() * 256);
            let cor2 = Math.floor(Math.random() * 256);
            let cor3 = Math.floor(Math.random() * 256);
            maca_colidida.style.background = `rgb(${cor1}, ${cor2}, ${cor3})`;
            maca_colidida.style.boxShadow = `0px 0px 45px 15px rgba(${cor1},${cor2},${cor3},0.614)`;
        };
    };

    //define o tamanho do corpo da cobra
    if (lista[lista.length-1][0] != posicaoX || lista[lista.length-1][1] != posicaoY)
    {
        lista.push([posicaoX,posicaoY]);
        if (lista.length > 4*pontos+6)
        {
            let diminuidor = lista.length;
            lista.splice(0, diminuidor - 4*pontos - 6);
        }
    }

    //aumenta o score
    if (pontos>score)
    {
        score = pontos
    };


    //verifica se a cobra toca nela mesma, somente no modo de jogo normal
    if (!cor_aleatoria && cor_cobra != '#000000' && cor_cobra != 'red')
    {
    for (let [a,b] of lista.slice(0, lista.length-1))
    {
        if (a==posicaoX && b==posicaoY)
        {
            pontuacao.innerHTML= `Pontos: ${pontos}`;
            jogando = false;
            tela_inicio();
        };
    };
    }

        //mover tabuleiro do jogo, poderia usar -1*posicaoX e -1*posicaoY
    container_jogo.style.left = `-${posicao_tabuleiroX}px`;
    container_jogo.style.top = `-${posicao_tabuleiroY}px`;
    if (posicaoX<0 || posicaoY<0 || posicaoX>8000-20 || posicaoY >6000-20)
    {
        jogando = false;
        tela_inicio();
    }
    reposicionar_maca();
    crescer_cobrinha();
    mover_inimigos();
};

function reposicionar_maca()
{
        for (let [c,d,e] of lista_maca)
    {
        let minimoX = posicaoX - larguraUtil - 50;
        let minimoY = posicaoY - alturaUtil - 50;
        let maximoX = posicaoX + larguraUtil +50;
        let maximoY = posicaoY + alturaUtil +50;
        if (c<minimoX || c>maximoX || d<minimoY || d>maximoY)
        {
            let maca_colidida = document.querySelector(`.maca_jogo[data-index="${e}"]`);
            let novo_x_maca =Math.floor(Math.random() * larguraUtil/20) * 40;
            let novo_y_maca =Math.floor(Math.random() * alturaUtil/20) * 40;
            let sorteadorA = Math.floor(Math.random() * 10);
            let sorteadorB = Math.floor(Math.random() * 10);
            if (sorteadorA%2 == 0)
                {
                    novo_x_maca = novo_x_maca * (-1);
                };
            if (sorteadorB%2 == 0)
            {
                novo_y_maca = novo_y_maca * (-1);
            };
            //aproximando valores para a maca nascer exatamente onde a cobrinha pode passar
            let posicionamentoX = Math.floor(posicaoX/20)*20;
            let posicionamentoY = Math.floor(posicaoY/20)*20;
            maca_colidida.style.top = `${novo_y_maca + posicionamentoY}px`;
            maca_colidida.style.left = `${novo_x_maca + posicionamentoX}px`;
            lista_maca[e]= [novo_x_maca+posicionamentoX,novo_y_maca+posicionamentoY,e]; //e + 1 porque a lista_maca já inicia com a posicao da primeira maca
            //apenas estética 
            let cor1 = Math.floor(Math.random() * 256);
            let cor2 = Math.floor(Math.random() * 256);
            let cor3 = Math.floor(Math.random() * 256);
            maca_colidida.style.background = `rgb(${cor1}, ${cor2}, ${cor3})`;
            maca_colidida.style.boxShadow = `0px 0px 45px 15px rgba(${cor1},${cor2},${cor3},0.614)`;
        };
    };
};

function clicar(evento)
{
    if (jogando == false)
    {
        if (evento.code == "Enter" || evento.code == "Space")
        {
            iniciar_jogo()
        }
    }
    else (ultima_tecla != evento.code)
    {
        ultima_tecla = evento.code;  
    };
}

function criar_inimigos()
{
    for (let n = 0; n < 10; n++)
        {
            let inimigoX = Math.floor(Math.random() * 400) * 20;
            let inimigoY = Math.floor(Math.random() * 300) * 20;
            inimigos[`inimigo${n}`] = [[inimigoX,inimigoY]];
            let corpo_inimigo = document.createElement('div');
            corpo_inimigo.classList.add(`corpo_inimigo${n}`);
            corpo_inimigo.dataset.index = n;
            corpo_inimigo.style.left = `${inimigoX}px`;
            corpo_inimigo.style.top = `${inimigoY}px`;
            container_jogo.appendChild(corpo_inimigo);   
        }
    }

function resetar_posicao_inimigos()
{
    for (let n = 0; n < 10; n++)
    {
        let inimigoX = Math.floor(Math.random() * 400) * 20;
        let inimigoY = Math.floor(Math.random() * 300) * 20;
        inimigos[`inimigo${n}`] = [[inimigoX,inimigoY]];
        let corpo_inimigo = document.querySelector(`.corpo_inimigo${n}[data-index="${n}"]`);
        corpo_inimigo.style.left = `${inimigoX}px`;
        corpo_inimigo.style.top = `${inimigoY}px`;
    };
};

function mover_inimigos()
{
    for (let n = 0; n < 10; n++)
    {
        const corpoAntigoInimigo = document.querySelector(`.corpo_inimigo${n}`);
        let inimigoX = parseInt(corpoAntigoInimigo.style.left);
        let inimigoY = parseInt(corpoAntigoInimigo.style.top);
        if (inimigoX != posicaoX -20) // o -10 e -20 deixa a tesoura centralizada
        {
            if (inimigoX - posicaoX >0 -20)
                {inimigoX-=1;}
            else{inimigoX+=1;}
            }
        if (inimigoY != posicaoY -10)
            {
                if (inimigoY - posicaoY >0 -10)
                    {inimigoY-=1;}
                else{inimigoY+=1;}
            };
        corpoAntigoInimigo.style.left = `${inimigoX}px`;
        corpoAntigoInimigo.style.top = `${inimigoY}px`;
        let contador = 0; //contador é = indice da lista onde a tesoura encostou
        while (contador<lista.length)
            {
                let a = lista[contador][0];
                let b = lista[contador][1];
                if (a - inimigoX >=-20 && a - inimigoX <=35 //-20 para x e -10 para y por causa do alinhamento da tesoura na div
                    && b - inimigoY >=-10 && b - inimigoY <=50)
                    {
                        if (pontos ==0 && !cor_aleatoria && cor_cobra != '#000000')
                        {
                            jogando = false;
                            tela_inicio();
                            break
                        }
                        let qtd_loop_geradas = 0
                        for (let e of lista.slice(0,parseInt((lista.length-6)/4 - contador/4))) //gerar macas apos cortar cobra
                        {
                            if (e[0]%20 == 0 && e[1]%20 ==0 && pontos > 0 )
                                {
                                    let indice_maca = Math.floor(Math.random() * qtd_macas);
                                    let x_maca_nova = e[0];
                                    let y_maca_nova = e[1];
                                    let lista_soma_posicao_maca = [-20,0,20]
                                    let indice_nova_posicaoX =  Math.floor(Math.random()*3);
                                    let indice_nova_posicaoY =  Math.floor(Math.random()*3);
                                    x_maca_nova += lista_soma_posicao_maca[indice_nova_posicaoX];
                                    y_maca_nova += lista_soma_posicao_maca[indice_nova_posicaoY];
                                    let maca = document.querySelector(`.maca_jogo[data-index="${indice_maca}"]`);
                                    lista_maca[indice_maca] = [x_maca_nova,y_maca_nova,indice_maca]; //adicionar posicoes da maca na lista
                                    maca.style.background = `rgb(255,255,255)`;
                                    maca.style.left = `${x_maca_nova}px`;
                                    maca.style.top = `${y_maca_nova}px`;
                                    let tamanho_maca = Math.floor(Math.random() *2)*5 + 10;
                                    maca.style.width = `${tamanho_maca}px`;
                                    maca.style.height = `${tamanho_maca}px`;
                                    //maca.style.boxShadow = `0px 0px 45px 15px rgba(${cor1},${cor2},${cor3},0.614)`;
                                    //container_jogo.appendChild(maca);
                                    //indice++;
                                };
                            qtd_loop_geradas++;
                        }
                        if (!cor_aleatoria && cor_cobra != '#000000' && cor_cobra != 'red'){
                        if (parseInt((lista.length-6)/4 - contador/4) >0)
                            {
                                pontos = parseInt((lista.length-6)/4 - contador/4);
                            }
                        else
                            { 
                                pontos = 0;
                            }
                        }
                        inimigoX = Math.floor(Math.random() * 400) * 20;
                        inimigoY = Math.floor(Math.random() * 300) * 20;
                        corpoAntigoInimigo.style.left = `${inimigoX}px`;
                        corpoAntigoInimigo.style.top = `${inimigoY}px`;
                        pontuacao.innerHTML= `Pontos: ${pontos}`;
                        cor_cobra = "red";
                        break
                    }
                    contador++
            }
    }

}

function tela_inicio()
{
    container_jogo.style.background = 'black';
    pontuacao.style.color = 'white';
    const div_tela_jogo = document.getElementById('tela_jogo');

    const div_tela_inicio = document.getElementById('tela_inicio');
    div_tela_inicio.style.display = "flex";
    div_tela_inicio.style.flexDirection = "column";
    div_tela_inicio.style.alignItems = 'center';
    
    const botao_play = document.getElementById('imagem_play');
    botao_play.style.display= "block";
    botao_play.style.width= "50px";
    botao_play.style.height= "76px";
    botao_play.style.background= "url('../imagens/play.png') no-repeat";
    texto_score.innerHTML = `Score: ${score}`;
}

// executa a cada periodo -  20 ms 
const loopDoJogo = setInterval(() => 
    {
        if (jogando)
            {
                const div_tela_jogo = document.getElementById("tela_jogo");
                div_tela_jogo.style.cursor = "none";
                const div_tela_pontos = document.getElementById("pontos");
                div_tela_pontos.style.cursor = "none";
                mover_cobra(ultima_tecla)
            }
        }, 20);
