
/* ═══════════════════════════════════════════════════════════════
   STATIC SEED DATA
   ═══════════════════════════════════════════════════════════════ */
const USERS = {
  "admin@scet.ac.in":     { pw:"admin123", role:"admin",       name:"Dr. Priya Nair",       uni:"SCET", dept:"Administration",   av:"PN" },
  "admin2@scet.ac.in":    { pw:"admin234", role:"admin",       name:"Dr. Ramesh Kulkarni",  uni:"SCET", dept:"Administration",   av:"RK" },
  "arjun@scet.ac.in":     { pw:"arjun123", role:"both",        name:"Arjun Mehta",          uni:"SCET", dept:"CS",              av:"AM", phone:"+91 99001 11111", year:"4th Year",  rollno:"SCET2021CS011" },
  "divya@scet.ac.in":     { pw:"divya123", role:"both",        name:"Divya Sharma",         uni:"SCET", dept:"EC",              av:"DS", phone:"+91 98100 22222", year:"3rd Year",  rollno:"SCET2022EC022" },
  "rohan@scet.ac.in":     { pw:"rohan123", role:"both",        name:"Rohan Patel",          uni:"SCET", dept:"IT",              av:"RP", phone:"+91 97200 33333", year:"3rd Year",  rollno:"SCET2022IT033" },
};

// Demo participant profiles (includes the logged-in student + others)
const PARTICIPANTS_DB = {
  "arjun@scet.ac.in":      { name:"Arjun Mehta",       phone:"+91 99001 11111", year:"4th Year", dept:"CS",    roll:"SCET2021CS011", uni:"SCET", av:"AM", email:"arjun@scet.ac.in" },
  "divya@scet.ac.in":      { name:"Divya Sharma",       phone:"+91 98100 22222", year:"3rd Year", dept:"EC",    roll:"SCET2022EC022", uni:"SCET", av:"DS", email:"divya@scet.ac.in" },
  "rohan@scet.ac.in":      { name:"Rohan Patel",        phone:"+91 97200 33333", year:"3rd Year", dept:"IT",    roll:"SCET2022IT033", uni:"SCET", av:"RP", email:"rohan@scet.ac.in" },
  "sneha@scet.ac.in":      { name:"Sneha Kulkarni",     phone:"+91 93333 77777", year:"3rd Year", dept:"CS",    roll:"SCET2022CS041", uni:"SCET", av:"SK", email:"sneha@scet.ac.in" },
  "aditya@scet.ac.in":     { name:"Aditya Rao",         phone:"+91 94444 88888", year:"2nd Year", dept:"EC",    roll:"SCET2023EC056", uni:"SCET", av:"AR", email:"aditya@scet.ac.in" },
  "nitin@scet.ac.in":      { name:"Nitin Desai",        phone:"+91 90001 44444", year:"2nd Year", dept:"CHEM",  roll:"SCET2023CH009", uni:"SCET", av:"ND", email:"nitin@scet.ac.in" },
  "vikram@scet.ac.in":     { name:"Vikram Joshi",       phone:"+91 92222 66666", year:"4th Year", dept:"CIVIL", roll:"SCET2021CV020", uni:"SCET", av:"VJ", email:"vikram@scet.ac.in" },
  "pooja@scet.ac.in":      { name:"Pooja Reddy",        phone:"+91 91111 55555", year:"1st Year", dept:"IC",    roll:"SCET2024IC015", uni:"SCET", av:"PR", email:"pooja@scet.ac.in" },
  "priya@scet.ac.in":      { name:"Priya Nair",         phone:"+91 91234 56789", year:"2nd Year", dept:"EC",    roll:"SCET2023EC012", uni:"SCET", av:"PN", email:"priya@scet.ac.in" },
  "marcus@scet.ac.in":     { name:"Marcus Fernandes",   phone:"+91 88765 43210", year:"4th Year", dept:"MECH",  roll:"SCET2021ME034", uni:"SCET", av:"MF", email:"marcus@scet.ac.in" },
  "sofia@scet.ac.in":      { name:"Sofia Menon",        phone:"+91 99887 65432", year:"1st Year", dept:"AI",    roll:"SCET2024AI007", uni:"SCET", av:"SM", email:"sofia@scet.ac.in" },
  "kai@scet.ac.in":        { name:"Karan Iyer",         phone:"+91 87654 32109", year:"3rd Year", dept:"CS",    roll:"SCET2022CS028", uni:"SCET", av:"KI", email:"kai@scet.ac.in" },
  "ananya@scet.ac.in":     { name:"Ananya Gupta",       phone:"+91 94567 12345", year:"2nd Year", dept:"IT",    roll:"SCET2023IT019", uni:"SCET", av:"AG", email:"ananya@scet.ac.in" },
  "rahul@scet.ac.in":      { name:"Rahul Sharma",       phone:"+91 91001 20001", year:"3rd Year", dept:"CS",    roll:"SCET2022CS051", uni:"SCET", av:"RS", email:"rahul@scet.ac.in" },
  "meera@scet.ac.in":      { name:"Meera Pillai",       phone:"+91 92001 20002", year:"2nd Year", dept:"AI",    roll:"SCET2023AI022", uni:"SCET", av:"MP", email:"meera@scet.ac.in" },
  "aryan@scet.ac.in":      { name:"Aryan Verma",        phone:"+91 93001 20003", year:"3rd Year", dept:"EC",    roll:"SCET2022EC063", uni:"SCET", av:"AV", email:"aryan@scet.ac.in" },
  "tanya@scet.ac.in":      { name:"Tanya Bose",         phone:"+91 94001 20004", year:"2nd Year", dept:"IT",    roll:"SCET2023IT030", uni:"SCET", av:"TB", email:"tanya@scet.ac.in" },
  "siddharth@scet.ac.in":  { name:"Siddharth Jain",     phone:"+91 95001 20005", year:"3rd Year", dept:"MECH",  roll:"SCET2022ME044", uni:"SCET", av:"SJ", email:"siddharth@scet.ac.in" },
  "naina@scet.ac.in":      { name:"Naina Mehta",        phone:"+91 96001 20006", year:"2nd Year", dept:"CS",    roll:"SCET2023CS037", uni:"SCET", av:"NM", email:"naina@scet.ac.in" },
  "riya@scet.ac.in":       { name:"Riya Das",           phone:"+91 97001 20007", year:"1st Year", dept:"CIVIL", roll:"SCET2024CV008", uni:"SCET", av:"RD", email:"riya@scet.ac.in" },
  "amit@scet.ac.in":       { name:"Amit Khanna",        phone:"+91 98001 20008", year:"4th Year", dept:"MECH",  roll:"SCET2021ME055", uni:"SCET", av:"AK", email:"amit@scet.ac.in" },
  "prerna@scet.ac.in":     { name:"Prerna Gupta",       phone:"+91 99001 20009", year:"3rd Year", dept:"CS",    roll:"SCET2022CS066", uni:"SCET", av:"PG", email:"prerna@scet.ac.in" },
  "shiv@scet.ac.in":       { name:"Shiv Kapoor",        phone:"+91 90101 20010", year:"3rd Year", dept:"AI",    roll:"SCET2022AI011", uni:"SCET", av:"SP", email:"shiv@scet.ac.in" },
  "anjali@scet.ac.in":     { name:"Anjali Pande",       phone:"+91 91101 20011", year:"2nd Year", dept:"IT",    roll:"SCET2023IT042", uni:"SCET", av:"AP", email:"anjali@scet.ac.in" },
  "raj@scet.ac.in":        { name:"Raj Malhotra",       phone:"+91 92101 20012", year:"4th Year", dept:"CIVIL", roll:"SCET2021CV023", uni:"SCET", av:"RM", email:"raj@scet.ac.in" },
  "deepak@scet.ac.in":     { name:"Deepak Singh",       phone:"+91 93101 20013", year:"2nd Year", dept:"EC",    roll:"SCET2023EC077", uni:"SCET", av:"DK", email:"deepak@scet.ac.in" },
  "neha@scet.ac.in":       { name:"Neha Verma",         phone:"+91 94101 20014", year:"3rd Year", dept:"CHEM",  roll:"SCET2022CH018", uni:"SCET", av:"NV", email:"neha@scet.ac.in" },
  "varun@scet.ac.in":      { name:"Varun Nair",         phone:"+91 95101 20015", year:"1st Year", dept:"IC",    roll:"SCET2024IC029", uni:"SCET", av:"VN", email:"varun@scet.ac.in" },
  "kavya@scet.ac.in":      { name:"Kavya Reddy",        phone:"+91 96101 20016", year:"2nd Year", dept:"AI",    roll:"SCET2023AI033", uni:"SCET", av:"KR", email:"kavya@scet.ac.in" },
  "ishaan@scet.ac.in":     { name:"Ishaan Mehta",       phone:"+91 97101 20017", year:"3rd Year", dept:"IT",    roll:"SCET2022IT053", uni:"SCET", av:"IM", email:"ishaan@scet.ac.in" },
  "dhruv@scet.ac.in":      { name:"Dhruv Kulkarni",     phone:"+91 98101 20018", year:"4th Year", dept:"CS",    roll:"SCET2021CS078", uni:"SCET", av:"DL", email:"dhruv@scet.ac.in" },
};

