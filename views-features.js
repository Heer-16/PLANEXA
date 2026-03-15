VIEWS["ev-team"] = (area, data)=>{
  const ev=EVTS.find(e=>e.id===data?.evId);
  if(!ev){area.innerHTML="<p>Event not found</p>";return;}
  const team=TEAMS_DB[ev.id]||[];
  const tasks=WORK_STATUS[ev.id]||[];
  const isOrg=(ev.organizers||[ev.orgId]).includes(CU.email)||CU.role==="admin";
  const chatKey="teamchat_"+ev.id;
  if(!TEAM_CHATS[chatKey]) TEAM_CHATS[chatKey]=[];
  const msgs=TEAM_CHATS[chatKey];

  const doneCount=tasks.filter(t=>t.status==="done").length;
  const inProg=tasks.filter(t=>t.status==="in-progress").length;
  const pending=tasks.filter(t=>t.status==="pending").length;
  const pct100=tasks.length?Math.round(doneCount/tasks.length*100):0;

  const statusBadge=s=>s==="done"?'<span class="b b-g">Done</span>':s==="in-progress"?'<span class="b b-o">In Progress</span>':'<span class="b b-y">Pending</span>';
  const priBadge=p=>p==="high"?'<span style="font-size:10px;color:var(--re);font-weight:700">HIGH</span>':p==="med"?'<span style="font-size:10px;color:var(--or);font-weight:700">MED</span>':'<span style="font-size:10px;color:var(--t3);font-weight:700">LOW</span>';

  const renderChat=()=>{
    const el=document.getElementById("team-msgs"); if(!el)return;
    el.innerHTML=msgs.length?msgs.map(m=>{
      const isMe=m.from===CU.email;
      return `<div style="display:flex;flex-direction:${isMe?"row-reverse":"row"};align-items:flex-end;gap:7px;margin-bottom:10px">
        <div style="width:28px;height:28px;border-radius:7px;background:${gradCss(m.av||"AB")};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0">${m.av}</div>
        <div style="max-width:70%">
          <div style="font-size:10px;color:var(--t3);margin-bottom:3px;${isMe?"text-align:right":""}">${m.name} · ${m.time}</div>
          <div style="background:${isMe?"var(--p)":"var(--card)"};color:${isMe?"#fff":"var(--t1)"};border:${isMe?"none":"1px solid var(--bdr)"};border-radius:${isMe?"12px 12px 3px 12px":"12px 12px 12px 3px"};padding:9px 12px;font-size:13px;line-height:1.4">${m.text}</div>
        </div>
      </div>`;
    }).join(""):`<div style="text-align:center;padding:30px;color:var(--t3)"><p>No team messages yet. Start the conversation!</p></div>`;
    el.scrollTop=el.scrollHeight;
  };

  area.innerHTML=`
  <!-- Header -->
  <div class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:14px;padding:14px">
    <span style="font-size:28px">${ev.emoji}</span>
    <div style="flex:1"><div style="font-family:var(--font-h);font-weight:800;font-size:15px">${ev.title}</div>
    <div style="font-size:12px;color:var(--t2)">Team dashboard · ${team.length} team members</div></div>
    <div style="display:flex;gap:7px;font-size:12px">
      <span class="b b-g">${doneCount} done</span>
      <span class="b b-o">${inProg} active</span>
      <span class="b b-y">${pending} pending</span>
    </div>
  </div>

  <!-- Progress bar -->
  <div class="card" style="margin-bottom:14px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div style="font-family:var(--font-h);font-weight:800;font-size:14px">Overall Progress</div>
      <div style="font-size:20px;font-weight:800;color:var(--p)">${pct100}%</div>
    </div>
    <div style="height:10px;background:var(--bg);border-radius:10px;overflow:hidden">
      <div style="height:100%;width:${pct100}%;background:linear-gradient(90deg,var(--p),var(--pk));border-radius:10px;transition:width .5s"></div>
    </div>
    <div style="font-size:11px;color:var(--t3);margin-top:6px">${doneCount} of ${tasks.length} tasks completed</div>
  </div>

  <div class="g2" style="margin-bottom:14px">
    <!-- Team Members -->
    <div class="card">
      <div class="sec-title" style="margin-bottom:12px">Team Members <span class="b b-p">${team.length}</span></div>
      ${team.length?team.map(m=>`
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--bdr)">
        <div style="width:36px;height:36px;border-radius:9px;background:${gradCss(m.av)};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0">${m.av}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px">${m.name}</div>
          <div style="font-size:11px;color:var(--t3)">${m.role} · ${m.dept} · ${m.year}</div>
          <div style="font-size:11px;color:var(--t2)">📞 ${m.phone}</div>
        </div>
        <div style="font-size:11px;color:var(--t3);max-width:90px;word-break:break-all">${m.email}</div>
      </div>`).join(""):`<div style="color:var(--t3);font-size:13px;padding:12px 0">No team members added yet.</div>`}
      ${isOrg?`<button class="btn btn-sec btn-sm btn-w" style="margin-top:12px" onclick="addTeamMember('${ev.id}')">+ Add Member</button>`:""}
    </div>

    <!-- Work Tasks -->
    <div class="card">
      <div class="sec-title" style="margin-bottom:12px">Work Tasks</div>
      ${tasks.map(t=>`
      <div style="display:flex;align-items:flex-start;gap:9px;padding:9px 0;border-bottom:1px solid var(--bdr)">
        <div style="margin-top:2px">
          ${isOrg?`<input type="checkbox" ${t.status==="done"?"checked":""} onchange="toggleTask('${ev.id}','${t.id}',this.checked)" style="width:15px;height:15px;cursor:pointer">`:'<div style="width:15px;height:15px;border-radius:4px;background:'+(t.status==="done"?"var(--gr)":t.status==="in-progress"?"var(--or)":"var(--ye-l)")+'"></div>'}
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px;${t.status==="done"?"text-decoration:line-through;color:var(--t3)":""}">${t.task}</div>
          <div style="font-size:11px;color:var(--t3);margin-top:2px">Assignee: ${t.assignee.split("@")[0]} · Due: ${fmt(t.due)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
          ${statusBadge(t.status)}
          ${priBadge(t.priority)}
        </div>
      </div>`).join("")||`<div style="color:var(--t3);font-size:13px;padding:12px 0">No tasks added yet.</div>`}
      ${isOrg?`<button class="btn btn-sec btn-sm btn-w" style="margin-top:12px" onclick="addTask('${ev.id}')">+ Add Task</button>`:""}
    </div>
  </div>

  <!-- Team Chat -->
  <div class="card" style="display:flex;flex-direction:column">
    <div class="sec-title" style="margin-bottom:10px">Team Chat</div>
    <div id="team-msgs" style="height:260px;overflow-y:auto;margin-bottom:10px;padding:2px"></div>
    <div style="display:flex;gap:8px">
      <input id="team-msg-input" class="fi" placeholder="Message your team..." style="flex:1;margin:0" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendTeamMsg('${ev.id}')}">
      <button class="btn btn-pri" onclick="sendTeamMsg('${ev.id}')">Send</button>
    </div>
  </div>`;

  window.sendTeamMsg=evId=>{
    const inp=document.getElementById("team-msg-input"); if(!inp)return;
    const text=inp.value.trim(); if(!text)return;
    const key="teamchat_"+evId;
    if(!TEAM_CHATS[key]) TEAM_CHATS[key]=[];
    const now=new Date(); const t=now.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
    TEAM_CHATS[key].push({from:CU.email,name:CU.name,av:CU.av,text,time:t,ts:Date.now()});
    // notify co-organizers
    const evv=EVTS.find(e=>e.id===evId);
    (evv?.organizers||[]).filter(e=>e!==CU.email).forEach(org=>pushNotif(org,`💬 Team: ${CU.name} posted in ${evv.title} team chat`,"p",{view:"ev-chat",data:{evId}}));
    inp.value=""; renderChat();
  };
  window.toggleTask=(evId,taskId,done)=>{
    const t=(WORK_STATUS[evId]||[]).find(x=>x.id===taskId); if(!t)return;
    t.status=done?"done":"pending";
    // re-render inline — just update the line-through
    const row=document.querySelector(`input[onchange*="${taskId}"]`)?.closest("div[style*='border-bottom']");
    if(row){ const title=row.querySelector("div[style*='font-weight:700']"); if(title) title.style.cssText=done?"text-decoration:line-through;color:var(--t3)":""; }
    // update progress bar
    const tasks2=WORK_STATUS[evId]||[]; const done2=tasks2.filter(x=>x.status==="done").length;
    const pBar=document.querySelector("div[style*='linear-gradient(90deg,var(--p)']");
    if(pBar) pBar.style.width=Math.round(done2/tasks2.length*100)+"%";
  };
  window.addTeamMember=evId=>{
    openModal("Add Team Member","<div class='fg g2'><input class='fi' id='tm-name' placeholder='Full Name'><input class='fi' id='tm-email' placeholder='Email (@scet.ac.in)'><input class='fi' id='tm-phone' placeholder='Phone'><input class='fi' id='tm-dept' placeholder='Department'><input class='fi' id='tm-year' placeholder='Year (e.g. 2nd Year)'><input class='fi' id='tm-role' placeholder='Role (e.g. Logistics Head)'></div>",
      [{label:"Add",cls:"btn-pri",fn:`(()=>{const n=document.getElementById('tm-name').value.trim();const em=document.getElementById('tm-email').value.trim();const ph=document.getElementById('tm-phone').value.trim();const dep=document.getElementById('tm-dept').value.trim();const yr=document.getElementById('tm-year').value.trim();const rl=document.getElementById('tm-role').value.trim();if(!n||!em){toast('Name and email required','re');return;}if(!em.endsWith('@scet.ac.in')){toast('Only @scet.ac.in emails allowed','re');return;}if(!TEAMS_DB['${evId}'])TEAMS_DB['${evId}']=[];TEAMS_DB['${evId}'].push({email:em,name:n,dept:dep,phone:ph,year:yr,role:rl,av:n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase()});closeModal();toast('Team member added!','gr');go('ev-team',false,{evId:'${evId}'});go('ev-team',true,{evId:'${evId}'});})()`},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  window.addTask=evId=>{
    openModal("Add Task","<div class='fg'><input class='fi' id='tk-task' placeholder='Task description'><input class='fi' id='tk-assign' placeholder='Assignee email (@scet.ac.in)'><input class='fi' id='tk-due' type='date'><select class='fi' id='tk-pri'><option value='high'>High Priority</option><option value='med' selected>Medium</option><option value='low'>Low</option></select></div>",
      [{label:"Add",cls:"btn-pri",fn:`(()=>{const t=document.getElementById('tk-task').value.trim();const a=document.getElementById('tk-assign').value.trim()||CU.email;const d=document.getElementById('tk-due').value;const p=document.getElementById('tk-pri').value;if(!t){toast('Enter task description','re');return;}if(!WORK_STATUS['${evId}'])WORK_STATUS['${evId}']=[];const id='w'+(WORK_STATUS['${evId}'].length+1);WORK_STATUS['${evId}'].push({id,task:t,assignee:a,status:'pending',due:d||'TBD',priority:p});closeModal();toast('Task added!','gr');go('ev-team',false,{evId:'${evId}'});go('ev-team',true,{evId:'${evId}'});})()`},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  renderChat();
};

/* ══════════════════════════════════════════════════════════
   PAYMENT DASHBOARD VIEW (Organiser sees all, Admin sees analytics)
   ══════════════════════════════════════════════════════════ */
VIEWS["ev-payments"] = (area, data)=>{
  const ev=EVTS.find(e=>e.id===data?.evId);
  if(!ev){area.innerHTML="<p>Event not found</p>";return;}
  if(ev.free){area.innerHTML=`<div class="empty"><div class="empty-ico">🆓</div><h3>Free Event</h3><p>No payment tracking needed.</p></div>`;return;}

  const regs=REGS[ev.id]||[];
  const payMap=PAYMENTS[ev.id]||{};
  const isAdmin=CU.role==="admin";

  // Build payment records for all registered participants
  const IPNAMES=["Aarav Shah","Aditi Patel","Akash Verma","Ananya Mehta","Arjun Singh","Bhavya Joshi","Chirag Gupta","Deepika Rao","Dhruv Nair","Esha Reddy","Farhan Khan","Gauri Desai","Harshit Sharma","Ishaan Kulkarni","Jahnvi Thakur","Karthik Iyer","Kavya Pillai","Lakshmi Bose","Manish Chandra","Meghna Dubey"];
  function hc2(s){let h=0;for(let i=0;i<s.length;i++){h=Math.imul(31,h)+s.charCodeAt(i)|0;}return Math.abs(h);}
  const getDeptList2=["CS","EC","IT","AI","MECH","CHEM","IC","CIVIL"];
  const getP2=email=>{if(PARTICIPANTS_DB[email])return PARTICIPANTS_DB[email];const h=hc2(email);return{name:IPNAMES[h%IPNAMES.length],dept:getDeptList2[h%getDeptList2.length],phone:"+91 9"+String(7000000000+(h%2999999999)).slice(0,10),av:(IPNAMES[h%IPNAMES.length].split(" ").map(w=>w[0]).join("")).slice(0,2).toUpperCase()};};
  const records=regs.map(email=>{
    const p=getP2(email)||{name:email.split("@")[0],dept:"N/A",phone:"N/A"};
    const pay=payMap[email]||{status:"pending",method:null,amount:ev.price,date:null};
    return {...p,email,...pay};
  });

  const paid=records.filter(r=>r.status==="paid");
  const pending=records.filter(r=>r.status==="pending");
  const waived=records.filter(r=>r.status==="waived");
  const online=paid.filter(r=>r.method==="online").length;
  const cash=paid.filter(r=>r.method==="cash").length;
  const totalCollected=paid.reduce((s,r)=>s+(r.amount||0),0);

  const statusBadge=r=>r.status==="paid"?`<span class="b b-g">${r.method==="online"?"Online":"Cash"}</span>`:r.status==="waived"?'<span class="b b-bl">Waived</span>':'<span class="b b-y">Pending</span>';

  area.innerHTML=`
  <!-- Header -->
  <div class="card" style="display:flex;align-items:center;gap:12px;margin-bottom:14px;padding:14px">
    <span style="font-size:28px">${ev.emoji}</span>
    <div style="flex:1"><div style="font-family:var(--font-h);font-weight:800;font-size:15px">${ev.title}</div>
    <div style="font-size:12px;color:var(--t2)">Entry fee: Rs ${ev.price} · ${regs.length} registered</div></div>
    ${isAdmin?`<button class="btn btn-sec btn-sm" onclick="go('adm-analytics')">Analytics</button>`:""}
  </div>

  <!-- Stats -->
  <div class="g4" style="margin-bottom:14px">
    ${scard("Rs",totalCollected.toLocaleString("en-IN"),"Total Collected","","gr")}
    ${scard("✅",paid.length,"Paid","","p")}
    ${scard("⏳",pending.length,"Pending","","or")}
    ${scard("🎫",waived.length,"Waived","Organisers/Staff","ye")}
  </div>

  ${isAdmin?`<!-- Admin: payment method chart -->
  <div class="g2" style="margin-bottom:14px">
    <div class="ch-card"><div class="ch-title">Payment Method Split</div><div class="ch-sub">Online vs Cash</div><div class="ch-wrap"><canvas id="ch-pay-method"></canvas></div></div>
    <div class="ch-card"><div class="ch-title">Payment Status</div><div class="ch-sub">All participants</div><div class="ch-wrap"><canvas id="ch-pay-status"></canvas></div></div>
  </div>`:""}

  <!-- Participant Payment Table -->
  <div class="card">
    <div class="sec-title" style="margin-bottom:12px">
      Participant Payment Details
      ${!isAdmin?`<button class="btn btn-ghost btn-sm" onclick="exportPaymentsCSV('${ev.id}')">Export CSV</button>`:""}
    </div>
    <div class="tbl-wrap"><table>
      <thead><tr><th>Participant</th><th>Dept</th><th>Phone</th><th>Amount</th><th>Status</th><th>Date</th>${!isAdmin?"<th>Action</th>":""}</tr></thead>
      <tbody>
        ${records.map(r=>`<tr>
          <td>
            <div style="display:flex;align-items:center;gap:8px">
              <div style="width:30px;height:30px;border-radius:8px;background:${gradCss(r.av||"AB")};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff">${r.av||"?"}</div>
              <div><div class="cell-t">${r.name}</div><div class="cell-s">${r.email}</div></div>
            </div>
          </td>
          <td>${r.dept||"N/A"}</td>
          <td>${r.phone||"N/A"}</td>
          <td><strong>${r.status==="waived"?"Waived":"Rs "+r.amount}</strong></td>
          <td>${statusBadge(r)}</td>
          <td>${r.date?fmt(r.date):"—"}</td>
          ${!isAdmin?`<td onclick="event.stopPropagation()">
            ${r.status==="pending"?`<div style="display:flex;gap:4px">
              <button class="btn btn-success btn-xs" onclick="markPayment('${ev.id}','${r.email}','online')">Online</button>
              <button class="btn btn-sec btn-xs" onclick="markPayment('${ev.id}','${r.email}','cash')">Cash</button>
            </div>`:r.status==="paid"?`<button class="btn btn-ghost btn-xs" onclick="markPayment('${ev.id}','${r.email}','undo')">Undo</button>`:"—"}
          </td>`:""}
        </tr>`).join("")}
      </tbody>
    </table></div>
  </div>`;

  if(isAdmin){
    requestAnimationFrame(()=>{
      const mc=document.getElementById("ch-pay-method");
      const sc=document.getElementById("ch-pay-status");
      if(mc) new Chart(mc,{type:"doughnut",data:{labels:["Online","Cash"],datasets:[{data:[online,cash],backgroundColor:["#7C3AED","#10B981"],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:"60%",plugins:{legend:{position:"right",labels:{font:{size:11}}}}}});
      if(sc) new Chart(sc,{type:"doughnut",data:{labels:["Paid","Pending","Waived"],datasets:[{data:[paid.length,pending.length,waived.length],backgroundColor:["#10B981","#F97316","#94A3B8"],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:"60%",plugins:{legend:{position:"right",labels:{font:{size:11}}}}}});
    });
  }

  window.markPayment=(evId,email,action)=>{
    if(!PAYMENTS[evId]) PAYMENTS[evId]={};
    const evv=EVTS.find(e=>e.id===evId);
    const now=new Date().toISOString().split("T")[0];
    if(action==="undo"){ PAYMENTS[evId][email]={status:"pending",method:null,amount:evv?.price||0,date:null}; }
    else { PAYMENTS[evId][email]={status:"paid",method:action,amount:evv?.price||0,date:now}; }
    pushNotif(email,action==="undo"?`Payment status reset for "${evv?.title}".`:`Payment confirmed (${action}) for "${evv?.title}".`,"gr");
    toast(action==="undo"?"Payment reset":"Payment marked as "+action,"gr");
    go("ev-payments",false,{evId}); go("ev-payments",true,{evId});
  };
  window.exportPaymentsCSV=evId=>{
    const evv=EVTS.find(e=>e.id===evId); const regs2=REGS[evId]||[]; const pm=PAYMENTS[evId]||{};
    const rows=[["Name","Email","Dept","Phone","Amount","Status","Method","Date"]];
    regs2.forEach(email=>{ const p=PARTICIPANTS_DB[email]||{name:email.split("@")[0],dept:"N/A",phone:"N/A"}; const pay=pm[email]||{status:"pending",method:"",amount:evv?.price,date:""}; rows.push([p.name,email,p.dept,p.phone,pay.amount,pay.status,pay.method||"",pay.date||""]); });
    const csv=rows.map(r=>r.join(",")).join("\n"); const a=document.createElement("a"); a.href="data:text/csv,"+encodeURIComponent(csv); a.download=`payments_${evId}.csv`; a.click();
    toast("CSV downloaded","gr");
  };
};

/* ══════════════════════════════════════════════════════════
   VENUE CALENDAR VIEW
   ══════════════════════════════════════════════════════════ */
VIEWS["venue-calendar"] = (area, data)=>{
  const venueId=data?.venueId, venueName=data?.venueName||"Venue";
  const bookings=(VENUE_BOOKINGS[venueId]||[]);
  const approvedBookings=bookings.filter(b=>b.status==="approved");
  const pendingBookings=bookings.filter(b=>b.status==="pending");

  // Build calendar for 6 months from Jan 2026
  const allEventDates={};
  approvedBookings.forEach(b=>{ allEventDates[b.date]={type:"approved",title:b.eventTitle,eventId:b.eventId}; });
  pendingBookings.forEach(b=>{ allEventDates[b.date]={type:"pending",title:b.eventTitle,eventId:b.eventId}; });

  const months=[{y:2026,m:0},{y:2026,m:1},{y:2026,m:2},{y:2026,m:3},{y:2026,m:4},{y:2026,m:5}];
  const monthNames=["January","February","March","April","May","June"];
  const dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const renderMonth=(y,m)=>{
    const firstDay=new Date(y,m,1).getDay();
    const daysInMonth=new Date(y,m+1,0).getDate();
    let cells="";
    for(let i=0;i<firstDay;i++) cells+=`<div></div>`;
    for(let d=1;d<=daysInMonth;d++){
      const dateStr=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      const ev=allEventDates[dateStr];
      const today=new Date().toISOString().split("T")[0];
      const isToday=dateStr===today;
      let bg="transparent", color="var(--t1)", title="";
      if(ev){
        bg=ev.type==="approved"?"var(--re)":"var(--ye)";
        color="#fff"; title=`title="${ev.title}"`;
      }
      cells+=`<div ${title} style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:12px;font-weight:${isToday?"800":"500"};background:${bg};color:${color};border:${isToday?"2px solid var(--p)":"none"};cursor:${ev?"pointer":"default"};position:relative" ${ev?`onclick="go('ev-detail',true,{evId:'${ev.eventId}'})"`:""}>
        ${d}${ev?`<div style="position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:5px;height:5px;border-radius:50%;background:#fff;opacity:.8"></div>`:""}
      </div>`;
    }
    return cells;
  };

  area.innerHTML=`
  <div class="card" style="margin-bottom:14px;padding:16px">
    <div style="font-family:var(--font-h);font-weight:800;font-size:18px;margin-bottom:4px">📅 ${venueName}</div>
    <div style="font-size:13px;color:var(--t2)">Booking calendar · 2026</div>
    <div style="display:flex;gap:12px;margin-top:10px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:4px;background:var(--re)"></div>Booked / Occupied</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:4px;background:var(--ye)"></div>Pending Approval</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:4px;background:var(--gr)"></div>Available</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:12px"><div style="width:14px;height:14px;border-radius:4px;border:2px solid var(--p)"></div>Today</div>
    </div>
  </div>

  <div class="g2" style="gap:12px">
    ${months.map(({y,m})=>`
    <div class="card">
      <div style="font-family:var(--font-h);font-weight:800;font-size:14px;margin-bottom:12px;text-align:center">${monthNames[m]} ${y}</div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:6px">
        ${dayNames.map(d=>`<div style="text-align:center;font-size:10px;font-weight:700;color:var(--t3);padding:2px">${d}</div>`).join("")}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">
        ${renderMonth(y,m)}
      </div>
    </div>`).join("")}
  </div>

  <!-- Booked dates list -->
  <div class="card" style="margin-top:14px">
    <div class="sec-title" style="margin-bottom:10px">All Bookings</div>
    ${[...approvedBookings,...pendingBookings].length?[...approvedBookings,...pendingBookings].sort((a,b)=>a.date.localeCompare(b.date)).map(b=>`
    <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--bdr);cursor:pointer" onclick="go('ev-detail',true,{evId:'${b.eventId}'})">
      <div style="width:10px;height:10px;border-radius:50%;background:${b.status==="approved"?"var(--re)":"var(--ye)"};flex-shrink:0"></div>
      <div style="flex:1"><div style="font-weight:700;font-size:13px">${b.eventTitle}</div>
      <div style="font-size:11px;color:var(--t2)">📅 ${fmt(b.date)}</div></div>
      <span class="b ${b.status==="approved"?"b-g":"b-y"}">${b.status}</span>
    </div>`).join(""):`<div style="text-align:center;padding:20px;color:var(--t3)">No bookings for this venue.</div>`}
  </div>`;
};

/* ══════════════════════════════════════════════════════════
   GUESTS & SPONSORS DETAIL VIEW (shared modal helper)
   ══════════════════════════════════════════════════════════ */
function showGuestDetail(gKey){
  const g=GUESTS_DB[gKey]; if(!g)return;
  openModal("👤 Guest Speaker",`
    <div style="text-align:center;margin-bottom:16px">
      <div style="width:64px;height:64px;border-radius:16px;background:${gradCss(g.name.slice(0,2).toUpperCase())};display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:22px;margin:0 auto 10px">${g.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div>
      <div style="font-family:var(--font-h);font-size:17px;font-weight:800">${g.name}</div>
      <div style="font-size:12px;color:var(--t3);margin-top:3px">${g.role}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="font-size:10px;font-weight:700;color:var(--t3)">PHONE</div><div style="font-weight:700;font-size:13px">${g.phone}</div></div>
      <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="font-size:10px;font-weight:700;color:var(--t3)">TOPIC</div><div style="font-weight:700;font-size:13px">${g.topic}</div></div>
    </div>
    <div style="background:var(--bg);border-radius:10px;padding:12px">
      <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:5px">About</div>
      <div style="font-size:13px;line-height:1.55;color:var(--t1)">${g.about}</div>
    </div>
  `,[{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]);
}
window.showGuestDetail=showGuestDetail;

function showSponsorDetail(sKey){
  const s=SPONSORS_DB[sKey]; if(!s)return;
  openModal("🤝 Sponsor Details",`
    <div style="text-align:center;margin-bottom:16px">
      <div style="width:64px;height:64px;border-radius:16px;background:${gradCss(s.name.slice(0,2).toUpperCase())};display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:22px;margin:0 auto 10px">${s.name.slice(0,2).toUpperCase()}</div>
      <div style="font-family:var(--font-h);font-size:17px;font-weight:800">${s.name}</div>
      <div style="font-size:12px;color:var(--t3);margin-top:3px">${s.type}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="font-size:10px;font-weight:700;color:var(--t3)">PHONE</div><div style="font-weight:700;font-size:13px">${s.phone}</div></div>
      <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="font-size:10px;font-weight:700;color:var(--t3)">CONTRIBUTION</div><div style="font-weight:700;font-size:13px;color:var(--gr)">${s.amount}</div></div>
    </div>
    <div style="background:var(--bg);border-radius:10px;padding:12px">
      <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:5px">About</div>
      <div style="font-size:13px;line-height:1.55;color:var(--t1)">${s.about}</div>
    </div>
  `,[{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]);
}
window.showSponsorDetail=showSponsorDetail;

/* ── PARTICIPANT ↔ ORGANISER CHAT ── */
VIEWS["p-org-chat"] = (area, data)=>{
  const evId=data?.evId;
  const orgEmailRaw=data?.orgEmail||data?.orgId;
  const ev=EVTS.find(e=>e.id===evId);
  if(!ev){area.innerHTML="<p style='padding:20px'>Event not found</p>";return;}

  const allOrgs=(ev.organizers||[ev.orgId]).filter(Boolean);
  const isOrgViewing=allOrgs.includes(CU.email);

  // Determine participant and organiser email for this thread
  let partEmail, orgEmail;
  if(isOrgViewing){
    // Organiser is viewing → participant email must be passed in data
    partEmail=data?.participantEmail||data?.partEmail||"";
    orgEmail=CU.email;
  } else {
    // Participant is viewing → their own email is the participant
    partEmail=CU.email;
    orgEmail=orgEmailRaw&&allOrgs.includes(orgEmailRaw)?orgEmailRaw:(allOrgs[0]||"");
  }

  // Chat key always uses participant email so both sides share the same thread
  const chatKey="porgchat_"+evId+"_"+partEmail;
  if(!CHATS[chatKey]) CHATS[chatKey]=[];
  const msgs=CHATS[chatKey];

  // Get other person's info
  const otherEmail=isOrgViewing?partEmail:orgEmail;
  const otherRaw=PARTICIPANTS_DB[otherEmail]||ORGANIZERS_DB[otherEmail]||USERS[otherEmail]||{};
  const otherName=otherRaw.name||otherEmail.split("@")[0]||"User";
  const otherAv=(otherRaw.av||otherName.slice(0,2)||"?").toUpperCase().slice(0,2);
  const otherPhone=otherRaw.phone||"N/A";
  const otherGrad=gradCss(otherAv);
  const otherRole=isOrgViewing?"Participant":"Organiser";

  if(!msgs.length && !isOrgViewing){
    // Seed welcome message from organiser when participant opens fresh
    const orgD=ORGANIZERS_DB[orgEmail]||USERS[orgEmail]||{};
    const orgN=orgD.name||orgEmail.split("@")[0];
    const orgA=(orgD.av||orgN.slice(0,2)||"OR").toUpperCase().slice(0,2);
    msgs.push({from:orgEmail,name:orgN,av:orgA,
      text:"Hi! I am "+orgN+", organiser of "+ev.title+". Feel free to ask any questions.",
      time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),ts:1});
  }

  const renderMsgsLocal=()=>{
    const el=$("p-org-msgs"); if(!el)return;
    el.innerHTML=msgs.map(m=>{
      const isMe=m.from===CU.email;
      const dir=isMe?"row-reverse":"row";
      const avS=(m.av||"?").toUpperCase().slice(0,2);
      const bgC=gradCss(avS);
      const bBg=isMe?"var(--p)":"var(--card)";
      const bCol=isMe?"#fff":"var(--t1)";
      const bBdr=isMe?"none":"1px solid var(--bdr)";
      const bRad=isMe?"14px 14px 4px 14px":"14px 14px 14px 4px";
      const nAlign=isMe?"text-align:right":"";
      return "<div style='display:flex;flex-direction:"+dir+";align-items:flex-end;gap:8px;margin-bottom:12px'>"
        +"<div style='width:30px;height:30px;border-radius:8px;background:"+bgC+";display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0'>"+avS+"</div>"
        +"<div style='max-width:72%'><div style='font-size:10px;color:var(--t3);margin-bottom:3px;"+nAlign+"'>"+m.name+" &middot; "+m.time+"</div>"
        +"<div style='background:"+bBg+";color:"+bCol+";border:"+bBdr+";border-radius:"+bRad+";padding:10px 13px;font-size:13px;line-height:1.45'>"+m.text+"</div>"
        +"</div></div>";
    }).join("");
    el.scrollTop=el.scrollHeight;
  };

  const headerTitle=isOrgViewing
    ?("Chat with "+otherName)
    :("Chat with Organiser");
  const headerSub=isOrgViewing
    ?(otherPhone+" &middot; "+ev.title)
    :(otherRole+" &middot; "+ev.title+" &middot; "+otherPhone);

  area.innerHTML="<div style='max-width:700px;margin:0 auto;display:flex;flex-direction:column;height:calc(100vh - 140px)'>"
    +"<div class='card' style='display:flex;align-items:center;gap:12px;margin-bottom:12px;padding:14px;flex-shrink:0'>"
    +"<div style='width:42px;height:42px;border-radius:11px;background:"+otherGrad+";display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:15px'>"+otherAv+"</div>"
    +"<div style='flex:1'><div style='font-family:var(--font-h);font-weight:800;font-size:14px'>"+headerTitle+"</div>"
    +"<div style='font-size:11px;color:var(--t3)'>"+headerSub+"</div></div>"
    +"<button class='btn btn-ghost btn-sm' onclick='goBack()'>Back</button></div>"
    +"<div id='p-org-msgs' style='flex:1;overflow-y:auto;padding:4px 2px;margin-bottom:12px'></div>"
    +"<div class='card' style='padding:11px;flex-shrink:0'><div style='display:flex;gap:8px'>"
    +"<input id='p-org-input' class='fi' placeholder='Type a message...' style='flex:1;margin:0'>"
    +"<button class='btn btn-pri' id='p-org-send-btn'>Send</button>"
    +"</div></div></div>";

  const inp=$("p-org-input"); const sendBtn=$("p-org-send-btn");
  const doSend=()=>{
    if(!inp||!inp.value.trim())return;
    const text=inp.value.trim();
    const timeStr=new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
    const avMe=(CU.av||CU.name?.slice(0,2)||"?").toUpperCase().slice(0,2);
    msgs.push({from:CU.email,name:CU.name,av:avMe,text,time:timeStr,ts:Date.now()});
    // Notify the OTHER person
    const notifTarget=isOrgViewing?partEmail:orgEmail;
    if(notifTarget) pushNotif(notifTarget,(isOrgViewing?CU.name+" (Organiser) replied":"Message from "+CU.name)+": "+text.slice(0,60)+(text.length>60?"...":""),"p");
    inp.value=""; renderMsgsLocal();
  };
  if(inp&&inp.addEventListener) inp.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();doSend();}});
  if(sendBtn&&sendBtn.addEventListener) sendBtn.addEventListener("click",doSend);
  renderMsgsLocal();
};



/* ── FEATURE 1: EVENT CHAT (Admin ↔ Organiser) ── */
VIEWS["ev-chat"] = (area, data)=>{
  const evId=data?.evId, orgEmail=data?.orgEmail;
  const ev=EVTS.find(e=>e.id===evId);
  if(!ev){area.innerHTML="<p>Event not found</p>";return;}
  const chatId="chat_"+evId;
  if(!CHATS[chatId]) CHATS[chatId]=[];
  const isAdmin=CU.role==="admin";
  const other = isAdmin
    ? (ORGANIZERS_DB[orgEmail]||{name:orgEmail,av:"OR"})
    : (USERS["admin@scet.ac.in"]||{name:"Dr. Priya Nair",av:"PN"});

  const renderMsgs=()=>{
    const msgs=CHATS[chatId];
    const el=$("chat-msgs"); if(!el)return;
    el.innerHTML=msgs.length?msgs.map(m=>{
      const mine=m.from===CU.email;
      return `<div style="display:flex;flex-direction:${mine?"row-reverse":"row"};gap:8px;align-items:flex-end;margin-bottom:12px">
        <div style="width:30px;height:30px;border-radius:8px;background:${gradCss(m.from.slice(0,2).toUpperCase())};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0">${m.from.slice(0,2).toUpperCase()}</div>
        <div style="max-width:70%">
          <div style="font-size:10px;color:var(--t3);margin-bottom:3px;${mine?"text-align:right":""}">${m.name} · ${m.time}</div>
          <div style="background:${mine?"var(--p)":"var(--card)"};color:${mine?"#fff":"var(--t1)"};border:${mine?"none":"1px solid var(--bdr)"};border-radius:${mine?"14px 14px 2px 14px":"14px 14px 14px 2px"};padding:10px 13px;font-size:13px;line-height:1.5">${m.text}</div>
        </div>
      </div>`;
    }).join(""):`<div style="text-align:center;padding:40px;color:var(--t3)">No messages yet. Start the conversation!</div>`;
    el.scrollTop=el.scrollHeight;
  };

  area.innerHTML=`
  <div class="card" style="margin-bottom:12px;padding:14px">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:24px">${ev.emoji}</span>
      <div style="flex:1">
        <div style="font-weight:800;font-size:14px">${ev.title}</div>
        <div style="font-size:12px;color:var(--t2)">Chat with ${isAdmin?other.name:"Admin — Dr. Sarah Chen"}</div>
      </div>
      <span class="b b-y">⏳ Pending</span>
    </div>
  </div>
  ${!isAdmin?`<div style="background:var(--or-l);border:1px solid rgba(249,115,22,.2);border-radius:10px;padding:11px 14px;margin-bottom:12px;font-size:12px;color:var(--or)">⏳ <strong>Admin is reviewing your event.</strong> Use this chat to answer queries. Event stays pending until admin approves or rejects.</div>`:""}
  <div class="card" style="display:flex;flex-direction:column;height:420px">
    <div id="chat-msgs" style="flex:1;overflow-y:auto;padding:10px"></div>
    <div style="border-top:1px solid var(--bdr);padding:10px;display:flex;gap:8px;align-items:flex-end">
      <textarea id="chat-input" class="fi" rows="2" placeholder="Type your message…" style="flex:1;resize:none" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendChat('${chatId}');}"></textarea>
      <button class="btn btn-pri btn-sm" onclick="sendChat('${chatId}')">Send →</button>
    </div>
  </div>`;

  window.sendChat=(cId)=>{
    const inp=$("chat-input"); if(!inp)return;
    const text=inp.value.trim(); if(!text)return;
    const now=new Date();
    const msg={from:CU.email,name:CU.name,text,time:now.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}),ts:Date.now()};
    CHATS[cId].push(msg);
    inp.value="";
    // notify the other party
    if(CU.role==="admin"){
      // Admin → notify organiser
      const orgEm=(ev.organizers||[ev.orgId])[0];
      pushNotif(orgEm,`💬 Admin ${CU.name} replied on "${ev.title}": ${text.slice(0,60)}${text.length>60?"…":""}`,"p",{view:"ev-chat",data:{evId:ev.id,orgEmail:orgEm}});
    } else {
      // Organiser → notify both admins
      pushNotif("admin@scet.ac.in",`💬 ${CU.name} (re: ${ev.title}): ${text.slice(0,60)}${text.length>60?"…":""}`,"p",{view:"ev-chat",data:{evId:ev.id,orgEmail:CU.email}});
      pushNotif("admin2@scet.ac.in",`💬 ${CU.name} (re: ${ev.title}): ${text.slice(0,60)}${text.length>60?"…":""}`,"p",{view:"ev-chat",data:{evId:ev.id,orgEmail:CU.email}});
    }
    renderMsgs();
  };

  renderMsgs();
};

/* ── FEATURE 2: ADMIN TO-DO LIST ── */
VIEWS["adm-todos"] = (area)=>{
  const typeIco={coordinator:"🎓",guest:"⭐",faculty:"📚",review:"📋"};
  const typeLabel={coordinator:"Faculty Coordinator",guest:"Guest Speaker",faculty:"Faculty",review:"Review Required"};
  const typeCls={coordinator:"b-p",guest:"b-o",faculty:"b-bl",review:"b-y"};

  const render=()=>{
    const _allTodos=getAdminTodos();
    const pending=_allTodos.filter(t=>!t.done);
    const done=_allTodos.filter(t=>t.done);
    const el=$("todo-area"); if(!el)return;
    el.innerHTML=`
    <div style="margin-bottom:6px">
      <div class="sec-title" style="margin-bottom:10px">📋 Pending (${pending.length})</div>
      ${pending.map(t=>{
        const ev=EVTS.find(e=>e.id===t.eventId);
        return `<div style="display:flex;align-items:center;gap:12px;padding:13px 14px;background:var(--card);border:1px solid var(--bdr);border-radius:12px;margin-bottom:8px;transition:box-shadow .15s" onmouseover="this.style.boxShadow='0 2px 12px rgba(124,58,237,.1)'" onmouseout="this.style.boxShadow='none'">
          <input type="checkbox" style="width:18px;height:18px;accent-color:var(--p);cursor:pointer;flex-shrink:0" onchange="toggleTodo('${t.id}',this.checked)">
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:13px;margin-bottom:3px">${t.title}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
              <span class="b ${typeCls[t.type]}">${typeIco[t.type]} ${typeLabel[t.type]}</span>
              ${ev?`<span style="font-size:11px;color:var(--t3)">📅 ${fmt(t.date)}</span>
              <span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}" style="font-size:10px">${ev.status}</span>`:""}
            </div>
          </div>
          ${ev?`<button class="btn btn-ghost btn-xs" onclick="go('ev-detail',true,{evId:'${ev.id}'})">View →</button>`:""}
        </div>`;
      }).join("")||`<div style="text-align:center;padding:20px;color:var(--t3)">All caught up! 🎉</div>`}
    </div>
    ${done.length?`<div style="margin-top:8px">
      <div class="sec-title" style="margin-bottom:10px;color:var(--t3)">✅ Completed (${done.length})</div>
      ${done.map(t=>{
        const ev=EVTS.find(e=>e.id===t.eventId);
        return `<div style="display:flex;align-items:center;gap:12px;padding:11px 14px;background:var(--bg);border-radius:12px;margin-bottom:7px;opacity:.7">
          <input type="checkbox" checked style="width:18px;height:18px;accent-color:var(--p);cursor:pointer;flex-shrink:0" onchange="toggleTodo('${t.id}',this.checked)">
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:13px;text-decoration:line-through;color:var(--t3)">${t.title}</div>
            ${ev?`<span style="font-size:11px;color:var(--t3)">📅 ${fmt(t.date)}</span>`:""}
          </div>
        </div>`;
      }).join("")}
    </div>`:""}`;
  };

  area.innerHTML=`
  <div class="g3" style="margin-bottom:16px">
    ${scard("📋",getAdminTodos().filter(t=>!t.done).length,"Pending Tasks","","or")}
    ${scard("✅",getAdminTodos().filter(t=>t.done).length,"Completed","","gr")}
    ${scard("⭐",getAdminTodos().filter(t=>t.type==="guest").length,"Guest Roles","","ye")}
  </div>
  <div style="display:flex;gap:8px;margin-bottom:14px">
    <button class="btn btn-pri btn-sm" onclick="addTodoModal()">+ Add Task</button>
  </div>
  <div id="todo-area"></div>`;

  window.toggleTodo=(id,checked)=>{
    const t=getAdminTodos().find(x=>x.id===id); if(!t)return;
    t.done=checked; render();
    toast(checked?"✅ Task marked complete":"↩ Task reopened", checked?"gr":"or");
  };
  window.addTodoModal=()=>{
    const evOpts=EVTS.map(e=>`<option value="${e.id}">${e.title}</option>`).join("");
    openModal("➕ Add To-Do",`
      <div class="fg"><label class="fl">Task Description</label><input class="fi" id="td-title" placeholder="e.g. Attend HackSCET as coordinator"></div>
      <div class="fg"><label class="fl">Role Type</label><select class="fi" id="td-type"><option value="coordinator">Faculty Coordinator</option><option value="guest">Guest Speaker</option><option value="faculty">Faculty</option><option value="review">Review Required</option></select></div>
      <div class="fg"><label class="fl">Related Event</label><select class="fi" id="td-event"><option value="">None</option>${evOpts}</select></div>
      <div class="fg"><label class="fl">Date</label><input class="fi" type="date" id="td-date"></div>
    `,[{label:"Add Task",cls:"btn-pri",fn:"doAddTodo()"},{label:"Cancel",cls:"btn-ghost",fn:"closeModal()"}]);
  };
  render();
};


window.doAddTodo=function(){
var el=$("td-title"); var title=el?el.value.trim():"";
if(!title){toast("Enter a task description","re");return;}
var evId=($("td-event")||{}).value||"";
var ev=EVTS.find(e=>e.id===evId);
var _todos=getAdminTodos();
_todos.push({id:"t"+Date.now(),title,type:($("td-type")||{}).value||"coordinator",eventId:evId||null,date:($("td-date")||{}).value||(ev?ev.date:""),done:false});
closeModal();
go("adm-todos",false); go("adm-todos",true);
};

/* ── FEATURE 3a: FEEDBACK VIEW (participant fills it) ── */
VIEWS["ev-feedback"] = (area, data)=>{
  const evId=data?.evId;
  const ev=EVTS.find(e=>e.id===evId);
  if(!ev){area.innerHTML="<p>Event not found</p>";return;}
  if(!FEEDBACK[evId]) FEEDBACK[evId]=[];
  const existing=FEEDBACK[evId].find(f=>f.email===CU.email);
  const attended=(ATTENDANCE[evId]||[]).includes(CU.email);

  area.innerHTML=`
  <div class="card" style="margin-bottom:14px;padding:16px">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:28px">${ev.emoji}</span>
      <div><div style="font-weight:800;font-size:15px">${ev.title}</div>
      <div style="font-size:12px;color:var(--t2)">📅 ${fmt(ev.date)} · 📍 ${ev.venue}</div></div>
    </div>
  </div>
  ${existing?`<div class="card">
    <div style="text-align:center;padding:20px">
      <div style="font-size:40px;margin-bottom:10px">🙏</div>
      <div style="font-family:var(--font-h);font-weight:800;font-size:18px;margin-bottom:6px">Thanks for your feedback!</div>
      <div style="font-size:13px;color:var(--t2);margin-bottom:16px">You rated this event <strong>${existing.q1}/5 ⭐</strong></div>
      <div style="background:var(--bg);border-radius:10px;padding:12px;margin-bottom:8px;text-align:left">
        <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:4px">What you enjoyed most:</div>
        <div style="font-size:13px">${existing.q2}</div>
      </div>
      <div style="background:var(--bg);border-radius:10px;padding:12px;text-align:left">
        <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:4px">Your improvement suggestion:</div>
        <div style="font-size:13px">${existing.q3}</div>
      </div>
    </div>
  </div>`:`<div class="card">
    <div style="font-family:var(--font-h);font-weight:800;font-size:17px;margin-bottom:4px">Share Your Experience</div>
    <div style="font-size:13px;color:var(--t2);margin-bottom:20px">Your feedback helps organisers improve future events.</div>
    <div class="fg" style="margin-bottom:18px">
      <label class="fl">Overall Rating *</label>
      <div id="star-row" style="display:flex;gap:8px;margin-top:6px">
        ${[1,2,3,4,5].map(i=>`<div data-v="${i}" onclick="setRating(${i})" style="font-size:32px;cursor:pointer;transition:transform .1s;user-select:none" onmouseover="hoverRating(${i})" onmouseout="resetRatingHover()">☆</div>`).join("")}
      </div>
    </div>
    ${ev.guests&&ev.guests.length?`<div class="fg" style="margin-bottom:18px">
      <label class="fl">Rate the Guest Speaker(s)</label>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:8px">
        ${ev.guests.map((g,gi)=>`<div style="background:var(--bg);border-radius:10px;padding:11px 13px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <div style="flex:1;min-width:120px"><div style="font-weight:700;font-size:13px">${g}</div><div style="font-size:11px;color:var(--t3)">Speaker / Guest</div></div>
          <div id="gstar-row-${gi}" style="display:flex;gap:5px">
            ${[1,2,3,4,5].map(i=>`<div data-gi="${gi}" data-v="${i}" onclick="setGRating(${gi},${i})" style="font-size:24px;cursor:pointer;user-select:none" onmouseover="hoverGRating(${gi},${i})" onmouseout="resetGRatingHover(${gi})">☆</div>`).join("")}
          </div>
        </div>`).join("")}
      </div>
    </div>`:""}
    <div class="fg" style="margin-bottom:14px">
      <label class="fl">What did you enjoy most? <span style="font-size:11px;color:var(--t3)">(optional)</span></label>
      <textarea class="fi" id="fb-q2" rows="3" placeholder="e.g. The mentors were incredible and the energy was amazing…"></textarea>
    </div>
    <div class="fg" style="margin-bottom:20px">
      <label class="fl">What could be improved?</label>
      <textarea class="fi" id="fb-q3" rows="3" placeholder="e.g. Better Wi-Fi, more food stalls…"></textarea>
    </div>
    <button class="btn btn-pri btn-w" onclick="submitFeedback('${evId}')">Submit Feedback →</button>
  </div>`}`;

  let rating=existing?.q1||0;
  window.setRating=v=>{
    rating=v;
    document.querySelectorAll("#star-row div").forEach(el=>{
      el.textContent=parseInt(el.dataset.v)<=v?"⭐":"☆";
      el.style.transform=parseInt(el.dataset.v)===v?"scale(1.2)":"scale(1)";
    });
  };
  window.hoverRating=v=>{ document.querySelectorAll("#star-row div").forEach(el=>{ el.textContent=parseInt(el.dataset.v)<=v?"⭐":"☆"; }); };
  window.resetRatingHover=()=>{ document.querySelectorAll("#star-row div").forEach(el=>{ el.textContent=parseInt(el.dataset.v)<=rating?"⭐":"☆"; }); };
  const gRatings={};
  window.setGRating=(gi,v)=>{
    gRatings[gi]=v;
    document.querySelectorAll(`#gstar-row-${gi} div`).forEach(el=>{
      el.textContent=parseInt(el.dataset.v)<=v?"⭐":"☆";
      el.style.transform=parseInt(el.dataset.v)===v?"scale(1.2)":"scale(1)";
    });
  };
  window.hoverGRating=(gi,v)=>{ document.querySelectorAll(`#gstar-row-${gi} div`).forEach(el=>{ el.textContent=parseInt(el.dataset.v)<=v?"⭐":"☆"; }); };
  window.resetGRatingHover=gi=>{ const r=gRatings[gi]||0; document.querySelectorAll(`#gstar-row-${gi} div`).forEach(el=>{ el.textContent=parseInt(el.dataset.v)<=r?"⭐":"☆"; }); };
  window.submitFeedback=(eid)=>{
    if(!rating){toast("Please select a star rating","re");return;}
    const q2=($("fb-q2")||{}).value?.trim()||"";
    const q3=($("fb-q3")||{}).value?.trim()||"No suggestions.";
    if(!FEEDBACK[eid]) FEEDBACK[eid]=[];
    FEEDBACK[eid].push({email:CU.email,q1:rating,q2,q3,guestRatings:{...gRatings},ts:Date.now()});
    // notify organisers
    const evv=EVTS.find(e=>e.id===eid);
    (evv?.organizers||[evv?.orgId]).forEach(org=>pushNotif(org,`⭐ ${CU.name} left ${rating}-star feedback for "${evv?.title}"!`,"ye",{view:"ev-feedback-analysis",data:{evId:evv?.id}}));
    pushNotif("admin@scet.ac.in",`⭐ New feedback for "${evv?.title}" — ${rating}/5 stars`,"ye");
    toast("🙏 Feedback submitted! Thank you.","gr");
    go("ev-feedback",false,{evId:eid}); go("ev-feedback",true,{evId:eid});
  };
};

/* ── FEATURE 3b: FEEDBACK ANALYSIS (Organiser + Admin) ── */
VIEWS["org-messages"] = (area)=>{
  const myEvIds=EVTS.filter(e=>(e.organizers||[e.orgId]).includes(CU.email)).map(e=>e.id);
  const threads=[];
  Object.keys(CHATS).forEach(key=>{
    if(key.startsWith("porgchat_")){
      const parts=key.split("_");
      const evId=parts[1];
      const partEmail=parts.slice(2).join("_");
      if(myEvIds.includes(evId)){
        const ev2=EVTS.find(e=>e.id===evId);
        const pInfo=PARTICIPANTS_DB[partEmail]||{name:partEmail.split("@")[0],av:"??"};
        const chatMsgs=CHATS[key]||[];
        const lastMsg=chatMsgs[chatMsgs.length-1];
        const unread=chatMsgs.filter(m=>m.from!==CU.email).length;
        threads.push({key,evId,partEmail,ev2,pInfo,lastMsg,unread,msgCount:chatMsgs.length});
      }
    }
  });
  threads.sort((a,b)=>(b.lastMsg?.ts||0)-(a.lastMsg?.ts||0));

  const totalUnread=threads.reduce((s,t)=>s+t.unread,0);
  area.innerHTML=`
  <div class="g3" style="margin-bottom:16px">
    ${scard("💬",threads.length,"Total Threads","Participant chats","p")}
    ${scard("📨",totalUnread,"Unread Messages","From participants","or")}
    ${scard("🎪",myEvIds.length,"Your Events","With chat enabled","gr")}
  </div>
  ${threads.length?`
  <div class="card">
    <div class="sec-title" style="margin-bottom:12px">All Participant Chats</div>
    <div id="msg-threads-list"></div>
  </div>
  `:`<div class="empty"><div class="empty-ico">💬</div><h3>No messages yet</h3><p>Participants can message you from their registered events using the Ask Organiser button.</p></div>`}`;

  if(threads.length){
    const list=$("msg-threads-list");
    if(list){
      list.innerHTML=threads.map(t=>{
        const av=(t.pInfo.av||"??").toUpperCase().slice(0,2);
        const gc=gradCss(av);
        const lastText=t.lastMsg?t.lastMsg.text.slice(0,60)+(t.lastMsg.text.length>60?"...":""):"No messages yet";
        const lastTime=t.lastMsg?t.lastMsg.time:"";
        const evTitle=t.ev2?t.ev2.emoji+" "+t.ev2.title:t.evId;
        const unreadBadge=t.unread>0?`<span class="b b-o" style="font-size:10px">${t.unread} new</span>`:"";
        const safeEvId=t.evId.replace(/['"]/g,"");
        const safePartEmail=t.partEmail.replace(/['"]/g,"");
        return `<div class="card card-click" style="margin-bottom:10px;padding:14px" data-eid="${safeEvId}" data-pe="${safePartEmail}" onclick="openChatWithParticipant(this.dataset.eid,this.dataset.pe)">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:44px;height:44px;border-radius:12px;background:${gc};display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:16px;flex-shrink:0">${av}</div>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
                <div style="font-family:var(--font-h);font-weight:800;font-size:14px">${t.pInfo.name}</div>
                ${unreadBadge}
              </div>
              <div style="font-size:11px;color:var(--t3);margin-bottom:3px">${evTitle}</div>
              <div style="font-size:12px;color:var(--t2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${lastText}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div style="font-size:11px;color:var(--t3)">${lastTime}</div>
              <div style="font-size:10px;color:var(--t3);margin-top:3px">${t.msgCount} msg${t.msgCount!==1?"s":""}</div>
            </div>
          </div>
        </div>`;
      }).join("");
    }
  }
};

VIEWS["org-feedback"] = (area)=>{
  const myEvts=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(CU.email)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const allFb=myEvts.flatMap(e=>(FEEDBACK[e.id]||[]).map(f=>({...f,evTitle:e.title,evEmoji:e.emoji,evId:e.id})));
  const avgRating=allFb.length?(allFb.reduce((a,f)=>a+f.q1,0)/allFb.length).toFixed(1):"-";

  area.innerHTML=`
  <div class="g3" style="margin-bottom:16px">
    ${scard("⭐",avgRating+" ★","Avg. Rating","All events","ye")}
    ${scard("📝",allFb.length,"Total Responses","","p")}
    ${scard("🎪",myEvts.filter(e=>FEEDBACK[e.id]?.length).length,"Events with Feedback","","gr")}
  </div>
  ${myEvts.map(ev=>{
    const fb=FEEDBACK[ev.id]||[];
    if(!fb.length) return `<div class="card" style="margin-bottom:12px;opacity:.6">
      <div style="display:flex;align-items:center;gap:10px"><span style="font-size:22px">${ev.emoji}</span>
      <div><div style="font-weight:700">${ev.title}</div><div style="font-size:12px;color:var(--t3)">No feedback yet</div></div></div></div>`;
    const avg=(fb.reduce((a,f)=>a+f.q1,0)/fb.length).toFixed(1);
    const dist=[1,2,3,4,5].map(s=>fb.filter(f=>f.q1===s).length);
    const maxD=Math.max(...dist,1);
    return `<div class="card" style="margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <span style="font-size:24px">${ev.emoji}</span>
        <div style="flex:1"><div style="font-weight:800;font-size:14px">${ev.title}</div>
        <div style="font-size:12px;color:var(--t2)">${fmt(ev.date)} · ${fb.length} response${fb.length!==1?"s":""}</div></div>
        <div style="text-align:right"><div style="font-size:22px;font-weight:800;color:var(--ye)">${avg}★</div></div>
      </div>
      <div style="margin-bottom:14px">
        ${[5,4,3,2,1].map(s=>{const c=fb.filter(f=>f.q1===s).length; return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:11px;width:14px;color:var(--t3)">${s}</span>
          <div style="flex:1;height:10px;background:var(--bg);border-radius:99px;overflow:hidden"><div style="height:100%;width:${Math.round(c/maxD*100)}%;background:var(--ye);border-radius:99px;transition:width .4s"></div></div>
          <span style="font-size:11px;color:var(--t3);width:16px">${c}</span>
        </div>`;}).join("")}
      </div>
      <div style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:8px">💬 What participants enjoyed</div>
      ${fb.slice(0,3).map(f=>`<div style="background:var(--bg);border-radius:9px;padding:10px 12px;margin-bottom:6px;font-size:12px">
        <div style="color:var(--ye);margin-bottom:3px">${"⭐".repeat(f.q1)}</div>
        ${f.q2?`<div style="color:var(--t1)">"${f.q2}"</div>`:""}
        ${f.q3&&f.q3!=="No suggestions."?`<div style="color:var(--t3);margin-top:4px;font-size:11px">💡 ${f.q3}</div>`:""}
        ${f.guestRatings&&Object.keys(f.guestRatings).length?`<div style="font-size:10px;color:var(--t3);margin-top:4px">Speakers: ${Object.entries(f.guestRatings).map(([gi,r])=>(ev.guests&&ev.guests[gi]?ev.guests[gi].split(" ")[1]||ev.guests[gi]:"Guest "+(parseInt(gi)+1))+": "+r+"★").join(", ")}</div>`:""}
      </div>`).join("")}
      ${fb.length>3?`<div style="font-size:11px;color:var(--p);text-align:right">+${fb.length-3} more responses</div>`:""}
    </div>`;
  }).join("")}`;
};

VIEWS["ev-feedback-analysis"] = (area, data)=>{
  const ev=EVTS.find(e=>e.id===data?.evId);
  if(!ev){area.innerHTML="<p>Event not found</p>";return;}
  const fb=FEEDBACK[ev.id]||[];
  const attCount=(ATTENDANCE[ev.id]||[]).length;
  if(!fb.length){area.innerHTML=`<div class="empty"><div class="empty-ico">📭</div><h3>No feedback yet</h3><p>Feedback will appear here once participants submit responses.</p></div>`;return;}
  const avg=(fb.reduce((a,f)=>a+f.q1,0)/fb.length).toFixed(1);
  const respRate=attCount?Math.round(fb.length/attCount*100):0;
  const dist=[1,2,3,4,5].map(s=>fb.filter(f=>f.q1===s).length);
  const suggestions=fb.filter(f=>f.q3&&f.q3!=="No suggestions.").map(f=>f.q3);
  area.innerHTML=`
  <button class="btn btn-ghost btn-sm" onclick="goBack()" style="margin-bottom:14px">← Back to Feedback</button>
  <div class="card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:14px">
      <div style="width:56px;height:56px;border-radius:14px;background:${ev.color}18;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0">${ev.emoji}</div>
      <div style="flex:1"><div style="font-family:var(--font-h);font-weight:800;font-size:18px;margin-bottom:2px">${ev.title}</div><div style="font-size:12px;color:var(--t2)">${ev.organizer} · ${fmt(ev.date)}</div></div>
      <div style="text-align:center;flex-shrink:0"><div style="font-size:36px;font-weight:800;color:var(--ye);line-height:1">${avg}</div><div style="font-size:10px;color:var(--t3)">avg rating</div></div>
    </div>
  </div>
  <div class="g3" style="margin-bottom:16px">
    ${scard("📝",fb.length,"Total Responses","Feedback received","p")}
    ${scard("📊",respRate+"%","Response Rate","Of attendees","gr")}
    ${scard("🌟",fb.filter(f=>f.q1===5).length,"5-Star Ratings","Excellent","ye")}
  </div>
  <div class="card" style="margin-bottom:16px">
    <div class="sec-title" style="margin-bottom:16px">⭐ Rating Breakdown</div>
    <div style="display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:center">
      <div style="position:relative"><canvas id="ev-rating-chart" height="200"></canvas>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;pointer-events:none">
          <div style="font-size:24px;font-weight:800;color:var(--ye)">${avg}★</div>
          <div style="font-size:10px;color:var(--t3)">${fb.length} votes</div>
        </div>
      </div>
      <div>${[5,4,3,2,1].map(s=>{const c=dist[s-1];const pct=Math.round(c/Math.max(fb.length,1)*100);const col=s>=4?"var(--gr)":s===3?"var(--ye)":"var(--re)";return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="font-size:13px;font-weight:700;width:32px;color:var(--t2)">${s}★</span><div style="flex:1;height:12px;background:var(--bg);border-radius:99px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${col};border-radius:99px"></div></div><span style="font-size:12px;color:var(--t3);width:60px;text-align:right">${c} (${pct}%)</span></div>`;}).join("")}</div>
    </div>
  </div>
  ${suggestions.length?`<div class="card"><div class="sec-title" style="margin-bottom:12px">💡 Improvement Suggestions (${suggestions.length})</div><div style="display:flex;flex-wrap:wrap;gap:7px">${suggestions.slice(0,24).map(s=>`<div style="background:var(--ye-l);border:1px solid rgba(234,179,8,.2);border-radius:20px;padding:5px 13px;font-size:12px;color:var(--t1)">💡 ${s}</div>`).join("")}${suggestions.length>24?`<div style="background:var(--bg);border-radius:20px;padding:5px 13px;font-size:12px;color:var(--t3)">+${suggestions.length-24} more</div>`:""}</div></div>`:""}`;
  setTimeout(()=>{const ctx=document.getElementById("ev-rating-chart");if(!ctx||!window.Chart)return;if(ctx._chartInst)ctx._chartInst.destroy();ctx._chartInst=new Chart(ctx,{type:"doughnut",data:{labels:["5★","4★","3★","2★","1★"],datasets:[{data:[dist[4],dist[3],dist[2],dist[1],dist[0]],backgroundColor:["#22c55e","#a3e635","#eab308","#f97316","#ef4444"],borderWidth:0,hoverOffset:6}]},options:{responsive:true,cutout:"65%",plugins:{legend:{display:false},tooltip:{callbacks:{label:c2=>c2.label+": "+c2.raw+" responses"}}}}});},100);
};

VIEWS["adm-discover"] = (area)=>{
  const now=new Date();
  let search="",cat="all";
  const futureEvts=EVTS.filter(e=>e.status==="approved"&&new Date(e.date)>=now).sort((a,b)=>new Date(a.date)-new Date(b.date));
  const cats=["all",...new Set(futureEvts.map(e=>e.category))];
  const render=()=>{
    const q=search.toLowerCase();
    const list=futureEvts.filter(e=>(!q||e.title.toLowerCase().includes(q)||e.category.toLowerCase().includes(q)||e.venue.toLowerCase().includes(q))&&(cat==="all"||e.category===cat));
    $("adm-disc-grid").innerHTML=list.length?list.map(ev=>{
      const regs=(REGS[ev.id]||[]).length;
      return `<div class="card card-click" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
        <div style="height:3px;border-radius:3px 3px 0 0;background:linear-gradient(90deg,${ev.color},var(--pk));margin:-20px -20px 14px;position:relative;top:-1px;border-radius:var(--r) var(--r) 0 0"></div>
        <div style="display:flex;align-items:flex-start;gap:11px;margin-bottom:10px">
          <div style="width:46px;height:46px;border-radius:12px;background:${ev.color}18;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${ev.emoji}</div>
          <div style="flex:1;min-width:0">
            <div style="font-family:var(--font-h);font-weight:800;font-size:14px;margin-bottom:4px">${ev.title}</div>
            <div style="display:flex;gap:5px;flex-wrap:wrap"><span class="b b-p">${ev.category}</span>${ev.free?'<span class="b b-g">Free</span>':'<span class="b b-o">₹'+ev.price+'</span>'}</div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);line-height:1.5;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${ev.desc}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:11px;color:var(--t2);margin-bottom:10px">
          <span>📅 ${fmt(ev.date)}</span><span>⏰ ${ev.time}</span>
          <span>📍 ${ev.venue}</span><span>👤 ${ev.organizer}</span>
        </div>
        ${capBar(regs,ev.capacity)}
      </div>`;
    }).join(""):`<div class="empty" style="grid-column:1/-1"><div class="empty-ico">📅</div><h3>No upcoming events</h3><p>All approved upcoming events will appear here.</p></div>`;
    $("adm-disc-count").textContent=list.length+" upcoming event(s)";
  };
  area.innerHTML=`
  <div class="card" style="display:flex;flex-wrap:wrap;gap:9px;align-items:center;margin-bottom:14px;padding:13px">
    <div class="srch-wrap" style="min-width:180px;flex:1"><span class="srch-ico">🔍</span><input class="srch-in" placeholder="Search upcoming events…" oninput="window._admDiscSearch(this.value)"></div>
    <select class="fi" style="width:auto" onchange="window._admDiscCat(this.value)">${cats.map(c=>`<option value="${c}">${c==="all"?"All Categories":c}</option>`).join("")}</select>
  </div>
  <div id="adm-disc-count" style="font-size:11px;color:var(--t3);margin-bottom:10px"></div>
  <div id="adm-disc-grid" class="ga"></div>`;
  window._admDiscSearch=v=>{search=v;render();};
  window._admDiscCat=v=>{cat=v;render();};
  render();
};

VIEWS["adm-feedback"] = (area)=>{
  const allFb=EVTS.flatMap(e=>(FEEDBACK[e.id]||[]).map(f=>({...f,evTitle:e.title,evEmoji:e.emoji,evId:e.id})));
  const avgRating=allFb.length?(allFb.reduce((a,f)=>a+f.q1,0)/allFb.length).toFixed(1):"-";
  const evWithFb=EVTS.filter(e=>(FEEDBACK[e.id]||[]).length>0);

  area.innerHTML=`
  <div class="g4" style="margin-bottom:18px">
    ${scard("⭐",avgRating+" ★","Campus Avg Rating","All events","ye")}
    ${scard("📝",allFb.length,"Total Responses","All events","p")}
    ${scard("🎪",evWithFb.length,"Events with Feedback","","gr")}
    ${scard("🔔",EVTS.filter(e=>new Date(e.date)<new Date()&&!(FEEDBACK[e.id]||[]).length).length,"Awaiting Feedback","Past events","or")}
  </div>
  ${evWithFb.map(ev=>{
    const fb=FEEDBACK[ev.id]||[];
    const avg=(fb.reduce((a,f)=>a+f.q1,0)/fb.length).toFixed(1);
    const maxD=Math.max(...[1,2,3,4,5].map(s=>fb.filter(f=>f.q1===s).length),1);
    return `<div class="card" style="margin-bottom:14px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <span style="font-size:24px">${ev.emoji}</span>
        <div style="flex:1">
          <div style="font-weight:800;font-size:14px">${ev.title}</div>
          <div style="font-size:12px;color:var(--t2)">${ev.organizer} · ${fmt(ev.date)} · ${fb.length} response${fb.length!==1?"s":""}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:24px;font-weight:800;color:var(--ye)">${avg}★</div>
          <div style="font-size:10px;color:var(--t3)">${fb.length} votes</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:8px">RATING DISTRIBUTION</div>
          ${[5,4,3,2,1].map(s=>{const c=fb.filter(f=>f.q1===s).length; return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span style="font-size:11px;width:14px;color:var(--t3)">${s}★</span>
            <div style="flex:1;height:8px;background:var(--bg);border-radius:99px;overflow:hidden"><div style="height:100%;width:${Math.round(c/maxD*100)}%;background:${s>=4?"var(--gr)":s===3?"var(--ye)":"var(--re)"};border-radius:99px"></div></div>
            <span style="font-size:10px;color:var(--t3);width:16px">${c}</span>
          </div>`;}).join("")}
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:8px">Q1: WHAT DID THEY ENJOY?</div>
          ${fb.slice(0,3).map(f=>`<div style="background:var(--bg);border-radius:8px;padding:8px 10px;margin-bottom:6px;font-size:11px">
            <div style="color:var(--ye);margin-bottom:2px">${"⭐".repeat(f.q1)}</div>
            ${f.q2?`<div>${f.q2}</div>`:""}
            ${f.guestRatings&&Object.keys(f.guestRatings).length?`<div style="color:var(--t3);margin-top:3px">Speakers: ${Object.entries(f.guestRatings).map(([gi,r])=>"G"+(parseInt(gi)+1)+": "+r+"★").join(", ")}</div>`:""}
          </div>`).join("")}
        </div>
      </div>
      <div style="font-size:11px;font-weight:700;color:var(--t3);margin-bottom:8px">Q2: IMPROVEMENT SUGGESTIONS</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${fb.filter(f=>f.q3&&f.q3!=="No suggestions.").map(f=>`<div style="background:var(--ye-l);border:1px solid rgba(234,179,8,.2);border-radius:20px;padding:5px 12px;font-size:11px;color:var(--t1)">💡 ${f.q3}</div>`).join("")||`<div style="font-size:12px;color:var(--t3)">No improvement suggestions yet</div>`}
      </div>
    </div>`;
  }).join("")||`<div class="card" style="text-align:center;padding:32px"><div style="font-size:40px;margin-bottom:10px">📭</div><div style="font-weight:700">No feedback collected yet</div><div style="font-size:13px;color:var(--t3);margin-top:6px">Feedback from past events will appear here</div></div>`}`;
};

/* ── FEATURE 4: E-CERTIFICATE ── */
function genCert(evId, email){
  const ev=EVTS.find(e=>e.id===evId);
  const p=PARTICIPANTS_DB[email]||USERS[email]||{name:email,av:"??"};
  if(!ev||!p)return;
  // Different cert styles per event category
  const certStyles={
    "Hackathon":     {bg:"linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)",accent:"#818cf8",badge:"🏆",border:"rgba(129,140,248,.4)"},
    "Workshop":      {bg:"linear-gradient(135deg,#052e16,#14532d,#166534)",accent:"#4ade80",badge:"📚",border:"rgba(74,222,128,.4)"},
    "Symposium":     {bg:"linear-gradient(135deg,#1c1917,#44403c,#57534e)",accent:"#fbbf24",badge:"🎓",border:"rgba(251,191,36,.4)"},
    "Cultural":      {bg:"linear-gradient(135deg,#4a044e,#701a75,#86198f)",accent:"#f0abfc",badge:"🎭",border:"rgba(240,171,252,.4)"},
    "Technical":     {bg:"linear-gradient(135deg,#0c4a6e,#075985,#0369a1)",accent:"#38bdf8",badge:"⚙️",border:"rgba(56,189,248,.4)"},
    "Entrepreneurship":{bg:"linear-gradient(135deg,#431407,#7c2d12,#9a3412)",accent:"#fb923c",badge:"💡",border:"rgba(251,146,60,.4)"},
    "Sports":        {bg:"linear-gradient(135deg,#052e16,#14532d,#065f46)",accent:"#34d399",badge:"🏅",border:"rgba(52,211,153,.4)"},
  };
  const cs=certStyles[ev.category]||{bg:"linear-gradient(135deg,#1a0533,#3b0764)",accent:"#c084fc",badge:"🏆",border:"rgba(192,132,252,.4)"};
  openModal("🏆 E-Certificate",`
    <div id="cert-box" style="background:${cs.bg};border-radius:16px;padding:28px;text-align:center;color:#fff;position:relative;overflow:hidden">
      <div style="position:absolute;top:-30px;left:-30px;width:120px;height:120px;border-radius:50%;background:${cs.border}"></div>
      <div style="position:absolute;bottom:-20px;right:-20px;width:100px;height:100px;border-radius:50%;background:rgba(236,72,153,.2)"></div>
      <div style="font-size:40px;margin-bottom:6px">${cs.badge}</div>
      <div style="font-size:10px;letter-spacing:3px;opacity:.7;margin-bottom:4px">CERTIFICATE OF PARTICIPATION</div>
      <div style="font-size:11px;color:${cs.accent};opacity:.8;margin-bottom:18px">Planexa</div>
      <div style="font-size:11px;opacity:.7;margin-bottom:6px">This is to certify that</div>
      <div style="font-family:var(--font-h);font-size:22px;font-weight:800;margin-bottom:6px;background:linear-gradient(90deg,#f9a8d4,#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${p.name}</div>
      <div style="font-size:11px;opacity:.6;margin-bottom:18px">${p.email}</div>
      <div style="font-size:11px;opacity:.7;margin-bottom:8px">successfully participated in</div>
      <div style="font-size:16px;font-weight:800;margin-bottom:4px">${ev.emoji} ${ev.title}</div>
      <div style="font-size:12px;opacity:.7;margin-bottom:18px">📅 ${fmtLong(ev.date)} · 📍 ${ev.venue}</div>
      <div style="display:flex;justify-content:center;gap:20px">
        <div style="text-align:center">
          <div style="width:80px;height:1px;background:rgba(255,255,255,.3);margin-bottom:4px"></div>
          <div style="font-size:10px;opacity:.6">${ev.organizer}</div>
          <div style="font-size:9px;opacity:.4">Event Organiser</div>
        </div>
        <div style="text-align:center">
          <div style="width:80px;height:1px;background:rgba(255,255,255,.3);margin-bottom:4px"></div>
          <div style="font-size:10px;opacity:.6">Dr. Sarah Chen</div>
          <div style="font-size:9px;opacity:.4">Faculty Coordinator</div>
        </div>
      </div>
      <div style="margin-top:14px;font-size:9px;opacity:.4">Cert ID: CP-${evId.toUpperCase()}-${(p.av||"XX")}-${Date.now().toString(36).toUpperCase()}</div>
    </div>`,
    [{label:"⬇ Download",cls:"btn-pri",fn:`downloadCert('${evId}','${email}')`},{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]
  );
}
window.downloadCert=(evId,email)=>{
  const ev=EVTS.find(e=>e.id===evId);
  const p=PARTICIPANTS_DB[email]||USERS[email]||{name:email,av:"XX"};
  const box=document.getElementById("cert-box");
  if(!box){ toast("Certificate not ready — please open it first","re"); return; }

  // Show progress
  const btn = document.querySelector('[onclick*="downloadCert"]');
  if(btn){ btn.textContent="⏳ Preparing…"; btn.disabled=true; }

  // Temporarily expand for full capture
  const orig = {overflow:box.style.overflow, height:box.style.height};
  box.style.overflow="visible"; box.style.height="auto";

  (window.html2canvas ? Promise.resolve() : Promise.reject("no html2canvas"))
    .then(()=> html2canvas(box, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        allowTaint: true
      })
    )
    .then(canvas => {
      // Restore box
      box.style.overflow = orig.overflow; box.style.height = orig.height;

      // Build a clean PNG download
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Planexa_Certificate_${(p.name||email).replace(/\s+/g,"_")}_${evId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      if(btn){ btn.textContent="⬇ Download"; btn.disabled=false; }
      toast("📜 Certificate downloaded successfully!","gr");
    })
    .catch(err => {
      box.style.overflow = orig.overflow; box.style.height = orig.height;
      console.error("html2canvas error:", err);
      // Fallback: open as printable page
      const win = window.open("","_blank");
      if(win){
        win.document.write(`<!DOCTYPE html><html><head><title>Certificate</title><style>body{margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1240;}@media print{body{background:none;}}</style></head><body>${box.outerHTML}</body></html>`);
        win.document.close();
        setTimeout(()=>win.print(), 600);
      }
      if(btn){ btn.textContent="⬇ Download"; btn.disabled=false; }
      toast("📜 Certificate opened for printing","gr");
    });
};

