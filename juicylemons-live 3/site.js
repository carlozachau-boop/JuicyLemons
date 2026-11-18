(function(){
const $=s=>document.getElementById(s);
document.querySelectorAll('video').forEach(v=>{try{if(matchMedia('(prefers-reduced-motion: reduce)').matches){v.removeAttribute('autoplay');v.pause()}else{v.play().catch(()=>{})}}catch(e){}});
// role picker on home form
const btnText={client:"Start my search",candidate:"Send my profile",freelance:"Apply to join"};
document.querySelectorAll('input[name=who]').forEach(r=>r.addEventListener('change',()=>{document.querySelectorAll('[data-for]').forEach(f=>f.hidden=f.dataset.for!==r.value);const sb=$('sb');if(sb)sb.textContent=btnText[r.value]}));
// lead forms
const f=$('f');if(f)f.addEventListener('submit',e=>{e.preventDefault();const em=f.querySelector('input[type=email]');if(!em.value.includes('@')){em.focus();return}const cc=f.querySelector('.fconsent input');if(cc&&!cc.checked){cc.focus();return}const ok=f.querySelector('.ok');if(ok)ok.hidden=false});
// testimonials
const tt=$('tt');if(tt){const st=d=>tt.scrollBy({left:d*(tt.querySelector('.tcard').offsetWidth+20),behavior:'smooth'});$('tp').onclick=()=>st(-1);$('tn').onclick=()=>st(1)}
// newsletter forms
const sub=(fid,em,cb,ok)=>{const x=$(fid);if(!x)return;x.addEventListener('submit',e=>{e.preventDefault();const m=$(em),c=$(cb);if(!m.value.includes('@')){m.focus();return}if(!c.checked){c.focus();return}$(ok).hidden=false;try{localStorage.setItem('jl_pop','1')}catch(e){}})};
sub('nlf','nle','nlc','nlok');sub('popf','pope','popc','popok');
// popup (home only)
const pop=$('pop');if(pop){let seen=false;try{seen=localStorage.getItem('jl_pop')==='1'}catch(e){}
const close=()=>{pop.hidden=true;try{localStorage.setItem('jl_pop','1')}catch(e){}};
const open=()=>{if(seen||!pop.hidden)return;seen=true;pop.hidden=false;$('pope').focus()};
setTimeout(open,15000);addEventListener('scroll',()=>{if(scrollY>document.body.scrollHeight*.45)open()},{passive:true});
$('popx').onclick=close;$('popno').onclick=close;pop.addEventListener('click',e=>{if(e.target===pop)close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!pop.hidden)close()})}
// google reviews panel
const gb=$('gopen'),gp=$('gpanel');if(gb&&gp){const set=o=>{gp.hidden=!o;gb.setAttribute('aria-expanded',o)};
gb.onclick=()=>set(gp.hidden);$('gclose').onclick=()=>set(false);
document.querySelectorAll('[data-gopen]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();set(true)}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)})}
})();
(function(){const tb=document.getElementById('topbar');if(!tb)return;
const onS=()=>tb.classList.toggle('scrolled',scrollY>24);onS();addEventListener('scroll',onS,{passive:true});
const b=document.getElementById('tbmenu'),p=document.getElementById('mpanel');
const set=o=>{p.hidden=!o;b.setAttribute('aria-expanded',o);b.querySelector('span').textContent=o?'Close':'Menu';document.body.classList.toggle('menu-open',o);if(o)p.querySelector('a').focus()};
b.onclick=()=>set(p.hidden);p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!p.hidden){set(false);b.focus()}});
addEventListener('resize',()=>{if(innerWidth>900&&!p.hidden)set(false)});})();
(function(){const w=document.querySelector('.wa');if(!w)return;setTimeout(()=>{w.classList.add('show');setTimeout(()=>w.classList.remove('show'),6000)},5000)})();
// lemon chat button: pick a contrasting colour for whatever is behind it
(function(){const w=document.querySelector('.wa');if(!w)return;const ph=w.querySelector('.wa-phone');let raf=0;
const parse=c=>{const m=c.match(/\d+(\.\d+)?/g);return m?m.map(Number):[0,0,0,0]};
const bgAt=(x,y)=>{for(const el of document.elementsFromPoint(x,y)){if(w.contains(el))continue;if(el.tagName==='VIDEO')return[245,225,40];let n=el;while(n&&n!==document.documentElement){const c=parse(getComputedStyle(n).backgroundColor);if((c[3]===undefined||c[3]>0.5)&&c.length>=3&&!(c.length===4&&c[3]===0))return c;n=n.parentElement}}return parse(getComputedStyle(document.body).backgroundColor)};
const run=()=>{raf=0;const r=ph.getBoundingClientRect();const [R,G,B]=bgAt(r.left+r.width/2,r.top+r.height/2);
const lum=(0.299*R+0.587*G+0.114*B)/255;const pinkish=R>180&&G<120&&B>60;
w.classList.toggle('on-pink',pinkish);w.classList.toggle('on-dark',!pinkish&&lum<0.4);w.classList.toggle('on-yellow',!pinkish&&lum>=0.4)};
const req=()=>{if(!raf)raf=requestAnimationFrame(run)};addEventListener('scroll',req,{passive:true});addEventListener('resize',req);setTimeout(run,300);})();
// Refer a lemon
(function(){const $=i=>document.getElementById(i);if(!$('refer'))return;
const tabs=[['rt1','rp1'],['rt2','rp2']];tabs.forEach(([t,p])=>$(t).onclick=()=>tabs.forEach(([t2,p2])=>{const on=t2===t;$(t2).setAttribute('aria-selected',on);$(p2).hidden=!on}));
const upd=()=>{const n=($('rname').value.trim()||'you').toLowerCase().replace(/[^a-z0-9äöüß-]+/g,'-').replace(/^-|-$/g,'')||'you';const link='juicylemons.de/'+($('refer').dataset.path||'candidates')+'?ref='+n;$('rlink').textContent=link;
$('rwa').href='https://wa.me/?text='+encodeURIComponent(($('refer').dataset.path==='clients'?"Hey! If you're hiring tech or SaaS talent, JuicyLemons is fast and personal. Have a look: https://":"Hey! JuicyLemons helps tech & SaaS people find great next roles, personally and fast. Have a look: https://")+link)};
$('rname').addEventListener('input',upd);upd();
$('rcopy').onclick=async()=>{const t='https://'+$('rlink').textContent;try{await navigator.clipboard.writeText(t);$('rcopy').textContent='Copied!'}catch(e){const r=document.createRange();r.selectNodeContents($('rlink'));const s=getSelection();s.removeAllRanges();s.addRange(r);$('rcopy').textContent='Selected'}setTimeout(()=>$('rcopy').textContent='Copy',1800)};
$('rp2').addEventListener('submit',e=>{e.preventDefault();const em=$('rye');if(!em.value.includes('@')){em.focus();return}if(!$('rf').value.trim()){$('rf').focus();return}if(!$('rok').checked){$('rok').focus();return}$('rdone').hidden=false});})();
// 3x7 method: count up and play when in view
(function(){const m=document.querySelector('.method'),dc=document.getElementById('dc');if(!m||!('IntersectionObserver' in window))return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
m.classList.add('armed');if(dc)dc.textContent='0';
const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();
requestAnimationFrame(()=>{m.classList.add('play');m.classList.remove('armed')});
if(dc){const t0=performance.now(),D=2400;const step=t=>{const k=Math.min(1,(t-t0)/D);dc.textContent=Math.round(21*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}},{threshold:.3});io.observe(m);
m.querySelectorAll('.wk').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));
setTimeout(()=>{if(m.classList.contains('armed')){m.classList.add('play');m.classList.remove('armed');if(dc)dc.textContent='21'}},8000);})();
// surprise lemon: pops in now and then, click -> referral
(function(){
const P='#e3006e',Y='#ffe62e',PA='#fff7c2';
const shapes=[
 // whole lemon
 `<svg viewBox="0 0 100 100"><path d="M8 52c0-20 19-34 42-34s42 14 42 34-19 34-42 34S8 72 8 52z" fill="${Y}" stroke="${P}" stroke-width="4"/><path d="M90 48l8 4-8 4M10 48l-8 4 8 4" fill="${Y}" stroke="${P}" stroke-width="3" stroke-linejoin="round"/><ellipse cx="34" cy="38" rx="12" ry="5" fill="#fff" opacity=".7"/><path d="M50 18c4-10 14-14 22-12-4 9-12 13-22 12z" fill="${P}"/></svg>`,
 // slice
 `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="${Y}" stroke="${P}" stroke-width="5"/><circle cx="50" cy="50" r="35" fill="${PA}"/>${[...Array(9)].map((_,i)=>{const a=i*40*Math.PI/180,b=(i*40+34)*Math.PI/180;return `<path d="M50 50L${50+33*Math.cos(a)} ${50+33*Math.sin(a)}A33 33 0 0 1 ${50+33*Math.cos(b)} ${50+33*Math.sin(b)}Z" fill="${Y}" stroke="${P}" stroke-width="1.5"/>`}).join('')}<circle cx="50" cy="50" r="4" fill="${P}"/></svg>`,
 // half lemon
 `<svg viewBox="0 0 100 100"><path d="M6 50a44 44 0 0 1 88 0z" fill="${Y}" stroke="${P}" stroke-width="5" stroke-linejoin="round"/><path d="M15 50a35 35 0 0 1 70 0z" fill="${PA}"/>${[0,1,2,3,4].map(i=>{const a=Math.PI+i*Math.PI/5+0.06,b=Math.PI+(i+1)*Math.PI/5-0.06;return `<path d="M50 50L${50+33*Math.cos(a)} ${50+33*Math.sin(a)}A33 33 0 0 1 ${50+33*Math.cos(b)} ${50+33*Math.sin(b)}Z" fill="${Y}" stroke="${P}" stroke-width="1.5"/>`}).join('')}<path d="M4 50h92" stroke="${P}" stroke-width="5" stroke-linecap="round"/><path d="M40 62q10 12 20 0" stroke="${P}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="38" cy="58" r="2.5" fill="${P}"/><circle cx="62" cy="58" r="2.5" fill="${P}"/></svg>`
];
let shown=0;try{shown=+sessionStorage.getItem('jl_zest')||0}catch(e){}
const MAX=3;let el=null,bub=null,hideT=0;
const busy=()=>document.body.classList.contains('menu-open')||!document.getElementById('pop')?.hidden&&document.getElementById('pop')||bub||document.hidden;
function close(){clearTimeout(hideT);if(bub){bub.remove();bub=null}if(el){el.classList.remove('in');const e=el;setTimeout(()=>e.remove(),800);el=null}}
function spawn(){if(shown>=MAX||el||busy())return;shown++;try{sessionStorage.setItem('jl_zest',shown)}catch(e){}
 const side=['l','r','t'][Math.floor(Math.random()*3)];
 el=document.createElement('button');el.type='button';el.className='zest '+side;el.setAttribute('aria-label','A lemon! Know someone for us?');
 el.innerHTML=shapes[Math.floor(Math.random()*shapes.length)];
 if(side==='t'){el.style.left=(20+Math.random()*60)+'vw'}else{el.style.top=(28+Math.random()*34)+'vh'}
 document.body.appendChild(el);requestAnimationFrame(()=>requestAnimationFrame(()=>el&&el.classList.add('in')));
 el.onclick=()=>{clearTimeout(hideT);const r=el.getBoundingClientRect();
  bub=document.createElement('div');bub.className='zbub';bub.setAttribute('role','dialog');bub.setAttribute('aria-label','Referral');
  bub.innerHTML='<button class="zx" type="button" aria-label="Close">×</button><b>You found a lemon!</b><p>Got a referral? Earn €1,000 per placement. Who do you know?</p><div class="zrow"><a href="clients.html#refer">A company</a><a href="candidates.html#refer">A candidate</a></div>';
  document.body.appendChild(bub);const bw=bub.offsetWidth,bh=bub.offsetHeight;
  let x=side==='r'?r.left-bw-12:side==='l'?r.right+12:r.left+r.width/2-bw/2,y=side==='t'?r.bottom+12:r.top+r.height/2-bh/2;
  x=Math.max(16,Math.min(innerWidth-bw-16,x));y=Math.max(16,Math.min(innerHeight-bh-16,y));bub.style.left=x+'px';bub.style.top=y+'px';
  bub.querySelector('.zx').onclick=close;bub.querySelector('a').focus();};
 hideT=setTimeout(()=>{if(!bub)close()},7000);}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(bub||el))close()});