const EVENTS_SEED = [
  { id:"e1",  title:"HackSCET 2026",             emoji:"🚀", color:"#7C3AED", category:"Hackathon",       dept:"CS",          date:"2026-02-10", time:"09:00", venue:"Main Block — Hall 1", capacity:200, organizer:"Arjun Mehta",      orgId:"arjun@scet.ac.in",   organizers:["arjun@scet.ac.in","sneha@scet.ac.in"],    status:"approved", free:false, price:500,  desc:"A 48-hour innovation marathon where teams compete to build real-world solutions. Mentors from top tech companies guide you through.", deadline:"2026-02-05", guests:["Prof. Arvind Mehta","Ms. Nandita Rao"], prizes:"₹50,000 Grand Prize + internship offers", sponsors:["TechForge India","CloudSpark","SCET Alumni Fund"], schedule:[{t:"9:00 AM",a:"Opening Ceremony"},{t:"10:30 AM",a:"Hacking Begins"},{t:"8:00 PM",a:"Mentor Sessions"},{t:"Day 2 - 9 AM",a:"Final Submissions"},{t:"11:00 AM",a:"Demo & Judging"},{t:"2:00 PM",a:"Winners Announced"}], contact:"hackscet@scet.ac.in", uni:"SCET" },
  { id:"e2",  title:"AI & Society Symposium",    emoji:"🤖", color:"#EC4899", category:"Symposium",        dept:"AI",          date:"2026-02-20", time:"14:00", venue:"SCET Auditorium",   capacity:500, organizer:"Arjun Mehta",      orgId:"arjun@scet.ac.in",   organizers:["arjun@scet.ac.in","aditya@scet.ac.in"],  status:"approved", free:true,  price:0,    desc:"Thought-provoking discussions on the ethical frontiers of artificial intelligence. Leading researchers explore how AI is reshaping society.", deadline:"2026-02-15", guests:["Dr. Kavita Sharma","Mr. Rajesh Desai"], prizes:null, sponsors:["InnovateMind","SCET Media Lab"], schedule:[{t:"2:00 PM",a:"Opening Keynote"},{t:"3:30 PM",a:"Panel Discussion"},{t:"5:00 PM",a:"Networking Reception"}], contact:"aisymp@scet.ac.in", uni:"SCET" },
  { id:"e3",  title:"Spring Cultural Fest",      emoji:"🎭", color:"#F97316", category:"Cultural",          dept:"Student Life", date:"2026-05-10", time:"16:00", venue:"SCET Open Ground",       capacity:1000,organizer:"Divya Sharma",     orgId:"divya@scet.ac.in",   organizers:["divya@scet.ac.in","nitin@scet.ac.in"],   status:"pending",  free:true,  price:0,    desc:"SCET's annual celebration of global cultures. Food, music, dance and art from 50+ countries represented by student clubs.", deadline:"2026-05-07", guests:[], prizes:null, sponsors:["SCET Student Assoc."], schedule:[{t:"4:00 PM",a:"Cultural Parade"},{t:"5:00 PM",a:"Stage Performances"},{t:"7:00 PM",a:"Food Festival"}], contact:"cult@scet.ac.in", uni:"SCET" },
  { id:"e4",  title:"Robotics Workshop",         emoji:"🦾", color:"#0EA5E9", category:"Workshop",          dept:"MECH",        date:"2026-02-25", time:"10:00", venue:"Innovation Lab — Block B",     capacity:50,  organizer:"Arjun Mehta",      orgId:"arjun@scet.ac.in",   organizers:["arjun@scet.ac.in","vikram@scet.ac.in"],  status:"approved", free:false, price:250,  desc:"Full-day hands-on workshop. Design and build autonomous robots from scratch with guidance from Boston Dynamics engineers.", deadline:"2026-02-22", guests:["Mr. Vikram Iyer"], prizes:null, sponsors:["RoboNation India"], schedule:[{t:"10:00 AM",a:"Intro & Safety"},{t:"11:00 AM",a:"Build Session"},{t:"2:00 PM",a:"Testing"},{t:"4:00 PM",a:"Robot Olympics"}], contact:"robotics@scet.ac.in", uni:"SCET" },
  { id:"e5",  title:"Startup Pitch Night",       emoji:"💡", color:"#EAB308", category:"Entrepreneurship",  dept:"Business",    date:"2026-05-20", time:"18:00", venue:"Seminar Hall — Block C",  capacity:150, organizer:"Divya Sharma",     orgId:"divya@scet.ac.in",   organizers:["divya@scet.ac.in","pooja@scet.ac.in"],   status:"approved", free:false, price:150,  desc:"Pitch your startup to a panel of VCs and angel investors. Get live feedback, make connections, and potentially secure funding.", deadline:"2026-05-16", guests:["Ms. Preethi Naidu","Mr. Sanjay Kulkarni"], prizes:"₹25,000 seed grant + YC fast-track", sponsors:["FoundersHub"], schedule:[{t:"6:00 PM",a:"Registration"},{t:"7:00 PM",a:"Pitch Rounds"},{t:"9:00 PM",a:"Investor Q&A"},{t:"10:00 PM",a:"Winner Announcement"}], contact:"pitch@scet.ac.in", uni:"SCET" },
  { id:"e6",  title:"Data Science Bootcamp",     emoji:"📊", color:"#10B981", category:"Workshop",          dept:"CS",          date:"2026-03-05", time:"10:00", venue:"Seminar Hall — Block C",  capacity:60,  organizer:"Sneha Kulkarni",   orgId:"sneha@scet.ac.in",   organizers:["sneha@scet.ac.in","arjun@scet.ac.in"],   status:"approved", free:false, price:200,  desc:"Intensive one-day bootcamp covering ML pipelines, data visualization, and real-world case studies. Hands-on with Python, Pandas & Scikit-learn.", deadline:"2026-03-01", guests:["Dr. Amit Bansal"], prizes:null, sponsors:["DataEdge Solutions"], schedule:[{t:"10:00 AM",a:"Intro to ML Pipelines"},{t:"12:00 PM",a:"Lunch Break"},{t:"1:00 PM",a:"Data Viz Workshop"},{t:"3:00 PM",a:"Case Study Sprint"},{t:"5:00 PM",a:"Certificate Ceremony"}], contact:"dsbootcamp@scet.ac.in", uni:"SCET" },
  { id:"e7",  title:"EC Circuit Design Fest",    emoji:"⚡", color:"#6366F1", category:"Technical",         dept:"EC",          date:"2026-02-15", time:"10:00", venue:"Innovation Lab — Block B",     capacity:80,  organizer:"Aditya Rao",       orgId:"aditya@scet.ac.in",  organizers:["aditya@scet.ac.in","divya@scet.ac.in"],  status:"approved", free:false, price:150,  desc:"Hands-on circuit design competition covering analog and digital electronics, PCB design, and embedded systems.", deadline:"2026-02-12", guests:["Dr. Suresh Kapoor"], prizes:"₹10,000 + Internship at Texas Instruments", sponsors:["TI India","SCET EC Dept"], schedule:[{t:"10:00 AM",a:"Orientation"},{t:"11:00 AM",a:"Design Round"},{t:"2:00 PM",a:"Build & Test"},{t:"4:00 PM",a:"Judging"}], contact:"ecfest@scet.ac.in", uni:"SCET" },
  { id:"e8",  title:"CodeSprint Marathon",       emoji:"💻", color:"#8B5CF6", category:"Hackathon",         dept:"IT",          date:"2026-03-14", time:"08:00", venue:"Main Block — Hall 1", capacity:120, organizer:"Rohan Patel",      orgId:"rohan@scet.ac.in",   organizers:["rohan@scet.ac.in","sneha@scet.ac.in"],   status:"approved", free:false, price:300,  desc:"24-hour competitive coding marathon. Solve algorithmic problems and compete for the coveted CodeSprint Champion title.", deadline:"2026-03-10", guests:["Mr. Karthik Srinivasan"], prizes:"₹30,000 + Cloud Credits", sponsors:["AWS India","JetBrains"], schedule:[{t:"8:00 AM",a:"Registration"},{t:"9:00 AM",a:"Contest Begins"},{t:"9:00 AM+1",a:"Final Standings"},{t:"10:00 AM+1",a:"Prize Ceremony"}], contact:"codesprint@scet.ac.in", uni:"SCET" },
  { id:"e9",  title:"MECH Design Challenge",     emoji:"⚙️", color:"#F43F5E", category:"Technical",         dept:"MECH",        date:"2026-03-20", time:"09:00", venue:"SCET Sports Complex", capacity:60,  organizer:"Vikram Joshi",     orgId:"vikram@scet.ac.in",  organizers:["vikram@scet.ac.in","rohan@scet.ac.in"],  status:"approved", free:false, price:200,  desc:"Design and fabricate mechanical systems competing in stress testing, efficiency, and innovation. Bridge building, gear trains and more.", deadline:"2026-03-17", guests:["Prof. Ramana Krishnan"], prizes:"₹15,000 Trophy + Industry Visit", sponsors:["Tata Motors Innovation Lab"], schedule:[{t:"9:00 AM",a:"Design Brief"},{t:"10:00 AM",a:"Fabrication"},{t:"2:00 PM",a:"Testing"},{t:"4:00 PM",a:"Results"}], contact:"mechdesign@scet.ac.in", uni:"SCET" },
  { id:"e10", title:"AI/ML Workshop Series",     emoji:"🧠", color:"#06B6D4", category:"Workshop",          dept:"AI",          date:"2026-04-05", time:"10:00", venue:"Seminar Hall — Block C",  capacity:100, organizer:"Divya Sharma",     orgId:"divya@scet.ac.in",   organizers:["divya@scet.ac.in","aditya@scet.ac.in"],  status:"pending",  free:false, price:350,  desc:"Three-day intensive workshop on neural networks, computer vision, and NLP. Learn from industry practitioners with hands-on Jupyter notebooks.", deadline:"2026-04-01", guests:["Dr. Anita Reddy","Mr. Siddharth Bose"], prizes:null, sponsors:["NVIDIA India","Google India"], schedule:[{t:"Day 1",a:"Deep Learning Fundamentals"},{t:"Day 2",a:"Computer Vision with OpenCV"},{t:"Day 3",a:"NLP & Transformers"}], contact:"aiworkshop@scet.ac.in", uni:"SCET" },
  { id:"e11", title:"Chem Innovation Expo",      emoji:"🧪", color:"#84CC16", category:"Technical",         dept:"CHEM",        date:"2026-02-28", time:"10:00", venue:"Innovation Lab — Block B",     capacity:70,  organizer:"Nitin Desai",      orgId:"nitin@scet.ac.in",   organizers:["nitin@scet.ac.in","pooja@scet.ac.in"],   status:"approved", free:true,  price:0,    desc:"Annual chemistry innovation exhibition showcasing student research in sustainable chemistry, materials science, and pharmaceutical innovations.", deadline:"2026-02-25", guests:["Dr. Meera Bhat"], prizes:"Best Project Trophy + Lab Funding", sponsors:["SCET Chem Dept","DST India"], schedule:[{t:"10:00 AM",a:"Exhibition Open"},{t:"12:00 PM",a:"Judging Begins"},{t:"3:00 PM",a:"Award Ceremony"}], contact:"chemexpo@scet.ac.in", uni:"SCET" },
  { id:"e12", title:"Civil Struct Symposium",    emoji:"🏗️", color:"#F59E0B", category:"Symposium",         dept:"CIVIL",       date:"2026-03-08", time:"09:00", venue:"SCET Auditorium",   capacity:200, organizer:"Vikram Joshi",     orgId:"vikram@scet.ac.in",  organizers:["vikram@scet.ac.in","nitin@scet.ac.in"],  status:"approved", free:true,  price:0,    desc:"Symposium on sustainable construction, smart cities, and infrastructure innovation. Keynotes by leading structural engineers.", deadline:"2026-03-05", guests:["Dr. Vikram Anand","Ms. Sapna Rao"], prizes:null, sponsors:["L&T Engineering","SCET Civil Dept"], schedule:[{t:"9:00 AM",a:"Keynote"},{t:"11:00 AM",a:"Panel Discussion"},{t:"2:00 PM",a:"Student Presentations"},{t:"4:00 PM",a:"Networking"}], contact:"civil@scet.ac.in", uni:"SCET" },
  { id:"e13", title:"Intercollege Sports Fest",  emoji:"🏅", color:"#EF4444", category:"Sports",            dept:"Sports",      date:"2026-04-15", time:"08:00", venue:"SCET Sports Complex", capacity:300, organizer:"Pooja Reddy",      orgId:"pooja@scet.ac.in",   organizers:["pooja@scet.ac.in","vikram@scet.ac.in"],  status:"approved", free:true,  price:0,    desc:"Annual inter-college sports tournament featuring cricket, football, basketball, badminton and athletics. Compete for the SCET Sports Cup.", deadline:"2026-04-12", guests:[], prizes:"₹20,000 Champion Trophy per sport", sponsors:["Decathlon India","SCET Sports Comm."], schedule:[{t:"8:00 AM",a:"March Past"},{t:"9:00 AM",a:"Heats Begin"},{t:"4:00 PM",a:"Finals"},{t:"6:00 PM",a:"Closing Ceremony"}], contact:"sports@scet.ac.in", uni:"SCET" },
  { id:"e14", title:"IC Design Hackathon",       emoji:"🔬", color:"#A855F7", category:"Hackathon",         dept:"IC",          date:"2026-04-25", time:"09:00", venue:"Main Block — Hall 1", capacity:80,  organizer:"Pooja Reddy",      orgId:"pooja@scet.ac.in",   organizers:["pooja@scet.ac.in","rohan@scet.ac.in"],   status:"pending",  free:false, price:200,  desc:"VLSI and IC design hackathon. Teams design and simulate integrated circuits solving real embedded system challenges.", deadline:"2026-04-22", guests:["Dr. Priya Vasudevan"], prizes:"₹20,000 + Internship at Qualcomm", sponsors:["Qualcomm India","Synopsys"], schedule:[{t:"9:00 AM",a:"Problem Statement"},{t:"10:00 AM",a:"Design Phase"},{t:"3:00 PM",a:"Simulation"},{t:"5:00 PM",a:"Submission"}], contact:"icdesign@scet.ac.in", uni:"SCET" },
  { id:"e15", title:"Open Source Day",           emoji:"🌐", color:"#0EA5E9", category:"Technical",         dept:"CS",          date:"2026-03-28", time:"10:00", venue:"Seminar Hall — Block C",  capacity:90,  organizer:"Sneha Kulkarni",   orgId:"sneha@scet.ac.in",   organizers:["sneha@scet.ac.in","aditya@scet.ac.in"],  status:"rejected", free:true,  price:0,    desc:"Community day to contribute to open source projects. Work alongside mentors on real GitHub repositories and get your first PR merged.", deadline:"2026-03-25", guests:["Mr. Vivek Gupta"], prizes:null, sponsors:["GitHub India"], schedule:[{t:"10:00 AM",a:"Git Workshop"},{t:"11:30 AM",a:"Contribution Sprints"},{t:"3:00 PM",a:"PR Review"},{t:"4:30 PM",a:"Wrap-up"}], contact:"opensource@scet.ac.in", uni:"SCET" }
];

