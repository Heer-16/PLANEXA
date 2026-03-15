/* ══════════════════════════════════════════════════════════
   ADMIN ACTIONS
   ══════════════════════════════════════════════════════════ */
function adminApprove(id, note=""){
  const ev=EVTS.find(e=>e.id===id); if(!ev)return;
  ev.status="approved";
  ev.adminNote=note||"Your event has been approved! ✅";
  firebaseSaveEvent(ev);
  // update venue bookings
  const vId=VENUE_NAME_MAP[ev.venue];
  if(vId){
    if(!VENUE_BOOKINGS[vId]) VENUE_BOOKINGS[vId]=[];
    const bk=VENUE_BOOKINGS[vId].find(b=>b.eventId===id);
    if(bk) bk.status="approved";
    else VENUE_BOOKINGS[vId].push({eventId:id,eventTitle:ev.title,date:ev.date,status:"approved"});
  }
  // notify every organiser on this event
  const orgEmails=ev.organizers||[ev.orgId];
  orgEmails.forEach(orgEmail=>{
    pushNotif(orgEmail, `✅ Your event "${ev.title}" has been APPROVED by Admin!${note?" Note: "+note:""}`, "gr", {view:"ev-detail",data:{evId:id}});
  });
  pushNotif(CU.email, `✅ You approved "${ev.title}"`, "gr", {view:"ev-detail",data:{evId:id}});
  toast("✅ Event approved and organisers notified!","gr");
  if(typeof renderPendingDash==="function") setTimeout(renderPendingDash,80);
  // Refresh current view so status updates immediately
  const _curViewA=history[history.length-1];
  if(_curViewA) setTimeout(()=>go(_curViewA.id,false,_curViewA.data),120);
}

function adminReject(id, note=""){
  const ev=EVTS.find(e=>e.id===id); if(!ev)return;
  ev.status="rejected";
  ev.adminNote=note||"Your event has been rejected.";
  firebaseSaveEvent(ev);
  const orgEmails=ev.organizers||[ev.orgId];
  orgEmails.forEach(orgEmail=>{
    pushNotif(orgEmail, `❌ Your event "${ev.title}" was REJECTED.${note?" Reason: "+note:""}`, "re", {view:"ev-detail",data:{evId:id}});
  });
  pushNotif(CU.email, `❌ You rejected "${ev.title}"`, "re", {view:"ev-detail",data:{evId:id}});
  toast("❌ Event rejected and organisers notified","re");
  if(typeof renderPendingDash==="function") setTimeout(renderPendingDash,80);
  // Refresh current view
  const _curView=history[history.length-1];
  if(_curView) setTimeout(()=>go(_curView.id,false,_curView.data),120);
}
function adminApproveWithNote(id){
  window._pendingApproveId=id;
  openModal("✅ Approve Event","<div class='fg'><label class='fl'>Note to Organizer (optional)</label><textarea class='fi' id='approve-note' rows='3' placeholder='e.g. Approved! Please confirm AV setup 2 days before.'></textarea></div>",
    [{label:"Approve",cls:"btn-success",fn:"doApproveConfirm()"},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]
  );
}
window.doApproveConfirm=function(){
  var el=$("approve-note");
  var note=el?el.value:"";
  var id=window._pendingApproveId;
  if(!id){toast("Error: no event selected","re");return;}
  closeModal();
  adminApprove(id, note);
};
function adminRejectWithNote(id){
  window._pendingRejectId=id;
  openModal("❌ Reject Event","<div class='fg'><label class='fl'>Reason for Rejection *</label><textarea class='fi' id='reject-note' rows='3' placeholder='e.g. Venue conflict on that date. Please choose another venue or date.'></textarea></div>",
    [{label:"Reject",cls:"btn-danger",fn:"doRejectConfirm()"},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]
  );
}
window.doRejectConfirm=function(){
  var el=$("reject-note");
  var note=el?el.value:"";
  if(!note.trim()){toast("Please add a reason for rejection","re");return;}
  var id=window._pendingRejectId;
  if(!id){toast("Error: no event selected","re");return;}
  closeModal();
  adminReject(id, note);
};

