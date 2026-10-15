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
  curtain.innerHTML='<section class="rank-box" role="dialog" aria-modal="true" aria-label="Ranking online"><h2>Ranking online</h2><p id="rank-description"></p><label for="rank-alias" style="font-size:12px">Apelido público (2–16 caracteres)</label><input id="rank-alias" maxlength="16" autocomplete="nickname" placeholder="Seu apelido"><div class="rank-actions"><button id="rank-alias-save" type="button">Salvar apelido</button><button id="rank-refresh" class="secondary" type="button">Atualizar</button><button id="rank-close" class="secondary" type="button">Fechar</button></div><p id="rank-message" class="rank-message" role="status"></p><ol id="rank-list" class="rank-board"></ol><p style="font-size:11px">O recorde é enviado automaticamente ao Firebase durante o jogo, quando há internet. Se não escolher um apelido, será criado um nome provisório. A pontuação e um identificador anônimo são armazenados no Firebase.</p></section>';
  document.body.append(curtain);
  const $=id=>curtain.querySelector('#'+id);
  const cfg=window.HEX_RANKING_CONFIG;
  const ALIAS_KEY='hex24576_alias';
  const allowedBoards=new Set([7,19]);
  let fb=null,connectPromise=null,pendingTimer=null,syncing=false,needsResync=false;
  let lastWriteAt=0,lastCheckedScore=-1,lastSyncError='',dialogOpen=false;
  let aliasStored='';
  try{aliasStored=localStorage.getItem(ALIAS_KEY)||'';}catch(_){}
  $('rank-alias').value=aliasStored;

  function snapshot(){
    const s=window.HEX_GAME_API?.snapshot?.()||null;
    return s&&allowedBoards.has(s.cells)?s:null;
  }
  function boardKey(s){return 'free_sum_'+s.cells;}
  function status(t){$('rank-message').textContent=t;}
  function close(){
    dialogOpen=false;
    curtain.hidden=true;
    curtain.style.display='none';
  }
  $('rank-close').onclick=close;
  curtain.addEventListener('click',event=>{if(event.target===curtain)close();});
  curtain.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
  function aliasValid(value){return /^[\\p{L}\\p{N} _-]{2,16}$/u.test(value);}
  function aliasFor(uid,previousAlias=''){
    let name=aliasStored;
    if(!aliasValid(name))name=aliasValid(previousAlias)?previousAlias:'Jogador'+uid.slice(-6);
    if(!aliasStored){
      aliasStored=name;
      try{localStorage.setItem(ALIAS_KEY,name);}catch(_){}
      $('rank-alias').value=name;
    }
    return name;
  }
  async function connect(){
    if(fb)return fb;
    if(connectPromise)return connectPromise;
    if(!cfg?.apiKey||!cfg?.projectId||!cfg?.appId)throw Error('Ranking não configurado.');
    connectPromise=(async()=>{
      const root='https://www.gstatic.com/firebasejs/11.10.0/';
      const [app,auth,db]=await Promise.all([
        import(root+'firebase-app.js'),
        import(root+'firebase-auth.js'),
        import(root+'firebase-firestore.js')
      ]);
      const firebaseApp=app.getApps().find(item=>item.name==='hex2187-ranking')||app.initializeApp(cfg,'hex2187-ranking');
      const identity=auth.getAuth(firebaseApp);
      if(typeof identity.authStateReady==='function')await identity.authStateReady();
      if(!identity.currentUser)await auth.signInAnonymously(identity);
      fb={auth,db,identity,store:db.getFirestore(firebaseApp)};
      return fb;
    })();
    try{return await connectPromise;}
    finally{connectPromise=null;}
  }
  async function refresh(){
    const s=snapshot();if(!s)return;
    $('rank-description').textContent='HEX · '+s.cells+' casas · seu placar: '+s.score.toLocaleString('pt-BR');
    $('rank-list').replaceChildren();
    if(!cfg){status('Ranking indisponível: falta configurar o Firebase.');return;}
    status('Carregando os cinco melhores…');
    try{
      const x=await connect();
      aliasFor(x.identity.currentUser.uid);
      const ref=x.db.collection(x.store,'boards',boardKey(s),'scores');
      const topFive=x.db.query(ref,x.db.orderBy('score','desc'),x.db.limit(5));
      const result=await x.db.getDocs(topFive);
      if(result.empty){
        const li=document.createElement('li');
        li.textContent='Nenhum resultado ainda. Seja o primeiro!';
        $('rank-list').appendChild(li);
      }
      result.forEach(row=>{
        const entry=row.data(),li=document.createElement('li');
        const name=document.createElement('span'),score=document.createElement('strong');
        name.textContent=String(entry.alias||'Jogador').slice(0,16);
        score.textContent=Number(entry.score||0).toLocaleString('pt-BR');
        li.append(name,score);$('rank-list').appendChild(li);
      });
      status('Top 5 · seu recorde é salvo automaticamente ao jogar.');
    }catch(err){
      status('Não foi possível carregar. Verifique a conexão, Authentication e Firestore. ('+String(err?.code||'erro')+')');
    }
  }
  function queueSync(waitMs=1400){
    const s=snapshot();
    if(!s||!cfg||s.score<=0||s.moves<1)return;
    clearTimeout(pendingTimer);
    const sinceLastWrite=Date.now()-lastWriteAt;
    const delay=Math.max(waitMs,8000-sinceLastWrite);
    pendingTimer=setTimeout(()=>{pendingTimer=null;void syncBest();},delay);
  }
  async function syncBest(){
    if(syncing){needsResync=true;return;}
    const s=snapshot();
    if(!s||s.score<=0||s.moves<1||!cfg||navigator.onLine===false)return;
    if(s.score<=lastCheckedScore)return;
    syncing=true;
    try{
      const x=await connect(),uid=x.identity.currentUser.uid;
      const doc=x.db.doc(x.store,'boards',boardKey(s),'scores',uid);
      const prior=await x.db.getDoc(doc);
      const remoteScore=prior.exists()?Number(prior.data().score)||0:0;
      lastCheckedScore=Math.max(lastCheckedScore,remoteScore);
      if(remoteScore>=s.score){
        aliasFor(uid,prior.exists()?prior.data().alias:'');
        return;
      }
      const alias=aliasFor(uid,prior.exists()?prior.data().alias:'');
      await x.db.setDoc(doc,{
        alias,score:Math.floor(s.score),moves:Math.floor(s.moves),
        largest:Math.floor(s.largest),updatedAt:x.db.serverTimestamp()
      });
      lastCheckedScore=s.score;
      lastWriteAt=Date.now();
      lastSyncError='';
      if(dialogOpen)await refresh();
    }catch(err){
      lastSyncError=String(err?.code||'erro de rede');
      if(dialogOpen)status('Não foi possível sincronizar agora ('+lastSyncError+'). Tentaremos novamente ao jogar ou reconectar.');
    }finally{
      syncing=false;
      const current=snapshot();
      if(needsResync||(current&&current.score>lastCheckedScore&&!lastSyncError)){
        needsResync=false;queueSync(1400);
      }
    }
  }
  $('rank-alias-save').onclick=()=>{
    const alias=$('rank-alias').value.trim().replace(/\\s+/g,' ');
    if(!aliasValid(alias)){
      status('Use 2 a 16 letras, números, espaços, _ ou -.');
      return;
    }
    aliasStored=alias;
    try{localStorage.setItem(ALIAS_KEY,alias)}catch(_){}
    status('Apelido salvo neste aparelho. No ranking, será atualizado quando você superar seu recorde atual.');
    queueSync(250);
  };
  trigger.addEventListener('click',()=>{
    curtain.hidden=false;curtain.style.display='grid';dialogOpen=true;
    void refresh();
  });
  $('rank-refresh').onclick=()=>void refresh();

  // A sincronização é automática, mas somente quando a pontuação melhora.
  // Debounce e limite de gravação reduzem chamadas ao Firestore.
  window.addEventListener('hex-score-changed',()=>queueSync());
  window.addEventListener('online',()=>queueSync(200));
  window.addEventListener('load',()=>queueSync(1800));

})();