// Helper: generate bulk fake emails for realistic past-event capacity
const _fe=(pfx,n)=>Array.from({length:n},(_,i)=>`${pfx}${String(i+1).padStart(3,"0")}@scet.ac.in`);
const _Q2=["Really well organised and informative event!","Excellent experience overall, learned a lot.","Fantastic event — will definitely come again.","Great guest speakers and well-managed schedule.","Very engaging and practical content throughout.","Loved every moment of this event!","Superb coordination by the organising team.","One of the best events I have attended at SCET.","Highly informative and inspiring sessions.","Amazing atmosphere and brilliant participants.","Top-notch organisation and content quality.","Brilliant event with real-world relevance.","Well-structured programme with clear objectives.","Thoroughly enjoyed every session here.","Great learning opportunity for all students.","Impressive event management from start to finish.","Very motivating and skill-enhancing event.","Excellent collaboration between teams.","Learned practical skills I will use immediately.","Best event of the semester without a doubt."];
const _Q3=["More seating arrangements would help.","Wi-Fi connectivity could be improved.","Would love a longer duration next time.","Food options could be more varied.","Registration process needs to be smoother.","Need more charging points in venue.","Parking arrangements could be better.","Audio quality in back rows was low.","Start time could be slightly earlier.","More interactive Q&A sessions needed.","Better signage around the venue needed.","More hands-on activities would be great.","Could provide printed schedules.","Air conditioning was too cold.","More breaks between sessions.","Lighting could be improved in some areas.","More mentors available would help.","Certificate process could be faster.","Need dedicated networking slots.","Live streaming for remote students would help."];
const _ffb=(pfx,n,start=1)=>Array.from({length:n},(_,i)=>({email:`${pfx}${String(i+start).padStart(3,"0")}@scet.ac.in`,q1:(i%3===0?4:5),q2:_Q2[(i+start)%_Q2.length],q3:_Q3[(i+start)%_Q3.length],ts:i+start+100}));

// Per-event registrations: eventId -> array of participant emails
const SEED_REGS = {
  // e1: HackSCET - orgId=arjun (arjun+sneha organise) -> divya,rohan can participate
  e1:  ["sneha@scet.ac.in","divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","sofia@scet.ac.in","ananya@scet.ac.in","kai@scet.ac.in","nitin@scet.ac.in","vikram@scet.ac.in","pooja@scet.ac.in","aditya@scet.ac.in",..._fe("hs26",172)],
  // e2: AI Symposium - orgId=arjun (arjun+aditya organise) -> divya,rohan can participate
  e2:  ["aditya@scet.ac.in","rohan@scet.ac.in","divya@scet.ac.in","priya@scet.ac.in","sofia@scet.ac.in","kai@scet.ac.in","marcus@scet.ac.in","ananya@scet.ac.in","nitin@scet.ac.in","sneha@scet.ac.in",..._fe("ai26",450)],
  // e3: Cultural Fest - pending
  e3:  [],
  // e4: Robotics Workshop - orgId=arjun (arjun+vikram organise) -> divya,rohan can participate
  e4:  ["vikram@scet.ac.in","divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","kai@scet.ac.in","ananya@scet.ac.in","sofia@scet.ac.in","sneha@scet.ac.in","nitin@scet.ac.in",..._fe("rb26",37)],
  // e5: Startup Pitch - orgId=divya (divya+pooja organise) -> arjun,rohan can participate
  e5:  ["arjun@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","ananya@scet.ac.in","kai@scet.ac.in","nitin@scet.ac.in","marcus@scet.ac.in"],
  // e6: DS Bootcamp - orgId=sneha (sneha+arjun organise) -> divya,rohan can participate
  e6:  ["divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","kai@scet.ac.in","ananya@scet.ac.in","sofia@scet.ac.in","nitin@scet.ac.in","aditya@scet.ac.in",..._fe("ds26",47)],
  // e7: EC Circuit - orgId=aditya (aditya+divya organise) -> arjun,rohan can participate
  e7:  ["arjun@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","sofia@scet.ac.in","kai@scet.ac.in","sneha@scet.ac.in",..._fe("ec26",60)],
  // e8: CodeSprint - orgId=rohan (rohan+sneha organise) -> arjun,divya can participate
  e8:  ["arjun@scet.ac.in","divya@scet.ac.in","kai@scet.ac.in","vikram@scet.ac.in","nitin@scet.ac.in","pooja@scet.ac.in","priya@scet.ac.in","aditya@scet.ac.in",..._fe("cs26",96)],
  // e9: MECH Challenge - orgId=vikram (vikram+rohan organise) -> arjun,divya can participate
  e9:  ["arjun@scet.ac.in","divya@scet.ac.in","marcus@scet.ac.in","priya@scet.ac.in","kai@scet.ac.in",..._fe("me26",48)],
  // e10: AI/ML Workshop - pending
  e10: [],
  // e11: Chem Expo - orgId=nitin (nitin+pooja organise) -> arjun,rohan can participate
  e11: ["arjun@scet.ac.in","rohan@scet.ac.in","sofia@scet.ac.in","ananya@scet.ac.in","marcus@scet.ac.in","priya@scet.ac.in",..._fe("ch26",55)],
  // e12: Civil Symposium - orgId=vikram (vikram+nitin organise) -> arjun,divya,rohan can participate
  e12: ["arjun@scet.ac.in","divya@scet.ac.in","rohan@scet.ac.in","marcus@scet.ac.in","priya@scet.ac.in","kai@scet.ac.in","ananya@scet.ac.in","aditya@scet.ac.in",..._fe("cv26",160)],
  // e13: Sports Fest - orgId=pooja (pooja+vikram organise) -> arjun,divya,rohan can participate
  e13: ["divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","kai@scet.ac.in","sneha@scet.ac.in","aditya@scet.ac.in","nitin@scet.ac.in",..._fe("sp26",235)],
  // e14: IC Design - pending
  e14: [],
  // e15: Open Source Day - rejected
  e15: [],
};

/* ═══════════════════════════════════════════════════════════════
   APP STATE  — initialized ONCE at page load, persists across logins
   ═══════════════════════════════════════════════════════════════ */
let CU   = null;   // current user
let history = [];
let charts  = {};
let notifOpen = false;
let unsubscribers = [];

// These are the LIVE shared stores — mutated in place, never reset
let EVTS = [];
let REGS = {};
let WAIT = {};
let _storeReady = false;  // guards one-time init

// Notifications: { userEmail: [{text, time, dot, type}] }
const USER_NOTIFS = {
  "admin@scet.ac.in": [
    {dot:true,  text:"⚠️ Spring Cultural Fest awaiting your approval.", time:"3 hours ago", type:"or"},
    {dot:true,  text:"⚠️ AI/ML Workshop Series awaiting your review.", time:"2 hours ago",  type:"or"},
    {dot:true,  text:"⭐ New 5-star feedback for HackSCET 2026!", time:"1 week ago", type:"ye"},
    {dot:false, text:"Robotics Workshop 2026 — 44/50 attended. Great turnout!", time:"2 weeks ago", type:"gr"},
    {dot:false, text:"IC Design Hackathon submitted for approval by Pooja Reddy.", time:"1 hour ago", type:"or"},
  ],
  "admin2@scet.ac.in": [
    {dot:true,  text:"⚠️ IC Design Hackathon awaiting your review.", time:"1 hour ago", type:"or"},
    {dot:true,  text:"Open Source Day was rejected — follow-up with Sneha Kulkarni.", time:"1 day ago", type:"re"},
    {dot:true,  text:"CodeSprint Marathon — 97/106 attended. Excellent!", time:"1 week ago", type:"gr"},
    {dot:false, text:"⭐ New feedback for Civil Structural Symposium — 4.8/5 stars", time:"1 week ago", type:"ye"},
    {dot:false, text:"Intercollege Sports Fest approved and ready for April 15.", time:"2 days ago", type:"gr"},
  ],
  "arjun@scet.ac.in": [
    {dot:true,  text:"🔔 Startup Pitch Night on May 20 — you are a registered participant!", time:"2 hours ago", type:"p"},
    {dot:true,  text:"✅ HackSCET 2026 was a massive success! 175+ attended.", time:"3 weeks ago", type:"gr"},
    {dot:true,  text:"⭐ Share your feedback for Data Science Bootcamp!", time:"1 week ago", type:"ye"},
    {dot:true,  text:"⭐ Share your feedback for EC Circuit Design Fest!", time:"1 week ago", type:"ye"},
    {dot:false, text:"Spring Cultural Fest is pending admin review.", time:"3 hours ago", type:"or"},
  ],
  "divya@scet.ac.in": [
    {dot:true,  text:"⚠️ Spring Cultural Fest awaiting admin approval.", time:"3 hours ago", type:"or"},
    {dot:true,  text:"⚠️ AI/ML Workshop Series pending approval.", time:"2 hours ago", type:"or"},
    {dot:true,  text:"✅ EC Circuit Design Fest 2026 completed! 68/70 attended.", time:"1 week ago", type:"gr"},
    {dot:true,  text:"⭐ Share your feedback for HackSCET 2026!", time:"1 week ago", type:"ye"},
    {dot:false, text:"⭐ Share your feedback for CodeSprint Marathon!", time:"1 week ago", type:"ye"},
  ],
  "rohan@scet.ac.in": [
    {dot:true,  text:"⚠️ IC Design Hackathon pending admin review.", time:"1 hour ago", type:"or"},
    {dot:true,  text:"✅ CodeSprint Marathon completed! 97 attended.", time:"1 week ago", type:"gr"},
    {dot:true,  text:"✅ MECH Design Challenge completed! 51 attended.", time:"2 weeks ago", type:"gr"},
    {dot:true,  text:"⭐ Share your feedback for HackSCET 2026!", time:"1 week ago", type:"ye"},
    {dot:false, text:"⭐ Share your feedback for Chem Innovation Expo!", time:"1 week ago", type:"ye"},
  ],
};

