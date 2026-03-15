VIEWS["discover"] = (area)=>{
  let search="",cat="all",free="all";
  // For "both" role, exclude events they are organising from discover
  const myEvts=EVTS.filter(e=>e.uni===CU.uni&&e.status==="approved"&&!(CU.role==="both"&&(e.organizers||[e.orgId]).includes(CU.email))&&new Date(e.date)>=new Date()).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const cats=["all",...new Set(myEvts.map(e=>e.category))];
  const render=()=>{
    const list=myEvts.filter(e=>{
      const ms=e.title.toLowerCase().includes(search.toLowerCase())||e.desc.toLowerCase().includes(search.toLowerCase());
      const mc=cat==="all"||e.category===cat;
      const mf=free==="all"||(free==="free"?e.free:!e.free);
      return ms&&mc&&mf;
    });
    $("disc-grid").innerHTML=list.length?list.map(ev=>evCard(ev,CU.role,CU.email)).join(""):`<div class="empty" style="grid-column:1/-1"><div class="empty-ico">🔍</div><h3>No events found</h3><p>Try different filters.</p></div>`;
    $("disc-count").textContent=`${list.length} events at ${CU.uni}`;
  };
  area.innerHTML=`
  <div class="card" style="display:flex;flex-wrap:wrap;gap:9px;align-items:center;margin-bottom:14px;padding:13px">
    <div class="srch-wrap" style="min-width:180px"><span class="srch-ico">🔍</span><input class="srch-in" placeholder="Search events…" oninput="window.ds_search(this.value)"></div>
    <select class="fi" style="width:auto" onchange="window.ds_cat(this.value)">${cats.map(c=>`<option value="${c}">${c==="all"?"All Categories":c}</option>`).join("")}</select>
    <div class="tog-wrap" style="margin:0">
      <div class="tog-opt on" id="tog-all" onclick="window.ds_free('all');setDiscTog('all')">All</div>
      <div class="tog-opt" id="tog-f2" onclick="window.ds_free('free');setDiscTog('free')">Free</div>
      <div class="tog-opt" id="tog-p2" onclick="window.ds_free('paid');setDiscTog('paid')">Paid</div>
    </div>
  </div>
  <div id="disc-count" style="font-size:11px;color:var(--t3);margin-bottom:10px"></div>
  <div id="disc-grid" class="ga"></div>`;
  window.ds_search=v=>{search=v;render()};
  window.ds_cat=v=>{cat=v;render()};
  window.ds_free=v=>{free=v;render()};
  window.setDiscTog=v=>{["tog-all","tog-f2","tog-p2"].forEach(id=>$( id)?.classList.remove("on"));$("tog-"+(v==="all"?"all":v==="free"?"f2":"p2"))?.classList.add("on");};
  window.doRegister=evId=>{ doRegisterLocal(evId); };
  render();
};