function doRegisterLocal(evId){
  const ev=EVTS.find(e=>e.id===evId); if(!ev)return;
  const regs=REGS[ev.id]||[]; const wait=WAIT[ev.id]||[];
  if(regs.includes(CU.email)||wait.includes(CU.email)){toast("Already registered/waitlisted","or");return;}
  // confirmation modal
  openModal("Confirm Registration",`
    <div style="text-align:center;padding:10px">
      <div style="font-size:40px;margin-bottom:12px">${ev.emoji}</div>
      <div style="font-family:var(--font-h);font-size:18px;font-weight:800;margin-bottom:6px">${ev.title}</div>
      <div style="font-size:13px;color:var(--t2);margin-bottom:16px">📅 ${fmt(ev.date)} · 📍 ${ev.venue}</div>
      ${!ev.free?`<div style="background:var(--or-l);border-radius:10px;padding:12px;margin-bottom:8px"><div style="font-size:12px;color:var(--t2)">Registration Fee</div><div style="font-size:20px;font-weight:800;color:var(--or)">₹${ev.price}</div></div>`:""}
      <p style="font-size:13px;color:var(--t2)">Are you sure you want to register?</p>
    </div>`,
    [{label:"Yes, Register!",cls:"btn-pri",fn:`confirmRegister('${evId}')`},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]
  );
}
function confirmRegister(evId){
  closeModal();
  const ev=EVTS.find(e=>e.id===evId); if(!ev)return;
  if(!REGS[evId]) REGS[evId]=[];
  if(!WAIT[evId]) WAIT[evId]=[];
  // Auto-register participant in PARTICIPANTS_DB if not already there
  if(!PARTICIPANTS_DB[CU.email]){
    PARTICIPANTS_DB[CU.email]={
      name:CU.name, email:CU.email, phone:CU.phone||"N/A",
      year:CU.year||"N/A", dept:CU.dept||"N/A",
      roll:CU.rollno||"N/A", uni:CU.uni||"SCET",
      av:CU.av||CU.name.slice(0,2).toUpperCase()
    };
  }
  if(REGS[evId].length>=ev.capacity){
    WAIT[evId].push(CU.email);
    toast("⏳ Added to waitlist for "+ev.title,"or");
    (ev.organizers||[ev.orgId]).forEach(orgEmail=>{
      pushNotif(orgEmail, `⏳ ${CU.name} joined the waitlist for "${ev.title}" (${WAIT[evId].length} waiting)`, "or", {view:"ev-participants",data:{evId:evId}});
    });
  } else {
    REGS[evId].push(CU.email);
    firebaseRegister(evId, CU.email);
    const total=REGS[evId].length;
    toast("🎉 Registered for "+ev.title,"gr");
    (ev.organizers||[ev.orgId]).forEach(orgEmail=>{
      pushNotif(orgEmail, `🎉 ${CU.name} just registered for "${ev.title}"! Participants: ${total}/${ev.capacity}`, "gr", {view:"ev-participants",data:{evId:evId}});
    });
    pushNotif(CU.email, `✅ You are registered for "${ev.title}" on ${fmt(ev.date)}. Check My Registrations for your ticket!`, "gr", {view:"my-regs"});
  }
  // Refresh the current view so count + list update live
  const cur=history[history.length-1];
  if(cur){
    if(cur.id==="ev-detail"&&cur.data?.evId===evId) setTimeout(()=>go("ev-detail",false,{evId}),80);
    else if(cur.id==="ev-participants"&&cur.data?.evId===evId) setTimeout(()=>go("ev-participants",false,cur.data),80);
    else if(cur.id==="discover"||cur.id==="my-regs") setTimeout(()=>go(cur.id,false,cur.data),80);
  }
}

/* ══════════════════════════════════════════════════════════
   NOTIFICATIONS
   ══════════════════════════════════════════════════════════ */