// Venue bookings: venueId -> [{eventId, eventTitle, date, status}]
const VENUE_BOOKINGS = {
  "v1": [{eventId:"e2",eventTitle:"AI & Society Symposium",date:"2026-02-20",status:"approved"},{eventId:"e12",eventTitle:"Civil Struct Symposium",date:"2026-03-08",status:"approved"}],
  "v2": [{eventId:"e1",eventTitle:"HackSCET 2026",date:"2026-02-10",status:"approved"},{eventId:"e8",eventTitle:"CodeSprint Marathon",date:"2026-03-14",status:"approved"}],
  "v3": [{eventId:"e3",eventTitle:"Spring Cultural Fest",date:"2026-05-10",status:"pending"}],
  "v4": [{eventId:"e4",eventTitle:"Robotics Workshop",date:"2026-02-25",status:"approved"},{eventId:"e7",eventTitle:"EC Circuit Design Fest",date:"2026-02-15",status:"approved"},{eventId:"e11",eventTitle:"Chem Innovation Expo",date:"2026-02-28",status:"approved"}],
  "v5": [{eventId:"e5",eventTitle:"Startup Pitch Night",date:"2026-05-20",status:"approved"},{eventId:"e6",eventTitle:"Data Science Bootcamp",date:"2026-03-05",status:"approved"},{eventId:"e10",eventTitle:"AI/ML Workshop Series",date:"2026-04-05",status:"pending"}],
  "v6": [{eventId:"e9",eventTitle:"MECH Design Challenge",date:"2026-03-20",status:"approved"},{eventId:"e13",eventTitle:"Intercollege Sports Fest",date:"2026-04-15",status:"approved"}],
};

// Map event venue names to venue IDs
const VENUE_NAME_MAP = {
  "SCET Auditorium":"v1","Main Block — Hall 1":"v2","SCET Open Ground":"v3",
  "Innovation Lab — Block B":"v4","Seminar Hall — Block C":"v5","SCET Sports Complex":"v6",
};

// Additional organizers data
const ORGANIZERS_DB = {
  "arjun@scet.ac.in":  {name:"Arjun Mehta",      email:"arjun@scet.ac.in",  dept:"CS",    av:"AM", rating:4.9, phone:"+91 99001 11111", categories:["Hackathon","Symposium","Workshop"]},
  "divya@scet.ac.in":  {name:"Divya Sharma",      email:"divya@scet.ac.in",  dept:"EC",    av:"DS", rating:4.7, phone:"+91 98100 22222", categories:["Cultural","Entrepreneurship","Workshop"]},
  "rohan@scet.ac.in":  {name:"Rohan Patel",       email:"rohan@scet.ac.in",  dept:"IT",    av:"RP", rating:4.8, phone:"+91 97200 33333", categories:["Hackathon","Technical"]},
  "sneha@scet.ac.in":  {name:"Sneha Kulkarni",    email:"sneha@scet.ac.in",  dept:"CS",    av:"SK", rating:4.6, phone:"+91 93333 77777", categories:["Workshop","Technical"]},
  "aditya@scet.ac.in": {name:"Aditya Rao",        email:"aditya@scet.ac.in", dept:"EC",    av:"AR", rating:4.5, phone:"+91 94444 88888", categories:["Technical"]},
  "nitin@scet.ac.in":  {name:"Nitin Desai",       email:"nitin@scet.ac.in",  dept:"CHEM",  av:"ND", rating:4.4, phone:"+91 90001 44444", categories:["Technical","Symposium"]},
  "vikram@scet.ac.in": {name:"Vikram Joshi",      email:"vikram@scet.ac.in", dept:"CIVIL", av:"VJ", rating:4.6, phone:"+91 92222 66666", categories:["Technical","Symposium","Sports"]},
  "pooja@scet.ac.in":  {name:"Pooja Reddy",       email:"pooja@scet.ac.in",  dept:"IC",    av:"PR", rating:4.5, phone:"+91 91111 55555", categories:["Sports","Entrepreneurship","Hackathon"]},
};

/* ──────────────────────────────────────────────────────
   GUESTS & SPONSORS DB (rich profiles)
────────────────────────────────────────────────────── */
const GUESTS_DB = {
  "g_e1_1":{name:"Prof. Arvind Mehta",   role:"Keynote Speaker",  phone:"+91 98100 11234", about:"Professor of CS at IIT Bombay. Author of 4 books on distributed systems. 20+ years in academia and industry.", topic:"Future of Open Source Hardware", evId:"e1"},
  "g_e1_2":{name:"Ms. Nandita Rao",      role:"Industry Mentor",  phone:"+91 97200 22345", about:"CTO at TechForge Innovations, ex-Amazon. Led teams of 200+ engineers. Passionate about scalable products.", topic:"From Hackathon to Product", evId:"e1"},
  "g_e2_1":{name:"Dr. Kavita Sharma",    role:"Keynote Speaker",  phone:"+91 96300 33456", about:"AI Ethics researcher. Published 30+ papers on responsible AI. Fellow of INAE.", topic:"Responsible AI in Healthcare", evId:"e2"},
  "g_e2_2":{name:"Mr. Rajesh Desai",     role:"Panel Speaker",    phone:"+91 95400 44567", about:"Founder of NeuralBridge, applying LLMs to Indian language processing. Forbes 30 Under 30.", topic:"AI & Vernacular Languages", evId:"e2"},
  "g_e4_1":{name:"Mr. Vikram Iyer",      role:"Workshop Lead",    phone:"+91 94500 55678", about:"Lead robotics engineer at Tata Motors Innovation Lab. Holds 8 patents in autonomous navigation.", topic:"Autonomous Robot Navigation", evId:"e4"},
  "g_e5_1":{name:"Ms. Preethi Naidu",    role:"Investor Panelist",phone:"+91 93600 66789", about:"Partner at Elevation Capital. Invested in 40+ startups including Meesho and Unacademy.", topic:"What Investors Look For in 2026", evId:"e5"},
  "g_e5_2":{name:"Mr. Sanjay Kulkarni",  role:"Startup Founder",  phone:"+91 92700 77890", about:"CEO of PayEasy fintech. Built from college project to Rs 1200 Cr valuation in 6 years.", topic:"Zero to Unicorn: My Journey", evId:"e5"},
  "g_e6_1":{name:"Dr. Amit Bansal",      role:"Expert Trainer",   phone:"+91 91800 88901", about:"Lead Data Scientist at Flipkart. PhD from IITD. YouTube channel DataWala with 800K subscribers.", topic:"Production ML Pipelines", evId:"e6"},
  "g_e7_1":{name:"Dr. Suresh Kapoor",    role:"Keynote Speaker",  phone:"+91 91700 99012", about:"Professor of EC at IIT Delhi. Expert in analog IC design and RF circuits. 25+ years experience.", topic:"Advanced PCB Design Techniques", evId:"e7"},
  "g_e8_1":{name:"Mr. Karthik Srinivasan",role:"Expert Judge",    phone:"+91 91600 00123", about:"Senior Software Engineer at Google India. ICPC World Finalist. Competitive programming coach for top colleges.", topic:"Algorithmic Thinking in Industry", evId:"e8"},
  "g_e12_1":{name:"Dr. Vikram Anand",    role:"Keynote Speaker",  phone:"+91 91500 11234", about:"IIT Madras alumnus and Chief Structural Engineer at L&T. Expert in earthquake-resistant design.", topic:"Sustainable Smart City Infrastructure", evId:"e12"},
};
const SPONSORS_DB = {
  "s_e1_1":{name:"TechForge India",    type:"Title Sponsor",    phone:"+91 11 4000 1234", about:"India leading tech accelerator, funding 50+ student startups annually. HQ in Bengaluru.", amount:"Rs 2,00,000", evId:"e1"},
  "s_e1_2":{name:"CloudSpark",         type:"Co-Sponsor",       phone:"+91 22 4000 5678", about:"Cloud infrastructure startup offering free credits to student projects.", amount:"Rs 75,000", evId:"e1"},
  "s_e1_3":{name:"SCET Alumni Fund",   type:"Community Sponsor",phone:"+91 79 2600 0001", about:"SCET alumni network funding campus initiatives. 500+ donors annually.", amount:"Rs 50,000", evId:"e1"},
  "s_e2_1":{name:"InnovateMind",       type:"Title Sponsor",    phone:"+91 80 6700 2345", about:"EdTech company focused on AI literacy in tier-2 cities. 2 million learners.", amount:"Rs 1,50,000", evId:"e2"},
  "s_e4_1":{name:"RoboNation India",   type:"Title Sponsor",    phone:"+91 44 3900 3456", about:"Robotics equipment supplier. Official partner for 20+ IITs and NITs.", amount:"Rs 80,000", evId:"e4"},
  "s_e5_1":{name:"FoundersHub",        type:"Title Sponsor",    phone:"+91 98 2200 4567", about:"Co-working and mentorship network for student entrepreneurs. 15 city presence.", amount:"Rs 1,00,000", evId:"e5"},
  "s_e6_1":{name:"DataEdge Solutions", type:"Title Sponsor",    phone:"+91 20 7100 5678", about:"Analytics consulting firm. Provides internships to bootcamp graduates.", amount:"Rs 90,000", evId:"e6"},
  "s_e7_1":{name:"TI India",           type:"Title Sponsor",    phone:"+91 44 2900 6789", about:"Texas Instruments India — supporting engineering education with kits and internships.", amount:"Rs 60,000", evId:"e7"},
  "s_e8_1":{name:"AWS India",          type:"Title Sponsor",    phone:"+91 80 6800 7890", about:"Amazon Web Services India provides cloud credits and learning resources to students.", amount:"Rs 1,20,000", evId:"e8"},
  "s_e12_1":{name:"L&T Engineering",  type:"Title Sponsor",    phone:"+91 22 6700 8901", about:"India top engineering and construction firm. Funds student civil engineering competitions.", amount:"Rs 1,50,000", evId:"e12"},
};

