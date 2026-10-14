# HEX 24576

Um quebra-cabeça inspirado no 2048, com **tabuleiros hexagonais e seis direções**. Peças com valores iguais são somadas: **3 + 3 = 6**, **6 + 6 = 12**, **12 + 12 = 24** e assim por diante. A meta é chegar a **24.576**.

**Jogar:** https://igorhfcosta.github.io/hex-2048/

## Como funciona a pontuação

Apenas duas peças iguais se fundem; cada fusão acrescenta à pontuação **o valor da peça criada**. Por exemplo, fundir duas peças 12 gera uma peça 24 e **24 pontos**. Movimentos sem fusão não acrescentam pontos. A peça só pode se fundir uma vez por movimento.

## Recursos

- Tabuleiros com 7, 19 (padrão), 37 ou 61 casas.
- Tema visual **neon**, sem seletor de temas.
- Animações, partículas, notas sonoras por valor, comemorações e vibração opcional em celulares compatíveis.
- Placar, recorde, desfazer, conquistas e ranking opcional por tabuleiro.
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

Use as teclas da fileira superior ou do teclado numérico (com ou sem Num Lock). `R` reinicia após confirmação; `U` desfaz a última jogada. No celular, toque e segure o tabuleiro para abrir o controle radial e arraste na direção desejada; um deslize rápido também funciona.

## Progresso e regras antigas

Esta versão usa um novo espaço de salvamento local, `hex24576_free_{7|19|37|61}_v1`. As partidas e recordes da versão de potências de 3 **não são convertidos nem apagados**, pois a nova sequência é matematicamente incompatível. Os novos recordes começam do zero. As conquistas também são registradas separadamente.

## Ranking opcional

O ranking precisa de um Firebase próprio com Authentication anônima e Firestore; consulte [FIREBASE_SETUP.md](FIREBASE_SETUP.md). As classificações atuais ficam nas coleções `free_sum_7`, `free_sum_19`, `free_sum_37` e `free_sum_61`, separadas das versões anteriores. A pontuação enviada pelo navegador **não possui validação antitrapaça no servidor**.

## Publicação

O GitHub Pages utiliza o `index.html` na raiz de `main`, em **Settings → Pages → Deploy from a branch → main → /(root)**. O service worker usa cache versionado para substituir a versão anterior.

