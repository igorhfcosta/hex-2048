# HEX 3072 + TRI 1024

Dois modos de quebra-cabeça inspirados no 2048, ambos com seis direções, fusões por soma, efeitos e partidas independentes.

**HEX 3072:** modo original com 7, 19 (padrão), 37 ou 61 hexágonos. Começa com peças 3 ou 6 e usa a sequência 3 → 6 → 12 → 24. O objetivo é chegar a 3.072.

**TRI 1024:** novo modo com triângulos equiláteros encaixados, formando um grande triângulo. Os tabuleiros têm 16, 25 (padrão), 36 ou 49 casas. Começa com duas peças de valor 1, depois surgem peças 1 ou 2, com fusões 1 → 2 → 4 → 8 até o objetivo 1.024.

O modo triangular organiza seus movimentos em três famílias de caminhos conectados pelas arestas, que oferecem seis sentidos, com os mesmos atalhos do HEX.

Nos dois modos, peças iguais se somam e o jogo pode continuar depois da meta. No HEX, 24.576 permanece como conquista lendária; no TRI, é possível continuar até 8.192.

**HEX:** https://igorhfcosta.github.io/hex-2048/

**TRI:** https://igorhfcosta.github.io/hex-2048/?shape=triangle

## Como funciona a pontuação

Apenas duas peças iguais se fundem; cada fusão acrescenta à pontuação **o valor da peça criada**. Por exemplo, fundir duas peças 12 gera uma peça 24 e **24 pontos**. Movimentos sem fusão não acrescentam pontos. A peça só pode se fundir uma vez por movimento.

## Recursos

- Seletor **Hexágonos / Triângulos** abaixo do tabuleiro, com quatro tamanhos para cada formato.
- Tema visual **neon**, sem seletor de temas.
- Animações clássicas de deslocamento e fusão, com efeitos visuais e partículas de comemoração; o gesto no celular é direto, sem disco flutuante e sem vibração. Sons opcionais por valor e marcos de conquista.
- Placar, recorde, desfazer e conquistas próprios para cada formato e tamanho. Ranking online existente somente no modo HEX.
- PWA instalável em dispositivos compatíveis, com suporte offline após instalação/cache.
- Botões extras **abaixo do tabuleiro** para manter a tela limpa.
- Não há desafio diário nem painel de estatísticas.

## Controles

| Tecla | Direção |
| --- | --- |
| `7` | Noroeste (↖) |
| `9` | Nordeste (↗) |
| `4` | Oeste (←) |
| `6` | Leste (→) |
| `1` | Sudoeste (↙) |
| `3` | Sudeste (↘) |

Use as teclas da fileira superior ou do teclado numérico (com ou sem Num Lock). `R` reinicia após confirmação; `U` desfaz a última jogada. No celular, basta **deslizar o dedo diretamente sobre o tabuleiro** em uma das seis direções. Não há controle radial nem vibração.

## Salvamento separado por modo

O modo HEX continua com as mesmas chaves `hex24576_free_{7|19|37|61}_v1` e `hex24576_achievements_v1`. O TRI usa `tri1024_free_{16|25|36|49}_v1` e `tri1024_achievements_v1`. Trocar de formato não apaga nem converte partidas.

## Progresso e regras antigas

Esta versão continua usando o mesmo espaço de salvamento local da variante por soma, `hex24576_free_{7|19|37|61}_v1`. As partidas e recordes da versão de potências de 3 **não são convertidos nem apagados**, pois a nova sequência é matematicamente incompatível. Os recordes e partidas já salvos com a regra de soma continuam disponíveis. As conquistas também são registradas separadamente.

## Ranking opcional

O ranking existente é exclusivo dos tabuleiros hexagonais; ele não aparece no TRI até que sejam implementadas coleções e regras próprias no Firebase. O ranking precisa de Authentication anônima e Firestore; consulte [FIREBASE_SETUP.md](FIREBASE_SETUP.md). As classificações atuais ficam nas coleções `free_sum_7`, `free_sum_19`, `free_sum_37` e `free_sum_61`, separadas das versões anteriores. A lista exibe **somente o apelido e a pontuação** de cada jogador. A pontuação enviada pelo navegador **não possui validação antitrapaça no servidor**.

## Publicação

O GitHub Pages utiliza o `index.html` na raiz de `main`, em **Settings → Pages → Deploy from a branch → main → /(root)**. O service worker usa cache versionado para substituir a versão anterior.


## Objetivos

- **3.072:** meta oficial de vitória, com mensagem de parabéns e possibilidade de continuar a partida.
- **6.144 e 12.288:** marcos avançados para continuar evoluindo.
- **24.576:** conquista lendária, sem interromper a partida.

Quem já tinha alcançado 3.072 na versão por soma continua com a partida e o progresso preservados; a meta anterior não é exigida.

## Seleção do modo

Abra o menu **Hexágonos / Triângulos** abaixo do tabuleiro. Ao trocar de modo, a página carrega a partida previamente salva daquele formato. No TRI, o ranking permanece indisponível para que pontuações iniciadas em 1 não sejam misturadas com as do HEX.