/* TEAMS_DB: { evId: [{email,name,dept,phone,year,role,av}] } */
const TEAMS_DB = {
  "e1":[
    {email:"kai@scet.ac.in",    name:"Karan Iyer",    dept:"CS",    phone:"+91 87654 32109", year:"3rd Year", role:"Logistics Head",    av:"KI"},
    {email:"priya@scet.ac.in",  name:"Priya Nair",    dept:"EC",    phone:"+91 91234 56789", year:"2nd Year", role:"Registration",      av:"PN"},
    {email:"rahul@scet.ac.in",  name:"Rahul Sharma",  dept:"CS",    phone:"+91 91001 20001", year:"3rd Year", role:"Tech Support",      av:"RS"},
    {email:"ananya@scet.ac.in", name:"Ananya Gupta",  dept:"IT",    phone:"+91 94567 12345", year:"2nd Year", role:"Social Media",      av:"AG"},
    {email:"naina@scet.ac.in",  name:"Naina Mehta",   dept:"CS",    phone:"+91 96001 20006", year:"2nd Year", role:"Sponsorship",       av:"NM"},
  ],
  "e2":[
    {email:"meera@scet.ac.in",  name:"Meera Pillai",  dept:"AI",    phone:"+91 92001 20002", year:"2nd Year", role:"Content & Outreach",av:"MP"},
    {email:"aryan@scet.ac.in",  name:"Aryan Verma",   dept:"EC",    phone:"+91 93001 20003", year:"3rd Year", role:"AV & Streaming",    av:"AV"},
    {email:"sofia@scet.ac.in",  name:"Sofia Menon",   dept:"AI",    phone:"+91 99887 65432", year:"1st Year", role:"Guest Coordination",av:"SM"},
  ],
  "e3":[
    {email:"tanya@scet.ac.in",  name:"Tanya Bose",    dept:"IT",    phone:"+91 94001 20004", year:"2nd Year", role:"Stall Coordinator", av:"TB"},
    {email:"riya@scet.ac.in",   name:"Riya Das",      dept:"CIVIL", phone:"+91 97001 20007", year:"1st Year", role:"Stage & Sound",     av:"RD"},
    {email:"raj@scet.ac.in",    name:"Raj Malhotra",  dept:"CIVIL", phone:"+91 92101 20012", year:"4th Year", role:"Security Coord.",   av:"RM"},
  ],
  "e4":[
    {email:"amit@scet.ac.in",   name:"Amit Khanna",   dept:"MECH",  phone:"+91 98001 20008", year:"4th Year", role:"Equipment Head",    av:"AK"},
    {email:"prerna@scet.ac.in", name:"Prerna Gupta",  dept:"CS",    phone:"+91 99001 20009", year:"3rd Year", role:"Safety Officer",    av:"PG"},
  ],
  "e5":[
    {email:"kai@scet.ac.in",    name:"Karan Iyer",    dept:"CS",    phone:"+91 87654 32109", year:"3rd Year", role:"Pitch Coordinator", av:"KI"},
    {email:"priya@scet.ac.in",  name:"Priya Nair",    dept:"EC",    phone:"+91 91234 56789", year:"2nd Year", role:"Investor Relations",av:"PN"},
    {email:"shiv@scet.ac.in",   name:"Shiv Kapoor",   dept:"AI",    phone:"+91 90101 20010", year:"3rd Year", role:"Registration",      av:"SP"},
  ],
  "e6":[
    {email:"anjali@scet.ac.in", name:"Anjali Pande",  dept:"IT",    phone:"+91 91101 20011", year:"2nd Year", role:"Lab Setup",         av:"AP"},
    {email:"rahul@scet.ac.in",  name:"Rahul Sharma",  dept:"CS",    phone:"+91 91001 20001", year:"3rd Year", role:"Resource Coord.",   av:"RS"},
  ],
  "e7":[
    {email:"deepak@scet.ac.in", name:"Deepak Singh",  dept:"EC",    phone:"+91 93101 20013", year:"2nd Year", role:"Circuit Setup",     av:"DK"},
    {email:"meera@scet.ac.in",  name:"Meera Pillai",  dept:"AI",    phone:"+91 92001 20002", year:"2nd Year", role:"Judging Coord.",    av:"MP"},
  ],
  "e8":[
    {email:"kai@scet.ac.in",    name:"Karan Iyer",    dept:"CS",    phone:"+91 87654 32109", year:"3rd Year", role:"Judge Liaison",     av:"KI"},
    {email:"naina@scet.ac.in",  name:"Naina Mehta",   dept:"CS",    phone:"+91 96001 20006", year:"2nd Year", role:"Platform Setup",    av:"NM"},
    {email:"prerna@scet.ac.in", name:"Prerna Gupta",  dept:"CS",    phone:"+91 99001 20009", year:"3rd Year", role:"Scoreboard",        av:"PG"},
  ],
  "e9":[
    {email:"amit@scet.ac.in",   name:"Amit Khanna",   dept:"MECH",  phone:"+91 98001 20008", year:"4th Year", role:"Equipment Head",    av:"AK"},
    {email:"siddharth@scet.ac.in",name:"Siddharth Jain",dept:"MECH",phone:"+91 95001 20005", year:"3rd Year", role:"Test Coordinator",  av:"SJ"},
  ],
  "e11":[
    {email:"neha@scet.ac.in",   name:"Neha Verma",    dept:"CHEM",  phone:"+91 94101 20014", year:"3rd Year", role:"Lab Coordinator",   av:"NV"},
    {email:"varun@scet.ac.in",  name:"Varun Nair",    dept:"IC",    phone:"+91 95101 20015", year:"1st Year", role:"Exhibition Setup",  av:"VN"},
  ],
  "e12":[
    {email:"riya@scet.ac.in",   name:"Riya Das",      dept:"CIVIL", phone:"+91 97001 20007", year:"1st Year", role:"Stage Coordinator", av:"RD"},
    {email:"raj@scet.ac.in",    name:"Raj Malhotra",  dept:"CIVIL", phone:"+91 92101 20012", year:"4th Year", role:"AV Setup",          av:"RM"},
  ],
  "e13":[
    {email:"priya@scet.ac.in",  name:"Priya Nair",    dept:"EC",    phone:"+91 91234 56789", year:"2nd Year", role:"Sports Coord.",     av:"PN"},
    {email:"kai@scet.ac.in",    name:"Karan Iyer",    dept:"CS",    phone:"+91 87654 32109", year:"3rd Year", role:"Logistics",         av:"KI"},
    {email:"siddharth@scet.ac.in",name:"Siddharth Jain",dept:"MECH",phone:"+91 95001 20005", year:"3rd Year", role:"Security",          av:"SJ"},
  ],
}

/* WORK_STATUS: { evId: [{id,task,assignee,status,due,priority}] } */
const WORK_STATUS = {
  "e1":[
    {id:"w1",task:"Confirm venue booking",         assignee:"arjun@scet.ac.in",   status:"done",        due:"2026-02-01",priority:"high"},
    {id:"w2",task:"Finalise guest speakers",       assignee:"arjun@scet.ac.in",   status:"done",        due:"2026-02-03",priority:"high"},
    {id:"w3",task:"Send registrant confirmations", assignee:"kai@scet.ac.in",     status:"done",        due:"2026-02-05",priority:"med"},
    {id:"w4",task:"Set up judging platform",       assignee:"sneha@scet.ac.in",   status:"done",        due:"2026-02-08",priority:"high"},
    {id:"w5",task:"Collect sponsorship cheques",   assignee:"ananya@scet.ac.in",  status:"done",        due:"2026-02-09",priority:"med"},
    {id:"w6",task:"Post-event report submission",  assignee:"arjun@scet.ac.in",   status:"pending",     due:"2026-02-20",priority:"high"},
  ],
  "e2":[
    {id:"w1",task:"Confirm speaker travel",        assignee:"sofia@scet.ac.in",   status:"done",        due:"2026-02-12",priority:"high"},
    {id:"w2",task:"Set up live-stream",            assignee:"aditya@scet.ac.in",  status:"done",        due:"2026-02-19",priority:"high"},
    {id:"w3",task:"Design event banner",           assignee:"ananya@scet.ac.in",  status:"done",        due:"2026-02-15",priority:"low"},
    {id:"w4",task:"Post-event feedback analysis",  assignee:"arjun@scet.ac.in",   status:"done",        due:"2026-03-01",priority:"med"},
  ],
  "e3":[
    {id:"w1",task:"Finalise stall allocations",    assignee:"nitin@scet.ac.in",   status:"in-progress", due:"2026-04-15",priority:"high"},
    {id:"w2",task:"Source stage equipment",        assignee:"pooja@scet.ac.in",   status:"pending",     due:"2026-04-20",priority:"high"},
    {id:"w3",task:"Design posters and banners",    assignee:"sneha@scet.ac.in",   status:"done",        due:"2026-04-10",priority:"med"},
    {id:"w4",task:"Confirm security team",         assignee:"vikram@scet.ac.in",  status:"pending",     due:"2026-05-01",priority:"high"},
    {id:"w5",task:"Food vendor contracts",         assignee:"divya@scet.ac.in",   status:"in-progress", due:"2026-04-25",priority:"med"},
  ],
  "e4":[
    {id:"w1",task:"Order component kits",          assignee:"vikram@scet.ac.in",  status:"done",        due:"2026-02-18",priority:"high"},
    {id:"w2",task:"Safety briefing prep",          assignee:"ananya@scet.ac.in",  status:"done",        due:"2026-02-24",priority:"high"},
    {id:"w3",task:"Post-event report",             assignee:"arjun@scet.ac.in",   status:"done",        due:"2026-03-05",priority:"med"},
  ],
  "e5":[
    {id:"w1",task:"Confirm investor panellists",   assignee:"priya@scet.ac.in",   status:"done",        due:"2026-05-01",priority:"high"},
    {id:"w2",task:"Design pitch template",         assignee:"kai@scet.ac.in",     status:"done",        due:"2026-05-05",priority:"med"},
    {id:"w3",task:"Set up registration desk",      assignee:"nitin@scet.ac.in",   status:"in-progress", due:"2026-05-18",priority:"med"},
    {id:"w4",task:"Finalise prize distribution",   assignee:"divya@scet.ac.in",   status:"pending",     due:"2026-05-15",priority:"high"},
    {id:"w5",task:"Collect pitch decks",           assignee:"kai@scet.ac.in",     status:"in-progress", due:"2026-05-17",priority:"high"},
  ],
  "e6":[
    {id:"w1",task:"Set up Jupyter Lab environment",assignee:"sneha@scet.ac.in",   status:"done",        due:"2026-03-01",priority:"high"},
    {id:"w2",task:"Prepare resource materials",    assignee:"aditya@scet.ac.in",  status:"done",        due:"2026-03-03",priority:"med"},
    {id:"w3",task:"Post-event certificate issue",  assignee:"arjun@scet.ac.in",   status:"done",        due:"2026-03-10",priority:"med"},
  ],
  "e8":[
    {id:"w1",task:"Finalise problem sets",         assignee:"rohan@scet.ac.in",   status:"done",        due:"2026-03-10",priority:"high"},
    {id:"w2",task:"Setup judging platform",        assignee:"kai@scet.ac.in",     status:"done",        due:"2026-03-12",priority:"high"},
    {id:"w3",task:"Post-event editorial",          assignee:"sneha@scet.ac.in",   status:"done",        due:"2026-03-16",priority:"med"},
  ],
};

