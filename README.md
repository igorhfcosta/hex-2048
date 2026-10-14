# HEX 19683

Quebra-cabeça de fusão numérica inspirado no 2048, mas com **hexágonos, seis direções e potências de 3**. Junte duas peças iguais: 3 + 3 → 9, 9 + 9 → 27 e assim por diante, até **19.683**.

**Jogue:** https://igorhfcosta.github.io/hex-2048/

## Melhorias e recursos

- **Tabuleiros:** 7, 19, 37 ou 61 hexágonos; o tabuleiro de 19 é o padrão.
- **Modos:** livre e desafio diário, com sequência de peças determinística por data UTC e tamanho de tabuleiro.
- **Efeitos:** deslocamentos suaves, partículas ao fundir, comemorações ao alcançar 729, 2.187 e 6.561, tela especial de vitória ao atingir 19.683.
- **Áudio e tato:** nota musical que varia com a potência fundida, som opcional e vibrações discretas no Android quando o navegador suporta.
- **Estatísticas:** pontuação, número de jogadas, fusões, maior peça e tempo de partida.
- **Conquistas:** nove medalhas salvas no dispositivo.
- **Temas:** original, claro, neon e monocromático.
- **PWA:** ícones, manifesto e cache offline para instalação no celular/computador em navegadores compatíveis.
- **Ranking online (opcional):** integração com Firebase Auth anônimo + Firestore, **ainda exige configuração pelo responsável** — consulte [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## Controles

| Tecla | Direção |
| --- | --- |
| `7` | Noroeste (↖) |
| `9` | Nordeste (↗) |
| `4` | Oeste (←) |
| `6` | Leste (→) |
| `1` | Sudoeste (↙) |
| `3` | Sudeste (↘) |

Números da fileira superior ou teclado numérico, com ou sem Num Lock. `R` pede confirmação para reiniciar; `U` desfaz a última jogada. No celular, mantenha o dedo pressionado sobre o tabuleiro e arraste no disco radial, ou faça um deslize rápido.

## Progresso e partidas

O progresso da versão anterior de **19 casas em modo livre** continua no armazenamento local `hex2187_v1`. Os outros tabuleiros e o desafio diário usam espaços de armazenamento separados; mudar de modo não apaga sua partida anterior. As conquistas e preferências de tema são guardadas no mesmo navegador.

O **desafio diário** usa a mesma semente e sequência de peças para a mesma data UTC e quantidade de casas, para que jogadores diferentes tenham um desafio comparável. A opção de desfazer permanece disponível. O ranking não possui validação competitiva de partidas no servidor — consulte as limitações de segurança descritas nas instruções do Firebase.

## Arquivos

- `index.html`: jogo completo, sem dependências externas para jogar;
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon.svg`: PWA;
- `leaderboard.js`, `leaderboard-config.js`: integração opcional de ranking;
- `firestore.rules`, `FIREBASE_SETUP.md`: regras e instruções do serviço online.

## Publicação

GitHub Pages → **Settings → Pages → Deploy from a branch → main → /(root)**.

O jogo continua funcional offline mesmo se o Firebase estiver desativado. A versão Web usa Web APIs que podem variar entre navegadores, especialmente vibração e instalação.
