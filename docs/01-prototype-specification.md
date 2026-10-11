# ADC Zamfara Governorship Digital Information Platform
## Deliverable: First Prototype Specification (Homepage + Policy Centre + Admin Dashboard)

| Field | Value |
|---|---|
| Deliverable | First clickable prototype — 3 polished screens with core navigation |
| Prepared for | Manab Tech (implementation partner) |
| Branding | **Provisional** — neutral campaign identity until candidate authorisation |
| Domain | **Deferred** — to be decided after approval; prototype uses relative URLs only |
| Stack (prototype) | HTML5, CSS3, vanilla JavaScript — no backend, no database |
| Stack (production, later) | Raw PHP 8.x + MySQL/MariaDB via PDO, per Document 4 |
| Content status | All content is **illustrative sample data**, clearly labelled on every screen |

---

## 1. Scope of this prototype

**In scope**
- Screen A — Public Homepage (`prototype/index.html`)
- Screen B — Policy Centre with working search + category filters (`prototype/policy-centre.html`) and a policy full-detail template (`prototype/policy.html`)
- Screen C — Admin Dashboard, demonstration only (`prototype/admin.html`)
- Core navigation between all three screens
- Provisional design system (tokens, components, spacing, colour, typography)
- Sample content pack, labelled "Illustrative" throughout

**Explicitly out of scope for this prototype**
- Login, sessions, authentication, MFA
- Database persistence, publishing workflow, permissions enforcement
- Real candidate identity, portrait, biography, quotes, dates, venues, costs, endorsements
- Voter profiling, political-preference inference, purchased lists, automated persuasion (out of scope for the whole product)

**Hard content rules (enforced in the prototype)**
1. The prototype must not invent candidate promises, costs, endorsements, or official policy positions.
2. Every sample record carries a visible label: *"Illustrative proposal · Sample data, not an approved policy"* or equivalent.
3. Admin controls simulate interface state only — they never publish or save anything.
4. The approved candidate's identity is used only after written authorisation.

---

## 2. Provisional branding

| Token | Value | Use |
|---|---|---|
| `--green-900` | `#163A26` | Footer, dark surfaces |
| `--green-700` | `#1F5E3B` | Primary brand, nav bar, buttons |
| `--green-600` | `#2A7A4D` | Hover, links on light |
| `--sage-200` | `#CBD9C8` | Muted sage — borders, tints |
| `--sage-100` | `#EAF0E7` | Section backgrounds |
| `--charcoal` | `#26292B` | Body text |
| `--white` | `#FFFFFF` | Base surface |
| `--amber-badge` | `#8A6D1A` on `#FBF3D9` | "Awaiting review" status |
| Logo | Text wordmark "**ADC Zamfara** · Governorship Information Platform" in a rounded badge | Replace after brand approval |
| Typography | One sans-serif stack: `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif` | Headings 700, body 400 |

Design system rules (per Document 2): 12-column desktop grid, single-column mobile; ~1,200 px max content width; 4 px spacing scale; 8–12 px corner radii; visible focus states; status = text label + icon, never colour alone.

---

## 3. Screen A — Public Homepage (`index.html`)

**Audience:** Public · **Access:** Open

Layout order (top to bottom), exactly as agreed:

| # | Section | Contents | Notes |
|---|---|---|---|
| 0 | Prototype banner | "Prototype — provisional branding · all content illustrative" | Persistent on every public page |
| 1 | Navigation + logo | Wordmark badge; links: Home, Policy Centre, Updates, Sources, Contact; "Admin (demo)" link; mobile menu toggle | Sticky; keyboard accessible |
| 2 | Candidate introduction + portrait | Headline, one-paragraph intro (sample content pack §1), neutral portrait placeholder with alt text | No real name/photo until authorised |
| 3 | Biography + public-record link | Short biography preview placeholder + "View public record (placeholder)" link | Link marked as placeholder |
| 4 | Policy Centre preview | 4 cards: Education, Agriculture, Healthcare, Infrastructure → each links into the Policy Centre with that filter pre-applied | "Review proposals and sources" on each card |
| 5 | Latest published information | 3 demonstration announcement cards with date field "(sample date)", status label, source-link placeholder | Clearly labelled demonstration content |
| 6 | Upcoming public events | **Empty state**: "No confirmed events yet. Events appear here only after confirmation." | No fabricated dates or venues |
| 7 | Source library + public contact | Source list placeholder entries; contact block with placeholder address | |
| 8 | Footer | About · Sources · Contact · Privacy · Accessibility · Website information; provisional-branding note | |

**Acceptance criteria (Screen A)**
- [ ] Every navigation link resolves to a real target (page or in-page anchor); zero dead links.
- [ ] Fits common mobile screens (tested at 360 px width) with no horizontal scrolling.
- [ ] All images/graphics have appropriate `alt` text; decorative graphics use `alt=""` or `aria-hidden`.
- [ ] No unapproved material can appear styled as published content — every sample item carries an "Illustrative" label.
- [ ] Keyboard-only navigation reaches all links and the mobile menu; skip-to-content link present.

---

## 4. Screen B — Policy Centre (`policy-centre.html` + `policy.html`)

**Audience:** Public · **Access:** Open

### 4.1 Listing page
- Page header: "Policy Centre" + badge "Illustrative prototype data".
- Search input (filters by title/summary text, live).
- Category filter chips: **All · Education · Agriculture · Healthcare · Infrastructure** (single-select, `aria-pressed`, deep-linkable via `?category=`).
- Result cards (4 sample records, from `assets/js/data.js`):
  1. **Education access** — Education
  2. **Agricultural services** — Agriculture
  3. **Primary healthcare** — Healthcare
  4. **Public infrastructure** — Infrastructure