/* TEAM_CHATS: { "teamchat_evId": [{from,name,av,text,time,ts}] } */
const TEAM_CHATS = {
  "teamchat_e1":[
    {from:"arjun@scet.ac.in",  name:"Arjun Mehta",   av:"AM",text:"Team — HackSCET 2026 was a massive success. 175+ attended! Incredibly proud of everyone.",time:"10:00 AM",ts:1},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS",text:"Logistics went super smooth. All teams operational and loved the problem statements.",time:"10:15 AM",ts:2},
    {from:"kai@scet.ac.in",    name:"Karan Iyer",    av:"KI",text:"Tech support resolved all issues during hacking phase. Great energy throughout!",time:"10:20 AM",ts:3},
  ],
  "teamchat_e5":[
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS",text:"Team — Startup Pitch Night is on May 20! Target 100+ registrations by May 10. Let us go!",time:"9:00 AM",ts:1},
    {from:"arjun@scet.ac.in",  name:"Arjun Mehta",   av:"AM",text:"Pitch deck template is ready. Sharing with all registered teams today.",time:"9:30 AM",ts:2},
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP",text:"All investor panellists confirmed. Ms. Preethi Naidu arriving a day early!",time:"9:45 AM",ts:3},
  ],
  "teamchat_e8":[
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP",text:"CodeSprint 2026 is on March 14! Problem sets finalised. Let us make this the best one yet!",time:"8:00 AM",ts:1},
    {from:"arjun@scet.ac.in",  name:"Arjun Mehta",   av:"AM",text:"Judge platform ready. All 3 difficulty levels confirmed and contest duration set.",time:"8:15 AM",ts:2},
  ],
};

/* PAYMENTS: { evId: { email: {status,method,amount,date} } } */
const PAYMENTS = {
  "e1":{
    "arjun@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-02-01"},
    "sneha@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-02-01"},
    "divya@scet.ac.in":   {status:"paid",   method:"online", amount:500,date:"2026-02-03"},
    "rohan@scet.ac.in":   {status:"paid",   method:"online", amount:500,date:"2026-02-04"},
    "priya@scet.ac.in":   {status:"paid",   method:"online", amount:500,date:"2026-02-03"},
    "marcus@scet.ac.in":  {status:"paid",   method:"cash",   amount:500,date:"2026-02-04"},
    "sofia@scet.ac.in":   {status:"paid",   method:"online", amount:500,date:"2026-02-04"},
    "ananya@scet.ac.in":  {status:"paid",   method:"online", amount:500,date:"2026-02-05"},
    "kai@scet.ac.in":     {status:"paid",   method:"cash",   amount:500,date:"2026-02-05"},
    "nitin@scet.ac.in":   {status:"paid",   method:"online", amount:500,date:"2026-02-03"},
    "vikram@scet.ac.in":  {status:"paid",   method:"cash",   amount:500,date:"2026-02-04"},
    "pooja@scet.ac.in":   {status:"paid",   method:"online", amount:500,date:"2026-02-04"},
    "aditya@scet.ac.in":  {status:"paid",   method:"online", amount:500,date:"2026-02-03"},
  },
  "e4":{
    "arjun@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-02-20"},
    "vikram@scet.ac.in":  {status:"waived", method:null,     amount:0,  date:"2026-02-20"},
    "divya@scet.ac.in":   {status:"paid",   method:"online", amount:250,date:"2026-02-21"},
    "rohan@scet.ac.in":   {status:"paid",   method:"online", amount:250,date:"2026-02-22"},
    "priya@scet.ac.in":   {status:"paid",   method:"online", amount:250,date:"2026-02-21"},
    "marcus@scet.ac.in":  {status:"paid",   method:"cash",   amount:250,date:"2026-02-22"},
    "kai@scet.ac.in":     {status:"paid",   method:"online", amount:250,date:"2026-02-20"},
    "ananya@scet.ac.in":  {status:"paid",   method:"online", amount:250,date:"2026-02-21"},
    "sofia@scet.ac.in":   {status:"pending",method:null,     amount:250,date:null},
    "sneha@scet.ac.in":   {status:"paid",   method:"online", amount:250,date:"2026-02-21"},
    "nitin@scet.ac.in":   {status:"paid",   method:"cash",   amount:250,date:"2026-02-22"},
  },
  "e5":{
    "divya@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-04-01"},
    "pooja@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-04-01"},
    "arjun@scet.ac.in":   {status:"paid",   method:"online", amount:150,date:"2026-04-10"},
    "rohan@scet.ac.in":   {status:"paid",   method:"online", amount:150,date:"2026-04-11"},
    "priya@scet.ac.in":   {status:"paid",   method:"online", amount:150,date:"2026-04-10"},
    "ananya@scet.ac.in":  {status:"pending",method:null,     amount:150,date:null},
    "kai@scet.ac.in":     {status:"paid",   method:"online", amount:150,date:"2026-04-12"},
    "nitin@scet.ac.in":   {status:"paid",   method:"cash",   amount:150,date:"2026-04-11"},
    "marcus@scet.ac.in":  {status:"paid",   method:"online", amount:150,date:"2026-04-11"},
  },
  "e6":{
    "sneha@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-03-01"},
    "arjun@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-03-01"},
    "divya@scet.ac.in":   {status:"paid",   method:"online", amount:200,date:"2026-03-01"},
    "rohan@scet.ac.in":   {status:"paid",   method:"online", amount:200,date:"2026-03-01"},
    "priya@scet.ac.in":   {status:"paid",   method:"online", amount:200,date:"2026-02-28"},
    "marcus@scet.ac.in":  {status:"paid",   method:"online", amount:200,date:"2026-02-27"},
    "kai@scet.ac.in":     {status:"paid",   method:"cash",   amount:200,date:"2026-02-28"},
    "ananya@scet.ac.in":  {status:"paid",   method:"online", amount:200,date:"2026-02-28"},
    "sofia@scet.ac.in":   {status:"pending",method:null,     amount:200,date:null},
    "nitin@scet.ac.in":   {status:"paid",   method:"online", amount:200,date:"2026-02-28"},
    "aditya@scet.ac.in":  {status:"paid",   method:"cash",   amount:200,date:"2026-02-28"},
  },
  "e7":{
    "aditya@scet.ac.in":  {status:"waived", method:null,     amount:0,  date:"2026-02-13"},
    "divya@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-02-13"},
    "arjun@scet.ac.in":   {status:"paid",   method:"online", amount:150,date:"2026-02-13"},
    "rohan@scet.ac.in":   {status:"paid",   method:"cash",   amount:150,date:"2026-02-14"},
    "priya@scet.ac.in":   {status:"paid",   method:"online", amount:150,date:"2026-02-13"},
    "sofia@scet.ac.in":   {status:"paid",   method:"online", amount:150,date:"2026-02-13"},
    "kai@scet.ac.in":     {status:"paid",   method:"online", amount:150,date:"2026-02-14"},
    "sneha@scet.ac.in":   {status:"paid",   method:"cash",   amount:150,date:"2026-02-14"},
  },
  "e8":{
    "rohan@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-03-08"},
    "sneha@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-03-08"},
    "arjun@scet.ac.in":   {status:"paid",   method:"online", amount:300,date:"2026-03-09"},
    "divya@scet.ac.in":   {status:"paid",   method:"online", amount:300,date:"2026-03-09"},
    "kai@scet.ac.in":     {status:"paid",   method:"online", amount:300,date:"2026-03-09"},
    "vikram@scet.ac.in":  {status:"paid",   method:"cash",   amount:300,date:"2026-03-10"},
    "nitin@scet.ac.in":   {status:"paid",   method:"online", amount:300,date:"2026-03-09"},
    "pooja@scet.ac.in":   {status:"paid",   method:"online", amount:300,date:"2026-03-10"},
    "priya@scet.ac.in":   {status:"paid",   method:"online", amount:300,date:"2026-03-09"},
    "aditya@scet.ac.in":  {status:"pending",method:null,     amount:300,date:null},
  },
  "e9":{
    "vikram@scet.ac.in":  {status:"waived", method:null,     amount:0,  date:"2026-03-15"},
    "rohan@scet.ac.in":   {status:"waived", method:null,     amount:0,  date:"2026-03-15"},
    "arjun@scet.ac.in":   {status:"paid",   method:"online", amount:200,date:"2026-03-17"},
    "divya@scet.ac.in":   {status:"paid",   method:"online", amount:200,date:"2026-03-17"},
    "marcus@scet.ac.in":  {status:"paid",   method:"cash",   amount:200,date:"2026-03-17"},
    "priya@scet.ac.in":   {status:"paid",   method:"online", amount:200,date:"2026-03-17"},
    "kai@scet.ac.in":     {status:"paid",   method:"online", amount:200,date:"2026-03-18"},
  },
};

/* ──────────────────────────────────────────────────────
   CHAT STORE: { chatId: [{from,name,text,time,ts}] }
   chatId = "chat_<eventId>"  (admin ↔ organiser per event)
────────────────────────────────────────────────────── */
const CHATS = {
  "chat_e3": [
    {from:"admin@scet.ac.in",  name:"Dr. Priya Nair",  text:"Hi Divya, can you confirm security arrangements for SCET Open Ground? We need at least 5 staff for 1000 capacity.", time:"10:30 AM", ts:1},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",    text:"Hi Dr. Nair! Yes, we have 6 security personnel confirmed. I can share the full deployment plan right away.", time:"10:35 AM", ts:2},
    {from:"admin@scet.ac.in",  name:"Dr. Priya Nair",  text:"Great. Also — what is the contingency plan for rain since SCET Open Ground is outdoors?", time:"10:37 AM", ts:3},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",    text:"We have a covered stage setup and backup indoor venue at SCET Auditorium if it rains.", time:"10:40 AM", ts:4},
  ],
  "chat_e10": [
    {from:"admin2@scet.ac.in", name:"Dr. Ramesh Kulkarni", text:"Hi Divya, the AI/ML Workshop Series proposal looks good but needs guest confirmation letters.", time:"9:00 AM", ts:1},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",         text:"Hi Dr. Kulkarni, we have Dr. Anita Reddy confirmed. Getting letter from Mr. Siddharth Bose today.", time:"9:15 AM", ts:2},
  ],
  "chat_e14": [
    {from:"admin@scet.ac.in",  name:"Dr. Priya Nair",  text:"Rohan, the IC Design Hackathon looks interesting. Can you clarify the simulation tools being used?", time:"11:00 AM", ts:1},
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",     text:"Hi Dr. Nair! We plan to use Cadence Virtuoso and LTspice. Both available in SCET labs.", time:"11:10 AM", ts:2},
  ],
  // Participant ↔ Organiser chats (key = porgchat_evId_participantEmail)
  "porgchat_e5_priya@scet.ac.in": [
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi! I am Divya Sharma, organiser of Startup Pitch Night. Feel free to ask any questions about the event.", time:"9:00 AM", ts:1},
    {from:"priya@scet.ac.in",  name:"Priya Nair",    av:"PN", text:"Hi Divya! Quick question — do we need to bring a printed copy of the pitch deck or just a laptop?", time:"9:05 AM", ts:2},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi Priya! Just a laptop is fine. We have HDMI adapters at the venue. Make sure your slides are in PDF format as backup.", time:"9:10 AM", ts:3},
    {from:"priya@scet.ac.in",  name:"Priya Nair",    av:"PN", text:"Perfect, thanks! Also — is the pitch time limit 5 minutes or 7 minutes?", time:"9:12 AM", ts:4},
  ],
  "porgchat_e5_kai@scet.ac.in": [
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi! I am Divya Sharma, organiser of Startup Pitch Night. Feel free to ask any questions about the event.", time:"11:00 AM", ts:1},
    {from:"kai@scet.ac.in",    name:"Karan Iyer",    av:"KI", text:"Hey Divya! Is there a registration fee refund if I cancel? I registered last week.", time:"11:15 AM", ts:2},
  ],
  "porgchat_e1_rohan@scet.ac.in": [
    {from:"arjun@scet.ac.in",  name:"Arjun Mehta",   av:"AM", text:"Hi Rohan! I am Arjun Mehta, one of the HackSCET organisers. Feel free to ask anything about the event.", time:"8:00 AM", ts:1},
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP", text:"Hey Arjun! As a co-org can I still attend HackSCET as a regular participant or only as organiser?", time:"8:20 AM", ts:2},
    {from:"arjun@scet.ac.in",  name:"Arjun Mehta",   av:"AM", text:"Great question! As a co-organiser you are part of the committee but cannot register as a participant for the same event.", time:"8:25 AM", ts:3},
  ],
  "porgchat_e8_divya@scet.ac.in": [
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP", text:"Hi Divya! I am Rohan, organiser of CodeSprint Marathon. Feel free to ask any questions.", time:"7:00 AM", ts:1},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi Rohan! What programming languages are allowed? And are team submissions accepted?", time:"7:30 AM", ts:2},
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP", text:"All major languages are allowed — C++, Java, Python, Go. Solo submissions only for this edition!", time:"7:35 AM", ts:3},
  ],
};

