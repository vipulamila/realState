// =========== STARS ===========
(function(){
  const s=document.getElementById('stars');
  if(!s) return;
  for(let i=0;i<80;i++){
    const el=document.createElement('div');
    el.className='star';
    const sz=Math.random()*2+.5;
    el.style.cssText=`
      width:${sz}px;height:${sz}px;
      top:${Math.random()*100}%;left:${Math.random()*100}%;
      animation-duration:${3+Math.random()*5}s;
      animation-delay:${Math.random()*5}s;
    `;
    s.appendChild(el);
  }
})();

// =========== DATA ===========
const BROKERS=[
  {name:'Rajesh Sharma',initials:'RS',color:'#4a90e2',rating:'4.9',reviews:128,phone:'+91 98765 43210',email:'rajesh@estatex.in'},
  {name:'Priya Mehta',initials:'PM',color:'#c084fc',rating:'4.8',reviews:94,phone:'+91 99001 23456',email:'priya@estatex.in'},
  {name:'Anil Verma',initials:'AV',color:'#4ade80',rating:'4.7',reviews:76,phone:'+91 91234 56789',email:'anil@estatex.in'},
  {name:'Sunita Rao',initials:'SR',color:'#f87171',rating:'4.9',reviews:210,phone:'+91 87654 32109',email:'sunita@estatex.in'},
  {name:'Vikram Joshi',initials:'VJ',color:'#e8c97a',rating:'4.6',reviews:55,phone:'+91 95555 67890',email:'vikram@estatex.in'},
];

const EMOJIS={House:'🏠',Flat:'🏢',Villa:'🏡',Land:'🌿',Commercial:'🏗️'};

let properties=[
  {id:1,title:'Luxurious 3BHK Sea-View Apartment',type:'Flat',for:'Sale',price:'₹2.8 Cr',loc:'Worli, Mumbai',beds:'3 BHK',baths:2,area:'1850',desc:'Stunning sea-view apartment in one of Mumbai\'s most prestigious towers. Fully furnished, private terrace, 24x7 security, concierge, and world-class amenities.',broker:0,badge:'Sale'},
  {id:2,title:'Independent Villa with Pool',type:'Villa',for:'Sale',price:'₹5.2 Cr',loc:'Whitefield, Bangalore',beds:'4 BHK',baths:4,area:'3200',desc:'Spectacular independent villa with private pool, landscaped garden and smart home automation. Located in a premium gated community.',broker:1,badge:'Sale'},
  {id:3,title:'Spacious 2BHK Ready-to-Move',type:'Flat',for:'Rent',price:'₹38,000/mo',loc:'Koramangala, Bangalore',beds:'2 BHK',baths:2,area:'1100',desc:'Well-maintained apartment in the heart of Koramangala. Walking distance to cafes, IT parks, and metro station.',broker:2,badge:'Rent'},
  {id:4,title:'Prime Commercial Space',type:'Commercial',for:'Sale',price:'₹1.6 Cr',loc:'Connaught Place, Delhi',beds:'N/A',baths:2,area:'2200',desc:'Ground-floor commercial space on a high-footfall street. Ideal for retail, showroom or office. Ample parking.',broker:3,badge:'Sale'},
  {id:5,title:'Agricultural Land 5 Acres',type:'Land',for:'Sale',price:'₹95 L',loc:'Nashik, Maharashtra',beds:'N/A',baths:0,area:'217800',desc:'Fertile 5-acre agricultural land with water source, road access and clear title. Perfect for farming or a weekend farmhouse project.',broker:4,badge:'Sale'},
  {id:6,title:'Cosy 1BHK Near Metro',type:'Flat',for:'Rent',price:'₹18,500/mo',loc:'Andheri East, Mumbai',beds:'1 BHK',baths:1,area:'560',desc:'Compact and well-lit flat near Andheri metro. Ideal for young professionals. Fully equipped modular kitchen.',broker:0,badge:'Rent'},
  {id:7,title:'Traditional Bungalow — Heritage Area',type:'House',for:'Sale',price:'₹1.2 Cr',loc:'Gandhinagar, Gujarat',beds:'4 BHK',baths:3,area:'2600',desc:'Charming heritage bungalow with courtyard, original teak woodwork, and spacious rooms. A rare find in prime location.',broker:1,badge:'Sale'},
  {id:8,title:'Residential Plot — DMIC Zone',type:'Land',for:'Sale',price:'₹55 L',loc:'Dholera SIR, Gujarat',beds:'N/A',baths:0,area:'3000',desc:'NA-approved residential plot in the rapidly developing DMIC corridor. Clear title, paved roads, all utilities nearby.',broker:2,badge:'Sale'},
  {id:9,title:'Penthouse with City Views',type:'Flat',for:'Sale',price:'₹4.1 Cr',loc:'Banjara Hills, Hyderabad',beds:'4 BHK',baths:4,area:'3800',desc:'Exclusive penthouse with 360° city views, private terrace, home theatre and designer interiors.',broker:3,badge:'Sale'},
];

