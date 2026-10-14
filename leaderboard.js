/* Ranking online opcional — Firebase Authentication anônima + Cloud Firestore.
   Sem configuração, o jogo permanece inteiramente offline. */
(()=>{
  'use strict';
  const trigger=document.getElementById('leaderboard-btn');
  if(!trigger)return;
  const css=document.createElement('style');
  css.textContent='.rank-shade{position:fixed;inset:0;background:#030614dc;backdrop-filter:blur(6px);display:grid;place-items:center;padding:12px;z-index:70}.rank-box{color:#f6f7ff;background:#172238;border:1px solid #4b6580;border-radius:18px;width:min(440px,100%);max-height:89dvh;overflow:auto;padding:20px;box-shadow:0 30px 90px #0009;font-family:Inter,system-ui,sans-serif}.rank-box h2{font-size:21px;margin:0 0 6px}.rank-box p{font-size:13px;line-height:1.45;color:#c9d7e5}.rank-box input{width:100%;background:#101a2b;color:#fff;border:1px solid #677d91;border-radius:9px;padding:10px;margin:5px 0 9px}.rank-actions{display:flex;gap:9px;flex-wrap:wrap}.rank-actions button{background:#85f1c5;color:#10252c;border:0;border-radius:9px;font-weight:800;padding:9px 12px}.rank-actions button.secondary{color:#fff;background:#334660}.rank-board{padding:0;list-style:none;font-size:13px;max-height:300px;overflow:auto}.rank-board li{display:flex;gap:8px;justify-content:space-between;border-bottom:1px solid #34465b;padding:9px 2px}.rank-board li span{overflow-wrap:anywhere;max-width:65%}.rank-message{min-height:16px;font-size:12px;color:#a2f5d6;margin:11px 0 0}';
  document.head.append(css);
  const curtain=document.createElement('div');
  curtain.className='rank-shade';
  curtain.hidden=true;
  curtain.style.display='none';
  curtain.innerHTML='<section class="rank-box" role="dialog" aria-modal="true" aria-label="Ranking online"><h2>Ranking online</h2><p id="rank-description"></p><label for="rank-alias" style="font-size:12px">Apelido público (2–16 caracteres)</label><input id="rank-alias" maxlength="16" autocomplete="nickname" placeholder="Seu apelido"><div class="rank-actions"><button id="rank-send" type="button">Enviar pontuação</button><button id="rank-refresh" class="secondary" type="button">Atualizar</button><button id="rank-close" class="secondary" type="button">Fechar</button></div><p id="rank-message" class="rank-message" role="status"></p><ol id="rank-list" class="rank-board"></ol><p style="font-size:11px">A participação é opcional. Seu apelido, pontuação e identificador anônimo são armazenados no Firebase quando você envia.</p></section>';
  document.body.append(curtain);
  const $=id=>curtain.querySelector('#'+id);
  const cfg=window.HEX_RANKING_CONFIG;
  let fb=null,busy=false;
  try{$('rank-alias').value=localStorage.getItem('hex24576_alias')||'';}catch(_){}
  function snapshot(){return window.HEX_GAME_API?.snapshot?.()||null;}
  function boardKey(s){return 'free_sum_'+s.cells;}
  function status(t){$('rank-message').textContent=t;}
  function close(){curtain.hidden=true;curtain.style.display='none';}
  $('rank-close').onclick=close;
  curtain.addEventListener('click',event=>{if(event.target===curtain)close();});
  curtain.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
  async function connect(){
    if(fb)return fb;
    if(!cfg?.apiKey||!cfg?.projectId||!cfg?.appId)throw Error('Ranking ainda não configurado pelo responsável pelo jogo.');
    const root='https://www.gstatic.com/firebasejs/11.10.0/';
    const [app,auth,db]=await Promise.all([import(root+'firebase-app.js'),import(root+'firebase-auth.js'),import(root+'firebase-firestore.js')]);
    const firebaseApp=app.getApps().find(item=>item.name==='hex2187-ranking')||app.initializeApp(cfg,'hex2187-ranking');
    const identity=auth.getAuth(firebaseApp);
    if(typeof identity.authStateReady==='function')await identity.authStateReady();
    if(!identity.currentUser)await auth.signInAnonymously(identity);
    fb={auth,db,identity,store:db.getFirestore(firebaseApp)};
    return fb;
  }
  async function refresh(){
    const s=snapshot();if(!s)return;
    $('rank-description').textContent='Modo livre · soma de iguais · '+s.cells+' casas · seu placar: '+s.score.toLocaleString('pt-BR');
    $('rank-list').replaceChildren();
    if(!cfg){status('Ranking online aguardando configuração do Firebase. O jogo offline continua disponível.');return;}
    status('Carregando ranking…');
    try{
      const x=await connect();
      const ref=x.db.collection(x.store,'boards',boardKey(s),'scores');
      const query=x.db.query(ref,x.db.orderBy('score','desc'),x.db.limit(20));
      const result=await x.db.getDocs(query);
      if(result.empty){const li=document.createElement('li');li.textContent='Nenhum resultado ainda. Seja o primeiro!';$('rank-list').appendChild(li);}
      result.forEach((row,index)=>{
        const entry=row.data();const li=document.createElement('li'),name=document.createElement('span'),score=document.createElement('strong');
        name.textContent=(index+1)+'. '+String(entry.alias||'Jogador').slice(0,16);
        score.textContent=Number(entry.score||0).toLocaleString('pt-BR');
        li.append(name,score);$('rank-list').appendChild(li);
      });
      status('Ranking atualizado. As pontuações são autodeclaradas; validação competitiva no servidor ainda não foi ativada.');
    }catch(err){status('Não foi possível acessar o ranking. Verifique conexão, autorização anônima e regras do Firestore. ('+String(err?.code||'erro')+')');}
  }
  async function send(){
    if(busy)return;const s=snapshot(),alias=$('rank-alias').value.trim().replace(/\s+/g,' ');
    if(!s||s.moves<1){status('Faça pelo menos uma jogada antes de enviar.');return;}
    if(!/^[\p{L}\p{N} _-]{2,16}$/u.test(alias)){status('Apelido: use de 2 a 16 letras, números, espaços, _ ou -.');return;}
    if(!cfg){status('O ranking ainda não foi conectado ao Firebase.');return;}
    busy=true;$('rank-send').disabled=true;status('Enviando pontuação…');
    try{
      const x=await connect(),uid=x.identity.currentUser.uid;
      const doc=x.db.doc(x.store,'boards',boardKey(s),'scores',uid);
      const prior=await x.db.getDoc(doc);
      if(prior.exists()&&Number(prior.data().score)>=s.score){status('Você já registrou uma pontuação igual ou superior neste modo.');return;}
      await x.db.setDoc(doc,{alias,score:Math.floor(s.score),moves:Math.floor(s.moves),largest:Math.floor(s.largest),updatedAt:x.db.serverTimestamp()});
      try{localStorage.setItem('hex24576_alias',alias)}catch(_){}
      await refresh();status('Pontuação enviada com sucesso.');
    }catch(err){status('Falha ao enviar. Confira sua conexão e as permissões do Firestore. ('+String(err?.code||'erro')+')');}
    finally{busy=false;$('rank-send').disabled=false;}
  }
  trigger.addEventListener('click',()=>{curtain.hidden=false;curtain.style.display='grid';$('rank-alias').focus();refresh();});
  $('rank-refresh').onclick=refresh;
  $('rank-send').onclick=send;
})();