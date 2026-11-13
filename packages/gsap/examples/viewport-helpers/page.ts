// The iframe's own page: a tall document with a box far below the fold and a box sliding sideways
export const PAGE_CSS = `
body { overflow-x: hidden; }
.page { position: relative; height: 1500px; }
.box { position: absolute; top: 720px; left: 50%; width: 140px; height: 140px; margin-left: -70px;
  border-radius: 12px; background: var(--green, #4c8); color: #111; display: grid; place-items: center;
  font: 600 13px var(--font-mono, monospace); }
.hint { padding: 12px 16px; color: var(--fg-2); }
.drift { position: fixed; top: 44px; left: 0; width: 44px; height: 24px; border-radius: 6px; background: var(--orange, #f93); }
`;

export const PAGE_HTML = `
<div class="page"><div class="hint">Scroll down to the box</div><div class="box" id="box">box</div></div>
<div class="drift" id="drift"></div>`;
