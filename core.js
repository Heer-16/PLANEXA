function initState() {
  if(_storeReady) return;   // already initialized — do not reset!
  _storeReady = true;
  EVTS = JSON.parse(JSON.stringify(EVENTS_SEED));
  // Deep clone SEED_REGS but enforce: pending events have 0 registrations
  const rawRegs = JSON.parse(JSON.stringify(SEED_REGS));
  const pendingIds = EVENTS_SEED.filter(e=>e.status==="pending").map(e=>e.id);
  REGS = {};
  EVENTS_SEED.forEach(e=>{
    REGS[e.id] = pendingIds.includes(e.id) ? [] : (rawRegs[e.id]||[]);
  });
  WAIT = { e4: ["nitin@scet.ac.in","ananya@scet.ac.in"], e3: [], e5: [], e10: [], e13: ["deepak@scet.ac.in","ishaan@scet.ac.in"], e14: [] };
  pendingIds.forEach(id=>{ WAIT[id]=[]; });
  // Ensure all event IDs have WAIT entries
  EVENTS_SEED.forEach(e=>{ if(!WAIT[e.id]) WAIT[e.id]=[]; });

  // Auto-mark payments as paid for past events' attended participants
  const now = new Date();
  EVENTS_SEED.filter(e=>!e.free&&e.status==="approved"&&new Date(e.date)<now).forEach(ev=>{
    if(!PAYMENTS[ev.id]) PAYMENTS[ev.id]={};
    const attended=ATTENDANCE[ev.id]||[];
    const organizers=(ev.organizers||[ev.orgId]);
    attended.forEach(email=>{
      if(!PAYMENTS[ev.id][email]){
        if(organizers.includes(email)){
          PAYMENTS[ev.id][email]={status:"waived",method:null,amount:0,date:ev.date};
        } else {
          // Assign random method for realism
          let h=0; for(let i=0;i<email.length;i++){h=Math.imul(31,h)+email.charCodeAt(i)|0;} h=Math.abs(h);
          PAYMENTS[ev.id][email]={status:"paid",method:h%2===0?"online":"cash",amount:ev.price,date:ev.date};
        }
      } else if(PAYMENTS[ev.id][email].status==="pending"&&!organizers.includes(email)){
        // Fix any still-pending entries for past events
        let h=0; for(let i=0;i<email.length;i++){h=Math.imul(31,h)+email.charCodeAt(i)|0;} h=Math.abs(h);
        PAYMENTS[ev.id][email]={status:"paid",method:h%2===0?"online":"cash",amount:ev.price,date:ev.date};
      }
    });
  });

  // Seed feedback notifications for past events (events whose date is in the past)
  EVENTS_SEED.filter(e=>new Date(e.date)<now && e.status==="approved").forEach(ev=>{
    (REGS[ev.id]||[]).forEach(email=>{
      const alreadyGiven = (FEEDBACK[ev.id]||[]).some(f=>f.email===email);
      if(!alreadyGiven && !USER_NOTIFS[email]?.some(n=>n.text.includes("feedback")&&n.text.includes(ev.title))){
        if(!USER_NOTIFS[email]) USER_NOTIFS[email]=[];
        USER_NOTIFS[email].push({dot:true, text:`⭐ Share your feedback for "${ev.title}" — it only takes a minute!`, time:"1 day ago", type:"ye"});
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const fmt = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
const fmtLong = d => new Date(d).toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const pct = (a,b) => Math.min(100,Math.round(a/b*100));
const capColor = p => p>=100?"#EF4444":p>=80?"#F97316":"#7C3AED";
const av2grad = s => { const h=[["#7C3AED","#EC4899"],["#EC4899","#F97316"],["#F97316","#EAB308"],["#0EA5E9","#7C3AED"],["#10B981","#0EA5E9"]]; return h[(s.charCodeAt(0)+s.charCodeAt(1))%h.length]; };
const gradCss = s => { const g=av2grad(s); return `linear-gradient(135deg,${g[0]},${g[1]})`; };
const destroyCharts = () => { Object.values(charts).forEach(c=>{try{c.destroy()}catch(e){}});charts={}; };

function capBar(reg,cap,cls=""){
  const p=pct(reg,cap);
  return `<div class="cap-bar-row"><span>${reg}/${cap} registered</span><span style="color:${capColor(p)};font-weight:700">${p>=100?"🔴 Full":`${cap-reg} spots left`}</span></div>
  <div class="cap-bar ${cls}"><div class="cap-fill" style="width:${p}%;background:${capColor(p)}"></div></div>`;
}

// ── REAL QR CODE ENGINE (qrcode.js) ──────────────────────────
let _qrSeq = 0;

// Renders a real QR code into element with given id after it's in the DOM
function _renderQR(id, seed, sizePx) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el || !window.QRCode) return;
    el.innerHTML = '';
    try {
      new QRCode(el, {
        text: (seed || 'PLANEXA').slice(0, 200), // QR has data limit
        width: sizePx,
        height: sizePx,
        colorDark: '#1a1240',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
      // Clean up QRCode.js styling artifacts
      const img = el.querySelector('img');
      if (img) { img.style.cssText = 'display:block;margin:0 auto;border:none;max-width:100%'; }
      const cvs = el.querySelector('canvas');
      if (cvs) { cvs.style.cssText = 'display:block;margin:0 auto;border:none;max-width:100%'; }
    } catch(e) { el.innerHTML = '<div style="font-size:9px;color:#9e94b0;padding:4px">QR</div>'; }
  }, 80);
}

// Inline QR placeholder (used inside template literals) — size param = cell size in px
function qrHTML(seed, size = 14) {
  const id = 'qr-' + (++_qrSeq) + '-' + Math.random().toString(36).slice(2, 5);
  const px = Math.max(56, size * 7);
  _renderQR(id, seed, px);
  return `<div id="${id}" style="width:${px}px;height:${px}px;overflow:hidden;flex-shrink:0;background:#f8f6fb;border-radius:4px;display:flex;align-items:center;justify-content:center"><span style="font-size:8px;color:#b0a8c0">QR</span></div>`;
}

// Larger standalone QR block — sizePx = total pixel width/height of QR image
function qrDiv(seed, sizePx = 120) {
  const id = 'qrd-' + (++_qrSeq) + '-' + Math.random().toString(36).slice(2, 5);
  _renderQR(id, seed, sizePx);
  return `<div id="${id}" style="width:${sizePx}px;height:${sizePx}px;overflow:hidden;flex-shrink:0;background:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;margin:0 auto"><span style="font-size:9px;color:#b0a8c0">loading…</span></div>`;
}


// Larger standalone QR — returns a self-contained div that renders a real QR code
function qrDiv(seed, sizePx=120){
  const id="qrd-"+(_qrSeq++)+"-"+Math.random().toString(36).slice(2,6);
  setTimeout(()=>{
    const el=document.getElementById(id);
    if(!el||!window.QRCode) return;
    el.innerHTML="";
    try {
      new QRCode(el,{text:seed||"PLANEXA",width:sizePx,height:sizePx,colorDark:"#1a1240",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M});
      const img=el.querySelector("img"); if(img) img.style.cssText="display:block;border:none;margin:0 auto";
      const canvas=el.querySelector("canvas"); if(canvas) canvas.style.cssText="display:block;border:none;margin:0 auto";
    } catch(e){ el.innerHTML=`<div style="font-size:10px;color:#9e94b0;padding:8px">QR</div>`; }
  }, 60);
  return `<div id="${id}" style="width:${sizePx}px;height:${sizePx}px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#9e94b0;overflow:hidden">…</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   FIREBASE REAL-TIME SYNC
   ═══════════════════════════════════════════════════════════════ */
async function firebaseRegister(eventId, userEmail) {
  if(!window.FB?.OK) return;
  try {
    const { db,doc,updateDoc,arrayUnion,collection,addDoc,setDoc,serverTimestamp } = window.FB;
    // add to registrations subcollection
    await setDoc(doc(db,`registrations/${eventId}_${userEmail}`),{
      eventId, email:userEmail, registeredAt:serverTimestamp()
    });
    // increment event registered count
    await updateDoc(doc(db,"events",eventId),{ registered:window.FB.increment(1) });
  } catch(e){ console.warn("FB reg error:",e.message); }
}

async function firebaseUnregister(eventId, userEmail) {
  if(!window.FB?.OK) return;
  try {
    const { db,doc,deleteDoc,updateDoc,increment } = window.FB;
    await deleteDoc(doc(db,`registrations/${eventId}_${userEmail}`));
    await updateDoc(doc(db,"events",eventId),{ registered:increment(-1) });
  } catch(e){ console.warn("FB unreg error:",e.message); }
}

async function firebaseSaveEvent(ev) {
  if(!window.FB?.OK) return;
  try {
    const { db,doc,setDoc } = window.FB;
    await setDoc(doc(db,"events",ev.id),ev);
  } catch(e){ console.warn("FB save error:",e.message); }
}

/* Live listener for registrations of one event */
function listenEventRegs(eventId, onUpdate) {
  if(!window.FB?.OK) return;
  try {
    const { db,collection,query,where,onSnapshot } = window.FB;
    const q = query(collection(db,"registrations"),where("eventId","==",eventId));
    const unsub = onSnapshot(q,snap=>{
      const emails = snap.docs.map(d=>d.data().email);
      onUpdate(emails);
    });
    unsubscribers.push(unsub);
  } catch(e){}
}

function stopListeners(){ unsubscribers.forEach(u=>u&&u()); unsubscribers=[]; }

/* ═══════════════════════════════════════════════════════════════
   AUTH
   ═══════════════════════════════════════════════════════════════ */
const DEMO_TILES = [
  {role:"admin", icon:"🏛️", label:"Admin – Dr. Priya Nair",        email:"admin@scet.ac.in",  pw:"admin123", bg:"rgba(124,58,237,.25)"},
  {role:"admin", icon:"🏛️", label:"Admin – Dr. Ramesh Kulkarni",   email:"admin2@scet.ac.in", pw:"admin234", bg:"rgba(91,33,182,.25)"},
  {role:"both",  icon:"🎓", label:"Arjun Mehta (Org+Participant)",  email:"arjun@scet.ac.in",  pw:"arjun123", bg:"rgba(16,185,129,.25)"},
  {role:"both",  icon:"🎓", label:"Divya Sharma (Org+Participant)", email:"divya@scet.ac.in",  pw:"divya123", bg:"rgba(14,165,233,.25)"},
  {role:"both",  icon:"🎓", label:"Rohan Patel (Org+Participant)",  email:"rohan@scet.ac.in",  pw:"rohan123", bg:"rgba(234,179,8,.25)"},
];

function buildLoginTiles(){
  $("demo-tiles").innerHTML = DEMO_TILES.map(t=>`
    <div class="demo-tile" onclick="quickLogin('${t.email}','${t.pw}')" style="cursor:pointer" title="Click to sign in as ${t.label}">
      <div class="demo-tile-icon" style="background:${t.bg}">${t.icon}</div>
      <div>
        <div class="demo-tile-name">${t.label}</div>
        <div class="demo-tile-cred">${t.email} · ${t.pw}</div>
      </div>
      <div style="margin-left:auto;color:rgba(255,255,255,.45);font-size:11px;white-space:nowrap">tap to sign in →</div>
    </div>`).join("");
}

// One-tap sign-in from demo tile: fills credentials and immediately logs in
function quickLogin(email, pw){
  $("l-email").value = email;
  $("l-pass").value = pw;
  $("l-err").classList.add("hidden");
  // Small visual delay so user sees the fill, then login fires
  const btn = $("l-btn");
  btn.textContent = "Signing in…";
  btn.disabled = true;
  setTimeout(login, 300);
}

function fillLogin(e,p){ $("l-email").value=e; $("l-pass").value=p; $("l-err").classList.add("hidden"); }

function login(){
  const email=$("l-email").value.trim(), pass=$("l-pass").value;
  const btn=$("l-btn"), err=$("l-err");
  btn.textContent="Signing in…"; btn.disabled=true;
  setTimeout(()=>{
    const u=USERS[email];
    if(u && u.pw===pass){
      CU={email,...u};
      err.classList.add("hidden");
      // Try Firebase auth (non-blocking)
      if(window.FB?.OK) window.FB.signInWithEmailAndPassword(window.FB.auth,email,pass).catch(()=>{});
      startApp();
    } else {
      err.textContent="Invalid credentials. Click a demo tile above to fill them in.";
      err.classList.remove("hidden");
      btn.textContent="Sign In →"; btn.disabled=false;
    }
  },500);
}

function logout(){
  stopListeners(); CU=null;
  $("pg-login").style.display="flex"; $("app").style.display="none";
  $("l-email").value=""; $("l-pass").value="";
  $("l-btn").textContent="Sign In →"; $("l-btn").disabled=false;
}

/* ═══════════════════════════════════════════════════════════════
   APP START
   ═══════════════════════════════════════════════════════════════ */
const ROLE_LABELS = {admin:"Admin",organizer:"Event Organizer",participant:"Student",both:"Organiser & Participant"};
const NAV_MAP = {
  admin:       [{id:"adm-dash",ico:"📊",lbl:"Dashboard"},{id:"adm-events",ico:"📅",lbl:"All Events"},{id:"adm-venues",ico:"🏛️",lbl:"Venues"},{id:"adm-analytics",ico:"📈",lbl:"Analytics"},{id:"adm-organizers",ico:"👥",lbl:"Organizers"},{id:"adm-todos",ico:"✅",lbl:"My To-Do"},{id:"adm-feedback",ico:"⭐",lbl:"Feedback"},{id:"adm-discover",ico:"🔍",lbl:"Discover Events"}],
  organizer:   [{id:"org-dash",ico:"📊",lbl:"Dashboard"},{id:"org-events",ico:"🎪",lbl:"My Events"},{id:"org-create",ico:"➕",lbl:"Create Event"},{id:"org-analytics",ico:"📈",lbl:"Analytics"},{id:"org-messages",ico:"💬",lbl:"Messages"},{id:"org-feedback",ico:"⭐",lbl:"Feedback"},{id:"discover",ico:"🔍",lbl:"Discover Events"}],
  participant: [{id:"discover",ico:"🔍",lbl:"Discover"},{id:"my-regs",ico:"🎟️",lbl:"My Registrations"},{id:"calendar",ico:"📅",lbl:"Calendar"},{id:"profile",ico:"👤",lbl:"Profile"}],
  both:        [{id:"org-dash",ico:"📊",lbl:"Organiser Dashboard"},{id:"org-events",ico:"🎪",lbl:"My Events"},{id:"org-create",ico:"➕",lbl:"Create Event"},{id:"org-feedback",ico:"⭐",lbl:"Feedback"},{id:"discover",ico:"🔍",lbl:"Discover Events"},{id:"my-regs",ico:"🎟️",lbl:"My Registrations"},{id:"profile",ico:"👤",lbl:"Profile"}],
};
const TITLES = {
  "adm-dash":"Dashboard","adm-events":"Event Management","adm-venues":"Venue Management",
  "adm-analytics":"Analytics & Insights","adm-organizers":"Organizer Directory","adm-todos":"My To-Do List","adm-feedback":"Feedback Analysis","adm-discover":"Discover Events",
  "org-dash":"Organizer Dashboard","org-events":"My Events","org-create":"Create Event",
  "org-analytics":"Analytics","org-messages":"Participant Messages","org-feedback":"Feedback Analysis",
  "discover":"Discover Events","my-regs":"My Registrations","calendar":"Event Calendar","profile":"My Profile",
  "ev-detail":"Event Details","venue-detail":"Venue Details","p-detail":"Participant Profile",
  "ev-participants":"Event Participants","ev-analytics":"Event Analytics","ev-chat":"Event Chat","ev-feedback":"Feedback","p-org-chat":"Chat with Organiser","ev-team":"Team & Work Status","ev-payments":"Payment Dashboard","venue-calendar":"Venue Calendar",
};

function startApp(){
  $("pg-login").style.display="none";
  $("app").style.display="flex";
  const u=CU;
  $("sb-av").textContent      = u.av;
  $("tb-av").textContent      = u.av;
  $("sb-uname").textContent   = u.name;
  $("tb-uname").textContent   = u.name;
  $("sb-uni").textContent     = u.uni||"";
  buildNav(); buildNotifs();
  const def={admin:"adm-dash",organizer:"org-dash",participant:"discover",both:"org-dash"};
  go(def[u.role]);
}

function buildNav(){
  const items=NAV_MAP[CU.role];
  $("sb-nav").innerHTML=`<div class="nav-sec">Main Menu</div>`+
    items.map(n=>{
      // Add unread badge for messages nav
      let badge="";
      if(n.id==="org-messages"){
        const myEvIds=EVTS.filter(e=>(e.organizers||[e.orgId]).includes(CU.email)).map(e=>e.id);
        const unread=Object.keys(CHATS).filter(k=>k.startsWith("porgchat_")&&myEvIds.includes(k.split("_")[1])).reduce((s,k)=>{
          return s+(CHATS[k]||[]).filter(m=>m.from!==CU.email).length;
        },0);
        if(unread>0) badge=`<span style="background:var(--re);color:#fff;border-radius:99px;padding:1px 6px;font-size:9px;font-weight:800;margin-left:auto">${unread}</span>`;
      }
      return `<div class="ni" id="ni-${n.id}" onclick="go('${n.id}')"><div class="nico">${n.ico}</div><span>${n.lbl}</span>${badge}</div>`;
    }).join("");
}

function setNavActive(id){
  document.querySelectorAll(".ni").forEach(el=>el.classList.remove("on"));
  const el=$("ni-"+id); if(el)el.classList.add("on");
}

/* ═══════════════════════════════════════════════════════════════
   ROUTER
   ═══════════════════════════════════════════════════════════════ */
function showEventParticipantChats(evId){
  const ev=EVTS.find(e=>e.id===evId); if(!ev)return;
  const regs=(REGS[evId]||[]).filter(e=>!(ev.organizers||[ev.orgId]).includes(e));

  // Collect existing threads for this event
  const threads=[];
  Object.keys(CHATS).forEach(key=>{
    if(!key.startsWith("porgchat_"+evId+"_")) return;
    const partEmail=key.slice(("porgchat_"+evId+"_").length);
    const msgs=CHATS[key]||[];
    if(!msgs.length) return;
    const pInfo=PARTICIPANTS_DB[partEmail]||{name:partEmail.split("@")[0],av:"??"};
    const last=msgs[msgs.length-1];
    threads.push({partEmail,pInfo,last,count:msgs.length});
  });

  // Build modal HTML using string concat (no nested template literals)
  let html="<div>";

  if(threads.length){
    html+="<div class='sec-title' style='margin-bottom:8px'>Active Conversations</div>";
    threads.forEach(t=>{
      const av=(t.pInfo.av||"??").toUpperCase().slice(0,2);
      const gc=gradCss(av);
      const safe=t.partEmail.replace(/'/g,"");
      html+="<div class='card card-click' style='padding:11px;margin-bottom:7px;display:flex;align-items:center;gap:10px' "
           +"data-eid='"+evId+"' data-pe='"+safe+"' onclick='closeModal();openChatWithParticipant(this.dataset.eid,this.dataset.pe)'>"
           +"<div style='width:38px;height:38px;border-radius:10px;background:"+gc
           +";display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:13px;flex-shrink:0'>"+av+"</div>"
           +"<div style='flex:1;min-width:0'>"
           +"<div style='font-weight:700;font-size:13px'>"+t.pInfo.name+"</div>"
           +"<div style='font-size:11px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap'>"+t.last.text.slice(0,50)+"</div>"
           +"</div>"
           +"<div style='text-align:right;flex-shrink:0'>"
           +"<div style='font-size:10px;color:var(--t3)'>"+t.last.time+"</div>"
           +"<span class='b b-p' style='font-size:10px'>"+t.count+" msg</span>"
           +"</div></div>";
    });
    html+="<div style='height:1px;background:var(--bdr);margin:10px 0'></div>";
  }

  // All registered participants (excluding organisers) for starting new chats
  html+="<div class='sec-title' style='margin-bottom:8px'>Start Chat with Participant</div>";
  const shown=regs.slice(0,30);
  if(shown.length){
    shown.forEach(email=>{
      const alreadyOpen=threads.some(t=>t.partEmail===email);
      const pInfo=PARTICIPANTS_DB[email]||{name:email.split("@")[0],av:"??"};
      const av=(pInfo.av||"??").toUpperCase().slice(0,2);
      const gc=gradCss(av);
      const safe=email.replace(/'/g,"");
      html+="<div class='card card-click' style='padding:9px 11px;margin-bottom:6px;display:flex;align-items:center;gap:9px' "
           +"data-eid='"+evId+"' data-pe='"+safe+"' onclick='closeModal();openChatWithParticipant(this.dataset.eid,this.dataset.pe)'>"
           +"<div style='width:32px;height:32px;border-radius:8px;background:"+gc
           +";display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:11px;flex-shrink:0'>"+av+"</div>"
           +"<div style='flex:1'>"
           +"<div style='font-weight:600;font-size:12px'>"+pInfo.name+"</div>"
           +"<div style='font-size:10px;color:var(--t3)'>"+email+"</div>"
           +"</div>"
           +(alreadyOpen?"<span class='b b-p' style='font-size:10px'>Chatting</span>":"<span class='b b-g' style='font-size:10px'>Start →</span>")
           +"</div>";
    });
  } else {
    html+="<div style='text-align:center;padding:16px;color:var(--t3);font-size:13px'>No participants registered yet.</div>";
  }
  html+="</div>";

  openModal("💬 Participant Chats — "+ev.emoji+" "+ev.title, html,
    [{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]);
}

function openChatWithParticipant(evId, participantEmail){
  go("p-org-chat", true, {evId:evId, participantEmail:participantEmail, orgEmail:CU.email});
}

function buildParticipantMsgsPanel(){
  const myEvIds=EVTS.filter(e=>(e.organizers||[e.orgId]).includes(CU.email)).map(e=>e.id);
  const threads=[];
  Object.keys(CHATS).forEach(key=>{
    if(key.startsWith("porgchat_")){
      const parts=key.split("_");
      const evId=parts[1];
      const partEmail=parts.slice(2).join("_");
      if(myEvIds.includes(evId)&&partEmail!==CU.email&&(CHATS[key]||[]).length>1){
        const ev2=EVTS.find(e=>e.id===evId);
        const pInfo=PARTICIPANTS_DB[partEmail]||{name:partEmail.split("@")[0],av:"??"};
        const lastMsg=CHATS[key][CHATS[key].length-1];
        threads.push({evId,partEmail,ev2,pInfo,lastMsg});
      }
    }
  });
  if(!threads.length) return "";
  let html="<div class='card' style='margin-top:16px'><div class='sec-title'>💬 Participant Messages <span class='b b-p' style='font-size:11px'>"+threads.length+"</span></div>";
  threads.forEach(t=>{
    const av=(t.pInfo.av||"??").toUpperCase().slice(0,2);
    const gc=gradCss(av);
    const lastText=(t.lastMsg&&t.lastMsg.text)?t.lastMsg.text.slice(0,40):"...";
    const lastTime=(t.lastMsg&&t.lastMsg.time)?t.lastMsg.time:"";
    const evTitle=(t.ev2&&t.ev2.title)?t.ev2.title:t.evId;
    const safeEvId=t.evId.replace(/['"]/g,"");
    const safePartEmail=t.partEmail.replace(/['"]/g,"");
    html+="<div style='display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px;margin-bottom:6px;cursor:pointer' data-evid='"+safeEvId+"' data-partemail='"+safePartEmail+"' onclick='var el=this;openChatWithParticipant(el.dataset.evid,el.dataset.partemail)'>"
      +"<div style='width:36px;height:36px;border-radius:9px;background:"+gc+";display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:12px;flex-shrink:0'>"+av+"</div>"
      +"<div style='flex:1;min-width:0'><div style='font-weight:700;font-size:13px'>"+t.pInfo.name+"</div>"
      +"<div style='font-size:11px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap'>"+evTitle+": "+lastText+"</div></div>"
      +"<span style='font-size:10px;color:var(--t3)'>"+lastTime+"</span></div>";
  });
  html+="</div>";
  return html;
}

function startOrgChat(evId){
  const ev=EVTS.find(e=>e.id===evId);
  if(!ev){toast("Event not found","re");return;}
  const orgs=(ev.organizers||[ev.orgId]).filter(Boolean);
  const orgEmail=orgs.find(e=>e!==CU.email)||orgs[0]||ev.orgId||"";
  go("p-org-chat",true,{evId:evId,orgEmail:orgEmail});
}

// Alias: re-render current view
function rerender(){
  const cur=history[history.length-1];
  if(cur) go(cur.id,false,cur.data);
}

function go(viewId, push=true, data=null){
  destroyCharts();
  const area=$("content"); area.innerHTML="";
  const title=TITLES[viewId]||viewId;
  $("tb-title").textContent=title;
  const isTop=NAV_MAP[CU.role]?.some(n=>n.id===viewId);
  $("btn-back").classList.toggle("hidden",isTop);
  if(isTop) setNavActive(viewId);
  if(push) history.push({id:viewId,data});
  // Show/hide topbar search based on view
  if(typeof showTopbarSearch==="function") showTopbarSearch(true);
  const render=VIEWS[viewId];
  if(render) render(area,data);
  else area.innerHTML=`<div class="empty"><div class="empty-ico">🚧</div><h3>Coming Soon</h3><p>This section is under construction.</p></div>`;
}

function goBack(){
  if(history.length>1){ history.pop(); const prev=history[history.length-1]; go(prev.id,false,prev.data); }
}

/* ═══════════════════════════════════════════════════════════════
   VIEWS
   ═══════════════════════════════════════════════════════════════ */
const VIEWS = {};

/* ──────────────────────── UTILS ──────────────────────── */
function scard(ico,val,lbl,sub,colorCls,onClick="",trend=""){
  const bgs={p:"var(--p-l)",pk:"var(--pk-l)",or:"var(--or-l)",ye:"var(--ye-l)",gr:"var(--gr-l)"};
  const txts={p:"var(--p)",pk:"var(--pk)",or:"var(--or)",ye:"#92400e",gr:"var(--gr)"};
  const [bg,tx]=colorCls.split("-").length===1?[bgs[colorCls],txts[colorCls]]:[bgs[colorCls.split("-")[0]],txts[colorCls.split("-")[0]]];
  return `<div class="scard" ${onClick?`onclick="${onClick}"`:""}> 
    <div class="scard-icon" style="background:${bg||bgs.p};color:${tx||txts.p}">${ico}</div>
    <div class="scard-val">${val}</div>
    <div class="scard-lbl">${lbl}</div>
    ${sub?`<div class="scard-sub">${sub}</div>`:""}
    ${trend?`<div class="scard-trend">↑ ${trend}</div>`:""}
  </div>`;
}

function evCard(ev, role, userEmail=""){
  const regs=REGS[ev.id]||[];
  const wait=WAIT[ev.id]||[];
  const reg=regs.length; const cap=ev.capacity;
  const full=reg>=cap;
  const isReg=regs.includes(userEmail);
  const isWait=wait.includes(userEmail);
  const p=pct(reg,cap);
  let btn="";
  if(role==="participant"||role==="both"){
    const cls=isReg?"btn-success":isWait?"btn-ghost":full?"btn-ghost btn-xs":"btn-pri";
    const lbl=isReg?"✓ Registered":isWait?"⏳ Waitlisted":full?"Join Waitlist":"Register Now";
    btn=`<button class="btn ${cls} btn-sm btn-w" style="margin-top:10px" onclick="event.stopPropagation();doRegisterLocal('${ev.id}')">${lbl}</button>`;
  }
  return `<div class="card card-click" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
    <div style="height:3px;border-radius:3px 3px 0 0;background:linear-gradient(90deg,${ev.color},var(--pk));margin:-20px -20px 14px;position:relative;top:-1px;border-radius:var(--r) var(--r) 0 0"></div>
    <div style="display:flex;align-items:flex-start;gap:11px;margin-bottom:10px">
      <div style="width:46px;height:46px;border-radius:12px;background:${ev.color}18;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${ev.emoji}</div>
      <div style="flex:1;min-width:0">
        <div style="font-family:var(--font-h);font-weight:800;font-size:14px;color:var(--t1);margin-bottom:4px;line-height:1.2">${ev.title}</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap"><span class="b b-p">${ev.category}</span>${ev.free?'<span class="b b-g">Free</span>':'<span class="b b-o">₹'+ev.price+'</span>'}${(role!=="participant"&&role!=="both")?`<span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span>`:""}</div>
      </div>
    </div>
    <div style="font-size:12px;color:var(--t2);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:10px">${ev.desc}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:11px;color:var(--t2);margin-bottom:10px">
      <span>📅 ${fmt(ev.date)}</span><span>⏰ ${ev.time}</span>
      <span>📍 ${ev.venue}</span><span>👤 ${ev.organizer}</span>
    </div>
    ${capBar(reg,cap)}
    ${wait.length>0?`<div style="font-size:11px;color:var(--or);margin-top:4px">⏳ ${wait.length} on waitlist</div>`:""}
    ${btn}
  </div>`;
}

/* ══════════════════════════════════════════════════════════
   ADMIN VIEWS
   ══════════════════════════════════════════════════════════ */
