# Planexa — Create. Host. Explore.

> **A fully-featured, single-file campus event management platform built entirely with vanilla HTML, CSS, and JavaScript. No frameworks. No server. No setup. Just open and run.**

---

## What is Planexa?

Planexa is a browser-based event management system built for college campuses. It covers the complete lifecycle of a campus event — from proposal and admin approval, to registration, attendance tracking, team coordination, payments, feedback, and e-certificates — all inside a single HTML file that works offline.

---

## Live Demo

Open `planexa.html` directly in any modern browser. No server, no installation, no build step required.

**Demo Accounts (click any tile on the login screen to sign in instantly):**

| Role | Name | Email | Password |
|---|---|---|---|
| 🏛️ Admin | Dr. Priya Nair | `admin@scet.ac.in` | `admin123` |
| 🏛️ Admin | Dr. Ramesh Kulkarni | `admin2@scet.ac.in` | `admin234` |
| 🎓 Organiser + Participant | Arjun Mehta | `arjun@scet.ac.in` | `arjun123` |
| 🎓 Organiser + Participant | Divya Sharma | `divya@scet.ac.in` | `divya123` |
| 🎓 Organiser + Participant | Rohan Patel | `rohan@scet.ac.in` | `rohan123` |

---

## Features by Role

### 🏛️ Admin
| Feature | Description |
|---|---|
| Dashboard | Stats cards, pending approvals, monthly event chart, category distribution |
| Event Management | Full table with search, status filter, approve/reject with notes |
| Venue Management | 6 campus venues with booking calendar and conflict detection |
| Analytics | Attendance vs Registration chart, registrations per event, category popularity (past events only) |
| Organiser Directory | All organisers with department, events by category, ratings; click for full profile |
| Feedback Analysis | Campus-wide ratings, per-event distribution, guest speaker ratings |
| To-Do List | Personal task checklist tied to upcoming events |
| Admin ↔ Organiser Chat | Real-time per-event messaging |
| Payments View | Per-event payment dashboard with charts |

### 🎓 Organiser (also a Participant for other events)
| Feature | Description |
|---|---|
| Dashboard | My events, pending status, admin responses, registrations chart |
| My Events | Search + filter; per-event action buttons |
| Create Event | Full form — co-organisers, guests, sponsors, schedule, pricing |
| Team & Work Status | Team member list with contact details, task checklist, group chat |
| Payment Dashboard | Participant payment table, mark online/cash, CSV export |
| Event Analytics | Registration trends, department breakdown, capacity gauge |
| Feedback | Star distribution, participant quotes, guest speaker ratings |
| Discover Events | Browse and register for all approved events they don't organise |
| My Registrations | Events they've joined as a participant (not their own) |

### 👤 Participant (Organiser accounts also have this)
| Feature | Description |
|---|---|
| Discover | Search by keyword, category, free/paid filter |
| My Registrations | Upcoming (with e-ticket + cancel), waitlisted, past (certificate + feedback) |
| e-Ticket | Real QR code generated per registration, downloadable |
| e-Certificate | Unique design per event category, real PNG download via html2canvas |
| Feedback | 5-star required, open text optional, guest speaker ratings |
| Calendar | Monthly calendar with event dots and notification preferences |
| Profile | Personal details, academic info, all tickets in one place |
| Participant ↔ Organiser Chat | 1-on-1 messaging with event organiser |

### Shared Features
- **Real QR codes** — generated via `qrcode.js`, unique per registration
- **Real certificate download** — `html2canvas` captures the certificate card as a PNG and saves to device
- **Live notifications** — per-user notification panel with dot indicators
- **Topbar global search** — searches events, participants, organiser profiles
- **Venue calendar** — 6-month grid showing all bookings per venue with conflict detection
- **Firebase optional** — all features work in demo mode; add your Firebase config to enable real-time cloud sync

---

## Project Structure

