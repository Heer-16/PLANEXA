VIEWS["adm-dash"] = (area)=>{
  const pending=EVTS.filter(e=>e.status==="pending");
  const now=new Date(); const thisMonth=now.getMonth(); const thisYear=now.getFullYear();
  const eventsThisMonth=EVTS.filter(e=>{const d=new Date(e.date);return d.getMonth()===thisMonth&&d.getFullYear()===thisYear;}).length;
  const renderPending=()=>{
    const pEl=$("pending-section");
    if(!pEl)return;
    const pList=EVTS.filter(e=>e.status==="pending");
    pEl.innerHTML=pList.length?`<div class="card" style="border-color:#FED7AA;margin-bottom:16px">
    <div class="sec-title" style="margin-bottom:12px">⚠️ Pending Approvals <span class="b b-o" style="font-size:11px">${pList.length}</span></div>
    ${pList.map(ev=>`<div style="display:flex;align-items:center;justify-content:space-between;background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:13px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:11px;cursor:pointer;flex:1" onclick="go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:26px">${ev.emoji}</span>
        <div>
          <div style="font-weight:700;font-size:13px">${ev.title}</div>
          <div style="font-size:11px;color:var(--t3)">By ${ev.organizer} · ${ev.dept} · ${fmt(ev.date)} · 📍 ${ev.venue}</div>
          ${EVTS.filter(e2=>e2.id!==ev.id&&e2.status==="approved"&&e2.venue===ev.venue&&e2.date===ev.date).length?`<div style="font-size:11px;color:var(--re);margin-top:3px;font-weight:700">⚠️ Venue conflict: another event is at this venue on this date!</div>`:""}
        </div>
      </div>
      <div style="display:flex;gap:7px;flex-shrink:0;flex-wrap:wrap">
        <button class="btn btn-success btn-sm" onclick="adminApproveWithNote('${ev.id}');setTimeout(renderPendingDash,400)">✓ Approve</button>
        <button class="btn btn-danger btn-sm" onclick="adminRejectWithNote('${ev.id}');setTimeout(renderPendingDash,400)">✕ Reject</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--p);border-color:var(--p)" onclick="go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬 Resolve</button>
      </div>
    </div>`).join("")}
  </div>`:"";
  };
  window.renderPendingDash=renderPending;
  window.showEventsThisMonth=()=>{
    const now2=new Date(); const m=now2.getMonth(); const y=now2.getFullYear();
    const list=EVTS.filter(e=>{const d=new Date(e.date);return d.getMonth()===m&&d.getFullYear()===y;});
    openModal(`🗓️ Events This Month (${list.length})`,
      list.length?list.map(ev=>`<div style="display:flex;align-items:center;gap:11px;padding:11px 12px;background:var(--bg);border-radius:10px;margin-bottom:7px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:24px">${ev.emoji}</span>
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ev.title}</div>
          <div style="font-size:11px;color:var(--t3)">📅 ${fmt(ev.date)} · ⏰ ${ev.time} · 📍 ${ev.venue}</div>
          <div style="font-size:11px;color:var(--t3)">${ev.organizer} · <span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span></div>
        </div>
      </div>`).join(""):`<div style="text-align:center;padding:24px;color:var(--t3)">No events this month</div>`,
      [{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]
    );
  };
  area.innerHTML=`
  <div class="g4" style="margin-bottom:18px">
    ${scard("📅",EVTS.length,"Total Events","This semester","p","go('adm-events')")}
    ${scard("🗓️",eventsThisMonth,"Events This Month","Current month","pk","showEventsThisMonth()")}
    ${scard("⏳",pending.length,"Pending Approval","Awaiting review","or","go('adm-events')")}
    ${scard("🏛️","6","Active Venues","SCET campus","ye","go('adm-venues')")}
  </div>
  <div id="pending-section"></div>
  <div class="g2" style="margin-bottom:16px">
    <div class="ch-card"><div class="ch-title">Monthly Events</div><div class="ch-sub">2025 overview</div><div class="ch-wrap"><canvas id="ch-monthly"></canvas></div></div>
    <div class="ch-card"><div class="ch-title">Events by Category</div><div class="ch-sub">Distribution</div><div class="ch-wrap"><canvas id="ch-cat"></canvas></div></div>
  </div>
  <div class="card">
    <div class="sec-title">All Events <button class="btn btn-ghost btn-sm" onclick="go('adm-events')">View All →</button></div>
    <div class="tbl-wrap"><table>
      <thead><tr><th>Event</th><th>Date</th><th>Category</th><th>Registrations</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
      ${[...EVTS].sort((a,b)=>{const so={pending:0,approved:1,rejected:2};const sd=so[a.status]-so[b.status];if(sd!==0)return sd;return new Date(b.date)-new Date(a.date);}).map(ev=>{
        const regs=(REGS[ev.id]||[]).length;
        return `<tr onclick="go('ev-detail',true,{evId:'${ev.id}'})">
          <td><div style="display:flex;align-items:center;gap:9px"><span style="font-size:20px">${ev.emoji}</span><div><div class="cell-t">${ev.title}</div><div class="cell-s">${ev.organizer}</div></div></div></td>
          <td>${fmt(ev.date)}</td>
          <td><span class="b b-p">${ev.category}</span></td>
          <td><strong>${regs}</strong> / ${ev.capacity}${(WAIT[ev.id]||[]).length>0?` <span class="b b-o">${(WAIT[ev.id]||[]).length}w</span>`:""}</td>
          <td><span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span></td>
          <td onclick="event.stopPropagation()">${ev.status==="pending"?`<div style="display:flex;gap:4px;flex-wrap:wrap"><button class="btn btn-success btn-xs" onclick="adminApproveWithNote('${ev.id}')">✓</button><button class="btn btn-danger btn-xs" onclick="adminRejectWithNote('${ev.id}')">✕</button><button class="btn btn-ghost btn-xs" style="color:var(--p)" onclick="go('ev-chat',true,{evId:'${ev.id}',orgEmail:'${ev.orgId}'})">💬</button></div>`:"—"}</td>
        </tr>`;
      }).join("")}
      </tbody>
    </table></div>
  </div>`;
  renderPending();
  requestAnimationFrame(()=>{
    charts.m=new Chart($("ch-monthly"),{type:"bar",data:{labels:["Jan","Feb","Mar","Apr","May","Jun"],datasets:[{label:"Events",data:[12,18,24,31,28,15],backgroundColor:"#7C3AED",borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"},ticks:{stepSize:5}}}}});
    const cats=["Workshop","Hackathon","Cultural","Symposium","Sports"];
    charts.c=new Chart($("ch-cat"),{type:"doughnut",data:{labels:cats,datasets:[{data:[35,28,20,12,5],backgroundColor:["#EC4899","#7C3AED","#F97316","#EAB308","#10B981"],borderWidth:0,hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:"62%",plugins:{legend:{position:"right",labels:{font:{size:11}}}}}});
  });
};

VIEWS["adm-events"] = (area)=>{
  let filter="all", evSearch="";
  const render=()=>{
    const q=evSearch.toLowerCase();
    const statusOrder={pending:0,approved:1,rejected:2};
    const list=EVTS.filter(e=>(filter==="all"||e.status===filter)&&(!q||e.title.toLowerCase().includes(q)||e.organizer.toLowerCase().includes(q)||e.venue.toLowerCase().includes(q)||e.category.toLowerCase().includes(q)))
      .sort((a,b)=>{
        const sd=statusOrder[a.status]-statusOrder[b.status];
        if(sd!==0)return sd;
        return new Date(b.date)-new Date(a.date);
      });
    $("ev-tbody").innerHTML=list.map(ev=>{
      const regs=(REGS[ev.id]||[]).length;
      return `<tr onclick="go('ev-detail',true,{evId:'${ev.id}'})">
        <td><div style="display:flex;align-items:center;gap:9px"><span style="font-size:20px">${ev.emoji}</span><div><div class="cell-t">${ev.title}</div><div class="cell-s">${ev.organizer} · ${ev.dept}</div></div></div></td>
        <td><div>${fmt(ev.date)}</div><div class="cell-s">${ev.time}</div></td>
        <td>${ev.venue}</td>
        <td><span class="b b-p">${ev.category}</span></td>
        <td style="min-width:130px">${capBar(regs,ev.capacity)}</td>
        <td><span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span></td>
        <td onclick="event.stopPropagation()">${!ev.free?`<button class="btn btn-ghost btn-xs" style="color:var(--gr)" onclick="event.stopPropagation();go('ev-payments',true,{evId:'${ev.id}'})">Pay</button>`:""} ${ev.status==="pending"?`<div style="display:flex;gap:5px"><button class="btn btn-success btn-xs" onclick="adminApproveWithNote('${ev.id}')">✓</button><button class="btn btn-danger btn-xs" onclick="adminRejectWithNote('${ev.id}')">✕</button></div>`:"—"}</td>
      </tr>`;
    }).join("")||`<tr><td colspan="7" style="text-align:center;color:var(--t3);padding:30px">No events found</td></tr>`;
  };
  area.innerHTML=`
  <div class="card" style="padding:11px;margin-bottom:12px">
    <div style="display:flex;flex-wrap:wrap;gap:9px;align-items:center">
      <div class="srch-wrap" style="min-width:180px;flex:1"><span class="srch-ico">🔍</span><input class="srch-in" id="adm-ev-search" placeholder="Search events…" oninput="window._admEvSearch(this.value)"></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${["all","approved","pending","rejected"].map(s=>`<button id="f-${s}" class="btn btn-sm ${s==="all"?"btn-pri":"btn-ghost"}" onclick="setEvFilter('${s}')">${s.charAt(0).toUpperCase()+s.slice(1)}</button>`).join("")}
      </div>
    </div>
  </div>
  <div class="card"><div class="tbl-wrap"><table>
    <thead><tr><th>Event</th><th>Date</th><th>Venue</th><th>Category</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody id="ev-tbody"></tbody>
  </table></div></div>`;
  window._admEvSearch=v=>{evSearch=v;render();};
  window.setEvFilter=s=>{filter=s;["all","approved","pending","rejected"].forEach(x=>{const b=$("f-"+x);if(b)b.className="btn btn-sm "+(x===s?"btn-pri":"btn-ghost");});render();};
  window.rerender=render; render();
};

VIEWS["adm-venues"] = (area)=>{
  const venues=[
    {id:"v1",name:"SCET Auditorium",cap:1200,feats:["Main Stage","AV System","AC","Livestream"]},
    {id:"v2",name:"Main Block — Hall 1",cap:400,feats:["Labs","Projectors","WiFi","Breakout Rooms"]},
    {id:"v3",name:"SCET Open Ground",cap:5000,feats:["Outdoor","PA System","Large Screen"]},
    {id:"v4",name:"Innovation Lab — Block B",cap:150,feats:["Demo Space","3D Printers","VR Setup"]},
    {id:"v5",name:"Seminar Hall — Block C",cap:600,feats:["Conference","Breakout","Catering"]},
    {id:"v6",name:"SCET Sports Complex",cap:2000,feats:["Basketball","Pool","Track"]},
  ];
  // Count conflicts (pending events whose venue+date clash with approved events)
  const conflicts=EVTS.filter(ev=>{
    if(ev.status!=="pending")return false;
    return EVTS.some(e2=>e2.id!==ev.id&&e2.status==="approved"&&e2.venue===ev.venue&&e2.date===ev.date);
  }).length;
  const totalBooked=venues.filter(v=>(VENUE_BOOKINGS[v.id]||[]).some(b=>b.status==="approved")).length;
  area.innerHTML=`
  <div class="g4" style="margin-bottom:16px">
    ${scard("🏛️","6","Total Venues","SCET campus","p")}
    ${scard("📅",totalBooked,"With Bookings","","pk")}
    ${scard("✅",6-totalBooked,"Available","","gr")}
    ${scard("⚠️",conflicts,"Conflicts","Pending vs approved","ye")}
  </div>
  <div style="display:flex;flex-direction:column;gap:10px">
    ${venues.map(v=>{
      const bookings=(VENUE_BOOKINGS[v.id]||[]);
      const approved=bookings.filter(b=>b.status==="approved");
      const pending=bookings.filter(b=>b.status==="pending");
      // find conflicts: pending events at this venue whose date matches an approved booking
      const conflicting=EVTS.filter(ev=>ev.status==="pending"&&ev.venue===v.name&&approved.some(b=>b.date===ev.date));
      return `<div class="card" style="cursor:default">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="width:50px;height:50px;background:var(--p-l);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">🏛️</div>
          <div style="flex:1">
            <div style="font-family:var(--font-h);font-weight:800;font-size:14px;margin-bottom:3px">${v.name}</div>
            <div style="font-size:12px;color:var(--t2)">Capacity: ${v.cap.toLocaleString("en-IN")} · ${approved.length} approved booking${approved.length!==1?"s":""}</div>
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:5px">${v.feats.map(f=>`<span class="b b-bl">${f}</span>`).join("")}</div>
            ${conflicting.length?`<div style="margin-top:5px;font-size:11px;color:var(--re);font-weight:700">⚠️ ${conflicting.length} pending event(s) conflict with existing bookings</div>`:""}
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">
            <span class="b ${approved.length>0?"b-o":"b-g"}">${approved.length>0?"In Use":"Available"}</span>
            <div style="font-size:11px;color:var(--t3)">${approved[0]?fmt(approved[0].date):"No bookings"}</div>
            <div style="display:flex;gap:5px;margin-top:4px">
              <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();showVenueDetail('${v.id}')">Details</button>
              <button class="btn btn-sec btn-xs" onclick="event.stopPropagation();go('venue-calendar',true,{venueId:'${v.id}',venueName:'${v.name}'})">Calendar</button>
            </div>
          </div>
        </div>
      </div>`;
    }).join("")}
  </div>`;
  window.showVenueDetail=vId=>{
    const v=venues.find(x=>x.id===vId); if(!v)return;
    const bookings=(VENUE_BOOKINGS[vId]||[]);
    const approved=bookings.filter(b=>b.status==="approved");
    const pending=bookings.filter(b=>b.status==="pending");
    // also find any new pending events not yet in VENUE_BOOKINGS
    const pendingEvs=EVTS.filter(ev=>ev.status==="pending"&&ev.venue===v.name);
    const conflicting=pendingEvs.filter(ev=>approved.some(b=>b.date===ev.date));
    openModal(`🏛️ ${v.name}`,`
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:8px">📋 Venue Details</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
          <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="font-size:10px;color:var(--t3)">Capacity</div><div style="font-weight:800">${v.cap.toLocaleString("en-IN")}</div></div>
          <div style="background:var(--bg);border-radius:9px;padding:10px"><div style="font-size:10px;color:var(--t3)">Status</div><div style="font-weight:800">${approved.length?"In Use":"Available"}</div></div>
        </div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px">${v.feats.map(f=>`<span class="b b-bl">${f}</span>`).join("")}</div>
      </div>
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:8px">✅ Approved / Occupied Dates</div>
        ${approved.length?approved.map(b=>`<div style="display:flex;align-items:center;justify-content:space-between;background:var(--gr-l);border:1px solid rgba(16,185,129,.15);border-radius:9px;padding:10px 12px;margin-bottom:6px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${b.eventId}'})">
          <div><div style="font-weight:700;font-size:13px">${b.eventTitle}</div><div style="font-size:11px;color:var(--t2)">📅 ${fmt(b.date)}</div></div>
          <span class="b b-g">✓ Booked</span>
        </div>`).join(""):`<div style="text-align:center;padding:12px;color:var(--t3);font-size:13px">No approved bookings</div>`}
      </div>
      ${pendingEvs.length?`<div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:8px">⏳ Pending Events at This Venue</div>
        ${pendingEvs.map(ev=>{
          const clash=approved.some(b=>b.date===ev.date);
          return `<div style="background:${clash?"var(--re-l)":"var(--ye-l)"};border:1px solid ${clash?"rgba(239,68,68,.2)":"rgba(234,179,8,.2)"};border-radius:9px;padding:10px 12px;margin-bottom:6px">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div><div style="font-weight:700;font-size:13px">${ev.title}</div><div style="font-size:11px;color:var(--t2)">📅 ${fmt(ev.date)} · By ${ev.organizer}</div>${clash?`<div style="font-size:11px;color:var(--re);font-weight:700;margin-top:2px">⚠️ DATE CONFLICT with existing booking!</div>`:""}</div>
              <button class="btn btn-ghost btn-xs" onclick="closeModal();toast('📧 Message sent to ${ev.organizer} about venue conflict','or')">📧 Notify Organiser</button>
            </div>
          </div>`;
        }).join("")}
      </div>`:""}
    `,[{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]);
  };
};

VIEWS["adm-analytics"] = (area)=>{
  const totalRegs=Object.values(REGS).reduce((a,b)=>a+b.length,0);
  area.innerHTML=`
  <div class="g4" style="margin-bottom:16px">
    ${scard("📊","89%","Attendance Rate","","p","","+3%")}
    ${scard("🔥","94/100","Engagement Score","","pk","","+7%")}
    ${scard("🏆","Workshop","Top Category","35% of events","or")}
    ${scard("⭐","4.7 ★","Avg. Rating","","ye","","+0.2")}
  </div>
  <div class="g2" style="margin-bottom:16px">
    <div class="ch-card"><div class="ch-title">Attendance vs Registrations</div><div class="ch-sub">Per event breakdown</div><div class="ch-wrap"><canvas id="ch-att"></canvas></div></div>
    <div class="ch-card"><div class="ch-title">Weekly Engagement</div><div class="ch-sub">Active & new students</div><div class="ch-wrap"><canvas id="ch-eng"></canvas></div></div>
  </div>
  <div class="g2">
    <div class="ch-card"><div class="ch-title">Registrations per Event</div><div class="ch-sub">Current cycle</div><div class="ch-wrap"><canvas id="ch-perev"></canvas></div></div>
    <div class="ch-card"><div class="ch-title">Category Popularity</div><div class="ch-sub">By participant count</div><div class="ch-wrap"><canvas id="ch-pop"></canvas></div></div>
  </div>`;
  requestAnimationFrame(()=>{
    const doneEvts=EVTS.filter(e=>e.status==="approved"&&new Date(e.date)<new Date());
    charts.att=new Chart($("ch-att"),{type:"bar",data:{labels:doneEvts.map(e=>e.title.slice(0,12)),datasets:[{label:"Registered",data:doneEvts.map(e=>(REGS[e.id]||[]).length),backgroundColor:"#7C3AED",borderRadius:5},{label:"Attended",data:doneEvts.map(e=>(ATTENDANCE[e.id]||[]).length||Math.round((REGS[e.id]||[]).length*.91)),backgroundColor:"#EC4899",borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"top",labels:{font:{size:11}}}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"}}}}});
    charts.eng=new Chart($("ch-eng"),{type:"line",data:{labels:["W1","W2","W3","W4","W5","W6"],datasets:[{label:"Active",data:[340,420,380,510,490,620],borderColor:"#7C3AED",backgroundColor:"rgba(124,58,237,.1)",tension:.4,fill:true},{label:"New",data:[120,180,95,210,165,240],borderColor:"#EC4899",backgroundColor:"rgba(236,72,153,.1)",tension:.4,fill:true}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"top",labels:{font:{size:11}}}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"}}}}});
    charts.perEv=new Chart($("ch-perev"),{type:"bar",data:{labels:doneEvts.map(e=>e.title.slice(0,10)),datasets:[{label:"Registrations",data:doneEvts.map(e=>(REGS[e.id]||[]).length),backgroundColor:doneEvts.map(e=>e.color),borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`${ctx.dataset.label}: ${ctx.raw} participants`}}},scales:{x:{grid:{display:false}},y:{grid:{color:"#F1F5F9"},beginAtZero:true,ticks:{stepSize:1,precision:0},title:{display:true,text:"Number of Registrations",font:{size:11},color:"var(--t3)"}}}}});
    const catMap2={};doneEvts.forEach(e=>{catMap2[e.category]=(catMap2[e.category]||0)+(REGS[e.id]||[]).length;});const catL2=Object.keys(catMap2),catD2=Object.values(catMap2);const catColors2=["#7C3AED80","#EC489980","#F9731680","#EAB30880","#10B98180","#0EA5E980","#84CC1680"];
    charts.pop=new Chart($("ch-pop"),{type:"polarArea",data:{labels:catL2.length?catL2:["No data"],datasets:[{data:catD2.length?catD2:[1],backgroundColor:catColors2.slice(0,catL2.length||1),borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"right",labels:{font:{size:11}}}}}});
  });
};

VIEWS["adm-organizers"] = (area)=>{
  let orgSearch="";
  const renderOrgs=()=>{
    const q=orgSearch.toLowerCase();
    const orgList=Object.values(ORGANIZERS_DB).filter(o=>
      !q||o.name.toLowerCase().includes(q)||o.dept.toLowerCase().includes(q)||o.email.toLowerCase().includes(q)
    );
    const tbody=$("org-tbody"); if(!tbody)return;
    tbody.innerHTML=orgList.map(o=>{
      const orgEvts=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(o.email)).sort((a,b)=>new Date(b.date)-new Date(a.date));
      const approved=orgEvts.filter(e=>e.status==="approved").length;
      const pending=orgEvts.filter(e=>e.status==="pending").length;
      return `<tr onclick="showOrgProfile('${o.email}')" style="cursor:pointer">
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:36px;height:36px;border-radius:10px;background:${gradCss(o.av)};display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:13px;flex-shrink:0">${o.av}</div>
            <div>
              <div class="cell-t">${o.name}</div>
              <div class="cell-s">${o.email}</div>
            </div>
          </div>
        </td>
        <td><span style="font-size:12px">${o.dept}</span></td>
        <td><strong>${orgEvts.length}</strong></td>
        <td><span class="b b-g" style="font-size:11px">${approved} approved</span>${pending?` <span class="b b-y" style="font-size:11px">${pending} pending</span>`:""}</td>
        <td><span style="color:var(--ye);font-weight:800">${o.rating}★</span></td>
        <td onclick="event.stopPropagation()">
          <button class="btn btn-ghost btn-xs" onclick="showOrgProfile('${o.email}')">View →</button>
        </td>
      </tr>`;
    }).join("")||`<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--t3)">No organisers found</td></tr>`;
  };

  area.innerHTML=`
  <div class="g3" style="margin-bottom:16px">
    ${scard("👥",Object.keys(ORGANIZERS_DB).length,"Total Organisers","","p")}
    ${scard("🎪",EVTS.filter(e=>e.status==="approved").length,"Active Events","","gr")}
    ${scard("⭐",(Object.values(ORGANIZERS_DB).reduce((s,o)=>s+o.rating,0)/Object.keys(ORGANIZERS_DB).length).toFixed(1)+"★","Campus Avg Rating","","ye")}
  </div>
  <div class="card">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:12px;flex-wrap:wrap">
      <div class="sec-title" style="margin:0">All Organisers</div>
      <input id="org-search" class="fi" placeholder="🔍 Search by name, dept or email…" style="max-width:260px;margin:0" oninput="orgSearch=this.value;renderOrgs()">
    </div>
    <div class="tbl-wrap"><table>
      <thead><tr><th>Organiser</th><th>Department</th><th>Events</th><th>Status</th><th>Rating</th><th>Action</th></tr></thead>
      <tbody id="org-tbody"></tbody>
    </table></div>
  </div>`;

  window.renderOrgs=renderOrgs;
  window.orgSearch="";
  // re-bind oninput correctly using closure
  const inp=$("org-search");
  if(inp) inp.oninput=e=>{ orgSearch=e.target.value; renderOrgs(); };
  renderOrgs();

  window.showOrgProfile=email=>{
    const o=ORGANIZERS_DB[email]; if(!o)return;
    const orgEvts=[...EVTS].filter(e=>(e.organizers||[e.orgId]).includes(email)).sort((a,b)=>new Date(b.date)-new Date(a.date));
    openModal(`👤 ${o.name}`,`
      <div style="text-align:center;margin-bottom:18px">
        <div style="width:64px;height:64px;border-radius:16px;background:${gradCss(o.av)};display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:22px;margin:0 auto 10px">${o.av}</div>
        <div style="font-family:var(--font-h);font-size:18px;font-weight:800">${o.name}</div>
        <div style="font-size:12px;color:var(--t3)">${o.dept} · ${o.email}</div>
        <div style="font-size:12px;color:var(--t3);margin-top:3px">📞 ${o.phone||"N/A"}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px">
        <div style="background:var(--bg);border-radius:9px;padding:10px;text-align:center"><div style="font-weight:800;font-size:18px;color:var(--p)">${orgEvts.length}</div><div style="font-size:10px;color:var(--t3)">Events</div></div>
        <div style="background:var(--bg);border-radius:9px;padding:10px;text-align:center"><div style="font-weight:800;font-size:18px;color:var(--ye)">${o.rating}★</div><div style="font-size:10px;color:var(--t3)">Rating</div></div>
      </div>
      <div style="margin-bottom:12px">
        <div style="font-size:11px;font-weight:700;color:var(--t2);margin-bottom:6px">Categories Organised</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">${(o.categories||[...new Set(orgEvts.map(e=>e.category))]).map(c=>`<span class="b b-p" style="font-size:11px">${c}</span>`).join("")||"<span style='color:var(--t3);font-size:12px'>No events yet</span>"}</div>
      </div>
      <div style="font-size:12px;font-weight:700;color:var(--t2);margin-bottom:8px">Events Organised</div>
      ${orgEvts.map(ev=>`<div style="display:flex;align-items:center;gap:10px;padding:9px 11px;background:var(--bg);border-radius:9px;margin-bottom:6px;cursor:pointer" onclick="closeModal();go('ev-detail',true,{evId:'${ev.id}'})">
        <span style="font-size:18px">${ev.emoji}</span>
        <div style="flex:1"><div style="font-weight:700;font-size:13px">${ev.title}</div><div style="font-size:11px;color:var(--t3)">${fmt(ev.date)} · ${(REGS[ev.id]||[]).length}/${ev.capacity} registered</div></div>
        <span class="b ${ev.status==="approved"?"b-g":ev.status==="pending"?"b-y":"b-r"}">${ev.status}</span>
      </div>`).join("")||`<div style="text-align:center;padding:14px;color:var(--t3)">No events yet</div>`}
    `,[{label:"Close",cls:"btn-ghost",fn:"closeModal()"}]);
  };
};

/* ══════════════════════════════════════════════════════════
   ORGANIZER VIEWS
   ══════════════════════════════════════════════════════════ */
