# Ativação do ranking online (Firebase)

O HEX 3072 funciona integralmente **sem Firebase**. O ranking opcional é a única parte que precisa de um serviço online.

## Configuração

1. O projeto Firebase **Hexx** (`hexx-123f9`) já foi criado, e seu aplicativo Web está cadastrado.
2. A configuração pública do aplicativo Web já foi adicionada ao arquivo `leaderboard-config.js`. Não use arquivos de conta de serviço.
3. No menu **Authentication → Sign-in method**, habilite **Anonymous**.
4. Em **Firestore Database**, crie um banco em produção na região apropriada.
5. Em **Firestore → Rules**, substitua pelas regras de `firestore.rules` deste repositório e publique-as.
6. Confira se o domínio `igorhfcosta.github.io` está autorizado na aba **Authentication → Settings → Authorized domains**. O ranking já utiliza a configuração Web em `leaderboard-config.js`.

7. Aguarde o GitHub Pages publicar. Abra **Ranking**, escolha um apelido, jogue pelo menos um movimento e clique em **Enviar pontuação**.
8. O placar de cada tamanho de tabuleiro é independente. Os placares antigos, gerados pela regra de multiplicação, não são misturados com os atuais.

## Segurança e privacidade

O código usa autenticação **anônima** do Firebase. Cada participante pode criar/atualizar apenas a própria entrada, e somente quando melhora seu recorde. Os apelidos e resultados são públicos. Nunca coloque credenciais administrativas no JavaScript do site.

**Limitação de integridade competitiva:** o navegador informa a própria pontuação. As Firestore Rules restringem tamanho, valores e identidade da escrita, mas **não verificam se a partida foi legítima**. Pessoas tecnicamente experientes poderiam falsificar resultados. Antes de lançar premiações ou ranking competitivo sério, implemente uma Cloud Function que valide o replay de uma partida e utilize sementes controladas pelo servidor para evitar resultados falsificados.

Firebase pode ter cotas e custos conforme o volume; acompanhe o uso e configure alertas de orçamento. Se Authentication ou Firestore não estiverem habilitados, o ranking exibirá um erro de conexão/permissão e não enviará os resultados.

## PWA

O manifesto, o service worker e o ícone SVG permitem instalar o jogo em navegadores compatíveis, e o cache permite jogar offline após um primeiro carregamento online. Se o navegador não oferecer automaticamente a opção de instalação, use a opção de **Adicionar à tela inicial** do menu do navegador. As funções online exigem conexão.

## Regra atual de pontuação

As peças começam em 3 ou 6 e apenas números iguais se fundem por soma: 3 + 3 = 6, 6 + 6 = 12 etc. Cada fusão acrescenta ao placar apenas o valor resultante. A meta principal é **3.072**, e **24.576** é a conquista lendária. Os placares são armazenados sob `boards/free_sum_{7|19|37|61}/scores` para não misturar as versões anteriores.

## Próximo passo no console

No projeto `hexx-123f9`, confirme a autenticação **Anônima** em Authentication → Sign-in method. Em **Firestore Database**, crie o banco em modo produção (se ainda não existe). Copie o conteúdo completo de `firestore.rules` para a aba **Regras** e clique em **Publicar**. A criação do app Web e a inclusão do objeto de configuração no GitHub **não** executam essas etapas automaticamente.
