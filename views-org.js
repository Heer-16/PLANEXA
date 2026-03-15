VIEWS["org-dash"] = (area)=>{
  const myEvts=EVTS.filter(e=>(e.organizers||[e.orgId]).includes(CU.email));
  const isOrgOfEv=ev=>(ev.organizers||[ev.orgId]).includes(CU.email);
  const myRegEvts=EVTS.filter(e=>(REGS[e.id]||[]).includes(CU.email)&&!isOrgOfEv(e)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  area.innerHTML=`
  <div class="g4" style="margin-bottom:18px">
    ${scard("🎪",myEvts.length,"My Events","Total created","p","go('org-events')")}
    ${scard("⏳",myEvts.filter(e=>e.status==="pending").length,"Pending Approval","Awaiting review","or","showPendingDetails()")}
    ${scard("✅",myEvts.filter(e=>e.status==="approved").length,"Approved Events","","gr","showApprovedEvents()")}
    ${scard("⭐","4.8 ★","Avg. Rating","Feedback score","ye")}
  </div>
  ${myEvts.filter(e=>e.adminNote||e.status==="pending").length?`<div class="card" style="border-color:rgba(124,58,237,.25);margin-bottom:16px">
    <div class="sec-title" style="margin-bottom:10px">📬 Admin Responses & Pending</div>
    ${myEvts.filter(e=>e.adminNote||e.status==="pending").map(ev=>`<div style="display:flex;align-items:flex-start;gap:10px;padding:11px;background:${ev.status==="approved"?"var(--gr-l)":ev.status==="rejected"?"var(--re-l)":"var(--ye-l)"};border-radius:9px;margin-bottom:7px">
      <span style="font-size:20px;cursor:pointer" onclick="go('ev-detail',true,{evId:'${ev.id}'})">${ev.emoji}</span>
      <div style="flex:1;cursor:pointer" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
        <div style="font-weight:700;font-size:13px">${ev.title}</div>
        <div style="display:flex;gap:5px;margin-top:2px;margin-bottom:4px"><span class="b ${ev.status==="approved"?"b-g":ev.status==="rejected"?"b-r":"b-y"}">${ev.status}</span></div>
        ${ev.adminNote?`<div style="font-size:12px;color:var(--t2)">💬 Admin: "${ev.adminNote}"</div>`:"<div style='font-size:12px;color:var(--t3)'>Awaiting admin review…</div>"}
      </div>
      ${ev.status==="pending"?`<button class="btn btn-ghost btn-xs" style="color:var(--p);border-color:var(--p);flex-shrink:0" onclick="go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬 Chat</button>`:""}
    </div>`).join("")}
  </div>`:""}
  <div class="g2" style="margin-bottom:16px">
    <div class="card">
      <div class="sec-title">My Events <button class="btn btn-pri btn-sm" onclick="go('org-create')">+ Create</button></div>
      ${myEvts.length?myEvts.slice(0,4).map(ev=>{
        const regs=(REGS[ev.id]||[]).length;
        return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg);border-radius:10px;margin-bottom:7px;cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--p-l)'" onmouseout="this.style.background='var(--bg)'" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
          <span style="font-size:22px">${ev.emoji}</span>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ev.title}</div>
            <div style="font-size:11px;color:var(--t3)">${fmt(ev.date)} · ${regs}/${ev.capacity} registered</div>
          </div>
          <span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span>
        </div>`;
      }).join(""):
      `<div class="empty"><div class="empty-ico">🎪</div><h3>No events yet</h3><p>Create your first event</p><button class="btn btn-pri btn-sm" onclick="go('org-create')">Create Event</button></div>`}
    </div>
    <div class="ch-card"><div class="ch-title">Registrations per Event</div><div class="ch-sub">Live count</div><div class="ch-wrap"><canvas id="ch-o-perev"></canvas></div></div>
  </div>
  ${CU.role==="both"&&myRegEvts.length?`<div class="card" style="margin-top:16px">
    <div class="sec-title">🎟️ My Event Registrations <span style="font-size:11px;color:var(--t3);font-weight:400">(as participant)</span> <button class="btn btn-ghost btn-sm" onclick="go('my-regs')">View All →</button></div>
    ${myRegEvts.slice(0,3).map(ev=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--bg);border-radius:10px;margin-bottom:6px;cursor:pointer" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
      <span style="font-size:20px">${ev.emoji}</span>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ev.title}</div>
        <div style="font-size:11px;color:var(--t3)">${fmt(ev.date)} · ${ev.venue}</div>
      </div>
      <span class="b b-g">✓ Registered</span>
    </div>`).join("")}
  </div>`:""}
  <div class="card" style="margin-top:16px">
    <div class="sec-title">Quick Actions</div>
    <div style="display:flex;gap:9px;flex-wrap:wrap">
      <button class="btn btn-pri" onclick="go('org-create')">➕ Create Event</button>
      <button class="btn btn-sec" onclick="go('org-events')">🎪 My Events</button>
      <button class="btn btn-ghost" onclick="go('org-analytics')">📈 Analytics</button>
      ${CU.role==="both"?`<button class="btn btn-ghost" onclick="go('discover')">🔍 Discover Events</button>`:""}
    </div>
  </div>
  ${buildParticipantMsgsPanel()}`;
  window.showApprovedEvents=()=>{
    const approvedList=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(CU.email)&&e.status==="approved");
    if(!approvedList.length){toast("No approved events yet","or");return;}
    openModal(`✅ Approved Events (${approvedList.length})`,
      approvedList.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(ev=>`<div style="display:flex;align-items:center;gap:11px;padding:10px 12px;background:var(--gr-l);border:1px solid rgba(16,185,129,.2);border-radius:10px;margin-bottom:7px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:22px">${ev.emoji}</span>
        <div style="flex:1">
          <div style="font-weight:700;font-size:13px">${ev.title}</div>
          <div style="font-size:11px;color:var(--t3)">📅 ${fmt(ev.date)} · ${(REGS[ev.id]||[]).length}/${ev.capacity} registered</div>
        </div>
        <span class="b b-g">✅</span>
      </div>`).join(""),
      [{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  window.showPendingDetails=()=>{
    const pendingList=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(CU.email)&&e.status==="pending");
    if(!pendingList.length){toast("No pending events","gr");return;}
    openModal(`⏳ Pending Approval (${pendingList.length})`,
      pendingList.map(ev=>`<div style="display:flex;align-items:center;gap:11px;padding:12px;background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;margin-bottom:8px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:26px">${ev.emoji}</span>
        <div style="flex:1">
          <div style="font-weight:700;font-size:13px">${ev.title}</div>
          <div style="font-size:11px;color:var(--t3)">📅 ${fmt(ev.date)} · 📍 ${ev.venue}</div>
          <div style="font-size:11px;color:var(--t3)">Submitted by: ${ev.organizer}</div>
          ${ev.adminNote?`<div style="font-size:11px;color:var(--p);margin-top:3px">💬 Admin: "${ev.adminNote}"</div>`:"<div style='font-size:11px;color:var(--or)'>Awaiting admin review...</div>"}
        </div>
        <div style="display:flex;flex-direction:column;gap:5px">
          <span class="b b-y">⏳ Pending</span>
          <button class="btn btn-ghost btn-xs" style="color:var(--p)" onclick="event.stopPropagation();closeModal();go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬 Chat</button>
        </div>
      </div>`).join(""),
      [{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  requestAnimationFrame(()=>{
    const myE=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(CU.email)).sort((a,b)=>new Date(b.date)-new Date(a.date));
    charts.operev=new Chart($("ch-o-perev"),{type:"bar",data:{labels:myE.map(e=>e.title.slice(0,12)),datasets:[{label:"Registered",data:myE.map(e=>(REGS[e.id]||[]).length),backgroundColor:myE.map(e=>e.color),borderRadius:6},{label:"Capacity",data:myE.map(e=>e.capacity),backgroundColor:"#F1F5F9",borderRadius:6}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"top",labels:{font:{size:11}}}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"}}}}});
  });
};

VIEWS["org-events"] = (area)=>{
  const myEvts=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(CU.email)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  let orgEvSearch="";
  const renderOrgEvs=()=>{
    const q=orgEvSearch.toLowerCase();
    const filtered=myEvts.filter(e=>!q||e.title.toLowerCase().includes(q)||e.venue.toLowerCase().includes(q)||e.category.toLowerCase().includes(q)||e.status.includes(q));
    const el=$("org-ev-grid"); if(!el)return;
    el.innerHTML=!filtered.length?`<div class="empty"><div class="empty-ico">🔍</div><h3>No events found</h3></div>`:filtered.map(ev=>{
      const regs=(REGS[ev.id]||[]).length;
      const wait=(WAIT[ev.id]||[]).length;
      const full=regs>=ev.capacity;
      return `<div class="card" style="cursor:default">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:10px;cursor:pointer;flex:1;min-width:0" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
            <div style="width:44px;height:44px;border-radius:11px;background:${ev.color}18;display:flex;align-items:center;justify-content:center;font-size:21px;flex-shrink:0">${ev.emoji}</div>
            <div style="min-width:0">
              <div style="font-family:var(--font-h);font-weight:800;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ev.title}</div>
              <div style="display:flex;gap:4px;margin-top:3px"><span class="b b-p">${ev.category}</span><span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span></div>
            </div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);margin-bottom:10px">
          <div>📅 ${fmt(ev.date)} · ⏰ ${ev.time}</div>
          <div style="margin-top:2px">📍 ${ev.venue}</div>
        </div>
        ${capBar(regs,ev.capacity)}
        ${wait>0?`<div style="font-size:11px;color:var(--or);margin-top:3px">⏳ ${wait} on waitlist</div>`:""}
        <div style="display:flex;gap:7px;margin-top:12px;flex-wrap:wrap">
          <button class="btn btn-sec btn-sm" style="flex:1" onclick="go('ev-participants',true,{evId:'${ev.id}'})">
            👥 ${full?`Waitlist (${wait})`:`Participants (${regs})`}
          </button>
          <button class="btn btn-ghost btn-sm" style="flex:1" onclick="go('ev-analytics',true,{evId:'${ev.id}'})">📊 Stats</button>
          ${new Date(ev.date)>new Date()?`<button class="btn btn-ghost btn-sm btn-w" style="width:100%;margin-top:4px;color:var(--p);border-color:var(--p)" onclick="go('ev-detail',true,{evId:'${ev.id}'})">📋 View & Manage</button>`:""}
          ${ev.status==="pending"?`<button class="btn btn-ghost btn-sm btn-w" style="width:100%;margin-top:4px;color:var(--or);border-color:var(--or)" onclick="go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬 Chat with Admin</button>`:""}
          ${(FEEDBACK[ev.id]||[]).length?`<button class="btn btn-ghost btn-sm btn-w" style="width:100%;margin-top:4px;color:var(--ye);border-color:var(--ye)" onclick="go('ev-feedback-analysis',true,{evId:'${ev.id}'})">⭐ Feedback Analysis (${(FEEDBACK[ev.id]||[]).length})</button>`:""}
        </div>
      </div>`;
    }).join("");
  };
  area.innerHTML=`
  <div style="display:flex;gap:9px;align-items:center;margin-bottom:14px;flex-wrap:wrap;justify-content:flex-end">
    <button class="btn btn-pri" onclick="go('org-create')">➕ Create New Event</button>
  </div>
  ${!myEvts.length?`<div class="empty"><div class="empty-ico">🎪</div><h3>No events yet</h3><p>Create your first event.</p><button class="btn btn-pri" onclick="go('org-create')">Create Event</button></div>`:""}
  <div class="ga" id="org-ev-grid"></div>`;
  window._orgEvSearch=v=>{orgEvSearch=v;renderOrgEvs();};
  window.sendAnnouncement=evId=>{
    const ev=EVTS.find(e=>e.id===evId); if(!ev)return;
    openModal("📢 Send Announcement to Participants","<div class='fg'><label class='fl'>Message to all registered participants of <strong>"+ev.title+"</strong></label><textarea class='fi' id='ann-msg' rows='3' placeholder='e.g. Reminder: bring your laptop and ID card.'></textarea></div>",
      [{label:"📢 Send to All",cls:"btn-pri",fn:`(function(){var msg=document.getElementById('ann-msg').value.trim();if(!msg){toast("Please enter a message","re");return;}closeModal();var regs=REGS['${evId}']||[];var sentCount=0;regs.forEach(email=>{if(email!==CU.email){pushNotif(email,'📢 Announcement for \"${ev.title}\": '+msg,'p');sentCount++;}});pushNotif('admin@scet.ac.in','📢 ${ev.organizer} announced to participants of \"${ev.title}\": '+msg.slice(0,60),'or');pushNotif('admin2@scet.ac.in','📢 ${ev.organizer} announced to participants of \"${ev.title}\": '+msg.slice(0,60),'or');toast('📢 Notification sent to '+sentCount+' participants!','gr');})()`},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  renderOrgEvs();
  // keep old sendAnnouncement alias
  window.sendAnnouncementFromParticipants=window.sendAnnouncement;
  return;
};

VIEWS["org-create"] = (area)=>{
  let isFree=true, schedRows=[], coOrgs=[];
  area.innerHTML=`<div style="max-width:700px;margin:0 auto">
  <div class="card">
    <div style="font-family:var(--font-h);font-size:19px;font-weight:800;margin-bottom:20px">🎪 Create New Event</div>
    <div class="fgrid">
      <div class="fc2 fg"><label class="fl">Event Title *</label><input class="fi" id="f-title" placeholder="e.g. Annual Hackathon 2025"></div>
      <div class="fg"><label class="fl">Category</label><select class="fi" id="f-cat"><option>Hackathon</option><option>Workshop</option><option>Symposium</option><option>Cultural</option><option>Entrepreneurship</option><option>Sports</option><option>Academic</option><option>Social</option></select></div>
      <div class="fg"><label class="fl">Department</label><input class="fi" id="f-dept" placeholder="e.g. Computer Science"></div>
      <div class="fg"><label class="fl">Venue</label><input class="fi" id="f-venue" placeholder="e.g. Building 32"></div>
      <div class="fg"><label class="fl">Capacity</label><input class="fi" type="number" id="f-cap" value="100" min="1"></div>
      <div class="fg"><label class="fl">Date *</label><input class="fi" type="date" id="f-date"></div>
      <div class="fg"><label class="fl">Time</label><input class="fi" type="time" id="f-time" value="09:00"></div>
      <div class="fg"><label class="fl">Registration Deadline</label><input class="fi" type="date" id="f-ddl"></div>
      <div class="fg">
        <label class="fl">Event Type</label>
        <div class="tog-wrap" style="margin-top:5px">
          <div class="tog-opt on" id="tog-free" onclick="togFree(true)">🆓 Free</div>
          <div class="tog-opt" id="tog-paid" onclick="togFree(false)">💰 Paid</div>
        </div>
      </div>
      <div class="fg hidden" id="price-grp"><label class="fl">Ticket Price (₹)</label><input class="fi" type="number" id="f-price" value="0" min="0"></div>
      <div class="fc2 fg"><label class="fl">Description *</label><textarea class="fi" id="f-desc" rows="3" placeholder="Describe your event..."></textarea></div>
      <div class="fg"><label class="fl">Special Guests / Speakers</label><input class="fi" id="f-guests" placeholder="Names, comma separated"></div>
      <div class="fg"><label class="fl">Sponsors</label><input class="fi" id="f-sponsors" placeholder="e.g. Google, NVIDIA"></div>
      <div class="fg"><label class="fl">Prizes / Benefits</label><input class="fi" id="f-prizes" placeholder="e.g. ₹50,000 Grand Prize"></div>
      <div class="fg"><label class="fl">Contact Email</label><input class="fi" type="email" id="f-contact" placeholder="event@scet.ac.in"></div>
      <div class="fc2 fg">
        <label class="fl">Organising Committee <span style="font-weight:400;color:var(--t3)">(add co-organisers by email)</span></label>
        <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px">
          <div style="flex:1;background:var(--bg);border-radius:9px;padding:9px 12px;font-size:13px">
            <span style="font-weight:700">You:</span> ${CU.name} (${CU.email})
          </div>
        </div>
        <div id="co-org-list" style="display:flex;flex-direction:column;gap:6px;margin-bottom:8px"></div>
        <div style="display:flex;gap:7px">
          <input class="fi" id="co-org-email" placeholder="co-organiser@scet.ac.in" style="flex:1">
          <button class="btn btn-ghost btn-sm" onclick="addCoOrg()">+ Add</button>
        </div>
      </div>
      <div class="fc2 fg">
        <label class="fl">Event Schedule</label>
        <div id="sched-list" style="display:flex;flex-direction:column;gap:7px;margin-bottom:8px"></div>
        <button class="btn btn-ghost btn-sm" onclick="addSchedRow()">+ Add Schedule Item</button>
      </div>
    </div>
    <div style="display:flex;gap:9px;justify-content:flex-end;margin-top:6px">
      <button class="btn btn-ghost" onclick="go('org-events')">Cancel</button>
      <button class="btn btn-pri" onclick="submitEvent()">Submit for Approval →</button>
    </div>
  </div></div>`;

  window.togFree=v=>{
    isFree=v;
    $("tog-free").className="tog-opt"+(v?" on":"");
    $("tog-paid").className="tog-opt"+(!v?" on":"");
    $("price-grp").classList.toggle("hidden",v);
  };
  window.addCoOrg=()=>{
    const email=$("co-org-email").value.trim();
    if(!email){toast("Enter an email","re");return;}
    if(!email.endsWith("@scet.ac.in")){toast("⚠️ Only @scet.ac.in email addresses are allowed","re");return;}
    if(email===CU.email){toast("You are already the primary organiser","or");return;}
    if(coOrgs.includes(email)){toast("Already added","or");return;}
    coOrgs.push(email);
    const d=document.createElement("div");
    d.style.cssText="display:flex;align-items:center;gap:8px;background:var(--p-l);border-radius:9px;padding:9px 12px";
    d.innerHTML=`<span style="flex:1;font-size:13px;font-weight:600">👤 ${email}</span><button class="btn btn-ghost btn-xs" onclick="this.parentElement.remove();coOrgs=coOrgs.filter(e=>e!=='${email}')">✕</button>`;
    $("co-org-list").appendChild(d);
    $("co-org-email").value="";
  };
  window.addSchedRow=()=>{
    const d=document.createElement("div");
    d.style.cssText="display:flex;gap:7px";
    d.innerHTML=`<input class="fi sr-t" placeholder="e.g. 9:00 AM" style="width:140px"><input class="fi sr-a" placeholder="Activity description">`;
    $("sched-list").appendChild(d);
  };
  window.submitEvent=()=>{
    const title=$("f-title").value.trim(), date=$("f-date").value, desc=$("f-desc").value.trim();
    if(!title||!date||!desc){toast("Please fill in title, date and description","re");return;}
    const schedule=[...$("sched-list").querySelectorAll("div")].map(r=>({t:r.querySelector(".sr-t").value,a:r.querySelector(".sr-a").value})).filter(s=>s.t&&s.a);
    const organizers=[CU.email,...coOrgs];
    const nev={
      id:"ev_"+Date.now(), title, emoji:"🎪", color:"#7C3AED",
      category:$("f-cat").value, dept:$("f-dept").value||"General",
      venue:$("f-venue").value||"TBD", capacity:parseInt($("f-cap").value)||100,
      date, time:$("f-time").value, deadline:$("f-ddl").value,
      free:isFree, price:isFree?0:parseInt($("f-price").value)||0,
      desc, guests:$("f-guests").value.split(",").map(s=>s.trim()).filter(Boolean),
      sponsors:$("f-sponsors").value.split(",").map(s=>s.trim()).filter(Boolean),
      prizes:$("f-prizes").value, contact:$("f-contact").value,
      schedule, status:"pending", organizer:CU.name, orgId:CU.email,
      organizers, uni:CU.uni,
    };
    EVTS.push(nev); REGS[nev.id]=[]; WAIT[nev.id]=[];
    firebaseSaveEvent(nev);
    // notify admin
    pushNotif("admin@scet.ac.in", `📋 New event "${title}" submitted for approval by ${CU.name}`, "or", {view:"adm-events"});
    // notify co-organizers
    coOrgs.forEach(email=>{ pushNotif(email, `🤝 ${CU.name} added you as co-organiser for "${title}"`, "p", {view:"org-events"}); });
    toast("🎉 Event submitted for admin approval!","gr");
    go("org-events");
  };
};

VIEWS["org-analytics"] = (area)=>{
  const myEvts=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(CU.email)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  area.innerHTML=`
  <div class="g3" style="margin-bottom:16px">
    ${scard("🎪",myEvts.length,"My Events","","p")}
    ${scard("✅","91%","Attendance Rate","","gr","","+3%")}
    ${scard("⭐","4.8 ★","Avg. Feedback","","ye")}
  </div>
  <p style="font-size:12px;color:var(--t3);margin-bottom:12px">Click an event card below to see detailed analytics for that specific event.</p>
  <div class="ga" style="margin-bottom:16px">
    ${myEvts.map(ev=>{
      const regs=(REGS[ev.id]||[]).length;
      const p=pct(regs,ev.capacity);
      return `<div class="card card-click" onclick="go('ev-analytics',true,{evId:'${ev.id}'})">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <span style="font-size:26px">${ev.emoji}</span>
          <div><div style="font-family:var(--font-h);font-weight:800;font-size:14px">${ev.title}</div><div style="font-size:11px;color:var(--t3)">${fmt(ev.date)}</div></div>
        </div>
        <div style="display:flex;gap:7px;margin-bottom:8px">
          <div style="flex:1;background:var(--bg);border-radius:9px;padding:9px;text-align:center"><div style="font-weight:800;font-size:16px;color:var(--p)">${regs}</div><div style="font-size:10px;color:var(--t3)">Registered</div></div>
          <div style="flex:1;background:var(--bg);border-radius:9px;padding:9px;text-align:center"><div style="font-weight:800;font-size:16px;color:var(--or)">${(WAIT[ev.id]||[]).length}</div><div style="font-size:10px;color:var(--t3)">Waiting</div></div>
          <div style="flex:1;background:var(--bg);border-radius:9px;padding:9px;text-align:center"><div style="font-weight:800;font-size:16px;color:var(--gr)">${p}%</div><div style="font-size:10px;color:var(--t3)">Filled</div></div>
        </div>
        ${capBar(regs,ev.capacity)}
        <div style="text-align:right;margin-top:6px"><span style="font-size:11px;color:var(--p);font-weight:600">View full analytics →</span></div>
      </div>`;
    }).join("")}
  </div>
  <div class="ch-card">
    <div class="ch-title">Overall Registration Comparison</div>
    <div class="ch-sub">All your events</div>
    <div class="ch-wrap" style="height:220px"><canvas id="ch-oa"></canvas></div>
  </div>`;
  const doneMyEvts=myEvts.filter(e=>e.status==="approved"&&new Date(e.date)<new Date());
  requestAnimationFrame(()=>{
    const chartEvts=doneMyEvts.length?doneMyEvts:myEvts; // fallback if no done events
    charts.oa=new Chart($("ch-oa"),{type:"bar",data:{labels:chartEvts.map(e=>e.title.slice(0,14)),datasets:[{label:"Capacity",data:chartEvts.map(e=>e.capacity),backgroundColor:"#E2E8F0",borderRadius:5},{label:"Registered",data:chartEvts.map(e=>(REGS[e.id]||[]).length),backgroundColor:chartEvts.map(e=>e.color),borderRadius:5},{label:"Attended",data:chartEvts.map(e=>(ATTENDANCE[e.id]||[]).length||Math.round((REGS[e.id]||[]).length*.91)),backgroundColor:"#10B981",borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"top",labels:{font:{size:11}}}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"}}}}});
  });
};

/* ══════════════════════════════════════════════════════════
   PARTICIPANT VIEWS
   ══════════════════════════════════════════════════════════ */