```
planexa/
│
├── planexa.html          # 🚀 The entire app — open this in a browser
│
├── data.js               # All seed data: users, events, registrations,
│                         # feedback, attendance, payments, teams, chats
│
├── core.js               # App bootstrap, routing, auth, QR generator,
│                         # Firebase sync, utility functions
│
├── style.css             # All CSS: tokens, layout, components, animations
│
├── views-admin.js        # Admin views: dashboard, events, venues,
│                         # analytics, organisers, todos, feedback
│
├── views-org.js          # Organiser views: dashboard, my events,
│                         # create event, analytics, feedback
│
├── views-shared.js       # Shared views: discover, my-registrations,
│                         # calendar, profile, event-detail, ev-analytics,
│                         # participant detail, venue detail
│
├── views-features.js     # Feature views: team & work status, payment
│                         # dashboard, venue calendar, chats, certificates,
│                         # ev-participants, organiser messages
│
├── actions.js            # All user actions: register, cancel, approve,
│                         # reject, send message, mark payment, toggle task
│
└── build.py              # 🔨 Rebuild script — combines all source files
                          # back into planexa.html after editing
```

**File sizes at a glance:**

| File | Size | Lines |
|---|---|---|
| `planexa.html` | 385 KB | 4,633 |
| `data.js` | 76 KB | 661 |
| `views-features.js` | 71 KB | 1,085 |
| `views-shared.js` | 67 KB | 953 |
| `views-org.js` | 23 KB | 309 |
| `views-admin.js` | 26 KB | 329 |
| `core.js` | 27 KB | 501 |
| `actions.js` | 19 KB | 343 |
| `style.css` | 20 KB | 293 |

---

## Getting Started

### Option A — Just use it (no setup needed)
```bash
# Download or clone the repo
git clone https://github.com/yourusername/planexa.git

# Open directly in browser — that's it!
open planexa.html
# or on Windows: start planexa.html
# or on Linux:   xdg-open planexa.html
```

### Option B — Edit source files and rebuild
```bash
# 1. Edit any source file (data.js, core.js, views-*.js, style.css)

# 2. Rebuild planexa.html from source
python3 build.py

# 3. Open the rebuilt file
open planexa.html
```

> **Requirements for rebuild:** Python 3.6+ only. No npm, no Node, no bundler needed.

---

## Architecture

### How the single-file build works

`planexa.html` is the compiled output of all source files, assembled by `build.py`:

```
data.js  +  core.js  +  views-*.js  +  actions.js  +  style.css
                         ↓  build.py  ↓
                      planexa.html  (single deployable file)
```

`build.py` reads each source file and injects them as inline `<script>` and `<style>` blocks into the HTML shell. The result is a fully self-contained file that works without any server.

### State management

All application state lives in plain JavaScript variables in `core.js`:

```js
let CU   = null;   // currently logged-in user
let EVTS = [];     // live event store (cloned from EVENTS_SEED on first load)
let REGS = {};     // registrations: { eventId: [email, ...] }
let WAIT = {};     // waitlists:     { eventId: [email, ...] }
```

`initState()` runs **once** at page load (guarded by `_storeReady`), cloning seed data into live stores. This means all changes persist across login/logout within the same browser session — switching accounts shares the same live state, which is intentional for demo purposes.

### View routing

Views are plain functions stored in a `VIEWS` object:

```js
VIEWS["adm-dash"] = (area, data) => {
  area.innerHTML = `...`;  // render HTML
  // attach event listeners
};
```

Navigation calls `go(viewId, push, data)` which looks up the view, calls it with the content area, and manages browser history. The topbar back button uses `window.history`.

### Role-based access

```
admin       →  adm-dash, adm-events, adm-venues, adm-analytics,
                adm-organizers, adm-todos, adm-feedback

organizer   →  org-dash, org-events, org-create, org-analytics,
                org-feedback, discover

participant →  discover, my-regs, calendar, profile

both        →  all organiser views + all participant views
               (my-regs excludes events they organise)
```

---

## Data Model

### Events (`EVENTS_SEED` → `EVTS`)

```js
{
  id: "e1",
  title: "HackSCET 2026",
  category: "Hackathon",           // Hackathon | Workshop | Symposium |
                                   // Cultural | Technical | Entrepreneurship | Sports
  status: "approved",              // pending | approved | rejected
  date: "2026-02-10",
  venue: "Main Block — Hall 1",
  capacity: 200,
  free: false,  price: 500,
  organizer: "Arjun Mehta",
  orgId: "arjun@scet.ac.in",
  organizers: ["arjun@scet.ac.in", "sneha@scet.ac.in"],  // co-organisers
  guests: ["Prof. Arvind Mehta", "Ms. Nandita Rao"],
  sponsors: ["TechForge India", "CloudSpark"],
  schedule: [{ t: "9:00 AM", a: "Opening Ceremony" }, ...],
  prizes: "₹50,000 Grand Prize",
  deadline: "2026-02-05",
}
```

