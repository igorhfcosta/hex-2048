# Ativação do ranking online (Firebase)

O HEX 19683 funciona integralmente **sem Firebase**. O ranking opcional é a única parte que precisa de um serviço online.

## Configuração

1. Acesse https://console.firebase.google.com e crie um projeto exclusivo para o jogo.
2. Em **Project settings → Your apps**, cadastre um **aplicativo Web** e copie o objeto de configuração (apiKey, authDomain, projectId e appId). Não use um arquivo de conta de serviço.
3. No menu **Authentication → Sign-in method**, habilite **Anonymous**.
4. Em **Firestore Database**, crie um banco em produção na região apropriada.
5. Em **Firestore → Rules**, substitua pelas regras de `firestore.rules` deste repositório e publique-as.
6. Abra `leaderboard-config.js` e substitua `null` pelo objeto Web do Firebase. Exemplo:

```js
window.HEX_RANKING_CONFIG = {
  apiKey: "SUA_WEB_API_KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-PROJETO",
  appId: "SEU-APP-ID"
};
```

7. Aguarde o GitHub Pages publicar. Abra **Ranking**, escolha um apelido, jogue pelo menos um movimento e clique em **Enviar pontuação**.
8. O placar de cada tamanho e modo é independente. O desafio diário é identificado pela **data UTC** e pelo tamanho do tabuleiro.

## Segurança e privacidade

O código usa autenticação **anônima** do Firebase. Cada participante pode criar/atualizar apenas a própria entrada, e somente quando melhora seu recorde. Os apelidos e resultados são públicos. Nunca coloque credenciais administrativas no JavaScript do site.

**Limitação de integridade competitiva:** o navegador informa a própria pontuação. As Firestore Rules restringem tamanho, valores e identidade da escrita, mas **não verificam se a partida foi legítima**. Pessoas tecnicamente experientes poderiam falsificar resultados. Antes de lançar premiações ou ranking competitivo sério, implemente uma Cloud Function que valide um replay completo e a sequência determinística do desafio diário. O modo livre precisaria de sementes controladas pelo servidor para validação equivalente.

Firebase pode ter cotas e custos conforme o volume; acompanhe o uso e configure alertas de orçamento. Sem a configuração, o painel explica que o ranking ainda não foi ativado e nenhum dado é enviado.

## PWA

O manifesto, o service worker e o ícone SVG permitem instalar o jogo em navegadores compatíveis, e o cache permite jogar offline após um primeiro carregamento online. Se o navegador não oferecer automaticamente a opção de instalação, use a opção de **Adicionar à tela inicial** do menu do navegador. As funções online exigem conexão.
