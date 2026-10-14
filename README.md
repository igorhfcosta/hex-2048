# HEX 19683

Jogo de fusão numérica em um tabuleiro com **19 casas hexagonais e seis direções**, inspirado no 2048. Nesta versão, as peças seguem as **potências de 3**: `3 → 9 → 27 → 81 → 243 → 729 → 2187 → 6561 → 19683`.

Duas peças iguais criam a próxima potência de 3 (por exemplo, duas peças `3` viram uma peça `9`). A meta é alcançar **19.683 (3⁹)**; depois, é possível continuar jogando.

## Jogar online

https://igorhfcosta.github.io/hex-2048/

## Controles

No teclado numérico (mesmo sem Num Lock) ou na fileira superior:

| Tecla | Direção |
| --- | --- |
| `7` | Noroeste (↖) |
| `9` | Nordeste (↗) |
| `4` | Oeste (←) |
| `6` | Leste (→) |
| `1` | Sudoeste (↙) |
| `3` | Sudeste (↘) |

`R` abre a confirmação de reinício; `U` desfaz a última jogada.

**Celular:** toque e segure o tabuleiro para exibir o controle radial de seis direções, depois arraste o dedo. Também é possível fazer um deslize rápido. Em aparelhos e navegadores compatíveis, há uma vibração curta quando o disco aparece (12 ms) e outra ao selecionar uma direção (18 ms).

## Funcionalidades

- Interface minimalista, centralizada na tela, sem necessidade de rolagem;
- Tabuleiro hexagonal, sem o antigo hexágono externo;
- Animações, placar, recorde, desfazer e reiniciar;
- Sons opcionais;
- Salvamento automático do progresso neste navegador;
- Arquivo HTML único, sem dependências ou servidor.

**Nota sobre o progresso:** ao elevar a meta de 2187 para 19.683, a partida e o recorde existentes são preservados. Se a meta anterior já tiver sido atingida, o aviso de vitória fica disponível novamente ao alcançar a nova meta. A mudança antiga, de potências de 2 para potências de 3, não converteu as partidas do HEX 2048.

## GitHub Pages

O `index.html` na raiz da branch `main` é a página do jogo. Para publicar, configure **Settings → Pages → Deploy from a branch → main → /(root)**.

O nome do repositório foi mantido como `hex-2048` para preservar o endereço público já existente.
