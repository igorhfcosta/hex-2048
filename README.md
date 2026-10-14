# HEX 2048

Uma versão hexagonal do quebra-cabeça 2048, com 19 casas e seis direções.

## Jogar

Abra `index.html` no navegador. O jogo funciona sem servidor, sem bibliotecas externas e sem internet.

### Teclado

Use o teclado numérico (com ou sem Num Lock) ou os números da fileira superior:

| Tecla | Movimento |
| --- | --- |
| `7` | Noroeste (↖) |
| `9` | Nordeste (↗) |
| `4` | Oeste (←) |
| `6` | Leste (→) |
| `1` | Sudoeste (↙) |
| `3` | Sudeste (↘) |

`R` reinicia (com confirmação); `U` desfaz a última jogada.

### Celular

Toque e **segure no tabuleiro** até aparecer o controle circular com seis setas. Arraste o dedo na direção desejada para efetuar uma jogada. Soltar sem arrastar cancela. Um deslize rápido também funciona.

## Funcionalidades

- 19 células hexagonais e seis direções de movimentação;
- Fusões e geração de novas peças;
- Animações, placar e recorde;
- Desfazer e reiniciar;
- Salvamento automático no `localStorage` do navegador;
- Design responsivo, com controle radial no celular.

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `hex-2048`.
2. Envie `index.html`, `.nojekyll` e `README.md` para a raiz da branch `main`.
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch **main** e pasta **/(root)**, e salve.
4. Aguarde o GitHub Pages publicar o site. O link normalmente segue o formato `https://SEU-USUARIO.github.io/hex-2048/`.

Este jogo foi inspirado na mecânica de fusão numérica popularizada pelo 2048. O código desta versão foi desenvolvido especificamente para o tabuleiro hexagonal.