VIEWS["my-regs"] = (area)=>{
  let regsSearch="";
  // For "both" role: only show events they're participating in (not organising)
  const isOrgOf=ev=>(ev.organizers||[ev.orgId]).includes(CU.email);
  // Compute live from REGS so cancellations are immediately reflected
  const getLiveRegEvts=()=>EVTS.filter(e=>(REGS[e.id]||[]).includes(CU.email)&&!isOrgOf(e));
  const getLiveWaitEvts=()=>EVTS.filter(e=>(WAIT[e.id]||[]).includes(CU.email)&&!isOrgOf(e));
  const getLivePastEvts=()=>EVTS.filter(e=>new Date(e.date)<new Date()&&(REGS[e.id]||[]).includes(CU.email)&&!isOrgOf(e));
  let regEvts=getLiveRegEvts(), waitEvts=getLiveWaitEvts(), pastEvts=getLivePastEvts();
  const totalReg=getLiveRegEvts().filter(e=>new Date(e.date)>=new Date()).length;
  const totalWait=getLiveWaitEvts().length;
  const totalAtt=(EVTS.filter(e=>new Date(e.date)<new Date()&&(ATTENDANCE[e.id]||[]).includes(CU.email)&&!isOrgOf(e))).length;

  const renderRegs=()=>{
    // Recompute live so cancellations are immediately reflected
    regEvts=getLiveRegEvts(); waitEvts=getLiveWaitEvts(); pastEvts=getLivePastEvts();
    const q=regsSearch.toLowerCase();
    const upcomingEvts=regEvts.filter(e=>new Date(e.date)>=new Date()).sort((a,b)=>new Date(a.date)-new Date(b.date));
    const filtUpcoming=q?upcomingEvts.filter(e=>e.title.toLowerCase().includes(q)||e.venue.toLowerCase().includes(q)||e.category.toLowerCase().includes(q)):upcomingEvts;
    const filtWait=q?waitEvts.filter(e=>e.title.toLowerCase().includes(q)||e.venue.toLowerCase().includes(q)):waitEvts;
    const filtPast=(q?pastEvts.filter(e=>e.title.toLowerCase().includes(q)||e.venue.toLowerCase().includes(q)):pastEvts).sort((a,b)=>new Date(b.date)-new Date(a.date));

    const el=$("regs-body"); if(!el)return;
    el.innerHTML=`
    ${filtUpcoming.length?`<div style="margin-bottom:22px">
      <div class="sec-title">🎟️ Upcoming Registrations <span class="b b-p">${filtUpcoming.length}</span></div>
      ${filtUpcoming.map(ev=>`<div class="card card-click" style="margin-bottom:10px" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
        <div style="display:flex;align-items:center;gap:13px">
          <div style="width:48px;height:48px;border-radius:12px;background:${ev.color}18;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${ev.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-family:var(--font-h);font-weight:800;font-size:14px">${ev.title}</div>
            <div style="font-size:12px;color:var(--t2)">📅 ${fmt(ev.date)} · ⏰ ${ev.time} · 📍 ${ev.venue}</div>
            <div style="display:flex;gap:5px;margin-top:4px"><span class="b b-p">${ev.category}</span>${ev.free?'<span class="b b-g">Free</span>':'<span class="b b-o">₹'+ev.price+'</span>'}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <span class="b b-g">✓ Registered</span>
            <div style="display:flex;gap:5px;margin-top:8px;flex-wrap:wrap;justify-content:flex-end">
              ${!ev.free?`<button class="btn btn-sec btn-xs" onclick="event.stopPropagation();showTicket('${ev.id}')">🎫 Ticket</button>`:""}
              <button class="btn btn-danger btn-xs" onclick="event.stopPropagation();confirmCancelReg('${ev.id}')">Cancel</button>
              <button class="btn btn-ghost btn-xs" style="color:var(--p);border-color:var(--p)" onclick="event.stopPropagation();startOrgChat('${ev.id}')">💬 Ask Organiser</button>
            </div>
          </div>
        </div>
      </div>`).join("")}
    </div>`:""}
    ${filtWait.length?`<div style="margin-bottom:22px">
      <div class="sec-title">⏳ Waitlisted <span class="b b-o">${filtWait.length}</span></div>
      ${filtWait.map(ev=>`<div class="card" style="border-color:#FED7AA;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:13px">
          <span style="font-size:30px">${ev.emoji}</span>
          <div style="flex:1">
            <div style="font-family:var(--font-h);font-weight:800;font-size:14px">${ev.title}</div>
            <div style="font-size:12px;color:var(--t2)">Event is full · You'll be notified if a spot opens</div>
          </div>
          <div style="text-align:right">
            <span class="b b-y">⏳ Waitlisted</span>
            <div style="margin-top:8px"><button class="btn btn-danger btn-xs" onclick="cancelReg('${ev.id}')">Leave Queue</button></div>
          </div>
        </div>
      </div>`).join("")}
    </div>`:""}
    <div>
      <div class="sec-title">🏁 Past Events <span class="b b-g">${filtPast.length}</span></div>
      ${filtPast.map(ev=>{
        const attended=(ATTENDANCE[ev.id]||[]).includes(CU.email);
        const hasFeedback=!!(FEEDBACK[ev.id]||[]).find(f=>f.email===CU.email);
        return `<div class="card" style="margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:13px">
            <div style="width:48px;height:48px;border-radius:12px;background:${ev.color}18;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;cursor:pointer" onclick="go('ev-detail',true,{evId:'${ev.id}'})">${ev.emoji}</div>
            <div style="flex:1;min-width:0;cursor:pointer" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
              <div style="font-family:var(--font-h);font-weight:800;font-size:14px">${ev.title}</div>
              <div style="font-size:12px;color:var(--t2)">📅 ${fmt(ev.date)} · 📍 ${ev.venue}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0" onclick="event.stopPropagation()">
              ${attended
                ? `<span class="b b-g">✅ Attended</span>
                   <button class="btn btn-pri btn-xs" onclick="genCert('${ev.id}','${CU.email}')">🏆 Certificate</button>
                   ${hasFeedback?`<span class="b b-y">⭐ Feedback given</span>`:
                     `<button class="btn btn-sec btn-xs" onclick="go('ev-feedback',true,{evId:'${ev.id}'})">⭐ Give Feedback</button>`}`
                : `<span class="b b-r">❌ Did not attend</span>`
              }
            </div>
          </div>
        </div>`;
      }).join("")||`<div style="text-align:center;padding:20px;color:var(--t3)">No past events${q?' matching "'+q+'"':''}</div>`}
    </div>`;
  };

  area.innerHTML=`
  <div class="g3" style="margin-bottom:14px">
    ${scard("🎟️",totalReg,"Upcoming","Tap to view","p","showUpcomingRegs()")}
    ${scard("⏳",totalWait,"Waitlisted","In queue","or")}
    ${scard("✅",totalAtt,"Attended","Tap to view","gr","showAttendedRegs()")}
  </div>
  <div class="card" style="padding:11px;margin-bottom:14px">
    <div class="srch-wrap"><span class="srch-ico">🔍</span><input class="srch-in" id="regs-search" placeholder="Search your registrations…" oninput="window._regsSearch(this.value)"></div>
  </div>
  <div id="regs-body"></div>`;

  window._regsSearch=v=>{regsSearch=v;renderRegs();};
  window.showUpcomingRegs=()=>{
    const upList=regEvts.filter(e=>new Date(e.date)>=new Date()).sort((a,b)=>new Date(a.date)-new Date(b.date));
    if(!upList.length){toast("No upcoming registrations","or");return;}
    openModal(`🎟️ Upcoming Events (${upList.length})`,
      upList.map(ev=>`<div style="display:flex;align-items:center;gap:11px;padding:10px 12px;background:var(--bg);border-radius:10px;margin-bottom:7px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:22px">${ev.emoji}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:13px">${ev.title}</div><div style="font-size:11px;color:var(--t3)">📅 ${fmt(ev.date)} · 📍 ${ev.venue}</div></div>
        ${ev.free?'<span class="b b-g">Free</span>':'<span class="b b-o">₹'+ev.price+'</span>'}
      </div>`).join(""),
      [{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  window.showAttendedRegs=()=>{
    const attList=EVTS.filter(e=>new Date(e.date)<new Date()&&(ATTENDANCE[e.id]||[]).includes(CU.email)&&!isOrgOf(e)).sort((a,b)=>new Date(b.date)-new Date(a.date));
    if(!attList.length){toast("No attended events yet","or");return;}
    openModal(`✅ Attended Events (${attList.length})`,
      attList.map(ev=>`<div style="display:flex;align-items:center;gap:11px;padding:10px 12px;background:var(--gr-l);border:1px solid rgba(16,185,129,.2);border-radius:10px;margin-bottom:7px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:22px">${ev.emoji}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:13px">${ev.title}</div><div style="font-size:11px;color:var(--t3)">📅 ${fmt(ev.date)} · 📍 ${ev.venue}</div></div>
        <span class="b b-g">✅ Attended</span>
      </div>`).join(""),
      [{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };

  window.cancelReg=evId=>{
    REGS[evId]=(REGS[evId]||[]).filter(e=>e!==CU.email);
    WAIT[evId]=(WAIT[evId]||[]).filter(e=>e!==CU.email);
    firebaseUnregister(evId,CU.email);
    const ev2=EVTS.find(e=>e.id===evId);
    if(ev2)(ev2.organizers||[ev2.orgId]).forEach(org=>pushNotif(org,`⚠️ ${CU.name} cancelled registration for "${ev2.title}". Now ${(REGS[evId]||[]).length}/${ev2.capacity}`,"or"));
    toast("Registration cancelled","or"); renderRegs();
  };
  window.confirmCancelReg=evId=>{
    const ev2=EVTS.find(e=>e.id===evId); if(!ev2) return;
    openModal("❓ Cancel Registration",`
      <div style="text-align:center;padding:10px">
        <div style="font-size:40px;margin-bottom:12px">⚠️</div>
        <div style="font-family:var(--font-h);font-weight:800;font-size:16px;margin-bottom:8px">Cancel your registration?</div>
        <div style="font-size:13px;color:var(--t2);margin-bottom:6px">${ev2.emoji} <strong>${ev2.title}</strong></div>
        <div style="font-size:12px;color:var(--t3)">📅 ${fmt(ev2.date)} · 📍 ${ev2.venue}</div>
        <div style="font-size:12px;color:var(--re);margin-top:10px">This action cannot be undone.</div>
      </div>
    `,[{label:"Yes, Cancel Registration",cls:"btn-danger",fn:`cancelReg('${evId}');closeModal();`},{label:"No, Keep Registration",cls:"btn-ghost",fn:"closeModal()"}]);
  };
  window.confirmCancelReg=evId=>{
    const ev2=EVTS.find(e=>e.id===evId); if(!ev2) return;
    openModal("Cancel Registration?",`
      <div style="text-align:center;padding:10px">
        <div style="font-size:40px;margin-bottom:12px">⚠️</div>
        <div style="font-family:var(--font-h);font-weight:800;font-size:16px;margin-bottom:8px">Cancel your registration?</div>
        <div style="font-size:13px;color:var(--t2);margin-bottom:6px">${ev2.emoji} <strong>${ev2.title}</strong></div>
        <div style="font-size:12px;color:var(--t3)">📅 ${fmt(ev2.date)} · 📍 ${ev2.venue}</div>
        <div style="font-size:12px;color:var(--re);margin-top:10px;font-weight:600">This action cannot be undone.</div>
      </div>
    `,[{label:"Yes, Cancel",cls:"btn-danger",fn:"cancelReg('"+evId+"');closeModal();"},{label:"No, Keep",cls:"btn-ghost",fn:"closeModal()"}]);
  };
  window.showTicket=evId=>{
    const ev=EVTS.find(e=>e.id===evId);
    openModal("🎫 e-Ticket",`<div style="text-align:center">
      <div style="font-size:36px;margin-bottom:8px">${ev?.emoji}</div>
      <div style="font-family:var(--font-h);font-weight:800;font-size:18px;margin-bottom:4px">${ev?.title}</div>
      <div style="font-size:13px;color:var(--t2);margin-bottom:20px">${fmtLong(ev?.date)} · ${ev?.venue}</div>
      <div style="background:var(--p-l);border:2px solid rgba(124,58,237,.15);border-radius:18px;padding:22px;display:inline-block;margin-bottom:14px">
        ${qrDiv("T"+evId+CU.email,112)}
        <div style="font-family:monospace;font-weight:800;color:var(--p);font-size:13px">CP-${evId.toUpperCase()}-${CU.av}</div>
      </div>
      <div style="font-size:12px;color:var(--t3)">Show this at event entrance for check-in</div>
    </div>`,[],"");
  };
  renderRegs();
};
VIEWS["calendar"] = (area)=>{
  const myEvts=EVTS.filter(e=>e.uni===CU.uni&&e.status==="approved");
  const evDays=new Set(myEvts.map(e=>new Date(e.date).getDate()));
  let pVote=null;
  area.innerHTML=`
  <div style="background:linear-gradient(135deg,var(--p),var(--pk));border-radius:var(--r-lg);padding:22px;color:#fff;margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">
      <div style="font-family:var(--font-h);font-size:16px;font-weight:800">🗳️ Live Poll — HackSCET 2025</div>
      <span style="font-size:11px;opacity:.6">141 votes</span>
    </div>
    <p style="opacity:.6;font-size:12px;margin-bottom:14px">Which tech track are you most excited about?</p>
    ${[["Virtual Reality",24],["Blockchain",13],["AI / ML",47],["Quantum Computing",16]].map(([opt,p],i)=>`
    <div class="poll-opt" id="po-${i}" onclick="castVote(${i})" style="background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.18);border-radius:11px;padding:11px 14px;margin-bottom:7px;cursor:pointer;transition:all .18s">
      <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:5px"><span>${opt}</span><span id="pv-${i}">${p}%</span></div>
      <div style="height:4px;background:rgba(255,255,255,.2);border-radius:99px"><div id="pb-${i}" style="height:100%;background:#fff;border-radius:99px;width:0;transition:width .5s"></div></div>
    </div>`).join("")}
  </div>
  <div class="g2" style="margin-bottom:14px">
    <div class="card">
      <div class="sec-title">📅 April 2025</div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center;margin-bottom:9px">
        ${["S","M","T","W","T","F","S"].map(d=>`<div style="font-size:10px;font-weight:700;color:var(--t3);padding:6px 0">${d}</div>`).join("")}
        ${Array.from({length:35},(_,i)=>{const d=i-1;const inR=d>=1&&d<=30;const hasEv=evDays.has(d);const ev=myEvts.find(e=>new Date(e.date).getDate()===d);
          return `<div style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:9px;font-size:12px;font-weight:${hasEv?800:400};color:${!inR?"var(--t3)":hasEv?"#fff":"var(--t2)"};background:${!inR?"transparent":hasEv?"var(--p)":"transparent"};cursor:${hasEv?"pointer":"default"};transition:all .15s" ${hasEv?`onclick="go('ev-detail',true,{evId:'${ev?.id}'})" onmouseover="this.style.background='var(--pk)'" onmouseout="this.style.background='var(--p)'`:""}>${inR?d:""}</div>`;
        }).join("")}
      </div>
      <div style="display:flex;align-items:center;gap:10px;font-size:11px;color:var(--t3)">
        <div style="width:12px;height:12px;border-radius:3px;background:var(--p)"></div><span>Has event — click to view</span>
      </div>
    </div>
    <div class="card">
      <div class="sec-title">🏆 HackSCET Leaderboard</div>
      ${[["🥇","NeuroLink",2840,false],["🥈","ByteForce",2710,false],["🥉","QubitQ",2590,false],["4","Jamie Park (You)",2340,true],["5","CodeCraft",2210,false]].map(([rank,name,pts,me])=>`
      <div style="display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:10px;background:${me?"var(--p-l)":"transparent"};${me?"border:1.5px solid rgba(124,58,237,.15)":""}transition:background .13s;cursor:default;margin-bottom:3px">
        <div style="width:28px;height:28px;border-radius:7px;background:${me?"var(--p)":"var(--bg)"};color:${me?"#fff":"var(--t2)"};display:flex;align-items:center;justify-content:center;font-size:${rank.length===1?18:11}px;font-weight:800;flex-shrink:0">${rank}</div>
        <div style="flex:1;font-size:13px;font-weight:${me?800:600};color:var(--t1)">${name}</div>
        <div style="font-family:var(--font-h);font-weight:800;font-size:14px;color:var(--p)">${pts.toLocaleString()}</div>
      </div>`).join("")}
    </div>
  </div>
  <div class="card">
    <div class="sec-title">Upcoming Events at ${CU.uni}</div>
    ${myEvts.map(ev=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px;margin-bottom:7px;cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--p-l)'" onmouseout="this.style.background='var(--bg)'" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
      <span style="font-size:20px">${ev.emoji}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:13px">${ev.title}</div><div style="font-size:11px;color:var(--t3)">${fmt(ev.date)} · ${ev.venue}</div></div>
      <span class="b b-p">${ev.category}</span>
    </div>`).join("")}
  </div>`;

  window.castVote=i=>{
    if(pVote!==null){toast("Already voted!","or");return;}
    pVote=i; const pcts=[24,13,47,16];
    pcts.forEach((_,idx)=>{$("pb-"+idx).style.width=pcts[idx]+"%";}); 
    $("po-"+i).style.background="rgba(255,255,255,.22)";
    $("po-"+i).style.borderColor="rgba(255,255,255,.5)";
    toast("🗳️ Vote recorded!","gr");
  };
};

VIEWS["profile"] = (area)=>{
  const u=CU; const up=PARTICIPANTS_DB[u.email]||{};
  const isOrgOfEv=ev=>(ev.organizers||[ev.orgId]).includes(CU.email);
  const myRegEvts=EVTS.filter(e=>(REGS[e.id]||[]).includes(CU.email)&&!isOrgOfEv(e)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  area.innerHTML=`<div style="max-width:540px;margin:0 auto;display:flex;flex-direction:column;gap:13px">
  <div style="background:linear-gradient(135deg,var(--p-d),var(--pk));border-radius:var(--r-xl);padding:30px;text-align:center;color:#fff">
    <div style="width:68px;height:68px;border-radius:18px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;margin:0 auto 10px">${u.av}</div>
    <div style="font-family:var(--font-h);font-size:21px;font-weight:800;margin-bottom:2px">${u.name}</div>
    <div style="opacity:.65;font-size:12px">${u.email}</div>
  </div>
  <div class="card">
    <div class="sec-title">Personal Details</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        ["🏫 College",up.uni||u.uni||"SCET"],
        ["💻 Department",up.dept||u.dept||"—"],
        ["📚 Year",up.year||"—"],
        ["🪪 Roll Number",up.roll||"—"],
        ["📞 Phone",up.phone||"—"],
        ["📧 Email",u.email],
      ].map(([l,v])=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--bg);border-radius:9px">
        <span style="font-size:16px">${l.split(" ")[0]}</span>
        <div style="flex:1">
          <div style="font-size:10px;font-weight:700;color:var(--t3);margin-bottom:1px">${l.slice(3)}</div>
          <div style="font-size:13px;font-weight:700;color:var(--t1)">${v}</div>
        </div>
      </div>`).join("")}
    </div>
  </div>
  ${myRegEvts.length?`<div class="card">
    <div class="sec-title">🎫 My Tickets</div>
    ${myRegEvts.filter(e=>new Date(e.date)>=new Date()).sort((a,b)=>new Date(a.date)-new Date(b.date)).map(ev=>`<div style="display:flex;align-items:center;gap:12px;padding:11px 13px;background:var(--bg);border-radius:10px;margin-bottom:7px;cursor:pointer" onclick="showProfileTicket('${ev.id}')">
      <span style="font-size:22px">${ev.emoji}</span>
      <div style="flex:1"><div style="font-weight:700;font-size:13px">${ev.title}</div><div style="font-size:11px;color:var(--t2)">📅 ${fmt(ev.date)} · ${ev.venue}</div></div>
      <div class="qr-wrap" style="transform:scale(.85);transform-origin:right center">
        ${qrDiv("T"+ev.id+CU.email,70)}
        <div class="qr-lbl" style="font-size:9px">TICKET</div>
      </div>
    </div>`).join("")}
  </div>`:""}
  <div class="card">
    <div class="sec-title">Notification Preferences</div>
    ${[["New events at "+u.uni,true],["Deadline reminders",true],["Event updates",true],["Feedback requests",false],["Weekly digest",true]].map(([l,on])=>`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--bdr)">
      <span style="font-size:13px">${l}</span>
      <div class="tog-sw ${on?"on":""}" onclick="this.classList.toggle('on');this.style.background=this.classList.contains('on')?'var(--p)':'#E2E8F0';this.querySelector('div').style.left=this.classList.contains('on')?'19px':'2px'" style="width:38px;height:22px;border-radius:99px;background:${on?"var(--p)":"#E2E8F0"};position:relative;cursor:pointer;transition:background .2s">
        <div style="position:absolute;top:2px;left:${on?"19px":"2px"};width:18px;height:18px;background:#fff;border-radius:99px;box-shadow:0 1px 4px rgba(0,0,0,.2);transition:left .2s"></div>
      </div>
    </div>`).join("")}
  </div>
  <button class="btn btn-danger btn-w" onclick="logout()">🚪 Sign Out</button>
  </div>`;
  window.showProfileTicket=evId=>{
    const ev=EVTS.find(e=>e.id===evId); if(!ev)return;
    openModal("🎫 e-Ticket",`<div style="text-align:center">
      <div style="font-size:36px;margin-bottom:8px">${ev.emoji}</div>
      <div style="font-family:var(--font-h);font-weight:800;font-size:18px;margin-bottom:4px">${ev.title}</div>
      <div style="font-size:13px;color:var(--t2);margin-bottom:20px">${fmtLong(ev.date)} · ${ev.venue}</div>
      <div style="background:var(--p-l);border:2px solid rgba(124,58,237,.15);border-radius:18px;padding:22px;display:inline-block;margin-bottom:14px">
        ${qrDiv("T"+evId+CU.email,112)}
        <div style="font-family:monospace;font-weight:800;color:var(--p);font-size:13px">CP-${evId.toUpperCase()}-${CU.av}</div>
      </div>
      <div style="font-size:12px;color:var(--t3)">Show at event entrance for check-in</div>
    </div>`,[],"");
  };
};

/* ══════════════════════════════════════════════════════════
   SHARED DETAIL VIEWS
   ══════════════════════════════════════════════════════════ */

/* ── EVENT DETAIL ── */
VIEWS["ev-detail"] = (area, data)=>{
  const ev=EVTS.find(e=>e.id===data?.evId);
  if(!ev){area.innerHTML=`<div class="empty"><div class="empty-ico">❌</div><h3>Event not found</h3></div>`;return;}
  const regs=(REGS[ev.id]||[]);
  const wait=(WAIT[ev.id]||[]);
  const regC=regs.length, waitC=wait.length, cap=ev.capacity;
  const full=regC>=cap, p=pct(regC,cap);
  const isAdmin=CU.role==="admin";
  const isOrg=(CU.role==="organizer"||CU.role==="both")&&(ev.orgId===CU.email||(ev.organizers||[]).includes(CU.email));
  const isPart=(CU.role==="participant")||(CU.role==="both"&&!(ev.orgId===CU.email||(ev.organizers||[]).includes(CU.email)));
  const isReg=regs.includes(CU.email), isWait=wait.includes(CU.email);

  // Real-time listener for participant role
  if(isPart) listenEventRegs(ev.id, emails=>{
    const r=emails.length||regs.length;
    const el=$("live-reg-count"); if(el)el.textContent=r;
    const bb=$("capbar-fill"); if(bb){const pp=pct(r,cap);bb.style.width=pp+"%";bb.style.background=capColor(pp);}
  });

  area.innerHTML=`
  <div style="display:grid;grid-template-columns:1fr 340px;gap:18px;align-items:start">
    <!-- LEFT -->
    <div>
      <!-- Hero -->
      <div class="ev-hero">
        <div class="ev-hero-inner" style="background:linear-gradient(135deg,${ev.color},#EC4899,#F97316)">
          <div class="ev-hero-shade"></div>
          <div class="ev-hero-cnt">
            <span class="ev-hero-emoji">${ev.emoji}</span>
            <div class="ev-hero-title">${ev.title}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px">
              <span class="b" style="background:rgba(255,255,255,.2);color:#fff;border-color:rgba(255,255,255,.3)">${ev.category}</span>
              <span class="b" style="background:rgba(255,255,255,.2);color:#fff;border-color:rgba(255,255,255,.3)">${ev.free?"🆓 Free":"💰 ₹"+ev.price}</span>
              ${!isPart&&CU.role!=="both"?`<span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span>`:""}
              ${isPart?`<span class="rt-badge"><span class="live-dot"></span>Live updates</span>`:""}
            </div>
          </div>
        </div>
      </div>

      <!-- Info grid -->
      <div class="ig">
        <div class="ig-item"><div class="ig-lbl">📅 Date</div><div class="ig-val">${fmtLong(ev.date)}</div></div>
        <div class="ig-item"><div class="ig-lbl">⏰ Time</div><div class="ig-val">${ev.time}</div></div>
        <div class="ig-item"><div class="ig-lbl">📍 Venue</div><div class="ig-val">${ev.venue}</div></div>
        <div class="ig-item"><div class="ig-lbl">👤 Lead Organizer</div><div class="ig-val">${ev.organizer}</div></div>
        <div class="ig-item"><div class="ig-lbl">🗓️ Deadline</div><div class="ig-val">${ev.deadline?fmt(ev.deadline):"Open"}</div></div>
        <div class="ig-item"><div class="ig-lbl">📧 Contact</div><div class="ig-val" style="font-size:12px">${ev.contact||ev.organizer}</div></div>
      </div>

      <!-- Organising Committee -->
      ${(ev.organizers||[]).length>0?`<div class="card" style="margin-bottom:14px">
        <div class="sec-title">🤝 Organising Committee
          ${isOrg?`<button class="btn btn-ghost btn-sm" onclick="manageCoOrgs('${ev.id}')">Manage</button>`:""}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${(ev.organizers||[]).map(email=>{
            const org=ORGANIZERS_DB[email]||USERS[email];
            const nm=org?.name||email.split("@")[0];
            const av=(org?.av||nm.slice(0,2)).toUpperCase();
            return `<div style="display:flex;align-items:center;gap:8px;background:var(--bg);border-radius:10px;padding:9px 13px;cursor:pointer" onclick="showOrgInfo('${email}')">
              <div style="width:30px;height:30px;border-radius:8px;background:${gradCss(av)};display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:11px">${av}</div>
              <div><div style="font-weight:700;font-size:12px">${nm}</div><div style="font-size:10px;color:var(--t3)">${email===ev.orgId?"Lead":"Co-organiser"}</div></div>
            </div>`;
          }).join("")}
        </div>
      </div>`:""}

      ${ev.adminNote?`<div class="card" style="margin-bottom:14px;border-color:${ev.status==="approved"?"rgba(16,185,129,.3)":"rgba(239,68,68,.3)"}">
        <div class="sec-title" style="margin-bottom:6px">💬 Admin Note</div>
        <p style="font-size:13px;color:var(--t2)">${ev.adminNote}</p>
      </div>`:""}

      <!-- Description -->
      <div class="card" style="margin-bottom:14px">
        <div class="sec-title">About</div>
        <p style="font-size:13px;color:var(--t2);line-height:1.7">${ev.desc}</p>
      </div>

      <!-- Schedule -->
      ${ev.schedule?.length?`<div class="card" style="margin-bottom:14px">
        <div class="sec-title">📋 Schedule</div>
        <div style="position:relative;padding-left:18px">
          <div style="position:absolute;left:6px;top:4px;bottom:4px;width:2px;background:var(--p-l)"></div>
          ${ev.schedule.map((s,i)=>`<div style="position:relative;margin-bottom:12px;padding-left:14px">
            <div style="position:absolute;left:-18px;top:4px;width:9px;height:9px;border-radius:99px;background:${i===0?"var(--p)":"var(--bdr)"};border:2px solid ${i===0?"var(--p)":"var(--t3)"}"></div>
            <div style="font-size:10px;font-weight:700;color:var(--p);text-transform:uppercase;letter-spacing:.04em">${s.t}</div>
            <div style="font-size:13px;font-weight:600;color:var(--t1)">${s.a}</div>
          </div>`).join("")}
        </div>
      </div>`:""}

      <!-- Guests -->
      ${ev.guests?.length?`<div class="card" style="margin-bottom:14px">
        <div class="sec-title">⭐ Special Guests</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${ev.guests.map((g,gi)=>{
            const key="g_"+ev.id+"_"+(gi+1);
            const gObj=GUESTS_DB[key];
            const canClick=(CU.role==="admin"||CU.role==="organizer"||CU.role==="both");
            const clickAttr=canClick&&gObj?"onclick=\"showGuestDetail('"+key+"')\" style=\"cursor:pointer\""  :"";
            return "<div "+clickAttr+" style='display:flex;align-items:center;justify-content:space-between;background:var(--ye-l);border:1.5px solid rgba(234,179,8,.2);border-radius:10px;padding:10px 14px;margin-bottom:4px'>"
              +"<div><div style='font-weight:700;font-size:13px'>"+g+"</div>"
              +(gObj?"<div style='font-size:11px;color:var(--t3);margin-top:2px'>"+(gObj.role||"")+" · "+(gObj.topic||"")+"</div>":"")
              +"</div>"
              +(canClick&&gObj?"<button class='btn btn-ghost btn-xs' onclick='event.stopPropagation();showGuestDetail(\""+key+"\")'> Details</button>":"")
              +"</div>";
          }).join("")}
        </div>
      </div>`:""}

      <!-- Sponsors -->
      ${ev.sponsors?.length?`<div class="card">
        <div class="sec-title">🤝 Sponsors</div>
        <div style="display:flex;flex-direction:column;gap:7px">
          ${ev.sponsors.map((s,si)=>{
            const key="s_"+ev.id+"_"+(si+1);
            const sObj=SPONSORS_DB[key];
            const canClick=(CU.role==="admin"||CU.role==="organizer"||CU.role==="both");
            const clickAttr=canClick&&sObj?"onclick=\"showSponsorDetail('"+key+"')\" style=\"cursor:pointer\""  :"";
            return "<div "+clickAttr+" style='display:flex;align-items:center;justify-content:space-between;background:var(--gr-l);border:1px solid rgba(16,185,129,.15);border-radius:9px;padding:9px 13px'>"
              +"<div><div style='font-weight:700;font-size:13px'>"+s+"</div>"
              +(sObj?"<div style='font-size:11px;color:var(--t3);margin-top:1px'>"+(sObj.type||"")+" · "+(sObj.amount||"")+"</div>":"")
              +"</div>"
              +(canClick&&sObj?"<button class='btn btn-ghost btn-xs' onclick='event.stopPropagation();showSponsorDetail(\""+key+"\")'> Details</button>":"")
              +"</div>";
          }).join("")}
        </div>
      </div>`:""}
    </div>

    <!-- RIGHT -->
    <div style="position:sticky;top:18px;display:flex;flex-direction:column;gap:12px">
      <!-- Capacity -->
      <div class="card">
        <div class="sec-title" style="margin-bottom:10px">Capacity</div>
        <div style="text-align:center;margin-bottom:12px">
          <div style="font-family:var(--font-h);font-size:32px;font-weight:800;color:${capColor(p)}" id="live-reg-count">${regC}</div>
          <div style="font-size:12px;color:var(--t3)">/ ${cap} registered</div>
        </div>
        <div class="cap-bar-row"><span>${regC}/${cap}</span><span style="color:${capColor(p)};font-weight:700">${full?"🔴 Full":`${cap-regC} left`}</span></div>
        <div class="cap-bar"><div id="capbar-fill" class="cap-fill" style="width:${p}%;background:${capColor(p)}"></div></div>
        ${waitC>0?`<div style="font-size:11px;color:var(--or);margin-top:5px;text-align:center">⏳ ${waitC} on waitlist</div>`:""}
        ${ev.prizes?`<div style="background:var(--ye-l);border:1.5px solid rgba(234,179,8,.15);border-radius:10px;padding:11px;margin-top:12px;text-align:center"><div style="font-size:10px;font-weight:700;color:var(--t3);margin-bottom:2px">🏆 PRIZES</div><div style="font-weight:800;font-size:13px;color:#92400e">${ev.prizes}</div></div>`:""}

        ${isPart?`<div style="margin-top:12px">
          ${new Date(ev.date)<new Date()?`<div id="post-event-actions"></div>`:`
          <button class="btn ${isReg?"btn-success":isWait?"btn-ghost":full?"btn-ghost":"btn-pri"} btn-w" onclick="${isReg?"showTicketDirect('"+ev.id+"')":isWait?"toast('You are on the waitlist','or')":full?"doRegisterLocal('"+ev.id+"')":"doRegisterLocal('"+ev.id+"')"}">
            ${isReg?"🎫 View My Ticket":isWait?"⏳ On Waitlist":full?"Join Waitlist →":"Register Now →"}
          </button>
          ${isReg?`<button class="btn btn-danger btn-w" style="margin-top:7px;font-size:12px" onclick="cancelDirect('${ev.id}')">Cancel Registration</button>`:""}`}
        </div>`:""}

        ${isAdmin?`<div style="margin-top:12px;display:flex;flex-direction:column;gap:7px">${ev.status==="pending"?`
          <div style="display:flex;gap:7px">
            <button class="btn btn-success" style="flex:1" onclick="adminApproveWithNote('${ev.id}')">✓ Approve</button>
            <button class="btn btn-danger" style="flex:1" onclick="adminRejectWithNote('${ev.id}')">✕ Reject</button>
          </div>
          <button class="btn btn-ghost btn-w" style="color:var(--p);border-color:var(--p)" onclick="go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬 Resolve via Chat</button>`:ev.status==="approved"?`<div style="display:flex;flex-direction:column;gap:6px">
          <div style="text-align:center"><span class="b b-g" style="padding:8px 16px;display:inline-block">✓ Approved</span></div>
          <button class="btn btn-sec btn-w" onclick="go('ev-participants',true,{evId:'${ev.id}'})">👥 Participants</button>
          ${!ev.free?`<button class="btn btn-ghost btn-w" style="color:var(--gr);border-color:var(--gr)" onclick="go('ev-payments',true,{evId:'${ev.id}'})">💳 Payments</button>`:""}
          ${new Date(ev.date)>new Date()?`<button class="btn btn-ghost btn-w" style="color:var(--p);border-color:var(--p)" onclick="go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬 Chat with Committee</button>`:""}
          ${(FEEDBACK[ev.id]||[]).length?`<button class="btn btn-ghost btn-w" style="color:var(--ye);border-color:var(--ye)" onclick="go('ev-feedback-analysis',true,{evId:'${ev.id}'})">⭐ Feedback Analysis (${(FEEDBACK[ev.id]||[]).length})</button>`:""}</div>`:`<div style="width:100%;text-align:center"><span class="b b-r" style="padding:8px 16px;display:inline-block">✕ Rejected</span></div>`}</div>`:""}

        ${isOrg?`<div style="margin-top:12px;display:flex;flex-direction:column;gap:7px">
          <button class="btn btn-sec btn-w" onclick="go('ev-participants',true,{evId:'${ev.id}'})">👥 Participants</button>
          <button class="btn btn-ghost btn-w" style="color:var(--p);border-color:var(--p)" onclick="go('ev-team',true,{evId:'${ev.id}'})">Team & Work Status</button>
          ${!ev.free?`<button class="btn btn-ghost btn-w" style="color:var(--gr);border-color:var(--gr)" onclick="go('ev-payments',true,{evId:'${ev.id}'})">💳 Payments</button>`:""}
          <button class="btn btn-ghost btn-w" onclick="go('ev-analytics',true,{evId:'${ev.id}'})">📊 Event Analytics</button>
          <button class="btn btn-ghost btn-w" onclick="manageCoOrgs('${ev.id}')">🤝 Manage Committee</button>
          
          <button class="btn btn-ghost btn-w" style="color:var(--or);border-color:var(--or)" onclick="go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬 Chat with Admin</button>
          <button class="btn btn-ghost btn-w" style="color:var(--p);border-color:var(--p)" onclick="showEventParticipantChats('${ev.id}')">💬 Chat with Participants</button>
          ${(FEEDBACK[ev.id]||[]).length?`<button class="btn btn-ghost btn-w" style="color:var(--ye);border-color:var(--ye)" onclick="go('ev-feedback-analysis',true,{evId:'${ev.id}'})">⭐ Feedback Analysis (${(FEEDBACK[ev.id]||[]).length} responses)</button>`:""}
        </div>`:""}
      </div>

      </div>
    </div>
  </div>`;

  // Direct actions for participant on detail page
  window.regDirect=evId=>{ doRegisterLocal(evId); };
  window.joinWaitDirect=evId=>{ doRegisterLocal(evId); };
  window.cancelDirect=evId=>{
    const evCheck=EVTS.find(e=>e.id===evId); if(!evCheck) return;
    openModal("Cancel Registration?",`<div style="text-align:center;padding:10px"><div style="font-size:36px;margin-bottom:10px">⚠️</div><div style="font-family:var(--font-h);font-weight:800;font-size:16px;margin-bottom:8px">Cancel registration for ${evCheck.emoji} ${evCheck.title}?</div><div style="font-size:12px;color:var(--re);margin-top:8px;font-weight:600">This cannot be undone.</div></div>`,
      [{label:"Yes, Cancel",cls:"btn-danger",fn:`(function(){REGS['${evId}']=(REGS['${evId}']||[]).filter(e=>e!==CU.email);WAIT['${evId}']=(WAIT['${evId}']||[]).filter(e=>e!==CU.email);firebaseUnregister('${evId}',CU.email);toast("Registration cancelled","or");closeModal();go('ev-detail',false,{evId:'${evId}'});go('ev-detail',true,{evId:'${evId}'})})()`},{label:"No, Keep",cls:"btn-ghost",fn:"closeModal()"}]
    ); return;
    REGS[evId]=(REGS[evId]||[]).filter(e=>e!==CU.email);
    WAIT[evId]=(WAIT[evId]||[]).filter(e=>e!==CU.email);
    firebaseUnregister(evId,CU.email);
    toast("Registration cancelled","or");
    pushNotif(CU.email,`❌ You cancelled your registration for "${EVTS.find(e=>e.id===evId)?.title||evId}".`,"or");
    const ev2=EVTS.find(e=>e.id===evId);
    if(ev2)(ev2.organizers||[ev2.orgId]).forEach(org=>{
      pushNotif(org,`⚠️ ${CU.name} cancelled their registration for "${ev2.title}". Participants: ${(REGS[evId]||[]).length}/${ev2.capacity}`,"or");
    });
    go("ev-detail",false,{evId}); go("ev-detail",true,{evId});
  };
  // Post-event actions rendered into #post-event-actions if that div exists
  (()=>{
    const pea=$("post-event-actions"); if(!pea)return;
    const ev2=EVTS.find(e=>e.id===data?.evId); if(!ev2)return;
    const isPast=new Date(ev2.date)<new Date();
    const isParticipantRole=(CU.role==="participant"||CU.role==="both");
    const isOrgOfThis=(ev2.organizers||[ev2.orgId]).includes(CU.email);
    // Upcoming approved event: show "Chat with Organiser" for participants
    if(!isPast && ev2.status==="approved" && isParticipantRole && !isOrgOfThis){
      const isReg=(REGS[ev2.id]||[]).includes(CU.email);
      if(isReg){
        pea.innerHTML=`<div style="margin-top:8px">
          <button class="btn btn-ghost btn-w" style="color:var(--p);border-color:var(--p)" onclick="startOrgChat('${ev2.id}')">💬 Ask Organiser</button>
        </div>`;
      }
      return;
    }
    if(!isPast)return;
    const attended=(ATTENDANCE[ev2.id]||[]).includes(CU.email);
    const hasFb=!!(FEEDBACK[ev2.id]||[]).find(f=>f.email===CU.email);
    pea.innerHTML=`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
      ${attended?`<button class="btn btn-pri btn-sm" onclick="genCert('${ev2.id}','${CU.email}')">🏆 My Certificate</button>`:`<span class="b b-r" style="padding:7px 12px">❌ Did not attend</span>`}
      ${attended?hasFb?`<span class="b b-y" style="padding:7px 12px">⭐ Feedback submitted</span>`:`<button class="btn btn-sec btn-sm" onclick="go('ev-feedback',true,{evId:'${ev2.id}'})">⭐ Give Feedback</button>`:""}
    </div>`;
  })();
  window.showTicketDirect=evId=>{ const evv=EVTS.find(e=>e.id===evId);
    openModal("🎫 e-Ticket",`<div style="text-align:center">
      <div style="font-size:36px;margin-bottom:8px">${evv?.emoji}</div>
      <div style="font-family:var(--font-h);font-weight:800;font-size:18px;margin-bottom:4px">${evv?.title}</div>
      <div style="font-size:13px;color:var(--t2);margin-bottom:20px">${fmtLong(evv?.date)} · ${evv?.venue}</div>
      <div style="background:var(--p-l);border:2px solid rgba(124,58,237,.15);border-radius:18px;padding:22px;display:inline-block;margin-bottom:14px">
        ${qrDiv("T"+evId+CU.email,112)}
        <div style="font-family:monospace;font-weight:800;color:var(--p);font-size:13px">CP-${evId.toUpperCase()}-${CU.av}</div>
      </div>
      <div style="font-size:12px;color:var(--t3)">Show at event entrance for check-in</div>
    </div>`,[],"");
  };

  window.showOrgInfo=email=>{
    const org=ORGANIZERS_DB[email]||USERS[email];
    if(!org)return;
    const nm=org?.name||email; const av=(org?.av||nm.slice(0,2)).toUpperCase();
    const orgEvts=EVTS.filter(e=>(e.organizers||[e.orgId]).includes(email));
    openModal(`👤 ${nm}`,`
      <div style="text-align:center;margin-bottom:16px">
        <div style="width:56px;height:56px;border-radius:14px;background:${gradCss(av)};display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:20px;margin:0 auto 8px">${av}</div>
        <div style="font-family:var(--font-h);font-weight:800;font-size:17px">${nm}</div>
        <div style="font-size:12px;color:var(--t3)">${org?.dept||""} · ${email}</div>
        ${org?.phone?`<div style="font-size:12px;color:var(--t2);margin-top:3px">📞 ${org.phone}</div>`:""}
      </div>
      <div style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:8px">Events (${orgEvts.length})</div>
      ${orgEvts.map(ev=>`<div style="display:flex;align-items:center;gap:9px;padding:8px 10px;background:var(--bg);border-radius:8px;margin-bottom:5px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:16px">${ev.emoji}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:12px">${ev.title}</div><div style="font-size:10px;color:var(--t3)">${fmt(ev.date)}</div></div>
      </div>`).join("")||`<div style="text-align:center;color:var(--t3);font-size:13px;padding:10px">No events</div>`}
    `,[{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]);
  };
  window.manageCoOrgs=evId=>{
    const ev=EVTS.find(e=>e.id===evId); if(!ev)return;
    const renderList=()=>{
      const el=$("co-org-modal-list"); if(!el)return;
      el.innerHTML=(ev.organizers||[]).map(email=>{
        const org=ORGANIZERS_DB[email]||USERS[email]; const nm=org?.name||email;
        return `<div style="display:flex;align-items:center;gap:9px;padding:9px 11px;background:var(--bg);border-radius:9px;margin-bottom:6px">
          <div style="flex:1"><div style="font-weight:700;font-size:13px">${nm}</div><div style="font-size:11px;color:var(--t3)">${email}</div></div>
          ${email===ev.orgId?`<span class="b b-p">Lead</span>`:`<button class="btn btn-danger btn-xs" onclick="removeCoOrg('${evId}','${email}')">Remove</button>`}
        </div>`;
      }).join("");
    };
    window.removeCoOrg=(evId,email)=>{
      const ev=EVTS.find(e=>e.id===evId); if(!ev)return;
      ev.organizers=(ev.organizers||[]).filter(e=>e!==email);
      renderList(); toast("Co-organiser removed","or");
    };
    window.addCoOrgModal=()=>{
      const email=$("new-co-email").value.trim(); if(!email)return;
      if(!email.endsWith("@scet.ac.in")){toast("⚠️ Only @scet.ac.in emails allowed","re");return;}
      if(!ev.organizers)ev.organizers=[ev.orgId];
      if(ev.organizers.includes(email)){toast("Already in committee","or");return;}
      ev.organizers.push(email); renderList();
      pushNotif(email,`🤝 You have been added as co-organiser for "${ev.title}". Check your My Events tab!`, "p");
      // Also update EVTS in place so the co-org sees it immediately in org-events
      const evIdx=EVTS.findIndex(e=>e.id===ev.id);
      if(evIdx>=0) EVTS[evIdx].organizers=[...ev.organizers];
      $("new-co-email").value=""; 
      toast("✅ Co-organiser added! They will see this in their My Events after navigating there.","gr");
      // Force refresh: if co-org is the current user, refresh their org-events
      if(CU && CU.email !== email && email === CU.email) { go("org-events",true); }
    };
    openModal("🤝 Organising Committee",`
      <div id="co-org-modal-list" style="margin-bottom:14px"></div>
      <div style="display:flex;gap:7px">
        <input class="fi" id="new-co-email" placeholder="Add co-organiser email" style="flex:1">
        <button class="btn btn-sec btn-sm" onclick="addCoOrgModal()">+ Add</button>
      </div>
    `,[{label:"Done",cls:"btn-pri",fn:"closeModal()"}]);
    setTimeout(renderList,50);
  };
};

/* ── EVENT PARTICIPANTS (Organizer / Admin) ── */
VIEWS["ev-participants"] = (area, data)=>{
  const ev=EVTS.find(e=>e.id===data?.evId);
  if(!ev){area.innerHTML="<p>Event not found</p>";return;}
  const regs=(REGS[ev.id]||[]);
  const wait=(WAIT[ev.id]||[]);
  const full=regs.length>=ev.capacity;
  const isPastEvent=new Date(ev.date)<new Date();

  // Set up real-time listener if Firebase available
  listenEventRegs(ev.id, freshEmails=>{
    freshEmails.forEach(email=>{ if(!regs.includes(email)) regs.push(email); });
    const countEl=$("live-pcount"); if(countEl) countEl.textContent=regs.length;
  });

  const INDIAN_NAMES=["Aarav Shah","Aditi Patel","Akash Verma","Ananya Mehta","Arjun Singh","Bhavya Joshi","Chirag Gupta","Deepika Rao","Dhruv Nair","Esha Reddy","Farhan Khan","Gauri Desai","Harshit Sharma","Ishaan Kulkarni","Jahnvi Thakur","Karthik Iyer","Kavya Pillai","Lakshmi Bose","Manish Chandra","Meghna Dubey","Nidhi Ahuja","Nikhil Agarwal","Omkar Patil","Prachi Mishra","Puneet Saxena","Raksha Hegde","Rohan Malhotra","Sahil Batra","Shreya Kapoor","Siddhi Pandey","Soham Chatterjee","Tanvi Bhatt","Uday Rao","Vaibhav Jain","Vandana Mukhopadhyay","Vijay Kumar","Vinita Das","Yash Bansal","Zara Qureshi","Arnav Tiwari","Bhumi Patel","Chetna Sharma","Divyam Agarwal","Ekansh Verma","Falguni Mehta","Girish Nair","Himani Joshi","Ishan Reddy","Janvi Pillai","Kabir Anand"];
  const DEPTS_LIST=["CS","EC","IT","AI","MECH","CHEM","IC","CIVIL"];
  const YEARS_LIST=["1st Year","2nd Year","3rd Year","4th Year"];
  function hashCode(s){let h=0;for(let i=0;i<s.length;i++){h=Math.imul(31,h)+s.charCodeAt(i)|0;}return Math.abs(h);}
  const getProfile=email=>{
    if(PARTICIPANTS_DB[email]) return PARTICIPANTS_DB[email];
    const h=hashCode(email);
    const name=INDIAN_NAMES[h%INDIAN_NAMES.length];
    const dept=DEPTS_LIST[h%DEPTS_LIST.length];
    const year=YEARS_LIST[(h>>2)%YEARS_LIST.length];
    const roll="SCET"+((h%4)+2021)+(dept.padEnd(2,"X")).slice(0,2)+(String(h%999).padStart(3,"0"));
    const phone="+91 9"+String(7000000000+(h%2999999999)).slice(0,10);
    const av=(name.split(" ").map(w=>w[0]).join("")).slice(0,2).toUpperCase();
    return {name,email,phone,year,dept,roll,av,uni:"SCET"};
  };

  const render=()=>{
    const q=(typeof partSearch!=="undefined"?partSearch:"").toLowerCase();
    const regProfs=regs.map(getProfile).filter(p=>!q||p.name.toLowerCase().includes(q)||p.email.toLowerCase().includes(q)||(p.dept||"").toLowerCase().includes(q)||(p.year||"").toLowerCase().includes(q));
    const waitProfs=wait.map(getProfile).filter(p=>!q||p.name.toLowerCase().includes(q)||p.email.toLowerCase().includes(q));
    $("plist-regs").innerHTML=regProfs.length?regProfs.map((p,i)=>`
      <div class="p-row" onclick="go('p-detail',true,{email:'${p.email}',evId:'${ev.id}'})">
        <div style="font-size:11px;font-weight:700;color:var(--t3);width:20px">#${i+1}</div>
        <div class="p-av" style="background:${gradCss(p.av||p.name||"AB")}">${p.av||p.name?.slice(0,2)?.toUpperCase()}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px;color:var(--t1)">${p.name}</div>
          <div style="font-size:11px;color:var(--t3)">${p.dept||"—"} · ${p.year||"—"}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-size:11px;color:var(--t2)">${p.email}</div>
          <div style="font-size:11px;color:var(--t3);margin-top:1px">📞 ${p.phone||"N/A"}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          ${isPastEvent?((ATTENDANCE[ev.id]||[]).includes(p.email)?`<span class="b b-g" style="font-size:10px">✅ Attended</span>`:`<span class="b b-r" style="font-size:10px">❌ Absent</span>`):`<span class="b b-g" style="font-size:10px">✓ Reg</span>`}
          <button class="btn btn-ghost" style="font-size:10px;padding:3px 8px;color:var(--p);border-color:var(--p)" onclick="event.stopPropagation();openChatWithParticipant('${ev.id}','${p.email}')">💬 Chat</button>
        </div>
      </div>`).join(""):`<div style="text-align:center;padding:30px;color:var(--t3);font-size:13px">No registrations yet</div>`;

    if(!full){
      $("wait-section").innerHTML=`<div style="background:var(--gr-l);border:1.5px solid rgba(16,185,129,.15);border-radius:10px;padding:16px;text-align:center">
        <span style="font-size:13px;color:var(--gr);font-weight:600">✅ Event has ${ev.capacity-regs.length} spots remaining — no waitlist active</span>
      </div>`;
    } else {
      $("wait-section").innerHTML=waitProfs.length?waitProfs.map((p,i)=>`
        <div class="p-row" style="background:var(--or-l);border:1px solid rgba(249,115,22,.15)" onclick="go('p-detail',true,{email:'${p.email}',evId:'${ev.id}'})">
          <div style="font-size:11px;font-weight:800;color:var(--or);width:24px">#${i+1}</div>
          <div class="p-av" style="background:linear-gradient(135deg,var(--or),var(--ye))">${p.av||p.name?.slice(0,2)?.toUpperCase()}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px">${p.name}</div>
            <div style="font-size:11px;color:var(--t3)">${p.dept||"—"} · ${p.year||"—"}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:11px;color:var(--t2)">${p.email}</div>
            <div style="font-size:11px;color:var(--t3)">📞 ${p.phone||"N/A"}</div>
          </div>
          <span class="b b-y">⏳</span>
        </div>`).join(""):`<div style="text-align:center;padding:20px;color:var(--t3);font-size:13px">No one on waitlist</div>`;
    }
  };

  let partSearch="";
  window._partSearch=v=>{ partSearch=v; render(); };
  area.innerHTML=`
  <!-- Event summary bar -->
  <div class="card" style="margin-bottom:16px;padding:16px">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <span style="font-size:30px">${ev.emoji}</span>
      <div style="flex:1;min-width:0">
        <div style="font-family:var(--font-h);font-weight:800;font-size:16px">${ev.title}</div>
        <div style="font-size:12px;color:var(--t2)">📅 ${fmt(ev.date)} · 📍 ${ev.venue}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <div style="text-align:center;background:var(--p-l);border-radius:10px;padding:8px 14px">
          <div style="font-weight:800;font-size:18px;color:var(--p)" id="live-pcount">${regs.length}</div>
          <div style="font-size:10px;color:var(--t3)">Registered</div>
        </div>
        <div style="text-align:center;background:var(--or-l);border-radius:10px;padding:8px 14px">
          <div style="font-weight:800;font-size:18px;color:var(--or)">${wait.length}</div>
          <div style="font-size:10px;color:var(--t3)">Waitlist</div>
        </div>
        <div style="text-align:center;background:var(--bg);border-radius:10px;padding:8px 14px">
          <div style="font-weight:800;font-size:18px;color:var(--t2)">${ev.capacity}</div>
          <div style="font-size:10px;color:var(--t3)">Capacity</div>
        </div>
      </div>
    </div>
    <div style="margin-top:12px">${capBar(regs.length,ev.capacity)}</div>
  </div>

  <!-- Action bar -->
  <div style="display:flex;gap:9px;flex-wrap:wrap;margin-bottom:12px;align-items:center">
    <div class="srch-wrap" style="min-width:180px;flex:1"><span class="srch-ico">🔍</span><input class="srch-in" id="part-search" placeholder="Search participants…" oninput="window._partSearch(this.value)"></div>
    <button class="btn btn-ghost btn-sm" onclick="exportCSV('${ev.id}')">⬇ Export CSV</button>

    ${CU.role==="organizer"||CU.role==="both"?`<button class="btn btn-sec btn-sm" onclick="go('ev-analytics',true,{evId:'${ev.id}'})">📊 Stats</button>`:""}
    <span class="rt-badge"><span class="live-dot"></span>Live</span>
  </div>

  <!-- Registered -->
  <div class="card" style="margin-bottom:14px">
    <div class="sec-title">✅ Registered Participants <span class="b b-g">${regs.length}</span></div>
    <div id="plist-regs"></div>
  </div>

  <!-- Waitlist -->
  <div class="card">
    <div class="sec-title">${full?"⏳ Waitlist":"⏳ Waitlist"} <span class="b ${full?"b-r":"b-g"}">${full?"Event Full":"Spots Available"}</span></div>
    <div id="wait-section"></div>
  </div>`;

  render();
  window.sendAnnouncementFromParticipants=evId=>{
    const evv=EVTS.find(e=>e.id===evId); if(!evv)return;
    openModal("📢 Send Announcement","<div class='fg'><label class='fl'>Message to all registered participants of <strong>"+evv.title+"</strong></label><textarea class='fi' id='ann-msg-p' rows='3' placeholder='e.g. Important update about the event...'></textarea></div>",
      [{label:"📢 Send to All",cls:"btn-pri",fn:`(function(){var msg=document.getElementById('ann-msg-p').value.trim();if(!msg){toast("Please enter a message","re");return;}closeModal();var regs=REGS['${evId}']||[];var cnt=0;regs.forEach(email=>{if(email!==CU.email){pushNotif(email,'📢 Announcement for \"${evv.title}\": '+msg,'p');cnt++;}});toast('📢 Notification sent to '+cnt+' participants!','gr');})()`},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  window.showTicket=seed=>{ openModal("🎫 Ticket",`<div style="text-align:center;padding:10px"><div style="display:grid;grid-template-columns:repeat(7,18px);gap:3px;width:126px;margin:0 auto 12px">${qrDiv(seed,126)}</div><div style="font-family:monospace;font-weight:800;color:var(--p);font-size:14px">CP-${seed.slice(0,8).toUpperCase()}</div><div style="font-size:12px;color:var(--t3);margin-top:6px">Scan at event entrance</div></div>`,[]); };
  window.exportCSV=evId=>{
    const list=(REGS[evId]||[]).map(email=>{const p=getProfile(email);return `${p.name},${p.email},${p.phone||'N/A'},${p.dept||'N/A'},${p.year||'N/A'},${p.roll||'N/A'}`;}).join("\n");
    const blob=new Blob(["Name,Email,Phone,Department,Year,Roll No\n"+list],{type:"text/csv"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`participants_${evId}.csv`;a.click();
    toast("⬇ CSV exported","gr");
  };
};

/* ── PARTICIPANT DETAIL ── */
VIEWS["p-detail"] = (area, data)=>{
  // Use real profile or generate realistic one for bulk participants
  const _pd_raw = PARTICIPANTS_DB[data?.email];
  let p;
  if(_pd_raw) {
    p = _pd_raw;
  } else {
    const _em = data?.email||"";
    let _h=0; for(let i=0;i<_em.length;i++){_h=Math.imul(31,_h)+_em.charCodeAt(i)|0;} _h=Math.abs(_h);
    const _names=["Aarav Shah","Aditi Patel","Akash Verma","Ananya Mehta","Arjun Singh","Bhavya Joshi","Chirag Gupta","Deepika Rao","Dhruv Nair","Esha Reddy","Farhan Khan","Gauri Desai","Harshit Sharma","Ishaan Kulkarni","Jahnvi Thakur","Karthik Iyer","Kavya Pillai","Lakshmi Bose","Manish Chandra","Meghna Dubey","Nidhi Ahuja","Nikhil Agarwal","Omkar Patil","Prachi Mishra","Puneet Saxena","Raksha Hegde","Rohan Malhotra","Sahil Batra","Shreya Kapoor","Siddhi Pandey","Soham Chatterjee","Tanvi Bhatt","Uday Rao","Vaibhav Jain","Vijay Kumar","Yash Bansal","Zara Qureshi","Arnav Tiwari","Bhumi Patel","Chetna Sharma","Divyam Agarwal","Ekansh Verma","Falguni Mehta","Girish Nair","Himani Joshi","Ishan Reddy","Janvi Pillai","Kabir Anand"];
    const _depts=["CS","EC","IT","AI","MECH","CHEM","IC","CIVIL"];
    const _years=["1st Year","2nd Year","3rd Year","4th Year"];
    const _nm=_names[_h%_names.length];
    const _dept=_depts[_h%_depts.length];
    const _year=_years[(_h>>2)%_years.length];
    const _roll="SCET"+(2021+(_h%4))+_dept.slice(0,2)+String(_h%999).padStart(3,"0");
    const _phone="+91 9"+String(Math.abs(_h%1000000000)+7000000000).slice(0,10);
    const _av=_nm.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    p = {name:_nm, email:_em, phone:_phone, year:_year, dept:_dept, roll:_roll, av:_av, uni:"SCET"};
  }
  const evId=data?.evId;
  const ev=evId?EVTS.find(e=>e.id===evId):null;
  const allRegEvts=EVTS.filter(e=>(REGS[e.id]||[]).includes(data?.email));
  const allWaitEvts=EVTS.filter(e=>(WAIT[e.id]||[]).includes(data?.email));

  area.innerHTML=`<div style="max-width:640px">
  <!-- Profile card -->
  <div style="background:${gradCss(p.av||p.name||"AB")};border-radius:var(--r-xl);padding:28px;color:#fff;margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:16px">
      <div style="width:64px;height:64px;border-radius:16px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex-shrink:0">${p.av||p.name?.slice(0,2)?.toUpperCase()}</div>
      <div>
        <div style="font-family:var(--font-h);font-size:20px;font-weight:800;margin-bottom:2px">${p.name}</div>
        <div style="opacity:.7;font-size:12px">${p.email}</div>
      </div>
    </div>
  </div>

  <!-- Details -->
  <div class="card" style="margin-bottom:14px">
    <div class="sec-title">Contact & Academic Info</div>
    <div class="g2">
      ${[["📞 Phone",p.phone||"N/A"],["🏫 College",p.uni||CU.uni],["💻 Department",p.dept||"N/A"],["🎓 Year",p.year||"N/A"],["🪪 Roll Number",p.roll||"N/A"],["📧 Email",p.email]].map(([l,v])=>`
      <div style="background:var(--bg);border-radius:10px;padding:12px">
        <div style="font-size:10px;font-weight:700;color:var(--t3);margin-bottom:3px">${l}</div>
        <div style="font-size:13px;font-weight:700;color:var(--t1)">${v}</div>
      </div>`).join("")}
    </div>
  </div>

  <!-- Ticket for this event -->
  ${ev?`<div class="card">
    <div class="sec-title">🎫 Ticket — ${ev.title}</div>
    <div style="display:flex;align-items:center;gap:16px;padding:10px 0">
      <div style="background:var(--p-l);border:2px solid rgba(124,58,237,.15);border-radius:14px;padding:16px;display:inline-block;flex-shrink:0">
        <div style="display:grid;grid-template-columns:repeat(7,14px);gap:2px;margin-bottom:8px">${qrHTML(ev.id+(p.av||"X"),14)}</div>
        <div style="font-family:monospace;font-weight:800;color:var(--p);font-size:11px;text-align:center">CP-${ev.id.toUpperCase()}-${p.av}</div>
      </div>
      <div>
        <div style="font-weight:800;font-size:14px;margin-bottom:4px">${ev.title}</div>
        <div style="font-size:12px;color:var(--t2)">📅 ${fmt(ev.date)}</div>
        <div style="font-size:12px;color:var(--t2)">⏰ ${ev.time}</div>
        <div style="font-size:12px;color:var(--t2)">📍 ${ev.venue}</div>
        <div style="margin-top:8px"><span class="b b-g">✓ Registered</span></div>
      </div>
    </div>
  </div>`:""}
  </div>`;
};

/* ── EVENT ANALYTICS ── */
VIEWS["ev-analytics"] = (area, data)=>{
  const ev=EVTS.find(e=>e.id===data?.evId);
  if(!ev){area.innerHTML="<p>Event not found</p>";return;}
  const regs=(REGS[ev.id]||[]);
  const wait=(WAIT[ev.id]||[]);
  const regC=regs.length, waitC=wait.length, cap=ev.capacity;
  const fillPct=pct(regC,cap);
  const attC=Math.round(regC*.91);
  const attPct=pct(attC,regC)||0;

  // dept breakdown
  const deptMap={};
  regs.forEach(email=>{ const p=PARTICIPANTS_DB[email]||{}; const d=p.dept||"Other"; deptMap[d]=(deptMap[d]||0)+1; });
  const deptLabels=Object.keys(deptMap), deptVals=Object.values(deptMap);
  const ALL_COLORS=["#7C3AED","#EC4899","#F97316","#EAB308","#10B981","#0EA5E9","#8B5CF6","#F43F5E","#06B6D4","#84CC16","#F59E0B","#6366F1"];
  const colors=deptLabels.map((_,i)=>ALL_COLORS[i%ALL_COLORS.length]);

  area.innerHTML=`
  <!-- Event summary -->
  <div class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:16px;padding:16px">
    <span style="font-size:32px">${ev.emoji}</span>
    <div style="flex:1"><div style="font-family:var(--font-h);font-weight:800;font-size:16px">${ev.title}</div><div style="font-size:12px;color:var(--t2)">${fmt(ev.date)} · ${ev.venue}</div></div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-sec btn-sm" onclick="go('ev-participants',true,{evId:'${ev.id}'})">👥 Participants</button>
      <button class="btn btn-ghost btn-sm" onclick="go('ev-detail',true,{evId:'${ev.id}'})">Details</button>
    </div>
  </div>

  <!-- KPIs -->
  <div class="g4" style="margin-bottom:16px">
    ${scard("👥",regC,"Registrations","This event","p","",""+((regC/cap*100).toFixed(0)+"% fill"))}
    ${scard("✅",attC,"Estimated Attendance","",  "gr","","")}
    ${scard("⏳",waitC,"On Waitlist","",           "or")}
    ${scard("📊",fillPct+"%","Capacity Fill","","pk")}
  </div>

  <div class="g2" style="margin-bottom:14px">
    <div class="ch-card"><div class="ch-title">Registration vs Attendance</div><div class="ch-sub">Estimated for ${ev.title}</div><div class="ch-wrap"><canvas id="ch-ev-ra"></canvas></div></div>
    <div class="ch-card"><div class="ch-title">Department Breakdown</div><div class="ch-sub">Who's coming</div><div class="ch-wrap"><canvas id="ch-ev-dept"></canvas></div></div>
  </div>

  <div class="g2" style="margin-bottom:14px">
    <div class="ch-card"><div class="ch-title">Registration Over Time</div><div class="ch-sub">Cumulative trend</div><div class="ch-wrap"><canvas id="ch-ev-time"></canvas></div></div>
    <div class="ch-card"><div class="ch-title">Capacity Gauge</div><div class="ch-sub">${cap-regC} spots remaining</div><div class="ch-wrap"><canvas id="ch-ev-gauge"></canvas></div></div>
  </div>

  <!-- Participant list preview -->
  <div class="card">
    <div class="sec-title">Registered Participants <span class="b b-p">${regC}</span> <button class="btn btn-sec btn-sm" onclick="go('ev-participants',true,{evId:'${ev.id}'})">View All →</button></div>
    ${regs.slice(0,5).map(email=>{const p=PARTICIPANTS_DB[email]||{name:email.split("@")[0],dept:"N/A",year:"N/A",av:email.slice(0,2).toUpperCase(),phone:"N/A"};return `
    <div class="p-row" onclick="go('p-detail',true,{email:'${email}',evId:'${ev.id}'})">
      <div class="p-av" style="background:${gradCss(p.av||"AB")}">${p.av}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:13px">${p.name}</div>
        <div style="font-size:11px;color:var(--t3)">${p.dept} · ${p.year} · 📞 ${p.phone}</div>
      </div>
      <span class="b b-g">✓</span>
    </div>`;}).join("")}
    ${regC>5?`<div style="text-align:center;padding:10px"><button class="btn btn-ghost btn-sm" onclick="go('ev-participants',true,{evId:'${ev.id}'})">View all ${regC} participants →</button></div>`:""}
  </div>`;

  requestAnimationFrame(()=>{
    charts.ra=new Chart($("ch-ev-ra"),{type:"bar",data:{labels:["Registered","Attended","Waitlist"],datasets:[{data:[regC,attC,waitC],backgroundColor:["#7C3AED","#10B981","#F97316"],borderRadius:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"},beginAtZero:true}}}});
    charts.dept=new Chart($("ch-ev-dept"),{type:"doughnut",data:{labels:deptLabels.length?deptLabels:["No registrations"],datasets:[{data:deptVals.length?deptVals:[1],backgroundColor:deptLabels.length?colors:["#E2E8F0"],borderWidth:0,hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:"60%",plugins:{legend:{position:"right",labels:{font:{size:11}}}}}});
    // simulated reg trend
    const days=7, daily=Array.from({length:days},(_,i)=>Math.floor(regC*(i+1)/days));
    charts.time=new Chart($("ch-ev-time"),{type:"line",data:{labels:Array.from({length:days},(_,i)=>`Day ${i+1}`),datasets:[{label:"Cumulative Regs",data:daily,borderColor:"#7C3AED",backgroundColor:"rgba(124,58,237,.1)",tension:.4,fill:true,pointBackgroundColor:"#7C3AED",pointRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"},beginAtZero:true}}}});
    charts.gauge=new Chart($("ch-ev-gauge"),{type:"doughnut",data:{labels:["Filled","Remaining"],datasets:[{data:[regC,Math.max(0,cap-regC)],backgroundColor:[ev.color,"#E2E8F0"],borderWidth:0,circumference:270,rotation:225,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:"70%",plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`${ctx.label}: ${ctx.raw}`}}}}});
  });
};

/* ── VENUE DETAIL ── */
VIEWS["venue-detail"] = (area, v)=>{
  if(!v){area.innerHTML="<p>Not found</p>";return;}
  area.innerHTML=`<div style="max-width:700px">
  <div style="background:linear-gradient(135deg,var(--p-d),var(--pk));border-radius:var(--r-xl);padding:28px;color:#fff;margin-bottom:16px">
    <div style="font-size:44px;margin-bottom:10px">🏛️</div>
    <div style="font-family:var(--font-h);font-size:24px;font-weight:800;margin-bottom:4px">${v.name}</div>
    <div style="opacity:.65;margin-bottom:12px">Capacity: ${v.cap.toLocaleString("en-IN")} people</div>
    <div style="display:flex;gap:7px;flex-wrap:wrap">${v.feats.map(f=>`<span style="background:rgba(255,255,255,.15);border-radius:99px;padding:4px 12px;font-size:11px">${f}</span>`).join("")}</div>
  </div>
  <div class="ig">
    <div class="ig-item"><div class="ig-lbl">Capacity</div><div class="ig-val">${v.cap.toLocaleString("en-IN")}</div></div>
    <div class="ig-item"><div class="ig-lbl">Upcoming Bookings</div><div class="ig-val">${v.booked}</div></div>
    <div class="ig-item"><div class="ig-lbl">Status</div><div class="ig-val"><span class="b ${v.booked>0?"b-o":"b-g"}">${v.booked>0?"In Use":"Available"}</span></div></div>
  </div>
  <div class="card" style="margin-bottom:13px">
    <div class="sec-title">Upcoming Events</div>
    ${v.ev?.length?v.ev.map(u=>`<div style="padding:10px 12px;background:var(--bg);border-radius:9px;margin-bottom:7px;font-weight:600;font-size:13px">📅 ${u}</div>`).join(""):`<p style="color:var(--t3);font-size:13px">No upcoming events.</p>`}
  </div>
  </div>`;
};


/* ══════════════════════════════════════════════════════════
   NEW FEATURE VIEWS
   ══════════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════════
   TEAM & WORK STATUS VIEW
   ══════════════════════════════════════════════════════════ */