function pushNotif(email, text, type="p", link=null){
  if(!USER_NOTIFS[email]) USER_NOTIFS[email]=[];
  USER_NOTIFS[email].unshift({dot:true, text, time:"just now", type, link});
  if(CU&&CU.email===email) buildNotifs();
}
function buildNotifs(){
  const myNotifs=(USER_NOTIFS[CU.email]||[]);
  $("notif-list").innerHTML=myNotifs.length?myNotifs.map((n,i)=>{
    const hasLink=n.link&&(n.link.view||n.link.evId);
    return `<div class="notif-item" style="cursor:${hasLink?"pointer":"default"}" ${hasLink?`onclick="handleNotifClick(${i})" onmouseover="this.style.background='var(--bg)'" onmouseout="this.style.background=''"`:""}>
      <div class="n-dot" style="background:${n.dot?"var(--p)":"var(--t3)"}"></div>
      <div style="flex:1">
        <div style="font-size:12px;color:var(--t2)">${n.text}</div>
        <div style="font-size:10px;color:var(--t3);margin-top:2px;display:flex;gap:6px">
          <span>${n.time}</span>${hasLink?`<span style="color:var(--p);font-weight:600">→ tap to open</span>`:""}
        </div>
      </div>
    </div>`;
  }).join(""):`<div style="padding:20px;text-align:center;color:var(--t3);font-size:12px">No notifications</div>`;
  $("n-dot").style.display=myNotifs.some(n=>n.dot)?"block":"none";
}
function handleNotifClick(idx){
  const notifs=USER_NOTIFS[CU.email]||[];
  const n=notifs[idx]; if(!n||!n.link) return;
  n.dot=false; buildNotifs();
  $("notif-panel").classList.add("hidden"); notifOpen=false;
  const lk=n.link;
  if(lk.view) go(lk.view,true,lk.data||null);
  else if(lk.evId) go("ev-detail",true,{evId:lk.evId});
}
function toggleNotif(){ notifOpen=!notifOpen; $("notif-panel").classList.toggle("hidden",!notifOpen); }
function clearNotifs(){ USER_NOTIFS[CU.email]=[]; buildNotifs(); $("notif-panel").classList.add("hidden"); notifOpen=false; toast("Notifications cleared","p"); }
document.addEventListener("click",e=>{ if(!e.target.closest(".notif-btn")&&!e.target.closest(".notif-panel")){ $("notif-panel")?.classList.add("hidden"); notifOpen=false; }});

/* ══════════════════════════════════════════════════════════
   MODAL
   ══════════════════════════════════════════════════════════ */
function openModal(title, body, btns=[], extra=""){
  $("m-title").textContent=title;
  $("m-body").innerHTML=body;
  $("m-foot").innerHTML=btns.map(b=>`<button class="btn ${b.cls}" onclick="${b.fn}">${b.label}</button>`).join("")+extra;
  $("modal-bg").classList.remove("hidden");
}
function closeModal(){ $("modal-bg").classList.add("hidden"); }

/* ══════════════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════════════ */
const TICONS={gr:"✅",re:"❌",p:"ℹ️",or:"⚠️"};
const TCOLS ={gr:"var(--gr)",re:"var(--re)",p:"var(--p)",or:"var(--or)"};
function toast(msg, type="p"){
  const t=document.createElement("div");
  t.className="toast";
  t.style.cssText=`border-color:${TCOLS[type]}30;color:${TCOLS[type]}`;
  t.innerHTML=`<span style="font-size:17px">${TICONS[type]}</span><span style="color:var(--t1)">${msg}</span>`;
  $("toasts").appendChild(t);
  setTimeout(()=>t.remove(),3500);
}

/* ══════════════════════════════════════════════════════════
   GLOBAL SEARCH
   ══════════════════════════════════════════════════════════ */
// Views that support global search
const SEARCH_VIEWS = new Set(["discover","my-regs","adm-events","adm-organizers","org-events","ev-participants"]);

function showTopbarSearch(show){
  const wrap=$("topbar-search-wrap"); if(!wrap)return;
  // Participant has inline search in each view — topbar search not needed
  const isParticipant=CU&&(CU.role==="participant");
  wrap.classList.toggle("hidden",!show||isParticipant);
  if(!show){ const s=$("topbar-search"); if(s)s.value=""; hideSearchResults(); }
}

