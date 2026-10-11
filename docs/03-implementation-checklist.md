# Implementation Checklist — Manab Tech

Phase covered: **First prototype** (this deliverable) plus the bridge into the
development phase. Production stack per Document 4: Raw PHP 8.x, MySQL/MariaDB via PDO,
HTML5/CSS3/vanilla JS, deployed on cPanel or a VPS with HTTPS.

---

## A. Prototype build (this deliverable)

- [x] Static scaffold: `index.html`, `policy-centre.html`, `policy.html`, `admin.html`.
- [x] Shared stylesheet with provisional design tokens (forest green / white / charcoal / muted sage), 4 px spacing scale, 8–12 px radii, 1,200 px max width, 12-col desktop grid → single column mobile.
- [x] Components: Button, TextInput, StatusBadge, PolicyCard, SourceLink, DataTable, EmptyState, AlertMessage, filter chips.
- [x] Homepage sections in the agreed order (nav → intro/portrait → biography → policy preview → latest publications → events empty state → sources/contact → footer).
- [x] Policy Centre: live search + category chips (AND-combined), URL-reflected state, empty state with clear-filters action.
- [x] Policy detail template with all 7 agreed sections, graceful "record not found" state.
- [x] Admin dashboard: banner, summary cards, review queue with simulate-publish (UI-state only), activity feed, sidebar nav, reset link.
- [x] All sample content labelled illustrative per `02-sample-content-pack.md`.
- [x] No external dependencies, fonts, or trackers; runs from any static docroot.

## B. Prototype QA (run before client review)

- [ ] Click every nav/footer/card link on all four pages — zero dead links.
- [ ] Test at 360 px, 768 px, 1280 px widths — no horizontal scroll, readable tap targets.
- [ ] Keyboard-only pass: skip link, menu toggle, chips, simulate buttons, focus always visible.
- [ ] Screen-reader spot-check: landmarks, headings order, `alt` text, `aria-pressed` on chips, `aria-live` on result counts and activity feed.
- [ ] Contrast check all token pairs (target WCAG AA).
- [ ] Confirm refresh resets all admin simulation state; confirm no network/storage writes occur (DevTools).
- [ ] Verify every sample item displays its "Illustrative" label.
- [ ] Lighthouse: accessibility ≥ 95 on all pages.

## C. Client review and sign-off

- [ ] Walkthrough of the three screens (desktop + mobile).
- [ ] Record change requests against section numbers in `01-prototype-specification.md`.
- [ ] Obtain sign-off on: homepage order, policy detail structure, admin nav labels, provisional palette.
- [ ] Domain: present shortlist; register only after approval.
- [ ] Branding: schedule identity review; real identity only after written authorisation.

## D. Development-phase kickoff (after sign-off — not part of this prototype)

- [ ] Repo structure for raw PHP 8.x app: `/public` docroot, controllers, services, templates; secrets in environment config outside docroot.
- [ ] MySQL schema + migrations: users, roles, permissions, policies, policy_revisions, pages, announcements, documents, events, enquiries, audit_log.
- [ ] PDO with prepared statements everywhere; no string-built SQL.
- [ ] Authentication: password hashing (`password_hash`), rate-limited login with generic errors, session hardening (HttpOnly, Secure, SameSite), MFA for admins.
- [ ] Authorisation: server-side RBAC checks on every admin action (hiding menu items is not a control); editors cannot approve their own content.
- [ ] Publication workflow: draft → review → approve → publish; every transition writes user + timestamp + action to the audit log; published edits create revisions; rejected/withdrawn content never reachable via unprotected URL.
- [ ] Public endpoints return only `published` records — enforced in queries, verified by tests.
- [ ] CSRF tokens on all state-changing forms; output escaping by default; upload validation + private storage for admin documents.
- [ ] Enquiry form: minimum data, privacy notice, documented retention; never require political preference or other unnecessary sensitive data.
- [ ] Backups scheduled and a restoration drill completed before launch.
- [ ] HTTPS enforced; security headers (CSP, HSTS, X-Content-Type-Options, frame-ancestors).
- [ ] Logging/monitoring for auth failures and privileged changes.
- [ ] Reuse prototype markup/CSS as the template layer so design review carries over 1:1.

## E. Definition of done (prototype deliverable)

All boxes in sections A and B checked, section C sign-off minuted, and the prototype
tagged in the repository as the design-review baseline.
