# ADC Zamfara Governorship Digital Information Platform

**Deliverable: First prototype** — Homepage + Policy Centre + Admin Dashboard.
Provisional branding only; domain to be decided after approval. All content is
illustrative sample data, clearly labelled on every screen.

## Contents

| Path | What it is |
|---|---|
| `docs/01-prototype-specification.md` | Concrete prototype specification, screen-by-screen layouts, acceptance criteria |
| `docs/02-sample-content-pack.md` | Illustrative content pack and labelling standard |
| `docs/03-implementation-checklist.md` | Build/QA/handover checklist for Manab Tech |
| `prototype/` | Working click-through prototype (HTML5 + CSS3 + vanilla JS, no backend) |

## Running the prototype

No build step or dependencies. Serve the `prototype/` folder with any static server:

```bash
cd prototype
python3 -m http.server 8000        # or: php -S 0.0.0.0:8000
```

Then open:

- `index.html` — Screen A, public homepage
- `policy-centre.html` — Screen B, with working search and category filters
- `policy.html?id=education-access` — policy full-detail template
- `admin.html` — Screen C, demonstration admin dashboard (simulated interactions only)

## Content rules

The prototype must not invent candidate promises, costs, endorsements, or official
policy positions. The approved candidate's identity is used only after written
authorisation. See `docs/02-sample-content-pack.md` for the labelling standard.