function hideSearchResults(){
  const r=$("topbar-results"); if(r){ r.classList.add("hidden"); r.innerHTML=""; }
}

function runTopbarSearch(q){
  const r=$("topbar-results"); if(!r)return;
  // Sync to discover's internal search bar if we are on that view
  const cur=history[history.length-1];
  const viewId=cur?.id||"";
  if(viewId==="discover"&&typeof window.ds_search==="function"){
    window.ds_search(q);
    // Also show dropdown results from global search
  }
  // Sync to participants search if on ev-participants
  if(viewId==="ev-participants"&&typeof window.partSearch==="function"){
    window.partSearch(q);
  }
  q=q.trim().toLowerCase();
  if(!q){ hideSearchResults(); return; }
  let results=[];

  if(viewId==="discover"||viewId==="adm-events"||viewId==="org-events"){
    // Search events
    EVTS.forEach(ev=>{
      if(ev.title.toLowerCase().includes(q)||ev.category.toLowerCase().includes(q)||ev.organizer.toLowerCase().includes(q)||ev.venue.toLowerCase().includes(q)){
        results.push({type:"event",label:ev.title,sub:`${ev.category} · ${fmt(ev.date)} · ${ev.venue}`,emoji:ev.emoji,fn:`go('ev-detail',true,{evId:'${ev.id}'})`});
      }
    });
  } else if(viewId==="ev-participants"){
    // Search participants in the current event
    const evId=cur?.data?.evId;
    const regs=REGS[evId]||[];
    regs.forEach(email=>{
      const p=PARTICIPANTS_DB[email]||{name:email,dept:"N/A",roll:"N/A"};
      if(p.name.toLowerCase().includes(q)||email.toLowerCase().includes(q)||(p.dept||"").toLowerCase().includes(q)||(p.roll||"").toLowerCase().includes(q)){
        results.push({type:"participant",label:p.name,sub:`${p.dept} · ${p.roll||email}`,emoji:"👤",fn:`go('p-detail',true,{email:'${email}',evId:'${evId}'})`});
      }
    });
  } else if(viewId==="adm-organizers"){
    // Search organisers
    Object.values(ORGANIZERS_DB).forEach(o=>{
      if(o.name.toLowerCase().includes(q)||o.dept.toLowerCase().includes(q)||o.email.toLowerCase().includes(q)){
        results.push({type:"organiser",label:o.name,sub:`${o.dept} · ${o.email}`,emoji:"🎓",fn:`showOrgProfile('${o.email}')`});
      }
    });
  } else if(viewId==="my-regs"){
    // Search participant's own registrations
    const myEvts=EVTS.filter(e=>(REGS[e.id]||[]).includes(CU.email));
    myEvts.forEach(ev=>{
      if(ev.title.toLowerCase().includes(q)||ev.category.toLowerCase().includes(q)||ev.venue.toLowerCase().includes(q)){
        results.push({type:"event",label:ev.title,sub:`${ev.category} · ${fmt(ev.date)}`,emoji:ev.emoji,fn:`go('ev-detail',true,{evId:'${ev.id}'})`});
      }
    });
  } else {
    // Global fallback: search events + participants
    EVTS.forEach(ev=>{
      if(ev.title.toLowerCase().includes(q)||ev.category.toLowerCase().includes(q)||ev.venue.toLowerCase().includes(q)){
        results.push({type:"event",label:ev.title,sub:`${ev.category} · ${fmt(ev.date)}`,emoji:ev.emoji,fn:`go('ev-detail',true,{evId:'${ev.id}'})`});
      }
    });
    Object.values(PARTICIPANTS_DB).forEach(p=>{
      if(p.name.toLowerCase().includes(q)||p.email.toLowerCase().includes(q)||(p.dept||"").toLowerCase().includes(q)){
        results.push({type:"participant",label:p.name,sub:p.dept||p.email,emoji:"👤",fn:`go('p-detail',true,{email:'${p.email}'})`});
      }
    });
  }

  if(!results.length){
    r.innerHTML=`<div style="padding:14px;text-align:center;font-size:12px;color:var(--t3)">No results for "${q}"</div>`;
  } else {
    r.innerHTML=results.slice(0,8).map(res=>`
      <div onclick="${res.fn};hideSearchResults();$('topbar-search').value=''"
        style="display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;transition:background .12s;border-bottom:1px solid var(--bdr)"
        onmouseover="this.style.background='var(--p-l)'" onmouseout="this.style.background='transparent'">
        <span style="font-size:18px">${res.emoji}</span>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${res.label}</div>
          <div style="font-size:11px;color:var(--t3)">${res.sub}</div>
        </div>
        <span class="b b-p" style="font-size:10px">${res.type}</span>
      </div>`).join("")+
      (results.length>8?`<div style="padding:8px;text-align:center;font-size:11px;color:var(--t3)">${results.length-8} more results — refine search</div>`:"");
  }
  r.classList.remove("hidden");
}

