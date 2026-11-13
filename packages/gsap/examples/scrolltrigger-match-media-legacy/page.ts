// The iframe's own page: a nav bar, one panel to animate and a spinner for the teardown function
export const PAGE_CSS = `
.page { position: relative; height: 1100px; overflow-x: hidden; }
.nav { height: 34px; padding: 8px 14px; font: 12px var(--font-mono, monospace); color: var(--fg-2); }
.panel { position: absolute; top: 380px; left: 12%; width: 84px; height: 84px; border-radius: 12px;
  background: var(--accent); display: grid; place-items: center; color: var(--bg, #111); font: 700 12px sans-serif; }
.dot { position: absolute; top: 560px; left: 70%; width: 26px; height: 26px; border-radius: 6px; background: var(--cyan, #5bd); }
.tail { position: absolute; top: 760px; left: 12%; right: 12%; height: 8px; border-radius: 4px; background: var(--bg-raised, #333); }
.tail i { display: block; height: 100%; border-radius: 4px; background: var(--green, #4c8); transform-origin: left; transform: scaleX(0); }
`;

export const PAGE_HTML = `
<div class="page"><div class="nav">scroll down</div>
<div class="panel">panel</div><div class="dot"></div><div class="tail"><i></i></div></div>`;