document.addEventListener('click',e=>{if(bub&&!bub.contains(e.target)&&!(el&&el.contains(e.target)))close()});
setTimeout(function loop(){spawn();if(shown<MAX)setTimeout(loop,45000+Math.random()*30000)},20000+Math.random()*10000);
window.__zest=spawn;})();
// reliable jumps to sections, also across pages (hash can get lost in some viewers)
(function(){
const go=(id,smooth)=>{const t=document.getElementById(id);if(!t)return false;const y=t.getBoundingClientRect().top+scrollY-72;scrollTo({top:Math.max(0,y),behavior:smooth?'smooth':'auto'});return true};
document.addEventListener('click',e=>{const a=e.target.closest('a[href*="#"]');if(!a||a.target==='_blank')return;
 const u=new URL(a.getAttribute('href'),location.href),id=decodeURIComponent(u.hash.slice(1));if(!id)return;
 const samePage=u.pathname===location.pathname||(a.getAttribute('href').startsWith('#'));
 if(samePage){if(go(id,true)){e.preventDefault();try{history.replaceState(null,'','#'+id)}catch(_){}}}
 else{try{sessionStorage.setItem('jl_jump',id)}catch(_){}}});
let id='';try{id=sessionStorage.getItem('jl_jump')||'';sessionStorage.removeItem('jl_jump')}catch(_){}
if(!id&&location.hash)id=decodeURIComponent(location.hash.slice(1));
try{history.scrollRestoration='manual'}catch(_){}
if(id){const tryGo=n=>{if(!go(id,false)&&n>0)setTimeout(()=>tryGo(n-1),150)};addEventListener('load',()=>setTimeout(()=>tryGo(5),60));setTimeout(()=>tryGo(5),300)}
else{const top=()=>scrollTo(0,0);top();addEventListener('load',top);setTimeout(top,120);addEventListener('pageshow',top)}
})();
// keep the pink hero video in sync with the yellow one
(function(){const a=document.querySelector('.vhero video.vfull'),b=document.querySelector('.vhero video.vpink');if(!a||!b)return;
const sync=()=>{try{if(Math.abs(b.currentTime-a.currentTime)>0.15)b.currentTime=a.currentTime;if(!a.paused&&b.paused)b.play().catch(()=>{});if(a.paused&&!b.paused)b.pause()}catch(_){}};
a.addEventListener('play',sync);a.addEventListener('pause',()=>b.pause());a.addEventListener('seeked',sync);setInterval(sync,1000);sync();})();

