/* Admin Dashboard — DEMONSTRATION ONLY.
   The controls below simulate a user interface state only. They do not
   publish website content, make network requests, or save anything to a
   database or browser storage. Refreshing the page resets everything. */
(function () {
  "use strict";

  /* Sidebar toggle (mobile) */
  var sbToggle = document.querySelector(".admin-sidebar-toggle");
  var sidebar = document.querySelector(".admin-sidebar");
  if (sbToggle && sidebar) {
    sbToggle.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      sbToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var reviewCounter = document.getElementById("stat-review");
  var feed = document.getElementById("activity-feed");
  var queue = document.getElementById("review-queue");
  if (!queue) return;

  function addActivity(text) {
    var li = document.createElement("li");
    var t = document.createElement("time");
    t.textContent = "Just now";
    var span = document.createElement("span");
    span.textContent = text + " (simulated)";
    li.appendChild(t);
    li.appendChild(span);
    feed.insertBefore(li, feed.firstChild);
  }

  queue.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-item]");
    if (!btn || btn.disabled) return;

    var row = btn.closest("tr");
    var badge = row.querySelector(".badge");
    var wasAwaitingReview = badge.classList.contains("badge--review");

    badge.className = "badge badge--published";
    badge.innerHTML = "&#10003; Published (simulated)";
    btn.disabled = true;
    btn.textContent = "Simulated";

    if (wasAwaitingReview && reviewCounter) {
      var n = parseInt(reviewCounter.textContent, 10);
      if (!isNaN(n) && n > 0) reviewCounter.textContent = String(n - 1);
    }

    addActivity('"' + btn.getAttribute("data-item") + '" marked as published by Demo reviewer');

    var note = document.getElementById("sim-note");
    if (note) note.hidden = false;
  });

  var reset = document.getElementById("reset-demo");
  if (reset) {
    reset.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.reload();
    });
  }
})();
