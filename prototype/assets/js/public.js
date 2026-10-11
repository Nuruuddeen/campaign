/* Public pages: nav toggle, Policy Centre search/filter, policy detail render.
   Prototype only — no network requests, no storage writes. */
(function () {
  "use strict";

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var DATA = window.PROTO_DATA || { policies: [], categories: ["All"] };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Policy Centre: search + category filters ---------- */
  var listEl = document.getElementById("policy-list");
  if (listEl) {
    var searchEl = document.getElementById("policy-search");
    var chipsEl = document.getElementById("category-chips");
    var countEl = document.getElementById("result-count");
    var params = new URLSearchParams(window.location.search);
    var state = {
      category: params.get("category") || "All",
      query: params.get("q") || ""
    };
    if (DATA.categories.indexOf(state.category) === -1) state.category = "All";
    searchEl.value = state.query;

    // Build chips
    DATA.categories.forEach(function (cat) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = cat;
      b.setAttribute("aria-pressed", cat === state.category ? "true" : "false");
      b.addEventListener("click", function () {
        state.category = cat;
        chipsEl.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", c.textContent === cat ? "true" : "false");
        });
        render();
      });
      chipsEl.appendChild(b);
    });

    searchEl.addEventListener("input", function () {
      state.query = searchEl.value;
      render();
    });

    document.addEventListener("click", function (e) {
      if (e.target && e.target.id === "clear-filters") {
        state.query = "";
        state.category = "All";
        searchEl.value = "";
        chipsEl.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", c.textContent === "All" ? "true" : "false");
        });
        render();
      }
    });

    function syncUrl() {
      var p = new URLSearchParams();
      if (state.query) p.set("q", state.query);
      if (state.category !== "All") p.set("category", state.category);
      var qs = p.toString();
      window.history.replaceState(null, "", qs ? "?" + qs : window.location.pathname);
    }

    function render() {
      syncUrl();
      var q = state.query.trim().toLowerCase();
      var results = DATA.policies.filter(function (pol) {
        var matchCat = state.category === "All" || pol.category === state.category;
        var matchQ =
          !q ||
          pol.title.toLowerCase().indexOf(q) !== -1 ||
          pol.summary.toLowerCase().indexOf(q) !== -1 ||
          pol.category.toLowerCase().indexOf(q) !== -1;
        return matchCat && matchQ;
      });

      countEl.textContent =
        results.length + " sample record" + (results.length === 1 ? "" : "s") + " shown";

      if (!results.length) {
        listEl.innerHTML =
          '<div class="empty-state"><strong>No sample records match your search.</strong>' +
          "Try a different term or category. " +
          '<button type="button" class="btn btn-secondary btn-small" id="clear-filters">Clear filters</button></div>';
        return;
      }

      listEl.innerHTML = results
        .map(function (pol) {
          return (
            '<article class="card">' +
            '<span class="tag">' + escapeHtml(pol.category) + "</span>" +
            '<h3 style="margin-top:8px;"><a href="policy.html?id=' + encodeURIComponent(pol.id) + '">' +
            escapeHtml(pol.title) + "</a></h3>" +
            "<p>" + escapeHtml(pol.summary) + "</p>" +
            '<p class="illustrative-note">Illustrative proposal &middot; Sample data, not an approved policy</p>' +
            "</article>"
          );
        })
        .join("");
    }

    render();
  }

  /* ---------- Policy detail page ---------- */
  var detailEl = document.getElementById("policy-detail");
  if (detailEl) {
    var id = new URLSearchParams(window.location.search).get("id");
    var pol = DATA.policies.filter(function (p) { return p.id === id; })[0];

    if (!pol) {
      detailEl.innerHTML =
        '<div class="empty-state" style="margin:48px 0;"><strong>Record not found.</strong>' +
        'This sample record does not exist in the prototype data set. ' +
        '<a href="policy-centre.html">Return to the Policy Centre</a>.</div>';
    } else {
      document.title = pol.title + " — Policy Centre (Prototype)";
      detailEl.innerHTML =
        '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a> &rsaquo; ' +
        '<a href="policy-centre.html">Policy Centre</a> &rsaquo; <span>' + escapeHtml(pol.title) + "</span></nav>" +
        "<h1 style='margin-top:16px;'>" + escapeHtml(pol.title) + "</h1>" +
        '<div class="detail-meta">' +
        '<span class="tag">' + escapeHtml(pol.category) + "</span>" +
        '<span class="badge badge--demo">&#9888; Demonstration record</span>' +
        '<span class="muted small">Publication date: ' + escapeHtml(pol.publicationDate) + "</span>" +
        "</div>" +
        '<p class="alert" role="note">Illustrative proposal &middot; Sample data, not an approved policy. ' +
        "This record is a structural placeholder only. The prototype does not present candidate promises, costs, endorsements, or official positions.</p>" +

        '<section class="detail-section"><h2>1. The issue being addressed</h2><p>' + escapeHtml(pol.issue) + "</p>" +
        '<ul class="source-list"><li><span class="muted">Supporting source placeholder — official report reference to be attached after approval.</span></li></ul></section>' +

        '<section class="detail-section"><h2>2. Proposed intervention and intended scope</h2><p class="muted">' +
        escapeHtml(pol.proposedAction) + "</p></section>" +

        '<section class="detail-section"><h2>3. Implementation assumptions, estimated costs and funding approach</h2>' +
        '<dl class="kv"><dt>Evidence</dt><dd>' + escapeHtml(pol.evidence) + "</dd>" +
        "<dt>Cost and funding</dt><dd>" + escapeHtml(pol.costFunding) + "</dd></dl></section>" +

        '<section class="detail-section"><h2>4. Suggested indicators for measuring progress</h2><p class="muted">' +
        escapeHtml(pol.indicators) + "</p></section>" +

        '<section class="detail-section"><h2>5. Related public documents and source links</h2>' +
        '<ul class="source-list">' +
        '<li><span class="muted">Document placeholder — related public document will be linked here.</span></li>' +
        '<li><span class="muted">Source placeholder — source library entry will be linked here.</span></li>' +
        "</ul></section>" +

        '<section class="detail-section"><h2>6. Revision history</h2>' +
        '<table class="datatable"><thead><tr><th scope="col">Revision</th><th scope="col">Date</th><th scope="col">Note</th></tr></thead>' +
        "<tbody><tr><td>Sample revision 1</td><td>(sample date)</td><td>Demonstration entry — revision history will be recorded by the production system.</td></tr></tbody></table></section>" +

        '<section class="detail-section"><h2>7. Corrections</h2>' +
        '<p>Spotted an error? The production site will provide a contact route for corrections here. ' +
        '<a href="index.html#contact">Contact placeholder</a>.</p>' +
        "<dl class='kv'><dt>Status</dt><dd>" + escapeHtml(pol.status) + "</dd></dl></section>";
    }
  }
})();
