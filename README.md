let selMarket = 'btts', selLabel = 'Ambos Marcan (Sí/No)', selCat = 'Goles', selBaseLabel = 'Ambos Marcan (Sí/No)', isPlayer = false;

function togglePanel() { document.getElementById('mPanel').classList.toggle('open'); document.getElementById('mArrow').classList.toggle('open'); }
function toggleCat(h) { h.nextElementSibling.classList.toggle('open'); h.querySelector('.mcat-toggle').classList.toggle('open'); }
function filterM(q) {
  q = q.toLowerCase();
  document.querySelectorAll('.mitem').forEach(i => i.classList.toggle('hidden', !i.textContent.toLowerCase().includes(q)));
  if (q) document.querySelectorAll('.mitems').forEach(i => i.classList.add('open'));
}
document.querySelectorAll('.mitem').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.mitem').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    selMarket = item.dataset.m; selLabel = item.textContent.trim();
    selBaseLabel = item.textContent.trim(); selCat = item.dataset.cat;
    isPlayer = item.dataset.player === 'true';
    document.getElementById('selLabel').textContent = selLabel;
    document.getElementById('selCat').textContent = selCat;
    document.getElementById('mPanel').classList.remove('open');
    document.getElementById('mArrow').classList.remove('open');
    document.getElementById('playerWrap').style.display = isPlayer ? 'flex' : 'none';
  });
});
document.addEventListener('click', e => {
  const sel = document.querySelector('.market-selector');
  if (sel && !sel.contains(e.target)) { document.getElementById('mPanel').classList.remove('open'); document.getElementById('mArrow').classList.remove('open'); }
});

function onCuota() {
  const c = parseFloat(document.getElementById('cuota').value);
  if (c >= 1.01) { const imp = (1/c*100).toFixed(1); document.getElementById('impliedVal').textContent = imp+'%'; document.getElementById('barI').style.width = Math.min(imp,99)+'%'; }
  else document.getElementById('impliedVal').textContent = '—';
}
function onSlider() { const v = document.getElementById('slider').value; document.getElementById('sliderVal').textContent = v+'%'; document.getElementById('barR').style.width = v+'%'; }

function showErr(m) { const e=document.getElementById('errorMsg'); e.textContent=m; e.style.display='block'; }
function hideErr() { document.getElementById('errorMsg').style.display='none'; }

function validate() {
  const team1=document.getElementById('team1').value.trim(), team2=document.getElementById('team2').value.trim();
  const cuota=parseFloat(document.getElementById('cuota').value);
  const player=document.getElementById('playerName')?.value.trim()||'';
  if (!team1||!team2) { showErr('Escribe los nombres de ambos equipos.'); return null; }
  if (!cuota||cuota<1.01) { showErr('Introduce una cuota válida (mínimo 1.01).'); return null; }
  if (isPlayer&&!player) { showErr('Escribe el nombre del jugador.'); return null; }
  return { team1, team2, cuota, player };
}

function renderResults(team1, team2, cuota, realProb, player) {
  const impliedProb=1/cuota*100, ev=((realProb/100)*cuota-1)*100, edge=realProb-impliedProb;
  const market=isPlayer&&player?`${selBaseLabel} – ${player}`:selBaseLabel;
  document.getElementById('rI').textContent=impliedProb.toFixed(1)+'%';
  document.getElementById('rR').textContent=realProb.toFixed(1)+'%';
  const evEl=document.getElementById('rEV'); evEl.textContent=(ev>=0?'+':'')+'€'+ev.toFixed(2); evEl.className='stat-value '+(ev>0?'c-green':ev<0?'c-red':'c-yellow');
  const vEl=document.getElementById('verdict'),icon=document.getElementById('vIcon'),title=document.getElementById('vTitle'),desc=document.getElementById('vDesc');
  if(ev>5){vEl.className='verdict good';icon.textContent='✅';title.textContent='APUESTA CON VALOR';title.style.color='var(--green)';desc.textContent=`"${market}" — Edge +${edge.toFixed(1)} pts. Rentable a largo plazo.`;}
  else if(ev<-5){vEl.className='verdict bad';icon.textContent='❌';title.textContent='SIN VALOR — EVITAR';title.style.color='var(--red)';desc.textContent=`"${market}" — La casa cobra de más.`;}
  else{vEl.className='verdict neutral';icon.textContent='⚖️';title.textContent='APUESTA NEUTRA';title.style.color='var(--yellow)';desc.textContent=`"${market}" — Valor esperado casi cero.`;}
  document.getElementById('bPartido').textContent=`${team1} vs ${team2}`;
  document.getElementById('bMercado').textContent=market;
  document.getElementById('bCuota').textContent=cuota.toFixed(2);
  document.getElementById('bImplied').textContent=impliedProb.toFixed(2)+'%';
  document.getElementById('bReal').textContent=realProb.toFixed(2)+'%';
  const eEl=document.getElementById('bEdge'); eEl.textContent=(edge>=0?'+':'')+edge.toFixed(2)+'%'; eEl.style.color=edge>0?'var(--green)':edge<0?'var(--red)':'var(--yellow)';
  const evBEl=document.getElementById('bEV'); evBEl.textContent=(ev>=0?'+':'')+'€'+ev.toFixed(2); evBEl.style.color=ev>0?'var(--green)':ev<0?'var(--red)':'var(--yellow)';
  const bar=document.getElementById('edgeBar'),cl=Math.max(-40,Math.min(40,edge));
  if(edge>=0){bar.style.left='50%';bar.style.width=(cl/40*50)+'%';bar.style.background='var(--green)';}
  else{bar.style.left=(50+cl/40*50)+'%';bar.style.width=(-cl/40*50)+'%';bar.style.background='var(--red)';}
  document.getElementById('results').style.display='block';
  document.getElementById('results').scrollIntoView({behavior:'smooth',block:'start'});
}

function calculate() {
  hideErr();
  const d=validate(); if(!d) return;
  const realProb=parseFloat(document.getElementById('slider').value);
  const aiBox=document.getElementById('aiBox'); if(aiBox) aiBox.style.display='none';
  renderResults(d.team1,d.team2,d.cuota,realProb,d.player);
}