/* ──────────────────────────────────────────────────────
   ADMIN TO-DO: [{id, title, type, eventId, date, done}]
   type: guest | coordinator | faculty | review
────────────────────────────────────────────────────── */
// Different to-do lists per admin — keyed by admin email
const ADMIN_TODOS_DB = {
  "admin@scet.ac.in": [
    {id:"t1", title:"Attend HackSCET 2026 as Faculty Coordinator",    type:"coordinator", eventId:"e1",  date:"2026-02-10", done:true},
    {id:"t2", title:"Deliver keynote at AI & Society Symposium",      type:"guest",       eventId:"e2",  date:"2026-02-20", done:true},
    {id:"t3", title:"Review Spring Cultural Fest proposal on-site",   type:"review",      eventId:"e3",  date:"2026-05-10", done:false},
    {id:"t4", title:"Inspect Robotics Workshop safety setup",         type:"coordinator", eventId:"e4",  date:"2026-02-25", done:true},
    {id:"t5", title:"Judge Startup Pitch Night panel",                type:"guest",       eventId:"e5",  date:"2026-05-20", done:false},
    {id:"t6", title:"Review IC Design Hackathon proposal",            type:"review",      eventId:"e14", date:"2026-04-25", done:false},
    {id:"t7", title:"Faculty coordinate Data Science Bootcamp",       type:"coordinator", eventId:"e6",  date:"2026-03-05", done:true},
  ],
  "admin2@scet.ac.in": [
    {id:"t1", title:"Attend CodeSprint Marathon as Faculty Observer",  type:"coordinator", eventId:"e8",  date:"2026-03-14", done:true},
    {id:"t2", title:"Deliver talk at Civil Structural Symposium",      type:"guest",       eventId:"e12", date:"2026-03-08", done:true},
    {id:"t3", title:"Review AI/ML Workshop Series proposal",           type:"review",      eventId:"e10", date:"2026-04-05", done:false},
    {id:"t4", title:"Inspect MECH Design Challenge venue safety",      type:"coordinator", eventId:"e9",  date:"2026-03-20", done:true},
    {id:"t5", title:"Judge Intercollege Sports Fest opening",          type:"guest",       eventId:"e13", date:"2026-04-15", done:false},
    {id:"t6", title:"Review Chem Innovation Expo grants",              type:"review",      eventId:"e11", date:"2026-02-28", done:true},
    {id:"t7", title:"Faculty judge EC Circuit Design Fest",            type:"coordinator", eventId:"e7",  date:"2026-02-15", done:true},
    {id:"t8", title:"Review Open Source Day rejection appeal",         type:"review",      eventId:"e15", date:"2026-03-28", done:false},
  ],
};
// Getter that returns the correct admin's todo list
function getAdminTodos() {
  return ADMIN_TODOS_DB[CU?.email] || ADMIN_TODOS_DB["admin@scet.ac.in"];
}
// Legacy alias for compatibility
const ADMIN_TODOS = [];