let currentFilter='all';
let listTab='Buy';

// =========== RENDER ===========
function renderCards(list){
  const grid=document.getElementById('propGrid');
  if(!grid) return;
  grid.innerHTML='';
  if(!list.length){
    grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--white-dim)"><div style="font-size:3rem;margin-bottom:1rem">🔍</div><p style="font-size:1rem">No properties found. Try adjusting filters.</p></div>';
    return;
  }
  list.forEach((p,i)=>{
    const b=BROKERS[p.broker];
    const card=document.createElement('div');
    card.className='prop-card';
    card.style.animationDelay=(i*0.07)+'s';
    const emoji=EMOJIS[p.type]||'🏠';
    const badgeClass=p.badge==='Rent'?'badge-rent':p.badge==='Sold'?'badge-sold':'badge-sale';
    card.innerHTML=`
      <div class="card-img">
        <div class="img-placeholder">${emoji}</div>
        <div class="card-badge ${badgeClass}">For ${p.badge}</div>
        <div class="card-fav" id="fav${p.id}" onclick="toggleFav(event,${p.id})">♡</div>
        <div class="card-type-tag">${p.type}</div>
      </div>
      <div class="card-body">
        <div class="card-price">${p.price}${p.for==='Rent'&&!p.price.includes('mo')?'<span class="period">/mo</span>':''}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.loc}
        </div>
        <div class="card-features">
          ${p.beds&&p.beds!=='N/A'?`<div class="feat-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M22 4v16M2 12h20M2 8h4M18 8h4"/></svg>${p.beds}</div>`:''}
          ${p.baths>0?`<div class="feat-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 9 2M15 6V2M4 10h16l-2 8H6z"/></svg>${p.baths} Bath</div>`:''}
          <div class="feat-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>${Number(p.area).toLocaleString()} sqft</div>
        </div>
        <div class="card-broker">
          <div class="broker-info">
            <div class="broker-avatar" style="background:${b.color}20;border-color:${b.color}40;color:${b.color}">${b.initials}</div>
            <div class="broker-name">${b.name} · ⭐ ${b.rating}</div>
          </div>
          <button class="contact-btn" onclick="openDetail(${p.id})">View & Contact</button>
        </div>
      </div>`;
    card.addEventListener('click',function(e){if(!e.target.closest('.contact-btn')&&!e.target.closest('.card-fav'))openDetail(p.id)});
    grid.appendChild(card);
  });
}

function getFiltered(){
  return properties.filter(p=>{
    if(currentFilter==='all')return true;
    if(currentFilter==='Sale')return p.for==='Sale';
    if(currentFilter==='Rent')return p.for==='Rent';
    return p.type===currentFilter;
  });
}

function filterProps(el,f){
  currentFilter=f;
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  renderCards(getFiltered());
}

function clearFilters(){
  currentFilter='all';
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('on'));
  document.querySelector('[data-filter="all"]').classList.add('on');
  renderCards(properties);
}

function setListTab(el,tab){
  listTab=tab;
  document.querySelectorAll('.s-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
}

function applySearch(){
  const loc=document.getElementById('searchLoc').value.toLowerCase();
  const type=document.getElementById('searchType').value;
  const budget=document.getElementById('searchBudget').value;
  let filtered=properties.filter(p=>{
    if(loc&&!p.loc.toLowerCase().includes(loc)&&!p.title.toLowerCase().includes(loc))return false;
    if(type&&p.type!==type.replace(' / Plot',''))return false;
    return true;
  });
  currentFilter='all';
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('on'));
  document.querySelector('[data-filter="all"]').classList.add('on');
  renderCards(filtered);
  document.getElementById('listings').scrollIntoView({behavior:'smooth'});
  showToast('🔍',`Found ${filtered.length} properties`,'success');
}

