// The iframe's own page: a reference column, six columns for effects(), and two columns at the top for clamp()
export const PAGE_CSS = `
#smooth-content { height: 2400px; position: relative; }
.col { position: absolute; top: 760px; width: 11%; height: 150px; border-radius: 10px; display: grid;
  place-items: center; font: 700 12px var(--font-mono, monospace); color: #111; background: var(--cyan, #5bd); }
.ref { background: var(--fg-3); }
.top { position: absolute; top: 24px; width: 20%; height: 60px; border-radius: 10px; display: grid; place-items: center;
  font: 700 11px var(--font-mono, monospace); color: #111; }
.top.plain { left: 55%; background: var(--orange, #f93); }
.top.clamped { left: 78%; background: var(--green, #4c8); }
.mid { position: fixed; left: 0; right: 0; top: 50%; border-top: 1px dashed var(--fg-3); }
.hint { padding: 14px; color: var(--fg-2); width: 45%; }
`;

const COLS = [4, 17, 30, 43, 56, 69, 82];

export const PAGE_HTML = `
<div id="smooth-wrapper"><div id="smooth-content">
  <p class="hint">Dashed line: viewport centre, where every speed effect reaches its natural place.</p>
  <div class="top plain" data-speed="0.5">data-speed 0.5</div>
  <div class="top clamped" data-speed="clamp(0.5)">clamp(0.5)</div>
  <div class="col ref" style="left:${COLS[0]}%">ref</div>
  ${COLS.slice(1)
    .map((left, i) => `<div class="col fx" style="left:${left}%">${i}</div>`)
    .join('')}
</div></div>
<div class="mid"></div>`;
