// Vetores para guardar o sistema de partículas (gotas de água)
let gotasAspersao = [];
let gotasGotejamento = [];
let inputArea;

function setup() {
    // Cria uma tela de desenho de 700x350 pixels e posiciona na div correta
    let canvas = createCanvas(700, 350);
    canvas.parent('canvas-holder');
    
    // Captura o campo input do HTML para leitura dinâmica
    inputArea = select('#areaInput');

    // Cria posições aleatórias iniciais para as gotas da aspersão (nuvem de gotas)
    for (let i = 0; i < 45; i++) {
        gotasAspersao.push({
            x: random(40, 310),
            y: random(-150, 220),
            velocidade: random(3, 6)
        });
    }

    // Cria as gotas controladas do gotejamento (saem do cano na raiz)
    for (let i = 0; i < 12; i++) {
        gotasGotejamento.push({
            x: random(410, 660),
            y: random(235, 245),
            velocidade: random(1.5, 2.5)
        });
    }
}

function draw() {
    background(250, 250, 250); // Fundo limpo para destacar o desenho

    // Lê o valor da área do input e trata erros caso esteja em branco
    let area = float(inputArea.value());
    if (isNaN(area) || area <= 0) {
        area = 0;
    }

    // Lógica Matemática Sustentável: Economia média de 6 litros por m²
    let totalEconomizado = area * 6;

    // Linha central divisória dos cenários
    stroke(226, 232, 240);
    strokeWeight(2);
    line(width / 2, 15, width / 2, 260);

    // ==========================================
    // LADO ESQUERDO: ASPERSÃO TRADICIONAL (DESPERDÍCIO)
    // ==========================================
    noStroke();
    fill(239, 68, 68); // Vermelho Informativo
    rect(60, 20, 160, 30, 6);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text("Aspersão (Alto Consumo)", 140, 35);

    // Solo da esquerda
    fill(141, 110, 99); 
    rect(30, 240, 290, 20);
    
    // Plantas da esquerda
    fill(46, 125, 50);
    ellipse(120, 228, 38, 28);
    ellipse(230, 228, 38, 28);

    // Física das gotas caindo desordenadas (Aspersão)
    fill(21, 101, 192, 160); // Azul com transparência
    for (let g of gotasAspersao) {
        ellipse(g.x, g.y, 4, 8);
        g.y += g.velocidade; // Move a gota para baixo
        
        // Se bater no chão, volta pro topo do canvas
        if (g.y > 240) {
            g.y = random(-40, 0);
            g.x = random(40, 310);
        }
    }

    // ==========================================
    // LADO DIREITO: GOTEJAMENTO INTELIGENTE (SUSTENTÁVEL)
    // ==========================================
    noStroke();
    fill(34, 197, 94); // Verde Sustentabilidade
    rect(470, 20, 170, 30, 6);
    fill(255);
    text("Gotejamento Eficiente", 555, 35);

    // Solo da direita
    fill(109, 76, 65); 
    rect(380, 240, 290, 20);
    
    // Plantas da direita (Crescem mais e são mais vivas)
    fill(76, 175, 80);
    ellipse(470, 225, 44, 34);
    ellipse(580, 225, 44, 34);

    // Mangueira/Cano tecnológico de irrigação local
    stroke(71, 85, 105);
    strokeWeight(5);
    line(380, 238, 670, 238);

    // Gotas saindo cirurgicamente da mangueira direto para o solo
    noStroke();
    fill(21, 101, 192);
    for (let g of gotasGotejamento) {
        ellipse(g.x, g.y, 6, 6);
        g.y += g.velocidade;
        
        // Retorna para a saída do cano simulando ciclos de gotejar
        if (g.y > 246) {
            g.y = 238; 
        }
    }

    // ==========================================
    // PAINEL INTERATIVO DE RESULTADOS (INFERIOR)
    // ==========================================
    fill(241, 245, 249);
    noStroke();
    rect(30, 280, 640, 55, 8);

    // Texto descritivo
    fill(51, 65, 85);
    textSize(15);
    textAlign(LEFT, CENTER);
    text("Economia diária estimada para seu cultivo:", 50, 308);

    // Valor da economia atualizado dinamicamente em tempo real
    textAlign(RIGHT, CENTER);
    textSize(22);
    fill(21, 101, 192);
    text(totalEconomizado.toLocaleString('pt-BR') + " Litros", 650, 308);
}