// =========== DETAIL MODAL ===========
function openDetail(id){
  const p=properties.find(x=>x.id===id);
  if(!p)return;
  const b=BROKERS[p.broker];
  const emoji=EMOJIS[p.type]||'🏠';
  document.getElementById('dm-heading').textContent=p.type+' Details';
  document.getElementById('detailBody').innerHTML=`
    <div style="width:100%;height:220px;border-radius:14px;background:linear-gradient(135deg,rgba(74,144,226,0.12),rgba(192,132,252,0.1));display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:1.25rem;border:1px solid rgba(255,255,255,0.07)">${emoji}</div>
    <div class="detail-price">${p.price}</div>
    <div class="detail-title">${p.title}</div>
    <div class="detail-loc">📍 ${p.loc} &nbsp;·&nbsp; For ${p.for}</div>
    <div class="detail-features">
      ${p.beds&&p.beds!=='N/A'?`<div class="detail-feat"><span>🛏️</span><span>${p.beds}</span></div>`:''}
      ${p.baths>0?`<div class="detail-feat"><span>🚿</span><span>${p.baths} Bath</span></div>`:''}
      <div class="detail-feat"><span>📐</span><span>${Number(p.area).toLocaleString()} sqft</span></div>
      <div class="detail-feat"><span>🏷️</span><span>${p.type}</span></div>
    </div>
    <div class="detail-desc">${p.desc}</div>
    <div style="font-size:.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--white-dim);margin-bottom:.75rem;font-weight:600">Broker / Agent</div>
    <div class="broker-card">
      <div class="avatar" style="background:${b.color}20;color:${b.color}">${b.initials}</div>
      <div class="info">
        <h4>${b.name}</h4>
        <p>Verified Real Estate Broker</p>
        <p style="font-size:.78rem;color:var(--white-dim);margin-top:.1rem">${b.email}</p>
      </div>
      <div class="rating">
        <span>⭐ ${b.rating}</span>
        <small>${b.reviews} reviews</small>
      </div>
    </div>
    <div style="font-size:.8rem;text-transform:uppercase;letter-spacing:1px;color:var(--white-dim);margin-bottom:.75rem;font-weight:600">Get In Touch</div>
    <div class="contact-methods">
      <button class="contact-method" onclick="contactBroker('call','${b.phone}','${b.name}')">
        <div>📞</div><span>${b.phone}</span><p>Call Now</p>
      </button>
      <button class="contact-method" onclick="contactBroker('chat','${b.phone}','${b.name}')">
        <div>💬</div><span>WhatsApp</span><p>Send Message</p>
      </button>
      <button class="contact-method" onclick="contactBroker('email','${b.email}','${b.name}')">
        <div>✉️</div><span>Email</span><p>${b.email.split('@')[0]}…</p>
      </button>
    </div>
    <div style="margin-top:1rem;display:flex;gap:.75rem">
      <button class="form-submit" style="background:linear-gradient(135deg,var(--gold),#c9a84c);color:#000" onclick="showToast('📅','Site visit request sent!','success');closeModal('detailModal')">Schedule Site Visit</button>
    </div>
  `;
  openModal('detailModal');
}

function contactBroker(method,val,name){
  if(method==='call'){window.location.href='tel:'+val;showToast('\uD83D\uDCDE','Calling '+name+'\u2026','success');}
  else if(method==='chat'){var num=val.replace(/\D/g,'');window.open('https://wa.me/'+num+'?text=Hi%2C+I+am+interested+in+the+property.','_blank');showToast('\uD83D\uDCAC','Opening WhatsApp for '+name+'\u2026','success');}
  else{window.location.href='mailto:'+val;showToast('\u2709\uFE0F','Opening email for '+name,'success');}
}

// =========== FAV ===========
const favSet=new Set();
function toggleFav(e,id){
  e.stopPropagation();
  const el=document.getElementById('fav'+id);
  if(!el) return;
  if(favSet.has(id)){favSet.delete(id);el.textContent='♡';el.classList.remove('liked');showToast('💔','Removed from favourites','info')}
  else{favSet.add(id);el.textContent='♥';el.classList.add('liked');showToast('❤️','Added to favourites!','success')}
}

