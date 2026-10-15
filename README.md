# HEX 3072

Um quebra-cabeça inspirado no 2048, com **tabuleiros hexagonais e seis direções**. Peças com valores iguais são somadas: **3 + 3 = 6**, **6 + 6 = 12**, **12 + 12 = 24** e assim por diante. A meta principal é chegar a **3.072**. Depois da vitória, a partida continua e **24.576** é a conquista lendária.

**Jogar:** https://igorhfcosta.github.io/hex-2048/

## Como funciona a pontuação

Apenas duas peças iguais se fundem; cada fusão acrescenta à pontuação **o valor da peça criada**. Por exemplo, fundir duas peças 12 gera uma peça 24 e **24 pontos**. Movimentos sem fusão não acrescentam pontos. A peça só pode se fundir uma vez por movimento.

## Recursos

- Tabuleiros com 7 ou 19 casas (padrão).
- Tema visual **neon**, sem seletor de temas.
- Deslizamento e efeitos de fusão originais, sem disco de direção nem vibração. Sons opcionais e conquistas.
- Placar, recorde, desfazer e conquistas. O ranking exibe apenas os 5 melhores de cada tamanho (7 e 19 casas).
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

## Progresso e regras antigas

Esta versão continua usando o mesmo espaço de salvamento local da variante por soma, `hex24576_free_{7|19}_v1`. As partidas e recordes da versão de potências de 3 **não são convertidos nem apagados**, pois a nova sequência é matematicamente incompatível. Os recordes e partidas já salvos com a regra de soma continuam disponíveis. As conquistas também são registradas separadamente.

## Ranking opcional

O ranking utiliza o Firebase Hexx já conectado. As pontuações maiores são enviadas **automaticamente em segundo plano** após as jogadas, com pequenos intervalos para reduzir gravações. Não existe mais botão de enviar pontuação. O jogador pode salvar um apelido no painel; sem ele, o jogo gera um nome provisório. Consulte [FIREBASE_SETUP.md](FIREBASE_SETUP.md). As classificações atuais são `free_sum_7` e `free_sum_19`. O ranking exibe **somente os cinco melhores apelidos e pontuações** de cada tabuleiro. A pontuação enviada pelo navegador **não possui validação antitrapaça no servidor**.

## Publicação

O GitHub Pages utiliza o `index.html` na raiz de `main`, em **Settings → Pages → Deploy from a branch → main → /(root)**. O service worker usa cache versionado para substituir a versão anterior.


## Objetivos

- **3.072:** meta oficial de vitória, com mensagem de parabéns e possibilidade de continuar a partida.
- **6.144 e 12.288:** marcos avançados para continuar evoluindo.
- **24.576:** conquista lendária, sem interromper a partida.

Quem já tinha alcançado 3.072 na versão por soma continua com a partida e o progresso preservados; a meta anterior não é exigida.

O jogo oferece exclusivamente 7 e 19 casas. Dados locais de versões anteriores não são apagados. Para atualizar um apelido já publicado, é necessário superar o próprio recorde, conforme as regras atuais do Firestore.