// referral lemon: tap/click toggles the pop-up
(function(){const w=document.querySelector('.wa');if(!w)return;const b=w.querySelector('.wa-phone');
const set=o=>{w.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};
b.addEventListener('click',e=>{e.stopPropagation();set(!w.classList.contains('open'));if(w.classList.contains('open'))w.querySelector('.wa-seg').focus()});
document.addEventListener('click',e=>{if(!w.contains(e.target))set(false)});
w.addEventListener('pointerleave',e=>{if(e.pointerType!=='mouse')return;set(false);w.classList.remove('show');if(w.contains(document.activeElement))document.activeElement.blur()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&w.classList.contains('open')){set(false);b.focus()}});})();
// 3x7 method: loop through the three weeks with a moving runner
(function(){const m=document.querySelector('.method');if(!m)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const wks=[...m.querySelectorAll('.wk')],bars=[...m.querySelectorAll('.track i')],run=m.querySelector('.track .runner'),dc=document.getElementById('dc');
if(wks.length!==3||!run)return;
const SEG=3600,HOLD=1600,T=SEG*3+HOLD;let vis=false,t0=0,last=-1;
try{new IntersectionObserver(e=>{vis=e[0].isIntersecting},{threshold:.2}).observe(m)}catch(_){vis=true}
const start=()=>{m.classList.add('loop');m.classList.remove('armed');m.classList.add('play');t0=performance.now();requestAnimationFrame(tick)};
function tick(now){requestAnimationFrame(tick);if(!vis||document.hidden){t0=now-((now-t0)%T);return}
 const t=(now-t0)%T,p=Math.min(1,t/(SEG*3));
 run.style.left=(p*100)+'%';
 bars.forEach((b,i)=>b.style.setProperty('--f',Math.max(0,Math.min(1,p*3-i))));
 const k=t>=SEG*3?2:Math.floor(t/SEG);if(k!==last){wks.forEach((w,i)=>w.classList.toggle('on',i===k));last=k}
 if(dc)dc.textContent=Math.max(1,Math.ceil(p*21));}
setTimeout(start,2600);})();
// ---- Sign-ups -> Maria's Notion (via a Make.com webhook) ----
// Paste the Make webhook URL between the quotes. Empty = forms work as before, nothing is sent.
const JL_HOOK='';
(function(){if(!JL_HOOK)return;
const page=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'index';
const okOf=f=>f.id==='nlf'?document.getElementById('nlok'):f.id==='popf'?document.getElementById('popok'):f.id==='rp2'?document.getElementById('rdone'):f.querySelector('.ok');
const typeOf=f=>{if(f.id==='nlf'||f.id==='popf')return 'Newsletter';
 if(f.id==='rp2')return 'Referral ('+((document.getElementById('refer')||{}).dataset||{}).path+')';
 if(page==='index'){const w=f.querySelector('input[name=who]:checked');return w?({client:'Company enquiry',candidate:'Candidate sign-up',freelance:'Freelance recruiter application'}[w.value]||w.value):'Contact'}
 return {clients:'Company enquiry',process:'Company enquiry',candidates:'Candidate sign-up',recruiters:'Freelance recruiter application'}[page]||'Contact'};
const labelOf=el=>{const l=el.id&&document.querySelector('label[for="'+el.id+'"]')||el.closest('label');let t=l?l.textContent:(el.placeholder||el.name||el.id);return t.replace(/\s+/g,' ').trim().slice(0,60)};
document.addEventListener('submit',e=>{const f=e.target;if(!f.matches('form'))return;setTimeout(()=>{const ok=okOf(f);if(!ok||ok.hidden)return;
 const d={Type:typeOf(f),Page:page,Submitted:new Date().toISOString()};
 f.querySelectorAll('input,select,textarea').forEach(el=>{if(el.type==='checkbox'||el.type==='radio'||el.type==='submit'||el.type==='hidden'||el.closest('[hidden]'))return;const v=(el.value||'').trim();if(v)d[labelOf(el)]=v});
 const em=f.querySelector('input[type=email]');if(em&&em.value)d.Email=em.value.trim();
 d.Name=d.Name||d['Your name']||d['Full name']||d.Email||'';
 d.Details=Object.entries(d).filter(([k])=>!['Type','Page','Submitted','Details'].includes(k)).map(([k,v])=>k+': '+v).join('\n');
 const body=new URLSearchParams(d);
 try{fetch(JL_HOOK,{method:'POST',mode:'no-cors',body,keepalive:true})}catch(_){try{navigator.sendBeacon(JL_HOOK,body)}catch(__){}}},0)});})();