### Campus Venues

| Venue ID | Name |
|---|---|
| v1 | SCET Auditorium |
| v2 | Main Block — Hall 1 |
| v3 | SCET Open Ground |
| v4 | Innovation Lab — Block B |
| v5 | Seminar Hall — Block C |
| v6 | SCET Sports Complex |

### All 30 Views

| Prefix | Views |
|---|---|
| `adm-` | dash, events, venues, analytics, organizers, todos, feedback, discover |
| `org-` | dash, events, create, analytics, feedback, messages |
| *(shared)* | discover, my-regs, calendar, profile |
| `ev-` | detail, participants, analytics, chat, feedback, feedback-analysis, team, payments |
| `p-` | detail, org-chat |
| *(misc)* | venue-detail, venue-calendar |

---

## External Dependencies

All loaded from CDN — no local installation needed:

| Library | Version | Purpose |
|---|---|---|
| [Chart.js](https://www.chartjs.org/) | 4.4.0 | All charts (bar, doughnut, line, polar area) |
| [QRCode.js](https://github.com/davidshimjs/qrcodejs) | 1.0.0 | Real QR code generation for e-tickets |
| [html2canvas](https://html2canvas.hertzen.com/) | 1.4.1 | Certificate PNG download |
| Google Fonts | — | Poppins (headings) + Inter (body) |
| Firebase SDK | 10.12.0 | *Optional* — real-time sync (disabled by default) |

---

## Optional: Firebase Real-Time Sync

By default, Planexa runs entirely in-memory. To enable real-time cloud sync across devices:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** and **Authentication** (Email/Password)
3. Copy your Firebase config object
4. In `planexa.html` (or `core.js`), replace:

```js
window.FIREBASE_CONFIG = null;
```

with:

```js
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abc"
};
```

5. Rebuild: `python3 build.py`

All state mutations (registrations, approvals, payments, chats) will automatically sync to Firestore.

---


| What you want to change | Edit this file |
|---|---|
| Add/edit events or users | `data.js` |
| Change login accounts or roles | `data.js` → `USERS` + `DEMO_TILES` |
| Change colours or fonts | `style.css` → `:root` CSS variables |
| Admin page UI | `views-admin.js` |
| Organiser page UI | `views-org.js` |
| Event detail, discover, profile | `views-shared.js` |
| Certificates, payments, team, chats | `views-features.js` |
| Register/approve/reject/message logic | `actions.js` |
| App boot, routing, QR, utilities | `core.js` |

---

## Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | ✅ Fully supported |
| Firefox 88+ | ✅ Fully supported |
| Safari 14+ | ✅ Fully supported |
| Edge 90+ | ✅ Fully supported |
| Mobile Chrome/Safari | ✅ Responsive layout |

> Certificate download via `html2canvas` works best in Chrome. Safari may prompt to print instead.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes in the appropriate source file
4. Rebuild: `python3 build.py`
5. Test by opening `planexa.html` in a browser
6. Commit both the source file **and** the rebuilt `planexa.html`
7. Open a pull request

### Commit conventions
```
feat: add payment export to Excel
fix: certificate download on Safari
data: add new event categories
style: update colour tokens
```

---

## Roadmap

- [ ] Dark mode toggle
- [ ] Firebase Authentication integration for production accounts
- [ ] Event image upload support
- [ ] Push notifications via Firebase Cloud Messaging
- [ ] Multi-college / multi-tenant support
- [ ] PDF certificate export
- [ ] Barcode scanner for physical attendance marking
- [ ] CSV import for bulk participant registration

---

## License

MIT License — free to use, modify, and distribute for personal, academic, and commercial projects.

---

## Credits

Built for SCET (Sarvajanik College of Engineering & Technology) as a student project.

**Tech stack:** Vanilla JS · HTML5 · CSS3 · Chart.js · QRCode.js · html2canvas · Firebase (optional)

---

*Planexa — Create. Host. Explore.*