- Each card: title, category tag, one-line structural summary, label *"Illustrative proposal · Sample data, not an approved policy"*, link to detail page.
- Empty state when search + filter match nothing, with a "Clear filters" action.
- Footnote: "Interactive demonstration: search and category filters work on the sample records above. The production system will load approved records from the database."

**Interaction contract:** search and filters operate client-side on the sample array; combining search text and a category applies both (AND). State is reflected in the URL query string so filtered views can be shared during review.

### 4.2 Policy full-detail page (`policy.html?id=…`)
Each detail page renders these sections, in order:
1. Policy title, category, publication date (sample), current status badge ("Demonstration record").
2. The issue being addressed, with supporting-source placeholders.
3. The proposed intervention and intended scope — shown as "To be supplied and approved by the candidate."
4. Implementation assumptions, estimated costs, funding approach — "Pending documented assessment."
5. Suggested indicators for measuring progress — "To be defined after the proposal is specified."
6. Related public documents and source links (placeholders).
7. Revision history (sample entries labelled as such) and a contact route for corrections.

**Acceptance criteria (Screen B)**
- [ ] Search narrows results as the user types; filters work alone and combined with search.
- [ ] Each of the 4 records opens its own detail page with all 7 sections present.
- [ ] Unknown/missing `?id=` shows a graceful "Record not found" state, not a broken page.
- [ ] No sample record reads as a real commitment: status, label, and disclaimer visible on list *and* detail.
- [ ] Filter chips are buttons with visible focus and `aria-pressed`; list updates are announced via `aria-live`.

---

## 5. Screen C — Admin Dashboard (`admin.html`)

**Audience:** Authorised staff · **Access:** Restricted (demonstrated, not enforced in prototype)

- Persistent banner: **"Demonstration dashboard · Not connected to production data."**
- Header: "Campaign CMS" wordmark + simulated user chip ("Demo reviewer").
- Sidebar navigation (non-functional items marked "demo"): Overview · Pages and announcements · Policy proposals · Source documents · Events · Public enquiries · Users and roles · Audit logs · Settings.
- Summary cards (mock numbers for design review, not live records):
  - **12** Sample content records · **3** Sample items for review · **4** Sample policy records · **2** Sample event records
- **Content review queue** (3 rows):
  | Item | Status | Action |
  |---|---|---|
  | Sample education policy | Awaiting review | Simulate publish |
  | Sample public announcement | Draft | Simulate publish |
  | Sample source document | Awaiting review | Simulate publish |
  "Simulate publish" flips the row's status badge to "Published (simulated)", disables the button, decrements the review counter, and appends an entry to the activity feed. A note under the queue states the controls simulate UI state only — nothing is published or saved; a "Reset demonstration" link restores the initial state.
- **Recent administrative activity**: time-ordered sample feed; simulated actions are appended with the label "(simulated)".
- Shortcuts to permitted actions: "New draft (demo)", "Upload source (demo)", "View audit log (demo)".

**Acceptance criteria (Screen C)**
- [ ] Simulate-publish updates badge, counter, and activity feed without any network request or storage write.
- [ ] Refreshing the page fully resets the demonstration state.
- [ ] Status badges use text + icon, never colour alone.
- [ ] Sidebar collapses to a toggleable drawer on mobile.
- [ ] Banner "Not connected to production data" is always visible above the fold.

What this screen deliberately does **not** do (development phase): real login, database persistence, permission enforcement, publishing workflow, audit logging.

---

## 6. Core navigation map

```
index.html ──(nav / policy cards)──▶ policy-centre.html ──(card)──▶ policy.html?id=…
    ▲  ▲                                      │                          │
    │  └────────────(logo / nav)──────────────┴───────(breadcrumb)───────┘
    └──(footer links: anchors on index)
index.html ──("Admin (demo)")──▶ admin.html ──("View public site")──▶ index.html
```

---

## 7. File map (what Manab Tech receives)

```
prototype/
  index.html            Screen A — public homepage
  policy-centre.html    Screen B — listing, search, filters
  policy.html           Screen B — full-detail template (reads ?id=)
  admin.html            Screen C — demonstration dashboard
  assets/css/styles.css Design tokens + all components
  assets/js/data.js     Sample policy/announcement records (illustrative)
  assets/js/public.js   Nav toggle, search, filters, detail rendering
  assets/js/admin.js    Dashboard simulation logic
docs/
  01-prototype-specification.md   This document
  02-sample-content-pack.md       Approved illustrative copy
  03-implementation-checklist.md  Build, QA, and handover checklist
```

Runs from any static file server (or `php -S`, or cPanel docroot). No build step, no dependencies.

---

## 8. Reusable components implemented in the prototype

`Button`, `TextInput`, `Select` (chips serve the filter role), `StatusBadge`, `PolicyCard`, `SourceLink`, `DataTable`, `EmptyState`, `AlertMessage` — all as CSS classes in `styles.css` so the production build (PHP-rendered Blade-free templates) can reuse the same markup. `ConfirmDialog` and `Pagination` are specified for the development phase (not needed for 4 records).

---

## 9. Sign-off checklist for this deliverable

- [ ] Client reviews the three screens on desktop and a phone.
- [ ] Client confirms layout order of the homepage (section 3 table).
- [ ] Client confirms the policy detail structure (section 4.2 list).
- [ ] Client confirms admin navigation labels (section 5).
- [ ] Branding review scheduled; provisional palette accepted for prototype phase only.
- [ ] Domain shortlist prepared — decision deferred until after approval, as agreed.
- [ ] Written authorisation obtained **before** any real candidate name, portrait, biography, or position is added.