// Close search results on outside click
document.addEventListener("click",e=>{
  if(!e.target.closest("#topbar-search-wrap")) hideSearchResults();
});

/* ══════════════════════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded",()=>{
  initState();           // boot the shared store ONCE at page load
  buildLoginTiles();

  // Handle shared event links: #event-e1 etc
  const hash=location.hash;
  if(hash&&hash.startsWith("#event-")){
    const evId=hash.slice(7);
    const ev=EVENTS_SEED.find(e=>e.id===evId);
    if(ev){
      // Show a public event preview modal without requiring login
      $("pg-login").style.display="flex";
      $("app").style.display="none";
      setTimeout(()=>{
        const d=document.createElement("div");
        d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px";
        d.innerHTML=`<div style="background:var(--card);border-radius:var(--r-xl);max-width:500px;width:100%;padding:28px;box-shadow:0 24px 80px rgba(0,0,0,.4);max-height:90vh;overflow-y:auto">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
            <div style="width:56px;height:56px;border-radius:14px;background:${ev.color}18;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0">${ev.emoji}</div>
            <div><div style="font-family:var(--font-h);font-weight:800;font-size:18px;margin-bottom:2px">${ev.title}</div>
            <span class="b ${ev.status==="approved"?"b-g":"b-y"}">${ev.status}</span></div>
          </div>
          <div style="font-size:13px;color:var(--t2);margin-bottom:14px;line-height:1.6">${ev.desc}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px;font-size:12px">
            <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="color:var(--t3);font-size:10px;font-weight:700;margin-bottom:2px">DATE</div>📅 ${new Date(ev.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
            <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="color:var(--t3);font-size:10px;font-weight:700;margin-bottom:2px">VENUE</div>📍 ${ev.venue}</div>
            <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="color:var(--t3);font-size:10px;font-weight:700;margin-bottom:2px">CATEGORY</div>🏷️ ${ev.category}</div>
            <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="color:var(--t3);font-size:10px;font-weight:700;margin-bottom:2px">ENTRY</div>${ev.free?"🆓 Free":"💰 ₹"+ev.price}</div>
          </div>
          <div style="font-size:12px;color:var(--t3);margin-bottom:18px;text-align:center">🔒 Log in to register for this event</div>
          <div style="display:flex;gap:8px">
            <button onclick="this.closest('div[style*=fixed]').remove();location.hash=''" style="flex:1;padding:10px;border-radius:10px;border:1px solid var(--bdr);background:var(--bg);color:var(--t1);cursor:pointer;font-size:13px">Close</button>
            <button onclick="this.closest('div[style*=fixed]').remove();location.hash=''" style="flex:1;padding:10px;border-radius:10px;background:var(--p);color:#fff;border:none;cursor:pointer;font-size:13px;font-weight:700">Log In to Register →</button>
          </div>
        </div>`;
        document.body.appendChild(d);
      }, 300);
    }
  } else {
    $("pg-login").style.display="flex";
    $("app").style.display="none";
  }
});
