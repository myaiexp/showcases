// The iframe's own page: a pinned, scrubbed section between two spacers
export const PAGE_CSS = `
.lead { height: 260px; padding: 16px; color: var(--fg-2); }
.pin { height: 180px; margin: 0 16px; border-radius: 12px; background: var(--bg-surface, #222);
  display: grid; place-items: center; align-content: center; gap: 12px; }
.track { width: 70%; height: 10px; border-radius: 5px; background: var(--bg-raised, #333); }
.fill { height: 100%; border-radius: 5px; background: var(--accent); transform-origin: left; }
.pin p { margin: 0; color: var(--fg-2); font: 12px var(--font-mono, monospace); }
.after { height: 700px; }
`;

export const PAGE_HTML = `
<div class="lead">Scroll this page: the section below pins for 800px while its bar scrubs.</div>
<div class="pin"><div class="track"><div class="fill"></div></div><p>pin: true, scrub: true</p></div>
<div class="after"></div>`;
