(function () {
  const slug = document.body.dataset.usecase;
  const data = window.USECASE_DATA?.[slug];
  const allPalette = window.PALETTE || [];

  if (!data) {
    document.body.innerHTML = "<p>Use case not found.</p>";
    return;
  }
  
  // Filter palette to only required icons
  const requiredIconIds = new Set(data.slots.map(s => s.expected));
  const palette = allPalette.filter(p => requiredIconIds.has(p.id));

  const state = {
    placements: {},
    selectedIconId: null,
    result: null
  };

  const el = {
    title: document.getElementById("title"),
    summary: document.getElementById("summary"),
    canvas: document.getElementById("canvas"),
    lines: document.getElementById("lines"),
    palette: document.getElementById("palette"),
    result: document.getElementById("result"),
    progress: document.getElementById("progress"),
    selectedText: document.getElementById("selectedText")
  };

  const iconById = Object.fromEntries(palette.map((p) => [p.id, p]));

  el.title.textContent = data.title;
  el.summary.textContent = `Scenario: ${data.summary} Objective: Place each AWS service in the correct layer of the architecture.`;

  // Start in scenario mode
  const canvasWrap = document.querySelector('.canvas-wrap');
  if (canvasWrap) {
    canvasWrap.classList.add('scenario-mode');
  }
  
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (canvasWrap) canvasWrap.classList.remove('scenario-mode');
      startBtn.style.display = 'none';
      // Small focus hint
      el.palette.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function iconPath(filename) {
    return "./icons/" + filename;
  }

  function expectedLabel(slot) {
    const p = iconById[slot.expected];
    return p ? p.label : slot.expected;
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
    if (selected) {
      el.selectedText.textContent = `Selected: ${selected.label}. Choose a matching slot in the workspace.`;
      return;
    }

    el.selectedText.textContent = "Choose a service, then place it where it belongs in the architecture.";
  }

  function evaluate() {
    let score = 0;
    const incorrect = [];
    data.slots.forEach((slot) => {
      if (state.placements[slot.id] === slot.expected) score += 1;
      else incorrect.push(slot);
    });
    state.result = {
      score,
      total: data.slots.length,
      incorrect,
      missing: incorrect.map((slot) => slot.label)
    };
  }

  function renderResult() {
    const placed = Object.keys(state.placements).length;
    el.progress.textContent = `Progress: ${placed} of ${data.slots.length} services placed.`;

    if (!state.result) {
      el.result.textContent = "Start with the entry point of the architecture, then place compute and database services.";
      return;
    }

    if (state.result.score === state.result.total) {
      el.result.textContent = "🎉 Excellent work! Your architecture matches the expected design perfectly.";
      document.body.classList.add('celebration-active');
      return;
    }
    document.body.classList.remove('celebration-active');

    const firstIncorrect = state.result.incorrect[0];
    const coaching = firstIncorrect
      ? `${firstIncorrect.label} usually maps to ${expectedLabel(firstIncorrect)}.`
      : "Review the highlighted services and layer roles.";
    const remaining = state.result.total - state.result.score;
    const noun = remaining === 1 ? "service" : "services";
    el.result.textContent = `Good progress. ${remaining} ${noun} still need attention. Hint: ${coaching}`;
  }

  function renderZones() {
    data.zones.forEach((z) => {
      const zone = document.createElement("div");
      zone.className = `zone ${z.cls}`;
      zone.style.left = z.x + "%";
      zone.style.top = z.y + "%";
      zone.style.width = z.w + "%";
      zone.style.height = z.h + "%";
      zone.innerHTML = `<label>${z.label}</label>`;
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
          <rect x="${p.lx - w / 2}" y="${p.ly - 12}" width="${w}" height="16" rx="4" class="line-label-bg"></rect><text x="${p.lx}" y="${p.ly}" text-anchor="middle" class="line-label">${label}</text>
        </g>
      `);
    });

    el.lines.innerHTML = `
      <svg viewBox="0 0 1200 700" preserveAspectRatio="none" class="lines-layer" aria-hidden="true">
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
      slot.setAttribute(
        "aria-label",
        placed
          ? `${s.label} slot, placed ${iconById[placed].label}`
          : `${s.label} slot, empty`
      );
      slot.innerHTML = `
        <div class="drop">${placed ? `<img src="${iconPath(iconById[placed].icon)}" alt="${s.label}">` : `<span>${s.hint}</span>`}</div>
        ${placed ? `<div class="slot-title">${iconById[placed].label}</div>` : ''}
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
    document.body.classList.remove('celebration-active');
    render();
  });

  const autoBtn = document.getElementById("autoBtn");
  if (autoBtn) {
    autoBtn.addEventListener("click", () => {
      state.placements = Object.fromEntries(data.slots.map((s) => [s.id, s.expected]));
      evaluate();
      render();
    });
  }

  render();
})();