/* ──────────────────────────────────────────────────────
   FEEDBACK: { eventId: [{email,q1(1-5),q2(text),q3(text),ts}] }
────────────────────────────────────────────────────── */
const FEEDBACK = {
  "e1": [
    {email:"sneha@scet.ac.in",    q1:5, q2:"Amazing event — team was incredible and participants loved the challenge!", q3:"Need more power outlets in Hall B.", ts:1},
    {email:"priya@scet.ac.in",    q1:5, q2:"Best hackathon I have attended! Mentors were world class.", q3:"Could use more food options overnight.", ts:2},
    {email:"marcus@scet.ac.in",   q1:4, q2:"Loved the networking sessions.", q3:"Wi-Fi was slow in some areas.", ts:3},
    {email:"ananya@scet.ac.in",   q1:5, q2:"Best hackathon I have ever attended!", q3:"More power outlets needed.", ts:4},
    {email:"sofia@scet.ac.in",    q1:4, q2:"Problem statements were super creative this year.", q3:"Judging criteria needed more clarity.", ts:5},
    {email:"kai@scet.ac.in",      q1:5, q2:"Won 2nd prize! Best college event I have attended.", q3:"Need more comfortable seating.", ts:6},
    {email:"nitin@scet.ac.in",    q1:4, q2:"Great exposure to real-world problem solving!", q3:"More beginner-friendly sessions needed.", ts:7},
    {email:"aditya@scet.ac.in",   q1:4, q2:"Excellent networking opportunity.", q3:"Registration process was slow.", ts:8},
    {email:"divya@scet.ac.in",    q1:5, q2:"Loved seeing students innovate!", q3:"Sound system in Hall B needs upgrade.", ts:9},
    {email:"vikram@scet.ac.in",   q1:4, q2:"Great diverse problem statements.", q3:"Add dedicated quiet zones.", ts:10},
    {email:"pooja@scet.ac.in",    q1:5, q2:"Absolutely loved the mentoring sessions!", q3:"More charging stations please.", ts:11},
    ..._ffb("hs26",150,5),
  ],
  "e2": [
    {email:"aditya@scet.ac.in",   q1:5, q2:"Dr. Kavita Sharma talk was absolutely mind-blowing!", q3:"Needed more time for Q&A.", ts:1},
    {email:"rohan@scet.ac.in",    q1:5, q2:"Changed how I think about AI completely.", q3:"Seating in back rows was cramped.", ts:2},
    {email:"priya@scet.ac.in",    q1:5, q2:"Eye-opening discussion on AI ethics and society.", q3:"More interactive Q&A sessions please.", ts:3},
    {email:"sofia@scet.ac.in",    q1:4, q2:"Loved the panel format — really engaging.", q3:"Parking situation was tough.", ts:4},
    {email:"marcus@scet.ac.in",   q1:5, q2:"World-class guest speakers at our own campus!", q3:"Start time was 20 min late.", ts:5},
    {email:"ananya@scet.ac.in",   q1:5, q2:"Excellent speakers on responsible AI.", q3:"Should have been 2 days!", ts:6},
    {email:"kai@scet.ac.in",      q1:4, q2:"Great diversity of speakers.", q3:"Venue was a bit cold.", ts:7},
    {email:"nitin@scet.ac.in",    q1:5, q2:"Very relevant topic in today's world.", q3:"Live streaming quality could improve.", ts:8},
    {email:"sneha@scet.ac.in",    q1:4, q2:"Insightful panel discussions.", q3:"Need bigger venue next year.", ts:9},
    {email:"divya@scet.ac.in",    q1:5, q2:"Brilliant symposium on the future of AI.", q3:"More student presentations would enrich it.", ts:10},
    ..._ffb("ai26",400,10),
  ],
  "e4": [
    {email:"vikram@scet.ac.in",   q1:5, q2:"Hands-on component kit was excellent.", q3:"Need more kits for solo participants.", ts:1},
    {email:"rohan@scet.ac.in",    q1:5, q2:"Built my first autonomous robot — incredible!", q3:"Safety briefing was too long.", ts:2},
    {email:"priya@scet.ac.in",    q1:5, q2:"Mr. Vikram Iyer robotics workshop was world class.", q3:"More time for testing phase needed.", ts:3},
    {email:"marcus@scet.ac.in",   q1:4, q2:"Very practical and well-structured workshop.", q3:"Could add more advanced sessions.", ts:4},
    {email:"kai@scet.ac.in",      q1:5, q2:"Amazing experience building from scratch.", q3:"Lab space felt a bit cramped.", ts:5},
    {email:"ananya@scet.ac.in",   q1:5, q2:"Perfect blend of theory and practice!", q3:"More team-building activities.", ts:6},
    {email:"sofia@scet.ac.in",    q1:4, q2:"Great coordination by the team.", q3:"Better lighting in the lab area.", ts:7},
    {email:"sneha@scet.ac.in",    q1:4, q2:"Good introduction to robotics.", q3:"More components variety needed.", ts:8},
    {email:"divya@scet.ac.in",    q1:5, q2:"Superb workshop — truly hands-on learning.", q3:"Would love a 2-day version.", ts:9},
    {email:"nitin@scet.ac.in",    q1:4, q2:"Very engaging robotics challenges.", q3:"More beginner guidance needed.", ts:10},
    ..._ffb("rb26",28,5),
  ],
  "e6": [
    {email:"divya@scet.ac.in",    q1:5, q2:"Best bootcamp format I have seen at SCET!", q3:"Add more advanced ML topics next time.", ts:1},
    {email:"rohan@scet.ac.in",    q1:5, q2:"Covered so much practical content in a single day.", q3:"Certificate ceremony was a bit rushed.", ts:2},
    {email:"priya@scet.ac.in",    q1:4, q2:"Pandas and Scikit-learn workshop was super practical.", q3:"Case study needed more time.", ts:3},
    {email:"marcus@scet.ac.in",   q1:4, q2:"Great introduction to ML pipelines from scratch.", q3:"Wi-Fi was slow during the live demo.", ts:4},
    {email:"kai@scet.ac.in",      q1:5, q2:"Data visualisation workshop was a highlight.", q3:"Start slightly earlier to fit more content.", ts:5},
    {email:"ananya@scet.ac.in",   q1:5, q2:"Very well structured and easy to follow.", q3:"More Kaggle-style challenges please.", ts:6},
    {email:"sofia@scet.ac.in",    q1:4, q2:"Good balance of theory and coding.", q3:"Lunch break was too short.", ts:7},
    {email:"aditya@scet.ac.in",   q1:5, q2:"Finally understood neural networks!", q3:"Provide reading materials beforehand.", ts:8},
    {email:"nitin@scet.ac.in",    q1:5, q2:"Excellent hands-on ML bootcamp.", q3:"More real-world datasets would help.", ts:9},
    ..._ffb("ds26",38,5),
  ],
  "e7": [
    {email:"arjun@scet.ac.in",    q1:5, q2:"Fantastic hands-on PCB design experience.", q3:"More soldering stations needed.", ts:1},
    {email:"rohan@scet.ac.in",    q1:4, q2:"Great competition format.", q3:"Award criteria should be clearer.", ts:2},
    {email:"divya@scet.ac.in",    q1:5, q2:"Well organised event by our EC department!", q3:"Need more oscilloscopes.", ts:3},
    {email:"priya@scet.ac.in",    q1:5, q2:"Learned so much about analog circuits.", q3:"Need power backup for lab equipment.", ts:4},
    {email:"sofia@scet.ac.in",    q1:4, q2:"Interesting design challenges.", q3:"More time for testing phase.", ts:5},
    {email:"kai@scet.ac.in",      q1:5, q2:"PCB layout challenge was superb.", q3:"More team challenges next edition.", ts:6},
    {email:"sneha@scet.ac.in",    q1:4, q2:"Very well run technical event.", q3:"More digital circuit challenges needed.", ts:7},
    ..._ffb("ec26",48,5),
  ],
  "e8": [
    {email:"arjun@scet.ac.in",    q1:5, q2:"Problem quality was outstanding.", q3:"Need faster judge turnaround.", ts:1},
    {email:"divya@scet.ac.in",    q1:5, q2:"Really tough but rewarding problems.", q3:"Internet connection dropped twice.", ts:2},
    {email:"kai@scet.ac.in",      q1:4, q2:"Best competitive programming event at SCET!", q3:"Add beginner track next year.", ts:3},
    {email:"vikram@scet.ac.in",   q1:4, q2:"Great exposure to algorithmic thinking.", q3:"More editorial explanations after event.", ts:4},
    {email:"nitin@scet.ac.in",    q1:5, q2:"Amazingly well organised coding marathon!", q3:"Better queue management for help desk.", ts:5},
    {email:"pooja@scet.ac.in",    q1:5, q2:"Very challenging and fun problems!", q3:"More beginner-friendly problems needed.", ts:6},
    {email:"priya@scet.ac.in",    q1:4, q2:"Excellent problem difficulty progression.", q3:"More hints for harder problems.", ts:7},
    {email:"aditya@scet.ac.in",   q1:5, q2:"Loved the competitive coding atmosphere.", q3:"Prize distribution took too long.", ts:8},
    ..._ffb("cs26",80,5),
  ],
  "e9": [
    {email:"arjun@scet.ac.in",    q1:5, q2:"Excellent challenge design — truly tests engineering skills!", q3:"Workshop could start slightly earlier.", ts:1},
    {email:"divya@scet.ac.in",    q1:4, q2:"Interesting mechanical design approach.", q3:"More guidance sessions before event.", ts:2},
    {email:"marcus@scet.ac.in",   q1:5, q2:"Best MECH event I have participated in.", q3:"More team collaboration tools needed.", ts:3},
    {email:"priya@scet.ac.in",    q1:4, q2:"Great real-world engineering problem.", q3:"Need more fabrication tools.", ts:4},
    {email:"kai@scet.ac.in",      q1:5, q2:"Superb mechanical engineering challenge!", q3:"Better safety equipment needed.", ts:5},
    ..._ffb("me26",37,5),
  ],
  "e11": [
    {email:"rohan@scet.ac.in",    q1:5, q2:"Fantastic event for chem students!", q3:"More reagent kits available.", ts:1},
    {email:"sofia@scet.ac.in",    q1:4, q2:"Loved the sustainable chemistry projects.", q3:"Judging time should be longer.", ts:2},
    {email:"ananya@scet.ac.in",   q1:5, q2:"Very inspiring research presentations.", q3:"Need more display space.", ts:3},
    {email:"marcus@scet.ac.in",   q1:4, q2:"Great opportunity to showcase research.", q3:"More mentor interactions needed.", ts:4},
    {email:"priya@scet.ac.in",    q1:5, q2:"Amazing chemistry innovations by students!", q3:"Better ventilation in the lab.", ts:5},
    ..._ffb("ch26",44,5),
  ],
  "e12": [
    {email:"arjun@scet.ac.in",    q1:5, q2:"World-class speakers on sustainable construction!", q3:"More interactive Q&A time.", ts:1},
    {email:"divya@scet.ac.in",    q1:4, q2:"Excellent student presentations.", q3:"Should have parallel sessions.", ts:2},
    {email:"rohan@scet.ac.in",    q1:5, q2:"Very relevant topics for future engineers.", q3:"More site visit opportunities.", ts:3},
    {email:"marcus@scet.ac.in",   q1:4, q2:"Good industry-academia interaction.", q3:"Audio quality could be better.", ts:4},
    {email:"priya@scet.ac.in",    q1:5, q2:"Inspiring civil engineering innovations.", q3:"Need more diverse panelists.", ts:5},
    {email:"kai@scet.ac.in",      q1:5, q2:"Brilliant symposium on smart cities!", q3:"More student talks next time.", ts:6},
    {email:"aditya@scet.ac.in",   q1:4, q2:"Great exposure to infrastructure challenges.", q3:"More hands-on demonstrations.", ts:7},
    ..._ffb("cv26",128,5),
  ],
  "e13": [
    {email:"divya@scet.ac.in",    q1:5, q2:"Best sports event in SCET history! Perfect organisation.", q3:"Better changing rooms needed.", ts:1},
    {email:"rohan@scet.ac.in",    q1:5, q2:"Amazing inter-college competition format.", q3:"More events for individual sports.", ts:2},
    {email:"priya@scet.ac.in",    q1:5, q2:"Fantastic event management!", q3:"More live commentary.", ts:3},
    {email:"marcus@scet.ac.in",   q1:4, q2:"Great team spirit and competition.", q3:"Snack stalls needed near main ground.", ts:4},
    {email:"kai@scet.ac.in",      q1:5, q2:"Best cricket tournament I played!", q3:"More practice sessions before event.", ts:5},
    {email:"sneha@scet.ac.in",    q1:4, q2:"Well-coordinated multi-sport event.", q3:"Need proper scoreboard display.", ts:6},
    {email:"aditya@scet.ac.in",   q1:5, q2:"Loved the energy and competitive spirit!", q3:"Better seating for spectators.", ts:7},
    {email:"nitin@scet.ac.in",    q1:4, q2:"Great inter-college spirit on display.", q3:"More water stations on the ground.", ts:8},
    ..._ffb("sp26",210,5),
  ],
  // Participant ↔ Organiser chats (key = porgchat_evId_participantEmail)
  "porgchat_e5_priya@scet.ac.in": [
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi! I am Divya Sharma, organiser of Startup Pitch Night. Feel free to ask any questions about the event.", time:"9:00 AM", ts:1},
    {from:"priya@scet.ac.in",  name:"Priya Nair",    av:"PN", text:"Hi Divya! Quick question — do we need to bring a printed copy of the pitch deck or just a laptop?", time:"9:05 AM", ts:2},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi Priya! Just a laptop is fine. We have HDMI adapters at the venue. Make sure your slides are in PDF format as backup.", time:"9:10 AM", ts:3},
    {from:"priya@scet.ac.in",  name:"Priya Nair",    av:"PN", text:"Perfect, thanks! Also — is the pitch time limit 5 minutes or 7 minutes?", time:"9:12 AM", ts:4},
  ],
  "porgchat_e5_kai@scet.ac.in": [
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi! I am Divya Sharma, organiser of Startup Pitch Night. Feel free to ask any questions about the event.", time:"11:00 AM", ts:1},
    {from:"kai@scet.ac.in",    name:"Karan Iyer",    av:"KI", text:"Hey Divya! Is there a registration fee refund if I cancel? I registered last week.", time:"11:15 AM", ts:2},
  ],
  "porgchat_e1_rohan@scet.ac.in": [
    {from:"arjun@scet.ac.in",  name:"Arjun Mehta",   av:"AM", text:"Hi Rohan! I am Arjun Mehta, one of the HackSCET organisers. Feel free to ask anything about the event.", time:"8:00 AM", ts:1},
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP", text:"Hey Arjun! As a co-org can I still attend HackSCET as a regular participant or only as organiser?", time:"8:20 AM", ts:2},
    {from:"arjun@scet.ac.in",  name:"Arjun Mehta",   av:"AM", text:"Great question! As a co-organiser you are part of the committee but cannot register as a participant for the same event.", time:"8:25 AM", ts:3},
  ],
  "porgchat_e8_divya@scet.ac.in": [
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP", text:"Hi Divya! I am Rohan, organiser of CodeSprint Marathon. Feel free to ask any questions.", time:"7:00 AM", ts:1},
    {from:"divya@scet.ac.in",  name:"Divya Sharma",  av:"DS", text:"Hi Rohan! What programming languages are allowed? And are team submissions accepted?", time:"7:30 AM", ts:2},
    {from:"rohan@scet.ac.in",  name:"Rohan Patel",   av:"RP", text:"All major languages are allowed — C++, Java, Python, Go. Solo submissions only for this edition!", time:"7:35 AM", ts:3},
  ],
};

/* ──────────────────────────────────────────────────────
   ATTENDANCE: { eventId: [email,...] }  (QR scanned = attended)
   student@scet.ac.in attended e1 but NOT e2 (for demo contrast)
────────────────────────────────────────────────────── */
// organizer@scet.ac.in attended e1 (HackSCET ✅) but NOT e2 (demo contrast for certificate feature)
const ATTENDANCE = {
  // Past approved events - attendance = ~90% of registrations
  "e1":  ["sneha@scet.ac.in","divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","sofia@scet.ac.in","ananya@scet.ac.in","kai@scet.ac.in","nitin@scet.ac.in","vikram@scet.ac.in","pooja@scet.ac.in","aditya@scet.ac.in",..._fe("hs26",162)],
  "e2":  ["aditya@scet.ac.in","rohan@scet.ac.in","divya@scet.ac.in","priya@scet.ac.in","sofia@scet.ac.in","kai@scet.ac.in","marcus@scet.ac.in","nitin@scet.ac.in","sneha@scet.ac.in",..._fe("ai26",428)],
  "e4":  ["vikram@scet.ac.in","divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","kai@scet.ac.in","ananya@scet.ac.in","sofia@scet.ac.in","nitin@scet.ac.in",..._fe("rb26",34)],
  "e5":  [],
  "e6":  ["divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","kai@scet.ac.in","ananya@scet.ac.in","sofia@scet.ac.in","nitin@scet.ac.in","aditya@scet.ac.in",..._fe("ds26",43)],
  "e7":  ["arjun@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","sofia@scet.ac.in","kai@scet.ac.in","sneha@scet.ac.in",..._fe("ec26",56)],
  "e8":  ["arjun@scet.ac.in","divya@scet.ac.in","kai@scet.ac.in","vikram@scet.ac.in","nitin@scet.ac.in","priya@scet.ac.in","aditya@scet.ac.in",..._fe("cs26",88)],
  "e9":  ["arjun@scet.ac.in","divya@scet.ac.in","marcus@scet.ac.in","priya@scet.ac.in","kai@scet.ac.in",..._fe("me26",44)],
  "e11": ["rohan@scet.ac.in","sofia@scet.ac.in","ananya@scet.ac.in","marcus@scet.ac.in","priya@scet.ac.in",..._fe("ch26",50)],
  "e12": ["arjun@scet.ac.in","divya@scet.ac.in","rohan@scet.ac.in","marcus@scet.ac.in","priya@scet.ac.in","kai@scet.ac.in","aditya@scet.ac.in",..._fe("cv26",148)],
  "e13": ["divya@scet.ac.in","rohan@scet.ac.in","priya@scet.ac.in","marcus@scet.ac.in","kai@scet.ac.in","sneha@scet.ac.in","aditya@scet.ac.in","nitin@scet.ac.in",..._fe("sp26",224)],
};

// Initialize global store ONCE — called at page load, not on login
