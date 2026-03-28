(function () {
  const slug = document.body.dataset.usecase;
  const data = window.USECASE_DATA?.[slug];
  const palette = window.PALETTE || [];

  if (!data) {
    document.body.innerHTML = "<p>Use case not found.</p>";
    return;
  }

  const state = {
    placements: {},
    selectedIconId: null,
    mode: "guided",
    result: null
  };

  const el = {
    title: document.getElementById("title"),
    summary: document.getElementById("summary"),
    canvas: document.getElementById("canvas"),
    lines: document.getElementById("lines"),
    palette: document.getElementById("palette"),
    required: document.getElementById("required"),
    result: document.getElementById("result"),
    progress: document.getElementById("progress"),
    selectedText: document.getElementById("selectedText")
  };

  const iconById = Object.fromEntries(palette.map((p) => [p.id, p]));

  el.title.textContent = data.title;
  el.summary.textContent = "Use case: " + data.summary;

  function iconPath(filename) {
    return "./icons/" + filename;
  }

  function expectedLabel(slot) {
    const p = iconById[slot.expected];
    return p ? p.label : slot.expected;
  }

  function renderRequired() {
    const items = data.slots
      .map((slot) => `<li><strong>${slot.label}:</strong> ${expectedLabel(slot)}</li>`)
      .join("");
    el.required.innerHTML = `<h3>Required Icons (Correct Mapping)</h3><ul>${items}</ul>`;
  }

  function renderPalette() {
    el.palette.innerHTML = "";
    palette.forEach((p) => {
      const btn = document.createElement("button");
      btn.className = "palette-item" + (state.selectedIconId === p.id ? " selected" : "");
      btn.type = "button";
      btn.draggable = true;
      btn.innerHTML = `<img src="${iconPath(p.icon)}" alt="${p.label}"><span>${p.label}</span>`;
      btn.addEventListener("click", () => {
        state.selectedIconId = state.selectedIconId === p.id ? null : p.id;
        renderPalette();
        renderSelected();
      });
      btn.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", p.id);
      });
      el.palette.appendChild(btn);
    });
  }

  function renderSelected() {
    const selected = iconById[state.selectedIconId];
    el.selectedText.textContent = selected ? `Selected ${selected.label}` : "Pick a service then click a slot.";
  }

  function evaluate() {
    let score = 0;
    const missing = [];
    data.slots.forEach((slot) => {
      if (state.placements[slot.id] === slot.expected) score += 1;
      else missing.push(slot.label);
    });
    state.result = { score, total: data.slots.length, missing };
  }

  function renderResult() {
    const placed = Object.keys(state.placements).length;
    el.progress.textContent = `Progress: ${placed}/${data.slots.length} slots.`;

    if (!state.result) {
      el.result.textContent = "Build the architecture and click Check Solution.";
      return;
    }

    if (state.result.score === state.result.total) {
      el.result.textContent = "Perfect. Your architecture matches the expected design.";
      return;
    }

    el.result.textContent = `Score: ${state.result.score}/${state.result.total}. Missing or incorrect: ${state.result.missing.join(", ")}.`;
  }

  function renderZones() {
    data.zones.forEach((z) => {
      const zone = document.createElement("div");
      zone.className = `zone ${z.cls}`;
      zone.style.left = z.x + "%";
      zone.style.top = z.y + "%";
      zone.style.width = z.w + "%";
      zone.style.height = z.h + "%";
      if (state.mode !== "exam") {
        zone.innerHTML = `<label>${z.label}</label>`;
      }
      el.canvas.appendChild(zone);
    });
  }

  function linePath(from, to, i) {
    const x1 = (from.x / 100) * 1200;
    const y1 = (from.y / 100) * 700;
    const x2 = (to.x / 100) * 1200;
    const y2 = (to.y / 100) * 700;
    const control = y1 + (y2 - y1) * 0.5 + ((i % 4) - 1.5) * 18;
    return { d: `M ${x1} ${y1} C ${x1} ${control}, ${x2} ${control}, ${x2} ${y2}`, lx: (x1 + x2) / 2, ly: control - 4 };
  }

  function renderLines() {
    const slotById = Object.fromEntries(data.slots.map((s) => [s.id, s]));
    const paths = [];
    data.links.forEach((l, i) => {
      const from = slotById[l[0]];
      const to = slotById[l[1]];
      if (!from || !to) return;
      const p = linePath(from, to, i);
      const label = l[2] || "";
      const w = Math.max(40, label.length * 7);
      paths.push(`
        <g>
          <path d="${p.d}" fill="none" stroke="#5e6f8a" stroke-opacity="0.8" stroke-width="2.5" marker-end="url(#arrowhead)" />
          ${state.mode !== "exam" ? `<rect x="${p.lx - w / 2}" y="${p.ly - 12}" width="${w}" height="16" rx="4" class="line-label-bg"></rect><text x="${p.lx}" y="${p.ly}" text-anchor="middle" class="line-label">${label}</text>` : ""}
        </g>
      `);
    });

    el.lines.innerHTML = `
      <svg viewBox="0 0 1200 700" preserveAspectRatio="none" class="lines" aria-hidden="true">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#5e6f8a" />
          </marker>
        </defs>
        ${paths.join("")}
      </svg>
    `;
  }

  function place(slotId, iconId) {
    if (!iconId) return;
    state.placements[slotId] = iconId;
    if (state.result) evaluate();
    render();
  }

  function renderSlots() {
    data.slots.forEach((s) => {
      const slot = document.createElement("div");
      const placed = state.placements[s.id];
      const correct = state.result && placed === s.expected;
      const wrong = state.result && placed && placed !== s.expected;
      slot.className = `slot ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`;
      slot.style.left = s.x + "%";
      slot.style.top = s.y + "%";
      slot.tabIndex = 0;
      slot.setAttribute("role", "button");
      slot.innerHTML = `
        <div class="drop">${placed ? `<img src="${iconPath(iconById[placed].icon)}" alt="${s.label}">` : `<span>${state.mode === "guided" ? s.hint : "?"}</span>`}</div>
        ${state.mode === "guided" ? `<div class="slot-title">${s.label}</div>` : ""}
      `;
      slot.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });
      slot.addEventListener("drop", (e) => {
        e.preventDefault();
        place(s.id, e.dataTransfer.getData("text/plain"));
      });
      slot.addEventListener("click", () => place(s.id, state.selectedIconId));
      slot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          place(s.id, state.selectedIconId);
        }
      });
      el.canvas.appendChild(slot);
    });
  }

  function clearCanvas() {
    el.canvas.querySelectorAll(".zone,.slot").forEach((n) => n.remove());
  }

  function render() {
    clearCanvas();
    renderLines();
    renderZones();
    renderSlots();
    renderPalette();
    renderSelected();
    renderResult();
  }

  document.getElementById("checkBtn").addEventListener("click", () => {
    evaluate();
    render();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    state.placements = {};
    state.result = null;
    render();
  });

  document.getElementById("autoBtn").addEventListener("click", () => {
    state.placements = Object.fromEntries(data.slots.map((s) => [s.id, s.expected]));
    evaluate();
    render();
  });

  document.getElementById("guidedBtn").addEventListener("click", () => {
    state.mode = "guided";
    document.getElementById("guidedBtn").classList.add("active");
    document.getElementById("examBtn").classList.remove("active");
    render();
  });

  document.getElementById("examBtn").addEventListener("click", () => {
    state.mode = "exam";
    document.getElementById("examBtn").classList.add("active");
    document.getElementById("guidedBtn").classList.remove("active");
    render();
  });

  renderRequired();
  render();
})();