// =========== SUBMIT PROPERTY ===========
function submitProperty(){
  const title=document.getElementById('pTitle').value.trim();
  const type=document.getElementById('pType').value;
  const forVal=document.getElementById('pFor').value;
  const price=document.getElementById('pPrice').value.trim();
  const loc=document.getElementById('pLocation').value.trim();
  const owner=document.getElementById('pOwner').value.trim();
  if(!title||!type||!forVal||!price||!loc||!owner){
    showToast('⚠️','Please fill all required fields','danger');return;
  }
  const newProp={
    id:Date.now(),title,type,for:forVal,
    price:price.startsWith('₹')?price:'₹'+price,
    loc,beds:document.getElementById('pBed').value,
    baths:1,area:document.getElementById('pArea').value||'N/A',
    desc:document.getElementById('pDesc').value||'Property listed by owner.',
    broker:Math.floor(Math.random()*BROKERS.length),
    badge:forVal,
  };
  properties.unshift(newProp);
  const pc = document.getElementById('propCount');
  if(pc) pc.textContent=(properties.length)+'+ ';
  closeModal('addModal');
  renderCards(getFiltered());
  document.getElementById('listings').scrollIntoView({behavior:'smooth'});
  showToast('🎉','Property listed successfully!','success');
  ['pTitle','pType','pFor','pPrice','pLocation','pOwner','pPhone','pEmail','pArea','pDesc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
}

// =========== MODAL HELPERS ===========
function openModal(id){
  const m = document.getElementById(id);
  if(m) {
    m.classList.add('open');
    document.body.style.overflow='hidden';
  }
}
function closeModal(id){
  const m = document.getElementById(id);
  if(m) {
    m.classList.remove('open');
    document.body.style.overflow='';
  }
}
document.querySelectorAll('.modal-overlay').forEach(o=>o.addEventListener('click',function(e){if(e.target===this)closeModal(this.id)}));

// =========== TOAST ===========
let toastTimer;
function showToast(icon,text,type){
  const t=document.getElementById('toast');
  if(!t) return;
  const border=type==='success'?'rgba(74,222,128,0.3)':type==='danger'?'rgba(248,113,113,0.3)':'rgba(255,255,255,0.12)';
  t.style.borderColor=border;
  document.getElementById('toastIcon').textContent=icon;
  document.getElementById('toastText').textContent=text;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3000);
}

// =========== SCROLL HELPER ===========
function navTo(e,sel){
  if(e && e.preventDefault) e.preventDefault();
  const el = document.querySelector(sel);
  if(el){
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  return false;
}

// =========== MOBILE NAV ===========
function toggleMobileNav(){
  const mn = document.getElementById('mobileNav');
  if(mn) mn.classList.toggle('open');
}

// =========== INTERSECTION OBSERVER ===========
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.1});
document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

// =========== FILTER BY CATEGORY ===========
function filterTo(forVal,typeVal){
  if(typeVal)currentFilter=typeVal;
  else if(forVal==='Sale')currentFilter='Sale';
  else if(forVal==='Rent')currentFilter='Rent';
  else currentFilter='all';
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('on'));
  var chip=document.querySelector('[data-filter="'+currentFilter+'"]');
  if(chip)chip.classList.add('on');
  else {
    const allChip = document.querySelector('[data-filter="all"]');
    if(allChip) allChip.classList.add('on');
  }
  renderCards(getFiltered());
  navTo(null,'#listings');
}

// =========== SIGN IN ===========
function handleSignIn(){
  var email=document.getElementById('siEmail').value.trim();
  var pass=document.getElementById('siPass').value;
  if(!email||!pass){showToast('⚠️','Please fill in email and password','danger');return;}
  closeModal('signInModal');
  const bsi = document.getElementById('btnSignIn');
  if(bsi) bsi.textContent=email.split('@')[0];
  showToast('👋','Welcome back! You are now signed in.','success');
}

// =========== RENDER BROKERS ===========
function renderBrokers(){
  var grid=document.getElementById('brokersGrid');
  if(!grid)return;
  grid.innerHTML=BROKERS.map(function(b){
    return '<div class="hiw-card fade-in" style="text-align:left">'+
      '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem">'+
      '<div style="width:52px;height:52px;border-radius:50%;background:'+b.color+'20;border:2px solid '+b.color+'40;color:'+b.color+';display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:600;flex-shrink:0">'+b.initials+'</div>'+
      '<div><div style="font-weight:600;font-size:.95rem">'+b.name+'</div><div style="font-size:.78rem;color:var(--white-dim)">Verified Broker</div></div>'+
      '<div style="margin-left:auto;text-align:right"><div style="color:var(--gold);font-size:.88rem">⭐ '+b.rating+'</div><div style="font-size:.75rem;color:var(--white-dim)">'+b.reviews+' reviews</div></div>'+
      '</div>'+
      '<div style="display:flex;gap:.5rem">'+
      '<a href="tel:'+b.phone+'" class="contact-btn" style="flex:1;text-align:center;text-decoration:none" onclick="showToast(\'📞\',\'Calling '+b.name+'\',\'success\')">&#128222; Call</a>'+
      '<a href="mailto:'+b.email+'" class="contact-btn" style="flex:1;text-align:center;text-decoration:none" onclick="showToast(\'\u2709\uFE0F\',\'Opening email for '+b.name+'\',\'success\')">&#9993; Email</a>'+
      '</div></div>';
  }).join('');
  document.querySelectorAll('#brokersGrid .fade-in').forEach(function(el){io.observe(el);});
}

// =========== INIT ===========
if(document.getElementById('propGrid')) renderCards(properties);
if(document.getElementById('brokersGrid')) renderBrokers();
